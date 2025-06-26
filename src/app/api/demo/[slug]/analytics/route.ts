import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json()
    const { event_type, metadata } = body
    
    // Handle case when Supabase is not configured
    if (!supabase) {
      console.log('Supabase not configured, skipping analytics tracking for:', params.slug, event_type)
      return NextResponse.json({ success: true, message: 'Analytics tracking skipped - database not configured' })
    }
    
    // Get demo page ID
    const { data: demoPage, error: pageError } = await supabase
      .from('demo_pages')
      .select('id')
      .eq('slug', params.slug)
      .single()
    
    if (pageError || !demoPage) {
      return NextResponse.json({ error: 'Demo not found' }, { status: 404 })
    }
    
    // Get client info
    const userAgent = request.headers.get('user-agent') || ''
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || ''
    
    // Track the event
    const { error } = await supabase
      .from('demo_analytics')
      .insert({
        demo_page_id: demoPage.id,
        event_type,
        visitor_id: generateVisitorId(request),
        ip_address: ip.split(',')[0].trim(),
        user_agent: userAgent,
        metadata: metadata || {}
      })
    
    if (error) throw error
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics tracking error:', error)
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 })
  }
}

function generateVisitorId(request: NextRequest): string {
  // Simple visitor ID generation based on IP and user agent
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'
  
  // Create a simple hash-like ID
  const combined = `${ip}_${userAgent}`
  let hash = 0
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  
  return `visitor_${Math.abs(hash)}_${Date.now()}`
} 