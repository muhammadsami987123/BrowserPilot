# BrowserPilot

> AI Browser Automation Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![Playwright](https://img.shields.io/badge/Playwright-latest-green)](https://playwright.dev/)

---

## Overview

BrowserPilot is an AI-powered browser automation workspace. Give the agent a task, watch it navigate websites, interact with pages, execute browser actions, inspect results, and return structured output — all with real-time visibility into every step the agent takes.

---

## Example

```text
User:
"Find the top 5 AI agent frameworks and compare their GitHub stars."

BrowserPilot:
→ Opens browser (Playwright / Chromium)
→ Searches GitHub and the web
→ Navigates to each framework repository
→ Extracts star counts, language, and description
→ Captures screenshots as evidence
→ Returns structured comparison table
```

---

## Core Features

- **Autonomous browser navigation** — Playwright-powered Chromium execution
- **Real-time agent activity** — live event stream with timestamps and statuses
- **Browser preview** — screenshot snapshots displayed in a browser-like viewport
- **Tool call visibility** — every browser action logged (tool, input, result, duration)
- **DOM inspection** — summarized page structure after each navigation
- **Screenshot gallery** — timeline of captured screenshots with URL and action context
- **Task history** — filterable list of all past tasks with replay support
- **Structured results** — tables, JSON, and plain summaries from extracted data
- **Demo Mode** — full realistic simulation without any AI API key
- **Responsive design** — optimized from desktop to mobile

---

## Architecture

```text
                    BrowserPilot
                         │
                         ▼
                    User Task
                         │
                         ▼
                  Task Orchestrator
                         │
             ┌───────────┴───────────┐
             ▼                       ▼
        AI Planner               Playwright
        (Claude / Demo)          (Server-side)
                                     │
                         ┌───────────┼───────────┐
                         ▼           ▼           ▼
                     Navigate     Inspect     Extract
                         │           │           │
                         └───────────┼───────────┘
                                     ▼
                                Screenshots
                                     │
                                     ▼
                                Result Parser
                                     │
                                     ▼
                               Final Results
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React, TypeScript, Tailwind CSS |
| Backend | Next.js Route Handlers |
| Browser Automation | Playwright (Chromium, server-side) |
| AI Provider | Anthropic Claude SDK + Demo fallback |
| Database | Prisma ORM + SQLite |
| Testing | Vitest (unit) + Playwright Test (E2E) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/your-username/browserpilot.git
cd browserpilot
npm install
```

### Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local`. At minimum, set `DATABASE_URL`. `ANTHROPIC_API_KEY` is optional — BrowserPilot runs in Demo Mode without it.

### Browser Setup

Install the Playwright Chromium browser:

```bash
npx playwright install chromium
```

### Database Setup

```bash
npx prisma db push
npx prisma generate
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

See [`.env.example`](.env.example) for all variables.

```env
DATABASE_URL=file:./dev.db         # SQLite path
ANTHROPIC_API_KEY=                  # Optional — enables real AI mode
AI_MODEL=claude-sonnet-4-6         # Claude model
NEXT_PUBLIC_APP_URL=http://localhost:3000
FORCE_DEMO_MODE=false              # Force demo regardless of API key
```

**Never commit `.env.local`.**

---

## Demo

> Demo video coming soon.

BrowserPilot includes **Demo Mode** — a realistic pre-recorded workflow simulation showing the complete browser agent experience without any external API keys.

---

## Primary Demo Workflow

Task: *"Find the top 5 AI agent frameworks and compare their GitHub stars."*

1. Playwright launches headless Chromium
2. Agent navigates to GitHub search
3. Opens each framework repository
4. Extracts star count, language, description
5. Captures screenshots at each navigation step
6. Returns structured comparison table with sources

---

## Testing

```bash
npm test              # Vitest unit tests
npm run test:e2e      # Playwright E2E tests
npm run typecheck     # TypeScript type check
npm run lint          # ESLint
```

---

## MVP Limitations

- Single concurrent browser session
- SQLite (not production-scale)
- Chromium only (no Firefox/WebKit)
- No user authentication
- Local screenshot storage (no cloud)
- Pre-defined demo workflows (not fully open-ended AI navigation)

---

## Roadmap

- [ ] Multi-session concurrency
- [ ] PostgreSQL support
- [ ] Authentication (NextAuth.js)
- [ ] Cloud screenshot storage (S3/R2)
- [ ] Fully autonomous AI-driven navigation
- [ ] Webhook notifications
- [ ] Public API + SDK
- [ ] Visual workflow builder

---

## License

[MIT](LICENSE)

---

Built with Next.js, Playwright, and Anthropic Claude.
