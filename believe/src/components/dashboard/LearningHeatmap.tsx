'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

interface DayData {
  date:  string   // YYYY-MM-DD
  count: number   // total activities
  goals: number
  progress: number
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DAYS   = ['Mon','','Wed','','Fri','','']

function getIntensity(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0
  if (count === 1) return 1
  if (count <= 3)  return 2
  if (count <= 6)  return 3
  return 4
}

const INTENSITY_STYLES = [
  'bg-white/[0.04] border-white/[0.06]',
  'border-indigo-900/50',
  'border-indigo-700/50',
  'border-indigo-500/60',
  'border-indigo-400/80',
]
const INTENSITY_BG = [
  'transparent',
  '#312e81',
  '#3730a3',
  '#4338ca',
  '#6366f1',
]

export function LearningHeatmap() {
  const [days, setDays]     = useState<DayData[]>([])
  const [loading, setLoad]  = useState(true)
  const [tooltip, setTip]   = useState<{ date: string; count: number; x: number; y: number } | null>(null)
  const supabase            = createClient()

  useEffect(() => {
    const load = async () => {
      // Build 52-week grid (364 days + today)
      const today    = new Date()
      const end      = new Date(today)
      const start    = new Date(today)
      start.setDate(start.getDate() - 364)

      const startStr = start.toISOString().split('T')[0]
      const endStr   = end.toISOString().split('T')[0]

      // Get daily goals activity
      const { data: goalData } = await supabase
        .from('daily_goals')
        .select('date, is_completed')
        .gte('date', startStr)
        .lte('date', endStr)

      // Get progress updates
      const { data: progData } = await supabase
        .from('progress')
        .select('updated_at')
        .gte('updated_at', `${startStr}T00:00:00`)
        .lte('updated_at', `${endStr}T23:59:59`)

      // Count by date
      const counts: Record<string, { goals: number; progress: number }> = {}

      goalData?.forEach((g) => {
        if (!counts[g.date]) counts[g.date] = { goals: 0, progress: 0 }
        if (g.is_completed) counts[g.date].goals++
      })

      progData?.forEach((p) => {
        const date = p.updated_at.split('T')[0]
        if (!counts[date]) counts[date] = { goals: 0, progress: 0 }
        counts[date].progress++
      })

      // Build full grid
      const grid: DayData[] = []
      const cursor = new Date(start)

      while (cursor <= end) {
        const dateStr = cursor.toISOString().split('T')[0]
        const d       = counts[dateStr] || { goals: 0, progress: 0 }
        grid.push({
          date:     dateStr,
          count:    d.goals + d.progress,
          goals:    d.goals,
          progress: d.progress,
        })
        cursor.setDate(cursor.getDate() + 1)
      }

      setDays(grid)
      setLoad(false)
    }
    load()
  }, [])

  // Chunk into weeks (columns)
  const weeks: DayData[][] = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  // Month labels — find first day of each month in grid
  const monthLabels: { label: string; col: number }[] = []
  weeks.forEach((week, wi) => {
    week.forEach((day) => {
      const d    = new Date(day.date)
      const prev = wi > 0 ? new Date(weeks[wi - 1][0]?.date) : null
      if (d.getDate() <= 7 && (!prev || prev.getMonth() !== d.getMonth())) {
        monthLabels.push({ label: MONTHS[d.getMonth()], col: wi })
      }
    })
  })

  const totalActive = days.filter((d) => d.count > 0).length
  const longestStreak = (() => {
    let max = 0, cur = 0
    days.forEach((d) => { if (d.count > 0) { cur++; max = Math.max(max, cur) } else cur = 0 })
    return max
  })()
  const currentStreak = (() => {
    let cur = 0
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].count > 0) cur++
      else break
    }
    return cur
  })()

  return (
    <div className="believe-card p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-[13.5px] font-semibold" style={{ color: 'var(--text-secondary)' }}>
            Learning Activity
          </h3>
          <p className="text-[11.5px] mt-0.5" style={{ color: 'var(--text-disabled)' }}>
            {totalActive} active days in the last year
          </p>
        </div>
        <div className="flex items-center gap-4 text-center">
          {[
            { label: 'Current streak', value: currentStreak },
            { label: 'Longest streak', value: longestStreak },
            { label: 'Active days',    value: totalActive   },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-[18px] font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                {loading ? '—' : s.value}
              </p>
              <p className="text-[10px]" style={{ color: 'var(--text-disabled)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="overflow-x-auto pb-1">
        {loading ? (
          <div className="skeleton h-[100px] w-full" />
        ) : (
          <div className="inline-flex flex-col gap-1 min-w-full">
            {/* Month labels */}
            <div className="flex gap-[3px] mb-1 pl-7">
              {weeks.map((_, wi) => {
                const label = monthLabels.find((m) => m.col === wi)
                return (
                  <div key={wi} className="w-[10px] flex-shrink-0">
                    {label && (
                      <span className="text-[9px] whitespace-nowrap" style={{ color: 'var(--text-disabled)' }}>
                        {label.label}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Day rows */}
            <div className="flex gap-[3px]">
              {/* Day labels */}
              <div className="flex flex-col gap-[3px] mr-1">
                {DAYS.map((d, i) => (
                  <div key={i} className="h-[10px] flex items-center">
                    <span className="text-[8px] w-6 text-right pr-1" style={{ color: 'var(--text-disabled)' }}>
                      {d}
                    </span>
                  </div>
                ))}
              </div>

              {/* Week columns */}
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day, di) => {
                    const intensity = getIntensity(day.count)
                    const isToday   = day.date === new Date().toISOString().split('T')[0]
                    return (
                      <div
                        key={di}
                        className={cn(
                          'w-[10px] h-[10px] rounded-[2px] border flex-shrink-0 cursor-pointer transition-opacity hover:opacity-80 relative',
                          isToday && 'ring-1 ring-white/30',
                          INTENSITY_STYLES[intensity]
                        )}
                        style={{ background: INTENSITY_BG[intensity] }}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect()
                          setTip({ date: day.date, count: day.count, x: rect.left, y: rect.top })
                        }}
                        onMouseLeave={() => setTip(null)}
                      />
                    )
                  })}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-1.5 mt-2 justify-end">
              <span className="text-[9px]" style={{ color: 'var(--text-disabled)' }}>Less</span>
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={cn('w-[10px] h-[10px] rounded-[2px] border flex-shrink-0', INTENSITY_STYLES[i])}
                  style={{ background: INTENSITY_BG[i] }}
                />
              ))}
              <span className="text-[9px]" style={{ color: 'var(--text-disabled)' }}>More</span>
            </div>
          </div>
        )}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 px-2.5 py-1.5 rounded-lg text-[11px] pointer-events-none"
          style={{
            left: tooltip.x + 14,
            top: tooltip.y - 36,
            background: 'var(--surface-overlay)',
            border: '1px solid var(--border-default)',
            color: 'var(--text-secondary)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <span className="font-semibold">{tooltip.count} activit{tooltip.count !== 1 ? 'ies' : 'y'}</span>
          <span style={{ color: 'var(--text-disabled)' }}> · {tooltip.date}</span>
        </div>
      )}
    </div>
  )
}
