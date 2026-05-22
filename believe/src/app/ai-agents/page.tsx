'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { ResourceGrid, ResourceFiltersBar } from '@/components/resources/ResourceGrid'
import { FrameworkCard, FrameworkCompare } from '@/components/agents/FrameworkCard'
import { MCPExplorer } from '@/components/agents/MCPExplorer'
import { AgentProjectBuilder } from '@/components/agents/AgentProjectBuilder'
import { SubcategoryTabs } from '@/components/ui/SubcategoryTabs'
import { useResources } from '@/hooks/useResources'
import { AGENT_FRAMEWORKS } from '@/data/agent-frameworks'
import type { ResourceFilters } from '@/lib/types'
import type { Framework } from '@/data/agent-frameworks'

type ViewMode = 'resources' | 'frameworks' | 'mcp' | 'projects'

const SUBCATEGORY_TABS = [
  { label: 'All',           value: undefined,    icon: '🌐' },
  { label: 'Frameworks',    value: 'frameworks', icon: '⚙️' },
  { label: 'Courses',       value: 'courses',    icon: '🎓' },
  { label: 'MCP',           value: 'mcp',        icon: '🔌' },
  { label: 'RAG & Retrieval', value: 'rag',      icon: '🗄️' },
  { label: 'Projects',      value: 'projects',   icon: '💾' },
]

export default function AiAgentsPage() {
  const [filters, setFilters] = useState<ResourceFilters>({ category: 'ai-agents' })
  const [viewMode, setViewMode] = useState<ViewMode>('frameworks')
  const [selected, setSelected] = useState<Framework[]>([])
  const { resources, loading, refetch } = useResources(filters)

  const toggleSelect = (fw: Framework) => {
    setSelected((prev) =>
      prev.find((f) => f.id === fw.id)
        ? prev.filter((f) => f.id !== fw.id)
        : prev.length < 4 ? [...prev, fw] : prev
    )
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <PageHeader
        icon="⚡"
        title="AI Agents"
        description="Frameworks, MCP servers, real projects, and every resource to build autonomous agents."
        color="#a855f7"
      >
        {/* View toggle */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/[0.07]">
          {([
            { id: 'frameworks', label: '⚙️ Frameworks' },
            { id: 'mcp',        label: '🔌 MCP' },
            { id: 'projects',   label: '🏗️ Projects' },
            { id: 'resources',  label: '📋 Resources' },
          ] as { id: ViewMode; label: string }[]).map((v) => (
            <button
              key={v.id}
              onClick={() => setViewMode(v.id)}
              className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all ${
                viewMode === v.id
                  ? 'bg-purple-500/20 text-purple-400'
                  : 'text-white/35 hover:text-white/60'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </PageHeader>

      {/* ── FRAMEWORKS VIEW ── */}
      {viewMode === 'frameworks' && (
        <div className="space-y-6">
          {selected.length > 0 && (
            <div className="flex items-center justify-between">
              <p className="text-[12px] text-white/35">
                {selected.length} selected for comparison
                {selected.length < 2 && ' — select one more to compare'}
              </p>
              <button
                onClick={() => setSelected([])}
                className="text-[11px] text-white/25 hover:text-white/50 transition-colors"
              >
                Clear selection
              </button>
            </div>
          )}

          {/* Comparison table */}
          {selected.length >= 2 && <FrameworkCompare frameworks={selected} />}

          {/* Cards grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {AGENT_FRAMEWORKS.map((fw) => (
              <FrameworkCard
                key={fw.id}
                framework={fw}
                selected={!!selected.find((f) => f.id === fw.id)}
                onSelect={() => toggleSelect(fw)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── MCP VIEW ── */}
      {viewMode === 'mcp' && <MCPExplorer />}

      {/* ── PROJECTS VIEW ── */}
      {viewMode === 'projects' && <AgentProjectBuilder />}

      {/* ── RESOURCES VIEW ── */}
      {viewMode === 'resources' && (
        <div className="space-y-4">
          <SubcategoryTabs
            tabs={SUBCATEGORY_TABS}
            active={filters.subcategory}
            onChange={(v) => setFilters({ ...filters, subcategory: v })}
            color="#a855f7"
          />
          <ResourceFiltersBar
            filters={filters}
            onChange={(f) => setFilters({ ...f, category: 'ai-agents' })}
            totalCount={resources.length}
          />
          <ResourceGrid resources={resources} loading={loading} onUpdate={refetch} />
        </div>
      )}
    </div>
  )
}
