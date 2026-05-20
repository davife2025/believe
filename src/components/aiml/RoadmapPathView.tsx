'use client'

import { useState } from 'react'
import type { RoadmapPath, RoadmapStep } from '@/data/aiml-roadmaps'
import { cn } from '@/lib/utils'

// ── Step type badge ───────────────────────────────────────────
const TYPE_STYLES = {
  required:    'bg-indigo-500/15 text-indigo-400 border-indigo-500/25',
  recommended: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  optional:    'bg-white/5 text-white/35 border-white/10',
}
const TYPE_LABELS = {
  required:    'Required',
  recommended: 'Recommended',
  optional:    'Optional',
}

// ── Single step card ──────────────────────────────────────────
function RoadmapStepCard({
  step,
  index,
  color,
  completed,
  onToggle,
}: {
  step: RoadmapStep
  index: number
  color: string
  completed: boolean
  onToggle: () => void
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={cn('flex gap-4 group', completed && 'opacity-60')}>
      {/* Timeline */}
      <div className="flex flex-col items-center flex-shrink-0">
        <button
          onClick={onToggle}
          className="w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all flex-shrink-0 z-10"
          style={{
            borderColor: completed ? color : 'rgba(255,255,255,0.12)',
            background: completed ? `${color}20` : 'transparent',
          }}
          title={completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {completed ? (
            <svg className="w-3.5 h-3.5" style={{ color }} fill="none" viewBox="0 0 14 14">
              <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <span className="text-[11px] font-semibold text-white/30">{index + 1}</span>
          )}
        </button>
        {/* Connector line — hidden on last item */}
        <div className="w-px flex-1 mt-1" style={{ background: 'rgba(255,255,255,0.05)', minHeight: 16 }} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pb-5">
        <div
          className={cn(
            'believe-card p-4 space-y-2 cursor-pointer transition-all',
            expanded && 'border-white/10'
          )}
          onClick={() => setExpanded(!expanded)}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={cn('tag-pill border text-[10px]', TYPE_STYLES[step.type])}>
                {TYPE_LABELS[step.type]}
              </span>
              <span className="text-[11px] text-white/25">⏱ ~{step.estimatedHours}h</span>
            </div>
            <span className="text-white/20 text-xs flex-shrink-0 transition-transform" style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              ▾
            </span>
          </div>

          <p className={cn('text-sm font-semibold leading-snug', completed ? 'line-through text-white/30' : 'text-white/85')}>
            {step.title}
          </p>

          {expanded && (
            <div className="space-y-3 pt-1 animate-fade-in">
              <p className="text-[12.5px] text-white/45 leading-relaxed">{step.description}</p>

              {/* Resource link */}
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.05]">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-white/30">{step.platform}</span>
                  <span className="text-white/15">·</span>
                  <span className="text-[11px] text-white/30">{step.resourceTitle}</span>
                </div>
                <a
                  href={step.resourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[11px] font-medium px-2.5 py-1 rounded-md transition-all"
                  style={{ background: `${color}15`, color }}
                >
                  Open →
                </a>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {step.tags.map((t) => (
                  <span key={t} className="tag-pill">{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Full Roadmap ──────────────────────────────────────────────
export function RoadmapPathView({ roadmap }: { roadmap: RoadmapPath }) {
  const [completed, setCompleted] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const pct = Math.round((completed.size / roadmap.steps.length) * 100)
  const totalHours = roadmap.steps
    .filter((s) => !completed.has(s.id))
    .reduce((acc, s) => acc + s.estimatedHours, 0)

  return (
    <div className="believe-card p-5 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: `${roadmap.color}15`, border: `1px solid ${roadmap.color}25` }}
          >
            {roadmap.icon}
          </div>
          <div>
            <p className="text-sm font-semibold text-white/85">{roadmap.title}</p>
            <p className="text-[11px] text-white/35 mt-0.5">{roadmap.description}</p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-[11px] text-white/25">~{totalHours}h left</p>
          <p className="text-[11px] font-semibold mt-0.5" style={{ color: roadmap.color }}>
            {pct}% done
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${pct}%`,
              background: `linear-gradient(90deg, ${roadmap.color}, ${roadmap.color}99)`,
            }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-white/20">{completed.size} of {roadmap.steps.length} steps</span>
          <span className="text-[10px] text-white/20">{roadmap.totalHours}h total</span>
        </div>
      </div>

      {/* Steps */}
      <div className="pt-1">
        {roadmap.steps.map((step, i) => (
          <RoadmapStepCard
            key={step.id}
            step={step}
            index={i}
            color={roadmap.color}
            completed={completed.has(step.id)}
            onToggle={() => toggle(step.id)}
          />
        ))}
      </div>
    </div>
  )
}
