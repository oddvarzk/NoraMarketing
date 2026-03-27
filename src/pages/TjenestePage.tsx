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
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!service) return
    const ctx = gsap.context(() => {
      gsap.set('[data-page-el]', { opacity: 0, y: 40 })
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .to('[data-page-el]', { opacity: 1, y: 0, duration: 1, stagger: 0.13 }, 0)
    }, pageRef)
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

      <div ref={pageRef}>

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <div className="relative pt-36 pb-24 px-6 sm:px-10 lg:px-16 border-b border-nm-border/30 overflow-hidden">

          {/* Ghost number watermark */}
          <div
            className="absolute bottom-0 right-0 font-bespoke font-bold leading-none pointer-events-none select-none"
            style={{
              fontSize: 'clamp(120px, 22vw, 320px)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(75,110,245,0.06)',
              transform: 'translate(8%, 30%)',
              letterSpacing: '-0.03em',
            }}
            aria-hidden="true"
          >
            {service.number}
          </div>

          <div className="max-w-5xl mx-auto">

            {/* Breadcrumb */}
            <nav aria-label="Brødsmulesti" className="mb-12" data-page-el style={{ opacity: 0 }}>
              <ol className="flex items-center gap-2 font-cabinet text-xs text-nm-muted">
                <li><Link to="/" className="hover:text-nm-fg transition-colors duration-150">Hjem</Link></li>
                <li aria-hidden className="text-nm-border">/</li>
                <li><Link to="/tjenester" className="hover:text-nm-fg transition-colors duration-150">Tjenester</Link></li>
                <li aria-hidden className="text-nm-border">/</li>
                <li className="text-nm-fg/60">{service.title}</li>
              </ol>
            </nav>

            {/* Eyebrow */}
            <div data-page-el className="flex items-center gap-3 mb-6" style={{ opacity: 0 }}>
              <span className="w-8 h-px bg-nm-accent" />
              <span className="font-bespoke text-[10px] tracking-widest2 uppercase text-nm-accent">
                {service.number}
              </span>
              {service.category && (
                <>
                  <span className="text-nm-border text-xs">·</span>
                  <span className="font-cabinet text-[10px] text-nm-muted/60 tracking-wide uppercase">
                    {service.category}
                  </span>
                </>
              )}
            </div>

            {/* Title */}
            <h1
              data-page-el
              className="font-satoshi font-black leading-[0.88] tracking-tight mb-8"
              style={{ fontSize: 'clamp(2.5rem,7vw,6rem)', opacity: 0 }}
            >
              <span className="text-nm-light">{service.title.split(' ').slice(0, -1).join(' ')}</span>{' '}
              <span className="text-nm-accent">{service.title.split(' ').slice(-1)[0]}</span>
            </h1>

            {/* Excerpt */}
            <p
              data-page-el
              className="font-cabinet text-nm-muted text-lg md:text-xl leading-relaxed max-w-2xl"
              style={{ opacity: 0 }}
            >
              {service.excerpt}
            </p>
          </div>
        </div>

        {/* ── CONTENT AREA ─────────────────────────────────────────────── */}
        <div className="py-20 px-6 sm:px-10 lg:px-16">
          <div className="max-w-5xl mx-auto">

            {/* WP content placeholder */}
            <div
              data-page-el
              className="border border-nm-border/40 bg-nm-surface/20 rounded-2xl p-10 text-center"
              style={{ opacity: 0 }}
            >
              <p className="font-bespoke text-2xl text-nm-accent/20 mb-3">CMS</p>
              <p className="font-cabinet text-nm-muted text-sm">
                Innhold hentes fra WordPress – koble til{' '}
                <code className="font-mono text-nm-accent/60 text-xs bg-nm-accent/5 px-1.5 py-0.5 rounded">
                  VITE_WP_BASE_URL
                </code>{' '}
                i .env for å aktivere.
              </p>
            </div>

          </div>
        </div>

        {/* ── PREV / NEXT ───────────────────────────────────────────────── */}
        <div className="px-6 sm:px-10 lg:px-16 pb-20">
          <div className="max-w-5xl mx-auto border-t border-nm-border/40 pt-10">
            <p className="font-bespoke text-[9px] tracking-widest2 uppercase text-nm-muted/40 mb-6">
              Andre tjenester
            </p>
            <nav aria-label="Forrige / neste tjeneste" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prev && (
                <Link
                  to={`/tjenester/${prev.slug}`}
                  className="group flex items-center gap-4 p-5 border border-nm-border/50 hover:border-nm-accent/30 rounded-xl transition-all duration-200"
                >
                  <svg className="w-4 h-4 text-nm-muted group-hover:text-nm-accent transition-colors duration-200 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                    <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div>
                    <p className="font-cabinet text-[10px] text-nm-muted/50 uppercase tracking-widest mb-0.5">Forrige</p>
                    <p className="font-satoshi font-semibold text-sm text-nm-fg group-hover:text-white transition-colors duration-200">{prev.title}</p>
                  </div>
                </Link>
              )}
              {next && (
                <Link
                  to={`/tjenester/${next.slug}`}
                  className="group flex items-center justify-end gap-4 p-5 border border-nm-border/50 hover:border-nm-accent/30 rounded-xl transition-all duration-200 text-right sm:col-start-2"
                >
                  <div>
                    <p className="font-cabinet text-[10px] text-nm-muted/50 uppercase tracking-widest mb-0.5">Neste</p>
                    <p className="font-satoshi font-semibold text-sm text-nm-fg group-hover:text-white transition-colors duration-200">{next.title}</p>
                  </div>
                  <svg className="w-4 h-4 text-nm-muted group-hover:text-nm-accent transition-colors duration-200 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              )}
            </nav>
          </div>
        </div>

        <CTABanner />
      </div>
    </>
  )
}
