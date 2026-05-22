'use client'

import { useState } from 'react'
import { SOLIDITY_SNIPPETS } from '@/data/blockchain-chains'
import type { SoliditySnippet } from '@/data/blockchain-chains'
import { cn } from '@/lib/utils'

const DIFFICULTY_STYLES = {
  beginner:     'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  intermediate: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  advanced:     'bg-red-500/10 text-red-400 border-red-500/20',
}

const CATEGORIES = [...new Set(SOLIDITY_SNIPPETS.map((s) => s.category))]

function SnippetCard({ snippet }: { snippet: SoliditySnippet }) {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const copy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    await navigator.clipboard.writeText(snippet.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="believe-card overflow-hidden">
      {/* Header — always visible */}
      <div
        className="p-4 cursor-pointer flex items-start justify-between gap-3"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn('tag-pill border text-[10px]', DIFFICULTY_STYLES[snippet.difficulty])}>
              {snippet.difficulty}
            </span>
            <span className="tag-pill text-[10px]">{snippet.category}</span>
          </div>
          <p className="text-[13.5px] font-semibold text-white/85">{snippet.title}</p>
          <p className="text-[12px] text-white/40 leading-relaxed">{snippet.description}</p>
          <div className="flex flex-wrap gap-1">
            {snippet.tags.map((t) => (
              <span key={t} className="tag-pill text-[9px]">{t}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={copy}
            className={cn(
              'px-2.5 py-1.5 rounded-md text-[11px] font-medium border transition-all',
              copied
                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25'
                : 'bg-white/5 text-white/40 border-white/[0.08] hover:text-white/70'
            )}
          >
            {copied ? '✓ Copied' : '⎘ Copy'}
          </button>
          <span className="text-white/20 text-xs">{expanded ? '▴' : '▾'}</span>
        </div>
      </div>

      {/* Code block */}
      {expanded && (
        <div className="border-t border-white/[0.05] animate-fade-in">
          <div className="flex items-center justify-between px-4 py-2 bg-black/20">
            <span className="text-[10px] font-mono text-white/25">Solidity</span>
            <button
              onClick={copy}
              className={cn(
                'text-[10px] font-medium transition-colors',
                copied ? 'text-emerald-400' : 'text-white/25 hover:text-white/55'
              )}
            >
              {copied ? '✓ Copied!' : '⎘ Copy all'}
            </button>
          </div>
          <div className="overflow-x-auto max-h-96">
            <pre className="p-4 text-[11.5px] font-mono text-emerald-300/75 leading-relaxed whitespace-pre">
              {snippet.code}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}

export function SoliditySnippetLibrary() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | undefined>()
  const [activeDifficulty, setActiveDifficulty] = useState<string | undefined>()

  const filtered = SOLIDITY_SNIPPETS.filter((s) => {
    const matchSearch = !search ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some((t) => t.includes(search.toLowerCase()))
    const matchCat = !activeCategory || s.category === activeCategory
    const matchDiff = !activeDifficulty || s.difficulty === activeDifficulty
    return matchSearch && matchCat && matchDiff
  })

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="believe-card p-4 flex items-center gap-3 border-amber-500/20 bg-amber-500/5">
        <span className="text-xl">📋</span>
        <div>
          <p className="text-sm font-medium text-amber-300">Solidity Snippet Library</p>
          <p className="text-xs text-white/40 mt-0.5">
            Battle-tested patterns. Click to expand, copy to use. Study each one — understanding these is core to Ethereum dev.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search snippets…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white/80 placeholder:text-white/20 outline-none focus:border-amber-500/50 transition-colors"
            />
          </div>
          <span className="text-[11px] text-white/25">{filtered.length} snippets</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span className="text-[11px] text-white/25 self-center">Category:</span>
          <button
            onClick={() => setActiveCategory(undefined)}
            className={cn('tag-pill cursor-pointer', !activeCategory && 'bg-amber-500/15 text-amber-400 border-amber-500/30')}
          >All</button>
          {CATEGORIES.map((cat) => (
            <button key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? undefined : cat)}
              className={cn('tag-pill cursor-pointer', activeCategory === cat && 'bg-amber-500/15 text-amber-400 border-amber-500/30')}
            >{cat}</button>
          ))}
          <span className="text-[11px] text-white/25 self-center ml-2">Difficulty:</span>
          {['beginner', 'intermediate', 'advanced'].map((d) => (
            <button key={d}
              onClick={() => setActiveDifficulty(activeDifficulty === d ? undefined : d)}
              className={cn('tag-pill cursor-pointer capitalize', activeDifficulty === d && 'bg-amber-500/15 text-amber-400 border-amber-500/30')}
            >{d}</button>
          ))}
        </div>
      </div>

      {/* Snippets */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-2">🔍</p>
            <p className="text-sm text-white/30">No snippets match your filters</p>
          </div>
        ) : (
          filtered.map((s) => <SnippetCard key={s.id} snippet={s} />)
        )}
      </div>
    </div>
  )
}
