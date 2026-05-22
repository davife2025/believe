'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface StreakData {
  current: number
  longest: number
  lastActive: string | null
  thisWeek: boolean[] // 7 days, today is index 6
}

export function StreakCounter() {
  const [streak, setStreak] = useState<StreakData>({
    current: 0,
    longest: 0,
    lastActive: null,
    thisWeek: [false, false, false, false, false, false, false],
  })
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const today = new Date()

      // Get last 7 days of daily_goals activity
      const days: boolean[] = []
      for (let i = 6; i >= 0; i--) {
        const d = new Date(today)
        d.setDate(today.getDate() - i)
        const dateStr = d.toISOString().split('T')[0]
        const { count } = await supabase
          .from('daily_goals')
          .select('*', { count: 'exact', head: true })
          .eq('date', dateStr)
        days.push((count ?? 0) > 0)
      }

      // Also count progress updates as activity
      const { data: progressDays } = await supabase
        .from('progress')
        .select('updated_at')
        .gte('updated_at', new Date(Date.now() - 7 * 86400000).toISOString())

      progressDays?.forEach((p) => {
        const d = new Date(p.updated_at)
        const daysAgo = Math.floor((today.getTime() - d.getTime()) / 86400000)
        if (daysAgo <= 6) days[6 - daysAgo] = true
      })

      // Calculate streak (count backwards from today)
      let current = 0
      for (let i = days.length - 1; i >= 0; i--) {
        if (days[i]) current++
        else break
      }

      setStreak({
        current,
        longest: current, // simplified — real would track historical
        lastActive: today.toISOString(),
        thisWeek: days,
      })
      setLoading(false)
    }
    load()
  }, [])

  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const todayIndex = new Date().getDay() // 0=Sun
  // Reorder so Mon=0
  const reordered = [...streak.thisWeek]

  return (
    <div className="believe-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🔥</span>
          <h3 className="text-sm font-semibold text-white/80">Streak</h3>
        </div>
        {streak.current > 0 && (
          <span className="text-[11px] text-orange-400/70 font-medium">
            Keep it going!
          </span>
        )}
      </div>

      {loading ? (
        <div className="h-16 bg-white/5 rounded-lg animate-pulse" />
      ) : (
        <>
          {/* Big number */}
          <div className="flex items-end gap-4">
            <div>
              <p className="text-4xl font-bold text-white tracking-tight leading-none">
                {streak.current}
              </p>
              <p className="text-[11px] text-white/30 mt-1">day streak</p>
            </div>
            <div className="mb-1 pb-0.5">
              <p className="text-xl font-semibold text-white/20">{streak.longest}</p>
              <p className="text-[10px] text-white/20">best</p>
            </div>
          </div>

          {/* Week dots */}
          <div className="flex items-center gap-1.5">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((label, i) => {
              const active = reordered[i]
              const isToday = i === reordered.length - 1
              return (
                <div key={i} className="flex flex-col items-center gap-1 flex-1">
                  <div
                    className={`w-full aspect-square rounded-md flex items-center justify-center transition-all ${
                      active
                        ? 'bg-orange-500/30 border border-orange-500/50'
                        : isToday
                        ? 'bg-white/5 border border-white/15 border-dashed'
                        : 'bg-white/[0.03] border border-white/[0.06]'
                    }`}
                  >
                    {active && (
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                    )}
                  </div>
                  <span
                    className={`text-[9px] font-medium ${
                      isToday ? 'text-white/50' : 'text-white/20'
                    }`}
                  >
                    {label}
                  </span>
                </div>
              )
            })}
          </div>

          {streak.current === 0 && (
            <p className="text-[12px] text-white/25 text-center pb-1">
              Add a goal or track progress to start your streak.
            </p>
          )}
        </>
      )}
    </div>
  )
}
