import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Handle case when Supabase is not configured
    if (!supabase) {
      console.log('Supabase not configured, returning mock demo data for slug:', params.slug)
      
      // Return mock demo data based on slug
      const mockDemo = {
        id: `demo_${params.slug}`,
        slug: params.slug,
        client_name: 'Demo Client',
        company_name: 'Demo Company',
        title: `${params.slug.charAt(0).toUpperCase() + params.slug.slice(1)} Demo`,
        elevenlabs_agent_id: 'demo_agent_id',
        status: 'active',
        primary_color: '#3b82f6',
        secondary_color: '#8b5cf6',
        logo_url: '',
        hero_title: 'Welcome to Your AI Voice Demo',
        hero_subtitle: 'Experience the future of customer service with our intelligent voice assistant',
        features: [
          {
            icon: 'Phone',
            title: '24/7 Availability',
            description: 'Never miss a call, even after hours'
          },
          {
            icon: 'Calendar',
            title: 'Smart Scheduling',
            description: 'Automatically book appointments'
          },
          {
            icon: 'Users',
            title: 'Professional Service',
            description: 'Consistent, professional interactions'
          }
        ],
        testimonials: [],
        custom_message: 'This is a demo environment. Database integration is not configured.',
        password_protected: false,
        expires_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      return NextResponse.json(mockDemo)
    }
    
    const { data, error } = await supabase
      .from('demo_pages')
      .select('*')
      .eq('slug', params.slug)
      .eq('status', 'active')
      .single()
    
    if (error || !data) {
      return NextResponse.json({ error: 'Demo not found' }, { status: 404 })
    }
    
    // Check if demo is expired
    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      return NextResponse.json({ error: 'Demo has expired' }, { status: 404 })
    }
    
    // Check if password protected
    if (data.password_protected) {
      const password = request.headers.get('X-Demo-Password')
      
      if (!password || password !== data.password) {
        return NextResponse.json({ error: 'Password required' }, { status: 401 })
      }
    }
    
    // Increment view count
    await supabase.rpc('increment_demo_views', { demo_id: data.id })
    
    // Remove sensitive data before sending
    const { password, ...safeData } = data
    
    return NextResponse.json(safeData)
  } catch (error) {
    console.error('Error fetching demo:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 