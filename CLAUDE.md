# CLAUDE.md — BrowserPilot Engineering Instructions

This file is the primary Claude Code engineering instruction file for BrowserPilot.

---

## Project Overview

BrowserPilot is an AI-powered browser automation workspace (MVP). Users give the agent a browser task and watch it navigate websites, interact with pages, execute browser actions, inspect results, and return structured output.

**Example task:** "Find the top 5 AI agent frameworks and compare their GitHub stars."

The product demonstrates a complete agent loop:
```
User Task → Agent Planning → Browser Opened → Navigation → Page Inspection
→ Actions → Data Extraction → Screenshots → Results
```

This is an MVP — prioritize exceptional UI, real Playwright automation, and a polished demo experience over complex autonomous AI planning.

---

## Product Goals

BrowserPilot must provide:

- **Browser automation** — real Playwright execution (server-side only)
- **Task execution** — create, run, cancel, and replay tasks
- **Agent activity visualization** — live event stream with timestamps and statuses
- **Browser preview** — Playwright screenshot snapshots shown in a browser-like viewport
- **Tool call visibility** — every browser action logged (tool name, input, result, duration)
- **DOM inspection** — summarized page structure after each navigation
- **Screenshots** — captured at each major step, shown in a gallery
- **Task history** — filterable list of all past tasks with status and duration
- **Structured results** — tables, JSON, and summaries from extracted data
- **Demo Mode** — full simulation without any AI API key required

---

## Architecture

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS (dark-first design system)
- **State:** React hooks + Server Components where possible
- **Import alias:** `@/*` → `src/*`

### Backend
- **API:** Next.js Route Handlers (`src/app/api/`)
- **Validation:** Zod schemas on all API inputs
- **Auth:** None (MVP — single user, no login required)

### Browser Automation Layer
- **Engine:** Playwright (Chromium only for MVP)
- **Execution:** Server-side ONLY — never imported in client components
- **Lifecycle:** `BrowserService` class in `src/lib/browser/browser-service.ts`
- **Screenshots:** saved to `public/screenshots/[taskId]/[timestamp].png`
- **Max session lifetime:** 5 minutes

### AI Provider Abstraction
```
AIProvider (abstract)
  ├── AnthropicProvider (uses Claude claude-sonnet-4-6)
  └── DemoProvider (deterministic simulation, no API key needed)
```
Located in `src/lib/ai/`. Default to `DemoProvider` when `ANTHROPIC_API_KEY` is not set.

### Task Orchestration
- Lightweight deterministic workflow engine in `src/lib/orchestrator/`
- For MVP, predefined workflows are acceptable (not fully open-ended)
- Emits execution events to the database in real time

### Database
- **ORM:** Prisma
- **Engine:** SQLite (MVP) — `prisma/dev.db`
- **Schema:** `prisma/schema.prisma`

### Screenshot Handling
- Captured via `page.screenshot({ path })` in BrowserService
- Stored at `/public/screenshots/[taskId]/`
- Served as static files via Next.js public directory

### Testing
- **Unit:** Vitest (`tests/`)
- **E2E:** Playwright Test (`e2e/`)
- Mock Playwright in unit tests — never launch real browsers in unit tests

---

## File Structure

```
F:/BrowserPilot/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Landing page
│   │   ├── layout.tsx                  # Root layout
│   │   ├── dashboard/
│   │   │   └── page.tsx                # Dashboard
│   │   ├── tasks/
│   │   │   ├── page.tsx                # Task history
│   │   │   └── new/page.tsx            # Task creation
│   │   ├── workspace/
│   │   │   └── [id]/page.tsx           # Browser workspace
│   │   └── api/
│   │       └── tasks/
│   │           ├── route.ts            # POST /api/tasks
│   │           └── [id]/
│   │               ├── route.ts        # GET /api/tasks/[id]
│   │               ├── start/route.ts  # POST start
│   │               ├── cancel/route.ts # POST cancel
│   │               ├── events/route.ts # GET events
│   │               ├── screenshots/route.ts
│   │               ├── tool-calls/route.ts
│   │               └── result/route.ts
│   ├── components/
│   │   ├── ui/                         # Base UI primitives
│   │   ├── browser/                    # BrowserPreview, AddressBar
│   │   ├── agent/                      # ActivityPanel, ToolCallLog
│   │   └── layout/                     # Navbar, Sidebar
│   ├── lib/
│   │   ├── browser/
│   │   │   └── browser-service.ts      # Playwright BrowserService
│   │   ├── ai/
│   │   │   ├── provider.ts             # AIProvider interface
│   │   │   ├── anthropic-provider.ts
│   │   │   └── demo-provider.ts
│   │   ├── db/
│   │   │   └── client.ts               # Prisma client singleton
│   │   └── orchestrator/
│   │       └── task-orchestrator.ts
│   └── types/
│       └── index.ts                    # Shared TypeScript types
├── prisma/
│   ├── schema.prisma
│   └── dev.db                          # Generated — gitignored
├── public/
│   └── screenshots/                    # Generated — gitignored
├── tests/                              # Vitest unit tests
├── e2e/                                # Playwright E2E tests
├── CLAUDE.md
├── AGENTS.md
├── README.md
├── LICENSE
├── .env.example
└── .gitignore
```

---

## Database Schema

Entities (defined in `prisma/schema.prisma`):

| Model | Key Fields |
|-------|-----------|
| `Task` | id, description, startingUrl, outputFormat, status, createdAt |
| `TaskRun` | id, taskId, status, startedAt, completedAt, errorMessage |
| `BrowserSession` | id, taskRunId, status, startedAt, closedAt |
| `ExecutionEvent` | id, taskRunId, type, message, status, timestamp, duration |
| `ToolCall` | id, taskRunId, tool, input, result, duration, timestamp |
| `Screenshot` | id, taskRunId, url, action, filePath, timestamp |
| `Result` | id, taskRunId, summary, structuredData, sources, format |

---

## Engineering Standards

### TypeScript
- Strict mode always on (`"strict": true` in tsconfig.json)
- No `any` — use `unknown` with type guards
- Define all shared types in `src/types/`
- Type all API request/response shapes
- Use `satisfies` for config objects

### Components
- Functional components only
- Typed props with explicit interfaces
- Export default for page components, named exports for UI primitives
- No business logic in components — delegate to lib/

### APIs
- Zod validation on all inputs
- Structured error responses: `{ error: string, code: string }`
- Correct HTTP status codes (400, 404, 500)
- Never leak internal errors or stack traces to client

### Security
- No hardcoded secrets — use `.env.local` only
- No `NEXT_PUBLIC_` prefix for server secrets
- Server-side Playwright only (never client-side)
- Validate and sanitize all URLs before navigation
- Reject private IP ranges (127.x, 10.x, 192.168.x, 172.16-31.x) and `localhost`
- Sanitize extracted page content before rendering (prevent XSS)
- No arbitrary shell command execution from user input

### Error Handling
- All async functions wrapped in try/catch
- Browser sessions always cleaned up in `finally` blocks
- Log errors with context (taskId, url, action)
- Return user-friendly error messages (not stack traces)

### Logging
- Structured logs with `console.error` for errors, `console.info` for events
- Include context: `{ taskId, action, url, duration }`
- No sensitive data in logs (API keys, passwords)

---

## Browser Automation Standards

### Browser Lifecycle
```
BrowserService.launch()
  → chromium.launch({ headless: true })
  → browser.newContext({ viewport: { width: 1280, height: 800 } })
  → context.newPage()
  → ... actions ...
  → browser.close()  // Always in finally block
```

### Timeouts
- Navigation: `30000ms`
- Action (click, fill): `10000ms`
- Extract (waitForSelector): `15000ms`
- Screenshot: `5000ms`
- Total task max: `300000ms` (5 minutes)

### Selector Strategy (priority order)
1. `data-testid` attributes
2. Semantic roles (`getByRole`)
3. Text content (`getByText`)
4. CSS selectors (last resort)
5. Never use XPath

### Retries
- Navigation failures: retry 2x with 2s delay
- Action failures: retry 1x immediately
- Screenshot failures: skip and log (non-fatal)

### Screenshots
- Capture after every navigation
- Capture after every significant action
- Save as PNG: `public/screenshots/[taskRunId]/[timestamp]-[action].png`
- Store record in `Screenshot` table

### Cleanup
- Always `browser.close()` in `finally` block
- Update `BrowserSession` status to `CLOSED` or `ERROR`
- Orphaned sessions cleaned up on server restart

---

## UI Standards

### Design System
- **Theme:** Dark-first (zinc palette)
- **Background:** `zinc-950` (page), `zinc-900` (panels), `zinc-800` (cards)
- **Text:** `zinc-100` (primary), `zinc-400` (muted), `zinc-600` (placeholder)
- **Borders:** `zinc-800` / `zinc-700`
- **Accent:** `indigo-500` / `indigo-600`
- **Success:** `emerald-500`
- **Error:** `red-500`
- **Warning:** `amber-500`

### Typography
- Font: System sans-serif stack via Tailwind
- Code/technical: `font-mono`
- Hierarchy: `text-2xl font-semibold` (headings), `text-sm text-zinc-400` (labels)

### Spacing
- Use Tailwind spacing scale consistently
- Panel padding: `p-4` or `p-6`
- Section gaps: `gap-4` or `gap-6`
- No magic pixel values

### States Required on Every Screen
- **Loading:** skeleton loaders or spinners
- **Empty:** descriptive message + primary action CTA
- **Error:** error message + retry action
- **Success:** confirmation feedback

### Animations
- Use subtle transitions only (communicate state, don't distract)
- `transition-colors duration-200` for hover states
- `animate-pulse` for loading indicators
- `animate-spin` for spinners
- No complex CSS animations unless they communicate agent state

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/tasks` | Create a new task |
| `POST` | `/api/tasks/[id]/start` | Start task execution |
| `GET` | `/api/tasks/[id]` | Get task + latest run status |
| `GET` | `/api/tasks/[id]/events` | Get execution events |
| `GET` | `/api/tasks/[id]/screenshots` | Get screenshots |
| `GET` | `/api/tasks/[id]/tool-calls` | Get tool call log |
| `GET` | `/api/tasks/[id]/result` | Get structured result |
| `POST` | `/api/tasks/[id]/cancel` | Cancel running task |

---

## Development Commands

```bash
npm run dev             # Start dev server (http://localhost:3000)
npm run build           # Production build
npm run typecheck       # npx tsc --noEmit
npm run lint            # ESLint check
npm test                # Vitest unit tests
npm run test:e2e        # Playwright E2E tests
npx prisma db push      # Apply schema to database
npx prisma generate     # Regenerate Prisma client
npx prisma studio       # Open Prisma Studio
npx playwright install chromium   # Install Playwright browser
```

---

## Security Checklist

Before any PR:

- [ ] No API keys or secrets in source code
- [ ] All API inputs validated with Zod
- [ ] URLs validated before Playwright navigation
- [ ] No private IP navigation allowed
- [ ] Playwright only used server-side
- [ ] Extracted content sanitized before render
- [ ] Error messages don't leak internals
- [ ] No `dangerouslySetInnerHTML` without sanitization
