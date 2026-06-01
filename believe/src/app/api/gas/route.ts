import { NextResponse } from 'next/server'

// ── Chain RPC config ──────────────────────────────────────────
const CHAINS = [
  { id: 'ethereum', name: 'Ethereum', icon: '🔷', color: '#627eea', rpc: 'https://eth.llamarpc.com',      unit: 'Gwei' },
  { id: 'polygon',  name: 'Polygon',  icon: '🟣', color: '#8247e5', rpc: 'https://polygon.llamarpc.com',  unit: 'Gwei' },
  { id: 'base',     name: 'Base',     icon: '🔵', color: '#0052ff', rpc: 'https://base.llamarpc.com',     unit: 'Gwei' },
  { id: 'arbitrum', name: 'Arbitrum', icon: '🔵', color: '#12aaff', rpc: 'https://arbitrum.llamarpc.com', unit: 'Gwei' },
  { id: 'bnb',      name: 'BNB',      icon: '🟡', color: '#f3ba2f', rpc: 'https://bsc.llamarpc.com',      unit: 'Gwei' },
]

async function fetchGasPrice(rpc: string) {
  try {
    const res = await fetch(rpc, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', method: 'eth_gasPrice', params: [], id: 1 }),
      // Server-side: no CORS restriction, 5s timeout
      signal: AbortSignal.timeout(5000),
    })

    if (!res.ok) return null
    const data = await res.json()
    const wei  = parseInt(data.result, 16)
    if (isNaN(wei)) return null

    const gwei = wei / 1e9
    return {
      slow:     (gwei * 0.85).toFixed(2),
      standard: gwei.toFixed(2),
      fast:     (gwei * 1.2).toFixed(2),
    }
  } catch {
    return null
  }
}

export async function GET() {
  // Fetch all chains in parallel
  const results = await Promise.allSettled(
    CHAINS.map((c) => fetchGasPrice(c.rpc))
  )

  const payload = CHAINS.map((chain, i) => {
    const result = results[i]
    const gas = result.status === 'fulfilled' ? result.value : null

    return {
      id:       chain.id,
      name:     chain.name,
      icon:     chain.icon,
      color:    chain.color,
      unit:     chain.unit,
      slow:     gas?.slow     ?? null,
      standard: gas?.standard ?? null,
      fast:     gas?.fast     ?? null,
      error:    gas === null,
    }
  })

  return NextResponse.json(
    { data: payload, updatedAt: new Date().toISOString() },
    {
      headers: {
        // Cache for 30 seconds on edge, revalidate in background
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
      },
    }
  )
}
