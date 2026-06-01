import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  const [statsRes, categoryRes] = await Promise.all([
    supabase.from('v_stats').select('*').single(),
    supabase.from('v_category_progress').select('*'),
  ])

  if (statsRes.error) {
    return NextResponse.json({ error: statsRes.error.message }, { status: 500 })
  }

  return NextResponse.json(
    { stats: statsRes.data, categories: categoryRes.data || [] },
    { headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60' } }
  )
}
