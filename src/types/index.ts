// BrowserPilot — Shared TypeScript Types

// ─── Enums ────────────────────────────────────────────────────────────────────

export type TaskStatus = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED'
export type TaskRunStatus = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED'
export type OutputFormat = 'TABLE' | 'JSON' | 'SUMMARY'
export type ExecutionMode = 'GUIDED' | 'AUTONOMOUS'
export type EventStatus = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED'
export type SessionStatus = 'ACTIVE' | 'CLOSED' | 'ERROR'
export type ToolCallStatus = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED'

export type EventType =
  | 'BROWSER_LAUNCHED'
  | 'NAVIGATING'
  | 'PAGE_LOADED'
  | 'SEARCHING'
  | 'ELEMENT_FOUND'
  | 'CLICKING'
  | 'FILLING'
  | 'EXTRACTING'
  | 'SCREENSHOT_CAPTURED'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED'

export type BrowserTool =
  | 'browser.goto'
  | 'browser.click'
  | 'browser.fill'
  | 'browser.extract'
  | 'browser.screenshot'
  | 'browser.search'
  | 'browser.inspect'

// ─── Domain Models ────────────────────────────────────────────────────────────

export interface Task {
  id: string
  description: string
  startingUrl?: string | null
  outputFormat: OutputFormat
  mode: ExecutionMode
  status: TaskStatus
  createdAt: string
  updatedAt: string
  runs?: TaskRun[]
}

export interface TaskRun {
  id: string
  taskId: string
  task?: Task
  status: TaskRunStatus
  startedAt?: string | null
  completedAt?: string | null
  errorMessage?: string | null
  createdAt: string
  events?: ExecutionEvent[]
  toolCalls?: ToolCall[]
  screenshots?: Screenshot[]
  result?: Result | null
  browserSession?: BrowserSession | null
}

export interface BrowserSession {
  id: string
  taskRunId: string
  status: SessionStatus
  startedAt: string
  closedAt?: string | null
  currentUrl?: string | null
}

export interface ExecutionEvent {
  id: string
  taskRunId: string
  type: EventType
  message: string
  status: EventStatus
  url?: string | null
  duration?: number | null
  timestamp: string
}

export interface ToolCall {
  id: string
  taskRunId: string
  tool: BrowserTool
  input: string   // JSON string
  result?: string | null // JSON string
  status: ToolCallStatus
  duration?: number | null
  timestamp: string
}

export interface Screenshot {
  id: string
  taskRunId: string
  url?: string | null
  action?: string | null
  filePath: string
  timestamp: string
}

export interface Result {
  id: string
  taskRunId: string
  summary?: string | null
  structuredData?: string | null // JSON string
  sources?: string | null        // JSON array string
  format: OutputFormat
  createdAt: string
}

// ─── API Request/Response Types ───────────────────────────────────────────────

export interface CreateTaskRequest {
  description: string
  startingUrl?: string
  outputFormat?: OutputFormat
  mode?: ExecutionMode
}

export interface CreateTaskResponse {
  task: Task
}

export interface StartTaskResponse {
  taskRun: TaskRun
}

export interface GetTaskResponse {
  task: Task
  latestRun?: TaskRun | null
}

export interface GetEventsResponse {
  events: ExecutionEvent[]
}

export interface GetScreenshotsResponse {
  screenshots: Screenshot[]
}

export interface GetToolCallsResponse {
  toolCalls: ToolCall[]
}

export interface GetResultResponse {
  result: Result | null
}

export interface ApiError {
  error: string
  code: string
}

// ─── Browser Service Types ────────────────────────────────────────────────────

export interface NavigateResult {
  url: string
  title: string
  status: number
  duration: number
}

export interface DomSnapshot {
  title: string
  url: string
  structure: DomNode
}

export interface DomNode {
  tag: string
  text?: string
  children?: DomNode[]
}

export interface ExtractionResult {
  selector: string
  items: string[]
  count: number
}

export interface ScreenshotResult {
  filePath: string
  publicPath: string
  timestamp: string
  url?: string
  action?: string
}

export interface ToolCallResult {
  success: boolean
  error?: string
  duration: number
  data?: unknown
}

// ─── Demo Mode Types ──────────────────────────────────────────────────────────

export interface DemoStep {
  type: EventType
  message: string
  url?: string
  duration: number
  delayMs: number
  toolCall?: {
    tool: BrowserTool
    input: string
    result: string
  }
  screenshot?: {
    action: string
    filePath: string
  }
}

// ─── UI State Types ───────────────────────────────────────────────────────────

export interface TaskWithLatestRun extends Task {
  latestRun?: TaskRun | null
  pagesVisited?: number
  actionsCount?: number
}

export interface DashboardMetrics {
  tasksCompleted: number
  tasksRunning: number
  tasksFailed: number
  successRate: number
  pagesVisited: number
  dataExtracted: number
  avgDurationMs: number
}

// ─── Structured Result Data ───────────────────────────────────────────────────

export interface FrameworkComparisonRow {
  name: string
  stars: string
  language: string
  description: string
  url: string
}

export type StructuredResultData =
  | FrameworkComparisonRow[]
  | Record<string, unknown>[]
  | Record<string, unknown>
