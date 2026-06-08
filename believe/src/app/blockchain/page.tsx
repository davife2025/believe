'use client'
import { useState } from 'react'
import { Blocks } from 'lucide-react'
import { PageHeader, ViewToggle } from '@/components/layout/PageHeader'
import { ResourceGrid, ResourceFiltersBar } from '@/components/resources/ResourceGrid'
import { ChainCard, ChainCompare } from '@/components/blockchain/ChainCard'
import { SoliditySnippetLibrary } from '@/components/blockchain/SoliditySnippets'
import { GasTracker, TestnetFaucets } from '@/components/blockchain/GasTracker'
import { SubcategoryTabs } from '@/components/ui/SubcategoryTabs'
import { useResources } from '@/hooks/useResources'
import { CHAINS } from '@/data/blockchain-chains'
import type { Chain } from '@/data/blockchain-chains'
import type { ResourceFilters } from '@/lib/types'

type View = 'chains' | 'snippets' | 'tools' | 'resources'

const CHAIN_TABS = [
  {label:'All',value:undefined},{label:'L1',value:'L1'},{label:'L2',value:'L2'},
  {label:'Rollup',value:'Rollup'},{label:'Sidechain',value:'Sidechain'},
]
const RESOURCE_TABS = [
  {label:'All',value:undefined},{label:'Ethereum',value:'ethereum'},{label:'Solana',value:'solana'},
  {label:'Bitcoin',value:'bitcoin'},{label:'Layer 2',value:'layer2'},{label:'Multi-Chain',value:'multi-chain'},
  {label:'DeFi',value:'defi'},{label:'Fundamentals',value:'fundamentals'},{label:'Books',value:'books'},
]

export default function BlockchainPage() {
  const [view, setView]         = useState<View>('chains')
  const [typeFilter, setType]   = useState<string | undefined>()
  const [selected, setSelected] = useState<Chain[]>([])
  const [filters, setFilters]   = useState<ResourceFilters>({ category: 'blockchain' })
  const { resources, loading, refetch } = useResources(filters)

  const toggle = (c: Chain) =>
    setSelected((p) => p.find((x) => x.id === c.id) ? p.filter((x) => x.id !== c.id) : p.length < 4 ? [...p, c] : p)

  const chains = typeFilter ? CHAINS.filter((c) => c.type === typeFilter) : CHAINS

  return (
    <div className="space-y-6">
      <PageHeader icon={Blocks} title="Blockchain" description="Every chain, Solidity snippets, live gas prices, and testnet faucets." color="#f59e0b">
        <ViewToggle views={[{id:'chains',label:'⛓️ Chains'},{id:'snippets',label:'📋 Snippets'},{id:'tools',label:'⛽ Tools'},{id:'resources',label:'📚 Resources'}]} active={view} onChange={(v) => setView(v as View)} color="#f59e0b" />
      </PageHeader>
      {view === 'chains' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <SubcategoryTabs tabs={CHAIN_TABS} active={typeFilter} onChange={setType} color="#f59e0b" />
            {selected.length > 0 && <div className="flex items-center gap-2"><span className="text-[12px]" style={{color:'var(--text-disabled)'}}>{selected.length} selected</span><button onClick={() => setSelected([])} className="btn btn-ghost btn-sm">Clear</button></div>}
          </div>
          {selected.length >= 2 && <ChainCompare chains={selected} />}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {chains.map((c) => <ChainCard key={c.id} chain={c} selected={!!selected.find((x) => x.id === c.id)} onSelect={() => toggle(c)} />)}
          </div>
        </div>
      )}
      {view === 'snippets'  && <SoliditySnippetLibrary />}
      {view === 'tools'     && <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><GasTracker /><TestnetFaucets /></div>}
      {view === 'resources' && (
        <>
          <SubcategoryTabs tabs={RESOURCE_TABS} active={filters.subcategory} onChange={(v) => setFilters({...filters,subcategory:v})} color="#f59e0b" />
          <ResourceFiltersBar filters={filters} onChange={(f) => setFilters({...f,category:'blockchain'})} totalCount={resources.length} accentColor="#f59e0b" />
          <ResourceGrid resources={resources} loading={loading} onUpdate={refetch} />
        </>
      )}
    </div>
  )
}
