import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const range = searchParams.get('range') || '7d'
  
  // Return mock data if Supabase is not configured
  if (!supabase) {
    return NextResponse.json({
      totalViews: 0,
      uniqueVisitors: 0,
      avgViewDuration: 0,
      conversionRate: 0,
      topDemos: [],
      formStats: {
        pricing: { views: 0, starts: 0, completions: 0 },
        demo: { views: 0, starts: 0, completions: 0 },
        newsletter: { views: 0, starts: 0, completions: 0 }
      },
      dailyStats: []
    })
  }
  
  try {
    // Calculate date range
    const endDate = new Date()
    const startDate = new Date()
    
    switch (range) {
      case '24h':
        startDate.setHours(startDate.getHours() - 24)
        break
      case '7d':
        startDate.setDate(startDate.getDate() - 7)
        break
      case '30d':
        startDate.setDate(startDate.getDate() - 30)
        break
      case '90d':
        startDate.setDate(startDate.getDate() - 90)
        break
    }
    
    // Fetch all analytics data
    const [
      { data: formAnalytics },
      { data: demoAnalytics },
      { data: demoPages }
    ] = await Promise.all([
      supabase.from('form_analytics')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString()),
      supabase.from('demo_analytics')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString()),
      supabase.from('demo_pages')
        .select('id, title, views_count')
        .eq('status', 'active')
    ])
    
    // Calculate stats
    const totalViews = (formAnalytics?.filter(a => a.event_type === 'view').length || 0) + 
                      (demoAnalytics?.filter(a => a.event_type === 'view').length || 0)
    
    const uniqueVisitors = new Set([
      ...(formAnalytics?.map(a => a.visitor_id) || []),
      ...(demoAnalytics?.map(a => a.visitor_id) || [])
    ]).size
    
    // Calculate form stats
    const formStats = {
      pricing: {
        views: formAnalytics?.filter(a => a.form_type === 'pricing' && a.event_type === 'view').length || 0,
        starts: formAnalytics?.filter(a => a.form_type === 'pricing' && a.event_type === 'start').length || 0,
        completions: formAnalytics?.filter(a => a.form_type === 'pricing' && a.event_type === 'submit').length || 0
      },
      demo: {
        views: formAnalytics?.filter(a => a.form_type === 'demo' && a.event_type === 'view').length || 0,
        starts: formAnalytics?.filter(a => a.form_type === 'demo' && a.event_type === 'start').length || 0,
        completions: formAnalytics?.filter(a => a.form_type === 'demo' && a.event_type === 'submit').length || 0
      },
      newsletter: {
        views: formAnalytics?.filter(a => a.form_type === 'newsletter' && a.event_type === 'view').length || 0,
        starts: formAnalytics?.filter(a => a.form_type === 'newsletter' && a.event_type === 'start').length || 0,
        completions: formAnalytics?.filter(a => a.form_type === 'newsletter' && a.event_type === 'submit').length || 0
      }
    }
    
    // Calculate top demos
    const topDemos = (demoPages || [])
      .sort((a, b) => b.views_count - a.views_count)
      .slice(0, 5)
      .map(demo => ({
        title: demo.title,
        views: demo.views_count,
        conversions: Math.floor(demo.views_count * 0.15) // Mock conversion data
      }))
    
    // Calculate conversion rate
    const totalSubmissions = Object.values(formStats).reduce((sum, stat) => sum + stat.completions, 0)
    const conversionRate = totalViews > 0 ? parseFloat(((totalSubmissions / totalViews) * 100).toFixed(1)) : 0
    
    return NextResponse.json({
      totalViews,
      uniqueVisitors,
      avgViewDuration: 45, // Mock data - would calculate from actual session data
      conversionRate,
      topDemos,
      formStats,
      dailyStats: [] // Would implement daily aggregation
    })
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
} 