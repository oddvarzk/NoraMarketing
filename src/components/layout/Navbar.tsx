import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import NMLogo from '../ui/NMLogo'

const NAV_LINKS = [
  { label: 'Tjenester', href: '/tjenester' },
  { label: 'Hvem vi er', href: '/hvem-vi-er' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-nm-dark/90 backdrop-blur-md border-b border-nm-border/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 relative flex items-center justify-between">
        {/* Logo */}
        <Link to="/" aria-label="Nora Marketing – hjem" className="flex-shrink-0">
          <NMLogo />
        </Link>

        {/* Desktop links — truly centered on the nav bar */}
        <ul className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((link) => (
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

        {/* CTA + hamburger */}
        <div className="flex items-center gap-4">
          <Link
            to="/kontakt"
            className="hidden md:inline-flex items-center px-5 py-2.5 bg-nm-accent text-white text-sm font-satoshi font-medium rounded-sm hover:bg-nm-accent-light transition-colors duration-200"
          >
            Ta kontakt
          </Link>

          <button
            aria-label={menuOpen ? 'Lukk meny' : 'Åpne meny'}
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-1"
          >
            <span
              className={`block h-px w-6 bg-nm-fg transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block h-px w-6 bg-nm-fg transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-px w-6 bg-nm-fg transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${menuOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <ul className="px-6 pb-6 pt-4 flex flex-col gap-6 border-t border-nm-border/40 mt-3">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  `font-satoshi text-lg ${isActive ? 'text-white' : 'text-nm-muted'}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link
              to="/kontakt"
              className="inline-flex items-center px-5 py-3 bg-nm-accent text-white text-sm font-satoshi font-medium rounded-sm"
            >
              Ta kontakt
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
