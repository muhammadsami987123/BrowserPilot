export interface PlanStep {
  action: string
  url?: string
  description: string
}

export interface AIProvider {
  planTask(description: string, startingUrl?: string): Promise<PlanStep[]>
  summarizeResult(data: unknown[], taskDescription: string): Promise<string>
}
