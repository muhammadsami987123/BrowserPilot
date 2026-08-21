import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  try {
    const { id } = await params
    const latestRun = await prisma.taskRun.findFirst({ where: { taskId: id }, orderBy: { createdAt: 'desc' } })
    if (!latestRun) return NextResponse.json({ events: [] })

    const events = await prisma.executionEvent.findMany({
      where: { taskRunId: latestRun.id },
      orderBy: { timestamp: 'asc' },
    })
    return NextResponse.json({ events, taskRunId: latestRun.id, status: latestRun.status })
  } catch (err) {
    console.error('[GET /api/tasks/[id]/events]', err)
    return NextResponse.json({ error: 'Internal server error', code: 'INTERNAL_ERROR' }, { status: 500 })
  }
}
