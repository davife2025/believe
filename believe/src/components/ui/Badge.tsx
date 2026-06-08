'use client'

import { cn } from '@/lib/utils'

// ── Badge ─────────────────────────────────────────────────────
interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'brand'
  size?: 'sm' | 'md'
}

export function Badge({
  children,
  className,
  variant = 'default',
  size = 'md',
}: BadgeProps) {
  const variants = {
    default: 'badge',
    success: 'badge badge-success',
    warning: 'badge badge-medium',
    error:   'badge badge-high',
    info:    'badge bg-sky-500/10 text-sky-400 border-sky-500/20',
    brand:   'badge bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  }

  return (
    <span
      className={cn(
        variants[variant],
        size === 'sm' && 'text-[10.5px] px-1.5 py-0.5',
        className
      )}
    >
      {children}
    </span>
  )
}

// ── Button ────────────────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

export function Button({
  variant = 'secondary',
  size = 'md',
  loading,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        loading && 'opacity-60 cursor-wait',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="w-3.5 h-3.5 border-2 border-current/30 border-t-current rounded-full animate-spin flex-shrink-0" />
      ) : null}
      {children}
    </button>
  )
}
