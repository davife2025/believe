'use client'

import { useState } from 'react'
import type { Chain } from '@/data/blockchain-chains'
import { cn } from '@/lib/utils'

const TYPE_STYLES: Record<string, string> = {
  L1:         'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  L2:         'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Sidechain:  'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Rollup:     'bg-violet-500/10 text-violet-400 border-violet-500/20',
}

type ChainTab = 'overview' | 'stats' | 'dev'

export function ChainCard({
  chain,
  selected,
  onSelect,
}: {
  chain: Chain
  selected: boolean
  onSelect: () => void
}) {
  const [tab, setTab] = useState<ChainTab>('overview')

  return (
    <div
      className={cn('believe-card flex flex-col overflow-hidden transition-all')}
      style={selected ? { borderColor: `${chain.color}40` } : {}}
    >
      {/* Top accent */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${chain.color}, transparent)` }} />

      {/* Header */}
      <div className="p-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: `${chain.color}15`, border: `1px solid ${chain.color}25` }}
          >
            {chain.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-white/90">{chain.name}</p>
              <span className={cn('tag-pill border text-[10px]', TYPE_STYLES[chain.type])}>
                {chain.type}
              </span>
            </div>
            <p className="text-[11px] text-white/35 mt-0.5">{chain.tagline}</p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-[11px] font-semibold" style={{ color: chain.color }}>{chain.nativeCurrency}</p>
          <p className="text-[10px] text-white/25 mt-0.5">TVL {chain.tvl}</p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex border-t border-b border-white/[0.05]">
        {(['overview', 'stats', 'dev'] as ChainTab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'flex-1 py-2 text-[11px] font-medium capitalize transition-all',
              tab === t ? 'text-white/80 border-b-2' : 'text-white/25 hover:text-white/50'
            )}
            style={tab === t ? { borderBottomColor: chain.color } : {}}
          >
            {t === 'overview' ? '📋 Overview' : t === 'stats' ? '📊 Stats' : '💻 Dev'}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-4 flex-1 space-y-3">

        {tab === 'overview' && (
          <>
            <p className="text-[12.5px] text-white/50 leading-relaxed">{chain.description}</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1.5">Strengths</p>
                <ul className="space-y-1">
                  {chain.strengths.slice(0, 3).map((s) => (
                    <li key={s} className="flex items-start gap-1.5 text-[11.5px] text-emerald-400/70">
                      <span className="flex-shrink-0">+</span><span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1.5">Weaknesses</p>
                <ul className="space-y-1">
                  {chain.weaknesses.map((w) => (
                    <li key={w} className="flex items-start gap-1.5 text-[11.5px] text-red-400/60">
                      <span className="flex-shrink-0">−</span><span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1.5">Ecosystem</p>
              <div className="flex flex-wrap gap-1">
                {chain.ecosystem.map((e) => (
                  <span key={e} className="tag-pill">{e}</span>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'stats' && (
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'TPS',        value: chain.tps,         icon: '⚡' },
              { label: 'Finality',   value: chain.finality,    icon: '⏱' },
              { label: 'Avg Fee',    value: chain.avgGasFee,   icon: '⛽' },
              { label: 'TVL',        value: chain.tvl,         icon: '💰' },
              { label: 'Consensus',  value: chain.consensus,   icon: '🤝' },
              { label: 'Language',   value: chain.language.join(', '), icon: '💻' },
            ].map((stat) => (
              <div key={stat.label} className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                <p className="text-[10px] text-white/25 mb-1">{stat.icon} {stat.label}</p>
                <p className="text-[12.5px] font-semibold text-white/75">{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'dev' && (
          <div className="space-y-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1.5">Best For</p>
              <div className="space-y-1.5">
                {chain.bestFor.map((b, i) => (
                  <div key={b} className="flex items-center gap-2 text-[12px] text-white/55">
                    <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                      style={{ background: `${chain.color}20`, color: chain.color }}>
                      {i + 1}
                    </span>
                    {b}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                <p className="text-[10px] text-white/25 mb-1">Testnet</p>
                <p className="text-[12px] text-white/60">{chain.testnet}</p>
              </div>
              {chain.chainId && (
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                  <p className="text-[10px] text-white/25 mb-1">Chain ID</p>
                  <p className="text-[12px] font-mono text-white/60">{chain.chainId}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer links */}
      <div className="px-4 pb-4 pt-2 border-t border-white/[0.04] flex items-center gap-2">
        <a href={chain.docsUrl} target="_blank" rel="noopener noreferrer"
          className="flex-1 text-center py-1.5 rounded-md text-[11px] font-medium border border-white/[0.08] text-white/40 hover:text-white/70 transition-all">
          📄 Docs
        </a>
        <a href={chain.explorerUrl} target="_blank" rel="noopener noreferrer"
          className="flex-1 text-center py-1.5 rounded-md text-[11px] font-medium border border-white/[0.08] text-white/40 hover:text-white/70 transition-all">
          🔍 Explorer
        </a>
        {chain.faucetUrl && (
          <a href={chain.faucetUrl} target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center py-1.5 rounded-md text-[11px] font-medium border border-white/[0.08] text-white/40 hover:text-white/70 transition-all">
            🚰 Faucet
          </a>
        )}
        <button onClick={onSelect}
          className="flex-1 text-center py-1.5 rounded-md text-[11px] font-medium transition-all border"
          style={{
            background: selected ? `${chain.color}15` : 'transparent',
            color: selected ? chain.color : 'rgba(255,255,255,0.3)',
            borderColor: selected ? `${chain.color}30` : 'rgba(255,255,255,0.08)',
          }}>
          {selected ? '✓ Selected' : '+ Compare'}
        </button>
      </div>
    </div>
  )
}

// ── Chain Comparison Table ────────────────────────────────────
export function ChainCompare({ chains }: { chains: Chain[] }) {
  if (chains.length < 2) return null

  const rows = [
    { label: 'Type',      key: 'type' },
    { label: 'TPS',       key: 'tps' },
    { label: 'Finality',  key: 'finality' },
    { label: 'Avg Fee',   key: 'avgGasFee' },
    { label: 'TVL',       key: 'tvl' },
    { label: 'Language',  key: 'language' },
    { label: 'Consensus', key: 'consensus' },
  ] as { label: string; key: keyof Chain }[]

  return (
    <div className="believe-card overflow-hidden">
      <div className="px-5 py-3 border-b border-white/[0.05] flex items-center gap-2">
        <span>⚖️</span>
        <p className="text-sm font-semibold text-white/80">Comparing {chains.length} chains</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.05]">
              <th className="text-left px-5 py-3 text-[11px] font-semibold text-white/25 uppercase tracking-wider w-28">
                Metric
              </th>
              {chains.map((c) => (
                <th key={c.id} className="px-4 py-3 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-lg">{c.icon}</span>
                    <span className="text-[12px] font-semibold" style={{ color: c.color }}>{c.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={row.key} className={cn('border-b border-white/[0.03]', ri % 2 === 0 ? 'bg-white/[0.01]' : '')}>
                <td className="px-5 py-3 text-[11px] text-white/30 font-medium">{row.label}</td>
                {chains.map((c) => {
                  const val = c[row.key]
                  return (
                    <td key={c.id} className="px-4 py-3 text-center">
                      {Array.isArray(val) ? (
                        <div className="flex flex-wrap gap-1 justify-center">
                          {(val as string[]).map((v) => (
                            <span key={v} className="tag-pill text-[10px]">{v}</span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[12px] text-white/60">{String(val)}</span>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
