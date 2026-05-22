'use client'

import { useState } from 'react'
import { DEV_TOOLS } from '@/data/building-apps-data'
import type { DevTool } from '@/data/building-apps-data'
import { cn } from '@/lib/utils'

const DIFFICULTY_STYLES = {
  beginner:     'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  intermediate: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  advanced:     'bg-red-500/10 text-red-400 border-red-500/20',
}

const TYPE_STYLES: Record<string, string> = {
  framework:      'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  library:        'bg-violet-500/10 text-violet-400 border-violet-500/20',
  tool:           'bg-amber-500/10 text-amber-400 border-amber-500/20',
  infrastructure: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  language:       'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
}

function DevToolCard({ tool }: { tool: DevTool }) {
  const [tab, setTab] = useState<'overview' | 'install' | 'usedby'>('overview')
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    if (!tool.installCmd) return
    await navigator.clipboard.writeText(tool.installCmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="believe-card overflow-hidden flex flex-col">
      <div className="h-0.5" style={{ background: `linear-gradient(90deg, ${tool.color === '#ffffff' ? '#6366f1' : tool.color}, transparent)` }} />

      {/* Header */}
      <div className="p-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: `${tool.color === '#ffffff' ? '#6366f1' : tool.color}15`, border: `1px solid ${tool.color === '#ffffff' ? '#6366f1' : tool.color}25` }}>
            {tool.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-[13.5px] font-semibold text-white/90">{tool.name}</p>
              {tool.stars && <span className="text-[10px] text-white/25">⭐ {tool.stars}</span>}
            </div>
            <p className="text-[11px] text-white/35 mt-0.5">{tool.tagline}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <span className={cn('tag-pill border text-[10px]', TYPE_STYLES[tool.type])}>
            {tool.type}
          </span>
          <span className={cn('tag-pill border text-[10px]', DIFFICULTY_STYLES[tool.difficulty])}>
            {tool.difficulty}
          </span>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex border-t border-b border-white/[0.05]">
        {(['overview', 'install', 'usedby'] as const).map((t) => (
          <button key={t}
            onClick={() => setTab(t)}
            className={cn('flex-1 py-2 text-[11px] font-medium transition-all',
              tab === t ? 'text-white/80 border-b-2' : 'text-white/25 hover:text-white/50'
            )}
            style={tab === t ? { borderBottomColor: tool.color === '#ffffff' ? '#6366f1' : tool.color } : {}}>
            {t === 'overview' ? '📋 Overview' : t === 'install' ? '⚙️ Install' : '🏢 Used By'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 space-y-3">
        {tab === 'overview' && (
          <>
            <p className="text-[12.5px] text-white/45 leading-relaxed">{tool.description}</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1.5">Pros</p>
                <ul className="space-y-1">
                  {tool.pros.map((p) => (
                    <li key={p} className="flex items-start gap-1.5 text-[11px] text-emerald-400/70">
                      <span className="flex-shrink-0">+</span><span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1.5">Cons</p>
                <ul className="space-y-1">
                  {tool.cons.map((c) => (
                    <li key={c} className="flex items-start gap-1.5 text-[11px] text-red-400/60">
                      <span className="flex-shrink-0">−</span><span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1.5">Best For</p>
              <div className="flex flex-wrap gap-1">
                {tool.bestFor.map((b) => <span key={b} className="tag-pill text-[10px]">{b}</span>)}
              </div>
            </div>
          </>
        )}

        {tab === 'install' && (
          <div className="space-y-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1.5">Languages</p>
              <div className="flex flex-wrap gap-1">
                {tool.language.map((l) => <span key={l} className="tag-pill">{l}</span>)}
              </div>
            </div>
            {tool.installCmd ? (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1.5">Install Command</p>
                <div className="rounded-lg bg-black/40 border border-white/[0.07] px-4 py-3 flex items-center justify-between gap-2">
                  <code className="text-[11.5px] font-mono text-emerald-300/70 flex-1 min-w-0 truncate">
                    {tool.installCmd}
                  </code>
                  <button onClick={copy}
                    className={cn('text-[10px] font-medium flex-shrink-0 transition-colors',
                      copied ? 'text-emerald-400' : 'text-white/25 hover:text-white/60')}>
                    {copied ? '✓' : '⎘'}
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-[12px] text-white/30">Sign up at {tool.url} to get started.</p>
            )}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1.5">Tags</p>
              <div className="flex flex-wrap gap-1">
                {tool.tags.map((t) => <span key={t} className="tag-pill text-[9px]">{t}</span>)}
              </div>
            </div>
          </div>
        )}

        {tab === 'usedby' && (
          <div className="space-y-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-2">Used By</p>
              <div className="flex flex-wrap gap-2">
                {tool.usedBy.map((u) => (
                  <div key={u} className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.07] text-[12px] text-white/60">
                    {u}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 pt-2 border-t border-white/[0.04] flex gap-2">
        <a href={tool.docsUrl} target="_blank" rel="noopener noreferrer"
          className="flex-1 text-center py-1.5 rounded-md text-[11px] font-medium border border-white/[0.08] text-white/40 hover:text-white/70 transition-all">
          📄 Docs
        </a>
        {tool.githubUrl && (
          <a href={tool.githubUrl} target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center py-1.5 rounded-md text-[11px] font-medium border border-white/[0.08] text-white/40 hover:text-white/70 transition-all">
            💾 GitHub
          </a>
        )}
        <a href={tool.url} target="_blank" rel="noopener noreferrer"
          className="flex-1 text-center py-1.5 rounded-md text-[11px] font-semibold transition-all"
          style={{ background: `${tool.color === '#ffffff' ? '#6366f1' : tool.color}15`, color: tool.color === '#ffffff' ? '#a5b4fc' : tool.color, border: `1px solid ${tool.color === '#ffffff' ? '#6366f1' : tool.color}25` }}>
          Visit →
        </a>
      </div>
    </div>
  )
}

const CATEGORIES = [...new Set(DEV_TOOLS.map((t) => t.category))]

export function DevToolGrid() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | undefined>()
  const [activeDifficulty, setActiveDifficulty] = useState<string | undefined>()

  const filtered = DEV_TOOLS.filter((t) => {
    const matchSearch = !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some((tag) => tag.includes(search.toLowerCase()))
    const matchCat  = !activeCategory    || t.category === activeCategory
    const matchDiff = !activeDifficulty  || t.difficulty === activeDifficulty
    return matchSearch && matchCat && matchDiff
  })

  return (
    <div className="space-y-4">
      {/* Search + filters */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-sm">🔍</span>
            <input type="text" placeholder="Search tools…" value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white/80 placeholder:text-white/20 outline-none focus:border-emerald-500/50 transition-colors" />
          </div>
          <span className="text-[11px] text-white/25">{filtered.length} tools</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <span className="text-[11px] text-white/25 self-center">Category:</span>
          <button onClick={() => setActiveCategory(undefined)}
            className={cn('tag-pill cursor-pointer', !activeCategory && 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30')}>
            All
          </button>
          {CATEGORIES.map((c) => (
            <button key={c}
              onClick={() => setActiveCategory(activeCategory === c ? undefined : c)}
              className={cn('tag-pill cursor-pointer', activeCategory === c && 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30')}>
              {c}
            </button>
          ))}
          <span className="text-[11px] text-white/25 self-center ml-2">Level:</span>
          {['beginner', 'intermediate', 'advanced'].map((d) => (
            <button key={d}
              onClick={() => setActiveDifficulty(activeDifficulty === d ? undefined : d)}
              className={cn('tag-pill cursor-pointer capitalize border',
                DIFFICULTY_STYLES[d as keyof typeof DIFFICULTY_STYLES],
                activeDifficulty === d ? '' : 'opacity-50')}>
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((tool) => <DevToolCard key={tool.id} tool={tool} />)}
      </div>
    </div>
  )
}
