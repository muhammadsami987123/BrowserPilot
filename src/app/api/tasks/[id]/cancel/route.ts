import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  try {
    const { id } = await params
    const task = await prisma.task.findUnique({ where: { id } })
    if (!task) return NextResponse.json({ error: 'Task not found', code: 'NOT_FOUND' }, { status: 404 })

    await prisma.task.update({ where: { id }, data: { status: 'CANCELLED' } })
    await prisma.taskRun.updateMany({
      where: { taskId: id, status: { in: ['PENDING', 'RUNNING'] } },
      data: { status: 'CANCELLED', completedAt: new Date() },
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[POST /api/tasks/[id]/cancel]', err)
    return NextResponse.json({ error: 'Internal server error', code: 'INTERNAL_ERROR' }, { status: 500 })
  }
}
