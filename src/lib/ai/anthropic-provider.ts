import Anthropic from '@anthropic-ai/sdk'
import type { AIProvider, PlanStep } from './provider'

export class AnthropicProvider implements AIProvider {
  private client: Anthropic
  private model: string

  constructor() {
    this.client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
    this.model = process.env.AI_MODEL ?? 'claude-sonnet-4-6'
  }

  async planTask(description: string, startingUrl?: string): Promise<PlanStep[]> {
    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `You are a browser automation planner. Create a step-by-step plan to complete this task: "${description}"${startingUrl ? `. Start at: ${startingUrl}` : ''}.

Return a JSON array of steps. Each step has: action (navigate|search|click|extract|process), url (optional), description (what this step does).

Return ONLY valid JSON array, no markdown.`,
        },
      ],
    })

    const content = response.content[0]
    if (content.type !== 'text') throw new Error('Unexpected response type')

    try {
      return JSON.parse(content.text) as PlanStep[]
    } catch {
      // Fallback to demo plan if parsing fails
      const { DemoProvider } = await import('./demo-provider')
      return new DemoProvider().planTask(description, startingUrl)
    }
  }

  async summarizeResult(data: unknown[], taskDescription: string): Promise<string> {
    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: 512,
      messages: [
        {
          role: 'user',
          content: `Summarize these results for the task "${taskDescription}" in 2-3 sentences: ${JSON.stringify(data).slice(0, 2000)}`,
        },
      ],
    })

    const content = response.content[0]
    if (content.type !== 'text') return 'Task completed successfully.'
    return content.text
  }
}
