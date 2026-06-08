'use client'

import { useState, useEffect } from 'react'
import { Target, Plus, Check, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/components/ui/Toast'
import type { DailyGoal } from '@/lib/types'

export function DailyGoals() {
  const [goals, setGoals]   = useState<DailyGoal[]>([])
  const [loading, setLoading] = useState(true)
  const [input, setInput]   = useState('')
  const [adding, setAdding] = useState(false)
  const { success }         = useToast()
  const supabase            = createClient()
  const today               = new Date().toISOString().split('T')[0]

  const load = async () => {
    const { data } = await supabase
      .from('daily_goals')
      .select('*')
      .eq('date', today)
      .order('created_at', { ascending: true })
    setGoals(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const addGoal = async () => {
    if (!input.trim()) return
    setAdding(true)
    const { data } = await supabase
      .from('daily_goals')
      .insert({ goal_text: input.trim(), date: today })
      .select()
      .single()
    if (data) {
      setGoals((prev) => [...prev, data])
      success('Goal added', input.trim())
    }
    setInput('')
    setAdding(false)
  }

  const toggleGoal = async (goal: DailyGoal) => {
    await supabase
      .from('daily_goals')
      .update({ is_completed: !goal.is_completed })
      .eq('id', goal.id)
    setGoals((prev) =>
      prev.map((g) => g.id === goal.id ? { ...g, is_completed: !g.is_completed } : g)
    )
    if (!goal.is_completed) success('Goal completed ✓', goal.goal_text)
  }

  const deleteGoal = async (id: string) => {
    await supabase.from('daily_goals').delete().eq('id', id)
    setGoals((prev) => prev.filter((g) => g.id !== id))
  }

  const completed = goals.filter((g) => g.is_completed).length
  const total     = goals.length
  const pct       = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div className="believe-card p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-[var(--radius-sm)] flex items-center justify-center"
            style={{ background: 'rgba(99,102,241,0.12)' }}>
            <Target size={14} className="text-indigo-400" strokeWidth={2} />
          </div>
          <h3 className="text-[13.5px] font-semibold" style={{ color: 'var(--text-secondary)' }}>
            Today's Goals
          </h3>
        </div>
        {total > 0 && (
          <div className="flex items-center gap-2">
            <div className="w-20 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${pct}%`,
                  background: pct === 100 ? '#10b981' : 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                }}
              />
            </div>
            <span className="text-[11.5px] font-medium" style={{ color: 'var(--text-disabled)' }}>
              {completed}/{total}
            </span>
          </div>
        )}
      </div>

      {/* Goals list */}
      {loading ? (
        <div className="space-y-2">
          {[1, 2].map((i) => <div key={i} className="skeleton h-9 w-full" />)}
        </div>
      ) : goals.length === 0 ? (
        <p className="text-[12.5px] text-center py-3" style={{ color: 'var(--text-disabled)' }}>
          No goals yet — add one below.
        </p>
      ) : (
        <ul className="space-y-1">
          {goals.map((goal) => (
            <li
              key={goal.id}
              className="group flex items-center gap-3 px-2.5 py-2 rounded-[var(--radius-md)] hover:bg-white/[0.03] transition-colors cursor-pointer"
              onClick={() => toggleGoal(goal)}
            >
              {/* Checkbox */}
              <div
                className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all"
                style={goal.is_completed
                  ? { background: '#6366f1', borderColor: '#6366f1' }
                  : { borderColor: 'rgba(255,255,255,0.18)' }
                }
              >
                {goal.is_completed && <Check size={9} className="text-white" strokeWidth={3} />}
              </div>

              <span
                className={`flex-1 text-[13px] transition-all ${
                  goal.is_completed
                    ? 'line-through'
                    : ''
                }`}
                style={{ color: goal.is_completed ? 'var(--text-disabled)' : 'var(--text-secondary)' }}
              >
                {goal.goal_text}
              </span>

              <button
                onClick={(e) => { e.stopPropagation(); deleteGoal(goal.id) }}
                className="opacity-0 group-hover:opacity-100 transition-all p-1 rounded hover:bg-red-500/10"
                style={{ color: 'var(--text-disabled)' }}
              >
                <X size={12} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Add input */}
      <div
        className="flex items-center gap-2 pt-2"
        style={{ borderTop: '1px solid var(--border-subtle)' }}
      >
        <input
          type="text"
          placeholder="Add a goal for today…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addGoal()}
          className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-[var(--text-disabled)]"
          style={{ color: 'var(--text-secondary)' }}
        />
        <button
          onClick={addGoal}
          disabled={adding || !input.trim()}
          className="btn btn-primary btn-sm gap-1 px-2.5"
        >
          <Plus size={13} strokeWidth={2.5} />
          {adding ? '…' : 'Add'}
        </button>
      </div>
    </div>
  )
}
