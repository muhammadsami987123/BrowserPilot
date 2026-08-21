import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'
import type { ApiError } from '@/types'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  try {
    const { id } = await params
    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        runs: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          include: {
            browserSession: true,
            result: true,
            _count: { select: { events: true, screenshots: true, toolCalls: true } },
          },
        },
      },
    })
    if (!task) return NextResponse.json({ error: 'Task not found', code: 'NOT_FOUND' }, { status: 404 })
    return NextResponse.json({ task, latestRun: task.runs[0] ?? null })
  } catch (err) {
    console.error('[GET /api/tasks/[id]]', err)
    return NextResponse.json({ error: 'Internal server error', code: 'INTERNAL_ERROR' } satisfies ApiError, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  try {
    const { id } = await params
    await prisma.task.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Task not found', code: 'NOT_FOUND' }, { status: 404 })
  }
}
