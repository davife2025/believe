'use client'

import { cn } from '@/lib/utils'

interface Tab {
  label: string
  value: string | undefined
  icon: string
  count?: number
}

interface SubcategoryTabsProps {
  tabs: Tab[]
  active: string | undefined
  onChange: (value: string | undefined) => void
  color?: string
}

export function SubcategoryTabs({ tabs, active, onChange, color = '#6366f1' }: SubcategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tabs.map((tab) => {
        const isActive = active === tab.value
        return (
          <button
            key={tab.label}
            onClick={() => onChange(tab.value)}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-all',
              isActive
                ? 'text-white border-current'
                : 'bg-white/[0.03] text-white/40 border-white/[0.07] hover:text-white/65 hover:bg-white/[0.05]'
            )}
            style={isActive ? { background: `${color}15`, borderColor: `${color}35`, color } : {}}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={cn(
                  'text-[10px] px-1.5 py-0.5 rounded-full',
                  isActive ? 'bg-current/10' : 'bg-white/5 text-white/25'
                )}
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
