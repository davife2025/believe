'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { ResourceGrid, ResourceFiltersBar } from '@/components/resources/ResourceGrid'
import { useResources } from '@/hooks/useResources'
import type { ResourceFilters } from '@/lib/types'

export default function BlockchainSecurityPage() {
  const [filters, setFilters] = useState<ResourceFilters>({ category: 'blockchain-security' })
  const { resources, loading, refetch } = useResources(filters)

  return (
    <div className="space-y-6">
      <PageHeader
        icon="🔐"
        title="Blockchain Security"
        description="Smart contract auditing, bug bounties, CTF challenges, and security tools."
        color="#ef4444"
      />

      {/* Threat level banner */}
      <div className="believe-card p-4 flex items-center gap-3 border-red-500/20 bg-red-500/5">
        <span className="text-xl">⚠️</span>
        <div>
          <p className="text-sm font-medium text-red-300">Security Mindset Required</p>
          <p className="text-xs text-white/40 mt-0.5">
            Study real exploits. Practice on Ethernaut and Damn Vulnerable DeFi before touching live contracts.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { label: 'All', value: undefined },
          { label: '🔍 Auditing', value: 'auditing' },
          { label: '🛠️ Tools', value: 'tools' },
          { label: '🎮 CTF & Practice', value: 'ctf' },
          { label: '🎯 Bug Bounty', value: 'bug-bounty' },
          { label: '🧬 Vulnerability Research', value: 'vulnerabilities' },
        ].map((tab) => (
          <button
            key={tab.label}
            onClick={() => setFilters({ ...filters, subcategory: tab.value })}
            className={`tag-pill cursor-pointer text-xs py-1 px-3 ${
              filters.subcategory === tab.value
                ? 'bg-red-500/15 text-red-400 border-red-500/30'
                : ''
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ResourceFiltersBar
        filters={filters}
        onChange={(f) => setFilters({ ...f, category: 'blockchain-security' })}
        totalCount={resources.length}
      />

      <ResourceGrid resources={resources} loading={loading} onUpdate={refetch} />
    </div>
  )
}
