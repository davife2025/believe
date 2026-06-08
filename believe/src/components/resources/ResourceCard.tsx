'use client'

import { useState } from 'react'
import {
  ExternalLink, Bookmark, BookmarkCheck,
  CheckCircle2, Circle, PauseCircle, PlayCircle,
  Clock, Award, BadgeCheck,
} from 'lucide-react'
import { RESOURCE_TYPE_ICONS } from '@/lib/icons'
import type { ResourceWithMeta } from '@/lib/types'
import { DIFFICULTY_COLORS, DIFFICULTY_LABELS, cn } from '@/lib/utils'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { useProgress } from '@/hooks/useOpportunities'
import { useToast } from '@/components/ui/Toast'
import type { ProgressStatus } from '@/lib/types'

const PROGRESS_CONFIG: Record<ProgressStatus, {
  label: string
  Icon: React.ComponentType<any>
  color: string
  bg: string
}> = {
  not_started: { label: 'Not Started', Icon: Circle,       color: 'text-white/30', bg: '' },
  in_progress: { label: 'In Progress', Icon: PlayCircle,   color: 'text-sky-400',  bg: 'bg-sky-500/10' },
  completed:   { label: 'Completed',   Icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  paused:      { label: 'Paused',      Icon: PauseCircle,  color: 'text-amber-400', bg: 'bg-amber-500/10' },
}

interface ResourceCardProps {
  resource: ResourceWithMeta
  onUpdate?: () => void
}

export function ResourceCard({ resource, onUpdate }: ResourceCardProps) {
  const { upsertProgress, toggleBookmark } = useProgress()
  const { success, error: toastError } = useToast()
  const [bookmarked, setBookmarked]     = useState(resource.is_bookmarked)
  const [status, setStatus]             = useState<ProgressStatus>(resource.progress_status || 'not_started')
  const [saving, setSaving]             = useState(false)

  const TypeIcon = RESOURCE_TYPE_ICONS[resource.type] || Circle
  const accentColor = resource.category_color || '#6366f1'

  const handleStatusChange = async (newStatus: ProgressStatus) => {
    setSaving(true)
    const percent = newStatus === 'completed' ? 100 : newStatus === 'in_progress' ? 5 : 0
    const { error } = await upsertProgress(resource.id, newStatus, percent)
    if (error) {
      toastError('Failed to update', 'Could not save your progress.')
    } else {
      setStatus(newStatus)
      if (newStatus === 'completed') success('Completed! 🎉', resource.title)
      else if (newStatus === 'in_progress') success('Started', resource.title)
      onUpdate?.()
    }
    setSaving(false)
  }

  const handleBookmark = async () => {
    await toggleBookmark(resource.id, bookmarked)
    setBookmarked(!bookmarked)
    success(bookmarked ? 'Bookmark removed' : 'Bookmarked', resource.title)
    onUpdate?.()
  }

  const progressConfig = PROGRESS_CONFIG[status]
  const progressPct = status === 'completed' ? 100 : resource.progress_percent || 0

  return (
    <div
      className={cn(
        'believe-card flex flex-col overflow-hidden group relative',
        resource.is_featured && 'glow-brand'
      )}
    >
      {/* Category color accent line */}
      <div
        className="h-[2px] w-full flex-shrink-0"
        style={{ background: `linear-gradient(90deg, ${accentColor}80, transparent 70%)` }}
      />

      <div className="p-4 flex flex-col gap-3 flex-1">

        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
            {/* Type chip */}
            <div
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded-[var(--radius-sm)] text-[11.5px] font-medium flex-shrink-0"
              style={{ background: `${accentColor}14`, color: accentColor }}
            >
              <TypeIcon size={11} strokeWidth={2.2} />
              <span className="capitalize">{resource.type}</span>
            </div>

            {/* Difficulty */}
            {resource.difficulty && (
              <span className={cn('badge text-[11px]', DIFFICULTY_COLORS[resource.difficulty])}>
                {DIFFICULTY_LABELS[resource.difficulty]}
              </span>
            )}

            {/* Official */}
            {resource.is_official && (
              <span className="badge badge-success flex items-center gap-1">
                <BadgeCheck size={10} /> Official
              </span>
            )}

            {/* Certificate */}
            {resource.has_certificate && (
              <span className="badge flex items-center gap-1" style={{ color: '#fbbf24', borderColor: 'rgba(251,191,36,0.2)', background: 'rgba(251,191,36,0.08)' }}>
                <Award size={10} /> Cert
              </span>
            )}
          </div>

          {/* Bookmark */}
          <button
            onClick={handleBookmark}
            className={cn(
              'flex-shrink-0 w-7 h-7 rounded-[var(--radius-sm)] flex items-center justify-center transition-all',
              bookmarked
                ? 'text-indigo-400 bg-indigo-500/15'
                : 'text-[var(--text-disabled)] hover:text-[var(--text-secondary)] hover:bg-white/5'
            )}
          >
            {bookmarked
              ? <BookmarkCheck size={14} strokeWidth={2} />
              : <Bookmark      size={14} strokeWidth={1.8} />
            }
          </button>
        </div>

        {/* Title + description */}
        <div className="flex-1">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] font-semibold text-[var(--text-primary)] hover:text-white leading-snug line-clamp-2 transition-colors group/link flex items-start gap-1.5"
          >
            <span className="flex-1">{resource.title}</span>
            <ExternalLink size={12} className="flex-shrink-0 mt-0.5 opacity-0 group-hover/link:opacity-40 transition-opacity" />
          </a>
          {resource.description && (
            <p className="mt-1.5 text-[12.5px] text-[var(--text-tertiary)] leading-relaxed line-clamp-2">
              {resource.description}
            </p>
          )}
        </div>

        {/* Meta */}
        <div className="flex items-center gap-2 text-[11.5px] text-[var(--text-disabled)]">
          {resource.platform && <span>{resource.platform}</span>}
          {resource.author && (
            <>
              <span className="opacity-40">·</span>
              <span>{resource.author}</span>
            </>
          )}
          {resource.duration && (
            <>
              <span className="opacity-40">·</span>
              <span className="flex items-center gap-1">
                <Clock size={10} /> {resource.duration}
              </span>
            </>
          )}
        </div>

        {/* Tags */}
        {resource.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {resource.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="badge text-[10.5px]">{tag}</span>
            ))}
            {resource.tags.length > 4 && (
              <span className="badge text-[10.5px]">+{resource.tags.length - 4}</span>
            )}
          </div>
        )}

        {/* Progress + status footer */}
        <div className="pt-3 mt-auto border-t border-[var(--border-subtle)] space-y-2">
          {status !== 'not_started' && (
            <ProgressBar value={progressPct} color={accentColor} />
          )}

          <div className="flex items-center justify-between">
            {/* Status selector */}
            <div className="flex gap-1">
              {(Object.entries(PROGRESS_CONFIG) as [ProgressStatus, typeof progressConfig][]).map(([s, cfg]) => (
                <button
                  key={s}
                  onClick={() => handleStatusChange(s)}
                  disabled={saving}
                  title={cfg.label}
                  className={cn(
                    'w-6 h-6 rounded-[var(--radius-sm)] flex items-center justify-center transition-all',
                    status === s
                      ? `${cfg.bg} ${cfg.color}`
                      : 'text-[var(--text-disabled)] hover:text-[var(--text-tertiary)] hover:bg-white/5'
                  )}
                >
                  <cfg.Icon size={12} strokeWidth={status === s ? 2.2 : 1.8} />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <span className={cn('text-[11px] font-medium', progressConfig.color)}>
                {progressConfig.label}
              </span>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm text-[var(--brand-300)] hover:text-white px-2 py-1"
              >
                Open
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
