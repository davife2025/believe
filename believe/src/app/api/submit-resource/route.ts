import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate required fields
    const required = ['title', 'url', 'type', 'category_slug']
    for (const field of required) {
      if (!body[field]?.trim()) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Validate URL format
    try {
      new URL(body.url)
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      )
    }

    // Check for duplicate URL
    const { data: existing } = await supabase
      .from('resource_submissions')
      .select('id')
      .eq('url', body.url.trim())
      .limit(1)

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { error: 'This URL has already been submitted' },
        { status: 409 }
      )
    }

    // Also check if it's already in resources
    const { data: alreadyExists } = await supabase
      .from('resources')
      .select('id')
      .eq('url', body.url.trim())
      .limit(1)

    if (alreadyExists && alreadyExists.length > 0) {
      return NextResponse.json(
        { error: 'This resource already exists in the platform' },
        { status: 409 }
      )
    }

    // Insert submission
    const { data, error } = await supabase
      .from('resource_submissions')
      .insert({
        title:        body.title.trim(),
        url:          body.url.trim(),
        description:  body.description?.trim() || null,
        type:         body.type,
        platform:     body.platform?.trim() || null,
        author:       body.author?.trim() || null,
        category_slug: body.category_slug,
        difficulty:   body.difficulty || 'all_levels',
        is_free:      body.is_free ?? true,
        tags:         body.tags || [],
        submitter_note: body.submitter_note?.trim() || null,
        status:       'pending',
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(
      { success: true, id: data.id, message: 'Submission received. Thank you!' },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('[/api/submit-resource]', error.message)
    return NextResponse.json(
      { error: error.message || 'Submission failed' },
      { status: 500 }
    )
  }
}

// GET — fetch pending submissions (admin view)
export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.WORKER_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('resource_submissions')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data, count: data?.length ?? 0 })
}
