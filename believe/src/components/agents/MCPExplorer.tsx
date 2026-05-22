'use client'

import { useState } from 'react'
import { MCP_SERVERS } from '@/data/agent-frameworks'
import type { MCPServer } from '@/data/agent-frameworks'
import { cn } from '@/lib/utils'

const CATEGORY_ICONS: Record<string, string> = {
  Utilities:     '🔧',
  'Dev Tools':   '💻',
  Search:        '🔍',
  Database:      '🗄️',
  Browser:       '🌐',
  Communication: '💬',
  Memory:        '🧠',
  Reasoning:     '🤔',
}

const DIFFICULTY_STYLES = {
  beginner:     'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  intermediate: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  advanced:     'bg-red-500/10 text-red-400 border-red-500/20',
}

function MCPServerCard({ server }: { server: MCPServer }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="believe-card p-4 cursor-pointer space-y-3"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-base flex-shrink-0">
            {CATEGORY_ICONS[server.category] ?? '📦'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-[13px] font-semibold text-white/85">{server.name}</p>
              {server.official && (
                <span className="tag-pill text-[9px] bg-sky-500/10 text-sky-400 border-sky-500/20">✓ Official</span>
              )}
            </div>
            <p className="text-[11px] text-white/35 mt-0.5">{server.category}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className={cn('tag-pill border text-[10px]', DIFFICULTY_STYLES[server.difficulty])}>
            {server.difficulty}
          </span>
          <span className="text-white/20 text-xs">{expanded ? '▴' : '▾'}</span>
        </div>
      </div>

      <p className="text-[12px] text-white/40 leading-relaxed">{server.description}</p>

      {/* Tools preview */}
      <div className="flex flex-wrap gap-1">
        {server.tools.map((tool) => (
          <span
            key={tool}
            className="inline-flex items-center px-2 py-0.5 rounded-md bg-indigo-500/8 border border-indigo-500/15 text-[10.5px] font-mono text-indigo-300/60"
          >
            {tool}()
          </span>
        ))}
      </div>

      {expanded && (
        <div className="pt-2 border-t border-white/[0.05] space-y-3 animate-fade-in">
          {/* Install command */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1.5">
              Add to Claude / MCP client
            </p>
            <div className="rounded-lg bg-black/40 border border-white/[0.06] px-3 py-2.5 flex items-center justify-between gap-2">
              <code className="text-[11px] font-mono text-emerald-300/70">
                npx @modelcontextprotocol/server-{server.id}
              </code>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigator.clipboard.writeText(`npx @modelcontextprotocol/server-${server.id}`)
                }}
                className="text-[10px] text-white/25 hover:text-white/60 transition-colors flex-shrink-0"
              >
                Copy
              </button>
            </div>
          </div>

          <a
            href={server.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-[11px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            View on GitHub →
          </a>
        </div>
      )}
    </div>
  )
}

export function MCPExplorer() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | undefined>()

  const categories = [...new Set(MCP_SERVERS.map((s) => s.category))]

  const filtered = MCP_SERVERS.filter((s) => {
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase())
    const matchCat = !activeCategory || s.category === activeCategory
    return matchSearch && matchCat
  })

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="believe-card p-4 flex items-center gap-4 border-indigo-500/20 bg-indigo-500/5">
        <span className="text-2xl">🔌</span>
        <div>
          <p className="text-sm font-semibold text-indigo-300">Model Context Protocol (MCP)</p>
          <p className="text-xs text-white/40 mt-0.5">
            Connect your AI agents to real tools. Each MCP server exposes typed functions your agent can call.
            <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer" className="text-indigo-400 ml-1">Learn more →</a>
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search servers…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white/80 placeholder:text-white/20 outline-none focus:border-indigo-500/50 transition-colors w-52"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveCategory(undefined)}
            className={cn('tag-pill cursor-pointer', !activeCategory && 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30')}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? undefined : cat)}
              className={cn('tag-pill cursor-pointer', activeCategory === cat && 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30')}
            >
              {CATEGORY_ICONS[cat]} {cat}
            </button>
          ))}
        </div>
        <span className="text-[11px] text-white/25 ml-auto">{filtered.length} servers</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((server) => (
          <MCPServerCard key={server.id} server={server} />
        ))}
      </div>
    </div>
  )
}
