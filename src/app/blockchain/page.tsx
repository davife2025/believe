'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { ResourceGrid, ResourceFiltersBar } from '@/components/resources/ResourceGrid'
import { ChainCard, ChainCompare } from '@/components/blockchain/ChainCard'
import { SoliditySnippetLibrary } from '@/components/blockchain/SoliditySnippets'
import { GasTracker, TestnetFaucets } from '@/components/blockchain/GasTracker'
import { SubcategoryTabs } from '@/components/ui/SubcategoryTabs'
import { useResources } from '@/hooks/useResources'
import { CHAINS } from '@/data/blockchain-chains'
import type { Chain } from '@/data/blockchain-chains'
import type { ResourceFilters } from '@/lib/types'

type ViewMode = 'chains' | 'snippets' | 'tools' | 'resources'

const SUBCATEGORY_TABS = [
  { label: 'All',          value: undefined,      icon: '🌐' },
  { label: 'Ethereum',     value: 'ethereum',     icon: '🔷' },
  { label: 'Solana',       value: 'solana',       icon: '◎'  },
  { label: 'Bitcoin',      value: 'bitcoin',      icon: '₿'  },
  { label: 'Layer 2',      value: 'layer2',       icon: '⚡' },
  { label: 'Multi-Chain',  value: 'multi-chain',  icon: '🌐' },
  { label: 'DeFi',         value: 'defi',         icon: '💱' },
  { label: 'Fundamentals', value: 'fundamentals', icon: '🧱' },
  { label: 'Books',        value: 'books',        icon: '📚' },
]

const CHAIN_TYPE_TABS = [
  { label: 'All',        value: undefined,    icon: '🌐' },
  { label: 'L1',         value: 'L1',         icon: '🏔️' },
  { label: 'L2',         value: 'L2',         icon: '⚡' },
  { label: 'Rollup',     value: 'Rollup',     icon: '🔄' },
  { label: 'Sidechain',  value: 'Sidechain',  icon: '🔀' },
]

export default function BlockchainPage() {
  const [filters, setFilters] = useState<ResourceFilters>({ category: 'blockchain' })
  const [viewMode, setViewMode] = useState<ViewMode>('chains')
  const [chainTypeFilter, setChainTypeFilter] = useState<string | undefined>()
  const [selected, setSelected] = useState<Chain[]>([])
  const { resources, loading, refetch } = useResources(filters)

  const toggleChain = (c: Chain) =>
    setSelected((prev) =>
      prev.find((x) => x.id === c.id)
        ? prev.filter((x) => x.id !== c.id)
        : prev.length < 4 ? [...prev, c] : prev
    )

  const filteredChains = chainTypeFilter
    ? CHAINS.filter((c) => c.type === chainTypeFilter)
    : CHAINS

  return (
    <div className="space-y-6">

      {/* Header */}
      <PageHeader
        icon="⛓️"
        title="Blockchain"
        description="Every chain, every resource, Solidity snippets, live gas prices, and testnet faucets."
        color="#f59e0b"
      >
        <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/[0.07]">
          {([
            { id: 'chains',    label: '⛓️ Chains' },
            { id: 'snippets',  label: '📋 Snippets' },
            { id: 'tools',     label: '⛽ Tools' },
            { id: 'resources', label: '📚 Resources' },
          ] as { id: ViewMode; label: string }[]).map((v) => (
            <button
              key={v.id}
              onClick={() => setViewMode(v.id)}
              className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all ${
                viewMode === v.id
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'text-white/35 hover:text-white/60'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </PageHeader>

      {/* ── CHAINS VIEW ── */}
      {viewMode === 'chains' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <SubcategoryTabs
              tabs={CHAIN_TYPE_TABS}
              active={chainTypeFilter}
              onChange={setChainTypeFilter}
              color="#f59e0b"
            />
            {selected.length > 0 && (
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-[11px] text-white/30">{selected.length} selected</span>
                <button onClick={() => setSelected([])} className="text-[11px] text-white/25 hover:text-white/50 transition-colors">
                  Clear
                </button>
              </div>
            )}
          </div>

          {selected.length >= 2 && <ChainCompare chains={selected} />}

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredChains.map((chain) => (
              <ChainCard
                key={chain.id}
                chain={chain}
                selected={!!selected.find((x) => x.id === chain.id)}
                onSelect={() => toggleChain(chain)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── SNIPPETS VIEW ── */}
      {viewMode === 'snippets' && <SoliditySnippetLibrary />}

      {/* ── TOOLS VIEW ── */}
      {viewMode === 'tools' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GasTracker />
          <TestnetFaucets />
        </div>
      )}

      {/* ── RESOURCES VIEW ── */}
      {viewMode === 'resources' && (
        <div className="space-y-4">
          <SubcategoryTabs
            tabs={SUBCATEGORY_TABS}
            active={filters.subcategory}
            onChange={(v) => setFilters({ ...filters, subcategory: v })}
            color="#f59e0b"
          />
          <ResourceFiltersBar
            filters={filters}
            onChange={(f) => setFilters({ ...f, category: 'blockchain' })}
            totalCount={resources.length}
          />
          <ResourceGrid resources={resources} loading={loading} onUpdate={refetch} />
        </div>
      )}
    </div>
  )
}
