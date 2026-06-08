'use client'

import type { LucideProps } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Tab {
  label:  string
  value:  string | undefined
  icon?:  string                              // legacy emoji
  Icon?:  React.ComponentType<LucideProps>    // Lucide icon (preferred)
  count?: number
}

interface SubcategoryTabsProps {
  tabs:        Tab[]
  active:      string | undefined
  onChange:    (value: string | undefined) => void
  color?:      string
  className?:  string
}

export function SubcategoryTabs({
  tabs,
  active,
  onChange,
  color = '#6366f1',
  className,
}: SubcategoryTabsProps) {
  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {tabs.map((tab) => {
        const isActive = active === tab.value
        return (
          <button
            key={`${tab.label}-${tab.value}`}
            onClick={() => onChange(tab.value)}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)]',
              'text-[12.5px] font-medium border transition-all',
              isActive
                ? 'text-white'
                : 'bg-[rgba(255,255,255,0.03)] text-[var(--text-tertiary)] border-[var(--border-subtle)] hover:text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.05)]'
            )}
            style={
              isActive
                ? {
                    background: `${color}16`,
                    borderColor: `${color}35`,
                    color,
                  }
                : {}
            }
          >
            {/* Lucide icon preferred, emoji fallback */}
            {tab.Icon
              ? <tab.Icon size={13} strokeWidth={isActive ? 2.2 : 1.8} />
              : tab.icon
              ? <span className="text-[13px] leading-none">{tab.icon}</span>
              : null
            }
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
                style={
                  isActive
                    ? { background: `${color}20`, color }
                    : { background: 'rgba(255,255,255,0.06)', color: 'var(--text-disabled)' }
                }
              >
                {tab.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
