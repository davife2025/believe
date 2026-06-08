'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Brain, Bot, Blocks, Shield,
  Hammer, Trophy, Bookmark, FileText,
  Menu, X, Circle, PlusCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { SearchTrigger } from '@/components/personal/GlobalSearch'

const MAIN_NAV = [
  { href: '/',                       label: 'Dashboard',     Icon: LayoutDashboard, color: '#6366f1' },
  { href: '/ai-ml',                  label: 'AI & ML',       Icon: Brain,           color: '#8b5cf6' },
  { href: '/ai-agents',              label: 'AI Agents',     Icon: Bot,             color: '#a855f7' },
  { href: '/blockchain',             label: 'Blockchain',    Icon: Blocks,          color: '#f59e0b' },
  { href: '/blockchain-security',    label: 'Security',      Icon: Shield,          color: '#ef4444' },
  { href: '/building-apps',          label: 'Build Apps',    Icon: Hammer,          color: '#10b981' },
  { href: '/opportunities',          label: 'Opportunities', Icon: Trophy,          color: '#f97316' },
]

const PERSONAL_NAV = [
  { href: '/personal/bookmarks', label: 'Bookmarks', Icon: Bookmark,    color: '#6366f1' },
  { href: '/personal/notes',     label: 'Notes',     Icon: FileText,    color: '#6366f1' },
  { href: '/submit',             label: 'Submit Resource', Icon: PlusCircle, color: '#10b981' },
]

function SidebarContent({ onNavClick }: { onNavClick?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Brand */}
      <div className="px-4 pt-5 pb-4 border-b border-[var(--border-subtle)]">
        <Link href="/" className="flex items-center gap-3 mb-4 group" onClick={onNavClick}>
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)' }}
          >
            <span className="text-white font-bold text-sm tracking-tight z-10">B</span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <p className="text-sm font-bold text-white tracking-tight leading-none">Believe</p>
            <p className="text-[10.5px] text-[var(--text-disabled)] mt-0.5 leading-none">
              Open Learning Platform
            </p>
          </div>
        </Link>
        <SearchTrigger />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto space-y-0.5">
        <p className="section-label px-2 mt-1 mb-2">Platform</p>

        {MAIN_NAV.map(({ href, label, Icon, color }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link key={href} href={href} onClick={onNavClick}
              className={cn('nav-item group', isActive && 'active')}>
              <div className="nav-icon" style={isActive ? { color } : {}}>
                <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} />
              </div>
              <span className="flex-1 truncate text-[13.5px]">{label}</span>
              {isActive && <Circle size={5} fill={color} color={color} className="flex-shrink-0 opacity-70" />}
            </Link>
          )
        })}

        <div className="pt-3">
          <p className="section-label px-2 mb-2">Personal</p>
          {PERSONAL_NAV.map(({ href, label, Icon, color }) => {
            const isActive = pathname.startsWith(href)
            return (
              <Link key={href} href={href} onClick={onNavClick}
                className={cn('nav-item', isActive && 'active')}>
                <div className="nav-icon" style={isActive ? { color } : {}}>
                  <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} />
                </div>
                <span className="flex-1 truncate text-[13.5px]">{label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-[var(--border-subtle)]">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            Y
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12.5px] font-medium truncate" style={{ color: 'var(--text-secondary)' }}>You</p>
            <p className="text-[10.5px]" style={{ color: 'var(--text-disabled)' }}>Personal workspace</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
        </div>
      </div>
    </div>
  )
}

function MobileHeader({ onOpen }: { onOpen: () => void }) {
  const pathname = usePathname()
  const current  = [...MAIN_NAV, ...PERSONAL_NAV].find((n) =>
    n.href === '/' ? pathname === '/' : pathname.startsWith(n.href)
  )
  return (
    <header
      className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 flex items-center gap-3 px-4 border-b border-[var(--border-subtle)]"
      style={{ background: 'var(--surface-raised)', backdropFilter: 'blur(12px)' }}
    >
      <button onClick={onOpen}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-white/6 transition-all">
        <Menu size={18} />
      </button>
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
          <span className="text-white font-bold text-[10px]">B</span>
        </div>
        <p className="text-[13.5px] font-semibold truncate" style={{ color: 'var(--text-secondary)' }}>
          {current?.label ?? 'Believe'}
        </p>
      </div>
      <Link href="/submit"
        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-white/6">
        <PlusCircle size={16} />
      </Link>
    </header>
  )
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setMobileOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <MobileHeader onOpen={() => setMobileOpen(true)} />

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/65 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)} />
      )}

      <aside
        className={cn(
          'lg:hidden fixed top-0 left-0 h-screen w-72 z-50 border-r border-[var(--border-subtle)]',
          'transform transition-transform duration-300 ease-in-out',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        style={{ background: 'var(--surface-raised)' }}
      >
        <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              <span className="text-white font-bold text-xs">B</span>
            </div>
            <p className="text-sm font-bold text-white">Believe</p>
          </div>
          <button onClick={() => setMobileOpen(false)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-white/6 transition-all">
            <X size={15} />
          </button>
        </div>
        <SidebarContent onNavClick={() => setMobileOpen(false)} />
      </aside>

      <aside
        className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col border-r border-[var(--border-subtle)] z-50"
        style={{ background: 'var(--surface-raised)' }}
      >
        <SidebarContent />
      </aside>
    </>
  )
}
