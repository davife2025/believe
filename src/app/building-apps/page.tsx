'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { ResourceGrid, ResourceFiltersBar } from '@/components/resources/ResourceGrid'
import { DevToolGrid } from '@/components/building/DevToolCard'
import { StackRecommender, ProjectTemplates } from '@/components/building/StackRecommender'
import { SubcategoryTabs } from '@/components/ui/SubcategoryTabs'
import { useResources } from '@/hooks/useResources'
import type { ResourceFilters } from '@/lib/types'

type ViewMode = 'tools' | 'recommender' | 'templates' | 'resources'

const SUBCATEGORY_TABS = [
  { label: 'All',            value: undefined,       icon: '🌐' },
  { label: 'Dev Tools',      value: 'tools',         icon: '🔧' },
  { label: 'Frameworks',     value: 'frameworks',    icon: '⚙️' },
  { label: 'Tutorials',      value: 'tutorials',     icon: '🧑‍💻' },
  { label: 'Infrastructure', value: 'infrastructure',icon: '🌐' },
]

export default function BuildingAppsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('tools')
  const [filters, setFilters] = useState<ResourceFilters>({ category: 'building-apps' })
  const { resources, loading, refetch } = useResources(filters)

  return (
    <div className="space-y-6">
      <PageHeader
        icon="🏗️"
        title="Building Applications"
        description="Every tool, framework, and stack to go from idea to deployed dApp — with build checklists."
        color="#10b981"
      >
        <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/[0.07]">
          {([
            { id: 'tools',       label: '🔧 Tools'       },
            { id: 'recommender', label: '🧙 Stack Quiz'   },
            { id: 'templates',   label: '📐 Templates'    },
            { id: 'resources',   label: '📚 Resources'    },
          ] as { id: ViewMode; label: string }[]).map((v) => (
            <button
              key={v.id}
              onClick={() => setViewMode(v.id)}
              className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all ${
                viewMode === v.id
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'text-white/35 hover:text-white/60'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </PageHeader>

      {viewMode === 'tools'       && <DevToolGrid />}
      {viewMode === 'recommender' && <StackRecommender />}
      {viewMode === 'templates'   && <ProjectTemplates />}

      {viewMode === 'resources' && (
        <div className="space-y-4">
          <SubcategoryTabs
            tabs={SUBCATEGORY_TABS}
            active={filters.subcategory}
            onChange={(v) => setFilters({ ...filters, subcategory: v })}
            color="#10b981"
          />
          <ResourceFiltersBar
            filters={filters}
            onChange={(f) => setFilters({ ...f, category: 'building-apps' })}
            totalCount={resources.length}
          />
          <ResourceGrid resources={resources} loading={loading} onUpdate={refetch} />
        </div>
      )}
    </div>
  )
}
