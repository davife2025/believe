'use client'
import { useState } from 'react'
import { Trophy } from 'lucide-react'
import { PageHeader, ViewToggle } from '@/components/layout/PageHeader'
import { HackathonCalendar } from '@/components/opportunities/HackathonCalendar'
import { GrantFinder, FellowshipsList } from '@/components/opportunities/GrantFinder'
import { useOpportunities } from '@/hooks/useOpportunities'
import type { Opportunity, OpportunityType } from '@/lib/types'
import { OPPORTUNITY_COLORS, OPPORTUNITY_ICONS, cn } from '@/lib/utils'

type View = 'hackathons' | 'grants' | 'fellowships' | 'bounties'

function OpportunityCard({ opp }: { opp: Opportunity }) {
  return (
    <div className="believe-card p-5 flex flex-col gap-3 relative overflow-hidden">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          <span className={cn(OPPORTUNITY_COLORS[opp.type])}>{OPPORTUNITY_ICONS[opp.type]} {opp.type}</span>
          {opp.is_active && <span className="badge badge-success">● Live</span>}
        </div>
        <span className="text-[11px]" style={{color:'var(--text-disabled)'}}>{opp.location}</span>
      </div>
      <div>
        <a href={opp.url} target="_blank" rel="noopener noreferrer" className="text-[13.5px] font-semibold hover:text-white transition-colors line-clamp-1" style={{color:'var(--text-secondary)'}}>
          {opp.title}
        </a>
        {opp.description && <p className="mt-1.5 text-[12px] line-clamp-2" style={{color:'var(--text-disabled)'}}>{opp.description}</p>}
      </div>
      {opp.prize_pool && <span className="text-[12px] font-semibold text-amber-400">💰 {opp.prize_pool}</span>}
      <div className="pt-2 flex items-center justify-between" style={{borderTop:'1px solid var(--border-subtle)'}}>
        {opp.deadline ? <span className="text-[11px]" style={{color:'var(--text-disabled)'}}>📅 {new Date(opp.deadline).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span> : <span className="text-[11px]" style={{color:'var(--text-disabled)'}}>Rolling</span>}
        <a href={opp.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">Apply →</a>
      </div>
    </div>
  )
}

function BountiesView() {
  const [search, setSearch] = useState('')
  const [type, setType]     = useState<OpportunityType | undefined>()
  const { opportunities, loading } = useOpportunities({ type, is_active: true, search: search || undefined })
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        {(['bounty','job','competition'] as OpportunityType[]).map((t) => (
          <button key={t} onClick={() => setType(type === t ? undefined : t)} className={cn('badge badge-interactive capitalize', type === t && 'badge-active')}>{t}</button>
        ))}
        <div className="relative ml-auto"><input type="text" placeholder="Search…" value={search} onChange={(e) => setSearch(e.target.value)} className="input h-8 text-[12.5px] w-44" /></div>
      </div>
      {loading ? <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">{[1,2,3,4,5,6].map((i) => <div key={i} className="believe-card p-5 h-48 skeleton" />)}</div>
      : <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">{opportunities.map((o) => <OpportunityCard key={o.id} opp={o} />)}</div>}
    </div>
  )
}

export default function OpportunitiesPage() {
  const [view, setView] = useState<View>('hackathons')
  return (
    <div className="space-y-6">
      <PageHeader icon={Trophy} title="Developer Opportunities" description="Hackathons with countdowns, grants with tips, fellowships, and live bounties." color="#f97316">
        <ViewToggle views={[{id:'hackathons',label:'⚔️ Hackathons'},{id:'grants',label:'🌱 Grants'},{id:'fellowships',label:'🤝 Fellowships'},{id:'bounties',label:'🎯 Bounties'}]} active={view} onChange={(v) => setView(v as View)} color="#f97316" />
      </PageHeader>
      {view === 'hackathons'  && <HackathonCalendar />}
      {view === 'grants'      && <GrantFinder />}
      {view === 'fellowships' && <FellowshipsList />}
      {view === 'bounties'    && <BountiesView />}
    </div>
  )
}
