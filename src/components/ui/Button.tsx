import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

const variantClasses: Record<ButtonVariant, string> = {
  primary:   'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm',
  secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm',
  ghost:     'bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-900',
  danger:    'bg-white hover:bg-red-50 text-red-600 border border-red-200 shadow-sm',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-md',
  md: 'px-3.5 py-2 text-sm rounded-md',
  lg: 'px-5 py-2.5 text-sm rounded-md',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
}

export function Button({
  children,
  variant = 'secondary',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-1.5 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {loading && (
        <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
}
