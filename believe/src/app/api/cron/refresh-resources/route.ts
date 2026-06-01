import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

// ── Check Hugging Face for new free courses ───────────────────
async function fetchHuggingFaceCourses() {
  try {
    const res = await fetch('https://huggingface.co/api/learn', {
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return []
    const data = await res.json()

    return (data.courses || []).slice(0, 10).map((c: any) => ({
      title: c.title,
      url: `https://huggingface.co/learn/${c.slug}`,
      description: c.description?.slice(0, 300),
      type: 'course',
      platform: 'Hugging Face',
      author: 'Hugging Face',
      difficulty: 'intermediate',
      is_free: true,
      tags: ['huggingface', 'ml', 'free'],
      has_certificate: true,
      is_featured: false,
      is_official: true,
    }))
  } catch {
    return []
  }
}

// ── Fetch Cyfrin Updraft latest courses ───────────────────────
async function fetchCyfrinCourses() {
  try {
    const res = await fetch('https://updraft.cyfrin.io/api/courses', {
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return []
    const data = await res.json()

    return (data.courses || []).slice(0, 5).map((c: any) => ({
      title: c.title || c.name,
      url: `https://updraft.cyfrin.io/courses/${c.slug || c.id}`,
      description: c.description?.slice(0, 300),
      type: 'course',
      platform: 'Cyfrin Updraft',
      author: 'Cyfrin',
      difficulty: c.level || 'intermediate',
      is_free: true,
      tags: ['cyfrin', 'blockchain', 'security', 'free'],
      has_certificate: false,
      is_featured: false,
      is_official: true,
    }))
  } catch {
    return []
  }
}

// ── Upsert resources ──────────────────────────────────────────
async function upsertResources(
  supabase: ReturnType<typeof createClient>,
  items: any[],
  categorySlug: string
) {
  if (!items.length) return { inserted: 0, errors: 0 }

  // Get category ID
  const { data: cat } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .single()

  if (!cat) return { inserted: 0, errors: 1 }

  let inserted = 0
  let errors   = 0

  for (const item of items) {
    if (!item.title || !item.url) continue

    const { data: existing } = await supabase
      .from('resources')
      .select('id')
      .eq('url', item.url)
      .maybeSingle()

    if (existing) continue

    const { error } = await supabase
      .from('resources')
      .insert({ ...item, category_id: cat.id })

    if (error) errors++
    else inserted++
  }

  return { inserted, errors }
}

// ── GET /api/cron/refresh-resources ──────────────────────────
// Called by Vercel Cron — every Sunday 6am UTC
export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getSupabase()

  const [hfCourses, cyfrinCourses] = await Promise.allSettled([
    fetchHuggingFaceCourses(),
    fetchCyfrinCourses(),
  ])

  const hf     = hfCourses.status     === 'fulfilled' ? hfCourses.value     : []
  const cyfrin = cyfrinCourses.status === 'fulfilled' ? cyfrinCourses.value : []

  const [hfResult, cyfrinResult] = await Promise.all([
    upsertResources(supabase, hf,     'ai-ml'),
    upsertResources(supabase, cyfrin, 'blockchain'),
  ])

  const result = {
    success: true,
    hf:     hfResult,
    cyfrin: cyfrinResult,
    runAt:  new Date().toISOString(),
  }

  console.log('[cron/refresh-resources]', result)
  return NextResponse.json(result)
}
