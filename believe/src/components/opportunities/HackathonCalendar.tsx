'use client'

import { useState, useEffect } from 'react'
import { HACKATHON_EVENTS } from '@/data/opportunities-data'
import type { HackathonEvent } from '@/data/opportunities-data'
import { cn } from '@/lib/utils'

const FORMAT_STYLES = {
  online:     'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'in-person':'bg-sky-500/10 text-sky-400 border-sky-500/20',
  hybrid:     'bg-violet-500/10 text-violet-400 border-violet-500/20',
}

const DIFF_STYLES = {
  'beginner-friendly': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  intermediate:        'bg-amber-500/10 text-amber-400 border-amber-500/20',
  advanced:            'bg-red-500/10 text-red-400 border-red-500/20',
}

// ── Countdown hook ────────────────────────────────────────────
function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, started: false, ended: false })

  useEffect(() => {
    const calc = () => {
      const now = Date.now()
      const start = new Date(targetDate).getTime()
      const diff = start - now

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, started: true, ended: false })
        return
      }

      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        started: false,
        ended: false,
      })
    }

    calc()
    const interval = setInterval(calc, 60000)
    return () => clearInterval(interval)
  }, [targetDate])

  return timeLeft
}

// ── Countdown display ─────────────────────────────────────────
function Countdown({ date, color }: { date: string; color: string }) {
  const t = useCountdown(date)

  if (t.started) return <span className="text-[11px] text-emerald-400 font-medium animate-pulse">● Live now</span>
  if (t.ended)   return <span className="text-[11px] text-white/25">Ended</span>

  return (
    <div className="flex items-center gap-1">
      {[
        { val: t.days,    label: 'd' },
        { val: t.hours,   label: 'h' },
        { val: t.minutes, label: 'm' },
      ].map((unit) => (
        <div key={unit.label} className="flex items-baseline gap-0.5">
          <span className="text-sm font-bold tabular-nums" style={{ color }}>
            {String(unit.val).padStart(2, '0')}
          </span>
          <span className="text-[9px] text-white/25">{unit.label}</span>
        </div>
      ))}
    </div>
  )
}

// ── Hackathon Card ────────────────────────────────────────────
function HackathonCard({ event }: { event: HackathonEvent }) {
  const [expanded, setExpanded] = useState(false)

  const startFmt = new Date(event.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const endFmt   = new Date(event.endDate).toLocaleDateString('en-US',   { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <div className="believe-card overflow-hidden">
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${event.color}, transparent)` }} />

      <div className="p-5 space-y-3">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: `${event.color}15`, border: `1px solid ${event.color}25` }}>
              {event.icon}
            </div>
            <div>
              <p className="text-[13.5px] font-semibold text-white/90">{event.name}</p>
              <p className="text-[11px] text-white/35 mt-0.5">{event.organizer}</p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-sm font-bold" style={{ color: event.color }}>{event.prizePool}</p>
            <p className="text-[10px] text-white/25 mt-0.5">Prize pool</p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5">
          <span className={cn('tag-pill border text-[10px]', FORMAT_STYLES[event.format])}>
            {event.format === 'in-person' ? '📍' : event.format === 'online' ? '🌐' : '🔀'} {event.format}
          </span>
          <span className={cn('tag-pill border text-[10px]', DIFF_STYLES[event.difficulty])}>
            {event.difficulty}
          </span>
          {event.isRecurring && <span className="tag-pill text-[10px]">🔄 Recurring</span>}
        </div>

        {/* Dates + countdown */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-white/25 mb-1">📅 {startFmt} → {endFmt}</p>
            <Countdown date={event.startDate} color={event.color} />
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[11px] text-white/30 hover:text-white/60 transition-colors"
          >
            {expanded ? 'Less ▴' : 'More ▾'}
          </button>
        </div>

        {/* Tracks */}
        <div className="flex flex-wrap gap-1">
          {event.tracks.map((t) => <span key={t} className="tag-pill text-[9px]">{t}</span>)}
        </div>

        {/* Expanded */}
        {expanded && (
          <div className="pt-2 border-t border-white/[0.05] space-y-3 animate-fade-in">
            <p className="text-[12.5px] text-white/45 leading-relaxed">{event.description}</p>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-2">Perks</p>
              <div className="flex flex-wrap gap-1.5">
                {event.perks.map((p) => (
                  <span key={p} className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md"
                    style={{ background: `${event.color}10`, color: `${event.color}cc` }}>
                    ✓ {p}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1.5">Ecosystem</p>
              <div className="flex flex-wrap gap-1">
                {event.ecosystem.map((e) => <span key={e} className="tag-pill text-[10px]">{e}</span>)}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 border-t border-white/[0.04] flex gap-2">
          <a href={event.url} target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center py-1.5 rounded-md text-[11px] font-medium border border-white/[0.08] text-white/40 hover:text-white/70 transition-all">
            Learn More
          </a>
          <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center py-1.5 rounded-md text-[11px] font-semibold transition-all"
            style={{ background: `${event.color}20`, color: event.color, border: `1px solid ${event.color}30` }}>
            Register →
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Hackathon Calendar ────────────────────────────────────────
export function HackathonCalendar() {
  const [format, setFormat] = useState<string | undefined>()
  const [ecosystem, setEcosystem] = useState<string | undefined>()

  const ecosystems = [...new Set(HACKATHON_EVENTS.flatMap((e) => e.ecosystem))]

  const filtered = HACKATHON_EVENTS.filter((e) => {
    const matchFormat = !format || e.format === format
    const matchEco = !ecosystem || e.ecosystem.includes(ecosystem)
    return matchFormat && matchEco
  })

  const online = HACKATHON_EVENTS.filter((e) => e.format === 'online').length

  return (
    <div className="space-y-4">
      <div className="believe-card p-4 flex items-center gap-3 border-indigo-500/20 bg-indigo-500/5">
        <span className="text-xl">⚔️</span>
        <div className="flex-1">
          <p className="text-sm font-medium text-indigo-300">Hackathon Calendar</p>
          <p className="text-xs text-white/40 mt-0.5">
            {HACKATHON_EVENTS.length} upcoming events · {online} fully online (no travel needed) · Countdowns update live
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <span className="text-[11px] text-white/25 self-center">Format:</span>
        {['online', 'in-person', 'hybrid'].map((f) => (
          <button key={f}
            onClick={() => setFormat(format === f ? undefined : f)}
            className={cn('tag-pill cursor-pointer capitalize border',
              FORMAT_STYLES[f as keyof typeof FORMAT_STYLES],
              format === f ? '' : 'opacity-50'
            )}>
            {f}
          </button>
        ))}
        <span className="text-[11px] text-white/25 self-center ml-2">Ecosystem:</span>
        <button onClick={() => setEcosystem(undefined)}
          className={cn('tag-pill cursor-pointer', !ecosystem && 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30')}>
          All
        </button>
        {ecosystems.slice(0, 6).map((e) => (
          <button key={e}
            onClick={() => setEcosystem(ecosystem === e ? undefined : e)}
            className={cn('tag-pill cursor-pointer', ecosystem === e && 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30')}>
            {e}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((event) => (
          <HackathonCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}
