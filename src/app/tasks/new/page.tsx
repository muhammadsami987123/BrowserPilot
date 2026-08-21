'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/layout/Sidebar'
import { Button } from '@/components/ui/Button'
import type { OutputFormat } from '@/types'

const TEMPLATES = [
  { label: 'GitHub Stars',        text: 'Find the top 5 AI agent frameworks and compare their GitHub stars, language, and description.' },
  { label: 'Price Research',      text: 'Research the pricing plans of the top 3 project management tools and create a comparison table.' },
  { label: 'News Summary',        text: 'Find the top 5 AI news stories from today and summarize each in 2 sentences.' },
  { label: 'Tech Stack Discovery',text: 'Find what technology stack the top 5 YC companies from the latest batch are using.' },
  { label: 'Competitor Analysis', text: 'Compare the features of the top 3 CRM tools: HubSpot, Salesforce, and Pipedrive.' },
  { label: 'Job Market Research', text: 'Find the top 10 most in-demand AI engineering skills from job postings on LinkedIn today.' },
]

export default function NewTaskPage() {
  const router = useRouter()
  const [description, setDescription] = useState('')
  const [startingUrl, setStartingUrl] = useState('')
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('TABLE')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (description.trim().length < 10) { setError('Description must be at least 10 characters.'); return }
    setError(null)
    setSubmitting(true)
    try {
      const createRes = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: description.trim(), startingUrl: startingUrl.trim() || undefined, outputFormat }),
      })
      if (!createRes.ok) { const e = await createRes.json(); throw new Error(e.error ?? 'Failed to create task') }
      const { task } = await createRes.json()
      await fetch(`/api/tasks/${task.id}/start`, { method: 'POST' })
      router.push(`/workspace/${task.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-56">
        <main className="p-8">
          <div className="max-w-2xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">New Task</h1>
              <p className="text-sm text-gray-500 mt-1">Describe what you want the agent to do in plain language.</p>
            </div>

            {/* Templates */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Templates</p>
              <div className="flex flex-wrap gap-2">
                {TEMPLATES.map(t => (
                  <button key={t.label} type="button" onClick={() => setDescription(t.text)}
                    className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50 transition-colors shadow-sm">
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-5">
              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Task Description <span className="text-red-500">*</span>
                </label>
                <textarea value={description} onChange={e => setDescription(e.target.value)}
                  placeholder="e.g. Find the top 5 AI agent frameworks and compare their GitHub stars, language, and last commit date."
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-colors resize-none"
                  required />
                <div className="flex justify-between mt-1.5">
                  <span className="text-xs text-gray-400">Minimum 10 characters</span>
                  <span className={`text-xs tabular-nums ${description.length > 900 ? 'text-red-500' : 'text-gray-400'}`}>{description.length}/1000</span>
                </div>
              </div>

              {/* Starting URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Starting URL <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <input type="url" value={startingUrl} onChange={e => setStartingUrl(e.target.value)}
                    placeholder="https://github.com"
                    className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 font-mono focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-colors" />
                </div>
                <p className="text-xs text-gray-400 mt-1.5">Where should the agent start browsing?</p>
              </div>

              {/* Output Format */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Output Format</label>
                <div className="flex gap-2">
                  {(['TABLE', 'JSON', 'SUMMARY'] as OutputFormat[]).map(fmt => (
                    <button key={fmt} type="button" onClick={() => setOutputFormat(fmt)}
                      className={`flex-1 py-2.5 text-xs font-semibold rounded-lg border transition-colors ${
                        outputFormat === fmt
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 bg-white'
                      }`}>
                      {fmt.charAt(0) + fmt.slice(1).toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              {/* Submit */}
              <div className="flex items-center gap-3 pt-1">
                <Button type="submit" variant="primary" size="lg" loading={submitting} className="flex-1 sm:flex-none sm:px-10">
                  {submitting ? 'Starting Task\u2026' : 'Start Task'}
                </Button>
                <Button type="button" variant="ghost" size="lg" onClick={() => router.back()}>Cancel</Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
