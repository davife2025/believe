'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { ResourceWithMeta, ResourceFilters } from '@/lib/types'

export function useResources(filters?: ResourceFilters) {
  const [resources, setResources] = useState<ResourceWithMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      let query = supabase.from('v_resources_with_progress').select('*')

      if (filters?.category) {
        query = query.eq('category_slug', filters.category)
      }
      if (filters?.subcategory) {
        query = query.eq('subcategory_id', filters.subcategory)
      }
      if (filters?.type) {
        query = query.eq('type', filters.type)
      }
      if (filters?.difficulty) {
        query = query.eq('difficulty', filters.difficulty)
      }
      if (filters?.is_free !== undefined) {
        query = query.eq('is_free', filters.is_free)
      }
      if (filters?.has_certificate !== undefined) {
        query = query.eq('has_certificate', filters.has_certificate)
      }
      if (filters?.is_featured !== undefined) {
        query = query.eq('is_featured', filters.is_featured)
      }
      if (filters?.search) {
        query = query.or(
          `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
        )
      }
      if (filters?.tags && filters.tags.length > 0) {
        query = query.overlaps('tags', filters.tags)
      }

      query = query.order('is_featured', { ascending: false })
                   .order('created_at', { ascending: false })

      const { data, error: err } = await query

      if (err) throw err
      setResources(data || [])
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to fetch resources')
    } finally {
      setLoading(false)
    }
  }, [JSON.stringify(filters)])

  useEffect(() => { fetch() }, [fetch])

  return { resources, loading, error, refetch: fetch }
}

export function useFeaturedResources(categorySlug?: string) {
  return useResources({
    category: categorySlug,
    is_featured: true,
  })
}
