import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const SERVICES = [
  {
    number: '01',
    title: 'Innholdsmarkedsføring',
    slug: 'innholdsmarkedsforing',
    excerpt:
      'Strategisk innhold som bygger merkevare, tiltrekker kunder og konverterer besøkende til leads.',
    category: 'Innhold',
  },
  {
    number: '02',
    title: 'Sosiale Medier',
    slug: 'sosiale-medier',
    excerpt:
      'Målrettet tilstedeværelse på riktige plattformer – fra strategi og innholdsproduksjon til analyse.',
    category: 'Kanaler',
  },
  {
    number: '03',
    title: 'SEO & SEM',
    slug: 'seo-sem',
    excerpt:
      'Organisk synlighet og betalt annonsering som gir målbar trafikk og lavere kostnad per konvertering.',
    category: 'Søk',
  },
  {
    number: '04',
    title: 'Digital Strategi',
    slug: 'digital-strategi',
    excerpt:
      'En helhetlig digital strategi som binder alle kanaler sammen og sikrer at innsatsen peker mot samme mål.',
    category: 'Strategi',
  },
  {
    number: '05',
    title: 'Nettsideutvikling',
    slug: 'nettsideutvikling',
    excerpt:
      'Skreddersydde nettsider som ser unike ut og konverterer besøkende til kunder – raske, mobilvennlige og klare for vekst.',
    category: 'Utvikling',
  },
  {
    number: '06',
    title: 'Videoproduksjon',
    slug: 'videoproduksjon',
    excerpt:
      'Engasjerende videoinnhold som stopper scrollingen og forteller historien din – fra promofilm til sosiale medier-klipp.',
    category: 'Kreativ',
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-services-header]',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-services-header]', start: 'top 88%' },
        },
      )

      gsap.utils.toArray<HTMLElement>('[data-service-row]').forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, x: -32 },
          {
            opacity: 1, x: 0, duration: 0.65, delay: i * 0.04, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 88%', toggleActions: 'play none none none' },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="tjenester"
      className="py-32 px-6 sm:px-12 lg:px-20 border-t border-nm-border/25"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-end gap-8 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-nm-accent" data-services-header style={{ opacity: 0 }} />
              <span
                className="font-bespoke text-[10px] tracking-widest2 uppercase text-nm-accent"
                data-services-header
                id="services-heading"
                style={{ opacity: 0 }}
              >
                Tjenester
              </span>
            </div>
            <h2
              data-services-header
              className="font-erode font-bold text-[clamp(2rem,5vw,4rem)] text-nm-light leading-[0.9] tracking-tight"
              style={{ opacity: 0 }}
            >
              Alt du trenger.<br />
              <span className="text-nm-muted font-black">Ingenting mer.</span>
            </h2>
          </div>

          <p
            data-services-header
            className="font-cabinet text-nm-muted text-sm leading-relaxed max-w-xs lg:text-right"
            style={{ opacity: 0 }}
          >
            Skreddersydde løsninger. Ingen standardpakker – kun det som faktisk driver vekst for din bedrift.
          </p>
        </div>

        {/* Service list */}
        <div className="border-t border-nm-border/50">
          {SERVICES.map((service) => (
            <ServiceRow key={service.slug} service={service} />
          ))}
        </div>

        {/* Footer link */}
        <div className="mt-10 flex justify-end" data-services-header style={{ opacity: 0 }}>
          <Link
            to="/tjenester"
            className="inline-flex items-center gap-2 group font-cabinet text-sm text-nm-muted hover:text-nm-fg transition-colors duration-200"
          >
            <span>Alle tjenester</span>
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M1 6h10M7 2l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

function ServiceRow({ service }: { service: (typeof SERVICES)[number] }) {
  const rowRef = useRef<HTMLAnchorElement>(null)

  const handleMouseEnter = () => {
    const row = rowRef.current
    if (!row) return
    gsap.to(row.querySelector('[data-row-arrow]'), { x: 5, duration: 0.25, ease: 'power2.out' })
    gsap.to(row.querySelector('[data-row-excerpt]'), { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' })
    gsap.to(row.querySelector('[data-row-num]'), { color: '#1456CC', duration: 0.2 })
  }

  const handleMouseLeave = () => {
    const row = rowRef.current
    if (!row) return
    gsap.to(row.querySelector('[data-row-arrow]'), { x: 0, duration: 0.25, ease: 'power2.out' })
    gsap.to(row.querySelector('[data-row-excerpt]'), { opacity: 0, y: 6, duration: 0.25, ease: 'power2.in' })
    gsap.to(row.querySelector('[data-row-num]'), { color: '#6B6B80', duration: 0.2 })
  }

  return (
    <Link
      ref={rowRef}
      to={`/tjenester/${service.slug}`}
      data-service-row
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex items-center gap-4 py-6 border-b border-nm-border/40 hover:border-nm-border transition-colors duration-300"
      style={{ opacity: 0 }}
    >
      {/* Number */}
      <span
        data-row-num
        className="font-bespoke text-[10px] tracking-widest text-nm-muted/50 w-8 flex-shrink-0 transition-colors duration-200"
      >
        {service.number}
      </span>

      {/* Title + excerpt (appears on hover) */}
      <div className="flex-1 min-w-0">
        <span className="font-satoshi font-semibold text-lg md:text-xl text-nm-fg group-hover:text-white transition-colors duration-200 block leading-snug">
          {service.title}
        </span>
        <span
          data-row-excerpt
          className="font-cabinet text-nm-muted text-[12px] leading-relaxed block mt-1"
          style={{ opacity: 0, transform: 'translateY(6px)' }}
        >
          {service.excerpt}
        </span>
      </div>

      {/* Category pill */}
      <span className="hidden md:inline-flex font-cabinet text-[10px] text-nm-muted/50 border border-nm-border/50 px-3 py-1 rounded-full tracking-wide flex-shrink-0 group-hover:border-nm-accent/30 group-hover:text-nm-accent/70 transition-all duration-200">
        {service.category}
      </span>

      {/* Arrow */}
      <span data-row-arrow className="text-nm-muted/40 group-hover:text-nm-accent transition-colors duration-200 flex-shrink-0">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  )
}
