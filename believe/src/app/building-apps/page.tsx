'use client'
import { useState } from 'react'
import { Hammer } from 'lucide-react'
import { PageHeader, ViewToggle } from '@/components/layout/PageHeader'
import { ResourceGrid, ResourceFiltersBar } from '@/components/resources/ResourceGrid'
import { DevToolGrid } from '@/components/building/DevToolCard'
import { StackRecommender, ProjectTemplates } from '@/components/building/StackRecommender'
import { SubcategoryTabs } from '@/components/ui/SubcategoryTabs'
import { useResources } from '@/hooks/useResources'
import type { ResourceFilters } from '@/lib/types'

type View = 'tools' | 'recommender' | 'templates' | 'resources'

const TABS = [
  {label:'All',value:undefined},{label:'Dev Tools',value:'tools'},
  {label:'Frameworks',value:'frameworks'},{label:'Tutorials',value:'tutorials'},
  {label:'Infrastructure',value:'infrastructure'},
]

export default function BuildingAppsPage() {
  const [view, setView]         = useState<View>('tools')
  const [filters, setFilters]   = useState<ResourceFilters>({ category: 'building-apps' })
  const { resources, loading, refetch } = useResources(filters)

  return (
    <div className="space-y-6">
      <PageHeader icon={Hammer} title="Building Applications" description="Every tool, framework, and stack template to go from idea to deployed dApp." color="#10b981">
        <ViewToggle views={[{id:'tools',label:'🔧 Tools'},{id:'recommender',label:'🧙 Stack Quiz'},{id:'templates',label:'📐 Templates'},{id:'resources',label:'📚 Resources'}]} active={view} onChange={(v) => setView(v as View)} color="#10b981" />
      </PageHeader>
      {view === 'tools'       && <DevToolGrid />}
      {view === 'recommender' && <StackRecommender />}
      {view === 'templates'   && <ProjectTemplates />}
      {view === 'resources'   && (
        <>
          <SubcategoryTabs tabs={TABS} active={filters.subcategory} onChange={(v) => setFilters({...filters,subcategory:v})} color="#10b981" />
          <ResourceFiltersBar filters={filters} onChange={(f) => setFilters({...f,category:'building-apps'})} totalCount={resources.length} accentColor="#10b981" />
          <ResourceGrid resources={resources} loading={loading} onUpdate={refetch} />
        </>
      )}
    </div>
  )
}
