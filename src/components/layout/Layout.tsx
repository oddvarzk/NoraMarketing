import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './Navbar'
import Footer from './Footer'

gsap.registerPlugin(ScrollTrigger)

function scrollToTop() {
  // Reset every possible scroll container
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

export default function Layout() {
  const { pathname } = useLocation()
  const containerRef = useRef<HTMLDivElement>(null)

  // Fire before paint so the user never sees the old scroll position
  useLayoutEffect(() => {
    scrollToTop()
    if (containerRef.current) containerRef.current.scrollTop = 0
  }, [pathname])

  // Also reset after effects settle (covers any post-mount scroll drift)
  useEffect(() => {
    ScrollTrigger.clearScrollMemory()
    scrollToTop()
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
    return () => cancelAnimationFrame(raf)
  }, [pathname])

  return (
    <div ref={containerRef} className="grain flex flex-col min-h-dvh">
      <Navbar />
      {/* key forces full unmount of old page DOM (removes GSAP pin elements) before new page mounts */}
      <main key={pathname} className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
