import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  try {
    const { id } = await params
    const latestRun = await prisma.taskRun.findFirst({
      where: { taskId: id },
      orderBy: { createdAt: 'desc' },
      include: { result: true },
    })
    if (!latestRun) return NextResponse.json({ result: null })
    return NextResponse.json({ result: latestRun.result })
  } catch (err) {
    console.error('[GET /api/tasks/[id]/result]', err)
    return NextResponse.json({ error: 'Internal server error', code: 'INTERNAL_ERROR' }, { status: 500 })
  }
}
