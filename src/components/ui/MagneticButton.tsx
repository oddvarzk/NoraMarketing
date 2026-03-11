import { useRef } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

interface Props {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const variants = {
  primary: 'bg-nm-accent text-white border border-nm-accent hover:bg-nm-accent-light hover:border-nm-accent-light',
  outline: 'border border-nm-border text-nm-fg hover:border-nm-accent',
}

const sizes = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3.5 text-sm',
  lg: 'px-9 py-4 text-base',
}

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const wrap = wrapRef.current
    if (!wrap) return
    const rect = wrap.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * 0.35
    const dy = (e.clientY - cy) * 0.35

    gsap.to(wrap, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' })
    gsap.to(innerRef.current, { x: dx * 0.15, y: dy * 0.15, duration: 0.4, ease: 'power2.out' })
  }

  const handleMouseLeave = () => {
    gsap.to(wrapRef.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' })
    gsap.to(innerRef.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' })
  }

  const base = `inline-flex items-center gap-2 font-satoshi font-medium rounded-sm transition-colors duration-200 ${variants[variant]} ${sizes[size]} ${className}`

  const content = (
    <div ref={wrapRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {href ? (
        <Link
          to={href}
          ref={innerRef as React.Ref<HTMLAnchorElement>}
          className={base}
        >
          {children}
        </Link>
      ) : (
        <button
          ref={innerRef as React.Ref<HTMLButtonElement>}
          onClick={onClick}
          className={base}
        >
          {children}
        </button>
      )}
    </div>
  )

  return content
}
