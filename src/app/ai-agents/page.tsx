// ============================================================
// src/app/ai-agents/page.tsx
// ============================================================
'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { ResourceGrid, ResourceFiltersBar } from '@/components/resources/ResourceGrid'
import { useResources } from '@/hooks/useResources'
import type { ResourceFilters } from '@/lib/types'

export default function AiAgentsPage() {
  const [filters, setFilters] = useState<ResourceFilters>({ category: 'ai-agents' })
  const { resources, loading, refetch } = useResources(filters)

  return (
    <div className="space-y-6">
      <PageHeader
        icon="⚡"
        title="AI Agents"
        description="Autonomous agents, multi-agent systems, MCP, RAG, and agentic frameworks."
        color="#a855f7"
      />

      <div className="flex flex-wrap gap-2">
        {[
          { label: 'All', value: undefined },
          { label: '⚙️ Frameworks', value: 'frameworks' },
          { label: '🎓 Courses', value: 'courses' },
          { label: '🔌 MCP', value: 'mcp' },
          { label: '🗄️ RAG & Retrieval', value: 'rag' },
          { label: '💾 Projects & GitHub', value: 'projects' },
        ].map((tab) => (
          <button
            key={tab.label}
            onClick={() => setFilters({ ...filters, subcategory: tab.value })}
            className={`tag-pill cursor-pointer text-xs py-1 px-3 ${
              filters.subcategory === tab.value
                ? 'bg-purple-500/15 text-purple-400 border-purple-500/30'
                : ''
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ResourceFiltersBar
        filters={filters}
        onChange={(f) => setFilters({ ...f, category: 'ai-agents' })}
        totalCount={resources.length}
      />

      <ResourceGrid resources={resources} loading={loading} onUpdate={refetch} />
    </div>
  )
}
