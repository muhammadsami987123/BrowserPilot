import type { AIProvider, PlanStep } from './provider'

// DemoProvider — deterministic simulation, no API key required
export class DemoProvider implements AIProvider {
  async planTask(description: string, startingUrl?: string): Promise<PlanStep[]> {
    // Return a realistic plan for the GitHub frameworks demo
    const baseUrl = startingUrl ?? 'https://github.com'
    return [
      { action: 'navigate', url: baseUrl, description: `Opening ${new URL(baseUrl).hostname}` },
      { action: 'search', url: `${baseUrl}/search?q=ai+agent+framework&type=repositories&sort=stars`, description: 'Searching for top AI agent frameworks' },
      { action: 'navigate', url: 'https://github.com/langchain-ai/langchain', description: 'Opening LangChain repository' },
      { action: 'extract', url: 'https://github.com/langchain-ai/langchain', description: 'Extracting GitHub stars and metadata' },
      { action: 'navigate', url: 'https://github.com/pydantic/pydantic-ai', description: 'Opening PydanticAI repository' },
      { action: 'extract', url: 'https://github.com/pydantic/pydantic-ai', description: 'Extracting GitHub stars and metadata' },
      { action: 'navigate', url: 'https://github.com/microsoft/autogen', description: 'Opening AutoGen repository' },
      { action: 'extract', url: 'https://github.com/microsoft/autogen', description: 'Extracting GitHub stars and metadata' },
      { action: 'navigate', url: 'https://github.com/crewAIInc/crewAI', description: 'Opening CrewAI repository' },
      { action: 'extract', url: 'https://github.com/crewAIInc/crewAI', description: 'Extracting GitHub stars and metadata' },
      { action: 'process', description: 'Processing and structuring extracted data' },
    ]
  }

  async summarizeResult(data: unknown[], taskDescription: string): Promise<string> {
    const count = Array.isArray(data) ? data.length : 1
    return `Analysis of "${taskDescription}" is complete. Found ${count} results with detailed metrics. Data has been extracted and structured for review.`
  }
}
