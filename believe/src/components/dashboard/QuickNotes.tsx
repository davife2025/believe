'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Note } from '@/lib/types'

export function QuickNotes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [input, setInput] = useState('')
  const [saving, setSaving] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const supabase = createClient()

  const loadNotes = async () => {
    const { data } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)
    setNotes(data || [])
    setLoading(false)
  }

  useEffect(() => { loadNotes() }, [])

  const addNote = async () => {
    if (!input.trim()) return
    setSaving(true)
    const { data } = await supabase
      .from('notes')
      .insert({ content: input.trim(), title: input.trim().slice(0, 40) })
      .select()
      .single()
    if (data) setNotes((prev) => [data, ...prev].slice(0, 5))
    setInput('')
    setSaving(false)
  }

  const deleteNote = async (id: string) => {
    await supabase.from('notes').delete().eq('id', id)
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }

  function timeAgo(ts: string): string {
    const diff = Date.now() - new Date(ts).getTime()
    const days = Math.floor(diff / 86400000)
    const hours = Math.floor(diff / 3600000)
    if (hours < 1) return 'just now'
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <div className="believe-card p-5 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-lg">📝</span>
        <h3 className="text-sm font-semibold text-white/80">Quick Notes</h3>
        <span className="ml-auto text-[11px] text-white/25">{notes.length} notes</span>
      </div>

      {/* Input */}
      <div className="flex items-start gap-2">
        <textarea
          placeholder="Capture a thought or insight…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) addNote()
          }}
          rows={2}
          className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2 text-[12.5px] text-white/70 placeholder:text-white/20 outline-none focus:border-indigo-500/40 resize-none transition-colors"
        />
        <button
          onClick={addNote}
          disabled={saving || !input.trim()}
          className="flex-shrink-0 px-3 py-2 rounded-lg bg-indigo-500/20 text-indigo-400 text-[11px] font-medium hover:bg-indigo-500/30 disabled:opacity-30 transition-all"
        >
          {saving ? '…' : '↵ Save'}
        </button>
      </div>

      {/* Notes list */}
      {loading ? (
        <div className="space-y-2">
          {[1, 2].map((i) => (
            <div key={i} className="h-10 bg-white/5 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : notes.length === 0 ? (
        <p className="text-[12px] text-white/20 text-center py-2">
          No notes yet. Press ⌘↵ to save quickly.
        </p>
      ) : (
        <ul className="space-y-1.5">
          {notes.map((note) => (
            <li key={note.id} className="group">
              <button
                onClick={() => setExpanded(expanded === note.id ? null : note.id)}
                className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/[0.04] transition-colors flex items-start gap-2"
              >
                <span className="text-amber-400/50 text-xs mt-0.5 flex-shrink-0">▸</span>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-[12.5px] text-white/65 leading-snug ${
                      expanded === note.id ? '' : 'line-clamp-1'
                    }`}
                  >
                    {note.content}
                  </p>
                  <p className="text-[10px] text-white/20 mt-0.5">{timeAgo(note.created_at)}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); deleteNote(note.id) }}
                  className="opacity-0 group-hover:opacity-100 text-white/15 hover:text-red-400 transition-all text-xs flex-shrink-0"
                >
                  ✕
                </button>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
