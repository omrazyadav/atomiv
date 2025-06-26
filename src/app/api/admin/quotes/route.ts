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
  
  try {
    const { data, error } = await supabase
      .from('quote_requests')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error fetching quote requests:', error)
    return NextResponse.json({ error: 'Failed to fetch quote requests' }, { status: 500 })
  }
} 