'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS } from '@/lib/utils'
import { SearchTrigger } from '@/components/personal/GlobalSearch'

// ── Desktop Sidebar ───────────────────────────────────────────
function SidebarContent({ onNavClick }: { onNavClick?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm font-bold shadow-lg shadow-indigo-500/20 flex-shrink-0">
            B
          </div>
          <div>
            <p className="text-sm font-semibold text-white tracking-wide">Believe</p>
            <p className="text-[11px] text-white/30">Knowledge Platform</p>
          </div>
        </div>
        <SearchTrigger />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-0.5">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/20">
          Sections
        </p>
        {NAV_ITEMS.map((item) => {
          const isActive = item.href === '/'
            ? pathname === '/'
            : pathname.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href}
              onClick={onNavClick}
              className={`nav-item ${isActive ? 'active' : ''}`}>
              <span className="w-6 h-6 rounded-md flex items-center justify-center text-sm flex-shrink-0"
                style={{ background: isActive ? `${item.color}22` : 'transparent' }}>
                {item.icon}
              </span>
              <span className="flex-1 truncate">{item.label}</span>
              {isActive && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />}
            </Link>
          )
        })}

        <div className="pt-4">
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/20">
            Personal
          </p>
          {[
            { href: '/personal/bookmarks', label: 'Bookmarks', icon: '🔖' },
            { href: '/personal/notes',     label: 'Notes',     icon: '📝' },
          ].map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link key={item.href} href={item.href}
                onClick={onNavClick}
                className={`nav-item ${isActive ? 'active' : ''}`}>
                <span className="w-6 h-6 rounded-md flex items-center justify-center text-sm flex-shrink-0">
                  {item.icon}
                </span>
                <span className="flex-1 truncate">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
            Y
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white/70 truncate">You</p>
            <p className="text-[10px] text-white/30">Personal Workspace</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
        </div>
      </div>
    </div>
  )
}

// ── Mobile Header ─────────────────────────────────────────────
function MobileHeader({ onOpen }: { onOpen: () => void }) {
  const pathname = usePathname()
  const current = NAV_ITEMS.find((n) =>
    n.href === '/' ? pathname === '/' : pathname.startsWith(n.href)
  )

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-[#0d0d14] border-b border-white/[0.06] flex items-center gap-3 px-4">
      <button onClick={onOpen}
        className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-white/80 hover:bg-white/10 transition-all flex-shrink-0">
        ☰
      </button>
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
          B
        </div>
        <p className="text-sm font-semibold text-white/70 truncate">
          {current?.label || 'Believe'}
        </p>
      </div>
    </header>
  )
}

// ── Full Sidebar export ───────────────────────────────────────
export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  // Close on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/* Mobile header bar */}
      <MobileHeader onOpen={() => setMobileOpen(true)} />

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside className={`
        lg:hidden fixed top-0 left-0 h-screen w-72 z-50 bg-[#0d0d14] border-r border-white/[0.06]
        transform transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm font-bold">B</div>
            <p className="text-sm font-semibold text-white">Believe</p>
          </div>
          <button onClick={() => setMobileOpen(false)}
            className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white/70 transition-all">
            ✕
          </button>
        </div>
        <SidebarContent onNavClick={() => setMobileOpen(false)} />
      </aside>

      {/* Desktop sidebar — always visible */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col border-r border-white/[0.06] bg-[#0d0d14] z-50">
        <SidebarContent />
      </aside>
    </>
  )
}
