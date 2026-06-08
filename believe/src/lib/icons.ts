// ============================================================
// BELIEVE — Icon System
// All icons from Lucide React — consistent, crisp, no emoji
// ============================================================

export {
  // Navigation
  LayoutDashboard,
  Brain,
  Zap,
  Link2,
  Shield,
  Hammer,
  Trophy,
  Bookmark,
  FileText,

  // Resource types
  GraduationCap,
  BookOpen,
  FileCode2,
  Wrench,
  Youtube,
  Newspaper,
  Github,
  Map,
  Mic2,
  Mail,
  Package,

  // Actions
  ExternalLink,
  Copy,
  Check,
  X,
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ArrowRight,
  MoreHorizontal,

  // Status
  CheckCircle2,
  Circle,
  PauseCircle,
  PlayCircle,
  AlertTriangle,
  AlertCircle,
  Info,
  Loader2,

  // Categories
  Bot,
  Blocks,
  Lock,
  Code2,
  Coins,

  // Opportunities
  Swords,
  Sprout,
  Target,
  Briefcase,
  Handshake,
  Rocket,

  // Learning
  Flame,
  Star,
  Award,
  TrendingUp,
  Clock,
  Calendar,
  BarChart2,
  Activity,
  ListChecks,
  StickyNote,

  // Platform
  Settings,
  User,
  Menu,
  Bell,
  Keyboard,
  Globe,
  Cpu,
  Terminal,
  Database,
  Server,
  Layers,
} from 'lucide-react'

import type { LucideProps } from 'lucide-react'
import {
  GraduationCap, BookOpen, FileCode2, Wrench, Youtube,
  Newspaper, Github, Map, Mic2, Mail, Package,
  Bot, Blocks, Brain, Zap, Lock, Hammer, Trophy, Coins, Shield,
  Swords, Sprout, Target, Briefcase, Handshake, Rocket,
} from 'lucide-react'

// ── Resource type → icon mapping ─────────────────────────────
export const RESOURCE_TYPE_ICONS: Record<string, React.ComponentType<LucideProps>> = {
  course:        GraduationCap,
  book:          BookOpen,
  documentation: FileCode2,
  tool:          Wrench,
  video:         Youtube,
  article:       Newspaper,
  github:        Github,
  tutorial:      FileCode2,
  roadmap:       Map,
  podcast:       Mic2,
  newsletter:    Mail,
  framework:     Package,
}

// ── Category → icon mapping ───────────────────────────────────
export const CATEGORY_ICONS: Record<string, React.ComponentType<LucideProps>> = {
  'ai-ml':               Brain,
  'ai-agents':           Bot,
  'blockchain':          Blocks,
  'blockchain-security': Shield,
  'building-apps':       Hammer,
  'opportunities':       Trophy,
}

// ── Opportunity type → icon mapping ──────────────────────────
export const OPPORTUNITY_TYPE_ICONS: Record<string, React.ComponentType<LucideProps>> = {
  hackathon:    Swords,
  grant:        Sprout,
  bounty:       Target,
  job:          Briefcase,
  fellowship:   Handshake,
  accelerator:  Rocket,
  competition:  Trophy,
}

// ── Category colors (canonical) ───────────────────────────────
export const CATEGORY_COLORS: Record<string, string> = {
  'ai-ml':               '#8b5cf6',
  'ai-agents':           '#a855f7',
  'blockchain':          '#f59e0b',
  'blockchain-security': '#ef4444',
  'building-apps':       '#10b981',
  'opportunities':       '#f97316',
}
