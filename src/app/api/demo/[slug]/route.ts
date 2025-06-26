import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Handle case when Supabase is not configured
    if (!supabase) {
      console.error('Supabase not configured - cannot fetch demo')
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
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