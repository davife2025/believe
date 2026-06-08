import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status:  'ok',
    service: 'believe-vercel',
    time:    new Date().toISOString(),
  })
}
