'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { useOpportunities } from '@/hooks/useOpportunities'
import type { Opportunity, OpportunityType } from '@/lib/types'
import { OPPORTUNITY_ICONS, OPPORTUNITY_COLORS, cn } from '@/lib/utils'

// ── Opportunity Card ──────────────────────────────────────────
function OpportunityCard({ opp }: { opp: Opportunity }) {
  return (
    <div className="believe-card p-5 flex flex-col gap-3 relative overflow-hidden">
      {opp.is_active && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500/60 to-transparent" />
      )}

      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={cn('tag-pill border', OPPORTUNITY_COLORS[opp.type])}>
            {OPPORTUNITY_ICONS[opp.type]} {opp.type}
          </span>
          {opp.is_active && (
            <span className="tag-pill bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
              ● Live
            </span>
          )}
          {opp.is_recurring && (
            <span className="tag-pill">🔄 Recurring</span>
          )}
        </div>
        <span className="text-[11px] text-white/25 flex-shrink-0">{opp.location}</span>
      </div>

      <div>
        <a
          href={opp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-white/90 hover:text-white transition-colors line-clamp-1"
        >
          {opp.title}
        </a>
        {opp.description && (
          <p className="mt-1.5 text-[12.5px] text-white/40 leading-relaxed line-clamp-2">
            {opp.description}
          </p>
        )}
      </div>

      {/* Organizer + prize */}
      <div className="flex items-center gap-3 text-[11px] text-white/30">
        {opp.organizer && <span>{opp.organizer}</span>}
        {opp.prize_pool && (
          <>
            <span>·</span>
            <span className="text-amber-400/70 font-medium">💰 {opp.prize_pool}</span>
          </>
        )}
      </div>

      {/* Ecosystems */}
      {opp.ecosystem?.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {opp.ecosystem.map((e) => (
            <span key={e} className="tag-pill">{e}</span>
          ))}
        </div>
      )}

      <div className="pt-2 border-t border-white/[0.05] flex items-center justify-between">
        {opp.deadline ? (
          <span className="text-[11px] text-white/30">
            📅 Deadline: {new Date(opp.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        ) : (
          <span className="text-[11px] text-white/20">Rolling deadline</span>
        )}
        <a
          href={opp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Apply →
        </a>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────
export default function OpportunitiesPage() {
  const [activeType, setActiveType] = useState<OpportunityType | undefined>(undefined)
  const [search, setSearch] = useState('')
  const { opportunities, loading } = useOpportunities({
    type: activeType,
    is_active: true,
    search: search || undefined,
  })

  const types: { label: string; value: OpportunityType | undefined; icon: string }[] = [
    { label: 'All', value: undefined, icon: '🌐' },
    { label: 'Hackathons', value: 'hackathon', icon: '⚔️' },
    { label: 'Grants', value: 'grant', icon: '🌱' },
    { label: 'Bounties', value: 'bounty', icon: '🎯' },
    { label: 'Jobs', value: 'job', icon: '💼' },
    { label: 'Fellowships', value: 'fellowship', icon: '🤝' },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        icon="💰"
        title="Developer Opportunities"
        description="Hackathons, grants, bug bounties, jobs, and fellowships — all active, all real."
        color="#f97316"
      />

      {/* CTA banner */}
      <div className="believe-card p-4 flex items-center gap-3 border-orange-500/20 bg-orange-500/5">
        <span className="text-xl">🚀</span>
        <div className="flex-1">
          <p className="text-sm font-medium text-orange-300">Opportunities are time-sensitive.</p>
          <p className="text-xs text-white/40 mt-0.5">
            Check back regularly. Hackathon deadlines move fast and grants close without notice.
          </p>
        </div>
      </div>

      {/* Type tabs */}
      <div className="flex flex-wrap gap-2">
        {types.map((t) => (
          <button
            key={t.label}
            onClick={() => setActiveType(t.value)}
            className={cn(
              'tag-pill cursor-pointer text-xs py-1 px-3',
              activeType === t.value && 'bg-orange-500/15 text-orange-400 border-orange-500/30'
            )}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search opportunities…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white/80 placeholder:text-white/20 outline-none focus:border-orange-500/50 transition-colors"
          />
        </div>
        <span className="text-[12px] text-white/30">{opportunities.length} found</span>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="believe-card p-5 h-48 animate-pulse">
              <div className="h-4 bg-white/5 rounded w-1/3 mb-3" />
              <div className="h-3 bg-white/5 rounded w-full mb-2" />
              <div className="h-3 bg-white/5 rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : opportunities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-sm text-white/40">No opportunities found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {opportunities.map((opp) => (
            <OpportunityCard key={opp.id} opp={opp} />
          ))}
        </div>
      )}
    </div>
  )
}
