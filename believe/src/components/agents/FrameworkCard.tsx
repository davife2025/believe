'use client'

import { useState } from 'react'
import type { Framework } from '@/data/agent-frameworks'
import { cn } from '@/lib/utils'

const DIFFICULTY_STYLES = {
  beginner:     'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  intermediate: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  advanced:     'bg-red-500/10 text-red-400 border-red-500/20',
}

// ── Single Framework Card ─────────────────────────────────────
export function FrameworkCard({
  framework,
  selected,
  onSelect,
}: {
  framework: Framework
  selected: boolean
  onSelect: () => void
}) {
  const [tab, setTab] = useState<'overview' | 'code' | 'usecases'>('overview')

  return (
    <div
      className={cn(
        'believe-card flex flex-col overflow-hidden transition-all',
        selected && 'ring-1'
      )}
      style={selected ? { ringColor: framework.color, borderColor: `${framework.color}40` } : {}}
    >
      {/* Top accent */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${framework.color}, transparent)` }} />

      {/* Header */}
      <div className="p-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: `${framework.color}15`, border: `1px solid ${framework.color}25` }}
          >
            {framework.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-white/90">{framework.name}</p>
              <span className="text-[10px] text-white/25">⭐ {framework.stars}</span>
            </div>
            <p className="text-[11px] text-white/40 mt-0.5">{framework.tagline}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <span className={cn('tag-pill border text-[10px]', DIFFICULTY_STYLES[framework.difficulty])}>
            {framework.difficulty}
          </span>
          <div className="flex gap-1">
            {framework.language.map((l) => (
              <span key={l} className="tag-pill text-[9px]">{l}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex border-t border-b border-white/[0.05]">
        {(['overview', 'code', 'usecases'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'flex-1 py-2 text-[11px] font-medium capitalize transition-all',
              tab === t ? 'text-white/80 border-b-2' : 'text-white/25 hover:text-white/50'
            )}
            style={tab === t ? { borderBottomColor: framework.color } : {}}
          >
            {t === 'overview' ? '📋 Overview' : t === 'code' ? '💻 Code' : '🎯 Use Cases'}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-4 flex-1 space-y-3">

        {tab === 'overview' && (
          <>
            <p className="text-[12.5px] text-white/50 leading-relaxed">{framework.description}</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1.5">Strengths</p>
                <ul className="space-y-1">
                  {framework.strengths.map((s) => (
                    <li key={s} className="flex items-start gap-1.5 text-[11.5px] text-emerald-400/70">
                      <span className="mt-0.5 flex-shrink-0">+</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1.5">Weaknesses</p>
                <ul className="space-y-1">
                  {framework.weaknesses.map((w) => (
                    <li key={w} className="flex items-start gap-1.5 text-[11.5px] text-red-400/60">
                      <span className="mt-0.5 flex-shrink-0">−</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1.5">Best For</p>
              <div className="flex flex-wrap gap-1">
                {framework.bestFor.map((b) => (
                  <span key={b} className="tag-pill">{b}</span>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'code' && (
          <div className="space-y-2">
            <p className="text-[11px] text-white/30">Quick example — copy and adapt</p>
            <div className="rounded-lg bg-black/40 border border-white/[0.07] p-4 overflow-x-auto">
              <pre className="text-[11.5px] text-emerald-300/80 leading-relaxed font-mono whitespace-pre">
                {framework.exampleCode}
              </pre>
            </div>
          </div>
        )}

        {tab === 'usecases' && (
          <div className="space-y-2">
            {framework.useCases.map((uc, i) => (
              <div
                key={uc}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]"
              >
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                  style={{ background: `${framework.color}20`, color: framework.color }}
                >
                  {i + 1}
                </span>
                <span className="text-[12.5px] text-white/65">{uc}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 pt-2 border-t border-white/[0.04] flex items-center gap-2">
        <a
          href={framework.docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-1.5 rounded-md text-[11px] font-medium transition-all border border-white/[0.08] text-white/40 hover:text-white/70 hover:border-white/15"
        >
          📄 Docs
        </a>
        <a
          href={framework.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-1.5 rounded-md text-[11px] font-medium transition-all border border-white/[0.08] text-white/40 hover:text-white/70 hover:border-white/15"
        >
          💾 GitHub
        </a>
        <button
          onClick={onSelect}
          className="flex-1 text-center py-1.5 rounded-md text-[11px] font-medium transition-all"
          style={{
            background: selected ? `${framework.color}20` : 'transparent',
            color: selected ? framework.color : 'rgba(255,255,255,0.35)',
            border: `1px solid ${selected ? `${framework.color}35` : 'rgba(255,255,255,0.08)'}`,
          }}
        >
          {selected ? '✓ Selected' : '+ Compare'}
        </button>
      </div>
    </div>
  )
}

// ── Comparison Table ──────────────────────────────────────────
export function FrameworkCompare({ frameworks }: { frameworks: Framework[] }) {
  if (frameworks.length < 2) return null

  const rows: { label: string; key: keyof Framework }[] = [
    { label: 'Language',   key: 'language' },
    { label: 'Difficulty', key: 'difficulty' },
    { label: 'GitHub ⭐',  key: 'stars' },
    { label: 'Best For',   key: 'bestFor' },
  ]

  return (
    <div className="believe-card overflow-hidden">
      <div className="px-5 py-3 border-b border-white/[0.05] flex items-center gap-2">
        <span className="text-sm">⚖️</span>
        <p className="text-sm font-semibold text-white/80">Comparing {frameworks.length} frameworks</p>
        <p className="text-[11px] text-white/25 ml-1">Select frameworks with + Compare above</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.05]">
              <th className="text-left px-5 py-3 text-[11px] font-semibold text-white/25 uppercase tracking-wider w-28">
                Attribute
              </th>
              {frameworks.map((f) => (
                <th key={f.id} className="px-4 py-3 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-lg">{f.icon}</span>
                    <span className="text-[12px] font-semibold" style={{ color: f.color }}>{f.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={row.key}
                className={cn('border-b border-white/[0.03]', ri % 2 === 0 ? 'bg-white/[0.01]' : '')}
              >
                <td className="px-5 py-3 text-[11px] text-white/30 font-medium">{row.label}</td>
                {frameworks.map((f) => {
                  const val = f[row.key]
                  return (
                    <td key={f.id} className="px-4 py-3 text-center">
                      {Array.isArray(val) ? (
                        <div className="flex flex-wrap gap-1 justify-center">
                          {(val as string[]).slice(0, 2).map((v) => (
                            <span key={v} className="tag-pill text-[10px]">{v}</span>
                          ))}
                          {val.length > 2 && <span className="tag-pill text-[10px]">+{val.length - 2}</span>}
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
