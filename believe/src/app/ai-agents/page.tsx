'use client'
import { useState } from 'react'
import { Bot } from 'lucide-react'
import { PageHeader, ViewToggle } from '@/components/layout/PageHeader'
import { ResourceGrid, ResourceFiltersBar } from '@/components/resources/ResourceGrid'
import { FrameworkCard, FrameworkCompare } from '@/components/agents/FrameworkCard'
import { MCPExplorer } from '@/components/agents/MCPExplorer'
import { AgentProjectBuilder } from '@/components/agents/AgentProjectBuilder'
import { SubcategoryTabs } from '@/components/ui/SubcategoryTabs'
import { useResources } from '@/hooks/useResources'
import { AGENT_FRAMEWORKS } from '@/data/agent-frameworks'
import type { ResourceFilters } from '@/lib/types'
import type { Framework } from '@/data/agent-frameworks'

type View = 'frameworks' | 'mcp' | 'projects' | 'resources'

const TABS = [
  { label: 'All',       value: undefined    },
  { label: 'Frameworks',value: 'frameworks' },
  { label: 'Courses',   value: 'courses'    },
  { label: 'MCP',       value: 'mcp'        },
  { label: 'RAG',       value: 'rag'        },
  { label: 'Projects',  value: 'projects'   },
]

export default function AiAgentsPage() {
  const [view, setView]         = useState<View>('frameworks')
  const [filters, setFilters]   = useState<ResourceFilters>({ category: 'ai-agents' })
  const [selected, setSelected] = useState<Framework[]>([])
  const { resources, loading, refetch } = useResources(filters)

  const toggle = (fw: Framework) =>
    setSelected((p) => p.find((f) => f.id === fw.id) ? p.filter((f) => f.id !== fw.id) : p.length < 4 ? [...p, fw] : p)

  return (
    <div className="space-y-6">
      <PageHeader icon={Bot} title="AI Agents" description="Frameworks, MCP servers, and real projects to build autonomous agents." color="#a855f7">
        <ViewToggle views={[{id:'frameworks',label:'⚙️ Frameworks'},{id:'mcp',label:'🔌 MCP'},{id:'projects',label:'🏗️ Projects'},{id:'resources',label:'📚 Resources'}]} active={view} onChange={(v) => setView(v as View)} color="#a855f7" />
      </PageHeader>
      {view === 'frameworks' && (
        <div className="space-y-5">
          {selected.length >= 2 && <FrameworkCompare frameworks={selected} />}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {AGENT_FRAMEWORKS.map((fw) => <FrameworkCard key={fw.id} framework={fw} selected={!!selected.find((f) => f.id === fw.id)} onSelect={() => toggle(fw)} />)}
          </div>
        </div>
      )}
      {view === 'mcp'      && <MCPExplorer />}
      {view === 'projects' && <AgentProjectBuilder />}
      {view === 'resources' && (
        <>
          <SubcategoryTabs tabs={TABS} active={filters.subcategory} onChange={(v) => setFilters({...filters,subcategory:v})} color="#a855f7" />
          <ResourceFiltersBar filters={filters} onChange={(f) => setFilters({...f,category:'ai-agents'})} totalCount={resources.length} accentColor="#a855f7" />
          <ResourceGrid resources={resources} loading={loading} onUpdate={refetch} />
        </>
      )}
    </div>
  )
}
