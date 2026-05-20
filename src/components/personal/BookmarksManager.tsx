'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { TYPE_ICONS, TYPE_LABELS, OPPORTUNITY_ICONS, cn } from '@/lib/utils'
import type { ResourceType, OpportunityType } from '@/lib/types'

interface BookmarkItem {
  id: string
  kind: 'resource' | 'opportunity'
  title: string
  url: string
  type: string
  platform?: string | null
  description?: string | null
  note?: string | null
  createdAt: string
  categoryColor?: string | null
  categorySlug?: string | null
}

export function BookmarksManager() {
  const [items, setItems]       = useState<BookmarkItem[]>([])
  const [loading, setLoading]   = useState(true)
  const [filter, setFilter]     = useState<'all' | 'resource' | 'opportunity'>('all')
  const [search, setSearch]     = useState('')
  const [editingNote, setEditingNote] = useState<string | null>(null)
  const [noteVal, setNoteVal]   = useState('')
  const supabase = createClient()

  const load = async () => {
    setLoading(true)

    // Resource bookmarks
    const { data: rb } = await supabase
      .from('bookmarks')
      .select(`
        id, note, created_at, resource_id,
        resources:resource_id (title, url, type, platform, description, category_color, category_slug)
      `)
      .not('resource_id', 'is', null)
      .order('created_at', { ascending: false })

    // Opportunity bookmarks
    const { data: ob } = await supabase
      .from('bookmarks')
      .select(`
        id, note, created_at, opportunity_id,
        opportunities:opportunity_id (title, url, type, description)
      `)
      .not('opportunity_id', 'is', null)
      .order('created_at', { ascending: false })

    const all: BookmarkItem[] = []

    rb?.forEach((b: any) => {
      const r = b.resources
      if (r) all.push({
        id: b.id, kind: 'resource',
        title: r.title, url: r.url, type: r.type,
        platform: r.platform, description: r.description,
        note: b.note, createdAt: b.created_at,
        categoryColor: r.category_color, categorySlug: r.category_slug,
      })
    })

    ob?.forEach((b: any) => {
      const o = b.opportunities
      if (o) all.push({
        id: b.id, kind: 'opportunity',
        title: o.title, url: o.url, type: o.type,
        description: o.description, note: b.note, createdAt: b.created_at,
      })
    })

    all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    setItems(all)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const remove = async (id: string) => {
    await supabase.from('bookmarks').delete().eq('id', id)
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const saveNote = async (id: string) => {
    await supabase.from('bookmarks').update({ note: noteVal }).eq('id', id)
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, note: noteVal } : i))
    setEditingNote(null)
  }

  const filtered = items.filter((i) => {
    const matchKind = filter === 'all' || i.kind === filter
    const matchSearch = !search || i.title.toLowerCase().includes(search.toLowerCase())
    return matchKind && matchSearch
  })

  function timeAgo(ts: string) {
    const diff = Date.now() - new Date(ts).getTime()
    const days = Math.floor(diff / 86400000)
    const hours = Math.floor(diff / 3600000)
    if (hours < 1) return 'just now'
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🔖</span>
          <h3 className="text-sm font-semibold text-white/80">Bookmarks</h3>
          <span className="text-[11px] text-white/25">{items.length} saved</span>
        </div>
        <button onClick={load} className="text-[11px] text-indigo-400/60 hover:text-indigo-400 transition-colors">
          ↺ Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          {(['all', 'resource', 'opportunity'] as const).map((f) => (
            <button key={f}
              onClick={() => setFilter(f)}
              className={cn('tag-pill cursor-pointer capitalize',
                filter === f && 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30')}>
              {f === 'all' ? `All (${items.length})` : f === 'resource' ? `Resources (${items.filter((i) => i.kind === 'resource').length})` : `Opportunities (${items.filter((i) => i.kind === 'opportunity').length})`}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-sm">🔍</span>
          <input type="text" placeholder="Filter bookmarks…" value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-[12px] text-white/80 placeholder:text-white/20 outline-none focus:border-indigo-500/50 transition-colors" />
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-2">
          {[1,2,3,4].map((i) => <div key={i} className="h-16 bg-white/5 rounded-xl animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-3xl mb-2">🔖</p>
          <p className="text-[12px] text-white/30">
            {items.length === 0 ? 'No bookmarks yet. Bookmark resources from any section.' : 'No bookmarks match your filter.'}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((item) => (
            <div key={item.id} className="believe-card p-4 group space-y-2">
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                  style={item.categoryColor
                    ? { background: `${item.categoryColor}15`, border: `1px solid ${item.categoryColor}20` }
                    : { background: 'rgba(255,255,255,0.05)' }}>
                  {item.kind === 'resource'
                    ? (TYPE_ICONS[item.type as ResourceType] || '📄')
                    : (OPPORTUNITY_ICONS[item.type as OpportunityType] || '💰')}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <a href={item.url} target="_blank" rel="noopener noreferrer"
                      className="text-[13px] font-medium text-white/80 hover:text-white transition-colors line-clamp-1">
                      {item.title}
                    </a>
                    <span className="tag-pill text-[9px] flex-shrink-0">{item.type}</span>
                  </div>
                  {item.platform && <p className="text-[10px] text-white/25 mt-0.5">{item.platform}</p>}
                  <p className="text-[10px] text-white/20 mt-0.5">{timeAgo(item.createdAt)}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all">
                  <button
                    onClick={() => { setEditingNote(item.id); setNoteVal(item.note || '') }}
                    className="w-7 h-7 rounded-md flex items-center justify-center text-sm bg-white/5 hover:bg-white/10 transition-all"
                    title="Edit note">
                    ✏️
                  </button>
                  <button
                    onClick={() => remove(item.id)}
                    className="w-7 h-7 rounded-md flex items-center justify-center text-sm bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition-all"
                    title="Remove bookmark">
                    ✕
                  </button>
                </div>
              </div>

              {/* Note */}
              {editingNote === item.id ? (
                <div className="flex items-center gap-2 pt-1">
                  <input type="text" value={noteVal} onChange={(e) => setNoteVal(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') saveNote(item.id); if (e.key === 'Escape') setEditingNote(null) }}
                    placeholder="Add a note…"
                    className="flex-1 bg-white/5 border border-indigo-500/30 rounded-lg px-3 py-1.5 text-[12px] text-white/70 placeholder:text-white/20 outline-none"
                    autoFocus />
                  <button onClick={() => saveNote(item.id)} className="text-[11px] font-medium px-2.5 py-1.5 rounded-md bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-all">
                    Save
                  </button>
                  <button onClick={() => setEditingNote(null)} className="text-[11px] text-white/25 hover:text-white/50 transition-colors">
                    Cancel
                  </button>
                </div>
              ) : item.note ? (
                <p className="text-[11.5px] text-amber-300/50 pl-11 italic">"{item.note}"</p>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
