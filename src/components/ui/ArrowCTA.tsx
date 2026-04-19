import { Link } from 'react-router-dom'

interface Props {
  to: string
  children: React.ReactNode
  variant?: 'line' | 'solid'
  className?: string
}

export default function ArrowCTA({ to, children, variant = 'line', className = '' }: Props) {
  if (variant === 'solid') {
    return (
      <Link
        to={to}
        className={`inline-flex items-center gap-3 bg-accent-blue text-white px-6 py-3.5 font-ui font-medium text-sm tracking-wide hover:opacity-90 transition-opacity ${className}`}
      >
        <span>{children}</span>
        <span>→</span>
      </Link>
    )
  }
  return (
    <Link to={to} className={`group inline-flex items-center gap-3 ${className}`}>
      <span className="font-ui font-medium text-[13px] tracking-wide text-ink-50 uppercase">
        {children}
      </span>
      <span className="h-px w-10 bg-ink-50 group-hover:w-16 transition-all duration-500" />
      <span className="text-accent-blue">→</span>
    </Link>
  )
}
