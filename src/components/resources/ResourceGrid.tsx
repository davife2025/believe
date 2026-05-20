'use client'

import { useState } from 'react'
import { ResourceCard } from './ResourceCard'
import type { ResourceWithMeta, ResourceFilters, ResourceType, DifficultyLevel } from '@/lib/types'
import { TYPE_LABELS, TYPE_ICONS, DIFFICULTY_LABELS, cn } from '@/lib/utils'

// ── Resource Grid ─────────────────────────────────────────────
interface ResourceGridProps {
  resources: ResourceWithMeta[]
  loading?: boolean
  onUpdate?: () => void
}

export function ResourceGrid({ resources, loading, onUpdate }: ResourceGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="believe-card p-5 h-52 animate-pulse">
            <div className="h-4 bg-white/5 rounded w-1/3 mb-3" />
            <div className="h-3 bg-white/5 rounded w-full mb-2" />
            <div className="h-3 bg-white/5 rounded w-3/4" />
          </div>
        ))}
      </div>
    )
  }

  if (resources.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-4xl mb-3">🔍</div>
        <p className="text-sm font-medium text-white/40">No resources found</p>
        <p className="text-xs text-white/25 mt-1">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} onUpdate={onUpdate} />
      ))}
    </div>
  )
}

// ── Resource Filters Bar ──────────────────────────────────────
interface ResourceFiltersBarProps {
  filters: ResourceFilters
  onChange: (filters: ResourceFilters) => void
  totalCount: number
}

const RESOURCE_TYPES: ResourceType[] = [
  'course', 'book', 'documentation', 'tool',
  'tutorial', 'github', 'roadmap', 'framework',
]

const DIFFICULTIES: DifficultyLevel[] = ['beginner', 'intermediate', 'advanced', 'all_levels']

export function ResourceFiltersBar({ filters, onChange, totalCount }: ResourceFiltersBarProps) {
  const [search, setSearch] = useState(filters.search || '')

  const handleSearch = (value: string) => {
    setSearch(value)
    onChange({ ...filters, search: value || undefined })
  }

  const setType = (type: ResourceType | undefined) => onChange({ ...filters, type })
  const setDifficulty = (difficulty: DifficultyLevel | undefined) => onChange({ ...filters, difficulty })
  const setFree = (val: boolean | undefined) => onChange({ ...filters, is_free: val })
  const setCert = (val: boolean | undefined) => onChange({ ...filters, has_certificate: val })

  return (
    <div className="space-y-3 mb-6">
      {/* Search + count */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search resources…"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white/80 placeholder:text-white/20 outline-none focus:border-indigo-500/50 transition-colors"
          />
        </div>
        <span className="text-[12px] text-white/30 flex-shrink-0">
          {totalCount} resource{totalCount !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {/* Type filter */}
        <div className="flex items-center gap-1 flex-wrap">
          <span className="text-[11px] text-white/25 pr-1">Type:</span>
          <button
            onClick={() => setType(undefined)}
            className={cn(
              'tag-pill cursor-pointer',
              !filters.type && 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
            )}
          >
            All
          </button>
          {RESOURCE_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setType(filters.type === t ? undefined : t)}
              className={cn(
                'tag-pill cursor-pointer',
                filters.type === t && 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
              )}
            >
              {TYPE_ICONS[t]} {TYPE_LABELS[t]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Difficulty filter */}
        <div className="flex items-center gap-1 flex-wrap">
          <span className="text-[11px] text-white/25 pr-1">Level:</span>
          <button
            onClick={() => setDifficulty(undefined)}
            className={cn(
              'tag-pill cursor-pointer',
              !filters.difficulty && 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
            )}
          >
            All
          </button>
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(filters.difficulty === d ? undefined : d)}
              className={cn(
                'tag-pill cursor-pointer',
                filters.difficulty === d && 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
              )}
            >
              {DIFFICULTY_LABELS[d]}
            </button>
          ))}
        </div>

        {/* Toggle filters */}
        <div className="flex items-center gap-1 ml-auto">
          <button
            onClick={() => setCert(filters.has_certificate ? undefined : true)}
            className={cn(
              'tag-pill cursor-pointer',
              filters.has_certificate && 'bg-amber-500/15 text-amber-400 border-amber-500/30'
            )}
          >
            🏅 Has Certificate
          </button>
          <button
            onClick={() => setFree(filters.is_free === false ? undefined : false)}
            className={cn(
              'tag-pill cursor-pointer',
              filters.is_free === false && 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
            )}
          >
            {filters.is_free === false ? '💎 Paid Only' : '✓ Free Only'}
          </button>
        </div>
      </div>
    </div>
  )
}
