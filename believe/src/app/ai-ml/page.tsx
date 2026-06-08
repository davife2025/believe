// ============================================================
// src/app/ai-ml/page.tsx
// ============================================================
'use client'

import { useState } from 'react'
import { Brain } from 'lucide-react'
import { PageHeader, ViewToggle } from '@/components/layout/PageHeader'
import { ResourceGrid, ResourceFiltersBar } from '@/components/resources/ResourceGrid'
import { RoadmapPathView } from '@/components/aiml/RoadmapPathView'
import { ReadingList } from '@/components/aiml/ReadingList'
import { SubcategoryTabs } from '@/components/ui/SubcategoryTabs'
import { useResources } from '@/hooks/useResources'
import { AI_ML_ROADMAPS, getRoadmapBySlug } from '@/data/aiml-roadmaps'
import type { ResourceFilters } from '@/lib/types'

type View = 'resources' | 'roadmap' | 'reading'

const TABS = [
  { label: 'All',          value: undefined           },
  { label: 'Fundamentals', value: 'fundamentals'      },
  { label: 'ML',           value: 'machine-learning'  },
  { label: 'Deep Learning',value: 'deep-learning'     },
  { label: 'LLMs',         value: 'llms'              },
  { label: 'Prompting',    value: 'prompt-engineering'},
  { label: 'Computer Vision',value:'computer-vision'  },
  { label: 'NLP',          value: 'nlp'               },
  { label: 'RL',           value: 'rl'                },
  { label: 'Books',        value: 'books'             },
]

export default function AiMlPage() {
  const [view, setView]           = useState<View>('resources')
  const [filters, setFilters]     = useState<ResourceFilters>({ category: 'ai-ml' })
  const [activeRoadmap, setRoadmap] = useState(AI_ML_ROADMAPS[0]?.slug)
  const { resources, loading, refetch } = useResources(filters)

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Brain}
        title="AI & Machine Learning"
        description="Every free course, book, and tool to go from zero to building with AI."
        color="#8b5cf6"
        badge={`${resources.length} resources`}
      >
        <ViewToggle
          views={[
            { id: 'resources', label: '📋 Resources' },
            { id: 'roadmap',   label: '🗺️ Roadmap'   },
            { id: 'reading',   label: '📚 Reading'    },
          ]}
          active={view}
          onChange={(v) => setView(v as View)}
          color="#8b5cf6"
        />
      </PageHeader>

      {view === 'resources' && (
        <>
          <SubcategoryTabs tabs={TABS} active={filters.subcategory} onChange={(v) => setFilters({ ...filters, subcategory: v })} color="#8b5cf6" />
          <ResourceFiltersBar filters={filters} onChange={(f) => setFilters({ ...f, category: 'ai-ml' })} totalCount={resources.length} accentColor="#8b5cf6" />
          <ResourceGrid resources={resources} loading={loading} onUpdate={refetch} />
        </>
      )}

      {view === 'roadmap' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {AI_ML_ROADMAPS.map((r) => (
              <button key={r.slug} onClick={() => setRoadmap(r.slug)}
                className="btn btn-secondary btn-sm"
                style={activeRoadmap === r.slug ? { background: `${r.color}18`, color: r.color, borderColor: `${r.color}35` } : {}}>
                {r.icon} {r.title} <span className="text-[var(--text-disabled)] text-[10px]">~{r.totalHours}h</span>
              </button>
            ))}
          </div>
          {activeRoadmap && getRoadmapBySlug(activeRoadmap) && (
            <RoadmapPathView roadmap={getRoadmapBySlug(activeRoadmap)!} />
          )}
        </div>
      )}

      {view === 'reading' && <ReadingList />}
    </div>
  )
}
