'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { ResourceGrid, ResourceFiltersBar } from '@/components/resources/ResourceGrid'
import { RoadmapPathView } from '@/components/aiml/RoadmapPathView'
import { ReadingList } from '@/components/aiml/ReadingList'
import { SubcategoryTabs } from '@/components/ui/SubcategoryTabs'
import { useResources } from '@/hooks/useResources'
import { AI_ML_ROADMAPS, getRoadmapBySlug } from '@/data/aiml-roadmaps'
import type { ResourceFilters } from '@/lib/types'

type ViewMode = 'resources' | 'roadmap' | 'reading'

const SUBCATEGORY_TABS = [
  { label: 'All',                   value: undefined,           icon: '🌐' },
  { label: 'Fundamentals',          value: 'fundamentals',      icon: '🧠' },
  { label: 'Machine Learning',      value: 'machine-learning',  icon: '📐' },
  { label: 'Deep Learning',         value: 'deep-learning',     icon: '🔥' },
  { label: 'LLMs',                  value: 'llms',              icon: '💬' },
  { label: 'Prompt Engineering',    value: 'prompt-engineering',icon: '✍️' },
  { label: 'Computer Vision',       value: 'computer-vision',   icon: '🖼️' },
  { label: 'NLP',                   value: 'nlp',               icon: '🔤' },
  { label: 'Reinforcement Learning',value: 'rl',                icon: '🎮' },
  { label: 'Books',                 value: 'books',             icon: '📚' },
]

export default function AiMlPage() {
  const [filters, setFilters] = useState<ResourceFilters>({ category: 'ai-ml' })
  const [viewMode, setViewMode] = useState<ViewMode>('resources')
  const [activeRoadmap, setActiveRoadmap] = useState<string | undefined>(
    AI_ML_ROADMAPS[0]?.slug
  )

  const { resources, loading, refetch } = useResources(filters)

  const currentRoadmap = activeRoadmap ? getRoadmapBySlug(activeRoadmap) : undefined

  return (
    <div className="space-y-6">

      {/* Header */}
      <PageHeader
        icon="🤖"
        title="AI & Machine Learning"
        description="Every free resource — courses, books, papers, tools — to take you from zero to builder."
        color="#8b5cf6"
      >
        {/* View mode toggle */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/[0.07]">
          {([
            { id: 'resources', label: '📋 Resources' },
            { id: 'roadmap',   label: '🗺️ Roadmap' },
            { id: 'reading',   label: '📚 Reading List' },
          ] as { id: ViewMode; label: string }[]).map((v) => (
            <button
              key={v.id}
              onClick={() => setViewMode(v.id)}
              className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all ${
                viewMode === v.id
                  ? 'bg-indigo-500/20 text-indigo-400'
                  : 'text-white/35 hover:text-white/60'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </PageHeader>

      {/* ── RESOURCES VIEW ── */}
      {viewMode === 'resources' && (
        <div className="space-y-4">
          <SubcategoryTabs
            tabs={SUBCATEGORY_TABS}
            active={filters.subcategory}
            onChange={(v) => setFilters({ ...filters, subcategory: v })}
            color="#8b5cf6"
          />
          <ResourceFiltersBar
            filters={filters}
            onChange={(f) => setFilters({ ...f, category: 'ai-ml' })}
            totalCount={resources.length}
          />
          <ResourceGrid resources={resources} loading={loading} onUpdate={refetch} />
        </div>
      )}

      {/* ── ROADMAP VIEW ── */}
      {viewMode === 'roadmap' && (
        <div className="space-y-4">
          {/* Roadmap selector */}
          <div className="flex flex-wrap gap-2">
            {AI_ML_ROADMAPS.map((r) => (
              <button
                key={r.slug}
                onClick={() => setActiveRoadmap(r.slug)}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] font-medium border transition-all ${
                  activeRoadmap === r.slug
                    ? 'text-white'
                    : 'bg-white/[0.03] text-white/40 border-white/[0.07] hover:text-white/60'
                }`}
                style={
                  activeRoadmap === r.slug
                    ? { background: `${r.color}15`, borderColor: `${r.color}35`, color: r.color }
                    : {}
                }
              >
                <span>{r.icon}</span>
                <span>{r.title}</span>
                <span className="text-[10px] text-white/25">~{r.totalHours}h</span>
              </button>
            ))}
          </div>

          {/* Active roadmap */}
          {currentRoadmap && <RoadmapPathView roadmap={currentRoadmap} />}
        </div>
      )}

      {/* ── READING LIST VIEW ── */}
      {viewMode === 'reading' && (
        <div className="space-y-4">
          {/* Quick tip */}
          <div className="believe-card p-4 flex items-center gap-3 border-violet-500/20 bg-violet-500/5">
            <span className="text-xl">💡</span>
            <div>
              <p className="text-sm font-medium text-violet-300">All books here are completely free.</p>
              <p className="text-xs text-white/40 mt-0.5">
                Track what you want to read, what you're reading, and what you've finished.
              </p>
            </div>
          </div>
          <ReadingList />
        </div>
      )}
    </div>
  )
}
