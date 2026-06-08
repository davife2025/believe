'use client'

import type { LucideProps } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  icon?: React.ComponentType<LucideProps>
  emoji?: string                  // fallback for sections that haven't migrated
  title: string
  description: string
  color?: string
  badge?: string
  children?: React.ReactNode
  className?: string
}

export function PageHeader({
  icon: Icon,
  emoji,
  title,
  description,
  color = '#6366f1',
  badge,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('page-header', className)}>
      <div className="flex items-center gap-4 min-w-0">
        {/* Icon */}
        {(Icon || emoji) && (
          <div
            className="w-11 h-11 rounded-[var(--radius-lg)] flex items-center justify-center flex-shrink-0"
            style={{
              background: `${color}14`,
              border: `1px solid ${color}28`,
              boxShadow: `0 0 0 4px ${color}08`,
            }}
          >
            {Icon
              ? <Icon size={20} strokeWidth={1.8} style={{ color }} />
              : <span className="text-xl leading-none">{emoji}</span>
            }
          </div>
        )}

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-[1.5rem] font-bold tracking-tight leading-tight">
              {title}
            </h1>
            {badge && (
              <span
                className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}
              >
                {badge}
              </span>
            )}
          </div>
          <p className="mt-1 text-[13.5px] leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
            {description}
          </p>
        </div>
      </div>

      {children && (
        <div className="flex items-center gap-2 flex-wrap flex-shrink-0 mt-1">
          {children}
        </div>
      )}
    </div>
  )
}

// ── View mode toggle — used on most section pages ─────────────
interface ViewToggleProps {
  views: { id: string; label: string }[]
  active: string
  onChange: (id: string) => void
  color?: string
}

export function ViewToggle({ views, active, onChange, color = '#6366f1' }: ViewToggleProps) {
  return (
    <div
      className="flex items-center gap-0.5 p-1 rounded-[var(--radius-md)]"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)' }}
    >
      {views.map((v) => (
        <button
          key={v.id}
          onClick={() => onChange(v.id)}
          className="px-3 py-1.5 rounded-[var(--radius-sm)] text-[12.5px] font-medium transition-all"
          style={
            active === v.id
              ? { background: `${color}1a`, color }
              : { color: 'var(--text-tertiary)' }
          }
          onMouseEnter={(e) => {
            if (active !== v.id) {
              e.currentTarget.style.color = 'var(--text-secondary)'
            }
          }}
          onMouseLeave={(e) => {
            if (active !== v.id) {
              e.currentTarget.style.color = 'var(--text-tertiary)'
            }
          }}
        >
          {v.label}
        </button>
      ))}
    </div>
  )
}
