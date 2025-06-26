import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Simple admin password check (in production, use proper authentication)
// Admin: admin@atomiv.com
const ADMIN_PASSWORD = 'atomiv2025'

function checkAuth(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const password = searchParams.get('password')
  return password === ADMIN_PASSWORD
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Handle case when Supabase is not configured
  if (!supabase) {
    console.log('Supabase not configured, returning empty demo pages array')
    return NextResponse.json([])
  }
  
  try {
    const { data, error } = await supabase
      .from('demo_pages')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error fetching demo pages:', error)
    return NextResponse.json({ error: 'Failed to fetch demo pages' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Handle case when Supabase is not configured
    if (!supabase) {
      console.error('Supabase not configured - cannot create demo page')
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }
    
    // Prepare data for insertion
    const demoPageData = {
      slug: body.slug,
      client_name: body.clientName,
      company_name: body.companyName,
      title: body.title || `${body.companyName} Demo`,
      elevenlabs_agent_id: body.elevenlabsAgentId,
      status: body.status || 'draft',
      primary_color: body.primaryColor,
      secondary_color: body.secondaryColor,
      logo_url: body.logoUrl,
      hero_title: body.heroTitle,
      hero_subtitle: body.heroSubtitle,
      features: body.features || [],
      testimonials: body.testimonials || [],
      custom_message: body.customMessage,
      password_protected: body.passwordProtected || false,
      password: body.password,
      expires_at: body.expiresAt || null,
      created_by: 'admin' // In production, use actual user ID
    }
    
    const { data, error } = await supabase
      .from('demo_pages')
      .insert(demoPageData)
      .select()
      .single()
    
    if (error) throw error
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error creating demo page:', error)
    return NextResponse.json({ error: 'Failed to create demo page' }, { status: 500 })
  }
} 