'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface Shortcut {
  keys: string[]
  description: string
  category: string
}

const SHORTCUTS: Shortcut[] = [
  // Navigation
  { keys: ['G', 'H'],       description: 'Go to Dashboard',           category: 'Navigation' },
  { keys: ['G', 'A'],       description: 'Go to AI & ML',             category: 'Navigation' },
  { keys: ['G', 'E'],       description: 'Go to AI Agents',           category: 'Navigation' },
  { keys: ['G', 'B'],       description: 'Go to Blockchain',          category: 'Navigation' },
  { keys: ['G', 'S'],       description: 'Go to Security',            category: 'Navigation' },
  { keys: ['G', 'D'],       description: 'Go to Build Apps',          category: 'Navigation' },
  { keys: ['G', 'O'],       description: 'Go to Opportunities',       category: 'Navigation' },
  { keys: ['G', 'N'],       description: 'Go to Notes',               category: 'Navigation' },
  { keys: ['G', 'K'],       description: 'Go to Bookmarks',           category: 'Navigation' },
  // Search
  { keys: ['⌘', 'K'],       description: 'Open global search',        category: 'Search' },
  { keys: ['↑', '↓'],       description: 'Navigate search results',   category: 'Search' },
  { keys: ['↵'],            description: 'Open selected result',      category: 'Search' },
  { keys: ['ESC'],          description: 'Close search / modal',      category: 'Search' },
  // Actions
  { keys: ['⌘', 'S'],       description: 'Save current note',         category: 'Actions' },
  { keys: ['?'],            description: 'Toggle this shortcuts panel',category: 'Actions' },
]

// ── Sequenced key handler ─────────────────────────────────────
export function useKeyboardShortcuts() {
  const router = useRouter()
  const [sequence, setSequence] = useState<string[]>([])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    const handler = (e: KeyboardEvent) => {
      // Skip if typing in an input
      const tag = (e.target as HTMLElement).tagName
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return
      if (e.metaKey || e.ctrlKey) return

      const key = e.key.toUpperCase()

      setSequence((prev) => {
        const next = [...prev, key].slice(-2)

        // G + letter navigation
        if (next[0] === 'G') {
          const routes: Record<string, string> = {
            H: '/', A: '/ai-ml', E: '/ai-agents',
            B: '/blockchain', S: '/blockchain-security',
            D: '/building-apps', O: '/opportunities',
            N: '/personal/notes', K: '/personal/bookmarks',
          }
          if (routes[next[1]]) {
            router.push(routes[next[1]])
            clearTimeout(timer)
            return []
          }
        }

        // ? — show shortcuts
        if (key === '?') {
          window.dispatchEvent(new CustomEvent('believe:shortcuts'))
        }

        // Reset after 1s
        clearTimeout(timer)
        timer = setTimeout(() => setSequence([]), 1000)
        return next
      })
    }

    window.addEventListener('keydown', handler)
    return () => { window.removeEventListener('keydown', handler); clearTimeout(timer) }
  }, [router])

  return sequence
}

// ── Keyboard shortcut key chip ────────────────────────────────
function Key({ label }: { label: string }) {
  return (
    <kbd className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 text-[10px] font-semibold text-white/50 bg-white/[0.06] border border-white/[0.12] rounded-md font-mono">
      {label}
    </kbd>
  )
}

// ── Shortcuts Panel ───────────────────────────────────────────
export function ShortcutsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  const categories = [...new Set(SHORTCUTS.map((s) => s.category))]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg bg-[#111118] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]">
          <div className="flex items-center gap-2">
            <span>⌨️</span>
            <p className="text-sm font-semibold text-white/80">Keyboard Shortcuts</p>
          </div>
          <button onClick={onClose}
            className="text-[11px] text-white/30 hover:text-white/60 transition-colors">
            ESC to close
          </button>
        </div>

        {/* Shortcuts grid */}
        <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
          {categories.map((cat) => (
            <div key={cat}>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-2">
                {cat}
              </p>
              <div className="space-y-1.5">
                {SHORTCUTS.filter((s) => s.category === cat).map((s) => (
                  <div key={s.description}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/[0.03] transition-colors">
                    <span className="text-[12.5px] text-white/55">{s.description}</span>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {s.keys.map((k, i) => (
                        <span key={i} className="flex items-center gap-1">
                          <Key label={k} />
                          {i < s.keys.length - 1 && (
                            <span className="text-[10px] text-white/20">+</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer tip */}
        <div className="px-5 py-3 border-t border-white/[0.05]">
          <p className="text-[11px] text-white/20 text-center">
            Press <Key label="?" /> anywhere to toggle this panel
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Global shortcuts listener (mount in layout) ───────────────
export function KeyboardShortcutsProvider() {
  const [open, setOpen] = useState(false)
  useKeyboardShortcuts()

  useEffect(() => {
    const handler = () => setOpen((o) => !o)
    window.addEventListener('believe:shortcuts', handler)
    return () => window.removeEventListener('believe:shortcuts', handler)
  }, [])

  return <ShortcutsPanel open={open} onClose={() => setOpen(false)} />
}
