import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Simple admin password check (in production, use proper authentication)
// Admin: admin@atomiv.com
const ADMIN_PASSWORD = 'atomiv2025'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const password = searchParams.get('password')
  
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Return empty data if Supabase is not configured
  if (!supabase) {
    return NextResponse.json({
      leads: [],
      quotes: [],
      demos: [],
      subscribers: [],
      analytics: [],
      demoPages: [],
      demoAnalytics: [],
      stats: {
        totalLeads: 0,
        totalQuotes: 0,
        totalDemos: 0,
        totalSubscribers: 0,
        pendingQuotes: 0,
        pendingDemos: 0,
        activeDemoPages: 0,
        totalDemoViews: 0
      }
    })
  }
  
  try {
    // Get all the data in parallel for performance
    const [
      { data: leads, error: leadsError },
      { data: quotes, error: quotesError },
      { data: demos, error: demosError },
      { data: subscribers, error: subscribersError },
      { data: analytics, error: analyticsError },
      { data: demoPages, error: demoPagesError },
      { data: demoAnalytics, error: demoAnalyticsError }
    ] = await Promise.all([
      supabase.from('leads').select('*').order('created_at', { ascending: false }),
      supabase.from('quote_requests').select('*').order('created_at', { ascending: false }),
      supabase.from('demo_requests').select('*').order('created_at', { ascending: false }),
      supabase.from('newsletter_subscribers').select('*').order('subscribed_at', { ascending: false }),
      supabase.from('form_analytics').select('*').order('created_at', { ascending: false }).limit(100),
      supabase.from('demo_pages').select('*').order('created_at', { ascending: false }),
      supabase.from('demo_analytics').select('*').order('created_at', { ascending: false }).limit(100)
    ])
    
    if (leadsError) throw leadsError
    if (quotesError) throw quotesError
    if (demosError) throw demosError
    if (subscribersError) throw subscribersError
    if (analyticsError) throw analyticsError
    if (demoPagesError) throw demoPagesError
    if (demoAnalyticsError) throw demoAnalyticsError
    
    // Calculate stats
    const stats = {
      totalLeads: leads?.length || 0,
      totalQuotes: quotes?.length || 0,
      totalDemos: demos?.length || 0,
      totalSubscribers: subscribers?.length || 0,
      pendingQuotes: quotes?.filter(q => q.status === 'pending').length || 0,
      pendingDemos: demos?.filter(d => d.status === 'pending').length || 0,
      activeDemoPages: demoPages?.filter(d => d.status === 'active').length || 0,
      totalDemoViews: demoPages?.reduce((sum, page) => sum + (page.views_count || 0), 0) || 0
    }
    
    return NextResponse.json({
      leads,
      quotes,
      demos,
      subscribers,
      analytics,
      demoPages,
      demoAnalytics,
      stats
    })
  } catch (error) {
    console.error('Admin dashboard API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 