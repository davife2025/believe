'use client'

import { useState } from 'react'
import { AGENT_PROJECTS, AGENT_FRAMEWORKS } from '@/data/agent-frameworks'
import type { AgentProject } from '@/data/agent-frameworks'
import { cn } from '@/lib/utils'

const DIFFICULTY_STYLES = {
  beginner:     { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', label: 'Beginner' },
  intermediate: { bg: 'bg-amber-500/10',   text: 'text-amber-400',   border: 'border-amber-500/20',   label: 'Intermediate' },
  advanced:     { bg: 'bg-red-500/10',      text: 'text-red-400',     border: 'border-red-500/20',      label: 'Advanced' },
}

// ── Build checklist stored in localStorage ────────────────────
function useBuildProgress(projectId: string) {
  const key = `believe_project_${projectId}`

  const load = (): number[] => {
    try { return JSON.parse(localStorage.getItem(key) || '[]') } catch { return [] }
  }

  const [done, setDone] = useState<number[]>(load)

  const toggle = (idx: number) => {
    const next = done.includes(idx) ? done.filter((i) => i !== idx) : [...done, idx]
    setDone(next)
    localStorage.setItem(key, JSON.stringify(next))
  }

  return { done, toggle }
}

// ── Project Card ──────────────────────────────────────────────
function ProjectCard({ project }: { project: AgentProject }) {
  const [open, setOpen] = useState(false)
  const { done, toggle } = useBuildProgress(project.id)
  const ds = DIFFICULTY_STYLES[project.difficulty]
  const pct = Math.round((done.length / project.steps.length) * 100)

  const projectFrameworks = AGENT_FRAMEWORKS.filter((f) =>
    project.frameworks.includes(f.id)
  )

  return (
    <div className={cn('believe-card overflow-hidden', open && 'ring-1 ring-indigo-500/20')}>
      {/* Progress top bar */}
      {pct > 0 && (
        <div
          className="h-0.5 transition-all duration-500"
          style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }}
        />
      )}

      {/* Header */}
      <div
        className="p-4 cursor-pointer flex items-start gap-3"
        onClick={() => setOpen(!open)}
      >
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn('tag-pill border text-[10px]', ds.bg, ds.text, ds.border)}>
              {ds.label}
            </span>
            <span className="text-[11px] text-white/25">⏱ ~{project.estimatedHours}h</span>
            {pct > 0 && (
              <span className="text-[11px] text-indigo-400/70 font-medium">{pct}% built</span>
            )}
          </div>
          <p className="text-[13.5px] font-semibold text-white/85">{project.title}</p>
          <p className="text-[12px] text-white/40 leading-relaxed line-clamp-2">{project.description}</p>
        </div>
        <span className="text-white/20 text-xs flex-shrink-0 mt-1">{open ? '▴' : '▾'}</span>
      </div>

      {/* Frameworks used */}
      <div className="px-4 pb-3 flex items-center gap-2">
        <span className="text-[10px] text-white/20">With:</span>
        {projectFrameworks.map((f) => (
          <span
            key={f.id}
            className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md border"
            style={{ background: `${f.color}10`, borderColor: `${f.color}25`, color: f.color }}
          >
            {f.icon} {f.name}
          </span>
        ))}
        <div className="flex flex-wrap gap-1 ml-1">
          {project.tags.map((t) => (
            <span key={t} className="tag-pill text-[9px]">{t}</span>
          ))}
        </div>
      </div>

      {/* Expanded: steps */}
      {open && (
        <div className="px-4 pb-4 pt-1 border-t border-white/[0.05] space-y-4 animate-fade-in">

          {/* Build checklist */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-3">
              Build Steps
            </p>
            <div className="space-y-2">
              {project.steps.map((step, idx) => {
                const isDone = done.includes(idx)
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 group cursor-pointer"
                    onClick={() => toggle(idx)}
                  >
                    <div
                      className={cn(
                        'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all',
                        isDone
                          ? 'bg-indigo-500 border-indigo-500'
                          : 'border-white/15 group-hover:border-indigo-500/50'
                      )}
                    >
                      {isDone && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                          <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <p className={cn(
                      'text-[12.5px] leading-snug transition-all',
                      isDone ? 'text-white/25 line-through' : 'text-white/65'
                    )}>
                      {step}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Progress bar */}
          <div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="text-[10px] text-white/20 mt-1">{done.length} of {project.steps.length} steps done</p>
          </div>

          {/* Search GitHub */}
          <a
            href={`https://github.com/search?q=${encodeURIComponent(project.githubSearch)}&type=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[11px] font-medium px-3 py-1.5 rounded-lg border border-white/[0.08] text-white/40 hover:text-white/70 hover:border-white/15 transition-all"
          >
            💾 Find examples on GitHub
          </a>
        </div>
      )}
    </div>
  )
}

// ── Project Builder Page ──────────────────────────────────────
export function AgentProjectBuilder() {
  const [difficulty, setDifficulty] = useState<string | undefined>()
  const [framework, setFramework] = useState<string | undefined>()

  const filtered = AGENT_PROJECTS.filter((p) => {
    const matchDiff = !difficulty || p.difficulty === difficulty
    const matchFw = !framework || p.frameworks.includes(framework)
    return matchDiff && matchFw
  })

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="believe-card p-4 flex items-center gap-3 border-amber-500/20 bg-amber-500/5">
        <span className="text-xl">🏗️</span>
        <div>
          <p className="text-sm font-medium text-amber-300">Build real projects. That's how it sticks.</p>
          <p className="text-xs text-white/40 mt-0.5">
            Each project has a step-by-step checklist you can track. Progress is saved locally.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-[11px] text-white/25">Difficulty:</span>
        {['beginner', 'intermediate', 'advanced'].map((d) => (
          <button
            key={d}
            onClick={() => setDifficulty(difficulty === d ? undefined : d)}
            className={cn(
              'tag-pill cursor-pointer capitalize',
              difficulty === d && 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
            )}
          >
            {d}
          </button>
        ))}
        <span className="text-[11px] text-white/25 ml-3">Framework:</span>
        {AGENT_FRAMEWORKS.slice(0, 5).map((f) => (
          <button
            key={f.id}
            onClick={() => setFramework(framework === f.id ? undefined : f.id)}
            className={cn('tag-pill cursor-pointer')}
            style={
              framework === f.id
                ? { background: `${f.color}15`, color: f.color, borderColor: `${f.color}35` }
                : {}
            }
          >
            {f.icon} {f.name}
          </button>
        ))}
        <span className="text-[11px] text-white/25 ml-auto">{filtered.length} projects</span>
      </div>

      {/* Project list */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
