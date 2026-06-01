import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// ── Server-side Supabase (service role for writes) ────────────
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(url, key)
}

// ── Fetch ETHGlobal events ────────────────────────────────────
async function fetchETHGlobalEvents() {
  try {
    const res = await fetch('https://ethglobal.com/api/events', {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return []
    const data = await res.json()
    return (data.events || []).map((e: any) => ({
      title: e.name || e.title,
      url: `https://ethglobal.com/events/${e.slug}`,
      description: e.description?.slice(0, 300) || 'ETHGlobal hackathon event.',
      type: 'hackathon',
      organizer: 'ETHGlobal',
      ecosystem: ['Ethereum', 'Multi-chain'],
      prize_pool: e.prizePool || 'TBA',
      deadline: e.registrationDeadline || e.endDate || null,
      is_active: true,
      is_recurring: true,
      location: e.format === 'online' ? 'online' : e.location || 'hybrid',
      tags: ['ethereum', 'web3', 'hackathon'],
    }))
  } catch {
    return []
  }
}

// ── Fetch DoraHacks hackathons ────────────────────────────────
async function fetchDoraHacksEvents() {
  try {
    const res = await fetch(
      'https://dorahacks.io/api/hackathon/?status=active&page=1&size=10',
      {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(8000),
      }
    )
    if (!res.ok) return []
    const data = await res.json()
    return (data.data || data.results || []).map((h: any) => ({
      title: h.title || h.name,
      url: `https://dorahacks.io/hackathon/${h.id}`,
      description: h.description?.slice(0, 300) || 'DoraHacks hackathon.',
      type: 'hackathon',
      organizer: 'DoraHacks',
      ecosystem: ['Multi-chain', 'AI'],
      prize_pool: h.prize_pool ? `$${h.prize_pool.toLocaleString()}` : 'Varies',
      deadline: h.end_time || null,
      is_active: true,
      is_recurring: true,
      location: 'online',
      tags: ['dorahacks', 'web3', 'ai'],
    }))
  } catch {
    return []
  }
}

// ── Upsert opportunities into Supabase ────────────────────────
async function upsertOpportunities(supabase: ReturnType<typeof createClient>, items: any[]) {
  if (!items.length) return { inserted: 0, errors: 0 }

  let inserted = 0
  let errors   = 0

  for (const item of items) {
    // Check if already exists by title + organizer
    const { data: existing } = await supabase
      .from('opportunities')
      .select('id')
      .eq('title', item.title)
      .eq('organizer', item.organizer)
      .maybeSingle()

    if (existing) continue // skip duplicates

    const { error } = await supabase.from('opportunities').insert(item)
    if (error) errors++
    else inserted++
  }

  return { inserted, errors }
}

// ── POST /api/cron/refresh-opportunities ─────────────────────
// Called by Vercel Cron (see vercel.json) — every Monday 8am UTC
export async function GET(req: Request) {
  // Verify this is called by Vercel Cron (not a random request)
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getSupabase()

  // Fetch from all sources in parallel
  const [ethglobal, dorahacks] = await Promise.allSettled([
    fetchETHGlobalEvents(),
    fetchDoraHacksEvents(),
  ])

  const allItems = [
    ...(ethglobal.status === 'fulfilled' ? ethglobal.value : []),
    ...(dorahacks.status === 'fulfilled' ? dorahacks.value : []),
  ]

  const { inserted, errors } = await upsertOpportunities(supabase, allItems)

  // Mark expired opportunities as inactive
  const { error: expireError } = await supabase
    .from('opportunities')
    .update({ is_active: false })
    .lt('deadline', new Date().toISOString())
    .eq('is_active', true)

  const result = {
    success: true,
    fetched: allItems.length,
    inserted,
    errors,
    expiredMarked: !expireError,
    runAt: new Date().toISOString(),
  }

  console.log('[cron/refresh-opportunities]', result)
  return NextResponse.json(result)
}
