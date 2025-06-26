import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json()
    const { event_type, metadata } = body
    
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
  // Simple visitor ID based on IP and user agent
  const userAgent = request.headers.get('user-agent') || ''
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || ''
  return Buffer.from(`${ip}-${userAgent}`).toString('base64').substring(0, 32)
} 