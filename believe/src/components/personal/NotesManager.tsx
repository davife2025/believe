'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Note } from '@/lib/types'
import { cn } from '@/lib/utils'

export function NotesManager() {
  const [notes, setNotes]         = useState<Note[]>([])
  const [loading, setLoading]     = useState(true)
  const [activeTag, setActiveTag] = useState<string | undefined>()
  const [search, setSearch]       = useState('')
  const [editing, setEditing]     = useState<string | null>(null)   // note id or 'new'
  const [form, setForm]           = useState({ title: '', content: '', tags: '' })
  const [saving, setSaving]       = useState(false)
  const supabase = createClient()

  const load = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('notes')
      .select('*')
      .order('updated_at', { ascending: false })
    setNotes(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const allTags = [...new Set(notes.flatMap((n) => n.tags || []))].sort()

  const filtered = notes.filter((n) => {
    const matchTag    = !activeTag || (n.tags || []).includes(activeTag)
    const matchSearch = !search    || n.title?.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase())
    return matchTag && matchSearch
  })

  const startEdit = (note?: Note) => {
    if (note) {
      setEditing(note.id)
      setForm({ title: note.title || '', content: note.content, tags: (note.tags || []).join(', ') })
    } else {
      setEditing('new')
      setForm({ title: '', content: '', tags: '' })
    }
  }

  const save = async () => {
    if (!form.content.trim()) return
    setSaving(true)

    const tags = form.tags.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean)
    const payload = { title: form.title.trim() || null, content: form.content.trim(), tags }

    if (editing === 'new') {
      const { data } = await supabase.from('notes').insert(payload).select().single()
      if (data) setNotes((prev) => [data, ...prev])
    } else {
      await supabase.from('notes').update(payload).eq('id', editing)
      setNotes((prev) => prev.map((n) => n.id === editing ? { ...n, ...payload } : n))
    }

    setSaving(false)
    setEditing(null)
  }

  const deleteNote = async (id: string) => {
    await supabase.from('notes').delete().eq('id', id)
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }

  function timeAgo(ts: string) {
    const diff = Date.now() - new Date(ts).getTime()
    const days = Math.floor(diff / 86400000)
    const hours = Math.floor(diff / 3600000)
    if (hours < 1) return 'just now'
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  // ── Editor ──────────────────────────────────────────────────
  if (editing !== null) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white/70">
            {editing === 'new' ? '📝 New Note' : '✏️ Edit Note'}
          </h3>
          <button onClick={() => setEditing(null)} className="text-[11px] text-white/30 hover:text-white/60 transition-colors">
            ✕ Cancel
          </button>
        </div>

        <div className="believe-card p-5 space-y-4">
          <input
            type="text"
            placeholder="Title (optional)"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full bg-transparent border-b border-white/[0.08] pb-2 text-base font-semibold text-white/80 placeholder:text-white/20 outline-none focus:border-indigo-500/40 transition-colors"
          />

          <textarea
            placeholder="Write your note… (Supports plain text)"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={10}
            className="w-full bg-white/[0.02] border border-white/[0.07] rounded-xl px-4 py-3 text-[13px] text-white/70 placeholder:text-white/20 outline-none focus:border-indigo-500/30 transition-colors resize-none leading-relaxed"
          />

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1.5">Tags (comma-separated)</p>
            <input
              type="text"
              placeholder="solidity, defi, auditing…"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="w-full bg-white/[0.03] border border-white/[0.07] rounded-lg px-3 py-2 text-[12px] text-white/60 placeholder:text-white/20 outline-none focus:border-indigo-500/30 transition-colors"
            />
            {form.tags && (
              <div className="flex flex-wrap gap-1 mt-2">
                {form.tags.split(',').map((t) => t.trim()).filter(Boolean).map((t) => (
                  <span key={t} className="tag-pill text-[10px]">{t}</span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={save}
              disabled={saving || !form.content.trim()}
              className="px-4 py-2 rounded-lg bg-indigo-500/20 text-indigo-400 text-[12px] font-semibold hover:bg-indigo-500/30 disabled:opacity-30 transition-all"
            >
              {saving ? 'Saving…' : editing === 'new' ? '+ Save Note' : '✓ Update Note'}
            </button>
            <p className="text-[11px] text-white/20">⌘S to save</p>
          </div>
        </div>
      </div>
    )
  }

  // ── Notes list ──────────────────────────────────────────────
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">📝</span>
          <h3 className="text-sm font-semibold text-white/80">Notes</h3>
          <span className="text-[11px] text-white/25">{notes.length} notes</span>
        </div>
        <button
          onClick={() => startEdit()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 text-[12px] font-medium hover:bg-indigo-500/30 transition-all"
        >
          + New Note
        </button>
      </div>

      {/* Search + tags */}
      <div className="space-y-2">
        <div className="relative max-w-xs">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-sm">🔍</span>
          <input type="text" placeholder="Search notes…" value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-[12px] text-white/80 placeholder:text-white/20 outline-none focus:border-indigo-500/50 transition-colors" />
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[11px] text-white/25 self-center">Tags:</span>
            <button onClick={() => setActiveTag(undefined)}
              className={cn('tag-pill cursor-pointer', !activeTag && 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30')}>
              All
            </button>
            {allTags.map((t) => (
              <button key={t}
                onClick={() => setActiveTag(activeTag === t ? undefined : t)}
                className={cn('tag-pill cursor-pointer', activeTag === t && 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30')}>
                {t}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-2">
          {[1,2,3].map((i) => <div key={i} className="h-24 bg-white/5 rounded-xl animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-3xl mb-2">📝</p>
          <p className="text-[12px] text-white/30">
            {notes.length === 0 ? 'No notes yet. Create your first note above.' : 'No notes match your filter.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {filtered.map((note) => (
            <div key={note.id}
              className="believe-card p-4 flex flex-col gap-2.5 group cursor-pointer hover:border-white/15 transition-all"
              onClick={() => startEdit(note)}>

              <div className="flex items-start justify-between gap-2">
                <p className="text-[13px] font-semibold text-white/80 line-clamp-1">
                  {note.title || 'Untitled note'}
                </p>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0">
                  <button onClick={(e) => { e.stopPropagation(); startEdit(note) }}
                    className="w-6 h-6 rounded flex items-center justify-center text-xs text-white/30 hover:text-white/60 hover:bg-white/5 transition-all">
                    ✏️
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); deleteNote(note.id) }}
                    className="w-6 h-6 rounded flex items-center justify-center text-xs text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all">
                    ✕
                  </button>
                </div>
              </div>

              <p className="text-[12px] text-white/40 leading-relaxed line-clamp-3">{note.content}</p>

              <div className="flex items-center justify-between mt-auto pt-1">
                <div className="flex flex-wrap gap-1">
                  {(note.tags || []).slice(0, 3).map((t) => (
                    <span key={t} className="tag-pill text-[9px]">{t}</span>
                  ))}
                  {(note.tags || []).length > 3 && (
                    <span className="tag-pill text-[9px]">+{note.tags.length - 3}</span>
                  )}
                </div>
                <span className="text-[10px] text-white/20 flex-shrink-0">{timeAgo(note.updated_at)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
