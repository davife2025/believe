'use client'

import { useState, useEffect, useCallback } from 'react'
import { CHAINS } from '@/data/blockchain-chains'
import { cn } from '@/lib/utils'

// ── Types ─────────────────────────────────────────────────────
interface GasEntry {
  id: string
  name: string
  icon: string
  color: string
  unit: string
  slow: string | null
  standard: string | null
  fast: string | null
  error: boolean
}

// ── Gas Bar ───────────────────────────────────────────────────
function GasBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-white/25 w-14 flex-shrink-0">{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-[11px] font-mono text-white/60 w-12 text-right flex-shrink-0">
        {value.toFixed(1)}
      </span>
    </div>
  )
}

// ── Gas Tracker ───────────────────────────────────────────────
export function GasTracker() {
  const [gasData, setGasData]     = useState<GasEntry[]>([])
  const [loading, setLoading]     = useState(true)
  const [lastUpdated, setUpdated] = useState<Date | null>(null)

  const fetchGas = useCallback(async () => {
    setLoading(true)
    try {
      // Server-side API route — no CORS issues
      const res  = await fetch('/api/gas', { cache: 'no-store' })
      const json = await res.json()
      setGasData(json.data || [])
      setUpdated(new Date(json.updatedAt))
    } catch {
      setGasData([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchGas() }, [fetchGas])

  return (
    <div className="believe-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white/80 flex items-center gap-2">
          <span>⛽</span> Live Gas Prices
        </h3>
        <div className="flex items-center gap-2">
          {lastUpdated && (
            <span className="text-[10px] text-white/20">
              {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button onClick={fetchGas}
            className="text-[11px] text-indigo-400/60 hover:text-indigo-400 transition-colors px-2 py-1 rounded-md hover:bg-indigo-500/10">
            ↺ Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1,2,3,4,5].map((i) => (
            <div key={i} className="space-y-1.5">
              <div className="h-4 w-24 bg-white/5 rounded animate-pulse" />
              <div className="space-y-1 pl-6">
                {[1,2,3].map((j) => <div key={j} className="h-2.5 bg-white/5 rounded animate-pulse" />)}
              </div>
            </div>
          ))}
        </div>
      ) : gasData.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-2xl mb-2">⛽</p>
          <p className="text-[12px] text-white/30">Could not fetch gas prices.</p>
          <button onClick={fetchGas}
            className="mt-2 text-[11px] text-indigo-400 hover:text-indigo-300 transition-colors">
            Try again →
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {gasData.map((g) => {
            const stdNum  = parseFloat(g.standard || '0') || 0
            const slowNum = parseFloat(g.slow     || '0') || 0
            const fastNum = parseFloat(g.fast     || '0') || 0
            const maxGwei = 100

            return (
              <div key={g.id} className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{g.icon}</span>
                  <p className="text-[12px] font-medium text-white/65">{g.name}</p>
                  {g.error ? (
                    <span className="text-[10px] text-red-400/60 ml-auto">unavailable</span>
                  ) : (
                    <span className="ml-auto text-[10px]" style={{ color: `${g.color}80` }}>
                      {g.standard} {g.unit}
                    </span>
                  )}
                </div>
                {!g.error && (
                  <div className="pl-6 space-y-1">
                    <GasBar label="Slow"     value={slowNum} max={maxGwei} color={`${g.color}60`} />
                    <GasBar label="Standard" value={stdNum}  max={maxGwei} color={g.color} />
                    <GasBar label="Fast"     value={fastNum} max={maxGwei} color={g.color} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      <p className="text-[10px] text-white/15 text-center pt-1">
        Fetched server-side via public RPC. Approximate values only.
      </p>
    </div>
  )
}

// ── Testnet Faucets (unchanged) ───────────────────────────────
export function TestnetFaucets() {
  const faucets = CHAINS.filter((c) => c.faucetUrl).map((c) => ({
    name: c.name, icon: c.icon, color: c.color,
    testnet: c.testnet, faucetUrl: c.faucetUrl!,
    currency: c.nativeCurrency,
  }))

  return (
    <div className="believe-card p-5 space-y-4">
      <h3 className="text-sm font-semibold text-white/80 flex items-center gap-2">
        <span>🚰</span> Testnet Faucets
      </h3>
      <div className="grid grid-cols-1 gap-2">
        {faucets.map((f) => (
          <div key={f.name}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.03] transition-colors group">
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
