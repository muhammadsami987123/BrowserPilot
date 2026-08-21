# BrowserPilot — Claude Code MVP Build Prompt

You are acting as a **Principal AI Engineer, Senior Full-Stack Engineer, Browser Automation Architect, Product Designer, and Premium SaaS UI/UX Engineer**.

Build a polished MVP called:

# BrowserPilot

## Product Positioning

**BrowserPilot is an AI-powered browser automation workspace that allows users to give an agent a browser task and watch it navigate websites, interact with pages, execute browser actions, inspect results, and return structured output.**

Example task:

> Find the top 5 AI agent frameworks and compare their GitHub stars.

The product should visually demonstrate:

```text
User Task
    ↓
Browser Agent Started
    ↓
Open Website
    ↓
Navigate
    ↓
Inspect Page
    ↓
Click / Search / Extract
    ↓
Collect Data
    ↓
Process Results
    ↓
Final Result
```

This is an **MVP**.

Do NOT build a massive browser automation infrastructure.

The priority is:

1. Exceptional UI/UX
2. Real browser automation
3. Beautiful browser preview
4. Clear agent activity visualization
5. DOM/tool-call visibility
6. Screenshots
7. Task history
8. Structured results
9. Responsive design
10. Excellent screen-recording experience

---

# IMPORTANT: EXACTLY 2 PHASES
alwany uisng skills and mcp 


Build BrowserPilot in exactly **2 phases**.

## PHASE 1

Repository foundation, engineering documentation, configuration, architecture and project standards.

## PHASE 2

Complete MVP implementation, browser automation, UI, backend, demo workflows, testing and final polish.

There is NO Phase 3.

Do not create additional phases.

At the end of Phase 1, STOP and wait for:

`START PHASE 2`

---

# PHASE 1 — FOUNDATION

Before creating anything:

Inspect the existing repository.

Determine:

- Framework
- Package manager
- Existing dependencies
- Existing routes
- Existing components
- Styling system
- Backend
- Database
- Authentication
- Testing setup

Reuse existing infrastructure where appropriate.

Do not unnecessarily delete or replace existing code.

---

# 1. CREATE CLAUDE.md

Create:

`CLAUDE.md`

This must be the primary Claude Code engineering instruction file.

Document:

## Project Overview

Explain BrowserPilot and the MVP scope.

## Product Goals

BrowserPilot should provide:

- Browser automation
- Task execution
- Agent activity
- Browser preview
- Tool calls
- Screenshots
- Task history
- Structured results

## Architecture

Document:

- Frontend
- Backend
- Browser automation layer
- Playwright
- AI/provider abstraction
- Task orchestration
- Screenshot handling
- Database
- API
- Testing

## Engineering Standards

Require:

- TypeScript strict mode
- Reusable components
- Typed APIs
- Server-side validation
- Secure environment variables
- Proper error handling
- Structured logging
- No hardcoded secrets
- No unnecessary dependencies
- No duplicated business logic

## Browser Automation Standards

Define:

- Browser lifecycle
- Context lifecycle
- Page lifecycle
- Navigation
- Action execution
- Selector handling
- Timeouts
- Retries
- Screenshots
- Extraction
- Browser cleanup
- Failure handling

## Security Rules

Explicitly document:

- Never expose browser automation secrets
- Never expose server environment variables
- Validate URLs
- Restrict unsafe navigation where appropriate
- Do not execute arbitrary system commands from user input
- Keep Playwright execution server-side
- Sanitize extracted content before rendering

## UI Standards

Require:

- Premium developer SaaS design
- Responsive layouts
- Accessible controls
- Keyboard navigation
- Loading states
- Empty states
- Error states
- Success states
- Subtle animations
- Consistent spacing
- Professional typography

---

# 2. CREATE AGENTS.md

Create:

`AGENTS.md`

Document how future coding agents should work inside BrowserPilot.

Include:

- Repository structure
- Development commands
- Build commands
- Test commands
- Browser automation architecture
- Playwright conventions
- UI conventions
- API conventions
- Security rules
- Git conventions

---

# 3. CREATE README.md

Create a professional GitHub README.

Title:

# BrowserPilot

Subtitle:

> AI Browser Automation Platform

Include:

## Overview

Explain the product.

## Example

```text
User:
"Find the top 5 AI agent frameworks and compare their GitHub stars."

BrowserPilot:
→ Opens browser
→ Searches
→ Navigates websites
→ Extracts information
→ Captures evidence
→ Returns structured results
```

## Core Features

Only document features actually implemented.

## Architecture

Include:

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

## Tech Stack

Only list technologies actually used.

Expected technologies may include:

- Next.js
- TypeScript
- Tailwind CSS
- Playwright
- Node.js
- PostgreSQL or existing database
- AI SDK/provider

Use the actual project stack.

## Getting Started

Include installation and development commands.

## Environment Variables

Document `.env.example`.

Never expose real credentials.

## Browser Setup

Document any Playwright browser installation requirements.

## Demo

Include a placeholder for the future demo video.

## MVP Limitations

Clearly document limitations.

## Roadmap

Add future features.

## License

Reference the actual license.

---

# 4. CREATE LICENSE

Create:

`LICENSE`

Use:

**MIT License**

Use the current year.

Do not invent a company or copyright owner if one is not available.

---

# 5. SUPPORTING FILES

Create where appropriate:

```text
.env.example
.gitignore
.editorconfig
```

Add Playwright configuration only if needed.

Avoid duplicate configuration systems.

---

# 6. PHASE 1 VERIFICATION

Run:

- Typecheck
- Lint
- Build

Fix issues.

Then output:

```text
PHASE 1 COMPLETE

Created:
- CLAUDE.md
- AGENTS.md
- README.md
- LICENSE
- .env.example
- Repository configuration

Verified:
- Typecheck
- Lint
- Build

WAITING FOR:
START PHASE 2
```

STOP.

Do not start Phase 2 automatically.

---

# PHASE 2 — COMPLETE BROWSERPILOT MVP

Start only after receiving:

`START PHASE 2`

Build the complete MVP in this phase.

---

# PRODUCT EXPERIENCE

BrowserPilot should feel like a professional browser-agent developer platform.

The core experience:

```text
Create Task
     ↓
Task Started
     ↓
Agent Planning
     ↓
Browser Opened
     ↓
Navigation
     ↓
Page Inspection
     ↓
Actions
     ↓
Data Extraction
     ↓
Screenshots
     ↓
Results
```

The interface must make the browser agent's activity understandable at a glance.

---

# 1. LANDING PAGE

Create a premium public landing page.

## Navbar

Include:

- BrowserPilot logo
- Product
- Features
- How It Works
- Documentation
- Sign In
- Start Automating

## Hero

Suggested direction:

> **Give AI a Browser. Let It Do the Work.**

Supporting copy:

> BrowserPilot lets AI agents navigate websites, interact with pages, extract information, and complete browser tasks automatically.

Primary CTA:

**Start Automating**

Secondary CTA:

**Watch Demo**

---

# 2. LANDING PAGE PRODUCT PREVIEW

Create an impressive browser-agent preview using actual UI components.

Show:

```text
┌───────────────────────────────────────────────┐
│ BrowserPilot                                  │
├────────────────────────┬──────────────────────┤
│                        │ Agent Activity        │
│   Browser Preview      │                      │
│                        │ ✓ Browser opened     │
│   ┌────────────────┐   │ ✓ Navigating        │
│   │ github.com     │   │ ● Extracting        │
│   │                │   │ ○ Processing        │
│   │ AI Frameworks  │   │                      │
│   └────────────────┘   │                      │
└────────────────────────┴──────────────────────┘
```

This should be visually strong enough to use in the LinkedIn video.

---

# 3. LANDING PAGE SECTIONS

Include:

### How It Works

```text
Describe
   ↓
Plan
   ↓
Browse
   ↓
Extract
   ↓
Return
```

### Features

- Autonomous browser navigation
- Page inspection
- Tool execution
- Screenshots
- Data extraction
- Task history
- Structured results

### Browser Intelligence

Explain how the agent understands page context.

### Use Cases

Examples:

- Research
- Competitive analysis
- Data collection
- QA testing
- Website monitoring
- Repetitive browser workflows

### Final CTA

> Give your next task to BrowserPilot.

### Footer

Include:

- Product
- Resources
- Documentation
- GitHub
- Privacy
- Terms
- License

---

# 4. APPLICATION DASHBOARD

Create a professional dashboard.

Navigation:

- Overview
- Tasks
- Browser
- Activity
- Results
- Screenshots
- Settings

Dashboard metrics:

- Tasks Completed
- Tasks Running
- Success Rate
- Pages Visited
- Data Extracted
- Average Task Duration

Show:

- Recent tasks
- Active browser sessions
- Recent activity
- Latest results

Primary CTA:

**New Task**

---

# 5. TASK CREATION

Create a polished task creation screen.

Input:

### Task

Example:

> Find the top 5 AI agent frameworks and compare their GitHub stars.

Optional:

### Starting URL

Example:

`https://github.com`

### Execution Mode

- Guided
- Autonomous

For MVP, both can use the same underlying execution path if necessary.

### Output Format

- Table
- JSON
- Summary

Primary action:

**Run Task**

---

# 6. BROWSER WORKSPACE

This is the flagship screen.

Build a professional browser automation workspace.

Layout:

```text
┌─────────────────────────────────────────────────────────────┐
│ BrowserPilot                              ● Task Running    │
├──────────────────────────────┬──────────────────────────────┤
│                              │                              │
│                              │ Agent Activity               │
│                              │                              │
│      Browser Preview         │ ✓ Browser launched           │
│                              │ ✓ Opened GitHub              │
│      ┌──────────────────┐    │ ✓ Searching frameworks      │
│      │ github.com       │    │ ● Extracting data            │
│      │                  │    │ ○ Processing results         │
│      │ AI Frameworks    │    │                              │
│      │                  │    │                              │
│      └──────────────────┘    │                              │
│                              │                              │
├──────────────────────────────┴──────────────────────────────┤
│ DOM / Tool Calls / Screenshots / Results                     │
└─────────────────────────────────────────────────────────────┘
```

This screen must be extremely polished.

---

# 7. BROWSER PREVIEW

Create a browser-like viewport.

Display:

- Address bar
- Navigation controls
- Current URL
- Page content
- Loading indicator
- Browser status

For actual Playwright execution:

Capture screenshots during execution and display them.

The browser preview does NOT need to be a full remote browser streaming system.

For the MVP, use:

**Playwright screenshot snapshots + execution updates**

This is significantly simpler and sufficient for the demo.

---

# 8. AGENT ACTIVITY

Create a live activity panel.

Events:

```text
Browser launched
Navigating to github.com
Page loaded
Searching page
Element identified
Click action
Text extracted
Screenshot captured
Processing result
Task completed
```

Each event should include:

- Timestamp
- Action
- Status
- Optional duration

Statuses:

- Pending
- Running
- Completed
- Failed

---

# 9. DOM / TOOL CALLS

Create a dedicated panel.

Tabs:

### DOM

Show simplified DOM/page information.

Example:

```text
BODY
 ├── HEADER
 │    ├── NAV
 │    └── SEARCH
 ├── MAIN
 │    ├── H1
 │    ├── ARTICLE
 │    └── LINKS
 └── FOOTER
```

Do not dump enormous raw DOM into the interface.

Provide a readable summarized representation.

### Tool Calls

Show:

```text
browser.goto
browser.locator
browser.click
browser.fill
browser.extract
browser.screenshot
```

Each call should display:

- Tool
- Input
- Result
- Duration

---

# 10. SCREENSHOTS

Create screenshot capture functionality.

Every major browser step can optionally create a screenshot.

Screenshot gallery should show:

- Thumbnail
- Timestamp
- URL
- Action

Clicking a screenshot opens a larger viewer.

For the MVP, screenshots can be stored locally or through the existing storage architecture.

---

# 11. TASK HISTORY

Create a task history page.

Columns:

- Task
- Status
- Duration
- Pages
- Actions
- Created

Statuses:

- Running
- Completed
- Failed
- Cancelled

Click a task to reopen its execution.

---

# 12. RESULTS

Create a professional structured result screen.

Example task:

> Find the top 5 AI agent frameworks and compare their GitHub stars.

Result:

| Framework | GitHub Stars | Language | Description |
|---|---:|---|---|
| Framework A | ... | Python | ... |
| Framework B | ... | TypeScript | ... |

Include:

- Summary
- Structured data
- Sources
- Screenshots/evidence
- Execution details

Clearly distinguish data collected during the actual task from demo/sample data.

---

# 13. DEMO WORKFLOW

The MVP must have at least **one genuinely working browser automation workflow**.

Primary demo:

> Find the top 5 AI agent frameworks and compare their GitHub stars.

Use Playwright to perform a controlled workflow.

For reliability, create **one or two predefined workflows** rather than trying to support unlimited arbitrary browser tasks.

Possible workflows:

### Workflow 1

GitHub research workflow.

### Workflow 2

Website information extraction workflow.

The workflow should:

1. Launch Playwright
2. Navigate
3. Search or open predefined pages
4. Inspect page
5. Extract data
6. Capture screenshots
7. Generate structured results
8. Store execution events

---

# 14. DEMO MODE

BrowserPilot must also work without external AI API keys.

Create:

**Demo Mode**

Demo Mode should simulate:

- Agent planning
- Browser navigation
- Tool calls
- Screenshots
- DOM inspection
- Extraction
- Results

Use realistic pre-recorded/demo execution data.

Clearly label simulated execution.

Do not claim a screenshot was captured live if it is only a static demo asset.

---

# 15. BROWSER AUTOMATION ENGINE

Implement a lightweight server-side Playwright service.

Conceptually:

```text
BrowserService
   │
   ├── launch()
   ├── createContext()
   ├── createPage()
   ├── navigate()
   ├── inspect()
   ├── click()
   ├── fill()
   ├── extract()
   ├── screenshot()
   └── close()
```

Add:

- timeouts
- basic retries
- cleanup
- error handling

Always close browser/context resources.

---

# 16. TASK ORCHESTRATOR

Create a small task orchestration layer.

Conceptually:

```text
Task
 ↓
Planner
 ↓
Browser Action
 ↓
Observation
 ↓
Next Action
 ↓
Extraction
 ↓
Result
```

Do not implement an overly complex autonomous planning system.

For the MVP, deterministic workflows are acceptable.

---

# 17. AI PROVIDER ABSTRACTION

If AI is used, abstract it:

```text
AIProvider
   ├── OpenAI
   ├── Anthropic
   └── DemoProvider
```

Do not tightly couple the application to one provider.

If no API key exists, DemoProvider should allow the application to remain usable.

---

# 18. DATABASE

Keep the schema intentionally small.

Potential entities:

```text
users
tasks
task_runs
browser_sessions
execution_events
tool_calls
screenshots
results
```

Use:

- proper IDs
- timestamps
- indexes
- relationships
- status fields

Do not over-engineer.

---

# 19. API

Create typed APIs for:

- Create task
- Start task
- Get task
- Get execution
- Get activity
- Get screenshots
- Get tool calls
- Get result
- Cancel task

Validate inputs.

Return structured errors.

---

# 20. RESPONSIVE DESIGN

Everything must work properly on:

- Desktop
- Laptop
- Tablet
- Mobile

Pay special attention to:

- Browser workspace
- Activity panel
- Tool calls
- Screenshots
- Results
- Tables
- Navigation

On mobile, transform the multi-column browser workspace into a logical stacked/tabbed experience.

Do not allow horizontal page overflow.

---

# 21. DESIGN SYSTEM

BrowserPilot should feel like a premium developer tool.

Use:

- sophisticated typography
- subtle borders
- refined surfaces
- professional tables
- clean code/technical panels
- restrained colors
- status indicators
- elegant empty states
- smooth transitions

Avoid:

- generic chatbot appearance
- excessive glassmorphism
- excessive neon
- random gradients
- giant decorative elements
- unnecessary 3D effects

The browser workspace should feel like a professional engineering tool.

---

# 22. MICRO-INTERACTIONS

Use subtle animations for:

- Task starting
- Browser loading
- Agent status
- Tool execution
- Screenshot capture
- Result generation
- Success
- Failure

Animations should communicate state.

Do not animate everything.

---

# 23. LOADING / EMPTY / ERROR STATES

Every major screen must support:

- Loading
- Empty
- Error
- Success

Examples:

```text
No tasks yet
Start your first browser automation task.
```

```text
Browser session failed
Retry task
```

```text
Waiting for agent
```

---

# 24. TESTING

Create a practical MVP test suite.

## Unit Tests

Test:

- task validation
- browser action validation
- result formatting
- task state transitions
- tool call formatting

## Integration Tests

Test:

- task creation
- task execution
- event persistence
- screenshot persistence
- result generation

## Browser Tests

Use Playwright tests for the application itself.

Test:

- landing page
- task creation
- dashboard
- task history
- result page

## E2E Workflow

Test the main flow:

```text
Landing Page
      ↓
Start Task
      ↓
Enter Task
      ↓
Run
      ↓
Browser Workspace
      ↓
Activity
      ↓
Screenshots
      ↓
Results
```

---

# 25. SECURITY REVIEW

Review:

- URL validation
- SSRF risks
- arbitrary navigation
- environment variables
- API keys
- browser process isolation
- unsafe user input
- HTML rendering
- file handling
- server-side execution

Never allow untrusted user input to execute arbitrary shell commands.

Never expose server-side Playwright functionality directly to the browser without validation.

---

# 26. PERFORMANCE

Check:

- browser lifecycle cleanup
- unnecessary browser launches
- unnecessary client rendering
- large screenshot payloads
- API request waterfalls
- unnecessary dependencies

Reuse browser resources where appropriate.

Do not leave orphaned Playwright processes.

---

# 27. FINAL UI POLISH

Before declaring the project complete, inspect the entire product.

Highest priority:

1. Landing Page
2. Dashboard
3. Task Creation
4. Browser Workspace
5. Agent Activity
6. DOM / Tool Calls
7. Screenshots
8. Results
9. Task History

Fix anything that looks:

- unfinished
- generic
- inconsistent
- crowded
- poorly aligned
- non-responsive
- visually weak

The Browser Workspace must look especially impressive because it will be the primary screen in the LinkedIn demo.

---

# 28. FINAL README UPDATE

Update README.md with:

- Actual features
- Architecture
- Tech stack
- Setup
- Playwright setup
- Environment variables
- Demo workflow
- Screenshots section
- MVP limitations
- Roadmap
- Testing

Only document functionality that actually exists.

---

# 29. FINAL VERIFICATION

Run the actual project commands for:

```text
Typecheck
Lint
Unit Tests
Integration Tests
Playwright Tests
E2E Tests
Production Build
```

Fix every failure.

Do not disable tests just to make them pass.

---

# FINAL REPORT

When complete, output:

```text
BROWSERPILOT MVP COMPLETE

Implemented:
- Landing Page
- Dashboard
- Task Creation
- Browser Workspace
- Browser Preview
- Agent Activity
- DOM Inspector
- Tool Calls
- Screenshot Gallery
- Task History
- Structured Results
- Playwright Automation
- Demo Mode
- Backend
- Database
- Testing

Browser Automation:
Playwright

UI:
Premium / Responsive / Production-quality

Verification:
Typecheck: PASS
Lint: PASS
Tests: PASS
Playwright: PASS
E2E: PASS
Build: PASS
```

Then provide:

## LinkedIn Demo Flow

Create a **30-60 second screen-recording sequence** optimized for showing the strongest parts of BrowserPilot.

The recommended demo should be:

```text
Landing Page
   ↓
Create Task
   ↓
"Find the top 5 AI agent frameworks..."
   ↓
Browser opens
   ↓
Agent navigates
   ↓
Activity updates
   ↓
Tool calls appear
   ↓
Screenshots captured
   ↓
Data extracted
   ↓
Final comparison table
```

## Portfolio Description

Provide a concise technical description based ONLY on functionality actually implemented.

---

# FINAL PRODUCT PRINCIPLE

BrowserPilot is an **MVP**.

Do not spend most of the development time building a giant autonomous browser-agent backend.

The priority is:

**Real Playwright workflow + exceptional browser workspace UI + agent activity + screenshots + structured results + polished demo experience.**

The product should immediately communicate:

> **BrowserPilot gives AI a browser and lets it actually do the work.**

Build a coherent product, not disconnected demo screens.

Start with:

**PHASE 1 ONLY**

Stop after Phase 1.

Wait for:

`START PHASE 2`