import { useParams, Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import SEO from '../components/ui/SEO'
import CTABanner from '../components/sections/CTABanner'
import { SERVICES } from '../components/sections/ServicesSection'
import NotFound from './NotFound'

export default function TjenestePage() {
  const { slug } = useParams<{ slug: string }>()
  const service = SERVICES.find((s) => s.slug === slug)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!service) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-page-el]',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' },
      )
    }, heroRef)
    return () => ctx.revert()
  }, [service])

  if (!service) return <NotFound />

  const currentIndex = SERVICES.indexOf(service)
  const prev = SERVICES[currentIndex - 1]
  const next = SERVICES[currentIndex + 1]

  return (
    <>
      <SEO
        title={service.title}
        description={service.excerpt}
        canonical={`/tjenester/${service.slug}`}
      />

      <div ref={heroRef} className="pt-40 pb-20 px-6 max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav aria-label="Brødsmulesti" className="mb-10">
          <ol className="flex items-center gap-2 text-nm-muted text-sm font-cabinet">
            <li><Link to="/" className="hover:text-nm-fg transition-colors">Hjem</Link></li>
            <li aria-hidden>/</li>
            <li><Link to="/tjenester" className="hover:text-nm-fg transition-colors">Tjenester</Link></li>
            <li aria-hidden>/</li>
            <li className="text-nm-fg">{service.title}</li>
          </ol>
        </nav>

        <span
          data-page-el
          className="font-bespoke font-bold text-7xl text-nm-accent/20 block mb-4 leading-none"
          style={{ opacity: 0 }}
        >
          {service.number}
        </span>

        <h1
          data-page-el
          className="font-satoshi font-black text-5xl md:text-6xl text-nm-light leading-tight mb-8"
          style={{ opacity: 0 }}
        >
          {service.title}
        </h1>

        <p
          data-page-el
          className="font-cabinet text-nm-muted text-xl leading-relaxed max-w-2xl mb-16"
          style={{ opacity: 0 }}
        >
          {service.excerpt}
        </p>

        {/* Placeholder content block (replace with WP content) */}
        <div
          data-page-el
          className="prose prose-invert prose-lg max-w-none font-cabinet text-nm-muted leading-relaxed border-t border-nm-border/50 pt-12"
          style={{ opacity: 0 }}
        >
          <p>
            Innholdet for denne tjenesten hentes fra WordPress CMS. Koble til{' '}
            <code className="text-nm-accent bg-nm-surface px-1.5 py-0.5 rounded text-sm">
              VITE_WP_BASE_URL
            </code>{' '}
            i <code className="text-nm-accent bg-nm-surface px-1.5 py-0.5 rounded text-sm">.env</code>{' '}
            for å laste dynamisk innhold.
          </p>
        </div>

        {/* Prev / Next navigation */}
        <nav aria-label="Forrige / neste tjeneste" className="mt-20 flex gap-4">
          {prev && (
            <Link
              to={`/tjenester/${prev.slug}`}
              className="flex-1 flex items-center gap-3 p-5 border border-nm-border/60 hover:border-nm-accent/40 rounded-sm transition-all duration-200 group"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-nm-muted group-hover:text-nm-accent transition-colors" />
              </svg>
              <div>
                <p className="font-cabinet text-xs text-nm-muted mb-0.5">Forrige</p>
                <p className="font-satoshi font-semibold text-sm text-nm-fg">{prev.title}</p>
              </div>
            </Link>
          )}
          {next && (
            <Link
              to={`/tjenester/${next.slug}`}
              className="flex-1 flex items-center justify-end gap-3 p-5 border border-nm-border/60 hover:border-nm-accent/40 rounded-sm transition-all duration-200 group text-right"
            >
              <div>
                <p className="font-cabinet text-xs text-nm-muted mb-0.5">Neste</p>
                <p className="font-satoshi font-semibold text-sm text-nm-fg">{next.title}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-nm-muted group-hover:text-nm-accent transition-colors" />
              </svg>
            </Link>
          )}
        </nav>
      </div>

      <CTABanner />
    </>
  )
}
