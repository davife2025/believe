'use client'

import { useState } from 'react'
import { STACK_QUIZ, STACK_TEMPLATES, DEV_TOOLS, recommendStack } from '@/data/building-apps-data'
import type { StackTemplate } from '@/data/building-apps-data'
import { cn } from '@/lib/utils'

const DIFF_STYLES = {
  beginner:     { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  intermediate: { bg: 'bg-amber-500/10',   text: 'text-amber-400',   border: 'border-amber-500/20' },
  advanced:     { bg: 'bg-red-500/10',      text: 'text-red-400',     border: 'border-red-500/20' },
}

// ── Stack Template Card ───────────────────────────────────────
function StackTemplateCard({ template, highlight = false }: { template: StackTemplate; highlight?: boolean }) {
  const [open, setOpen] = useState(highlight)
  const ds = DIFF_STYLES[template.difficulty]

  const toolObjects = DEV_TOOLS.filter((t) => template.tools.includes(t.id))

  const [stepsDone, setStepsDone] = useState<number[]>([])
  const pct = Math.round((stepsDone.length / template.steps.length) * 100)

  const toggle = (i: number) =>
    setStepsDone((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i])

  return (
    <div className={cn(
      'believe-card overflow-hidden transition-all',
      highlight && 'ring-1 ring-indigo-500/30 border-indigo-500/25'
    )}>
      {highlight && (
        <div className="px-4 py-2 bg-indigo-500/10 border-b border-indigo-500/20">
          <p className="text-[11px] text-indigo-400 font-medium">✨ Recommended for you</p>
        </div>
      )}
      <div className="h-0.5" style={{ background: `linear-gradient(90deg, ${template.color}, transparent)` }} />

      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: `${template.color}15`, border: `1px solid ${template.color}25` }}>
              {template.icon}
            </div>
            <div>
              <p className="text-[13.5px] font-semibold text-white/90">{template.name}</p>
              <p className="text-[11px] text-white/35 mt-0.5">{template.useCase}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span className={cn('tag-pill border text-[10px]', ds.bg, ds.text, ds.border)}>
              {template.difficulty}
            </span>
            <span className="text-[10px] text-white/25">~{template.estimatedHours}h</span>
          </div>
        </div>

        <p className="text-[12.5px] text-white/45 leading-relaxed">{template.description}</p>

        {/* Tools used */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-2">Stack</p>
          <div className="flex flex-wrap gap-1.5">
            {toolObjects.map((t) => (
              <span key={t.id}
                className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md border"
                style={{ background: `${t.color === '#ffffff' ? '#6366f1' : t.color}10`, borderColor: `${t.color === '#ffffff' ? '#6366f1' : t.color}25`, color: t.color === '#ffffff' ? '#a5b4fc' : t.color }}>
                {t.icon} {t.name}
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {template.tags.map((t) => <span key={t} className="tag-pill text-[9px]">{t}</span>)}
        </div>

        {/* Toggle steps */}
        <button onClick={() => setOpen(!open)}
          className="text-[11px] text-white/30 hover:text-white/60 transition-colors">
          {open ? '▴ Hide steps' : `▾ Show ${template.steps.length} build steps`}
        </button>

        {open && (
          <div className="space-y-3 pt-1 border-t border-white/[0.05] animate-fade-in">
            {/* Progress */}
            {pct > 0 && (
              <div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
                    style={{ width: `${pct}%` }} />
                </div>
                <p className="text-[10px] text-white/20 mt-1">{stepsDone.length}/{template.steps.length} steps done</p>
              </div>
            )}

            {/* Steps checklist */}
            <ul className="space-y-1.5">
              {template.steps.map((step, i) => {
                const done = stepsDone.includes(i)
                return (
                  <li key={i}
                    onClick={() => toggle(i)}
                    className="flex items-start gap-2.5 cursor-pointer group">
                    <div className={cn(
                      'w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all',
                      done ? 'bg-indigo-500 border-indigo-500' : 'border-white/15 group-hover:border-indigo-500/50'
                    )}>
                      {done && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                          <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <p className={cn('text-[12.5px] leading-snug transition-all',
                      done ? 'line-through text-white/25' : 'text-white/65')}>
                      <span className="text-white/20 mr-1.5 text-[10px]">{i + 1}.</span>{step}
                    </p>
                  </li>
                )
              })}
            </ul>

            {template.repoTemplate && (
              <a href={template.repoTemplate} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                💾 Start from template →
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Stack Recommender Quiz ────────────────────────────────────
export function StackRecommender() {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<StackTemplate | null>(null)
  const [step, setStep] = useState(0)

  const currentQ = STACK_QUIZ[step]
  const isLast = step === STACK_QUIZ.length - 1

  const answer = (value: string) => {
    const newAnswers = { ...answers, [currentQ.id]: value }
    setAnswers(newAnswers)

    if (isLast) {
      setResult(recommendStack(newAnswers))
    } else {
      setStep(step + 1)
    }
  }

  const reset = () => { setAnswers({}); setResult(null); setStep(0) }

  if (result) {
    return (
      <div className="space-y-4">
        <div className="believe-card p-4 flex items-center gap-3 border-indigo-500/20 bg-indigo-500/5">
          <span className="text-xl">🎯</span>
          <div className="flex-1">
            <p className="text-sm font-medium text-indigo-300">Your recommended stack is ready</p>
            <p className="text-xs text-white/40 mt-0.5">Based on your answers, here's the best starting point.</p>
          </div>
          <button onClick={reset} className="text-[11px] text-white/30 hover:text-white/60 transition-colors flex-shrink-0">
            Retake →
          </button>
        </div>
        <StackTemplateCard template={result} highlight />
      </div>
    )
  }

  const progress = (step / STACK_QUIZ.length) * 100

  return (
    <div className="max-w-xl mx-auto space-y-5">
      <div className="believe-card p-4 flex items-center gap-3 border-indigo-500/20 bg-indigo-500/5">
        <span className="text-xl">🧙</span>
        <div>
          <p className="text-sm font-medium text-indigo-300">Stack Recommender</p>
          <p className="text-xs text-white/40 mt-0.5">Answer 4 questions — get your perfect stack.</p>
        </div>
      </div>

      {/* Progress */}
      <div>
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-[10px] text-white/25 mt-1">Question {step + 1} of {STACK_QUIZ.length}</p>
      </div>

      {/* Question */}
      <div className="believe-card p-6 space-y-4">
        <p className="text-base font-semibold text-white/85">{currentQ.question}</p>
        <div className="space-y-2">
          {currentQ.options.map((opt) => (
            <button key={opt.value}
              onClick={() => answer(opt.value)}
              className="w-full text-left px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-indigo-500/10 hover:border-indigo-500/30 text-[13px] text-white/65 hover:text-white/85 transition-all">
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── All Templates Grid ────────────────────────────────────────
export function ProjectTemplates() {
  return (
    <div className="space-y-4">
      <div className="believe-card p-4 flex items-center gap-3 border-emerald-500/20 bg-emerald-500/5">
        <span className="text-xl">📐</span>
        <div>
          <p className="text-sm font-medium text-emerald-300">Project Templates</p>
          <p className="text-xs text-white/40 mt-0.5">
            {STACK_TEMPLATES.length} templates with full tech stacks and step-by-step build checklists. Track progress locally.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {STACK_TEMPLATES.map((t) => <StackTemplateCard key={t.id} template={t} />)}
      </div>
    </div>
  )
}
