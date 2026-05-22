'use client'

import { useState } from 'react'
import type { ResourceWithMeta } from '@/lib/types'
import {
  TYPE_ICONS, TYPE_LABELS,
  DIFFICULTY_COLORS, DIFFICULTY_LABELS,
  PROGRESS_COLORS, PROGRESS_LABELS,
  cn,
} from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { useProgress } from '@/hooks/useOpportunities'

interface ResourceCardProps {
  resource: ResourceWithMeta
  onUpdate?: () => void
}

export function ResourceCard({ resource, onUpdate }: ResourceCardProps) {
  const { upsertProgress, toggleBookmark } = useProgress()
  const [bookmarked, setBookmarked] = useState(resource.is_bookmarked)
  const [status, setStatus] = useState(resource.progress_status || 'not_started')
  const [saving, setSaving] = useState(false)

  const handleStatusChange = async (newStatus: string) => {
    setSaving(true)
    const percent = newStatus === 'completed' ? 100 : newStatus === 'in_progress' ? 10 : 0
    await upsertProgress(resource.id, newStatus, percent)
    setStatus(newStatus as typeof status)
    setSaving(false)
    onUpdate?.()
  }

  const handleBookmark = async () => {
    await toggleBookmark(resource.id, bookmarked)
    setBookmarked(!bookmarked)
    onUpdate?.()
  }

  const accentColor = resource.category_color || '#6366f1'

  return (
    <div
      className={cn(
        'believe-card group flex flex-col p-5 gap-3 relative overflow-hidden',
        resource.is_featured && 'glow-purple'
      )}
    >
      {/* Featured indicator */}
      {resource.is_featured && (
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
        />
      )}

      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Type badge */}
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border"
            style={{
              background: `${accentColor}12`,
              borderColor: `${accentColor}30`,
              color: accentColor,
            }}
          >
            {TYPE_ICONS[resource.type]} {TYPE_LABELS[resource.type]}
          </span>

          {/* Difficulty */}
          {resource.difficulty && (
            <Badge className={DIFFICULTY_COLORS[resource.difficulty]}>
              {DIFFICULTY_LABELS[resource.difficulty]}
            </Badge>
          )}

          {/* Official */}
          {resource.is_official && (
            <Badge className="bg-sky-500/10 text-sky-400 border-sky-500/20">✓ Official</Badge>
          )}

          {/* Certificate */}
          {resource.has_certificate && (
            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">🏅 Cert</Badge>
          )}
        </div>

        {/* Bookmark */}
        <button
          onClick={handleBookmark}
          className={cn(
            'flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-sm transition-all',
            bookmarked
              ? 'bg-indigo-500/20 text-indigo-400'
              : 'text-white/20 hover:text-white/60 hover:bg-white/5'
          )}
          title={bookmarked ? 'Remove bookmark' : 'Bookmark'}
        >
          {bookmarked ? '🔖' : '○'}
        </button>
      </div>

      {/* Title + description */}
      <div className="flex-1">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-white/90 hover:text-white leading-snug line-clamp-2 transition-colors"
        >
          {resource.title}
        </a>
        {resource.description && (
          <p className="mt-1.5 text-[12.5px] text-white/40 leading-relaxed line-clamp-2">
            {resource.description}
          </p>
        )}
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-3 text-[11px] text-white/30">
        {resource.platform && <span>{resource.platform}</span>}
        {resource.author && <><span>·</span><span>{resource.author}</span></>}
        {resource.duration && <><span>·</span><span>⏱ {resource.duration}</span></>}
      </div>

      {/* Tags */}
      {resource.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {resource.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
          {resource.tags.length > 4 && (
            <span className="tag-pill">+{resource.tags.length - 4}</span>
          )}
        </div>
      )}

      {/* Progress + status */}
      <div className="pt-2 border-t border-white/[0.05] space-y-2">
        {status !== 'not_started' && (
          <ProgressBar
            value={status === 'completed' ? 100 : resource.progress_percent || 10}
            color={accentColor}
          />
        )}
        <div className="flex items-center justify-between">
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={saving}
            className={cn(
              'text-[11px] font-medium px-2 py-1 rounded-md border-0 outline-none cursor-pointer transition-all',
              'bg-white/5 text-white/50',
              status !== 'not_started' && PROGRESS_COLORS[status as keyof typeof PROGRESS_COLORS]
            )}
          >
            <option value="not_started">Not Started</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="paused">Paused</option>
          </select>

          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Open →
          </a>
        </div>
      </div>
    </div>
  )
}
