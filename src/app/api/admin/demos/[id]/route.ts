import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ 
      error: 'Database not configured. Please set up Supabase environment variables.' 
    }, { status: 503 })
  }

  try {
    const { id } = await params
    
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
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ 
      error: 'Database not configured. Please set up Supabase environment variables.' 
    }, { status: 503 })
  }

  try {
    const { id } = await params
    const body = await request.json()
    
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
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ 
      error: 'Database not configured. Please set up Supabase environment variables.' 
    }, { status: 503 })
  }

  try {
    const { id } = await params
    
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