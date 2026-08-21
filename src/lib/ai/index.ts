import type { AIProvider } from './provider'

export function getAIProvider(): AIProvider {
  const forceDemo = process.env.FORCE_DEMO_MODE === 'true'
  const hasKey = Boolean(process.env.ANTHROPIC_API_KEY)

  if (!forceDemo && hasKey) {
    const { AnthropicProvider } = require('./anthropic-provider')
    return new AnthropicProvider()
  }

  const { DemoProvider } = require('./demo-provider')
  return new DemoProvider()
}

export type { AIProvider, PlanStep } from './provider'
