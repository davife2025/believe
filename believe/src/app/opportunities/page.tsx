'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { HackathonCalendar } from '@/components/opportunities/HackathonCalendar'
import { GrantFinder, FellowshipsList } from '@/components/opportunities/GrantFinder'
import { useOpportunities } from '@/hooks/useOpportunities'
import type { Opportunity, OpportunityType } from '@/lib/types'
import { OPPORTUNITY_ICONS, OPPORTUNITY_COLORS, cn } from '@/lib/utils'

type ViewMode = 'hackathons' | 'grants' | 'fellowships' | 'bounties'

// ── DB Opportunity card (bounties/jobs from Supabase) ─────────
function OpportunityCard({ opp }: { opp: Opportunity }) {
  return (
    <div className="believe-card p-5 flex flex-col gap-3">
      {opp.is_active && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500/60 to-transparent rounded-t-xl" />
      )}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          <span className={cn('tag-pill border', OPPORTUNITY_COLORS[opp.type])}>
            {OPPORTUNITY_ICONS[opp.type]} {opp.type}
          </span>
          {opp.is_active && <span className="tag-pill bg-emerald-500/10 text-emerald-400 border-emerald-500/20">● Live</span>}
          {opp.is_recurring && <span className="tag-pill">🔄 Recurring</span>}
        </div>
        <span className="text-[11px] text-white/25 flex-shrink-0">{opp.location}</span>
      </div>
      <div>
        <a href={opp.url} target="_blank" rel="noopener noreferrer"
          className="text-[13.5px] font-semibold text-white/90 hover:text-white transition-colors line-clamp-1">
          {opp.title}
        </a>
        {opp.description && (
          <p className="mt-1.5 text-[12px] text-white/40 leading-relaxed line-clamp-2">{opp.description}</p>
        )}
      </div>
      <div className="flex items-center gap-2 text-[11px] text-white/30">
        {opp.organizer && <span>{opp.organizer}</span>}
        {opp.prize_pool && <><span>·</span><span className="text-amber-400/70 font-medium">💰 {opp.prize_pool}</span></>}
      </div>
      {opp.ecosystem?.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {opp.ecosystem.map((e) => <span key={e} className="tag-pill text-[10px]">{e}</span>)}
        </div>
      )}
      <div className="pt-2 border-t border-white/[0.05] flex items-center justify-between">
        {opp.deadline
          ? <span className="text-[11px] text-white/30">📅 {new Date(opp.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          : <span className="text-[11px] text-white/20">Rolling deadline</span>
        }
        <a href={opp.url} target="_blank" rel="noopener noreferrer"
          className="text-[11px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
          Apply →
        </a>
      </div>
    </div>
  )
}

// ── Bounties view ─────────────────────────────────────────────
function BountiesView() {
  const [activeType, setActiveType] = useState<OpportunityType | undefined>(undefined)
  const [search, setSearch] = useState('')
  const { opportunities, loading } = useOpportunities({ type: activeType, is_active: true, search: search || undefined })

  const types = [
    { label: 'All',         value: undefined,      icon: '🌐' },
    { label: 'Bounties',    value: 'bounty',       icon: '🎯' },
    { label: 'Jobs',        value: 'job',          icon: '💼' },
    { label: 'Competition', value: 'competition',  icon: '🏆' },
  ] as { label: string; value: OpportunityType | undefined; icon: string }[]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        {types.map((t) => (
          <button key={t.label}
            onClick={() => setActiveType(t.value)}
            className={cn('tag-pill cursor-pointer', activeType === t.value && 'bg-orange-500/15 text-orange-400 border-orange-500/30')}>
            {t.icon} {t.label}
          </button>
        ))}
        <div className="relative ml-auto">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-sm">🔍</span>
          <input type="text" placeholder="Search…" value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white/80 placeholder:text-white/20 outline-none focus:border-orange-500/50 transition-colors w-44" />
        </div>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map((i) => <div key={i} className="believe-card p-5 h-48 animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 relative">
          {opportunities.map((opp) => <OpportunityCard key={opp.id} opp={opp} />)}
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────
export default function OpportunitiesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('hackathons')

  return (
    <div className="space-y-6">
      <PageHeader
        icon="💰"
        title="Developer Opportunities"
        description="Hackathons with countdowns, grants with tips, fellowships, and live bounties — all in one place."
        color="#f97316"
      >
        <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/[0.07]">
          {([
            { id: 'hackathons',  label: '⚔️ Hackathons'  },
            { id: 'grants',      label: '🌱 Grants'      },
            { id: 'fellowships', label: '🤝 Fellowships' },
            { id: 'bounties',    label: '🎯 Bounties'    },
          ] as { id: ViewMode; label: string }[]).map((v) => (
            <button key={v.id}
              onClick={() => setViewMode(v.id)}
              className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all ${
                viewMode === v.id ? 'bg-orange-500/20 text-orange-400' : 'text-white/35 hover:text-white/60'
              }`}>
              {v.label}
            </button>
          ))}
        </div>
      </PageHeader>

      {viewMode === 'hackathons'  && <HackathonCalendar />}
      {viewMode === 'grants'      && <GrantFinder />}
      {viewMode === 'fellowships' && <FellowshipsList />}
      {viewMode === 'bounties'    && <BountiesView />}
    </div>
  )
}
