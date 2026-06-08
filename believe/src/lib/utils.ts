import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { DifficultyLevel, ProgressStatus, ResourceType, OpportunityType } from './types'
import { CATEGORY_COLORS as CAT_COLORS } from './icons'

// ── Tailwind class merger ─────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ── Navigation config ─────────────────────────────────────────
// Icon components are now in lib/icons.ts
// This is kept for legacy compatibility (sidebar uses icons.ts directly now)
export const NAV_ITEMS = [
  { label: 'Dashboard',    href: '/',                       icon: '⚡', color: '#6366f1', description: 'Your command center' },
  { label: 'AI & ML',      href: '/ai-ml',                  icon: '🤖', color: '#8b5cf6', description: 'Machine learning, deep learning, LLMs' },
  { label: 'AI Agents',    href: '/ai-agents',              icon: '🕸️', color: '#a855f7', description: 'Frameworks, MCP, RAG, automation' },
  { label: 'Blockchain',   href: '/blockchain',             icon: '⛓️', color: '#f59e0b', description: 'Ethereum, Solana, Bitcoin + more' },
  { label: 'Security',     href: '/blockchain-security',    icon: '🔐', color: '#ef4444', description: 'Auditing, CTFs, bug bounties' },
  { label: 'Build Apps',   href: '/building-apps',          icon: '🏗️', color: '#10b981', description: 'Tools, frameworks, full-stack dApps' },
  { label: 'Opportunities',href: '/opportunities',          icon: '💰', color: '#f97316', description: 'Hackathons, grants, bounties, jobs' },
]

// ── Category colors (canonical, from icons.ts) ────────────────
export const CATEGORY_COLORS = CAT_COLORS

// ── Difficulty ────────────────────────────────────────────────
export const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  beginner:     'Beginner',
  intermediate: 'Intermediate',
  advanced:     'Advanced',
  all_levels:   'All Levels',
}

export const DIFFICULTY_COLORS: Record<DifficultyLevel, string> = {
  beginner:     'badge-success',
  intermediate: 'badge-medium',
  advanced:     'badge-high',
  all_levels:   'badge',
}

// ── Resource type labels ──────────────────────────────────────
export const TYPE_LABELS: Record<ResourceType, string> = {
  course:        'Course',
  book:          'Book',
  documentation: 'Docs',
  tool:          'Tool',
  video:         'Video',
  article:       'Article',
  github:        'GitHub',
  tutorial:      'Tutorial',
  roadmap:       'Roadmap',
  podcast:       'Podcast',
  newsletter:    'Newsletter',
  framework:     'Framework',
}

// Legacy emoji icons for components not yet migrated to Lucide
export const TYPE_ICONS: Record<ResourceType, string> = {
  course:        '🎓',
  book:          '📖',
  documentation: '📄',
  tool:          '🔧',
  video:         '▶️',
  article:       '📝',
  github:        '💾',
  tutorial:      '🧑‍💻',
  roadmap:       '🗺️',
  podcast:       '🎙️',
  newsletter:    '📬',
  framework:     '⚙️',
}

// ── Progress ──────────────────────────────────────────────────
export const PROGRESS_LABELS: Record<ProgressStatus, string> = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  completed:   'Completed',
  paused:      'Paused',
}

export const PROGRESS_COLORS: Record<ProgressStatus, string> = {
  not_started: 'text-[var(--text-disabled)]',
  in_progress: 'text-sky-400',
  completed:   'text-emerald-400',
  paused:      'text-amber-400',
}

// ── Opportunity ───────────────────────────────────────────────
export const OPPORTUNITY_ICONS: Record<OpportunityType, string> = {
  hackathon:    '⚔️',
  grant:        '🌱',
  bounty:       '🎯',
  job:          '💼',
  fellowship:   '🤝',
  accelerator:  '🚀',
  competition:  '🏆',
}

export const OPPORTUNITY_COLORS: Record<OpportunityType, string> = {
  hackathon:    'badge bg-violet-500/10 text-violet-400 border-violet-500/20',
  grant:        'badge bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  bounty:       'badge bg-amber-500/10 text-amber-400 border-amber-500/20',
  job:          'badge bg-sky-500/10 text-sky-400 border-sky-500/20',
  fellowship:   'badge bg-pink-500/10 text-pink-400 border-pink-500/20',
  accelerator:  'badge bg-orange-500/10 text-orange-400 border-orange-500/20',
  competition:  'badge bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
}

// ── Date helpers ──────────────────────────────────────────────
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

export function timeAgo(ts: string): string {
  const diff  = Date.now() - new Date(ts).getTime()
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  if (mins  < 1)  return 'just now'
  if (mins  < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days  < 7)  return `${days}d ago`
  return formatDate(ts)
}

export function truncate(str: string, max: number): string {
  if (str.length <= max) return str
  return str.slice(0, max).trimEnd() + '…'
}

export function getDaysUntil(dateStr: string): number {
  const diff = new Date(dateStr).getTime() - Date.now()
  return Math.ceil(diff / 86400000)
}
