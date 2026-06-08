import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category   = searchParams.get('category')
  const type       = searchParams.get('type')
  const difficulty = searchParams.get('difficulty')
  const featured   = searchParams.get('featured')
  const search     = searchParams.get('search')
  const limit      = parseInt(searchParams.get('limit') || '50')
  const offset     = parseInt(searchParams.get('offset') || '0')

  let query = supabase
    .from('v_resources_with_progress')
    .select('*', { count: 'exact' })

  if (category)            query = query.eq('category_slug', category)
  if (type)                query = query.eq('type', type)
  if (difficulty)          query = query.eq('difficulty', difficulty)
  if (featured === 'true') query = query.eq('is_featured', true)
  if (search)              query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)

  query = query
    .order('is_featured', { ascending: false })
    .order('created_at',  { ascending: false })
    .range(offset, offset + limit - 1)

  const { data, error, count } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(
    { data, count, limit, offset },
    { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' } }
  )
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.WORKER_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await req.json()
  const { data, error } = await supabase
    .from('resources')
    .upsert(body, { onConflict: 'url' })
    .select()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data, inserted: data?.length ?? 0 }, { status: 201 })
}
