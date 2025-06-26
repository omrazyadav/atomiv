import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Handle case when Supabase is not configured
    if (!supabase) {
      console.log('Supabase not configured, returning mock demo data')
      
      // Return mock demo data
      const mockDemo = {
        id: id,
        slug: 'mock-demo',
        client_name: 'Mock Client',
        company_name: 'Mock Company',
        title: 'Mock Demo',
        elevenlabs_agent_id: '',
        status: 'draft',
        primary_color: '#3b82f6',
        secondary_color: '#8b5cf6',
        logo_url: '',
        hero_title: 'Welcome to Mock Demo',
        hero_subtitle: 'This is a mock demo page',
        features: [],
        testimonials: [],
        custom_message: '',
        password_protected: false,
        expires_at: null,
        created_by: 'admin',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      return NextResponse.json(mockDemo)
    }
    
    const { data, error } = await supabase
      .from('demo_pages')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Demo page not found' }, { status: 404 })
      }
      throw error
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching demo page:', error)
    return NextResponse.json({ error: 'Failed to fetch demo page' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    // Handle case when Supabase is not configured
    if (!supabase) {
      console.log('Supabase not configured, returning mock success for demo update')
      
      // Return mock updated data
      const mockData = {
        id: id,
        slug: body.slug,
        client_name: body.clientName || body.client_name,
        company_name: body.companyName || body.company_name,
        title: body.title || `${body.companyName || body.company_name} Demo`,
        elevenlabs_agent_id: body.elevenlabsAgentId || body.elevenlabs_agent_id,
        status: body.status || 'draft',
        primary_color: body.primaryColor || body.primary_color,
        secondary_color: body.secondaryColor || body.secondary_color,
        logo_url: body.logoUrl || body.logo_url,
        hero_title: body.heroTitle || body.hero_title,
        hero_subtitle: body.heroSubtitle || body.hero_subtitle,
        features: body.features || [],
        testimonials: body.testimonials || [],
        custom_message: body.customMessage || body.custom_message,
        password_protected: body.passwordProtected || body.password_protected || false,
        expires_at: body.expiresAt || body.expires_at || null,
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        ...(body.status === 'active' && { published_at: new Date().toISOString() })
      }
      
      return NextResponse.json(mockData)
    }
    
    // Prepare data for update
    const updateData = {
      slug: body.slug,
      client_name: body.clientName || body.client_name,
      company_name: body.companyName || body.company_name,
      title: body.title || `${body.companyName || body.company_name} Demo`,
      elevenlabs_agent_id: body.elevenlabsAgentId || body.elevenlabs_agent_id,
      status: body.status || 'draft',
      primary_color: body.primaryColor || body.primary_color,
      secondary_color: body.secondaryColor || body.secondary_color,
      logo_url: body.logoUrl || body.logo_url,
      hero_title: body.heroTitle || body.hero_title,
      hero_subtitle: body.heroSubtitle || body.hero_subtitle,
      features: body.features || [],
      testimonials: body.testimonials || [],
      custom_message: body.customMessage || body.custom_message,
      password_protected: body.passwordProtected || body.password_protected || false,
      password: body.password,
      expires_at: body.expiresAt || body.expires_at || null,
      updated_at: new Date().toISOString(),
      ...(body.status === 'active' && { published_at: new Date().toISOString() })
    }
    
    const { data, error } = await supabase
      .from('demo_pages')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Supabase error:', error)
      throw error
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating demo page:', error)
    return NextResponse.json({ error: 'Failed to update demo page' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Handle case when Supabase is not configured
    if (!supabase) {
      console.log('Supabase not configured, returning mock success for demo deletion')
      return NextResponse.json({ success: true })
    }
    
    const { error } = await supabase
      .from('demo_pages')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting demo page:', error)
    return NextResponse.json({ error: 'Failed to delete demo page' }, { status: 500 })
  }
} 