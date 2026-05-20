'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS } from '@/lib/utils'
import { SearchTrigger } from '@/components/personal/GlobalSearch'

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 flex flex-col border-r border-white/[0.06] bg-[#0d0d14] z-50">

      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm font-bold shadow-lg shadow-indigo-500/20">
            B
          </div>
          <div>
            <p className="text-sm font-semibold text-white tracking-wide">Believe</p>
            <p className="text-[11px] text-white/30">Knowledge Platform</p>
          </div>
        </div>
        {/* Search in sidebar */}
        <SearchTrigger />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/20">
          Sections
        </p>
        {NAV_ITEMS.map((item) => {
          const isActive = item.href === '/'
            ? pathname === '/'
            : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <span
                className="w-6 h-6 rounded-md flex items-center justify-center text-sm flex-shrink-0"
                style={{ background: isActive ? `${item.color}22` : 'transparent' }}
              >
                {item.icon}
              </span>
              <span className="flex-1 truncate">{item.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
              )}
            </Link>
          )
        })}

        {/* Personal section */}
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
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-bold">
            Y
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white/70 truncate">You</p>
            <p className="text-[10px] text-white/30">Personal Workspace</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" title="Active" />
        </div>
      </div>
    </aside>
  )
}
