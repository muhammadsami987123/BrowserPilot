'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

const nav = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: '/tasks',
    label: 'Tasks',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    href: '/tasks/new',
    label: 'New Task',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <aside className="fixed left-0 top-0 h-full w-56 bg-gray-50 border-r border-gray-200 flex flex-col z-40">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-700 transition-colors">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
            </svg>
          </div>
          <span className="font-semibold text-gray-900 text-sm tracking-tight">BrowserPilot</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        {nav.map((item) => {
          const isActive =
            item.href === '/tasks/new'
              ? pathname === item.href
              : pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href) && item.href !== '/tasks/new')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? 'bg-white text-gray-900 font-medium shadow-sm border border-gray-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/70'
              }`}
            >
              <span className={isActive ? 'text-indigo-600' : 'text-gray-400'}>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200 space-y-1">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
            <span className="text-[10px] font-semibold text-indigo-700">
              {session?.user?.name?.[0]?.toUpperCase() ?? 'A'}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-gray-700 truncate">
              {session?.user?.name ?? session?.user?.email ?? 'Admin'}
            </p>
            <p className="text-[10px] text-gray-400 truncate">{session?.user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign out
        </button>
      </div>
    </aside>
  )
}
