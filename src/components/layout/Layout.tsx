import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './Navbar'
import Footer from './Footer'

gsap.registerPlugin(ScrollTrigger)

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Kill any pinned ScrollTrigger instances before the new page mounts
    ScrollTrigger.getAll().forEach(st => st.kill())
    window.scrollTo({ top: 0 })
    // Re-measure after new page components have set up their own triggers
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(raf)
  }, [pathname])

  return (
    <div className="grain flex flex-col min-h-dvh">
      <Navbar />
      {/* key forces full unmount of old page DOM (removes GSAP pin elements) before new page mounts */}
      <main key={pathname} className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
