'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  CheckCircle2, PlayCircle, PauseCircle, Bookmark,
  FileText, Target, Activity,
} from 'lucide-react'
import { timeAgo } from '@/lib/utils'

interface ActivityItem {
  id:        string
  type:      'progress' | 'bookmark' | 'note' | 'goal'
  title:     string
  meta:      string
  timestamp: string
  color:     string
  Icon:      React.ComponentType<any>
}

export function RecentActivity() {
  const [items, setItems]   = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)
  const supabase              = createClient()

  useEffect(() => {
    const load = async () => {
      const activity: ActivityItem[] = []

      const [progressRes, bookmarkRes, noteRes, goalRes] = await Promise.all([
        supabase.from('progress')
          .select('id, status, updated_at, resource_id, resources(title)')
          .order('updated_at', { ascending: false })
          .limit(5),
        supabase.from('bookmarks')
          .select('id, created_at, resource_id, resources(title)')
          .not('resource_id', 'is', null)
          .order('created_at', { ascending: false })
          .limit(3),
        supabase.from('notes')
          .select('id, title, created_at')
          .order('created_at', { ascending: false })
          .limit(3),
        supabase.from('daily_goals')
          .select('id, goal_text, created_at')
          .eq('is_completed', true)
          .order('created_at', { ascending: false })
          .limit(3),
      ])

      const STATUS_MAP: Record<string, { Icon: React.ComponentType<any>; color: string; meta: string }> = {
        completed:   { Icon: CheckCircle2, color: '#10b981', meta: 'Completed' },
        in_progress: { Icon: PlayCircle,   color: '#6366f1', meta: 'Started'   },
        paused:      { Icon: PauseCircle,  color: '#f59e0b', meta: 'Paused'    },
      }

      progressRes.data?.forEach((p: any) => {
        const s = STATUS_MAP[p.status]
        if (s && p.resources?.title) {
          activity.push({
            id: `p-${p.id}`, type: 'progress',
            title: p.resources.title, meta: s.meta,
            timestamp: p.updated_at, color: s.color, Icon: s.Icon,
          })
        }
      })

      bookmarkRes.data?.forEach((b: any) => {
        if (b.resources?.title) {
          activity.push({
            id: `b-${b.id}`, type: 'bookmark',
            title: b.resources.title, meta: 'Bookmarked',
            timestamp: b.created_at, color: '#8b5cf6', Icon: Bookmark,
          })
        }
      })

      noteRes.data?.forEach((n: any) => {
        activity.push({
          id: `n-${n.id}`, type: 'note',
          title: n.title || 'Untitled note', meta: 'Note added',
          timestamp: n.created_at, color: '#f59e0b', Icon: FileText,
        })
      })

      goalRes.data?.forEach((g: any) => {
        activity.push({
          id: `g-${g.id}`, type: 'goal',
          title: g.goal_text, meta: 'Goal completed',
          timestamp: g.created_at, color: '#10b981', Icon: Target,
        })
      })

      activity.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      setItems(activity.slice(0, 10))
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="believe-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-[var(--radius-sm)] flex items-center justify-center"
            style={{ background: 'rgba(99,102,241,0.12)' }}>
            <Activity size={14} className="text-indigo-400" strokeWidth={2} />
          </div>
          <h3 className="text-[13.5px] font-semibold" style={{ color: 'var(--text-secondary)' }}>
            Recent Activity
          </h3>
        </div>
        {!loading && (
          <span className="text-[11.5px]" style={{ color: 'var(--text-disabled)' }}>
            {items.length} events
          </span>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="skeleton w-7 h-7 rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="skeleton h-3 w-3/4" />
                <div className="skeleton h-2.5 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="py-8 text-center space-y-2">
          <Activity size={28} className="mx-auto" style={{ color: 'var(--text-disabled)' }} />
          <p className="text-[13px]" style={{ color: 'var(--text-tertiary)' }}>No activity yet</p>
          <p className="text-[12px]" style={{ color: 'var(--text-disabled)' }}>
            Start tracking resources to see your activity here.
          </p>
        </div>
      ) : (
        <div className="space-y-0.5">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="flex items-start gap-3 px-2 py-2.5 rounded-[var(--radius-md)] hover:bg-white/[0.03] transition-colors"
            >
              {/* Icon + connector */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}14`, border: `1px solid ${item.color}22` }}
                >
                  <item.Icon size={13} style={{ color: item.color }} strokeWidth={2} />
                </div>
                {idx < items.length - 1 && (
                  <div className="w-px flex-1 mt-1 min-h-[10px]"
                    style={{ background: 'var(--border-subtle)' }} />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-[12.5px] leading-snug line-clamp-1"
                  style={{ color: 'var(--text-secondary)' }}>
                  {item.title}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[11px] font-medium" style={{ color: `${item.color}99` }}>
                    {item.meta}
                  </span>
                  <span style={{ color: 'var(--text-disabled)' }} className="text-[11px]">·</span>
                  <span className="text-[11px]" style={{ color: 'var(--text-disabled)' }}>
                    {timeAgo(item.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
