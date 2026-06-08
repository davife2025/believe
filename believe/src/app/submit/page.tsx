'use client'

import { useState } from 'react'
import { Send, CheckCircle2, ExternalLink } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { useToast } from '@/components/ui/Toast'

const CATEGORIES = [
  { slug: 'ai-ml',               label: 'AI & Machine Learning' },
  { slug: 'ai-agents',           label: 'AI Agents'             },
  { slug: 'blockchain',          label: 'Blockchain'            },
  { slug: 'blockchain-security', label: 'Blockchain Security'   },
  { slug: 'building-apps',       label: 'Building Applications' },
  { slug: 'opportunities',       label: 'Developer Opportunities'},
]

const TYPES = [
  'course','book','documentation','tool','video',
  'article','github','tutorial','roadmap','framework','podcast','newsletter',
]

const DIFFICULTIES = [
  { value: 'beginner',     label: 'Beginner'     },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced',     label: 'Advanced'     },
  { value: 'all_levels',   label: 'All Levels'   },
]

export default function SubmitResourcePage() {
  const [form, setForm] = useState({
    title:          '',
    url:            '',
    description:    '',
    type:           'course',
    platform:       '',
    author:         '',
    category_slug:  'ai-ml',
    difficulty:     'all_levels',
    is_free:        true,
    tags:           '',
    submitter_note: '',
  })
  const [loading,   setLoading]   = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { success, error: toastError } = useToast()

  const update = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.url || !form.category_slug) return

    setLoading(true)
    try {
      const res = await fetch('/api/submit-resource', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          ...form,
          tags: form.tags
            .split(',')
            .map((t) => t.trim().toLowerCase())
            .filter(Boolean),
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed')

      success('Resource submitted!', 'Thank you — it will be reviewed soon.')
      setSubmitted(true)
    } catch (e: any) {
      toastError('Submission failed', e.message)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="space-y-6">
        <PageHeader
          emoji="📬"
          title="Submit a Resource"
          description="Help grow the Believe knowledge base."
          color="#6366f1"
        />
        <div className="believe-card p-10 flex flex-col items-center text-center space-y-4 max-w-lg mx-auto">
          <div
            className="w-14 h-14 rounded-[var(--radius-xl)] flex items-center justify-center"
            style={{ background: 'rgba(16,185,129,0.10)', border: '1px solid rgba(16,185,129,0.2)' }}
          >
            <CheckCircle2 size={28} className="text-emerald-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
              Submission received!
            </h2>
            <p className="text-[13.5px] mt-1.5" style={{ color: 'var(--text-tertiary)' }}>
              Your resource has been submitted for review. If it passes quality checks
              it will appear in Believe shortly.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { setSubmitted(false); setForm({ ...form, title: '', url: '', description: '', tags: '', submitter_note: '' }) }}
              className="btn btn-secondary btn-md"
            >
              Submit another
            </button>
            <a href="/" className="btn btn-primary btn-md">
              Back to Dashboard
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <PageHeader
        emoji="📬"
        title="Submit a Resource"
        description="Found something great? Add it to the Believe knowledge base."
        color="#6366f1"
      />

      {/* Guidelines */}
      <div
        className="p-4 rounded-[var(--radius-lg)] text-[13px] space-y-1"
        style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.14)' }}
      >
        <p className="font-semibold" style={{ color: 'var(--text-secondary)' }}>Submission guidelines</p>
        <ul className="space-y-0.5 list-none">
          {[
            '✓ Resource must be free or have a free tier',
            '✓ Must be relevant to AI, Blockchain, Security, or developer tools',
            '✓ Original, high-quality content only — no spam or affiliate links',
            '✓ Books must be legally freely available online',
          ].map((g) => (
            <li key={g} className="text-[12.5px]" style={{ color: 'var(--text-tertiary)' }}>{g}</li>
          ))}
        </ul>
      </div>

      <form onSubmit={submit} className="space-y-5">

        {/* Title + URL */}
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1.5">
            <label className="text-[12.5px] font-medium" style={{ color: 'var(--text-secondary)' }}>
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              placeholder="e.g. Fast.ai Practical Deep Learning"
              required
              className="input"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[12.5px] font-medium" style={{ color: 'var(--text-secondary)' }}>
              URL <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <ExternalLink size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-disabled)' }} />
              <input
                type="url"
                value={form.url}
                onChange={(e) => update('url', e.target.value)}
                placeholder="https://www.fast.ai"
                required
                className="input pl-9"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-[12.5px] font-medium" style={{ color: 'var(--text-secondary)' }}>
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            placeholder="What is this resource about? What will someone learn from it?"
            rows={3}
            className="input resize-none"
          />
        </div>

        {/* Category + Type */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[12.5px] font-medium" style={{ color: 'var(--text-secondary)' }}>
              Category <span className="text-red-400">*</span>
            </label>
            <select
              value={form.category_slug}
              onChange={(e) => update('category_slug', e.target.value)}
              className="input"
            >
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>{c.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[12.5px] font-medium" style={{ color: 'var(--text-secondary)' }}>
              Type <span className="text-red-400">*</span>
            </label>
            <select
              value={form.type}
              onChange={(e) => update('type', e.target.value)}
              className="input"
            >
              {TYPES.map((t) => (
                <option key={t} value={t} className="capitalize">{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Platform + Author */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[12.5px] font-medium" style={{ color: 'var(--text-secondary)' }}>
              Platform
            </label>
            <input
              type="text"
              value={form.platform}
              onChange={(e) => update('platform', e.target.value)}
              placeholder="e.g. fast.ai, Coursera, GitHub"
              className="input"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[12.5px] font-medium" style={{ color: 'var(--text-secondary)' }}>
              Author / Creator
            </label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => update('author', e.target.value)}
              placeholder="e.g. Jeremy Howard"
              className="input"
            />
          </div>
        </div>

        {/* Difficulty + Free */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[12.5px] font-medium" style={{ color: 'var(--text-secondary)' }}>
              Difficulty Level
            </label>
            <select
              value={form.difficulty}
              onChange={(e) => update('difficulty', e.target.value)}
              className="input"
            >
              {DIFFICULTIES.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[12.5px] font-medium" style={{ color: 'var(--text-secondary)' }}>
              Cost
            </label>
            <div className="flex gap-2 pt-1">
              {[{ v: true, l: 'Free' }, { v: false, l: 'Paid' }].map(({ v, l }) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => update('is_free', v)}
                  className="btn btn-secondary btn-sm flex-1"
                  style={form.is_free === v ? { background: 'rgba(99,102,241,0.15)', color: '#818cf8', borderColor: 'rgba(99,102,241,0.3)' } : {}}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-1.5">
          <label className="text-[12.5px] font-medium" style={{ color: 'var(--text-secondary)' }}>
            Tags <span style={{ color: 'var(--text-disabled)' }}>(comma-separated)</span>
          </label>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => update('tags', e.target.value)}
            placeholder="pytorch, deep-learning, beginner-friendly"
            className="input"
          />
          {form.tags && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {form.tags.split(',').map((t) => t.trim()).filter(Boolean).map((t) => (
                <span key={t} className="badge text-[11px]">{t}</span>
              ))}
            </div>
          )}
        </div>

        {/* Submitter note */}
        <div className="space-y-1.5">
          <label className="text-[12.5px] font-medium" style={{ color: 'var(--text-secondary)' }}>
            Why is this valuable? <span style={{ color: 'var(--text-disabled)' }}>(optional)</span>
          </label>
          <textarea
            value={form.submitter_note}
            onChange={(e) => update('submitter_note', e.target.value)}
            placeholder="Tell us why this resource deserves a spot in Believe…"
            rows={2}
            className="input resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || !form.title || !form.url}
          className="btn btn-primary btn-lg w-full gap-2"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send size={15} strokeWidth={2} />
          )}
          {loading ? 'Submitting…' : 'Submit Resource'}
        </button>
      </form>
    </div>
  )
}
