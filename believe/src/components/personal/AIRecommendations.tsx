'use client'

import { useState } from 'react'
import { Sparkles, ArrowRight, RefreshCw, Zap, Clock, Calendar } from 'lucide-react'
import { useToast } from '@/components/ui/Toast'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface Recommendation {
  title:       string
  description: string
  category:    string
  urgency:     'start-now' | 'this-week' | 'this-month'
  reason:      string
}

interface RecommendResponse {
  recommendations: Recommendation[]
  encouragement:   string
}

const URGENCY_CONFIG = {
  'start-now':   { label: 'Start Now',    Icon: Zap,      color: '#6366f1', bg: 'rgba(99,102,241,0.10)'  },
  'this-week':   { label: 'This Week',    Icon: Clock,    color: '#f59e0b', bg: 'rgba(245,158,11,0.10)'  },
  'this-month':  { label: 'This Month',   Icon: Calendar, color: '#10b981', bg: 'rgba(16,185,129,0.10)'  },
}

const CATEGORY_ROUTES: Record<string, string> = {
  'ai-ml':               '/ai-ml',
  'ai-agents':           '/ai-agents',
  'blockchain':          '/blockchain',
  'blockchain-security': '/blockchain-security',
  'building-apps':       '/building-apps',
  'opportunities':       '/opportunities',
}

const CATEGORY_COLORS: Record<string, string> = {
  'ai-ml':               '#8b5cf6',
  'ai-agents':           '#a855f7',
  'blockchain':          '#f59e0b',
  'blockchain-security': '#ef4444',
  'building-apps':       '#10b981',
  'opportunities':       '#f97316',
}

export function AIRecommendations() {
  const [data, setData]       = useState<RecommendResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [fetched, setFetched] = useState(false)
  const { error: toastError } = useToast()

  const fetch = async () => {
    setLoading(true)
    try {
      const res  = await window.fetch('/api/recommend', { method: 'POST' })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to get recommendations')
      setData(json)
      setFetched(true)
    } catch (e: any) {
      toastError('Recommendation failed', e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="believe-card overflow-hidden">
      {/* Header accent */}
      <div className="h-[2px]" style={{ background: 'linear-gradient(90deg, #6366f1, #a855f7, transparent)' }} />

      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-[var(--radius-sm)] flex items-center justify-center"
              style={{ background: 'rgba(99,102,241,0.12)' }}
            >
              <Sparkles size={14} className="text-indigo-400" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-[13.5px] font-semibold" style={{ color: 'var(--text-secondary)' }}>
                AI Recommendations
              </h3>
              <p className="text-[11px]" style={{ color: 'var(--text-disabled)' }}>
                Personalised to your progress
              </p>
            </div>
          </div>
          {fetched && (
            <button
              onClick={fetch}
              disabled={loading}
              className="btn btn-ghost btn-sm gap-1.5"
            >
              <RefreshCw size={12} className={cn(loading && 'animate-spin')} />
              Refresh
            </button>
          )}
        </div>

        {/* Empty state — prompt to generate */}
        {!fetched && !loading && (
          <div className="py-6 text-center space-y-3">
            <div
              className="w-12 h-12 rounded-[var(--radius-xl)] mx-auto flex items-center justify-center"
              style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}
            >
              <Sparkles size={22} className="text-indigo-400" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[13.5px] font-medium" style={{ color: 'var(--text-secondary)' }}>
                Get personalised recommendations
              </p>
              <p className="text-[12px] mt-1" style={{ color: 'var(--text-disabled)' }}>
                Claude analyses your progress and tells you exactly what to learn next.
              </p>
            </div>
            <button onClick={fetch} className="btn btn-primary btn-md gap-2">
              <Sparkles size={14} strokeWidth={2} />
              Generate Recommendations
            </button>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="py-6 space-y-3">
            <div className="flex items-center gap-2 justify-center">
              <div className="w-4 h-4 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
              <p className="text-[13px]" style={{ color: 'var(--text-tertiary)' }}>
                Analysing your progress…
              </p>
            </div>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton h-20 w-full" />
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {data && !loading && (
          <div className="space-y-3 animate-fade-in">
            {/* Encouragement */}
            <div
              className="px-4 py-3 rounded-[var(--radius-md)] text-[13px]"
              style={{
                background: 'rgba(99,102,241,0.06)',
                border: '1px solid rgba(99,102,241,0.14)',
                color: 'var(--text-secondary)',
              }}
            >
              ✨ {data.encouragement}
            </div>

            {/* Recommendation cards */}
            {data.recommendations.map((rec, i) => {
              const urgency      = URGENCY_CONFIG[rec.urgency] || URGENCY_CONFIG['this-week']
              const catColor     = CATEGORY_COLORS[rec.category] || '#6366f1'
              const route        = CATEGORY_ROUTES[rec.category] || '/'

              return (
                <div
                  key={i}
                  className="believe-card p-4 space-y-2"
                  style={{ borderColor: `${catColor}20` }}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Urgency badge */}
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium"
                        style={{ background: urgency.bg, color: urgency.color }}
                      >
                        <urgency.Icon size={10} strokeWidth={2.5} />
                        {urgency.label}
                      </span>
                      {/* Category badge */}
                      <span
                        className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                        style={{
                          background: `${catColor}12`,
                          color: catColor,
                          border: `1px solid ${catColor}25`,
                        }}
                      >
                        {rec.category.replace(/-/g, ' ')}
                      </span>
                    </div>
                    <span
                      className="text-[11px] font-semibold flex-shrink-0"
                      style={{ color: 'var(--text-disabled)' }}
                    >
                      #{i + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <p className="text-[13.5px] font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {rec.title}
                  </p>

                  {/* Description */}
                  <p className="text-[12.5px] leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
                    {rec.description}
                  </p>

                  {/* Reason + link */}
                  <div className="flex items-end justify-between gap-2 pt-1">
                    <p
                      className="text-[11.5px] italic flex-1"
                      style={{ color: 'var(--text-disabled)' }}
                    >
                      Why: {rec.reason}
                    </p>
                    <Link
                      href={route}
                      className="btn btn-secondary btn-sm flex items-center gap-1.5 flex-shrink-0"
                      style={{ color: catColor, borderColor: `${catColor}30` }}
                    >
                      Go <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
