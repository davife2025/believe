import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number        // 0-100
  className?: string
  color?: string
  showLabel?: boolean
}

export function ProgressBar({ value, className, color, showLabel = false }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="progress-bar flex-1">
        <div
          className="progress-bar-fill"
          style={{
            width: `${clamped}%`,
            background: color
              ? `${color}`
              : 'linear-gradient(90deg, #6366f1, #8b5cf6)',
          }}
        />
      </div>
      {showLabel && (
        <span className="text-[11px] text-white/40 w-7 text-right flex-shrink-0">
          {clamped}%
        </span>
      )}
    </div>
  )
}
