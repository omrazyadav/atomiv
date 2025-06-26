import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Handle case when Supabase is not configured
    if (!supabase) {
      console.log('Supabase not configured, returning empty templates array')
      return NextResponse.json([])
    }
    
    const { data, error } = await supabase
      .from('demo_templates')
      .select('*')
      .order('is_default', { ascending: false })
      .order('name', { ascending: true })
    
    if (error) throw error
    
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error fetching templates:', error)
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 })
  }
} 