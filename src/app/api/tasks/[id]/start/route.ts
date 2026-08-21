import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'
import { TaskOrchestrator } from '@/lib/orchestrator/task-orchestrator'

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  try {
    const { id } = await params
    const task = await prisma.task.findUnique({ where: { id } })
    if (!task) return NextResponse.json({ error: 'Task not found', code: 'NOT_FOUND' }, { status: 404 })
    if (task.status === 'RUNNING') return NextResponse.json({ error: 'Task is already running', code: 'ALREADY_RUNNING' }, { status: 409 })

    // Update task status to RUNNING
    await prisma.task.update({ where: { id }, data: { status: 'RUNNING' } })

    // Run orchestrator in background (fire and forget)
    const orchestrator = new TaskOrchestrator()
    orchestrator.runTask(id).catch((err) => console.error('[TaskOrchestrator]', err))

    return NextResponse.json({ success: true, message: 'Task started' })
  } catch (err) {
    console.error('[POST /api/tasks/[id]/start]', err)
    return NextResponse.json({ error: 'Internal server error', code: 'INTERNAL_ERROR' }, { status: 500 })
  }
}
