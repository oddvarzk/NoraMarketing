import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import NMLogo from '../ui/NMLogo'

const NAV_LINKS = [
  { to: '/tjenester',  label: 'Tjenester'  },
  { to: '/prosjekter', label: 'Prosjekter' },
  { to: '/hvem-vi-er', label: 'Hvem vi er' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          scrolled || open
            ? 'bg-ink-900/90 backdrop-blur border-b border-ink-500/40 py-3'
            : 'py-5'
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between">
          <Link to="/" aria-label="Nora Marketing — hjem" className="relative z-50">
            <NMLogo />
          </Link>

          {/* Desktop links — centered */}
          <ul className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(l => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `font-ui text-[13px] tracking-wide transition-colors duration-200 ${
                      isActive ? 'text-ink-50' : 'text-ink-300 hover:text-ink-50'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Link to="/kontakt" className="group flex items-center gap-3">
              <span className="font-ui font-medium text-[13px] text-ink-50">
                Start et prosjekt
              </span>
              <span className="w-9 h-9 rounded-full border border-ink-500 flex items-center justify-center group-hover:border-accent-blue transition-colors duration-200">
                <span className="text-accent-blue text-xs">→</span>
              </span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
            aria-label={open ? 'Lukk meny' : 'Åpne meny'}
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            <span
              className="block w-6 h-px bg-ink-50 transition-all duration-300"
              style={{ transform: open ? 'translateY(3px) rotate(45deg)' : 'none' }}
            />
            <span
              className="block w-6 h-px bg-ink-50 transition-all duration-300"
              style={{ transform: open ? 'translateY(-3px) rotate(-45deg)' : 'none' }}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden fixed inset-0 z-30 bg-ink-900 pt-[68px] px-6 flex flex-col">
          <div className="border-t border-ink-500/40" />
          <nav className="flex-1 flex flex-col justify-center">
            <ul className="flex flex-col">
              {[...NAV_LINKS, { to: '/kontakt', label: 'Kontakt' }].map((l, i) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-5 py-6 border-b border-ink-500/30 group"
                  >
                    <span className="font-mono text-[10px] text-ink-400 tracking-widest2 w-7 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-4xl text-ink-50 group-hover:translate-x-1 transition-transform duration-200">
                      {l.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="pb-10 pt-6 border-t border-ink-500/30">
            <a href="tel:+4741160640" className="block font-ui text-sm text-ink-50 mb-1">
              +47 41 16 06 40
            </a>
            <a href="mailto:hei@noramarketing.no" className="block font-body text-sm text-ink-300">
              hei@noramarketing.no
            </a>
          </div>
        </div>
      )}
    </>
  )
}
