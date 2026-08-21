import { chromium, Browser, BrowserContext, Page } from 'playwright'
import * as fs from 'fs'
import * as path from 'path'
import type {
  NavigateResult,
  DomSnapshot,
  DomNode,
  ExtractionResult,
  ScreenshotResult,
  ToolCallResult,
} from '@/types'

const NAVIGATION_TIMEOUT = 30000
const ACTION_TIMEOUT = 10000
const SCREENSHOT_DIR = process.env.SCREENSHOT_DIR ?? 'public/screenshots'

export class BrowserService {
  private browser: Browser | null = null
  private context: BrowserContext | null = null
  private page: Page | null = null
  private taskRunId: string
  private screenshotCount = 0

  constructor(taskRunId: string) {
    this.taskRunId = taskRunId
  }

  async launch(): Promise<void> {
    this.browser = await chromium.launch({ headless: true })
    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 800 },
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    })
    this.page = await this.context.newPage()
    this.page.setDefaultNavigationTimeout(NAVIGATION_TIMEOUT)
    this.page.setDefaultTimeout(ACTION_TIMEOUT)
  }

  async navigate(url: string): Promise<NavigateResult> {
    if (!this.page) throw new Error('Browser not launched')
    const start = Date.now()
    const response = await this.page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: NAVIGATION_TIMEOUT,
    })
    const title = await this.page.title()
    return {
      url: this.page.url(),
      title,
      status: response?.status() ?? 200,
      duration: Date.now() - start,
    }
  }

  async inspect(): Promise<DomSnapshot> {
    if (!this.page) throw new Error('Browser not launched')
    const url = this.page.url()
    const title = await this.page.title()

    // Build a simplified DOM snapshot — not raw HTML
    const structure = await this.page.evaluate((): DomNode => {
      function buildNode(el: Element, depth: number): DomNode {
        if (depth > 4) return { tag: el.tagName.toLowerCase() }
        const tag = el.tagName.toLowerCase()
        const text = el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE
          ? el.textContent?.trim().slice(0, 80)
          : undefined
        const children = depth < 3
          ? Array.from(el.children)
              .slice(0, 8)
              .map((child) => buildNode(child, depth + 1))
          : undefined
        return { tag, text: text || undefined, children: children?.length ? children : undefined }
      }
      return buildNode(document.body, 0)
    })

    return { title, url, structure }
  }

  async click(selector: string): Promise<ToolCallResult> {
    if (!this.page) throw new Error('Browser not launched')
    const start = Date.now()
    try {
      await this.page.locator(selector).first().click({ timeout: ACTION_TIMEOUT })
      return { success: true, duration: Date.now() - start }
    } catch (err) {
      return { success: false, error: String(err), duration: Date.now() - start }
    }
  }

  async fill(selector: string, value: string): Promise<ToolCallResult> {
    if (!this.page) throw new Error('Browser not launched')
    const start = Date.now()
    try {
      await this.page.locator(selector).first().fill(value, { timeout: ACTION_TIMEOUT })
      return { success: true, duration: Date.now() - start }
    } catch (err) {
      return { success: false, error: String(err), duration: Date.now() - start }
    }
  }

  async extract(selector: string): Promise<ExtractionResult> {
    if (!this.page) throw new Error('Browser not launched')
    const items = await this.page.locator(selector).allTextContents()
    return { selector, items: items.map((t) => t.trim()).filter(Boolean), count: items.length }
  }

  async screenshot(action?: string): Promise<ScreenshotResult> {
    if (!this.page) throw new Error('Browser not launched')
    const timestamp = Date.now()
    const fileName = `${String(this.screenshotCount++).padStart(3, '0')}-${action ?? 'step'}-${timestamp}.png`
    const dir = path.join(process.cwd(), SCREENSHOT_DIR, this.taskRunId)
    fs.mkdirSync(dir, { recursive: true })
    const filePath = path.join(dir, fileName)
    await this.page.screenshot({ path: filePath, fullPage: false })
    const publicPath = `/screenshots/${this.taskRunId}/${fileName}`
    const url = this.page.url()
    return { filePath: `screenshots/${this.taskRunId}/${fileName}`, publicPath, timestamp: new Date(timestamp).toISOString(), url, action }
  }

  async getCurrentUrl(): Promise<string> {
    return this.page?.url() ?? ''
  }

  async close(): Promise<void> {
    try {
      await this.page?.close()
      await this.context?.close()
      await this.browser?.close()
    } finally {
      this.page = null
      this.context = null
      this.browser = null
    }
  }

  get isLaunched(): boolean {
    return this.browser !== null
  }
}
