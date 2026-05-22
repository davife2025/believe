'use client'

import { useState, useEffect } from 'react'
import { CTF_CHALLENGES, BUG_BOUNTY_PROGRAMS } from '@/data/security-data'
import type { CTFChallenge } from '@/data/security-data'
import { cn } from '@/lib/utils'

// ── CTF Tracker ───────────────────────────────────────────────
const DIFF_STYLES = {
  beginner:     'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  intermediate: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  advanced:     'bg-red-500/10 text-red-400 border-red-500/20',
}
const CTF_LS = 'believe_ctf_progress'

function loadCTFProgress(): Record<string, 'todo' | 'attempted' | 'solved'> {
  try { return JSON.parse(localStorage.getItem(CTF_LS) || '{}') }
  catch { return {} }
}

function CTFCard({ challenge, status, onStatus }: {
  challenge: CTFChallenge
  status: 'todo' | 'attempted' | 'solved'
  onStatus: (s: 'todo' | 'attempted' | 'solved') => void
}) {
  const [showHint, setShowHint] = useState(false)

  const STATUS_OPTS = [
    { value: 'todo',      label: '○ Todo',       cls: 'text-white/30' },
    { value: 'attempted', label: '◐ Attempted',  cls: 'text-amber-400' },
    { value: 'solved',    label: '✓ Solved',      cls: 'text-emerald-400' },
  ] as const

  return (
    <div className={cn(
      'believe-card p-4 space-y-3 transition-all',
      status === 'solved' && 'border-emerald-500/20 bg-emerald-500/[0.03]'
    )}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          <span
            className="text-[11px] font-semibold px-2 py-0.5 rounded-md border"
            style={{ background: `${challenge.platformColor}15`, borderColor: `${challenge.platformColor}30`, color: challenge.platformColor }}
          >
            {challenge.platform}
          </span>
          <span className={cn('tag-pill border text-[10px]', DIFF_STYLES[challenge.difficulty])}>
            {challenge.difficulty}
          </span>
          <span className="tag-pill text-[10px]">{challenge.category}</span>
        </div>
        {status === 'solved' && <span className="text-emerald-400 text-lg flex-shrink-0">✓</span>}
      </div>

      <div>
        <p className="text-[13.5px] font-semibold text-white/85">{challenge.name}</p>
        <p className="text-[12px] text-white/40 leading-relaxed mt-1">{challenge.description}</p>
      </div>

      <div className="flex flex-wrap gap-1">
        {challenge.tags.map((t) => <span key={t} className="tag-pill text-[9px]">{t}</span>)}
      </div>

      {challenge.hint && (
        <div>
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-[11px] text-amber-400/60 hover:text-amber-400 transition-colors"
          >
            {showHint ? '🙈 Hide hint' : '💡 Show hint'}
          </button>
          {showHint && (
            <p className="mt-1.5 text-[11.5px] text-amber-300/50 bg-amber-500/5 border border-amber-500/15 rounded-lg px-3 py-2 animate-fade-in">
              {challenge.hint}
            </p>
          )}
        </div>
      )}

      <div className="pt-1 border-t border-white/[0.05] flex items-center justify-between">
        <div className="flex gap-1">
          {STATUS_OPTS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onStatus(opt.value)}
              className={cn(
                'text-[10px] font-medium px-2.5 py-1 rounded-md border transition-all',
                status === opt.value
                  ? `${opt.cls} bg-white/5 border-current`
                  : 'text-white/20 border-white/[0.06] hover:text-white/50'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <a
          href={challenge.platformUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Play →
        </a>
      </div>
    </div>
  )
}

export function CTFTracker() {
  const [progress, setProgress] = useState<Record<string, 'todo' | 'attempted' | 'solved'>>({})
  const [mounted, setMounted] = useState(false)
  const [platform, setPlatform] = useState<string | undefined>()
  const [difficulty, setDifficulty] = useState<string | undefined>()
  const [statusFilter, setStatusFilter] = useState<string | undefined>()

  useEffect(() => { setProgress(loadCTFProgress()); setMounted(true) }, [])

  const setStatus = (id: string, s: 'todo' | 'attempted' | 'solved') => {
    const next = { ...progress, [id]: s }
    setProgress(next)
    localStorage.setItem(CTF_LS, JSON.stringify(next))
  }

  const getStatus = (id: string) => (mounted ? progress[id] || 'todo' : 'todo')

  const platforms = [...new Set(CTF_CHALLENGES.map((c) => c.platform))]

  const filtered = CTF_CHALLENGES.filter((c) => {
    const matchPlat = !platform || c.platform === platform
    const matchDiff = !difficulty || c.difficulty === difficulty
    const matchStatus = !statusFilter || getStatus(c.id) === statusFilter
    return matchPlat && matchDiff && matchStatus
  })

  const solved = mounted ? CTF_CHALLENGES.filter((c) => progress[c.id] === 'solved').length : 0
  const attempted = mounted ? CTF_CHALLENGES.filter((c) => progress[c.id] === 'attempted').length : 0

  return (
    <div className="space-y-4">
      {/* Stats banner */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Solved',    value: solved,                            color: '#10b981' },
          { label: 'Attempted', value: attempted,                         color: '#f59e0b' },
          { label: 'Remaining', value: CTF_CHALLENGES.length - solved,    color: '#6366f1' },
        ].map((s) => (
          <div key={s.label} className="stat-card text-center" style={{ borderColor: `${s.color}20` }}>
            <p className="label text-center">{s.label}</p>
            <p className="value text-center" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <span className="text-[11px] text-white/25 self-center">Platform:</span>
        <button onClick={() => setPlatform(undefined)}
          className={cn('tag-pill cursor-pointer', !platform && 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30')}>
          All
        </button>
        {platforms.map((p) => (
          <button key={p}
            onClick={() => setPlatform(platform === p ? undefined : p)}
            className={cn('tag-pill cursor-pointer', platform === p && 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30')}>
            {p}
          </button>
        ))}
        <span className="text-[11px] text-white/25 self-center ml-2">Status:</span>
        {['todo', 'attempted', 'solved'].map((s) => (
          <button key={s}
            onClick={() => setStatusFilter(statusFilter === s ? undefined : s)}
            className={cn('tag-pill cursor-pointer capitalize', statusFilter === s && 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30')}>
            {s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {filtered.map((c) => (
          <CTFCard
            key={c.id}
            challenge={c}
            status={getStatus(c.id)}
            onStatus={(s) => setStatus(c.id, s)}
          />
        ))}
      </div>
    </div>
  )
}

// ── Bug Bounty Feed ───────────────────────────────────────────
export function BugBountyFeed() {
  const [ecosystem, setEcosystem] = useState<string | undefined>()

  const ecosystems = [...new Set(BUG_BOUNTY_PROGRAMS.flatMap((p) => p.ecosystem))].sort()

  const filtered = BUG_BOUNTY_PROGRAMS.filter((p) =>
    !ecosystem || p.ecosystem.includes(ecosystem)
  )

  return (
    <div className="space-y-4">
      <div className="believe-card p-4 flex items-center gap-3 border-amber-500/20 bg-amber-500/5">
        <span className="text-xl">🎯</span>
        <div>
          <p className="text-sm font-medium text-amber-300">Bug Bounty Programs</p>
          <p className="text-xs text-white/40 mt-0.5">
            All active programs via Immunefi. Find a critical bug → earn life-changing money.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <button onClick={() => setEcosystem(undefined)}
          className={cn('tag-pill cursor-pointer', !ecosystem && 'bg-amber-500/15 text-amber-400 border-amber-500/30')}>
          All Chains
        </button>
        {ecosystems.map((e) => (
          <button key={e}
            onClick={() => setEcosystem(ecosystem === e ? undefined : e)}
            className={cn('tag-pill cursor-pointer', ecosystem === e && 'bg-amber-500/15 text-amber-400 border-amber-500/30')}>
            {e}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((p) => (
          <div key={p.id} className="believe-card p-4 flex items-center gap-4 group hover:border-amber-500/20 transition-all">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/[0.08] flex items-center justify-center text-xl flex-shrink-0">
              {p.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-[13px] font-semibold text-white/80">{p.protocol}</p>
                <span className="tag-pill text-[9px] bg-emerald-500/10 text-emerald-400 border-emerald-500/20">● Active</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {p.scope.map((s) => <span key={s} className="tag-pill text-[9px]">{s}</span>)}
                {p.ecosystem.map((e) => <span key={e} className="tag-pill text-[9px]">{e}</span>)}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-bold text-amber-400">{p.maxBounty}</p>
              <p className="text-[10px] text-white/25 mt-0.5">Min: {p.minSeverity}</p>
            </div>
            <a href={p.url} target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 opacity-0 group-hover:opacity-100 text-[11px] font-medium px-3 py-1.5 rounded-lg bg-amber-500/15 text-amber-400 hover:bg-amber-500/25 transition-all">
              View →
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
