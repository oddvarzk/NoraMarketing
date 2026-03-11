import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Custom magnetic cursor — only on pointer:fine devices (no mobile).
 * Adds/removes .custom-cursor on <body> so CSS can hide the default cursor.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const isVisible = useRef(false)

  useEffect(() => {
    // Only enable on devices with a precise pointer (mouse)
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current!
    const ring = ringRef.current!

    document.body.classList.add('custom-cursor')

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { x: pos.x, y: pos.y }

    let rafId: number

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY

      if (!isVisible.current) {
        isVisible.current = true
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
      }

      gsap.to(dot, { x: pos.x, y: pos.y, duration: 0.08, ease: 'power2.out' })
    }

    // Ring follows with spring-like lag
    const tick = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.12
      ringPos.y += (pos.y - ringPos.y) * 0.12
      gsap.set(ring, { x: ringPos.x, y: ringPos.y })
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    // Enlarge ring on interactive elements
    const onEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement
      const isLink = el.tagName === 'A' || el.tagName === 'BUTTON'
      gsap.to(ring, {
        scale: isLink ? 2.2 : 1.6,
        borderColor: 'rgba(75,110,245,0.8)',
        duration: 0.35,
        ease: 'power2.out',
      })
      gsap.to(dot, { scale: 0.4, duration: 0.2 })
    }

    const onLeave = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: 'rgba(75,110,245,0.4)',
        duration: 0.35,
        ease: 'power2.out',
      })
      gsap.to(dot, { scale: 1, duration: 0.2 })
    }

    const onLeaveWindow = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 })
      isVisible.current = false
    }

    const interactables = document.querySelectorAll('a, button, [data-cursor]')
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeaveWindow)

    return () => {
      document.body.classList.remove('custom-cursor')
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeaveWindow)
      cancelAnimationFrame(rafId)
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] w-2 h-2 bg-nm-accent rounded-full pointer-events-none opacity-0 mix-blend-difference"
        style={{ transform: 'translate(-50%,-50%)' }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] w-9 h-9 border border-nm-accent/40 rounded-full pointer-events-none opacity-0"
        style={{ transform: 'translate(-50%,-50%)' }}
      />
    </>
  )
}
