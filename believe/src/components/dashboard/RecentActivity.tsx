'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { PROGRESS_LABELS, PROGRESS_COLORS } from '@/lib/utils'
import type { ProgressStatus } from '@/lib/types'

interface ActivityItem {
  id: string
  type: 'progress' | 'bookmark' | 'note' | 'goal'
  title: string
  meta: string
  status?: ProgressStatus
  timestamp: string
  icon: string
  color: string
}

export function RecentActivity() {
  const [items, setItems] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const activity: ActivityItem[] = []

      // Recent progress updates
      const { data: progressData } = await supabase
        .from('progress')
        .select('id, status, updated_at, resource_id, resources(title)')
        .order('updated_at', { ascending: false })
        .limit(5)

      progressData?.forEach((p: any) => {
        activity.push({
          id: `progress-${p.id}`,
          type: 'progress',
          title: p.resources?.title ?? 'Unknown resource',
          meta: PROGRESS_LABELS[p.status as ProgressStatus] ?? p.status,
          status: p.status,
          timestamp: p.updated_at,
          icon: p.status === 'completed' ? '✅' : p.status === 'in_progress' ? '▶️' : '⏸️',
          color: p.status === 'completed' ? '#10b981' : p.status === 'in_progress' ? '#6366f1' : '#f59e0b',
        })
      })

      // Recent bookmarks
      const { data: bookmarkData } = await supabase
        .from('bookmarks')
        .select('id, created_at, resource_id, resources(title)')
        .order('created_at', { ascending: false })
        .limit(3)

      bookmarkData?.forEach((b: any) => {
        if (b.resources?.title) {
          activity.push({
            id: `bookmark-${b.id}`,
            type: 'bookmark',
            title: b.resources.title,
            meta: 'Bookmarked',
            timestamp: b.created_at,
            icon: '🔖',
            color: '#8b5cf6',
          })
        }
      })

      // Recent notes
      const { data: noteData } = await supabase
        .from('notes')
        .select('id, title, created_at')
        .order('created_at', { ascending: false })
        .limit(3)

      noteData?.forEach((n) => {
        activity.push({
          id: `note-${n.id}`,
          type: 'note',
          title: n.title ?? 'Untitled note',
          meta: 'Note added',
          timestamp: n.created_at,
          icon: '📝',
          color: '#f59e0b',
        })
      })

      // Recent completed goals
      const { data: goalData } = await supabase
        .from('daily_goals')
        .select('id, goal_text, created_at')
        .eq('is_completed', true)
        .order('created_at', { ascending: false })
        .limit(3)

      goalData?.forEach((g) => {
        activity.push({
          id: `goal-${g.id}`,
          type: 'goal',
          title: g.goal_text,
          meta: 'Goal completed',
          timestamp: g.created_at,
          icon: '🎯',
          color: '#10b981',
        })
      })

      // Sort all by timestamp desc
      activity.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      setItems(activity.slice(0, 10))
      setLoading(false)
    }

    load()
  }, [])

  function timeAgo(ts: string): string {
    const diff = Date.now() - new Date(ts).getTime()
    const mins = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    if (mins < 1) return 'just now'
    if (mins < 60) return `${mins}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <div className="believe-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white/80 flex items-center gap-2">
          <span>⚡</span> Recent Activity
        </h3>
        <span className="text-[11px] text-white/25">{items.length} events</span>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white/5 animate-pulse flex-shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-2.5 bg-white/5 rounded w-3/4 animate-pulse" />
                <div className="h-2 bg-white/5 rounded w-1/3 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-4xl mb-2">🌱</p>
          <p className="text-[12px] text-white/25">No activity yet.</p>
          <p className="text-[11px] text-white/15 mt-1">
            Start tracking resources to see your activity here.
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="flex items-start gap-3 px-2 py-2 rounded-lg hover:bg-white/[0.03] transition-colors group"
            >
              {/* Icon + line */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}
                >
                  {item.icon}
                </div>
                {idx < items.length - 1 && (
                  <div className="w-px flex-1 bg-white/[0.04] mt-1 min-h-[12px]" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-[12.5px] text-white/70 leading-snug line-clamp-1">
                  {item.title}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className="text-[10px] font-medium"
                    style={{ color: `${item.color}99` }}
                  >
                    {item.meta}
                  </span>
                  <span className="text-[10px] text-white/20">·</span>
                  <span className="text-[10px] text-white/20">{timeAgo(item.timestamp)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
