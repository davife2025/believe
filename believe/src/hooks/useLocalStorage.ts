// ============================================================
// SSR-safe localStorage hook — use this in all components
// src/hooks/useLocalStorage.ts
// ============================================================
'use client'

import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const item = localStorage.getItem(key)
      if (item) setValue(JSON.parse(item))
    } catch {
      // ignore
    }
  }, [key])

  const set = (newValue: T) => {
    setValue(newValue)
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(newValue))
      } catch {
        // ignore
      }
    }
  }

  return [value, set, mounted] as const
}
