'use client'

import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Types ─────────────────────────────────────────────────────
type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
  id:       string
  type:     ToastType
  title:    string
  message?: string
  duration: number
}

interface ToastContextValue {
  toasts:  Toast[]
  toast:   (opts: Omit<Toast, 'id'>) => void
  success: (title: string, message?: string) => void
  error:   (title: string, message?: string) => void
  info:    (title: string, message?: string) => void
  warning: (title: string, message?: string) => void
  dismiss: (id: string) => void
}

// ── Context ───────────────────────────────────────────────────
const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx
}

// ── Icon per type ─────────────────────────────────────────────
const ICONS: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />,
  error:   <AlertCircle  size={16} className="text-red-400 flex-shrink-0" />,
  info:    <Info         size={16} className="text-indigo-400 flex-shrink-0" />,
  warning: <AlertTriangle size={16} className="text-amber-400 flex-shrink-0" />,
}

const BORDER_COLORS: Record<ToastType, string> = {
  success: 'border-emerald-500/25',
  error:   'border-red-500/25',
  info:    'border-indigo-500/25',
  warning: 'border-amber-500/25',
}

// ── Single Toast Item ─────────────────────────────────────────
function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLeaving(true)
      setTimeout(onDismiss, 200)
    }, toast.duration)
    return () => clearTimeout(timer)
  }, [toast.duration, onDismiss])

  return (
    <div
      className={cn(
        'toast',
        BORDER_COLORS[toast.type],
        leaving ? 'opacity-0 translate-y-[-4px] transition-all duration-200' : 'animate-slide-down'
      )}
    >
      {ICONS[toast.type]}
      <div className="flex-1 min-w-0">
        <p className="text-[13.5px] font-semibold text-white/85 leading-tight">{toast.title}</p>
        {toast.message && (
          <p className="text-[12px] text-white/45 mt-0.5 leading-snug">{toast.message}</p>
        )}
      </div>
      <button
        onClick={() => { setLeaving(true); setTimeout(onDismiss, 200) }}
        className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-white/25 hover:text-white/60 hover:bg-white/5 transition-all"
      >
        <X size={12} />
      </button>
    </div>
  )
}

// ── Toast Container ───────────────────────────────────────────
function ToastContainer({ toasts, dismiss }: { toasts: Toast[]; dismiss: (id: string) => void }) {
  if (!toasts.length) return null

  return (
    <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <ToastItem toast={t} onDismiss={() => dismiss(t.id)} />
        </div>
      ))}
    </div>
  )
}

// ── Provider ──────────────────────────────────────────────────
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback((opts: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random()}`
    setToasts((prev) => [...prev.slice(-4), { ...opts, id }]) // max 5 at once
  }, [])

  const success = useCallback((title: string, message?: string) =>
    toast({ type: 'success', title, message, duration: 3500 }), [toast])

  const error = useCallback((title: string, message?: string) =>
    toast({ type: 'error', title, message, duration: 5000 }), [toast])

  const info = useCallback((title: string, message?: string) =>
    toast({ type: 'info', title, message, duration: 3500 }), [toast])

  const warning = useCallback((title: string, message?: string) =>
    toast({ type: 'warning', title, message, duration: 4000 }), [toast])

  return (
    <ToastContext.Provider value={{ toasts, toast, success, error, info, warning, dismiss }}>
      {children}
      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  )
}
