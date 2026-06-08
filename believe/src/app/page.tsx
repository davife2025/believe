'use client'

import { useStats } from '@/hooks/useOpportunities'
import { useFeaturedResources } from '@/hooks/useResources'
import { ResourceGrid } from '@/components/resources/ResourceGrid'
import { DailyGoals } from '@/components/dashboard/DailyGoals'
import { StreakCounter } from '@/components/dashboard/StreakCounter'
import { ProgressRings } from '@/components/dashboard/ProgressRings'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { QuickNotes } from '@/components/dashboard/QuickNotes'
import {
  BookOpen, Zap, Trophy, Bookmark,
  TrendingUp, ArrowRight, Brain, Bot, Blocks,
  Shield, Hammer,
} from 'lucide-react'
import Link from 'next/link'

// ── Greeting ──────────────────────────────────────────────────
function getGreeting() {
  const h = new Date().getHours()
  if (h < 5)  return 'Burning the midnight oil'
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  if (h < 21) return 'Good evening'
  return 'Still learning?'
}

// ── Stats ─────────────────────────────────────────────────────
function StatsRow() {
  const { stats, loading } = useStats()

  const items = [
    {
      label: 'Resources',
      value: stats?.total_resources ?? '—',
      sub:   `${stats?.free_resources ?? 0} free`,
      Icon:  BookOpen,
      color: '#6366f1',
    },
    {
      label: 'Completed',
      value: stats?.completed_resources ?? 0,
      sub:   `${stats?.in_progress_resources ?? 0} in progress`,
      Icon:  TrendingUp,
      color: '#10b981',
    },
    {
      label: 'Opportunities',
      value: stats?.active_opportunities ?? '—',
      sub:   'Active now',
      Icon:  Zap,
      color: '#f97316',
    },
    {
      label: 'Saved',
      value: stats?.bookmarks_count ?? 0,
      sub:   `${stats?.notes_count ?? 0} notes`,
      Icon:  Bookmark,
      color: '#f59e0b',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="stat-card"
          style={{ borderColor: !loading ? `${item.color}18` : undefined }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="label">{item.label}</p>
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center"
              style={{ background: `${item.color}14` }}
            >
              <item.Icon size={14} style={{ color: item.color }} strokeWidth={2} />
            </div>
          </div>
          <p
            className="value"
            style={{ color: loading ? 'var(--text-disabled)' : item.color }}
          >
            {loading ? '—' : item.value}
          </p>
          <p className="sub">{item.sub}</p>
        </div>
      ))}
    </div>
  )
}

// ── Section nav cards ─────────────────────────────────────────
const SECTIONS = [
  { href: '/ai-ml',               label: 'AI & ML',      Icon: Brain,   color: '#8b5cf6', desc: 'Courses, books, deep learning' },
  { href: '/ai-agents',           label: 'AI Agents',    Icon: Bot,     color: '#a855f7', desc: 'Frameworks, MCP, projects' },
  { href: '/blockchain',          label: 'Blockchain',   Icon: Blocks,  color: '#f59e0b', desc: '10 chains, Solidity, gas tracker' },
  { href: '/blockchain-security', label: 'Security',     Icon: Shield,  color: '#ef4444', desc: 'Audit checklist, CTFs, bounties' },
  { href: '/building-apps',       label: 'Build Apps',   Icon: Hammer,  color: '#10b981', desc: 'Dev tools, stack recommender' },
  { href: '/opportunities',       label: 'Opportunities',Icon: Trophy,  color: '#f97316', desc: 'Hackathons, grants, fellowships' },
]

function SectionNav() {
  return (
    <div>
      <h2 className="section-label mb-3">Sections</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5">
        {SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="believe-card p-4 flex items-center gap-3 group cursor-pointer"
          >
            <div
              className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-105"
              style={{ background: `${s.color}14`, border: `1px solid ${s.color}22` }}
            >
              <s.Icon size={17} style={{ color: s.color }} strokeWidth={1.8} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                {s.label}
              </p>
              <p className="text-[11px] text-[var(--text-disabled)] mt-0.5 truncate">
                {s.desc}
              </p>
            </div>
            <ArrowRight
              size={14}
              className="flex-shrink-0 text-[var(--text-disabled)] group-hover:text-[var(--text-tertiary)] group-hover:translate-x-0.5 transition-all"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

// ── Daily tip ─────────────────────────────────────────────────
const TIPS = [
  'Read one chapter of Mastering Ethereum today.',
  'Pick one Ethernaut level and solve it.',
  'Study a real exploit on Solodit for 20 minutes.',
  'Build a simple LangChain agent with one tool.',
  'Check DoraHacks for a new hackathon to enter.',
  'Go through the Hugging Face LLM course for 30 minutes.',
  'Deploy a test contract to Sepolia testnet.',
  'Read the Anthropic MCP docs for 20 minutes.',
  'Submit a Superteam Earn bounty today.',
  'Write a quick note on what you learned this week.',
  'Run through one fast.ai lesson and take notes.',
  'Study one Cyfrin security audit report.',
  'Try one Damn Vulnerable DeFi challenge.',
  'Review the Solana Cookbook for a pattern you haven\'t used.',
]

function DailyTip() {
  const tip = TIPS[new Date().getDate() % TIPS.length]
  return (
    <div
      className="believe-card p-4 flex items-center gap-4"
      style={{ borderColor: 'rgba(99,102,241,0.18)', background: 'rgba(99,102,241,0.04)' }}
    >
      <div
        className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(99,102,241,0.12)' }}
      >
        <Zap size={17} className="text-indigo-400" strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-indigo-400/60 mb-0.5">
          Today's Focus
        </p>
        <p className="text-[13.5px] text-[var(--text-secondary)] leading-snug">{tip}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-[11px] text-[var(--text-disabled)]">
          {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </p>
      </div>
    </div>
  )
}

// ── Featured resources ────────────────────────────────────────
function FeaturedResources() {
  const { resources, loading, refetch } = useFeaturedResources()
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="section-label">Featured Resources</h2>
        <span className="text-[11.5px] text-[var(--text-disabled)]">
          {resources.length} featured
        </span>
      </div>
      <ResourceGrid
        resources={resources.slice(0, 6)}
        loading={loading}
        onUpdate={refetch}
      />
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────
export default function DashboardPage() {
  return (
    <div className="space-y-8">

      {/* Hero */}
      <div>
        <h1 className="text-[2rem] font-bold tracking-tight">
          {getGreeting()}{' '}
          <span className="gradient-text">.</span>
        </h1>
        <p className="text-[14px] mt-1.5" style={{ color: 'var(--text-tertiary)' }}>
          Your open learning platform is ready. AI, Blockchain, Security — all in one place.
        </p>
      </div>

      {/* Daily tip */}
      <DailyTip />

      {/* Stats */}
      <StatsRow />

      {/* Progress rings */}
      <ProgressRings />

      {/* Goals + streak */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DailyGoals />
        <StreakCounter />
      </div>

      {/* Section nav */}
      <SectionNav />

      {/* Activity + notes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentActivity />
        <QuickNotes />
      </div>

      {/* Featured */}
      <FeaturedResources />
    </div>
  )
}
