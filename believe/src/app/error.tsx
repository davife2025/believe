'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[Believe Error]', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-2xl">
        ⚠️
      </div>
      <div>
        <h2 className="text-base font-semibold text-white/80">Something went wrong</h2>
        <p className="text-sm text-white/35 mt-1 max-w-sm">
          {error.message || 'An unexpected error occurred. Try refreshing the page.'}
        </p>
        {error.digest && (
          <p className="text-[10px] text-white/20 font-mono mt-1">ID: {error.digest}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-indigo-500/20 text-indigo-400 text-sm font-medium hover:bg-indigo-500/30 transition-all"
        >
          Try again
        </button>
        <a
          href="/"
          className="px-4 py-2 rounded-lg bg-white/5 text-white/50 text-sm font-medium hover:bg-white/10 transition-all"
        >
          Go home
        </a>
      </div>
    </div>
  )
}
