'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface CategoryProgress {
  name: string
  slug: string
  icon: string
  color: string
  total: number
  completed: number
  inProgress: number
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
  const offset = circ - (value / 100) * circ
  const [animated, setAnimated] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(value), 100)
    return () => clearTimeout(t)
  }, [value])

  const animatedOffset = circ - (animated / 100) * circ

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={stroke}
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={animatedOffset}
          style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}

// ── Progress Rings Grid ───────────────────────────────────────
export function ProgressRings() {
  const [data, setData] = useState<CategoryProgress[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const CATEGORIES = [
    { slug: 'ai-ml',              name: 'AI & ML',     icon: '🤖', color: '#8b5cf6' },
    { slug: 'ai-agents',          name: 'AI Agents',   icon: '⚡', color: '#a855f7' },
    { slug: 'blockchain',         name: 'Blockchain',  icon: '⛓️', color: '#f59e0b' },
    { slug: 'blockchain-security',name: 'Security',    icon: '🔐', color: '#ef4444' },
    { slug: 'building-apps',      name: 'Build Apps',  icon: '🏗️', color: '#10b981' },
  ]

  useEffect(() => {
    const load = async () => {
      const results: CategoryProgress[] = []

      for (const cat of CATEGORIES) {
        // Total resources in category
        const { count: total } = await supabase
          .from('resources')
          .select('id', { count: 'exact', head: true })
          .eq('category_id',
            (await supabase.from('categories').select('id').eq('slug', cat.slug).single()).data?.id
          )

        // Completed
        const { count: completed } = await supabase
          .from('v_resources_with_progress')
          .select('id', { count: 'exact', head: true })
          .eq('category_slug', cat.slug)
          .eq('progress_status', 'completed')

        // In progress
        const { count: inProgress } = await supabase
          .from('v_resources_with_progress')
          .select('id', { count: 'exact', head: true })
          .eq('category_slug', cat.slug)
          .eq('progress_status', 'in_progress')

        results.push({
          ...cat,
          total: total ?? 0,
          completed: completed ?? 0,
          inProgress: inProgress ?? 0,
        })
      }

      setData(results)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="believe-card p-5">
        <h3 className="text-sm font-semibold text-white/80 mb-4 flex items-center gap-2">
          <span>📊</span> Learning Progress
        </h3>
        <div className="grid grid-cols-5 gap-3">
          {[1,2,3,4,5].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-white/5 animate-pulse" />
              <div className="h-2 w-12 bg-white/5 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="believe-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white/80 flex items-center gap-2">
          <span>📊</span> Learning Progress
        </h3>
        <span className="text-[11px] text-white/25">
          {data.reduce((a, c) => a + c.completed, 0)} completed total
        </span>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {data.map((cat) => {
          const pct = cat.total > 0 ? Math.round((cat.completed / cat.total) * 100) : 0
          return (
            <div key={cat.slug} className="flex flex-col items-center gap-2">
              <Ring value={pct} color={cat.color}>
                <span className="text-base">{cat.icon}</span>
              </Ring>
              <div className="text-center">
                <p className="text-[10px] text-white/40 leading-tight">{cat.name}</p>
                <p className="text-[11px] font-semibold" style={{ color: cat.color }}>
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
