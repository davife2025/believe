'use client'

import { useState, useEffect } from 'react'
import { CHAINS } from '@/data/blockchain-chains'
import { cn } from '@/lib/utils'

// ── Gas Tracker ───────────────────────────────────────────────
// Uses public RPC endpoints to fetch live gas — no API key needed
interface GasData {
  chain: string
  icon: string
  color: string
  slow: string
  standard: string
  fast: string
  unit: string
  loading: boolean
  error: boolean
}

const GAS_CHAINS = [
  { id: 'ethereum', name: 'Ethereum', icon: '🔷', color: '#627eea', rpc: 'https://eth.llamarpc.com',       unit: 'Gwei' },
  { id: 'polygon',  name: 'Polygon',  icon: '🟣', color: '#8247e5', rpc: 'https://polygon.llamarpc.com',   unit: 'Gwei' },
  { id: 'base',     name: 'Base',     icon: '🔵', color: '#0052ff', rpc: 'https://base.llamarpc.com',      unit: 'Gwei' },
  { id: 'arbitrum', name: 'Arbitrum', icon: '🔵', color: '#12aaff', rpc: 'https://arbitrum.llamarpc.com',  unit: 'Gwei' },
  { id: 'bnb',      name: 'BNB',      icon: '🟡', color: '#f3ba2f', rpc: 'https://bsc.llamarpc.com',       unit: 'Gwei' },
]

async function fetchGasPrice(rpc: string): Promise<{ slow: string; standard: string; fast: string } | null> {
  try {
    const res = await fetch(rpc, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', method: 'eth_gasPrice', params: [], id: 1 }),
    })
    const data = await res.json()
    const wei = parseInt(data.result, 16)
    const gwei = wei / 1e9
    return {
      slow:     (gwei * 0.8).toFixed(2),
      standard: gwei.toFixed(2),
      fast:     (gwei * 1.2).toFixed(2),
    }
  } catch {
    return null
  }
}

function GasBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-white/25 w-14 flex-shrink-0">{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-[11px] font-mono text-white/60 w-12 text-right flex-shrink-0">{value.toFixed(1)}</span>
    </div>
  )
}

export function GasTracker() {
  const [gasData, setGasData] = useState<GasData[]>(
    GAS_CHAINS.map((c) => ({ chain: c.name, icon: c.icon, color: c.color, slow: '—', standard: '—', fast: '—', unit: c.unit, loading: true, error: false }))
  )
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchAll = async () => {
    setGasData((prev) => prev.map((g) => ({ ...g, loading: true, error: false })))
    const results = await Promise.all(GAS_CHAINS.map((c) => fetchGasPrice(c.rpc)))
    setGasData(
      GAS_CHAINS.map((c, i) => ({
        chain: c.name, icon: c.icon, color: c.color, unit: c.unit,
        slow:     results[i]?.slow     ?? '—',
        standard: results[i]?.standard ?? '—',
        fast:     results[i]?.fast     ?? '—',
        loading:  false,
        error:    !results[i],
      }))
    )
    setLastUpdated(new Date())
  }

  useEffect(() => { fetchAll() }, [])

  return (
    <div className="believe-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white/80 flex items-center gap-2">
          <span>⛽</span> Live Gas Prices
        </h3>
        <div className="flex items-center gap-2">
          {lastUpdated && (
            <span className="text-[10px] text-white/20">
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={fetchAll}
            className="text-[11px] text-indigo-400/60 hover:text-indigo-400 transition-colors px-2 py-1 rounded-md hover:bg-indigo-500/10"
          >
            ↺ Refresh
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {gasData.map((g) => {
          const stdNum = parseFloat(g.standard) || 0
          const fastNum = parseFloat(g.fast) || 0
          const maxGwei = 100

          return (
            <div key={g.chain} className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-sm">{g.icon}</span>
                <p className="text-[12px] font-medium text-white/65">{g.chain}</p>
                {g.loading && <span className="text-[10px] text-white/25 animate-pulse">fetching…</span>}
                {g.error && <span className="text-[10px] text-red-400/60">unavailable</span>}
                {!g.loading && !g.error && (
                  <span className="ml-auto text-[10px]" style={{ color: `${g.color}80` }}>
                    {g.standard} {g.unit}
                  </span>
                )}
              </div>
              {!g.loading && !g.error && (
                <div className="pl-6 space-y-1">
                  <GasBar label="Slow" value={parseFloat(g.slow) || 0} max={maxGwei} color={`${g.color}60`} />
                  <GasBar label="Standard" value={stdNum} max={maxGwei} color={g.color} />
                  <GasBar label="Fast" value={fastNum} max={maxGwei} color={g.color} />
                </div>
              )}
              {g.loading && (
                <div className="pl-6 space-y-1">
                  {[1,2,3].map((i) => <div key={i} className="h-2.5 bg-white/5 rounded animate-pulse" />)}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <p className="text-[10px] text-white/15 text-center">
        Gas fetched via public RPC endpoints. Approximate values only.
      </p>
    </div>
  )
}

// ── Testnet Faucets List ──────────────────────────────────────
export function TestnetFaucets() {
  const faucets = CHAINS.filter((c) => c.faucetUrl).map((c) => ({
    name: c.name,
    icon: c.icon,
    color: c.color,
    testnet: c.testnet,
    faucetUrl: c.faucetUrl!,
    currency: c.nativeCurrency,
  }))

  return (
    <div className="believe-card p-5 space-y-4">
      <h3 className="text-sm font-semibold text-white/80 flex items-center gap-2">
        <span>🚰</span> Testnet Faucets
      </h3>
      <div className="grid grid-cols-1 gap-2">
        {faucets.map((f) => (
          <div key={f.name} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.03] transition-colors group">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-base flex-shrink-0"
              style={{ background: `${f.color}15`, border: `1px solid ${f.color}20` }}>
              {f.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12.5px] text-white/70">{f.name}</p>
              <p className="text-[10px] text-white/25">{f.testnet} · {f.currency}</p>
            </div>
            <a href={f.faucetUrl} target="_blank" rel="noopener noreferrer"
              className="text-[11px] font-medium px-2.5 py-1 rounded-md transition-all opacity-0 group-hover:opacity-100"
              style={{ background: `${f.color}15`, color: f.color }}>
              Get tokens →
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
