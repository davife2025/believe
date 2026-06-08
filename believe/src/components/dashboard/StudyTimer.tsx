'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Play, Pause, RotateCcw, SkipForward, Timer } from 'lucide-react'
import { useToast } from '@/components/ui/Toast'
import { cn } from '@/lib/utils'

type Mode = 'focus' | 'short' | 'long'

const MODES: Record<Mode, { label: string; duration: number; color: string }> = {
  focus: { label: 'Focus',       duration: 25 * 60, color: '#6366f1' },
  short: { label: 'Short Break', duration:  5 * 60, color: '#10b981' },
  long:  { label: 'Long Break',  duration: 15 * 60, color: '#3b82f6' },
}

function pad(n: number) { return String(n).padStart(2, '0') }

export function StudyTimer() {
  const [mode, setMode]         = useState<Mode>('focus')
  const [timeLeft, setTimeLeft] = useState(MODES.focus.duration)
  const [running, setRunning]   = useState(false)
  const [sessions, setSessions] = useState(0)
  const intervalRef             = useRef<ReturnType<typeof setInterval> | null>(null)
  const { success, info }       = useToast()

  const current = MODES[mode]
  const pct     = ((current.duration - timeLeft) / current.duration) * 100
  const mins    = Math.floor(timeLeft / 60)
  const secs    = timeLeft % 60

  // SVG ring
  const SIZE    = 120
  const STROKE  = 5
  const R       = (SIZE - STROKE) / 2
  const CIRC    = 2 * Math.PI * R
  const offset  = CIRC - (pct / 100) * CIRC

  const reset = useCallback(() => {
    setRunning(false)
    setTimeLeft(MODES[mode].duration)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [mode])

  const switchMode = (m: Mode) => {
    setMode(m)
    setRunning(false)
    setTimeLeft(MODES[m].duration)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  useEffect(() => {
    if (!running) return
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current!)
          setRunning(false)
          if (mode === 'focus') {
            setSessions((s) => s + 1)
            success('Focus session complete! 🎯', 'Take a break — you earned it.')
            switchMode(sessions > 0 && (sessions + 1) % 4 === 0 ? 'long' : 'short')
          } else {
            info('Break over!', 'Ready to focus again?')
            switchMode('focus')
          }
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running, mode])

  // Update time when mode changes
  useEffect(() => { setTimeLeft(MODES[mode].duration) }, [mode])

  return (
    <div className="believe-card p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-[var(--radius-sm)] flex items-center justify-center"
            style={{ background: `${current.color}14` }}
          >
            <Timer size={14} style={{ color: current.color }} strokeWidth={2} />
          </div>
          <h3 className="text-[13.5px] font-semibold" style={{ color: 'var(--text-secondary)' }}>
            Study Timer
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
          {sessions > 0 && (
            <div className="flex items-center gap-1 text-[11.5px]" style={{ color: 'var(--text-disabled)' }}>
              {Array.from({ length: Math.min(sessions, 8) }).map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ background: i < sessions ? current.color : 'rgba(255,255,255,0.08)' }}
                />
              ))}
              {sessions > 8 && <span className="text-[10px]">+{sessions - 8}</span>}
            </div>
          )}
        </div>
      </div>

      {/* Mode tabs */}
      <div
        className="flex gap-1 p-1 rounded-[var(--radius-md)]"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)' }}
      >
        {(Object.entries(MODES) as [Mode, typeof MODES[Mode]][]).map(([m, cfg]) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className="flex-1 py-1.5 rounded-[var(--radius-sm)] text-[11.5px] font-medium transition-all"
            style={
              mode === m
                ? { background: `${cfg.color}18`, color: cfg.color }
                : { color: 'var(--text-disabled)' }
            }
          >
            {cfg.label}
          </button>
        ))}
      </div>

      {/* Ring + time */}
      <div className="flex flex-col items-center gap-3 py-2">
        <div className="relative">
          <svg
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="-rotate-90"
          >
            {/* Track */}
            <circle cx={SIZE / 2} cy={SIZE / 2} r={R}
              fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={STROKE} />
            {/* Progress */}
            <circle cx={SIZE / 2} cy={SIZE / 2} r={R}
              fill="none"
              stroke={current.color}
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={offset}
              style={{ transition: running ? 'stroke-dashoffset 1s linear' : 'none' }}
            />
          </svg>
          {/* Time display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="text-[2rem] font-bold tracking-tight tabular-nums leading-none"
              style={{ color: running ? current.color : 'var(--text-primary)' }}
            >
              {pad(mins)}:{pad(secs)}
            </span>
            <span className="text-[11px] mt-1" style={{ color: 'var(--text-disabled)' }}>
              {current.label}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            className="btn btn-ghost btn-sm w-8 h-8 p-0 flex items-center justify-center"
          >
            <RotateCcw size={14} style={{ color: 'var(--text-tertiary)' }} />
          </button>

          <button
            onClick={() => setRunning((r) => !r)}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all"
            style={{
              background: running ? `${current.color}20` : current.color,
              color: running ? current.color : '#fff',
              border: `2px solid ${current.color}`,
            }}
          >
            {running
              ? <Pause size={18} strokeWidth={2.5} />
              : <Play  size={18} strokeWidth={2.5} className="ml-0.5" />
            }
          </button>

          <button
            onClick={() => {
              const next = mode === 'focus'
                ? (sessions > 0 && (sessions + 1) % 4 === 0 ? 'long' : 'short')
                : 'focus'
              switchMode(next as Mode)
            }}
            className="btn btn-ghost btn-sm w-8 h-8 p-0 flex items-center justify-center"
          >
            <SkipForward size={14} style={{ color: 'var(--text-tertiary)' }} />
          </button>
        </div>
      </div>

      {/* Session count */}
      {sessions > 0 && (
        <p className="text-center text-[11.5px]" style={{ color: 'var(--text-disabled)' }}>
          {sessions} session{sessions !== 1 ? 's' : ''} completed today ·{' '}
          {Math.round(sessions * 25)} min focused
        </p>
      )}
    </div>
  )
}
