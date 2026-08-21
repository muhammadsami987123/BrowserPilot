import type { TaskStatus, TaskRunStatus } from '@/types'

type BadgeVariant = 'default' | 'success' | 'error' | 'warning' | 'running' | 'info'

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-600 border border-gray-200',
  success: 'bg-green-50 text-green-700 border border-green-200',
  error:   'bg-red-50 text-red-700 border border-red-200',
  warning: 'bg-amber-50 text-amber-700 border border-amber-200',
  running: 'bg-blue-50 text-blue-700 border border-blue-200',
  info:    'bg-indigo-50 text-indigo-700 border border-indigo-200',
}

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  )
}

export function StatusBadge({ status }: { status: TaskStatus | TaskRunStatus }) {
  const map: Record<string, { variant: BadgeVariant; dot?: boolean; pulse?: boolean; label: string }> = {
    PENDING:   { variant: 'default',  label: 'Pending' },
    RUNNING:   { variant: 'running',  dot: true, pulse: true, label: 'Running' },
    COMPLETED: { variant: 'success',  dot: true, label: 'Completed' },
    FAILED:    { variant: 'error',    dot: true, label: 'Failed' },
    CANCELLED: { variant: 'warning',  dot: true, label: 'Cancelled' },
  }
  const cfg = map[status] ?? { variant: 'default' as BadgeVariant, label: status }
  return (
    <Badge variant={cfg.variant}>
      {cfg.dot && (
        <span className={`w-1.5 h-1.5 rounded-full bg-current ${cfg.pulse ? 'status-running' : ''}`} />
      )}
      {cfg.label}
    </Badge>
  )
}
