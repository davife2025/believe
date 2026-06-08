'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Search, X, ExternalLink, FileText, Zap, BookOpen, ArrowRight } from 'lucide-react'
import { RESOURCE_TYPE_ICONS, OPPORTUNITY_TYPE_ICONS } from '@/lib/icons'
import { cn } from '@/lib/utils'
import type { ResourceType, OpportunityType } from '@/lib/types'

interface SearchResult {
  id:          string
  title:       string
  description: string | null
  type:        'resource' | 'opportunity' | 'note'
  subtype:     string
  url?:        string
  categorySlug?: string
  href:        string
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

    const [resourcesRes, oppsRes, notesRes] = await Promise.all([
      supabase.from('v_resources_with_progress')
        .select('id, title, description, type, category_slug, url')
        .or(`title.ilike.${term},description.ilike.${term}`)
        .limit(6),
      supabase.from('opportunities')
        .select('id, title, description, type, url')
        .or(`title.ilike.${term},description.ilike.${term}`)
        .limit(3),
      supabase.from('notes')
        .select('id, title, content')
        .or(`title.ilike.${term},content.ilike.${term}`)
        .limit(2),
    ])

    resourcesRes.data?.forEach((r: any) => all.push({
      id: r.id, title: r.title, description: r.description,
      type: 'resource', subtype: r.type, url: r.url,
      categorySlug: r.category_slug,
      href: CATEGORY_ROUTES[r.category_slug] || '/',
    }))

    oppsRes.data?.forEach((o: any) => all.push({
      id: o.id, title: o.title, description: o.description,
      type: 'opportunity', subtype: o.type, url: o.url,
      href: '/opportunities',
    }))

    notesRes.data?.forEach((n: any) => all.push({
      id: n.id, title: n.title || 'Untitled note',
      description: n.content?.slice(0, 100),
      type: 'note', subtype: 'note', href: '/personal/notes',
    }))

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
    if (r.type === 'note')        return <FileText size={15} strokeWidth={1.8} />
    if (r.type === 'opportunity') {
      const Icon = OPPORTUNITY_TYPE_ICONS[r.subtype as OpportunityType] || Zap
      return <Icon size={15} strokeWidth={1.8} />
    }
    const Icon = RESOURCE_TYPE_ICONS[r.subtype as ResourceType] || BookOpen
    return <Icon size={15} strokeWidth={1.8} />
  }

  const getTypeColor = (r: SearchResult) => {
    if (r.type === 'note')        return 'rgba(245,158,11,0.12)'
    if (r.type === 'opportunity') return 'rgba(249,115,22,0.12)'
    return 'rgba(99,102,241,0.12)'
  }

  return (
    <div className="flex flex-col max-h-[70vh]">
      {/* Input */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ borderBottom: '1px solid var(--border-subtle)' }}
      >
        <Search size={16} className="text-[var(--text-disabled)] flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search resources, opportunities, notes…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] outline-none"
        />
        <div className="flex items-center gap-2 flex-shrink-0">
          {loading && (
            <div className="w-3.5 h-3.5 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
          )}
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[var(--text-disabled)] hover:text-[var(--text-tertiary)] transition-colors"
            >
              <X size={14} />
            </button>
          )}
          <kbd className="hidden sm:block text-[10px] text-[var(--text-disabled)] bg-white/5 border border-[var(--border-default)] rounded px-1.5 py-0.5">
            ESC
          </kbd>
        </div>
      </div>

      {/* Results */}
      <div className="overflow-y-auto flex-1">
        {query.length < 2 ? (
          <div className="px-4 py-10 text-center space-y-2">
            <Search size={28} className="mx-auto text-[var(--text-disabled)]" />
            <p className="text-[13px] text-[var(--text-tertiary)]">Type to search across Believe</p>
            <p className="text-[12px] text-[var(--text-disabled)]">Resources · Opportunities · Notes</p>
          </div>
        ) : results.length === 0 && !loading ? (
          <div className="px-4 py-10 text-center">
            <p className="text-[13px] text-[var(--text-tertiary)]">No results for "{query}"</p>
          </div>
        ) : (
          <div className="p-2 space-y-0.5">
            {results.map((result, idx) => (
              <button
                key={result.id}
                onClick={() => open(result)}
                className={cn(
                  'w-full flex items-start gap-3 px-3 py-3 rounded-[var(--radius-md)] text-left transition-all',
                  selected === idx
                    ? 'bg-indigo-500/10 border border-indigo-500/20'
                    : 'hover:bg-white/[0.04] border border-transparent'
                )}
              >
                <div
                  className="w-8 h-8 rounded-[var(--radius-md)] flex items-center justify-center flex-shrink-0 text-[var(--text-secondary)]"
                  style={{ background: getTypeColor(result) }}
                >
                  {getIcon(result)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[13.5px] font-medium text-[var(--text-secondary)] truncate">
                      {result.title}
                    </p>
                    <span className="badge text-[10px] flex-shrink-0 capitalize">
                      {result.subtype}
                    </span>
                  </div>
                  {result.description && (
                    <p className="text-[12px] text-[var(--text-disabled)] truncate mt-0.5">
                      {result.description}
                    </p>
                  )}
                </div>
                <ExternalLink size={13} className="text-[var(--text-disabled)] flex-shrink-0 mt-0.5" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {results.length > 0 && (
        <div
          className="px-4 py-2 flex items-center gap-4 text-[11px] text-[var(--text-disabled)]"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          <span>↑↓ Navigate</span>
          <span>↵ Open</span>
          <span>ESC Close</span>
          <span className="ml-auto">{results.length} results</span>
        </div>
      )}
    </div>
  )
}

// ── Search Modal ──────────────────────────────────────────────
export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-xl rounded-[var(--radius-xl)] shadow-2xl animate-scale-in overflow-hidden"
        style={{
          background: 'var(--surface-overlay)',
          border: '1px solid var(--border-default)',
          boxShadow: 'var(--shadow-lg), 0 0 0 1px rgba(255,255,255,0.04)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <GlobalSearch onClose={onClose} />
      </div>
    </div>
  )
}

// ── Search Trigger ────────────────────────────────────────────
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
        className="flex items-center gap-2.5 w-full px-3 py-2 rounded-[var(--radius-md)] text-left transition-all"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid var(--border-subtle)',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)' }}
      >
        <Search size={13} className="text-[var(--text-disabled)] flex-shrink-0" />
        <span className="text-[13px] text-[var(--text-disabled)] flex-1">Search…</span>
        <kbd className="text-[10px] text-[var(--text-disabled)] bg-white/5 border border-[var(--border-default)] rounded px-1.5 py-0.5 flex-shrink-0">
          ⌘K
        </kbd>
      </button>
      <SearchModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
