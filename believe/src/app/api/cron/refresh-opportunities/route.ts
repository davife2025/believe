import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Called by Render worker or Vercel cron
export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.WORKER_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const today = new Date().toISOString().split('T')[0]

  // Mark opportunities past deadline as inactive
  const { data: expired, error } = await supabase
    .from('opportunities')
    .update({ is_active: false })
    .lt('deadline', today)
    .eq('is_active', true)
    .eq('is_recurring', false)
    .select('id, title')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({
    expired:  expired?.length ?? 0,
    expiredTitles: expired?.map((o) => o.title) ?? [],
    runAt:    new Date().toISOString(),
  })
}
