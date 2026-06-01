// ============================================================
// src/app/api/opportunities/route.ts
// ============================================================
import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const type      = searchParams.get('type')
  const ecosystem = searchParams.get('ecosystem')
  const active    = searchParams.get('active')
  const search    = searchParams.get('search')
  const limit     = parseInt(searchParams.get('limit') || '50')

  let query = supabase
    .from('opportunities')
    .select('*', { count: 'exact' })

  if (type)   query = query.eq('type', type)
  if (active) query = query.eq('is_active', active === 'true')
  if (ecosystem) query = query.contains('ecosystem', [ecosystem])
  if (search) {
    query = query.or(
      `title.ilike.%${search}%,description.ilike.%${search}%`
    )
  }

  query = query
    .order('is_active',   { ascending: false })
    .order('created_at',  { ascending: false })
    .limit(limit)

  const { data, error, count } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(
    { data, count },
    { headers: { 'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300' } }
  )
}

export async function POST(req: NextRequest) {
  // Internal-only: called by the Render worker to upsert opportunities
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.WORKER_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()

  const { data, error } = await supabase
    .from('opportunities')
    .upsert(body, { onConflict: 'url' })
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data, inserted: data?.length ?? 0 }, { status: 201 })
}

export async function PATCH(req: NextRequest) {
  // Mark opportunity active/inactive — called by Render worker
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.WORKER_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, is_active } = await req.json()

  const { error } = await supabase
    .from('opportunities')
    .update({ is_active, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
