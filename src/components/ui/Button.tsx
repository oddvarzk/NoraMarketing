import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  external?: boolean
}

const variants = {
  primary: 'bg-nm-accent text-white hover:bg-nm-accent-light',
  outline: 'border border-nm-border text-nm-fg hover:border-nm-accent hover:text-nm-accent-light',
  ghost: 'text-nm-fg hover:text-nm-accent-light',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  external = false,
}: Props) {
  const base = `inline-flex items-center gap-2 font-satoshi font-medium rounded-sm transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={base}>
        {children}
      </a>
    )
  }

  if (href) {
    return (
      <Link to={href} className={base}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={base}>
      {children}
    </button>
  )
}
