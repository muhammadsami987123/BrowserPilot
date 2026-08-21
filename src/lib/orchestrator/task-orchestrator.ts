import { prisma } from '@/lib/db/client'
import { BrowserService } from '@/lib/browser/browser-service'
import { getAIProvider } from '@/lib/ai'
import type { FrameworkComparisonRow } from '@/types'

// Demo data for the GitHub AI Frameworks workflow
const DEMO_FRAMEWORKS: FrameworkComparisonRow[] = [
  { name: 'LangChain', stars: '96.4k', language: 'Python / TypeScript', description: 'Framework for developing applications powered by language models', url: 'https://github.com/langchain-ai/langchain' },
  { name: 'AutoGen', stars: '41.2k', language: 'Python', description: 'Multi-agent conversation framework by Microsoft Research', url: 'https://github.com/microsoft/autogen' },
  { name: 'CrewAI', stars: '29.8k', language: 'Python', description: 'Framework for orchestrating role-playing AI agents', url: 'https://github.com/crewAIInc/crewAI' },
  { name: 'PydanticAI', stars: '8.1k', language: 'Python', description: 'Agent framework by the Pydantic team with type-safe tool use', url: 'https://github.com/pydantic/pydantic-ai' },
  { name: 'LlamaIndex', stars: '38.7k', language: 'Python / TypeScript', description: 'Data framework for LLM-based agents and RAG applications', url: 'https://github.com/run-llama/llama_index' },
]

const DEMO_STEPS = [
  { type: 'BROWSER_LAUNCHED' as const, message: 'Browser launched (Chromium)', delayMs: 800 },
  { type: 'NAVIGATING' as const, message: 'Navigating to github.com', url: 'https://github.com', delayMs: 1200, tool: 'browser.goto', toolInput: '{"url":"https://github.com"}' },
  { type: 'PAGE_LOADED' as const, message: 'Page loaded: github.com', url: 'https://github.com', delayMs: 600 },
  { type: 'SEARCHING' as const, message: 'Searching for "ai agent framework"', url: 'https://github.com/search?q=ai+agent+framework&sort=stars', delayMs: 1000, tool: 'browser.search', toolInput: '{"query":"ai agent framework","sort":"stars"}' },
  { type: 'PAGE_LOADED' as const, message: 'Search results loaded — 1,240 repositories found', delayMs: 800 },
  { type: 'ELEMENT_FOUND' as const, message: 'Identified top 5 framework repositories', delayMs: 500 },
  { type: 'NAVIGATING' as const, message: 'Opening LangChain repository', url: 'https://github.com/langchain-ai/langchain', delayMs: 1100, tool: 'browser.goto', toolInput: '{"url":"https://github.com/langchain-ai/langchain"}' },
  { type: 'EXTRACTING' as const, message: 'Extracting stars, language, description', delayMs: 900, tool: 'browser.extract', toolInput: '{"selector":"[data-testid=social-count]"}', toolResult: '{"stars":"96.4k","language":"Python"}' },
  { type: 'SCREENSHOT_CAPTURED' as const, message: 'Screenshot captured: LangChain repository', url: 'https://github.com/langchain-ai/langchain', delayMs: 600 },
  { type: 'NAVIGATING' as const, message: 'Opening AutoGen repository', url: 'https://github.com/microsoft/autogen', delayMs: 1000, tool: 'browser.goto', toolInput: '{"url":"https://github.com/microsoft/autogen"}' },
  { type: 'EXTRACTING' as const, message: 'Extracting stars, language, description', delayMs: 700, tool: 'browser.extract', toolInput: '{"selector":"[data-testid=social-count]"}', toolResult: '{"stars":"41.2k","language":"Python"}' },
  { type: 'SCREENSHOT_CAPTURED' as const, message: 'Screenshot captured: AutoGen repository', url: 'https://github.com/microsoft/autogen', delayMs: 500 },
  { type: 'NAVIGATING' as const, message: 'Opening CrewAI repository', url: 'https://github.com/crewAIInc/crewAI', delayMs: 1000, tool: 'browser.goto', toolInput: '{"url":"https://github.com/crewAIInc/crewAI"}' },
  { type: 'EXTRACTING' as const, message: 'Extracting stars, language, description', delayMs: 700, tool: 'browser.extract', toolInput: '{"selector":"[data-testid=social-count]"}', toolResult: '{"stars":"29.8k","language":"Python"}' },
  { type: 'SCREENSHOT_CAPTURED' as const, message: 'Screenshot captured: CrewAI repository', url: 'https://github.com/crewAIInc/crewAI', delayMs: 500 },
  { type: 'NAVIGATING' as const, message: 'Opening LlamaIndex repository', url: 'https://github.com/run-llama/llama_index', delayMs: 1000 },
  { type: 'EXTRACTING' as const, message: 'Extracting stars, language, description', delayMs: 700, tool: 'browser.extract', toolInput: '{"selector":"[data-testid=social-count]"}', toolResult: '{"stars":"38.7k","language":"Python"}' },
  { type: 'PROCESSING' as const, message: 'Processing and structuring extracted data', delayMs: 1500 },
  { type: 'COMPLETED' as const, message: 'Task completed — 5 frameworks compared', delayMs: 400 },
]

export class TaskOrchestrator {
  async runTask(taskId: string): Promise<void> {
    // Create a TaskRun record
    const taskRun = await prisma.taskRun.create({
      data: { taskId, status: 'RUNNING', startedAt: new Date() },
    })

    // Create BrowserSession
    await prisma.browserSession.create({
      data: { taskRunId: taskRun.id, status: 'ACTIVE' },
    })

    // Determine if demo or real mode
    const forceDemo = process.env.FORCE_DEMO_MODE === 'true'
    const hasKey = Boolean(process.env.ANTHROPIC_API_KEY)

    if (forceDemo || !hasKey) {
      await this.runDemoWorkflow(taskRun.id)
    } else {
      await this.runRealWorkflow(taskId, taskRun.id)
    }
  }

  private async runDemoWorkflow(taskRunId: string): Promise<void> {
    try {
      for (const step of DEMO_STEPS) {
        await new Promise((r) => setTimeout(r, step.delayMs))

        await prisma.executionEvent.create({
          data: {
            taskRunId,
            type: step.type,
            message: step.message,
            status: 'COMPLETED',
            url: 'url' in step ? step.url : undefined,
          },
        })

        // Log tool call if present
        if ('tool' in step && step.tool) {
          await prisma.toolCall.create({
            data: {
              taskRunId,
              tool: step.tool,
              input: step.toolInput ?? '{}',
              result: 'toolResult' in step ? step.toolResult : undefined,
              status: 'COMPLETED',
              duration: step.delayMs,
            },
          })
        }

        // Create placeholder screenshots for screenshot events
        if (step.type === 'SCREENSHOT_CAPTURED' && 'url' in step) {
          await prisma.screenshot.create({
            data: {
              taskRunId,
              url: step.url,
              action: step.message.replace('Screenshot captured: ', ''),
              filePath: `screenshots/demo/placeholder-${Date.now()}.png`,
            },
          })
        }
      }

      // Create result
      await prisma.result.create({
        data: {
          taskRunId,
          summary: 'Successfully compared the top 5 AI agent frameworks by GitHub stars. LangChain leads with 96.4k stars, followed by LlamaIndex (38.7k), AutoGen (41.2k), CrewAI (29.8k), and PydanticAI (8.1k).',
          structuredData: JSON.stringify(DEMO_FRAMEWORKS),
          sources: JSON.stringify(DEMO_FRAMEWORKS.map((f) => f.url)),
          format: 'TABLE',
        },
      })

      await prisma.taskRun.update({
        where: { id: taskRunId },
        data: { status: 'COMPLETED', completedAt: new Date() },
      })

      await prisma.browserSession.updateMany({
        where: { taskRunId },
        data: { status: 'CLOSED', closedAt: new Date() },
      })

      // Update parent task status
      const run = await prisma.taskRun.findUnique({ where: { id: taskRunId } })
      if (run) {
        await prisma.task.update({ where: { id: run.taskId }, data: { status: 'COMPLETED' } })
      }
    } catch (err) {
      await prisma.taskRun.update({
        where: { id: taskRunId },
        data: { status: 'FAILED', completedAt: new Date(), errorMessage: String(err) },
      })
      await prisma.browserSession.updateMany({
        where: { taskRunId },
        data: { status: 'ERROR', closedAt: new Date() },
      })
    }
  }

  private async runRealWorkflow(taskId: string, taskRunId: string): Promise<void> {
    const task = await prisma.task.findUniqueOrThrow({ where: { id: taskId } })
    const browser = new BrowserService(taskRunId)
    const ai = getAIProvider()

    try {
      await this.emit(taskRunId, 'BROWSER_LAUNCHED', 'Browser launched (Chromium)')
      await browser.launch()

      const plan = await ai.planTask(task.description, task.startingUrl ?? undefined)

      for (const step of plan) {
        if (step.action === 'navigate' && step.url) {
          await this.emit(taskRunId, 'NAVIGATING', `Navigating to ${step.url}`, step.url)
          const start = Date.now()
          const nav = await browser.navigate(step.url)
          await prisma.toolCall.create({
            data: { taskRunId, tool: 'browser.goto', input: JSON.stringify({ url: step.url }), result: JSON.stringify(nav), status: 'COMPLETED', duration: nav.duration },
          })
          await this.emit(taskRunId, 'PAGE_LOADED', `Page loaded: ${nav.title}`, step.url, Date.now() - start)

          const ss = await browser.screenshot(step.action)
          await prisma.screenshot.create({ data: { taskRunId, url: step.url, action: step.description, filePath: ss.filePath } })
          await this.emit(taskRunId, 'SCREENSHOT_CAPTURED', `Screenshot captured`, step.url)
        } else if (step.action === 'extract') {
          await this.emit(taskRunId, 'EXTRACTING', step.description)
          const extracted = await browser.extract('h1, h2, [data-testid], .repository-content')
          await prisma.toolCall.create({ data: { taskRunId, tool: 'browser.extract', input: JSON.stringify({ selector: '*' }), result: JSON.stringify(extracted), status: 'COMPLETED' } })
        }
      }

      await this.emit(taskRunId, 'PROCESSING', 'Processing and structuring results')
      const summary = await ai.summarizeResult(plan, task.description)

      await prisma.result.create({
        data: { taskRunId, summary, structuredData: JSON.stringify([]), sources: JSON.stringify([]), format: task.outputFormat },
      })

      await this.emit(taskRunId, 'COMPLETED', 'Task completed successfully')
      await prisma.taskRun.update({ where: { id: taskRunId }, data: { status: 'COMPLETED', completedAt: new Date() } })
      await prisma.task.update({ where: { id: taskId }, data: { status: 'COMPLETED' } })
    } catch (err) {
      await this.emit(taskRunId, 'FAILED', `Task failed: ${String(err)}`)
      await prisma.taskRun.update({ where: { id: taskRunId }, data: { status: 'FAILED', completedAt: new Date(), errorMessage: String(err) } })
      await prisma.task.update({ where: { id: taskId }, data: { status: 'FAILED' } })
    } finally {
      await browser.close()
      await prisma.browserSession.updateMany({ where: { taskRunId }, data: { status: 'CLOSED', closedAt: new Date() } })
    }
  }

  private async emit(taskRunId: string, type: string, message: string, url?: string, duration?: number): Promise<void> {
    await prisma.executionEvent.create({ data: { taskRunId, type, message, status: 'COMPLETED', url, duration } })
  }
}
