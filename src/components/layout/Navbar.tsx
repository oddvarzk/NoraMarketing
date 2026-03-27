import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import NMLogo from '../ui/NMLogo'

const DESKTOP_LINKS = [
  { label: 'Tjenester', href: '/tjenester' },
  { label: 'Prosjekter', href: '/prosjekter' },
  { label: 'Hvem vi er', href: '/hvem-vi-er' },
]

const MOBILE_LINKS = [
  { label: 'Tjenester', href: '/tjenester' },
  { label: 'Prosjekter', href: '/prosjekter' },
  { label: 'Hvem vi er', href: '/hvem-vi-er' },
  { label: 'Kontakt', href: '/kontakt' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const overlayRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLElement[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)

  // Close on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Scroll-aware header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // GSAP open/close animation
  useEffect(() => {
    const overlay = overlayRef.current
    const links = linksRef.current.filter(Boolean)
    const bottom = bottomRef.current
    if (!overlay) return

    if (menuOpen) {
      gsap.set(overlay, { display: 'flex' })
      const tl = gsap.timeline()
      tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' })
        .fromTo(
          links,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
          '-=0.1',
        )
        .fromTo(
          bottom,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
          '-=0.25',
        )
    } else {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => { gsap.set(overlay, { display: 'none' }) },
      })
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,padding] duration-500 ${
          scrolled || menuOpen
            ? 'bg-nm-dark border-b border-nm-border/50 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 relative flex items-center justify-between">
          {/* Logo */}
          <Link to="/" aria-label="Nora Marketing – hjem" className="flex-shrink-0 relative z-50">
            <NMLogo />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {DESKTOP_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    `font-cabinet text-sm tracking-wide transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-nm-muted hover:text-nm-fg'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop CTA + mobile hamburger */}
          <div className="flex items-center gap-4">
            <Link
              to="/kontakt"
              className="hidden md:inline-flex items-center px-5 py-2.5 bg-nm-accent text-white text-sm font-satoshi font-medium rounded-sm hover:bg-nm-accent-light transition-colors duration-200"
            >
              Ta kontakt
            </Link>

            {/* Hamburger / X */}
            <button
              aria-label={menuOpen ? 'Lukk meny' : 'Åpne meny'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-[7px]"
            >
              <span
                className="block h-[1.5px] bg-nm-fg rounded-full transition-all duration-300 origin-center"
                style={{
                  width: menuOpen ? '22px' : '22px',
                  transform: menuOpen ? 'translateY(4.25px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className="block h-[1.5px] bg-nm-fg rounded-full transition-all duration-300 origin-center"
                style={{
                  width: menuOpen ? '22px' : '16px',
                  transform: menuOpen ? 'translateY(-4.25px) rotate(-45deg)' : 'none',
                  opacity: 1,
                }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* ── MOBILE MENU OVERLAY ─────────────────────────────────────────── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-nm-dark flex-col"
        style={{ display: 'none', opacity: 0 }}
        aria-hidden={!menuOpen}
      >
        {/* Spacer for navbar height */}
        <div className="h-[68px] flex-shrink-0" />

        {/* Divider */}
        <div className="mx-6 border-t border-nm-border/40" />

        {/* Nav links */}
        <nav className="flex-1 flex flex-col justify-center px-6 py-8">
          <ul className="flex flex-col">
            {MOBILE_LINKS.map((link, i) => (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  ref={(el) => { if (el) linksRef.current[i] = el }}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `group flex items-center gap-5 py-6 border-b border-nm-border/30 transition-colors duration-200 ${
                      isActive ? 'text-nm-light' : 'text-nm-fg/60 hover:text-nm-light'
                    }`
                  }
                  style={{ opacity: 0 }}
                >
                  <span className="font-bespoke text-xs tracking-widest text-nm-accent/60 w-7 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-satoshi font-black text-4xl leading-none tracking-tight group-hover:translate-x-1 transition-transform duration-200">
                    {link.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom bar */}
        <div
          ref={bottomRef}
          className="px-6 pb-10 pt-6 border-t border-nm-border/30 flex items-center justify-between"
          style={{ opacity: 0 }}
        >
          <div className="flex flex-col gap-1">
            <span className="font-cabinet text-nm-muted text-xs tracking-widest uppercase">Kontakt</span>
            <a
              href="tel:+4741160640"
              className="font-satoshi font-medium text-nm-fg text-sm hover:text-nm-accent transition-colors"
            >
              +47 41 16 06 40
            </a>
          </div>
          <div className="flex items-center gap-3">
            {[
              { label: 'LinkedIn', href: 'https://linkedin.com', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
              { label: 'Instagram', href: 'https://instagram.com', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg> },
              { label: 'TikTok', href: 'https://tiktok.com', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.22 8.22 0 004.84 1.56V6.79a4.85 4.85 0 01-1.07-.1z" /></svg> },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-nm-border/60 text-nm-muted hover:text-nm-accent hover:border-nm-accent/40 transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
