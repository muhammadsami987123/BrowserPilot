'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Sidebar } from '@/components/layout/Sidebar'
import { StatusBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Task } from '@/types'

function timeAgo(dateStr: string) {
  const d = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(d / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div className={`text-3xl font-bold mb-1 ${color}`}>{value}</div>
      <div className="text-xs font-medium text-gray-500">{label}</div>
    </div>
  )
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/tasks').then(r => r.json()).then(d => { setTasks(d.tasks ?? []); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const stats = {
    total:     tasks.length,
    completed: tasks.filter(t => t.status === 'COMPLETED').length,
    running:   tasks.filter(t => t.status === 'RUNNING').length,
    failed:    tasks.filter(t => t.status === 'FAILED').length,
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-56">
        <main className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Overview of your automation workspace</p>
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

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Tasks" value={stats.total} color="text-gray-900" />
            <StatCard label="Completed" value={stats.completed} color="text-green-600" />
            <StatCard label="Running" value={stats.running} color="text-blue-600" />
            <StatCard label="Failed" value={stats.failed} color="text-red-600" />
          </div>

          {/* Recent Tasks */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-sm font-semibold text-gray-900">Recent Tasks</h2>
              <Link href="/tasks" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                View all →
              </Link>
            </div>

            {loading ? (
              <div className="divide-y divide-gray-100">
                {[0,1,2,3].map(i => (
                  <div key={i} className="px-6 py-4 flex items-center gap-4">
                    <div className="flex-1 h-4 bg-gray-100 animate-pulse rounded" />
                    <div className="w-20 h-4 bg-gray-100 animate-pulse rounded" />
                  </div>
                ))}
              </div>
            ) : tasks.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">No tasks yet</h3>
                <p className="text-xs text-gray-500 mb-5">Create your first browser automation task to get started.</p>
                <Link href="/tasks/new"><Button variant="primary" size="sm">Create First Task</Button></Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {tasks.slice(0, 6).map(task => (
                  <div key={task.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50 transition-colors group">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 truncate">{task.description}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{timeAgo(task.createdAt)}</p>
                    </div>
                    <StatusBadge status={task.status} />
                    <Link href={`/workspace/${task.id}`}>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        View →
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
