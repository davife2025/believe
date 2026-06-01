// ============================================================
// src/components/ui/Badge.tsx
// ============================================================
'use client'

import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'outline' | 'solid'
}

export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border',
        variant === 'default' && 'bg-white/5 text-white/50 border-white/10',
        variant === 'outline' && 'bg-transparent text-white/60 border-white/15',
        variant === 'solid'   && 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
        className
      )}
    >
      {children}
    </span>
  )
}
