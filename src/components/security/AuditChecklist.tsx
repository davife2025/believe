'use client'

import { useState, useEffect } from 'react'
import { AUDIT_CHECKLIST } from '@/data/security-data'
import type { AuditItem } from '@/data/security-data'
import { cn } from '@/lib/utils'

const SEVERITY_STYLES = {
  critical: 'bg-red-500/10 text-red-400 border-red-500/20',
  high:     'bg-orange-500/10 text-orange-400 border-orange-500/20',
  medium:   'bg-amber-500/10 text-amber-400 border-amber-500/20',
  low:      'bg-sky-500/10 text-sky-400 border-sky-500/20',
  info:     'bg-white/5 text-white/40 border-white/10',
}

const SEVERITY_ORDER = ['critical', 'high', 'medium', 'low', 'info']

const LS_KEY = 'believe_audit_checklist'

function loadChecked(): Set<string> {
  try { return new Set(JSON.parse(localStorage.getItem(LS_KEY) || '[]')) }
  catch { return new Set() }
}

function saveChecked(checked: Set<string>) {
  localStorage.setItem(LS_KEY, JSON.stringify([...checked]))
}

export function AuditChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setChecked(loadChecked())
    setMounted(true)
  }, [])

  const toggle = (id: string) => {
    const next = new Set(checked)
    next.has(id) ? next.delete(id) : next.add(id)
    setChecked(next)
    saveChecked(next)
  }

  const toggleCat = (cat: string) => {
    const next = new Set(expandedCats)
    next.has(cat) ? next.delete(cat) : next.add(cat)
    setExpandedCats(next)
  }

  const resetAll = () => {
    setChecked(new Set())
    saveChecked(new Set())
  }

  // Group by category
  const categories = [...new Set(AUDIT_CHECKLIST.map((i) => i.category))]
  const byCategory = categories.map((cat) => ({
    name: cat,
    items: AUDIT_CHECKLIST
      .filter((i) => i.category === cat)
      .sort((a, b) => SEVERITY_ORDER.indexOf(a.severity) - SEVERITY_ORDER.indexOf(b.severity)),
  }))

  const total = AUDIT_CHECKLIST.length
  const done = mounted ? checked.size : 0
  const pct = Math.round((done / total) * 100)

  const criticalMissed = mounted
    ? AUDIT_CHECKLIST.filter((i) => i.severity === 'critical' && !checked.has(i.id)).length
    : 0

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="believe-card p-4 flex items-start gap-3 border-red-500/20 bg-red-500/5">
        <span className="text-xl">📋</span>
        <div className="flex-1">
          <p className="text-sm font-medium text-red-300">Smart Contract Audit Checklist</p>
          <p className="text-xs text-white/40 mt-0.5">
            {total} checks across {categories.length} categories. Use this before every audit or deployment.
            {criticalMissed > 0 && (
              <span className="text-red-400 ml-1 font-medium">
                {criticalMissed} critical item{criticalMissed > 1 ? 's' : ''} unchecked!
              </span>
            )}
          </p>
        </div>
        <button
          onClick={resetAll}
          className="text-[11px] text-white/25 hover:text-white/50 transition-colors flex-shrink-0"
        >
          Reset all
        </button>
      </div>

      {/* Overall progress */}
      <div className="believe-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-white/70">Overall Progress</p>
          <span className="text-sm font-bold" style={{ color: pct === 100 ? '#10b981' : pct > 50 ? '#f59e0b' : '#ef4444' }}>
            {pct}%
          </span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${pct}%`,
              background: pct === 100 ? '#10b981' : pct > 50 ? '#f59e0b' : '#ef4444',
            }}
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {(['critical', 'high', 'medium', 'low'] as const).map((sev) => {
            const sevItems = AUDIT_CHECKLIST.filter((i) => i.severity === sev)
            const sevDone = mounted ? sevItems.filter((i) => checked.has(i.id)).length : 0
            const s = SEVERITY_STYLES[sev]
            return (
              <div key={sev} className={cn('p-2.5 rounded-lg border text-center', s)}>
                <p className="text-[11px] font-semibold capitalize">{sev}</p>
                <p className="text-base font-bold mt-0.5">{sevDone}/{sevItems.length}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Category groups */}
      <div className="space-y-2">
        {byCategory.map(({ name, items }) => {
          const catDone = mounted ? items.filter((i) => checked.has(i.id)).length : 0
          const catPct = Math.round((catDone / items.length) * 100)
          const isExpanded = expandedCats.has(name)
          const hasCriticalMissed = mounted && items.some((i) => i.severity === 'critical' && !checked.has(i.id))

          return (
            <div key={name} className="believe-card overflow-hidden">
              {/* Category header */}
              <button
                onClick={() => toggleCat(name)}
                className="w-full flex items-center gap-3 p-4 hover:bg-white/[0.02] transition-colors text-left"
              >
                <div className="flex-1 min-w-0 flex items-center gap-3">
                  <p className="text-[13px] font-semibold text-white/75">{name}</p>
                  {hasCriticalMissed && (
                    <span className="tag-pill text-[9px] bg-red-500/15 text-red-400 border-red-500/25">
                      ⚠ Critical
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-20 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${catPct}%`,
                        background: catPct === 100 ? '#10b981' : '#6366f1',
                      }}
                    />
                  </div>
                  <span className="text-[11px] text-white/25 w-10 text-right">{catDone}/{items.length}</span>
                  <span className="text-white/20 text-xs">{isExpanded ? '▴' : '▾'}</span>
                </div>
              </button>

              {/* Items */}
              {isExpanded && (
                <div className="border-t border-white/[0.05] animate-fade-in">
                  {items.map((item) => {
                    const isChecked = mounted && checked.has(item.id)
                    const s = SEVERITY_STYLES[item.severity]

                    return (
                      <div
                        key={item.id}
                        onClick={() => toggle(item.id)}
                        className={cn(
                          'flex items-start gap-3 px-4 py-3 cursor-pointer border-b border-white/[0.03] last:border-0 transition-all group',
                          isChecked ? 'bg-white/[0.01]' : 'hover:bg-white/[0.03]'
                        )}
                      >
                        {/* Checkbox */}
                        <div
                          className={cn(
                            'w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all',
                            isChecked ? 'bg-emerald-500 border-emerald-500' : 'border-white/15 group-hover:border-emerald-500/50'
                          )}
                        >
                          {isChecked && (
                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                              <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className={cn('text-[12.5px] font-medium leading-snug transition-all',
                              isChecked ? 'text-white/25 line-through' : 'text-white/75')}>
                              {item.item}
                            </p>
                            <span className={cn('tag-pill border text-[9px] flex-shrink-0', s)}>{item.severity}</span>
                          </div>
                          <p className="text-[11px] text-white/30 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
