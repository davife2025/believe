'use client'

import { useState } from 'react'
import { GRANT_PROGRAMS, FELLOWSHIPS } from '@/data/opportunities-data'
import type { GrantProgram, Fellowship } from '@/data/opportunities-data'
import { cn } from '@/lib/utils'

const DIFFICULTY_STYLES = {
  easy:        'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  moderate:    'bg-amber-500/10 text-amber-400 border-amber-500/20',
  competitive: 'bg-red-500/10 text-red-400 border-red-500/20',
}

// ── Grant Card ────────────────────────────────────────────────
function GrantCard({ grant }: { grant: GrantProgram }) {
  const [tab, setTab] = useState<'overview' | 'tips'>('overview')

  return (
    <div className="believe-card overflow-hidden flex flex-col">
      <div className="h-0.5" style={{ background: `linear-gradient(90deg, ${grant.color}, transparent)` }} />

      <div className="p-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: `${grant.color}15`, border: `1px solid ${grant.color}25` }}>
            {grant.icon}
          </div>
          <div>
            <p className="text-[13px] font-semibold text-white/85">{grant.name}</p>
            <p className="text-[11px] text-white/35 mt-0.5">{grant.organization}</p>
          </div>
        </div>
        <div className="text-right flex-shrink-0 space-y-1">
          <p className="text-sm font-bold text-emerald-400">{grant.maxAmount}</p>
          <p className="text-[10px] text-white/25">min {grant.minAmount}</p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="px-4 pb-3 flex flex-wrap gap-2">
        <span className={cn('tag-pill border text-[10px]', DIFFICULTY_STYLES[grant.difficulty])}>
          {grant.difficulty}
        </span>
        <span className="tag-pill text-[10px]">⏱ {grant.timeline}</span>
        <span className="tag-pill text-[10px]">📋 {grant.structure}</span>
      </div>

      {/* Tab bar */}
      <div className="flex border-t border-b border-white/[0.05]">
        {(['overview', 'tips'] as const).map((t) => (
          <button key={t}
            onClick={() => setTab(t)}
            className={cn(
              'flex-1 py-2 text-[11px] font-medium capitalize transition-all',
              tab === t ? 'text-white/80 border-b-2' : 'text-white/25 hover:text-white/50'
            )}
            style={tab === t ? { borderBottomColor: grant.color } : {}}>
            {t === 'overview' ? '📋 Overview' : '💡 Tips'}
          </button>
        ))}
      </div>

      <div className="p-4 flex-1 space-y-3">
        {tab === 'overview' && (
          <>
            <p className="text-[12.5px] text-white/45 leading-relaxed">{grant.description}</p>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1.5">Categories</p>
              <div className="flex flex-wrap gap-1">
                {grant.categories.map((c) => <span key={c} className="tag-pill text-[10px]">{c}</span>)}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1.5">Requirements</p>
              <ul className="space-y-1">
                {grant.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-[11.5px] text-white/50">
                    <span className="text-white/25 flex-shrink-0 mt-0.5">·</span>{r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1.5">Ecosystem</p>
              <div className="flex flex-wrap gap-1">
                {grant.ecosystem.map((e) => <span key={e} className="tag-pill text-[10px]">{e}</span>)}
              </div>
            </div>
          </>
        )}

        {tab === 'tips' && (
          <ul className="space-y-2.5">
            {grant.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                  style={{ background: `${grant.color}15`, color: grant.color }}>
                  {i + 1}
                </span>
                <p className="text-[12.5px] text-white/60 leading-snug">{tip}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="px-4 pb-4 pt-2 border-t border-white/[0.04]">
        <a href={grant.url} target="_blank" rel="noopener noreferrer"
          className="block w-full text-center py-2 rounded-lg text-[12px] font-semibold transition-all"
          style={{ background: `${grant.color}15`, color: grant.color, border: `1px solid ${grant.color}25` }}>
          Apply for Grant →
        </a>
      </div>
    </div>
  )
}

// ── Grant Finder ──────────────────────────────────────────────
export function GrantFinder() {
  const [ecosystem, setEcosystem] = useState<string | undefined>()
  const [difficulty, setDifficulty] = useState<string | undefined>()

  const ecosystems = [...new Set(GRANT_PROGRAMS.flatMap((g) => g.ecosystem))]

  const filtered = GRANT_PROGRAMS.filter((g) => {
    const matchEco = !ecosystem || g.ecosystem.includes(ecosystem)
    const matchDiff = !difficulty || g.difficulty === difficulty
    return matchEco && matchDiff
  })

  const totalMax = '$11M+'

  return (
    <div className="space-y-4">
      <div className="believe-card p-4 flex items-center gap-3 border-emerald-500/20 bg-emerald-500/5">
        <span className="text-xl">🌱</span>
        <div className="flex-1">
          <p className="text-sm font-medium text-emerald-300">Grant Programs</p>
          <p className="text-xs text-white/40 mt-0.5">
            {GRANT_PROGRAMS.length} active programs · Combined max funding {totalMax} · All free to apply
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-[11px] text-white/25 self-center">Ecosystem:</span>
        <button onClick={() => setEcosystem(undefined)}
          className={cn('tag-pill cursor-pointer', !ecosystem && 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30')}>
          All
        </button>
        {ecosystems.map((e) => (
          <button key={e}
            onClick={() => setEcosystem(ecosystem === e ? undefined : e)}
            className={cn('tag-pill cursor-pointer', ecosystem === e && 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30')}>
            {e}
          </button>
        ))}
        <span className="text-[11px] text-white/25 self-center ml-2">Difficulty:</span>
        {['easy', 'moderate', 'competitive'].map((d) => (
          <button key={d}
            onClick={() => setDifficulty(difficulty === d ? undefined : d)}
            className={cn('tag-pill cursor-pointer capitalize border',
              DIFFICULTY_STYLES[d as keyof typeof DIFFICULTY_STYLES],
              difficulty === d ? '' : 'opacity-50')}>
            {d}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((g) => <GrantCard key={g.id} grant={g} />)}
      </div>
    </div>
  )
}

// ── Fellowship Component ──────────────────────────────────────
export function FellowshipsList() {
  return (
    <div className="space-y-4">
      <div className="believe-card p-4 flex items-center gap-3 border-violet-500/20 bg-violet-500/5">
        <span className="text-xl">🤝</span>
        <div>
          <p className="text-sm font-medium text-violet-300">Fellowships & Programs</p>
          <p className="text-xs text-white/40 mt-0.5">
            Structured programs that pay you to build. Career-defining opportunities.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {FELLOWSHIPS.map((f) => (
          <div key={f.id} className="believe-card p-5 flex flex-col gap-4">
            <div className="h-0.5 -mx-5 -mt-5 rounded-t-xl" style={{ background: `linear-gradient(90deg, ${f.color}, transparent)` }} />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: `${f.color}15`, border: `1px solid ${f.color}25` }}>
                {f.icon}
              </div>
              <div>
                <p className="text-[13px] font-semibold text-white/85">{f.name}</p>
                <p className="text-[11px] text-white/35">{f.organization}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Stipend',  value: f.stipend },
                { label: 'Duration', value: f.duration },
                { label: 'Format',   value: f.format },
              ].map((s) => (
                <div key={s.label} className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                  <p className="text-[9px] text-white/25 uppercase tracking-widest">{s.label}</p>
                  <p className="text-[11.5px] text-white/65 mt-0.5 font-medium">{s.value}</p>
                </div>
              ))}
            </div>

            <p className="text-[12px] text-white/40 leading-relaxed flex-1">{f.description}</p>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1.5">Focus</p>
              <div className="flex flex-wrap gap-1">
                {f.focus.map((fo) => <span key={fo} className="tag-pill text-[9px]">{fo}</span>)}
              </div>
            </div>

            <a href={f.applicationUrl} target="_blank" rel="noopener noreferrer"
              className="block text-center py-2 rounded-lg text-[12px] font-semibold transition-all"
              style={{ background: `${f.color}15`, color: f.color, border: `1px solid ${f.color}25` }}>
              Apply Now →
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
