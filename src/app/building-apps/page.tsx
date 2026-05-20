'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { ResourceGrid, ResourceFiltersBar } from '@/components/resources/ResourceGrid'
import { useResources } from '@/hooks/useResources'
import type { ResourceFilters } from '@/lib/types'

export default function BuildingAppsPage() {
  const [filters, setFilters] = useState<ResourceFilters>({ category: 'building-apps' })
  const { resources, loading, refetch } = useResources(filters)

  return (
    <div className="space-y-6">
      <PageHeader
        icon="🏗️"
        title="Building Applications"
        description="Full-stack dApps, Web3 frameworks, dev tools, node providers, and tutorials."
        color="#10b981"
      />

      <div className="flex flex-wrap gap-2">
        {[
          { label: 'All', value: undefined },
          { label: '🔧 Dev Tools', value: 'tools' },
          { label: '⚙️ Frameworks', value: 'frameworks' },
          { label: '🧑‍💻 Tutorials', value: 'tutorials' },
          { label: '💻 Languages', value: 'languages' },
          { label: '🌐 Infrastructure', value: 'infrastructure' },
        ].map((tab) => (
          <button
            key={tab.label}
            onClick={() => setFilters({ ...filters, subcategory: tab.value })}
            className={`tag-pill cursor-pointer text-xs py-1 px-3 ${
              filters.subcategory === tab.value
                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                : ''
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ResourceFiltersBar
        filters={filters}
        onChange={(f) => setFilters({ ...f, category: 'building-apps' })}
        totalCount={resources.length}
      />

      <ResourceGrid resources={resources} loading={loading} onUpdate={refetch} />
    </div>
  )
}
