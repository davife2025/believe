'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { ResourceWithMeta } from '@/lib/types'
import { cn } from '@/lib/utils'

const LS_KEY = 'believe_reading_list'

// SSR-safe localStorage helpers
function loadLocal(): Record<string, { status: string; note?: string }> {
  if (typeof window === 'undefined') return {}
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '{}') } catch { return {} }
}

function saveLocal(data: Record<string, { status: string; note?: string }>) {
  if (typeof window === 'undefined') return
  localStorage.setItem(LS_KEY, JSON.stringify(data))
}

const STATUS_STYLES = {
  want:    { bg: 'bg-white/5',         text: 'text-white/40',    label: '📋 Want to Read', dot: 'bg-white/20' },
  reading: { bg: 'bg-sky-500/10',      text: 'text-sky-400',     label: '📖 Reading',      dot: 'bg-sky-400'  },
  done:    { bg: 'bg-emerald-500/10',  text: 'text-emerald-400', label: '✅ Done',          dot: 'bg-emerald-400' },
}

export function ReadingList() {
  const [books, setBooks]       = useState<ResourceWithMeta[]>([])
  const [local, setLocal]       = useState<Record<string, any>>({})
  const [loading, setLoading]   = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [mounted, setMounted]   = useState(false)
  const supabase = createClient()

  // Load localStorage only on client
  useEffect(() => {
    setLocal(loadLocal())
    setMounted(true)
  }, [])

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('v_resources_with_progress')
        .select('*')
        .eq('type', 'book')
        .order('is_featured', { ascending: false })
      setBooks(data || [])
      setLoading(false)
    }
    load()
  }, [])

  const updateBook = (
    id: string,
    updates: Partial<{ status: string; note: string }>
  ) => {
    const next = { ...local, [id]: { ...(local[id] || {}), ...updates } }
    setLocal(next)
    saveLocal(next)
  }

  const getStatus = (id: string): 'want' | 'reading' | 'done' => {
    if (!mounted) return 'want'
    return (local[id]?.status as any) || 'want'
  }

  const counts = {
    want:    books.filter((b) => getStatus(b.id) === 'want').length,
    reading: books.filter((b) => getStatus(b.id) === 'reading').length,
    done:    books.filter((b) => getStatus(b.id) === 'done').length,
  }

  if (loading) {
    return (
      <div className="believe-card p-5 space-y-3">
        <div className="h-5 w-32 bg-white/5 rounded animate-pulse" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-14 bg-white/5 rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="believe-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white/80 flex items-center gap-2">
          <span>📚</span> Reading List
        </h3>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-sky-400">{counts.reading} reading</span>
          <span className="text-emerald-400">{counts.done} done</span>
          <span className="text-white/25">{counts.want} queued</span>
        </div>
      </div>

      <div className="space-y-2">
        {books.map((book) => {
          const status = getStatus(book.id)
          const style  = STATUS_STYLES[status]
          const isExpanded = expandedId === book.id
          const entry  = mounted ? (local[book.id] || {}) : {}

          return (
            <div key={book.id} className="group">
              <div
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.03] transition-colors cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : book.id)}
              >
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${style.dot}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-[12.5px] text-white/75 leading-snug line-clamp-1">
                    {book.title}
                  </p>
                  <p className="text-[10px] text-white/25 mt-0.5">{book.author}</p>
                </div>
                <span className={`tag-pill flex-shrink-0 ${style.bg} ${style.text} border-0`}>
                  {style.label}
                </span>
              </div>

              {isExpanded && mounted && (
                <div className="mx-3 mb-2 p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] space-y-3 animate-fade-in">
                  <div className="flex gap-1.5">
                    {(['want', 'reading', 'done'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => updateBook(book.id, { status: s })}
                        className={cn(
                          'flex-1 py-1.5 rounded-md text-[11px] font-medium transition-all border',
                          status === s
                            ? `${STATUS_STYLES[s].bg} ${STATUS_STYLES[s].text} border-current`
                            : 'bg-transparent text-white/30 border-white/[0.07] hover:border-white/15'
                        )}
                      >
                        {STATUS_STYLES[s].label}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Add a note about this book…"
                    defaultValue={entry.note || ''}
                    onBlur={(e) => updateBook(book.id, { note: e.target.value })}
                    className="w-full bg-transparent border-b border-white/[0.08] pb-1 text-[12px] text-white/50 placeholder:text-white/20 outline-none focus:border-indigo-500/40 transition-colors"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-white/20">{book.platform}</span>
                    <a
                      href={book.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Read free →
                    </a>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
