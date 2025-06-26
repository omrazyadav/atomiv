import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log('Received finalization request:', body)
    
    const { data, error } = await supabase
      .from('finalization_requests')
      .insert({
        demo_slug: body.demo_slug,
        client_name: body.client_name,
        company_name: body.company_name,
        demo_title: body.demo_title,
        elevenlabs_agent_id: body.elevenlabs_agent_id,
        custom_message: body.custom_message,
        status: body.status || 'pending'
      })
      .select()
      .single()
      
    console.log('Supabase response:', { data, error })

    if (error) {
      console.error('Error inserting finalization request:', error)
      return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error in finalization request API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    let query = supabase
      .from('finalization_requests')
      .select('*')
      .order('submitted_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching finalization requests:', error)
      return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error in finalization requests GET API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 