import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// ── GET /api/health ───────────────────────────────────────────
// Used by Render uptime checks and monitoring
export async function GET() {
  const start = Date.now()

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Quick DB ping
    const { error } = await supabase
      .from('categories')
      .select('id')
      .limit(1)
      .single()

    const latency = Date.now() - start

    if (error) throw error

    return NextResponse.json({
      status:    'ok',
      db:        'connected',
      latency_ms: latency,
      timestamp: new Date().toISOString(),
      version:   process.env.npm_package_version || '0.1.0',
    })
  } catch (err) {
    return NextResponse.json(
      {
        status:    'error',
        db:        'disconnected',
        latency_ms: Date.now() - start,
        timestamp:  new Date().toISOString(),
        error:     'Database connection failed',
      },
      { status: 503 }
    )
  }
}
