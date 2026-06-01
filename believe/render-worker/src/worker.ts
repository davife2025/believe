// ============================================================
// BELIEVE — Render Background Worker
// Runs cron jobs to keep platform data fresh and alive
// Deploy this as a separate Node.js service on Render
// ============================================================

import express from 'express'

const app  = express()
const PORT = process.env.PORT || 3001

const VERCEL_URL    = process.env.VERCEL_URL!       // e.g. https://believe.vercel.app
const WORKER_SECRET = process.env.WORKER_SECRET!

// ── Authenticated fetch to Vercel API ─────────────────────────
async function callAPI(
  path: string,
  method: 'GET' | 'POST' | 'PATCH' = 'GET',
  body?: object
) {
  const res = await fetch(`${VERCEL_URL}${path}`, {
    method,
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${WORKER_SECRET}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const json = await res.json()
  if (!res.ok) throw new Error(json.error || `API error ${res.status}`)
  return json
}

// ── Log helper ────────────────────────────────────────────────
function log(job: string, msg: string, data?: object) {
  const ts = new Date().toISOString()
  console.log(`[${ts}] [${job}] ${msg}`, data ? JSON.stringify(data) : '')
}

// ============================================================
// JOB 1: Mark expired opportunities as inactive
// Runs: every 6 hours
// ============================================================
async function expireOpportunities() {
  log('EXPIRE', 'Checking for expired opportunities…')

  const { data } = await callAPI('/api/opportunities?active=true')
  if (!data?.length) { log('EXPIRE', 'No active opportunities'); return }

  const today   = new Date()
  let   expired = 0

  for (const opp of data) {
    if (opp.deadline && new Date(opp.deadline) < today && !opp.is_recurring) {
      await callAPI('/api/opportunities', 'PATCH', {
        id:        opp.id,
        is_active: false,
      })
      expired++
      log('EXPIRE', `Marked inactive: ${opp.title}`)
    }
  }

  log('EXPIRE', `Done. ${expired} opportunities expired.`)
}

// ============================================================
// JOB 2: Fetch new Immunefi bug bounty programs
// Runs: daily
// ============================================================
async function refreshBugBounties() {
  log('BOUNTIES', 'Fetching Immunefi programs…')

  try {
    const res  = await fetch('https://immunefi.com/bounty/', {
      headers: { 'User-Agent': 'Believe-Platform/1.0' },
      signal: AbortSignal.timeout(10000),
    })

    if (!res.ok) throw new Error(`Immunefi fetch failed: ${res.status}`)

    // Immunefi doesn't have a public API — log for manual review
    log('BOUNTIES', 'Immunefi page fetched. Manual review needed for new programs.')

    // Upsert known static programs to keep them fresh
    const knownPrograms = [
      { title: 'Uniswap Bug Bounty',   url: 'https://immunefi.com/bug-bounty/uniswap/',  type: 'bounty', organizer: 'Immunefi / Uniswap',  ecosystem: ['Ethereum'],   is_active: true, location: 'online', tags: ['security', 'defi', 'smart-contracts'] },
      { title: 'Aave Bug Bounty',       url: 'https://immunefi.com/bug-bounty/aave/',     type: 'bounty', organizer: 'Immunefi / Aave',      ecosystem: ['Ethereum'],   is_active: true, location: 'online', tags: ['security', 'lending', 'defi'] },
      { title: 'Chainlink Bug Bounty',  url: 'https://immunefi.com/bug-bounty/chainlink/',type: 'bounty', organizer: 'Immunefi / Chainlink',  ecosystem: ['Multi-chain'],is_active: true, location: 'online', tags: ['security', 'oracles'] },
      { title: 'Solana Bug Bounty',     url: 'https://immunefi.com/bug-bounty/solana/',   type: 'bounty', organizer: 'Immunefi / Solana',     ecosystem: ['Solana'],     is_active: true, location: 'online', tags: ['security', 'blockchain', 'critical'] },
      { title: 'Arbitrum Bug Bounty',   url: 'https://immunefi.com/bug-bounty/arbitrum/', type: 'bounty', organizer: 'Immunefi / Arbitrum',   ecosystem: ['Arbitrum'],   is_active: true, location: 'online', tags: ['security', 'layer2'] },
    ]

    const result = await callAPI('/api/opportunities', 'POST', knownPrograms)
    log('BOUNTIES', `Upserted ${result.inserted} programs.`)
  } catch (err: any) {
    log('BOUNTIES', `Error: ${err.message}`)
  }
}

// ============================================================
// JOB 3: Refresh ETHGlobal hackathons
// Runs: weekly (Mondays)
// ============================================================
async function refreshHackathons() {
  log('HACKATHONS', 'Refreshing hackathon listings…')

  // ETHGlobal doesn't have a public API — keep known recurring events fresh
  const hackathons = [
    {
      title: 'ETHGlobal Hackathons',
      url: 'https://ethglobal.com/events',
      type: 'hackathon',
      organizer: 'ETHGlobal',
      ecosystem: ['Ethereum', 'L2s', 'DeFi'],
      is_active: true,
      is_recurring: true,
      location: 'hybrid',
      tags: ['ethereum', 'web3', 'defi', 'beginner-friendly'],
    },
    {
      title: 'DoraHacks Global Hackathons',
      url: 'https://dorahacks.io/hackathon',
      type: 'hackathon',
      organizer: 'DoraHacks',
      ecosystem: ['Multi-chain', 'AI'],
      is_active: true,
      is_recurring: true,
      location: 'online',
      tags: ['ai', 'web3', 'multi-chain', 'online'],
    },
    {
      title: 'Solana Hackathons',
      url: 'https://solana.com/hackathon',
      type: 'hackathon',
      organizer: 'Solana Foundation',
      ecosystem: ['Solana'],
      prize_pool: '$1,000,000+',
      is_active: true,
      is_recurring: true,
      location: 'online',
      tags: ['solana', 'defi', 'nft', 'infrastructure'],
    },
  ]

  const result = await callAPI('/api/opportunities', 'POST', hackathons)
  log('HACKATHONS', `Upserted ${result.inserted} hackathons.`)
}

// ============================================================
// JOB 4: Health check — verify Supabase connection is alive
// Runs: every 30 minutes
// ============================================================
async function healthCheck() {
  log('HEALTH', 'Running health check…')

  try {
    const { stats } = await callAPI('/api/stats')
    log('HEALTH', '✓ Supabase connected', {
      total_resources: stats?.total_resources,
      active_opportunities: stats?.active_opportunities,
    })
  } catch (err: any) {
    log('HEALTH', `✗ Health check failed: ${err.message}`)
    // In production: send alert to your phone/email here
  }
}

// ============================================================
// SCHEDULER — simple interval-based cron
// ============================================================
const MINUTE = 60 * 1000
const HOUR   = 60 * MINUTE
const DAY    = 24 * HOUR

function schedule(name: string, fn: () => Promise<void>, interval: number) {
  // Run once on startup
  fn().catch((e) => log(name, `Startup run failed: ${e.message}`))

  // Then on interval
  setInterval(() => {
    fn().catch((e) => log(name, `Scheduled run failed: ${e.message}`))
  }, interval)

  log('SCHEDULER', `Registered "${name}" every ${interval / MINUTE}min`)
}

// ============================================================
// START
// ============================================================
app.get('/', (_req, res) => {
  res.json({
    service: 'believe-worker',
    status:  'running',
    uptime:  process.uptime(),
    jobs:    ['expire-opportunities', 'refresh-bounties', 'refresh-hackathons', 'health-check'],
  })
})

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() })
})

app.listen(PORT, () => {
  console.log(`[Worker] Believe background worker started on port ${PORT}`)

  schedule('health-check',           healthCheck,         30 * MINUTE)
  schedule('expire-opportunities',   expireOpportunities, 6  * HOUR)
  schedule('refresh-bounties',       refreshBugBounties,  1  * DAY)
  schedule('refresh-hackathons',     refreshHackathons,   7  * DAY)
})
