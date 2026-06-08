'use client'

import { useState, useEffect } from 'react'
import { FileText, Plus, X, ChevronDown, ChevronUp } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/components/ui/Toast'
import { timeAgo } from '@/lib/utils'
import type { Note } from '@/lib/types'

export function QuickNotes() {
  const [notes, setNotes]     = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [input, setInput]     = useState('')
  const [saving, setSaving]   = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const { success }           = useToast()
  const supabase              = createClient()

  const load = async () => {
    const { data } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)
    setNotes(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const addNote = async () => {
    if (!input.trim()) return
    setSaving(true)
    const { data } = await supabase
      .from('notes')
      .insert({ content: input.trim(), title: input.trim().slice(0, 50) })
      .select()
      .single()
    if (data) {
      setNotes((prev) => [data, ...prev].slice(0, 5))
      success('Note saved')
    }
    setInput('')
    setSaving(false)
  }

  const deleteNote = async (id: string) => {
    await supabase.from('notes').delete().eq('id', id)
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="believe-card p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-[var(--radius-sm)] flex items-center justify-center"
            style={{ background: 'rgba(245,158,11,0.12)' }}>
            <FileText size={14} className="text-amber-400" strokeWidth={2} />
          </div>
          <h3 className="text-[13.5px] font-semibold" style={{ color: 'var(--text-secondary)' }}>
            Quick Notes
          </h3>
        </div>
        <span className="text-[11.5px]" style={{ color: 'var(--text-disabled)' }}>
          {notes.length} notes
        </span>
      </div>

      {/* Input */}
      <div className="flex items-start gap-2">
        <textarea
          placeholder="Capture a thought… (⌘↵ to save)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) addNote() }}
          rows={2}
          className="flex-1 input resize-none text-[13px] leading-relaxed"
        />
        <button
          onClick={addNote}
          disabled={saving || !input.trim()}
          className="btn btn-primary btn-sm gap-1.5 px-2.5 py-2 flex-shrink-0"
        >
          <Plus size={13} strokeWidth={2.5} />
          {saving ? '…' : 'Save'}
        </button>
      </div>

      {/* Notes */}
      {loading ? (
        <div className="space-y-2">
          {[1, 2].map((i) => <div key={i} className="skeleton h-12 w-full" />)}
        </div>
      ) : notes.length === 0 ? (
        <p className="text-[12.5px] text-center py-2" style={{ color: 'var(--text-disabled)' }}>
          No notes. Press ⌘↵ to save quickly.
        </p>
      ) : (
        <ul className="space-y-1">
          {notes.map((note) => (
            <li key={note.id} className="group">
              <div
                className="flex items-start gap-2 px-2.5 py-2.5 rounded-[var(--radius-md)] hover:bg-white/[0.03] transition-colors cursor-pointer"
                onClick={() => setExpanded(expanded === note.id ? null : note.id)}
              >
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-[12.5px] leading-snug ${expanded === note.id ? '' : 'line-clamp-1'}`}
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {note.content}
                  </p>
                  <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-disabled)' }}>
                    {timeAgo(note.created_at)}
                  </p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all">
                  {expanded === note.id
                    ? <ChevronUp size={12} style={{ color: 'var(--text-disabled)' }} />
                    : <ChevronDown size={12} style={{ color: 'var(--text-disabled)' }} />
                  }
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteNote(note.id) }}
                    className="p-1 rounded hover:bg-red-500/10 transition-all"
                    style={{ color: 'var(--text-disabled)' }}
                  >
                    <X size={11} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
