import { supabase, isSupabaseConfigured } from './supabase'
import type { QuoteRequest, DemoRequest, NewsletterSubscriber, Lead, FormAnalytics } from './supabase'

// Utility to get client IP and user agent
const getClientInfo = () => {
  const userAgent = typeof window !== 'undefined' ? navigator.userAgent : ''
  return { userAgent }
}

// Utility to extract UTM parameters from URL
const getUTMParams = () => {
  if (typeof window === 'undefined') return {}
  
  const urlParams = new URLSearchParams(window.location.search)
  return {
    utm_source: urlParams.get('utm_source') || undefined,
    utm_medium: urlParams.get('utm_medium') || undefined,
    utm_campaign: urlParams.get('utm_campaign') || undefined,
  }
}

// Track form analytics
export async function trackFormEvent(
  formType: 'pricing' | 'demo' | 'newsletter',
  eventType: 'view' | 'start' | 'submit' | 'abandon',
  metadata?: Record<string, any>
) {
  if (!isSupabaseConfigured()) return // Skip if Supabase not configured
  
  try {
    const clientInfo = getClientInfo()
    const utmParams = getUTMParams()
    
    const { error } = await supabase
      .from('form_analytics')
      .insert({
        form_type: formType,
        event_type: eventType,
        user_agent: clientInfo.userAgent,
        ...utmParams,
        metadata,
        created_at: new Date().toISOString()
      })
    
    if (error) {
      console.error('Analytics tracking error:', error)
    }
  } catch (error) {
    console.error('Analytics tracking error:', error)
  }
}

// Create or update lead
async function createOrUpdateLead(
  email: string,
  source: 'pricing' | 'demo' | 'newsletter' | 'cta',
  additionalData: Partial<Lead> = {}
): Promise<string | null> {
  if (!isSupabaseConfigured()) return null // Return null if Supabase not configured
  
  try {
    const clientInfo = getClientInfo()
    const utmParams = getUTMParams()
    
    // Check if lead exists
    const { data: existingLead } = await supabase
      .from('leads')
      .select('id')
      .eq('email', email)
      .single()
    
    if (existingLead) {
      // Update existing lead
      const { error } = await supabase
        .from('leads')
        .update({
          ...additionalData,
          source,
          user_agent: clientInfo.userAgent,
          ...utmParams,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingLead.id)
      
      if (error) throw error
      return existingLead.id
    } else {
      // Create new lead
      const { data, error } = await supabase
        .from('leads')
        .insert({
          email,
          source,
          status: 'new',
          user_agent: clientInfo.userAgent,
          ...utmParams,
          ...additionalData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select('id')
        .single()
      
      if (error) throw error
      return data?.id || null
    }
  } catch (error) {
    console.error('Lead creation error:', error)
    return null
  }
}

// Submit quote request
export async function submitQuoteRequest(formData: {
  businessName: string
  contactName: string
  email: string
  phone: string
  businessType: string
  callVolume: string
  currentSolution?: string
  specialRequirements?: string
}) {
  if (!isSupabaseConfigured()) return { success: false, error: 'Database not configured' }
  
  try {
    // Track form submission
    await trackFormEvent('pricing', 'submit', formData)
    
    // Create or update lead
    const leadId = await createOrUpdateLead(formData.email, 'pricing', {
      first_name: formData.contactName.split(' ')[0],
      last_name: formData.contactName.split(' ').slice(1).join(' ') || undefined,
      phone: formData.phone,
      business_name: formData.businessName,
      business_type: formData.businessType
    })
    
    if (!leadId) {
      throw new Error('Failed to create lead')
    }
    
    // Create quote request
    const { data, error } = await supabase
      .from('quote_requests')
      .insert({
        lead_id: leadId,
        business_name: formData.businessName,
        contact_name: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        business_type: formData.businessType,
        call_volume: formData.callVolume,
        current_solution: formData.currentSolution,
        special_requirements: formData.specialRequirements,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) throw error
    
    return { success: true, data }
  } catch (error) {
    console.error('Quote request submission error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Failed to submit quote request' }
  }
}

// Submit demo request
export async function submitDemoRequest(formData: {
  firstName: string
  lastName: string
  email: string
  phone: string
  businessName?: string
  businessType?: string
  callVolume?: string
  timeframe?: string
  currentSolution?: string
  preferredTime?: string
  message?: string
}) {
  if (!isSupabaseConfigured()) return { success: false, error: 'Database not configured' }
  
  try {
    // Track form submission
    await trackFormEvent('demo', 'submit', formData)
    
    // Create or update lead
    const leadId = await createOrUpdateLead(formData.email, 'demo', {
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
      business_name: formData.businessName,
      business_type: formData.businessType
    })
    
    if (!leadId) {
      throw new Error('Failed to create lead')
    }
    
    // Create demo request
    const { data, error } = await supabase
      .from('demo_requests')
      .insert({
        lead_id: leadId,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        business_name: formData.businessName,
        business_type: formData.businessType,
        call_volume: formData.callVolume,
        timeframe: formData.timeframe,
        current_solution: formData.currentSolution,
        preferred_time: formData.preferredTime,
        message: formData.message,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) throw error
    
    return { success: true, data }
  } catch (error) {
    console.error('Demo request submission error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Failed to submit demo request' }
  }
}

// Subscribe to newsletter
export async function subscribeToNewsletter(email: string, firstName?: string, lastName?: string, source: string = 'footer') {
  if (!isSupabaseConfigured()) return { success: false, error: 'Database not configured' }
  
  try {
    // Track form submission
    await trackFormEvent('newsletter', 'submit', { email, source })
    
    // Create or update lead
    await createOrUpdateLead(email, 'newsletter', {
      first_name: firstName,
      last_name: lastName
    })
    
    // Create newsletter subscription (handle duplicates)
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email,
        first_name: firstName,
        last_name: lastName,
        status: 'active',
        source,
        subscribed_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) {
      // If it's a duplicate, update the existing subscription
      if (error.code === '23505') { // Unique constraint violation
        const { data: updateData, error: updateError } = await supabase
          .from('newsletter_subscribers')
          .update({
            first_name: firstName,
            last_name: lastName,
            status: 'active',
            source,
            subscribed_at: new Date().toISOString()
          })
          .eq('email', email)
          .select()
          .single()
        
        if (updateError) throw updateError
        return { success: true, data: updateData }
      }
      throw error
    }
    
    return { success: true, data }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Failed to subscribe to newsletter' }
  }
}

// Quick CTA submission (email only)
export async function submitCTAContact(email: string, source: string = 'cta') {
  if (!isSupabaseConfigured()) return { success: false, error: 'Database not configured' }
  
  try {
    // Track form submission
    await trackFormEvent('newsletter', 'submit', { email, source })
    
    // Create or update lead
    const leadId = await createOrUpdateLead(email, 'cta')
    
    if (!leadId) {
      throw new Error('Failed to create lead')
    }
    
    return { success: true, leadId }
  } catch (error) {
    console.error('CTA contact submission error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Failed to submit contact information' }
  }
} 