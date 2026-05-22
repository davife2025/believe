'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { TYPE_ICONS, OPPORTUNITY_ICONS, cn } from '@/lib/utils'
import type { ResourceType, OpportunityType } from '@/lib/types'

interface SearchResult {
  id: string
  title: string
  description: string | null
  type: 'resource' | 'opportunity' | 'note'
  subtype: string
  url?: string
  categorySlug?: string
  href: string
}

const CATEGORY_ROUTES: Record<string, string> = {
  'ai-ml':               '/ai-ml',
  'ai-agents':           '/ai-agents',
  'blockchain':          '/blockchain',
  'blockchain-security': '/blockchain-security',
  'building-apps':       '/building-apps',
  'opportunities':       '/opportunities',
}

export function GlobalSearch({ onClose }: { onClose?: () => void }) {
  const [query, setQuery]     = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()
  const router   = useRouter()

  useEffect(() => { inputRef.current?.focus() }, [])

  const search = useCallback(async (q: string) => {
    if (!q.trim() || q.length < 2) { setResults([]); return }
    setLoading(true)

    const term = `%${q}%`
    const all: SearchResult[] = []

    // Resources
    const { data: resources } = await supabase
      .from('v_resources_with_progress')
      .select('id, title, description, type, category_slug, url')
      .or(`title.ilike.${term},description.ilike.${term}`)
      .limit(6)

    resources?.forEach((r) => {
      all.push({
        id: r.id,
        title: r.title,
        description: r.description,
        type: 'resource',
        subtype: r.type,
        url: r.url,
        categorySlug: r.category_slug,
        href: CATEGORY_ROUTES[r.category_slug] || '/',
      })
    })

    // Opportunities
    const { data: opps } = await supabase
      .from('opportunities')
      .select('id, title, description, type, url')
      .or(`title.ilike.${term},description.ilike.${term}`)
      .limit(4)

    opps?.forEach((o) => {
      all.push({
        id: o.id,
        title: o.title,
        description: o.description,
        type: 'opportunity',
        subtype: o.type,
        url: o.url,
        href: '/opportunities',
      })
    })

    // Notes
    const { data: notes } = await supabase
      .from('notes')
      .select('id, title, content')
      .or(`title.ilike.${term},content.ilike.${term}`)
      .limit(3)

    notes?.forEach((n) => {
      all.push({
        id: n.id,
        title: n.title || 'Untitled note',
        description: n.content?.slice(0, 100),
        type: 'note',
        subtype: 'note',
        href: '/',
      })
    })

    setResults(all)
    setSelected(0)
    setLoading(false)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => search(query), 250)
    return () => clearTimeout(t)
  }, [query, search])

  const open = (result: SearchResult) => {
    if (result.url && result.type !== 'note') {
      window.open(result.url, '_blank', 'noopener')
    } else {
      router.push(result.href)
    }
    onClose?.()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected((s) => Math.min(s + 1, results.length - 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)) }
    if (e.key === 'Enter' && results[selected]) open(results[selected])
    if (e.key === 'Escape') onClose?.()
  }

  const getIcon = (r: SearchResult) => {
    if (r.type === 'note') return '📝'
    if (r.type === 'opportunity') return OPPORTUNITY_ICONS[r.subtype as OpportunityType] || '💰'
    return TYPE_ICONS[r.subtype as ResourceType] || '📄'
  }

  const getLabel = (r: SearchResult) => {
    if (r.type === 'note') return 'Note'
    if (r.type === 'opportunity') return r.subtype
    return r.subtype
  }

  return (
    <div className="flex flex-col max-h-[70vh]">
      {/* Input */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.07]">
        <span className="text-white/30 flex-shrink-0">🔍</span>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search resources, opportunities, notes…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-sm text-white/80 placeholder:text-white/25 outline-none"
        />
        {loading && <span className="text-[11px] text-white/25 animate-pulse flex-shrink-0">Searching…</span>}
        <kbd className="hidden sm:block text-[10px] text-white/20 bg-white/5 border border-white/10 rounded px-1.5 py-0.5 flex-shrink-0">
          ESC
        </kbd>
      </div>

      {/* Results */}
      <div className="overflow-y-auto flex-1">
        {query.length < 2 ? (
          <div className="px-4 py-8 text-center space-y-1">
            <p className="text-2xl">🔍</p>
            <p className="text-[12px] text-white/30">Type at least 2 characters to search</p>
            <p className="text-[11px] text-white/20">Searches resources, opportunities, and your notes</p>
          </div>
        ) : results.length === 0 && !loading ? (
          <div className="px-4 py-8 text-center">
            <p className="text-2xl mb-2">😶</p>
            <p className="text-[12px] text-white/30">No results for "{query}"</p>
          </div>
        ) : (
          <div className="p-2 space-y-0.5">
            {results.map((result, idx) => (
              <button
                key={result.id}
                onClick={() => open(result)}
                className={cn(
                  'w-full flex items-start gap-3 px-3 py-3 rounded-lg text-left transition-all',
                  selected === idx ? 'bg-indigo-500/15 border border-indigo-500/20' : 'hover:bg-white/[0.04]'
                )}
              >
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0',
                  result.type === 'resource'    ? 'bg-indigo-500/10'  :
                  result.type === 'opportunity' ? 'bg-orange-500/10'  : 'bg-amber-500/10'
                )}>
                  {getIcon(result)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-medium text-white/80 truncate">{result.title}</p>
                    <span className="tag-pill text-[9px] flex-shrink-0 capitalize">{getLabel(result)}</span>
                  </div>
                  {result.description && (
                    <p className="text-[11px] text-white/35 truncate mt-0.5">{result.description}</p>
                  )}
                </div>
                <span className="text-[10px] text-white/20 flex-shrink-0 mt-1">
                  {result.type === 'note' ? 'View' : '↗'}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {results.length > 0 && (
        <div className="px-4 py-2 border-t border-white/[0.05] flex items-center gap-4 text-[10px] text-white/20">
          <span>↑↓ Navigate</span>
          <span>↵ Open</span>
          <span>ESC Close</span>
          <span className="ml-auto">{results.length} results</span>
        </div>
      )}
    </div>
  )
}

// ── Search Modal Wrapper ──────────────────────────────────────
export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative w-full max-w-xl bg-[#111118] border border-white/[0.1] rounded-2xl shadow-2xl shadow-black/50 overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <GlobalSearch onClose={onClose} />
      </div>
    </div>
  )
}

// ── Search Trigger Button ─────────────────────────────────────
export function SearchTrigger() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] transition-all w-full"
      >
        <span className="text-white/30 text-sm">🔍</span>
        <span className="text-[12px] text-white/30 flex-1 text-left">Search…</span>
        <kbd className="text-[10px] text-white/20 bg-white/5 border border-white/10 rounded px-1.5 py-0.5">
          ⌘K
        </kbd>
      </button>
      <SearchModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
