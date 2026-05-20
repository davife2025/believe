'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { DailyGoal } from '@/lib/types'

export function DailyGoals() {
  const [goals, setGoals] = useState<DailyGoal[]>([])
  const [loading, setLoading] = useState(true)
  const [input, setInput] = useState('')
  const [adding, setAdding] = useState(false)
  const supabase = createClient()

  const today = new Date().toISOString().split('T')[0]

  const loadGoals = async () => {
    const { data } = await supabase
      .from('daily_goals')
      .select('*')
      .eq('date', today)
      .order('created_at', { ascending: true })
    setGoals(data || [])
    setLoading(false)
  }

  useEffect(() => { loadGoals() }, [])

  const addGoal = async () => {
    if (!input.trim()) return
    setAdding(true)
    const { data } = await supabase
      .from('daily_goals')
      .insert({ goal_text: input.trim(), date: today })
      .select()
      .single()
    if (data) setGoals((prev) => [...prev, data])
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
  }

  const deleteGoal = async (id: string) => {
    await supabase.from('daily_goals').delete().eq('id', id)
    setGoals((prev) => prev.filter((g) => g.id !== id))
  }

  const completed = goals.filter((g) => g.is_completed).length
  const total = goals.length
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div className="believe-card p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎯</span>
          <h3 className="text-sm font-semibold text-white/80">Today's Goals</h3>
        </div>
        {total > 0 && (
          <div className="flex items-center gap-2">
            <div className="w-24 h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-[11px] text-white/30">{completed}/{total}</span>
          </div>
        )}
      </div>

      {/* Goals list */}
      {loading ? (
        <div className="space-y-2">
          {[1, 2].map((i) => (
            <div key={i} className="h-8 bg-white/5 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : goals.length === 0 ? (
        <p className="text-[12px] text-white/25 text-center py-3">
          No goals yet — add one below.
        </p>
      ) : (
        <ul className="space-y-1.5">
          {goals.map((goal) => (
            <li
              key={goal.id}
              className="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/[0.03] transition-colors"
            >
              <button
                onClick={() => toggleGoal(goal)}
                className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                  goal.is_completed
                    ? 'bg-indigo-500 border-indigo-500'
                    : 'border-white/20 hover:border-indigo-400'
                }`}
              >
                {goal.is_completed && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                    <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
              <span
                className={`flex-1 text-[13px] transition-all ${
                  goal.is_completed ? 'line-through text-white/25' : 'text-white/70'
                }`}
              >
                {goal.goal_text}
              </span>
              <button
                onClick={() => deleteGoal(goal.id)}
                className="opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-400 transition-all text-xs"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Add input */}
      <div className="flex items-center gap-2 pt-1 border-t border-white/[0.05]">
        <input
          type="text"
          placeholder="Add a goal for today…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addGoal()}
          className="flex-1 bg-transparent text-[13px] text-white/70 placeholder:text-white/20 outline-none"
        />
        <button
          onClick={addGoal}
          disabled={adding || !input.trim()}
          className="text-[11px] font-medium px-3 py-1.5 rounded-md bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 disabled:opacity-30 transition-all"
        >
          {adding ? '…' : '+ Add'}
        </button>
      </div>
    </div>
  )
}
