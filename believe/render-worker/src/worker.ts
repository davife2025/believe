// ============================================================
// BELIEVE — Render Background Worker
// Cron jobs for keeping platform data fresh
// Uses Kimi K2 (moonshotai/Kimi-K2-Instruct) via HF Inference
// ============================================================

import express from 'express'

const app  = express()
const PORT = process.env.PORT || 3001

const VERCEL_URL    = process.env.VERCEL_URL!
const WORKER_SECRET = process.env.WORKER_SECRET!
const HF_API_KEY    = process.env.HF_API_KEY   // optional — only needed if worker calls LLM

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

// ── Optional: call Kimi K2 from the worker ────────────────────
// Useful for generating resource summaries or tagging new submissions
async function callKimi(prompt: string): Promise<string> {
  if (!HF_API_KEY) throw new Error('HF_API_KEY not set in worker env')

  const res = await fetch(
    'https://api-inference.huggingface.co/models/moonshotai/Kimi-K2-Instruct/v1/chat/completions',
    {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${HF_API_KEY}`,
      },
      body: JSON.stringify({
        model:       'moonshotai/Kimi-K2-Instruct',
        max_tokens:  300,
        temperature: 0.3,
        messages:    [{ role: 'user', content: prompt }],
      }),
      signal: AbortSignal.timeout(30000),
    }
  )

  if (!res.ok) throw new Error(`HF API error ${res.status}`)
  const data = await res.json()
  return data?.choices?.[0]?.message?.content || ''
}

// ── Log helper ────────────────────────────────────────────────
function log(job: string, msg: string, data?: object) {
  const ts = new Date().toISOString()
  console.log(`[${ts}] [${job}] ${msg}`, data ? JSON.stringify(data) : '')
}

// ============================================================
// JOB 1: Mark expired opportunities inactive
// Runs: every 6 hours
// ============================================================
async function expireOpportunities() {
  log('EXPIRE', 'Checking for expired opportunities…')
  try {
    const result = await callAPI('/api/cron/refresh-opportunities', 'POST')
    log('EXPIRE', `Done. ${result.expired} expired.`, { titles: result.expiredTitles })
  } catch (e: any) {
    log('EXPIRE', `Error: ${e.message}`)
  }
}

// ============================================================
// JOB 2: Refresh bug bounty programs
// Runs: daily
// ============================================================
async function refreshBugBounties() {
  log('BOUNTIES', 'Refreshing bug bounty programs…')
  try {
    const programs = [
      { title: 'Uniswap Bug Bounty',    url: 'https://immunefi.com/bug-bounty/uniswap/',   type: 'bounty', organizer: 'Immunefi', ecosystem: ['Ethereum'],    is_active: true, is_recurring: true, location: 'online', prize_pool: '$2,250,000', tags: ['security','defi']        },
      { title: 'Aave Bug Bounty',        url: 'https://immunefi.com/bug-bounty/aave/',      type: 'bounty', organizer: 'Immunefi', ecosystem: ['Ethereum'],    is_active: true, is_recurring: true, location: 'online', prize_pool: '$250,000',   tags: ['security','lending']     },
      { title: 'Chainlink Bug Bounty',   url: 'https://immunefi.com/bug-bounty/chainlink/', type: 'bounty', organizer: 'Immunefi', ecosystem: ['Multi-chain'], is_active: true, is_recurring: true, location: 'online', prize_pool: '$100,000',   tags: ['security','oracles']     },
      { title: 'Solana Bug Bounty',      url: 'https://immunefi.com/bug-bounty/solana/',    type: 'bounty', organizer: 'Immunefi', ecosystem: ['Solana'],      is_active: true, is_recurring: true, location: 'online', prize_pool: '$1,000,000', tags: ['security','blockchain']  },
      { title: 'Arbitrum Bug Bounty',    url: 'https://immunefi.com/bug-bounty/arbitrum/', type: 'bounty', organizer: 'Immunefi', ecosystem: ['Arbitrum'],    is_active: true, is_recurring: true, location: 'online', prize_pool: '$2,000,000', tags: ['security','layer2']      },
      { title: 'MakerDAO Bug Bounty',    url: 'https://immunefi.com/bug-bounty/makerdao/', type: 'bounty', organizer: 'Immunefi', ecosystem: ['Ethereum'],    is_active: true, is_recurring: true, location: 'online', prize_pool: '$10,000,000',tags: ['security','defi']        },
      { title: 'Optimism Bug Bounty',    url: 'https://immunefi.com/bug-bounty/optimism/', type: 'bounty', organizer: 'Immunefi', ecosystem: ['Optimism'],    is_active: true, is_recurring: true, location: 'online', prize_pool: '$2,000,042', tags: ['security','layer2']      },
    ]
    const result = await callAPI('/api/opportunities', 'POST', programs)
    log('BOUNTIES', `Upserted ${result.inserted} programs.`)
  } catch (e: any) {
    log('BOUNTIES', `Error: ${e.message}`)
  }
}

// ============================================================
// JOB 3: Refresh hackathons
// Runs: weekly
// ============================================================
async function refreshHackathons() {
  log('HACKATHONS', 'Refreshing hackathon listings…')
  try {
    const hackathons = [
      { title: 'ETHGlobal Hackathons',      url: 'https://ethglobal.com/events',       type: 'hackathon', organizer: 'ETHGlobal',         ecosystem: ['Ethereum','L2s'],   is_active: true, is_recurring: true, location: 'hybrid', tags: ['ethereum','web3']    },
      { title: 'DoraHacks Global Hackathon', url: 'https://dorahacks.io/hackathon',     type: 'hackathon', organizer: 'DoraHacks',          ecosystem: ['Multi-chain','AI'], is_active: true, is_recurring: true, location: 'online', tags: ['ai','web3']          },
      { title: 'Solana Hackathons',          url: 'https://solana.com/hackathon',        type: 'hackathon', organizer: 'Solana Foundation',  ecosystem: ['Solana'],           is_active: true, is_recurring: true, location: 'online', prize_pool: '$1,000,000+', tags: ['solana'] },
      { title: 'Chainlink Constellation',    url: 'https://chain.link/hackathon',        type: 'hackathon', organizer: 'Chainlink',          ecosystem: ['Multi-chain'],      is_active: true, is_recurring: true, location: 'online', tags: ['chainlink','oracles'] },
      { title: 'EasyA Hackathons',           url: 'https://easya.io/hackathons',         type: 'hackathon', organizer: 'EasyA',             ecosystem: ['Multi-chain'],      is_active: true, is_recurring: true, location: 'hybrid', tags: ['beginner-friendly']  },
    ]
    const result = await callAPI('/api/opportunities', 'POST', hackathons)
    log('HACKATHONS', `Upserted ${result.inserted} hackathons.`)
  } catch (e: any) {
    log('HACKATHONS', `Error: ${e.message}`)
  }
}

// ============================================================
// JOB 4: Process pending resource submissions
// Uses Kimi K2 to validate quality and auto-approve clear cases
// Runs: every 4 hours
// ============================================================
async function processSubmissions() {
  log('SUBMISSIONS', 'Checking pending submissions…')
  try {
    const { data: pending } = await callAPI('/api/submit-resource')
    if (!pending?.length) { log('SUBMISSIONS', 'No pending submissions.'); return }

    log('SUBMISSIONS', `${pending.length} pending submissions to review.`)

    for (const sub of pending.slice(0, 5)) { // Process max 5 per run
      try {
        if (!HF_API_KEY) {
          log('SUBMISSIONS', `Skip LLM review (no HF_API_KEY): ${sub.title}`)
          continue
        }

        const verdict = await callKimi(`
You are reviewing a resource submission for Believe, a developer learning platform.

Evaluate this submission and respond with ONLY a JSON object:

Title: ${sub.title}
URL: ${sub.url}
Category: ${sub.category_slug}
Type: ${sub.type}
Description: ${sub.description || 'Not provided'}
Is Free: ${sub.is_free}

Rules for approval:
- Must be relevant to AI, Blockchain, Security, or developer tools
- Must be free or have a meaningful free tier
- Must be a legitimate educational resource
- No spam, affiliate links, or low-quality content

Respond with ONLY this JSON, nothing else:
{"approve": true/false, "reason": "one sentence explanation"}
        `.trim())

        const parsed = JSON.parse(verdict.replace(/```json|```/g, '').trim())
        log('SUBMISSIONS', `Kimi verdict for "${sub.title}": ${parsed.approve ? 'APPROVE' : 'REJECT'} — ${parsed.reason}`)

      } catch (e: any) {
        log('SUBMISSIONS', `Error reviewing "${sub.title}": ${e.message}`)
      }
    }
  } catch (e: any) {
    log('SUBMISSIONS', `Error: ${e.message}`)
  }
}

// ============================================================
// JOB 5: Health check
// Runs: every 30 minutes
// ============================================================
async function healthCheck() {
  log('HEALTH', 'Running health check…')
  try {
    const res = await fetch(`${VERCEL_URL}/api/health`, { signal: AbortSignal.timeout(10000) })
    if (!res.ok) throw new Error(`Health check returned ${res.status}`)
    const data = await res.json()
    log('HEALTH', `✓ Vercel API healthy`, { status: data.status, time: data.time })
  } catch (e: any) {
    log('HEALTH', `✗ Health check FAILED: ${e.message}`)
  }
}

// ============================================================
// SCHEDULER
// ============================================================
const MIN  = 60 * 1000
const HOUR = 60 * MIN

function schedule(name: string, fn: () => Promise<void>, interval: number) {
  fn().catch((e) => log(name, `Startup run failed: ${e.message}`))
  setInterval(() => {
    fn().catch((e) => log(name, `Scheduled run failed: ${e.message}`))
  }, interval)
  log('SCHEDULER', `"${name}" registered every ${Math.round(interval / MIN)}min`)
}

// ============================================================
// HTTP SERVER
// ============================================================
app.get('/', (_req, res) => {
  res.json({
    service: 'believe-worker',
    model:   'moonshotai/Kimi-K2-Instruct via HF Inference',
    status:  'running',
    uptime:  Math.round(process.uptime()),
    jobs:    [
      'health-check (30min)',
      'expire-opportunities (6h)',
      'refresh-bounties (24h)',
      'refresh-hackathons (7d)',
      'process-submissions (4h)',
    ],
  })
})

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: Math.round(process.uptime()) })
})

app.listen(PORT, () => {
  log('WORKER', `Believe worker started on port ${PORT}`)
  log('WORKER', `LLM: moonshotai/Kimi-K2-Instruct via Hugging Face`)
  log('WORKER', `HF_API_KEY: ${HF_API_KEY ? '✓ set' : '✗ not set (LLM features disabled)'}`)
  log('WORKER', `VERCEL_URL: ${VERCEL_URL || '✗ not set'}`)

  schedule('health-check',        healthCheck,         30 * MIN )
  schedule('expire-opportunities', expireOpportunities, 6  * HOUR)
  schedule('refresh-bounties',     refreshBugBounties,  24 * HOUR)
  schedule('refresh-hackathons',   refreshHackathons,   7  * 24 * HOUR)
  schedule('process-submissions',  processSubmissions,  4  * HOUR)
})
