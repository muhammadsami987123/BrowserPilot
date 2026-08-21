# AGENTS.md — BrowserPilot Agent Instructions

This file documents how coding agents and AI assistants should work inside the BrowserPilot codebase.

---

## Repository Structure

```
F:/BrowserPilot/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── page.tsx                # Landing page (public)
│   │   ├── layout.tsx              # Root layout
│   │   ├── globals.css             # Global styles
│   │   ├── dashboard/page.tsx      # App dashboard
│   │   ├── tasks/
│   │   │   ├── page.tsx            # Task history list
│   │   │   └── new/page.tsx        # Task creation form
│   │   ├── workspace/[id]/page.tsx # Browser workspace (flagship screen)
│   │   └── api/                    # Route Handlers (backend)
│   │       └── tasks/
│   │           ├── route.ts        # POST /api/tasks
│   │           └── [id]/
│   │               ├── route.ts
│   │               ├── start/route.ts
│   │               ├── cancel/route.ts
│   │               ├── events/route.ts
│   │               ├── screenshots/route.ts
│   │               ├── tool-calls/route.ts
│   │               └── result/route.ts
│   ├── components/
│   │   ├── ui/                     # Base primitives (Button, Badge, Card, etc.)
│   │   ├── browser/                # BrowserPreview, AddressBar, ScreenshotViewer
│   │   ├── agent/                  # ActivityPanel, ToolCallLog, DomInspector
│   │   └── layout/                 # Navbar, Sidebar, PageHeader
│   ├── lib/
│   │   ├── browser/
│   │   │   └── browser-service.ts  # Playwright BrowserService class
│   │   ├── ai/
│   │   │   ├── provider.ts         # AIProvider interface
│   │   │   ├── anthropic-provider.ts
│   │   │   └── demo-provider.ts    # Demo simulation (no API key required)
│   │   ├── db/
│   │   │   └── client.ts           # Prisma singleton
│   │   └── orchestrator/
│   │       └── task-orchestrator.ts
│   └── types/
│       └── index.ts                # All shared TypeScript types
├── prisma/
│   ├── schema.prisma               # Database schema
│   └── dev.db                      # SQLite file (gitignored)
├── public/
│   └── screenshots/                # Runtime screenshots (gitignored)
├── tests/                          # Vitest unit tests
├── e2e/                            # Playwright E2E tests
├── CLAUDE.md                       # Primary engineering instructions
├── AGENTS.md                       # This file
├── README.md
├── LICENSE
├── .env.example
└── .gitignore
```

---

## Development Commands

```bash
# Start development
npm run dev                        # http://localhost:3000

# Code quality
npm run typecheck                  # TypeScript: npx tsc --noEmit
npm run lint                       # ESLint

# Build
npm run build                      # Production Next.js build

# Testing
npm test                           # Vitest unit tests
npm run test:e2e                   # Playwright E2E tests
npm run test:coverage              # Coverage report

# Database
npx prisma db push                 # Sync schema to dev.db
npx prisma generate                # Regenerate Prisma client
npx prisma studio                  # Open Prisma GUI

# Browser automation
npx playwright install chromium   # Install Playwright browser
npx playwright show-report        # Show last E2E test report
```

---

## Browser Automation Architecture

The `BrowserService` class (`src/lib/browser/browser-service.ts`) is the only interface for all Playwright operations.

```typescript
class BrowserService {
  async launch(): Promise<void>
  async navigate(url: string): Promise<NavigateResult>
  async inspect(): Promise<DomSnapshot>
  async click(selector: string): Promise<ToolCallResult>
  async fill(selector: string, value: string): Promise<ToolCallResult>
  async extract(selector: string): Promise<ExtractionResult>
  async screenshot(action?: string): Promise<ScreenshotResult>
  async close(): Promise<void>
}
```

**Critical rules:**
- `BrowserService` is **server-side only** — never import in files inside `src/app/(landing)`, `src/components/`, or any client component
- Always wrap browser operations in `try/finally` — `close()` must always run
- Max session time: 5 minutes (`BROWSER_TASK_TIMEOUT_MS`)
- Store screenshots at: `public/screenshots/[taskRunId]/[timestamp]-[action].png`

**Lifecycle pattern:**
```typescript
const browser = new BrowserService(taskRunId);
try {
  await browser.launch();
  await browser.navigate(url);
  const screenshot = await browser.screenshot('page-loaded');
  // ... actions ...
} finally {
  await browser.close();
}
```

---

## Playwright Conventions

| Setting | Value |
|---------|-------|
| Browser | Chromium only (MVP) |
| Mode | Headless always |
| Viewport | 1280 × 800 |
| Navigation timeout | 30,000ms |
| Action timeout | 10,000ms |
| Extract timeout | 15,000ms |

- Use `page.locator()` — not `page.$()` or `page.querySelector()`
- Use `page.getByRole()`, `page.getByText()` for semantic selectors
- Never use `page.waitForTimeout()` — use `page.waitForSelector()` or `page.waitForLoadState()`
- Take a screenshot after every navigation and significant action
- Never use XPath selectors

---

## UI Conventions

### Tech
- Tailwind CSS utility classes only
- No custom CSS files unless absolutely necessary
- React Server Components where possible; `"use client"` only when needed

### Color Palette (dark theme)
```
Background:  zinc-950 (page), zinc-900 (panels), zinc-800 (cards)
Text:        zinc-100 (primary), zinc-400 (secondary), zinc-600 (placeholder)
Borders:     zinc-800, zinc-700
Accent:      indigo-500, indigo-600
Success:     emerald-500
Error:       red-500
Warning:     amber-500
Running:     blue-500
```

### Component Rules
- File: `PascalCase.tsx` in appropriate `src/components/` subdirectory
- Props: typed explicit interface above the component
- Export: `export default function ComponentName()`
- No business logic in components — call lib/ functions or API routes

### Required States
Every UI screen must handle:
- `loading` — skeleton or spinner
- `empty` — message + CTA
- `error` — error + retry button
- `success` — confirmation feedback

---

## API Conventions

### Route Handlers
- Location: `src/app/api/tasks/[...]/route.ts`
- Framework: Next.js Route Handlers (`NextRequest`, `NextResponse`)
- Validation: Zod schema for every request body and query param

### Response Format
```typescript
// Success
NextResponse.json({ data: T }, { status: 200 })

// Error
NextResponse.json({ error: string, code: string }, { status: 400 | 404 | 500 })
```

### Rules
- Never return stack traces to client
- Always validate with Zod before processing
- Use `NextResponse.json()` — not `Response.json()`
- HTTP status codes: 200 success, 400 bad request, 404 not found, 500 server error
- 201 for resource creation (POST /api/tasks)

---

## Security Rules

| Rule | Details |
|------|---------|
| No client-side Playwright | Never import `playwright` in client components or pages |
| URL validation | Check URL format + reject private IPs (127.x, 10.x, 192.168.x, localhost) |
| No shell commands | Never pass user input to `exec()`, `spawn()`, or similar |
| Sanitize extracted content | Use DOMPurify before rendering user-extracted HTML |
| No secret exposure | Only `NEXT_PUBLIC_*` vars reach the client |
| Input validation | Zod schema on every API endpoint |
| No `dangerouslySetInnerHTML` | Unless content is sanitized |

---

## TypeScript Conventions

```typescript
// Types go in src/types/index.ts
export type TaskStatus = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED'

// Prefer type over interface for unions
type ApiError = { error: string; code: string }

// Use interface for objects with methods
interface BrowserAction {
  execute(): Promise<ToolCallResult>
}

// No any
function processResult(data: unknown): Result {
  if (!isResult(data)) throw new Error('Invalid result shape')
  return data
}

// Config objects with satisfies
const config = {
  timeout: 30000,
  retries: 3,
} satisfies BrowserConfig
```

---

## Testing Conventions

### Unit Tests (Vitest — `tests/`)
- Mirror the `src/` structure
- File naming: `browser-service.test.ts`
- Mock Playwright: `vi.mock('playwright')`
- Mock Prisma: `vi.mock('@/lib/db/client')`
- Mock AI provider: use `DemoProvider` directly

### E2E Tests (Playwright Test — `e2e/`)
- File naming: `landing.spec.ts`, `task-creation.spec.ts`
- Use `page.getByRole()` and `page.getByText()` — no brittle CSS selectors
- Set `FORCE_DEMO_MODE=true` for E2E (avoid real browser automation in tests)

### What to test
- Unit: validation logic, result formatting, state machine transitions
- E2E: full user flows (landing → task → workspace → result)

---

## Git Conventions

```
feat: add screenshot gallery component
fix: cleanup browser session on task cancellation
docs: update API endpoint documentation
refactor: extract URL validator to lib/utils
test: add unit tests for task orchestrator
```

- Branch naming: `feature/[name]`, `fix/[name]`, `docs/[name]`
- No commits directly to `main`
- Keep commits focused — one logical change per commit

---

## Common Gotchas

1. **Prisma client in Next.js dev mode** — use the singleton pattern in `src/lib/db/client.ts` to avoid multiple instances
2. **Server/client boundary** — `BrowserService` uses Node.js APIs, never put it in a client component
3. **Screenshot paths** — paths stored in DB are relative (`screenshots/[id]/file.png`), served from `/public/`
4. **Demo Mode** — check `process.env.ANTHROPIC_API_KEY` or `FORCE_DEMO_MODE` to select provider
5. **SQLite concurrency** — for MVP this is fine; don't add concurrent writes from multiple browser sessions
