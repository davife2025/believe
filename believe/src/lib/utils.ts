import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { DifficultyLevel, ProgressStatus, ResourceType, OpportunityType } from './types'

// ── Tailwind class merger ─────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ── Navigation config ─────────────────────────────────────────
export const NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: '/',
    icon: '⚡',
    color: '#6366f1',
    description: 'Your command center',
  },
  {
    label: 'AI & ML',
    href: '/ai-ml',
    icon: '🤖',
    color: '#8b5cf6',
    description: 'Machine learning, deep learning, LLMs',
  },
  {
    label: 'AI Agents',
    href: '/ai-agents',
    icon: '🕸️',
    color: '#a855f7',
    description: 'Frameworks, MCP, RAG, automation',
  },
  {
    label: 'Blockchain',
    href: '/blockchain',
    icon: '⛓️',
    color: '#f59e0b',
    description: 'Ethereum, Solana, Bitcoin + more',
  },
  {
    label: 'Security',
    href: '/blockchain-security',
    icon: '🔐',
    color: '#ef4444',
    description: 'Auditing, CTFs, bug bounties',
  },
  {
    label: 'Build Apps',
    href: '/building-apps',
    icon: '🏗️',
    color: '#10b981',
    description: 'Tools, frameworks, full-stack dApps',
  },
  {
    label: 'Opportunities',
    href: '/opportunities',
    icon: '💰',
    color: '#f97316',
    description: 'Hackathons, grants, bounties, jobs',
  },
]

// ── Difficulty labels ─────────────────────────────────────────
export const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  all_levels: 'All Levels',
}

export const DIFFICULTY_COLORS: Record<DifficultyLevel, string> = {
  beginner: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  intermediate: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  advanced: 'bg-red-500/10 text-red-400 border-red-500/20',
  all_levels: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
}

// ── Resource type labels & icons ──────────────────────────────
export const TYPE_LABELS: Record<ResourceType, string> = {
  course: 'Course',
  book: 'Book',
  documentation: 'Docs',
  tool: 'Tool',
  video: 'Video',
  article: 'Article',
  github: 'GitHub',
  tutorial: 'Tutorial',
  roadmap: 'Roadmap',
  podcast: 'Podcast',
  newsletter: 'Newsletter',
  framework: 'Framework',
}

export const TYPE_ICONS: Record<ResourceType, string> = {
  course: '🎓',
  book: '📖',
  documentation: '📄',
  tool: '🔧',
  video: '▶️',
  article: '📝',
  github: '💾',
  tutorial: '🧑‍💻',
  roadmap: '🗺️',
  podcast: '🎙️',
  newsletter: '📬',
  framework: '⚙️',
}

// ── Progress status ───────────────────────────────────────────
export const PROGRESS_LABELS: Record<ProgressStatus, string> = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  completed: 'Completed',
  paused: 'Paused',
}

export const PROGRESS_COLORS: Record<ProgressStatus, string> = {
  not_started: 'bg-zinc-500/10 text-zinc-400',
  in_progress: 'bg-sky-500/10 text-sky-400',
  completed: 'bg-emerald-500/10 text-emerald-400',
  paused: 'bg-amber-500/10 text-amber-400',
}

// ── Opportunity type ──────────────────────────────────────────
export const OPPORTUNITY_ICONS: Record<OpportunityType, string> = {
  hackathon: '⚔️',
  grant: '🌱',
  bounty: '🎯',
  job: '💼',
  fellowship: '🤝',
  accelerator: '🚀',
  competition: '🏆',
}

export const OPPORTUNITY_COLORS: Record<OpportunityType, string> = {
  hackathon: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  grant: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  bounty: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  job: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  fellowship: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  accelerator: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  competition: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
}

// ── Formatting helpers ────────────────────────────────────────
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function truncate(str: string, max: number): string {
  if (str.length <= max) return str
  return str.slice(0, max).trimEnd() + '…'
}

export function getDaysUntil(dateStr: string): number {
  const now = new Date()
  const target = new Date(dateStr)
  const diff = target.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}
