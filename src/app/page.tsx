import Link from 'next/link'

// SVG Icons
const BrowserIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
  </svg>
)
const ArrowRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
)
const CheckIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
)
const StarIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
  </svg>
)

const activityLog = [
  { done: true,    label: 'Browser launched (Chromium)' },
  { done: true,    label: 'Navigating to github.com' },
  { done: true,    label: 'Searching AI agent frameworks' },
  { done: true,    label: 'Opened LangChain repository' },
  { running: true, label: 'Extracting stars & metadata' },
  { done: false,   label: 'Processing results' },
  { done: false,   label: 'Generating comparison table' },
]

const features = [
  { title: 'Real Playwright Execution', desc: 'Actual Chromium browser running server-side. No simulation — real navigation, clicks, and extraction.' },
  { title: 'Live Agent Activity', desc: 'Every step streamed in real-time: URL visited, action taken, duration, and status at a glance.' },
  { title: 'Tool Call Transparency', desc: 'See every browser.goto, browser.click, and browser.extract call with full inputs and results.' },
  { title: 'Screenshot Evidence', desc: 'Captures page screenshots at every major step as visual proof of the agent\'s work.' },
  { title: 'Structured Results', desc: 'Returns data as sortable tables, JSON, or plain summaries — ready to copy and use.' },
  { title: 'Task History & Replay', desc: 'Full searchable history of all past runs with status, duration, and one-click replay.' },
]

const steps = [
  { n: '1', title: 'Describe', desc: 'Write what you want done in plain language. No code required.' },
  { n: '2', title: 'Plan',     desc: 'The AI plans a browser execution path step by step.' },
  { n: '3', title: 'Execute',  desc: 'Playwright opens a real browser and navigates pages.' },
  { n: '4', title: 'Extract',  desc: 'Data captured, screenshots taken, DOM inspected.' },
  { n: '5', title: 'Deliver',  desc: 'Structured results as table, JSON, or summary.' },
]

const useCases = [
  'GitHub star comparisons',
  'Pricing page research',
  'Competitive analysis',
  'Data collection',
  'QA automation',
  'News monitoring',
  'Tech stack discovery',
  'Market research',
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ── Navbar ── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-semibold text-gray-900">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
              <span className="text-white"><BrowserIcon /></span>
            </div>
            BrowserPilot
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-gray-900 transition-colors">How It Works</a>
            <a href="#use-cases" className="hover:text-gray-900 transition-colors">Use Cases</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900 transition-colors hidden sm:block">
              Sign in
            </Link>
            <Link href="/tasks/new"
              className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md font-medium transition-colors shadow-sm">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,#e0e7ff,transparent)]" />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 status-running" />
            Playwright + Claude · Open Source
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-gray-900 leading-[1.08] mb-6">
            Give AI a browser.<br />
            <span className="text-indigo-600">Let it do the work.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            BrowserPilot gives AI agents a real browser to navigate websites, extract information,
            and complete tasks automatically — with full visibility into every action.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/tasks/new"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-sm text-sm">
              Start Automating <ArrowRightIcon />
            </Link>
            <Link href="/dashboard"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors border border-gray-300 shadow-sm text-sm">
              View Dashboard
            </Link>
          </div>
          <p className="text-xs text-gray-400 mt-5">No API key required · Demo Mode included</p>
        </div>
      </section>

      {/* ── Product Preview ── */}
      <section className="px-4 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-xl shadow-gray-200/60 overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/60" />
                <div className="w-3 h-3 rounded-full bg-amber-400/60" />
                <div className="w-3 h-3 rounded-full bg-green-400/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-md px-3 py-1 text-xs font-mono text-gray-500 max-w-xs w-full">
                  <svg className="w-3 h-3 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span className="truncate">github.com/langchain-ai/langchain</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-blue-600">
                <span className="w-2 h-2 rounded-full bg-blue-500 status-running" />
                Running
              </div>
            </div>

            <div className="grid md:grid-cols-5 min-h-[360px]">
              {/* Browser pane */}
              <div className="md:col-span-3 border-r border-gray-200 p-5">
                <div className="h-full bg-gray-50 rounded-xl border border-gray-200 p-4 font-mono text-xs">
                  <div className="flex items-start gap-3 pb-3 mb-3 border-b border-gray-200">
                    <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700 shrink-0">LC</div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-900">langchain-ai / langchain</div>
                      <div className="text-xs text-gray-500 mt-0.5">Build context-aware reasoning applications</div>
                    </div>
                    <div className="flex items-center gap-1 text-gray-700 font-semibold shrink-0">
                      <StarIcon />
                      96.4k
                    </div>
                  </div>
                  <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex gap-3"><span className="text-indigo-600 w-20 font-medium">Language</span>Python</div>
                    <div className="flex gap-3"><span className="text-indigo-600 w-20 font-medium">License</span>MIT</div>
                    <div className="flex gap-3"><span className="text-indigo-600 w-20 font-medium">Updated</span>2 hours ago</div>
                    <div className="flex gap-3"><span className="text-indigo-600 w-20 font-medium">Forks</span>16.2k</div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1.5 font-semibold">Active Tool Call</div>
                    <div className="bg-white border border-gray-200 rounded-md p-2 text-[11px]">
                      <span className="text-indigo-600 font-medium">browser.extract</span>
                      <span className="text-gray-500">{' '}({`{ selector: "[data-testid=social-count]" }`})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity pane */}
              <div className="md:col-span-2 p-5 flex flex-col gap-4">
                <div>
                  <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-2.5">Agent Activity</div>
                  <div className="space-y-1">
                    {activityLog.map((s, i) => (
                      <div key={i} className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs ${s.running ? 'bg-blue-50 border border-blue-200' : ''}`}>
                        {s.done && !s.running && (
                          <span className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0"><CheckIcon /></span>
                        )}
                        {s.running && <span className="w-4 h-4 shrink-0 flex items-center justify-center"><span className="w-2 h-2 rounded-full bg-blue-500 status-running" /></span>}
                        {!s.done && !s.running && <span className="w-4 h-4 rounded-full border-2 border-gray-200 shrink-0" />}
                        <span className={s.running ? 'text-blue-700 font-medium' : s.done ? 'text-gray-600' : 'text-gray-400'}>
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-2">Last Tool Call</div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-[10px] font-mono space-y-1">
                    <div><span className="text-indigo-600 font-semibold">browser.goto</span></div>
                    <div className="text-gray-500">{`{ "url": "github.com/langchain..." }`}</div>
                    <div className="text-green-600 font-medium">→ 200 OK · 1.2s</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-24 px-4 bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">From description to results</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Five steps from plain-language task to structured output.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {steps.map((s, i) => (
              <div key={i} className="relative text-center">
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm h-full">
                  <div className="w-8 h-8 mx-auto rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center mb-3">{s.n}</div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{s.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden sm:flex absolute top-8 -right-1.5 z-10 items-center justify-center w-3">
                    <svg className="w-3 h-3 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete browser visibility</h2>
            <p className="text-gray-600 max-w-xl mx-auto">See every action the agent takes, not just the final result.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div key={i} className="p-5 rounded-xl border border-gray-200 bg-white hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-100/40 transition-all">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-3 shrink-0">
                  <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{f.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section id="use-cases" className="py-24 px-4 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">Use Cases</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Built for every browser workflow</h2>
          <p className="text-gray-600 mb-12 max-w-xl mx-auto">Research, scraping, monitoring, testing — BrowserPilot handles it.</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {useCases.map((uc, i) => (
              <span key={i} className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm text-gray-700 shadow-sm hover:border-indigo-300 hover:text-indigo-700 transition-colors cursor-default">
                {uc}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to automate your browser?</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Real Playwright execution. Full agent visibility. Structured results.<br />
            Works in Demo Mode — no API key required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/tasks/new"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-sm text-sm w-full sm:w-auto justify-center">
              Start Automating <ArrowRightIcon />
            </Link>
            <Link href="/dashboard"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors border border-gray-300 shadow-sm text-sm w-full sm:w-auto justify-center">
              View Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-200 py-10 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-semibold text-gray-900 mb-2">
              <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
                <span className="text-white scale-90"><BrowserIcon /></span>
              </div>
              BrowserPilot
            </Link>
            <p className="text-xs text-gray-500">AI Browser Automation · Open Source</p>
          </div>
          <div className="flex gap-12 text-sm">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</span>
              <Link href="/dashboard" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">Dashboard</Link>
              <Link href="/tasks" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">Task History</Link>
              <Link href="/tasks/new" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">New Task</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Open Source</span>
              <a href="#" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">GitHub</a>
              <a href="#" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">MIT License</a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-gray-200 text-xs text-gray-400">
          © 2025 BrowserPilot Contributors · MIT License
        </div>
      </footer>
    </div>
  )
}
