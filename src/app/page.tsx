'use client'

import { useStats } from '@/hooks/useOpportunities'
import { useFeaturedResources } from '@/hooks/useResources'
import { ResourceGrid } from '@/components/resources/ResourceGrid'
import { DailyGoals } from '@/components/dashboard/DailyGoals'
import { StreakCounter } from '@/components/dashboard/StreakCounter'
import { ProgressRings } from '@/components/dashboard/ProgressRings'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { QuickNotes } from '@/components/dashboard/QuickNotes'
import { NAV_ITEMS } from '@/lib/utils'
import Link from 'next/link'

// ── Stats Grid ────────────────────────────────────────────────
function StatsGrid() {
  const { stats, loading } = useStats()

  const items = [
    {
      label: 'Total Resources',
      value: stats?.total_resources ?? '—',
      sub: `${stats?.free_resources ?? 0} free`,
      icon: '📚',
      color: '#6366f1',
    },
    {
      label: 'Completed',
      value: stats?.completed_resources ?? 0,
      sub: `${stats?.in_progress_resources ?? 0} in progress`,
      icon: '✅',
      color: '#10b981',
    },
    {
      label: 'Opportunities',
      value: stats?.active_opportunities ?? '—',
      sub: 'Active now',
      icon: '💰',
      color: '#f97316',
    },
    {
      label: 'Bookmarks',
      value: stats?.bookmarks_count ?? 0,
      sub: `${stats?.notes_count ?? 0} notes`,
      icon: '🔖',
      color: '#f59e0b',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="stat-card"
          style={{ borderColor: `${item.color}20` }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="label">{item.label}</p>
            <span className="text-lg">{item.icon}</span>
          </div>
          <p
            className="value"
            style={{ color: loading ? 'rgba(255,255,255,0.1)' : item.color }}
          >
            {loading ? '···' : item.value}
          </p>
          <p className="sub">{item.sub}</p>
        </div>
      ))}
    </div>
  )
}

// ── Section Nav ───────────────────────────────────────────────
function SectionNav() {
  const sections = NAV_ITEMS.filter((n) => n.href !== '/')
  return (
    <div>
      <h2 className="text-[11px] font-semibold text-white/25 uppercase tracking-widest mb-3">
        Sections
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="believe-card p-4 flex items-center gap-3 group cursor-pointer"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: `${section.color}15`, border: `1px solid ${section.color}25` }}
            >
              {section.icon}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                {section.label}
              </p>
              <p className="text-[11px] text-white/30 leading-snug mt-0.5 truncate">
                {section.description}
              </p>
            </div>
            <span className="ml-auto text-white/15 group-hover:text-white/40 transition-colors text-sm flex-shrink-0">
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ── Featured Resources ────────────────────────────────────────
function FeaturedResources() {
  const { resources, loading, refetch } = useFeaturedResources()
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[11px] font-semibold text-white/25 uppercase tracking-widest">
          Featured Resources
        </h2>
        <span className="text-[11px] text-white/20">{resources.length} featured</span>
      </div>
      <ResourceGrid resources={resources.slice(0, 6)} loading={loading} onUpdate={refetch} />
    </div>
  )
}

// ── Daily Focus Banner ────────────────────────────────────────
function DailyFocus() {
  const tips = [
    'Start with one AI fundamentals lesson today.',
    'Spend 30 minutes on a Solidity challenge.',
    'Read one chapter of Mastering Ethereum.',
    'Check DoraHacks for a new hackathon to enter.',
    'Submit a Superteam bounty application.',
    'Run through one Ethernaut level.',
    'Study one real exploit on Solodit.',
    'Build a simple LangChain agent with one tool.',
    'Go through one chapter of Mastering Bitcoin.',
    'Deploy a test contract on Sepolia testnet.',
    'Read the Anthropic MCP docs for 20 minutes.',
    'Review one smart contract audit report on Solodit.',
    'Watch one fast.ai lesson and take notes.',
    'Write a quick CrewAI agent that automates something small.',
  ]
  const today = new Date()
  const tip = tips[today.getDate() % tips.length]

  return (
    <div className="believe-card p-4 flex items-center gap-4 border-indigo-500/20 bg-indigo-500/5">
      <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center text-xl flex-shrink-0">
        🎯
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400/60 mb-0.5">
          Daily Focus
        </p>
        <p className="text-sm text-white/65 leading-snug">{tip}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-[11px] text-white/20">
          {today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </p>
        <p className="text-[11px] text-indigo-400/40 mt-0.5">Day {today.getDate()}</p>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────
export default function DashboardPage() {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening'

  return (
    <div className="space-y-8">

      {/* Hero greeting */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Good {greeting} <span className="text-indigo-400">.</span>
        </h1>
        <p className="text-sm text-white/30 mt-1">
          Your Believe platform is live. 2 weeks. Everything.
        </p>
      </div>

      {/* Daily focus */}
      <DailyFocus />

      {/* Stats */}
      <StatsGrid />

      {/* Progress rings */}
      <ProgressRings />

      {/* Two-col: goals + streak */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DailyGoals />
        <StreakCounter />
      </div>

      {/* Two-col: activity + notes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentActivity />
        <QuickNotes />
      </div>

      {/* Section nav */}
      <SectionNav />

      {/* Featured resources */}
      <FeaturedResources />

    </div>
  )
}
