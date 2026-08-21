import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/client'
import type { CreateTaskResponse, ApiError } from '@/types'

const CreateTaskSchema = z.object({
  description: z.string().min(10, 'Task description must be at least 10 characters').max(1000),
  startingUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  outputFormat: z.enum(['TABLE', 'JSON', 'SUMMARY']).optional().default('TABLE'),
  mode: z.enum(['GUIDED', 'AUTONOMOUS']).optional().default('AUTONOMOUS'),
})

export async function POST(request: NextRequest): Promise<NextResponse<CreateTaskResponse | ApiError>> {
  try {
    const body = await request.json()
    const parsed = CreateTaskSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? 'Invalid request', code: 'VALIDATION_ERROR' },
        { status: 400 }
      )
    }

    const { description, startingUrl, outputFormat, mode } = parsed.data

    // Validate URL for SSRF prevention
    if (startingUrl) {
      try {
        const url = new URL(startingUrl)
        const blocked = ['localhost', '127.0.0.1', '0.0.0.0', '::1']
        if (blocked.some((b) => url.hostname.includes(b)) || url.hostname.match(/^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/)) {
          return NextResponse.json({ error: 'URL not allowed', code: 'URL_BLOCKED' }, { status: 400 })
        }
      } catch {
        return NextResponse.json({ error: 'Invalid URL format', code: 'INVALID_URL' }, { status: 400 })
      }
    }

    const task = await prisma.task.create({
      data: {
        description,
        startingUrl: startingUrl || null,
        outputFormat,
        mode,
        status: 'PENDING',
      },
    })

    return NextResponse.json({ task: { ...task, createdAt: task.createdAt.toISOString(), updatedAt: task.updatedAt.toISOString() } }, { status: 201 })
  } catch (err) {
    console.error('[POST /api/tasks]', err)
    return NextResponse.json({ error: 'Internal server error', code: 'INTERNAL_ERROR' }, { status: 500 })
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: {
        runs: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: { id: true, status: true, startedAt: true, completedAt: true },
        },
      },
    })
    return NextResponse.json({ tasks })
  } catch (err) {
    console.error('[GET /api/tasks]', err)
    return NextResponse.json({ error: 'Internal server error', code: 'INTERNAL_ERROR' }, { status: 500 })
  }
}
