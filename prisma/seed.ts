import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('pilot123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'admin@browserpilot.ai' },
    update: {},
    create: { email: 'admin@browserpilot.ai', name: 'Admin', password },
  })
  console.log('✓ Admin user ready:', user.email)
  console.log('  Password: pilot123')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
