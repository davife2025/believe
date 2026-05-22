'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { ResourceGrid, ResourceFiltersBar } from '@/components/resources/ResourceGrid'
import { VulnerabilityFlashcards } from '@/components/security/VulnerabilityFlashcards'
import { AuditChecklist } from '@/components/security/AuditChecklist'
import { CTFTracker, BugBountyFeed } from '@/components/security/CTFAndBounties'
import { SubcategoryTabs } from '@/components/ui/SubcategoryTabs'
import { useResources } from '@/hooks/useResources'
import type { ResourceFilters } from '@/lib/types'

type ViewMode = 'checklist' | 'flashcards' | 'ctf' | 'bounties' | 'resources'

const SUBCATEGORY_TABS = [
  { label: 'All',                   value: undefined,       icon: '🌐' },
  { label: 'Auditing',              value: 'auditing',      icon: '🔍' },
  { label: 'Tools',                 value: 'tools',         icon: '🛠️' },
  { label: 'CTF & Practice',        value: 'ctf',           icon: '🎮' },
  { label: 'Bug Bounty',            value: 'bug-bounty',    icon: '🎯' },
  { label: 'Vulnerability Research',value: 'vulnerabilities',icon: '🧬' },
]

export default function BlockchainSecurityPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('checklist')
  const [filters, setFilters] = useState<ResourceFilters>({ category: 'blockchain-security' })
  const { resources, loading, refetch } = useResources(filters)

  return (
    <div className="space-y-6">

      {/* Header */}
      <PageHeader
        icon="🔐"
        title="Blockchain Security"
        description="Audit checklists, vulnerability flashcards, CTF tracker, and live bug bounty programs."
        color="#ef4444"
      >
        <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/[0.07]">
          {([
            { id: 'checklist',  label: '📋 Checklist'  },
            { id: 'flashcards', label: '🃏 Vulns'       },
            { id: 'ctf',        label: '🎮 CTF'         },
            { id: 'bounties',   label: '🎯 Bounties'    },
            { id: 'resources',  label: '📚 Resources'   },
          ] as { id: ViewMode; label: string }[]).map((v) => (
            <button
              key={v.id}
              onClick={() => setViewMode(v.id)}
              className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all ${
                viewMode === v.id
                  ? 'bg-red-500/20 text-red-400'
                  : 'text-white/35 hover:text-white/60'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </PageHeader>

      {viewMode === 'checklist'  && <AuditChecklist />}
      {viewMode === 'flashcards' && <VulnerabilityFlashcards />}
      {viewMode === 'ctf'        && <CTFTracker />}
      {viewMode === 'bounties'   && <BugBountyFeed />}

      {viewMode === 'resources' && (
        <div className="space-y-4">
          <SubcategoryTabs
            tabs={SUBCATEGORY_TABS}
            active={filters.subcategory}
            onChange={(v) => setFilters({ ...filters, subcategory: v })}
            color="#ef4444"
          />
          <ResourceFiltersBar
            filters={filters}
            onChange={(f) => setFilters({ ...f, category: 'blockchain-security' })}
            totalCount={resources.length}
          />
          <ResourceGrid resources={resources} loading={loading} onUpdate={refetch} />
        </div>
      )}
    </div>
  )
}
