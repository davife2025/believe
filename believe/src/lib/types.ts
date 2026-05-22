// ============================================================
// BELIEVE PLATFORM — TypeScript Types
// ============================================================

export type ResourceType =
  | 'course'
  | 'book'
  | 'documentation'
  | 'tool'
  | 'video'
  | 'article'
  | 'github'
  | 'tutorial'
  | 'roadmap'
  | 'podcast'
  | 'newsletter'
  | 'framework'

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'all_levels'

export type ProgressStatus = 'not_started' | 'in_progress' | 'completed' | 'paused'

export type OpportunityType =
  | 'hackathon'
  | 'grant'
  | 'bounty'
  | 'job'
  | 'fellowship'
  | 'accelerator'
  | 'competition'

export interface Category {
  id: string
  slug: string
  name: string
  description: string | null
  icon: string | null
  color: string | null
  sort_order: number
  created_at: string
}

export interface Subcategory {
  id: string
  category_id: string
  slug: string
  name: string
  description: string | null
  sort_order: number
  created_at: string
}

export interface Resource {
  id: string
  title: string
  url: string
  description: string | null
  category_id: string | null
  subcategory_id: string | null
  type: ResourceType
  platform: string | null
  author: string | null
  difficulty: DifficultyLevel | null
  is_free: boolean
  duration: string | null
  language: string
  tags: string[]
  has_certificate: boolean
  is_featured: boolean
  is_official: boolean
  rating: number | null
  created_at: string
  updated_at: string
}

export interface ResourceWithMeta extends Resource {
  category_name: string | null
  category_slug: string | null
  category_color: string | null
  subcategory_name: string | null
  progress_status: ProgressStatus | null
  progress_percent: number | null
  is_bookmarked: boolean
}

export interface Opportunity {
  id: string
  title: string
  url: string
  description: string | null
  type: OpportunityType
  organizer: string | null
  ecosystem: string[]
  prize_pool: string | null
  deadline: string | null
  is_active: boolean
  is_recurring: boolean
  location: string | null
  tags: string[]
  created_at: string
  updated_at: string
}

export interface Progress {
  id: string
  resource_id: string
  status: ProgressStatus
  progress_percent: number
  started_at: string | null
  completed_at: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Bookmark {
  id: string
  resource_id: string | null
  opportunity_id: string | null
  note: string | null
  created_at: string
}

export interface Note {
  id: string
  resource_id: string | null
  title: string | null
  content: string
  tags: string[]
  created_at: string
  updated_at: string
}

export interface DailyGoal {
  id: string
  date: string
  goal_text: string
  is_completed: boolean
  resource_id: string | null
  created_at: string
}

export interface PlatformStats {
  total_resources: number
  free_resources: number
  active_opportunities: number
  completed_resources: number
  in_progress_resources: number
  bookmarks_count: number
  notes_count: number
}

// UI filter types
export interface ResourceFilters {
  category?: string
  subcategory?: string
  type?: ResourceType
  difficulty?: DifficultyLevel
  is_free?: boolean
  has_certificate?: boolean
  is_featured?: boolean
  search?: string
  tags?: string[]
}

export interface OpportunityFilters {
  type?: OpportunityType
  ecosystem?: string
  is_active?: boolean
  search?: string
}

// Navigation item type
export interface NavItem {
  label: string
  href: string
  icon: string
  color: string
  description: string
}
