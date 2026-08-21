'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Sidebar } from '@/components/layout/Sidebar'
import { StatusBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Task, ExecutionEvent, ToolCall, Screenshot, Result } from '@/types'

function timeAgo(d: string) {
  const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000)
  if (s < 60) return `${s}s ago`
  return `${Math.floor(s / 60)}m ago`
}
function fmtMs(ms: number | null | undefined) {
  if (!ms) return null
  return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`
}

const EVENT_ICONS: Record<string, string> = {
  BROWSER_LAUNCHED: '🚀', NAVIGATING: '🌐', PAGE_LOADED: '✓',
  SEARCHING: '🔍', ELEMENT_FOUND: '📌', CLICKING: '👆', FILLING: '✍️',
  EXTRACTING: '📤', SCREENSHOT_CAPTURED: '📸', PROCESSING: '⚙️',
  COMPLETED: '✓', FAILED: '✕',
}
// Note: only COMPLETED and FAILED use text symbols; others use emoji for quick recognition
// Replace emoji-only icons with SVG alternatives in a future refactor

function BrowserPreview({ screenshots, currentUrl }: { screenshots: Screenshot[]; currentUrl: string }) {
  const [sel, setSel] = useState<number | null>(null)
  const latest = sel !== null ? screenshots[sel] : screenshots[screenshots.length - 1]
  return (
    <div className="flex flex-col h-full">
      {/* Address bar */}
      <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 border-b border-gray-200">
        <div className="flex gap-1">
          {[0,1].map(i => (
            <div key={i} className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors cursor-default">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={i === 0 ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
              </svg>
            </div>
          ))}
        </div>
        <div className="flex-1 flex items-center gap-2 bg-white border border-gray-300 rounded-md px-2.5 py-1 text-xs font-mono text-gray-600 truncate">
          <svg className="w-3 h-3 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span className="truncate">{currentUrl || 'about:blank'}</span>
        </div>
        <span className="text-xs text-gray-400 shrink-0">{screenshots.length} shots</span>
      </div>
      {/* Screenshot */}
      <div className="flex-1 bg-gray-100 flex items-center justify-center relative overflow-hidden">
        {latest ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`/${latest.filePath}`} alt={latest.action ?? 'Screenshot'} className="w-full h-full object-contain"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
        ) : (
          <div className="text-center text-gray-400 p-8">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
            </svg>
            <p className="text-sm">Browser preview will appear here</p>
            <p className="text-xs text-gray-300 mt-1">Screenshots are captured during execution</p>
          </div>
        )}
        {latest?.action && (
          <div className="absolute bottom-3 left-3 right-3 bg-white/90 border border-gray-200 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-mono text-gray-600 truncate shadow-sm">
            {latest.action}{latest.url && <span className="text-gray-400 ml-2">{latest.url}</span>}
          </div>
        )}
      </div>
      {/* Thumbnail strip */}
      {screenshots.length > 1 && (
        <div className="flex gap-1.5 p-2 border-t border-gray-200 overflow-x-auto bg-gray-50">
          {screenshots.map((s, i) => (
            <button key={s.id} onClick={() => setSel(i === screenshots.length - 1 && sel === null ? null : i)}
              className={`w-14 h-9 rounded-md border shrink-0 overflow-hidden transition-all ${
                (sel === i || (sel === null && i === screenshots.length - 1))
                  ? 'border-indigo-500 shadow-sm' : 'border-gray-200 hover:border-gray-400'
              }`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/${s.filePath}`} alt="" className="w-full h-full object-cover" onError={() => {}} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ActivityFeed({ events }: { events: ExecutionEvent[] }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { ref.current?.scrollIntoView({ behavior: 'smooth' }) }, [events.length])
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-600">Agent Activity</span>
        <span className="text-xs text-gray-400 tabular-nums">{events.length} events</span>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center text-gray-400">
            <span className="w-2 h-2 rounded-full bg-blue-400 status-running mb-3" />
            <span className="text-xs">Waiting for agent to start&hellip;</span>
          </div>
        ) : events.map(ev => (
          <div key={ev.id} className={`flex items-start gap-2.5 px-2.5 py-2 rounded-lg text-xs animate-slide-in ${
            ev.type === 'FAILED' ? 'bg-red-50 border border-red-200' :
            ev.status === 'RUNNING' ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
          }`}>
            <span className={`shrink-0 mt-0.5 w-4 text-center font-mono ${
              ev.type === 'COMPLETED' ? 'text-green-600' : ev.type === 'FAILED' ? 'text-red-600' : 'text-gray-400'
            }`}>{EVENT_ICONS[ev.type] ?? '·'}</span>
            <div className="flex-1 min-w-0">
              <span className={ev.type === 'FAILED' ? 'text-red-700' : ev.status === 'RUNNING' ? 'text-blue-700 font-medium' : 'text-gray-700'}>
                {ev.message}
              </span>
              {ev.url && <div className="text-gray-400 font-mono text-[10px] truncate mt-0.5">{ev.url}</div>}
            </div>
            <span className="text-gray-400 text-[10px] whitespace-nowrap tabular-nums shrink-0">
              {fmtMs(ev.duration) ?? timeAgo(ev.timestamp)}
            </span>
          </div>
        ))}
        <div ref={ref} />
      </div>
    </div>
  )
}

function ToolCallLog({ toolCalls }: { toolCalls: ToolCall[] }) {
  const [exp, setExp] = useState<string | null>(null)
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-600">Tool Calls</span>
        <span className="text-xs text-gray-400 tabular-nums">{toolCalls.length}</span>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {toolCalls.length === 0 ? (
          <div className="text-center text-gray-400 text-xs py-6">No tool calls yet</div>
        ) : toolCalls.map(tc => (
          <div key={tc.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
            <button onClick={() => setExp(exp === tc.id ? null : tc.id)}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-gray-50 transition-colors">
              <span className={`w-2 h-2 rounded-full shrink-0 ${
                tc.status === 'COMPLETED' ? 'bg-green-500' : tc.status === 'FAILED' ? 'bg-red-500' : 'bg-blue-400 status-running'
              }`} />
              <span className="text-xs font-mono font-semibold text-indigo-600 shrink-0">{tc.tool}</span>
              <span className="text-xs text-gray-500 flex-1 truncate">{tc.input.slice(0, 50)}</span>
              {tc.duration != null && <span className="text-[10px] text-gray-400 shrink-0 tabular-nums">{fmtMs(tc.duration)}</span>}
              <svg className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform ${exp === tc.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {exp === tc.id && (
              <div className="px-3 pb-3 pt-1 border-t border-gray-100 font-mono text-[10px] space-y-1.5 bg-gray-50">
                <div><span className="text-gray-500">input: </span><span className="text-gray-700">{tc.input}</span></div>
                {tc.result && <div><span className="text-gray-500">result: </span><span className="text-green-700">{tc.result}</span></div>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ResultsPanel({ result }: { result: Result }) {
  let rows: Record<string, string>[] = []
  try { const p = JSON.parse(result.structuredData ?? '[]'); rows = Array.isArray(p) ? p : [] } catch { rows = [] }
  let sources: string[] = []
  try { sources = JSON.parse(result.sources ?? '[]') } catch { sources = [] }
  return (
    <div className="border-t border-gray-200 bg-white">
      <div className="px-6 py-3.5 border-b border-gray-200 flex items-center justify-between bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-900">Results</h3>
        <span className="text-xs text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-full">{result.format}</span>
      </div>
      {result.summary && (
        <div className="px-6 py-3.5 text-sm text-gray-600 border-b border-gray-100 leading-relaxed">{result.summary}</div>
      )}
      {rows.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>{Object.keys(rows[0]).map(k => (
                <th key={k} className="px-6 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{k}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  {Object.values(row).map((val, j) => (
                    <td key={j} className="px-6 py-3 text-sm text-gray-700">{String(val)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {sources.length > 0 && (
        <div className="px-6 py-3 border-t border-gray-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-gray-500">Sources:</span>
          {sources.map((s, i) => (
            <a key={i} href={s} target="_blank" rel="noopener noreferrer"
              className="text-xs text-indigo-600 hover:text-indigo-700 font-mono transition-colors">{s}</a>
          ))}
        </div>
      )}
    </div>
  )
}

interface WData { task: Task | null; events: ExecutionEvent[]; toolCalls: ToolCall[]; screenshots: Screenshot[]; result: Result | null; currentUrl: string }

export default function WorkspacePage() {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<WData>({ task: null, events: [], toolCalls: [], screenshots: [], result: null, currentUrl: '' })
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState(false)
  const pollerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const fetch_ = useCallback(async () => {
    try {
      const [tR, eR, tcR, sR, rR] = await Promise.all([
        fetch(`/api/tasks/${id}`), fetch(`/api/tasks/${id}/events`),
        fetch(`/api/tasks/${id}/tool-calls`), fetch(`/api/tasks/${id}/screenshots`),
        fetch(`/api/tasks/${id}/result`),
      ])
      const [tD, eD, tcD, sD, rD] = await Promise.all([tR.json(), eR.json(), tcR.json(), sR.json(), rR.json()])
      const events: ExecutionEvent[] = eD.events ?? []
      const currentUrl = [...events].reverse().find(e => e.url)?.url ?? ''
      setData({ task: tD.task ?? null, events, toolCalls: tcD.toolCalls ?? [], screenshots: sD.screenshots ?? [], result: rD.result ?? null, currentUrl })
      setLoading(false)
      if (['COMPLETED','FAILED','CANCELLED'].includes(tD.task?.status ?? '')) {
        if (pollerRef.current) { clearInterval(pollerRef.current); pollerRef.current = null }
      }
    } catch { setLoading(false) }
  }, [id])

  useEffect(() => {
    fetch_()
    pollerRef.current = setInterval(fetch_, 2000)
    return () => { if (pollerRef.current) clearInterval(pollerRef.current) }
  }, [fetch_])

  async function cancel() {
    setCancelling(true)
    await fetch(`/api/tasks/${id}/cancel`, { method: 'POST' }).finally(() => setCancelling(false))
    fetch_()
  }

  const isRunning = data.task?.status === 'RUNNING'
  const isPending = data.task?.status === 'PENDING'

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 ml-56 flex flex-col min-h-screen">

        {/* Task header */}
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-3 flex items-center gap-3 shrink-0">
          <Link href="/tasks" className="text-gray-400 hover:text-gray-600 transition-colors shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="flex-1 min-w-0">
            {loading
              ? <div className="h-4 w-64 skeleton rounded" />
              : <p className="text-sm font-medium text-gray-900 truncate">{data.task?.description ?? 'Loading\u2026'}</p>
            }
          </div>
          {data.task && <StatusBadge status={data.task.status} />}
          {isRunning && <Button variant="danger" size="sm" loading={cancelling} onClick={cancel}>Cancel</Button>}
          {isPending && (
            <Button variant="primary" size="sm" onClick={async () => {
              await fetch(`/api/tasks/${id}/start`, { method: 'POST' }); fetch_()
            }}>Start Task</Button>
          )}
        </div>

        {/* Main grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 divide-x divide-gray-200 overflow-hidden min-h-0">
          {/* Browser preview */}
          <div className="lg:col-span-3 flex flex-col overflow-hidden border-b lg:border-b-0 border-gray-200" style={{ minHeight: '55vh' }}>
            <BrowserPreview screenshots={data.screenshots} currentUrl={data.currentUrl} />
          </div>
          {/* Right panels */}
          <div className="lg:col-span-2 flex flex-col overflow-hidden" style={{ minHeight: '45vh' }}>
            <div className="flex-1 overflow-hidden border-b border-gray-200 min-h-0">
              <ActivityFeed events={data.events} />
            </div>
            <div className="h-52 shrink-0 overflow-hidden min-h-0">
              <ToolCallLog toolCalls={data.toolCalls} />
            </div>
          </div>
        </div>

        {/* Results */}
        {data.result && <ResultsPanel result={data.result} />}
      </div>
    </div>
  )
}
