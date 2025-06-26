import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Create Supabase client only if credentials are available  
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Type definitions for our database tables
export interface Lead {
  id: string
  email: string
  first_name?: string
  last_name?: string
  phone?: string
  business_name?: string
  business_type?: string
  source: 'pricing' | 'demo' | 'newsletter' | 'cta'
  status: 'new' | 'contacted' | 'qualified' | 'closed'
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  ip_address?: string
  user_agent?: string
  created_at: string
  updated_at: string
}

export interface QuoteRequest {
  id: string
  lead_id: string
  business_name: string
  contact_name: string
  email: string
  phone: string
  business_type: string
  call_volume: string
  current_solution?: string
  special_requirements?: string
  status: 'pending' | 'quoted' | 'accepted' | 'declined'
  quoted_amount?: number
  quote_sent_at?: string
  follow_up_date?: string
  created_at: string
  updated_at: string
}

export interface DemoRequest {
  id: string
  lead_id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  business_name?: string
  business_type?: string
  call_volume?: string
  timeframe?: string
  current_solution?: string
  preferred_time?: string
  message?: string
  demo_scheduled_at?: string
  demo_completed_at?: string
  status: 'pending' | 'scheduled' | 'completed' | 'no_show'
  created_at: string
  updated_at: string
}

export interface NewsletterSubscriber {
  id: string
  email: string
  first_name?: string
  last_name?: string
  status: 'active' | 'unsubscribed' | 'bounced'
  source?: string
  subscribed_at: string
  unsubscribed_at?: string
}

export interface FormAnalytics {
  id: string
  form_type: 'pricing' | 'demo' | 'newsletter'
  event_type: 'view' | 'start' | 'submit' | 'abandon'
  session_id?: string
  ip_address?: string
  user_agent?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  metadata?: Record<string, any>
  created_at: string
} 