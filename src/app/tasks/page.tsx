'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Sidebar } from '@/components/layout/Sidebar'
import { StatusBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Task, TaskStatus } from '@/types'

type Filter = 'ALL' | TaskStatus

const filters: { label: string; value: Filter }[] = [
  { label: 'All',       value: 'ALL' },
  { label: 'Running',   value: 'RUNNING' },
  { label: 'Completed', value: 'COMPLETED' },
  { label: 'Failed',    value: 'FAILED' },
  { label: 'Pending',   value: 'PENDING' },
]

function timeAgo(dateStr: string) {
  const d = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(d / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<Filter>('ALL')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/tasks').then(r => r.json()).then(d => { setTasks(d.tasks ?? []); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const filtered = filter === 'ALL' ? tasks : tasks.filter(t => t.status === filter)

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-56">
        <main className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Task History</h1>
              <p className="text-sm text-gray-500 mt-1">{tasks.length} task{tasks.length !== 1 ? 's' : ''} total</p>
            </div>
            <Link href="/tasks/new">
              <Button variant="primary" size="md">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Task
              </Button>
            </Link>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
            {filters.map(f => (
              <button key={f.value} onClick={() => setFilter(f.value)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  filter === f.value ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}>
                {f.label}
                {f.value !== 'ALL' && (
                  <span className={`ml-1.5 tabular-nums ${filter === f.value ? 'text-gray-500' : 'text-gray-400'}`}>
                    {tasks.filter(t => t.status === f.value).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            {loading ? (
              <div className="divide-y divide-gray-100">
                {[0,1,2,3,4].map(i => (
                  <div key={i} className="px-6 py-4 flex items-center gap-4">
                    <div className="flex-1 h-4 bg-gray-100 animate-pulse rounded" />
                    <div className="w-16 h-4 bg-gray-100 animate-pulse rounded" />
                    <div className="w-20 h-4 bg-gray-100 animate-pulse rounded" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-sm text-gray-500 mb-2">No {filter !== 'ALL' ? filter.toLowerCase() + ' ' : ''}tasks found.</p>
                {filter === 'ALL' && (
                  <Link href="/tasks/new"><Button variant="primary" size="sm" className="mt-3">Create First Task</Button></Link>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-6 py-2.5 border-b border-gray-200 bg-gray-50">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Task</span>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</span>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Created</span>
                  <span />
                </div>
                <div className="divide-y divide-gray-100">
                  {filtered.map(task => (
                    <div key={task.id} className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-6 py-3.5 hover:bg-gray-50 transition-colors group">
                      <div className="min-w-0">
                        <p className="text-sm text-gray-900 truncate">{task.description}</p>
                        {task.startingUrl && (
                          <p className="text-xs text-gray-400 font-mono truncate mt-0.5">{task.startingUrl}</p>
                        )}
                      </div>
                      <StatusBadge status={task.status} />
                      <span className="text-xs text-gray-400 whitespace-nowrap">{timeAgo(task.createdAt)}</span>
                      <Link href={`/workspace/${task.id}`}>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Open →
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
