'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface CategoryProgress {
  category_slug: string
  category_name: string
  color: string
  icon: string
  total: number
  completed: number
  in_progress: number
}

// ── SVG Ring ──────────────────────────────────────────────────
function Ring({
  value,
  size = 56,
  stroke = 4,
  color,
  children,
}: {
  value: number
  size?: number
  stroke?: number
  color: string
  children?: React.ReactNode
}) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const [animated, setAnimated] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(value), 120)
    return () => clearTimeout(t)
  }, [value])

  const offset = circ - (animated / 100) * circ

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        {/* Track */}
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} />
        {/* Progress */}
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)' }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}

// ── Progress Rings ────────────────────────────────────────────
export function ProgressRings() {
  const [data, setData] = useState<CategoryProgress[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      try {
        // Single query via v_category_progress view (replaces N+1 loop)
        const { data: rows, error: err } = await supabase
          .from('v_category_progress')
          .select('*')
          .neq('category_slug', 'opportunities') // exclude non-learning category
          .order('sort_order', { ascending: true })

        if (err) throw err

        setData(
          (rows || []).map((r: any) => ({
            category_slug: r.category_slug,
            category_name: r.category_name,
            color:         r.color || '#6366f1',
            icon:          r.icon  || '📚',
            total:         Number(r.total)      || 0,
            completed:     Number(r.completed)  || 0,
            in_progress:   Number(r.in_progress)|| 0,
          }))
        )
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  // ── Loading skeleton ──────────────────────────────────────
  if (loading) {
    return (
      <div className="believe-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white/80 flex items-center gap-2">
            <span>📊</span> Learning Progress
          </h3>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-white/5 animate-pulse" />
              <div className="h-2 w-12 bg-white/5 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ── Error state ───────────────────────────────────────────
  if (error || data.length === 0) {
    return (
      <div className="believe-card p-5 flex items-center gap-3">
        <span className="text-xl">📊</span>
        <div>
          <p className="text-sm font-semibold text-white/60">Learning Progress</p>
          <p className="text-[11px] text-white/25 mt-0.5">
            Start tracking resources to see your progress here.
          </p>
        </div>
      </div>
    )
  }

  const totalCompleted = data.reduce((a, c) => a + c.completed, 0)

  return (
    <div className="believe-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white/80 flex items-center gap-2">
          <span>📊</span> Learning Progress
        </h3>
        <span className="text-[11px] text-white/25">
          {totalCompleted} completed total
        </span>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {data.map((cat) => {
          const pct = cat.total > 0 ? Math.round((cat.completed / cat.total) * 100) : 0
          return (
            <div key={cat.category_slug} className="flex flex-col items-center gap-2">
              <Ring value={pct} color={cat.color}>
                <span className="text-base">{cat.icon}</span>
              </Ring>
              <div className="text-center">
                <p className="text-[10px] text-white/40 leading-tight">{cat.category_name}</p>
                <p className="text-[11px] font-semibold mt-0.5" style={{ color: cat.color }}>
                  {pct}%
                </p>
                <p className="text-[9px] text-white/20">{cat.completed}/{cat.total}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
