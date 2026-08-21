'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/tasks', label: 'History' },
  { href: '/tasks/new', label: 'New Task' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-zinc-800/60 bg-zinc-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-semibold text-zinc-100 shrink-0">
            <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
              </svg>
            </div>
            <span className="tracking-tight hidden sm:block">BrowserPilot</span>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href) && link.href !== '/tasks/new')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                    isActive
                      ? 'bg-zinc-800 text-zinc-100'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* CTA */}
          <Link
            href="/tasks/new"
            className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-md font-medium transition-colors"
          >
            + New Task
          </Link>
        </div>
      </div>
    </nav>
  )
}
