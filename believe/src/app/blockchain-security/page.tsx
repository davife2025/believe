'use client'
import { useState } from 'react'
import { Shield } from 'lucide-react'
import { PageHeader, ViewToggle } from '@/components/layout/PageHeader'
import { ResourceGrid, ResourceFiltersBar } from '@/components/resources/ResourceGrid'
import { VulnerabilityFlashcards } from '@/components/security/VulnerabilityFlashcards'
import { AuditChecklist } from '@/components/security/AuditChecklist'
import { CTFTracker, BugBountyFeed } from '@/components/security/CTFAndBounties'
import { SubcategoryTabs } from '@/components/ui/SubcategoryTabs'
import { useResources } from '@/hooks/useResources'
import type { ResourceFilters } from '@/lib/types'

type View = 'checklist' | 'flashcards' | 'ctf' | 'bounties' | 'resources'

const TABS = [
  {label:'All',value:undefined},{label:'Auditing',value:'auditing'},
  {label:'Tools',value:'tools'},{label:'CTF',value:'ctf'},
  {label:'Bug Bounty',value:'bug-bounty'},{label:'Research',value:'vulnerabilities'},
]

export default function SecurityPage() {
  const [view, setView]         = useState<View>('checklist')
  const [filters, setFilters]   = useState<ResourceFilters>({ category: 'blockchain-security' })
  const { resources, loading, refetch } = useResources(filters)

  return (
    <div className="space-y-6">
      <PageHeader icon={Shield} title="Blockchain Security" description="Audit checklists, vulnerability flashcards, CTF tracker, and live bug bounty programs." color="#ef4444">
        <ViewToggle views={[{id:'checklist',label:'📋 Checklist'},{id:'flashcards',label:'🃏 Vulns'},{id:'ctf',label:'🎮 CTF'},{id:'bounties',label:'🎯 Bounties'},{id:'resources',label:'📚 Resources'}]} active={view} onChange={(v) => setView(v as View)} color="#ef4444" />
      </PageHeader>
      {view === 'checklist'  && <AuditChecklist />}
      {view === 'flashcards' && <VulnerabilityFlashcards />}
      {view === 'ctf'        && <CTFTracker />}
      {view === 'bounties'   && <BugBountyFeed />}
      {view === 'resources'  && (
        <>
          <SubcategoryTabs tabs={TABS} active={filters.subcategory} onChange={(v) => setFilters({...filters,subcategory:v})} color="#ef4444" />
          <ResourceFiltersBar filters={filters} onChange={(f) => setFilters({...f,category:'blockchain-security'})} totalCount={resources.length} accentColor="#ef4444" />
          <ResourceGrid resources={resources} loading={loading} onUpdate={refetch} />
        </>
      )}
    </div>
  )
}
