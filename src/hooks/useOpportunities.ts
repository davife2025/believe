'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Opportunity, OpportunityFilters, PlatformStats } from '@/lib/types'

// ── Opportunities ─────────────────────────────────────────────
export function useOpportunities(filters?: OpportunityFilters) {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      let query = supabase.from('opportunities').select('*')

      if (filters?.type) {
        query = query.eq('type', filters.type)
      }
      if (filters?.is_active !== undefined) {
        query = query.eq('is_active', filters.is_active)
      }
      if (filters?.ecosystem) {
        query = query.contains('ecosystem', [filters.ecosystem])
      }
      if (filters?.search) {
        query = query.or(
          `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
        )
      }

      query = query.order('is_active', { ascending: false })
                   .order('created_at', { ascending: false })

      const { data, error: err } = await query
      if (err) throw err
      setOpportunities(data || [])
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to fetch opportunities')
    } finally {
      setLoading(false)
    }
  }, [JSON.stringify(filters)])

  useEffect(() => { fetch() }, [fetch])

  return { opportunities, loading, error, refetch: fetch }
}

// ── Platform Stats ────────────────────────────────────────────
export function useStats() {
  const [stats, setStats] = useState<PlatformStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const supabase = createClient()
        const { data } = await supabase
          .from('v_stats')
          .select('*')
          .single()
        setStats(data)
      } catch {
        // fail silently for stats
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return { stats, loading }
}

// ── Progress mutation ─────────────────────────────────────────
export function useProgress() {
  const supabase = createClient()

  const upsertProgress = async (
    resourceId: string,
    status: string,
    percent: number
  ) => {
    const { error } = await supabase
      .from('progress')
      .upsert(
        {
          resource_id: resourceId,
          status,
          progress_percent: percent,
          ...(status === 'in_progress' ? { started_at: new Date().toISOString() } : {}),
          ...(status === 'completed' ? { completed_at: new Date().toISOString(), progress_percent: 100 } : {}),
        },
        { onConflict: 'resource_id' }
      )
    return { error }
  }

  const toggleBookmark = async (resourceId: string, isBookmarked: boolean) => {
    if (isBookmarked) {
      await supabase.from('bookmarks').delete().eq('resource_id', resourceId)
    } else {
      await supabase.from('bookmarks').insert({ resource_id: resourceId })
    }
  }

  return { upsertProgress, toggleBookmark }
}
