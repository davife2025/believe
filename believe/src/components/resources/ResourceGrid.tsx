'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, Award, X } from 'lucide-react'
import { ResourceCard } from './ResourceCard'
import type { ResourceWithMeta, ResourceFilters, ResourceType, DifficultyLevel } from '@/lib/types'
import { RESOURCE_TYPE_ICONS } from '@/lib/icons'
import { DIFFICULTY_LABELS, cn } from '@/lib/utils'

// ── Skeleton ──────────────────────────────────────────────────
function ResourceSkeleton() {
  return (
    <div className="believe-card p-4 space-y-3">
      <div className="flex gap-2">
        <div className="skeleton h-6 w-20" />
        <div className="skeleton h-6 w-16" />
      </div>
      <div className="skeleton h-4 w-full" />
      <div className="skeleton h-4 w-3/4" />
      <div className="skeleton h-3 w-1/2" />
      <div className="flex gap-1 pt-1">
        <div className="skeleton h-5 w-14" />
        <div className="skeleton h-5 w-14" />
      </div>
    </div>
  )
}

// ── Resource Grid ─────────────────────────────────────────────
interface ResourceGridProps {
  resources: ResourceWithMeta[]
  loading?:  boolean
  onUpdate?: () => void
}

export function ResourceGrid({ resources, loading, onUpdate }: ResourceGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => <ResourceSkeleton key={i} />)}
      </div>
    )
  }

  if (resources.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div
          className="w-12 h-12 rounded-[var(--radius-lg)] flex items-center justify-center mb-4"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)' }}
        >
          <Search size={20} className="text-[var(--text-disabled)]" />
        </div>
        <p className="text-[14px] font-medium text-[var(--text-tertiary)]">No resources found</p>
        <p className="text-[12.5px] text-[var(--text-disabled)] mt-1">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {resources.map((r) => (
        <ResourceCard key={r.id} resource={r} onUpdate={onUpdate} />
      ))}
    </div>
  )
}

// ── Filters bar ───────────────────────────────────────────────
const RESOURCE_TYPES: ResourceType[] = [
  'course', 'book', 'documentation', 'tool',
  'tutorial', 'github', 'roadmap', 'framework',
]

const DIFFICULTIES: DifficultyLevel[] = [
  'beginner', 'intermediate', 'advanced', 'all_levels',
]

interface ResourceFiltersBarProps {
  filters:     ResourceFilters
  onChange:    (f: ResourceFilters) => void
  totalCount:  number
  accentColor?: string
}

export function ResourceFiltersBar({
  filters,
  onChange,
  totalCount,
  accentColor = '#6366f1',
}: ResourceFiltersBarProps) {
  const [search, setSearch]     = useState(filters.search || '')
  const [expanded, setExpanded] = useState(false)

  const handleSearch = (val: string) => {
    setSearch(val)
    onChange({ ...filters, search: val || undefined })
  }

  const clearAll = () => {
    setSearch('')
    onChange({ category: filters.category })
  }

  const activeFilterCount = [
    filters.type, filters.difficulty,
    filters.has_certificate, filters.is_free === false,
    filters.search,
  ].filter(Boolean).length

  return (
    <div className="space-y-3 mb-6">
      {/* Search row */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-disabled)]"
          />
          <input
            type="text"
            placeholder="Search resources…"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="input pl-9 text-[13px] h-9"
          />
          {search && (
            <button
              onClick={() => handleSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-disabled)] hover:text-[var(--text-secondary)] transition-colors"
            >
              <X size={12} />
            </button>
          )}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className={cn(
            'btn btn-secondary btn-sm flex items-center gap-1.5 h-9',
            activeFilterCount > 0 && 'text-indigo-400 border-indigo-500/30 bg-indigo-500/8'
          )}
        >
          <SlidersHorizontal size={13} strokeWidth={2} />
          Filters
          {activeFilterCount > 0 && (
            <span
              className="w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center"
              style={{ background: accentColor, color: '#fff' }}
            >
              {activeFilterCount}
            </span>
          )}
        </button>

        <span className="text-[12.5px] text-[var(--text-disabled)] flex-shrink-0">
          {totalCount} result{totalCount !== 1 ? 's' : ''}
        </span>

        {activeFilterCount > 0 && (
          <button
            onClick={clearAll}
            className="text-[12px] text-[var(--text-disabled)] hover:text-[var(--text-tertiary)] transition-colors flex-shrink-0"
          >
            Clear
          </button>
        )}
      </div>

      {/* Expanded filters */}
      {expanded && (
        <div
          className="p-4 rounded-[var(--radius-lg)] space-y-3 animate-slide-down"
          style={{ background: 'var(--surface-overlay)', border: '1px solid var(--border-subtle)' }}
        >
          {/* Type filter */}
          <div>
            <p className="section-label mb-2">Type</p>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => onChange({ ...filters, type: undefined })}
                className={cn('badge badge-interactive', !filters.type && 'badge-active')}
              >
                All
              </button>
              {RESOURCE_TYPES.map((t) => {
                const Icon = RESOURCE_TYPE_ICONS[t]
                return (
                  <button
                    key={t}
                    onClick={() => onChange({ ...filters, type: filters.type === t ? undefined : t })}
                    className={cn('badge badge-interactive flex items-center gap-1.5',
                      filters.type === t && 'badge-active')}
                  >
                    {Icon && <Icon size={11} strokeWidth={2} />}
                    <span className="capitalize">{t}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Difficulty filter */}
          <div>
            <p className="section-label mb-2">Level</p>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => onChange({ ...filters, difficulty: undefined })}
                className={cn('badge badge-interactive', !filters.difficulty && 'badge-active')}
              >
                All Levels
              </button>
              {DIFFICULTIES.map((d) => (
                <button
                  key={d}
                  onClick={() => onChange({ ...filters, difficulty: filters.difficulty === d ? undefined : d })}
                  className={cn('badge badge-interactive',
                    filters.difficulty === d && 'badge-active')}
                >
                  {DIFFICULTY_LABELS[d]}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle filters */}
          <div className="flex items-center gap-2 pt-1 border-t border-[var(--border-subtle)]">
            <button
              onClick={() => onChange({ ...filters, has_certificate: filters.has_certificate ? undefined : true })}
              className={cn(
                'btn btn-secondary btn-sm flex items-center gap-1.5',
                filters.has_certificate && 'text-amber-400 border-amber-500/25 bg-amber-500/8'
              )}
            >
              <Award size={12} strokeWidth={2} />
              Has Certificate
            </button>
            <button
              onClick={() => onChange({ ...filters, is_free: filters.is_free === false ? undefined : false })}
              className={cn(
                'btn btn-secondary btn-sm',
                filters.is_free === false && 'text-indigo-400 border-indigo-500/25 bg-indigo-500/8'
              )}
            >
              {filters.is_free === false ? 'Paid Only' : 'Free Only'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
