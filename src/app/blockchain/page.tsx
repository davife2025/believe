'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { ResourceGrid, ResourceFiltersBar } from '@/components/resources/ResourceGrid'
import { useResources } from '@/hooks/useResources'
import type { ResourceFilters } from '@/lib/types'

export default function BlockchainPage() {
  const [filters, setFilters] = useState<ResourceFilters>({ category: 'blockchain' })
  const { resources, loading, refetch } = useResources(filters)

  const chains = [
    { label: 'All Chains', value: undefined },
    { label: '🔷 Ethereum', value: 'ethereum' },
    { label: '◎ Solana', value: 'solana' },
    { label: '₿ Bitcoin', value: 'bitcoin' },
    { label: '⚡ Layer 2', value: 'layer2' },
    { label: '🌐 Multi-Chain', value: 'multi-chain' },
    { label: '💱 DeFi', value: 'defi' },
    { label: '🧱 Fundamentals', value: 'fundamentals' },
    { label: '📚 Books', value: 'books' },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        icon="⛓️"
        title="Blockchain"
        description="Ethereum, Solana, Bitcoin, L2s, and every chain you need to know."
        color="#f59e0b"
      />

      <div className="flex flex-wrap gap-2">
        {chains.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setFilters({ ...filters, subcategory: tab.value })}
            className={`tag-pill cursor-pointer text-xs py-1 px-3 ${
              filters.subcategory === tab.value
                ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                : ''
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ResourceFiltersBar
        filters={filters}
        onChange={(f) => setFilters({ ...f, category: 'blockchain' })}
        totalCount={resources.length}
      />

      <ResourceGrid resources={resources} loading={loading} onUpdate={refetch} />
    </div>
  )
}
