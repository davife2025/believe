'use client'

import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value:      number
  className?: string
  color?:     string
  showLabel?: boolean
  height?:    'xs' | 'sm' | 'md'
}

const HEIGHTS = { xs: 'h-[2px]', sm: 'h-[3px]', md: 'h-1.5' }

export function ProgressBar({
  value,
  className,
  color,
  showLabel = false,
  height = 'sm',
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div
        className={cn('flex-1 rounded-full overflow-hidden', HEIGHTS[height])}
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${clamped}%`,
            background: color ?? 'linear-gradient(90deg, #6366f1, #8b5cf6)',
          }}
        />
      </div>
      {showLabel && (
        <span
          className="text-[11px] font-medium w-8 text-right flex-shrink-0"
          style={{ color: 'var(--text-disabled)' }}
        >
          {clamped}%
        </span>
      )}
    </div>
  )
}
