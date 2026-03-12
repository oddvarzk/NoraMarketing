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
  },
  {
    number: '02',
    title: 'Sosiale Medier',
    slug: 'sosiale-medier',
    excerpt:
      'Målrettet tilstedeværelse på riktige plattformer – fra strategi og innholdsproduksjon til analyse.',
  },
  {
    number: '03',
    title: 'SEO & SEM',
    slug: 'seo-sem',
    excerpt:
      'Organisk synlighet og betalt annonsering som gir målbar trafikk og lavere kostnad per konvertering.',
  },
  {
    number: '04',
    title: 'E-post Markedsføring',
    slug: 'epost-markedsforing',
    excerpt:
      'Automatiserte sekvenser og nyhetsbrev som pleier relasjoner og driver gjenkjøp.',
  },
  {
    number: '05',
    title: 'Analyse & Rapportering',
    slug: 'analyse-rapportering',
    excerpt:
      'Datadrevet innsikt med klare dashbords – slik at du alltid vet hva som fungerer.',
  },
  {
    number: '06',
    title: 'Digital Strategi',
    slug: 'digital-strategi',
    excerpt:
      'En helhetlig digital strategi som binder alle kanaler sammen og sikrer at innsatsen peker mot samme mål.',
  },
  {
    number: '07',
    title: 'Nettsideutvikling',
    slug: 'nettsideutvikling',
    excerpt:
      'Skreddersydde nettsider som ser unike ut og konverterer besøkende til kunder – raske, mobilvennlige og klare for vekst.',
  },
  {
    number: '08',
    title: 'Videoproduksjon',
    slug: 'videoproduksjon',
    excerpt:
      'Engasjerende videoinnhold som stopper scrollingen og forteller historien din – fra promofilm til sosiale medier-klipp.',
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-services-label]',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.9,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: '[data-services-label]', start: 'top 88%' },
        },
      )

      const rows = sectionRef.current?.querySelectorAll<HTMLElement>('[data-service-row]')
      rows?.forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            delay: i * 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 87%',
              toggleActions: 'play none none none',
            },
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
      className="max-w-7xl mx-auto px-6 py-24"
      aria-labelledby="services-heading"
    >
      <div className="flex items-center gap-4 mb-12">
        <span className="w-8 h-px bg-nm-accent" />
        <h2
          id="services-heading"
          data-services-label
          className="font-bespoke font-bold text-xs tracking-widest2 uppercase text-nm-fg"
        >
          Tjenester
        </h2>
      </div>

      <div className="border-t border-nm-border" />

      {SERVICES.map((service) => (
        <ServiceRow key={service.slug} service={service} />
      ))}
    </section>
  )
}

function ServiceRow({ service }: { service: (typeof SERVICES)[number] }) {
  const rowRef = useRef<HTMLAnchorElement>(null)

  const handleMouseEnter = () => {
    const row = rowRef.current
    if (!row) return
    gsap.to(row.querySelector('[data-bg-num]'), {
      opacity: 0.07, x: 0, duration: 0.4, ease: 'power2.out',
    })
    gsap.to(row.querySelector('[data-arrow]'), {
      x: 6, duration: 0.3, ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    const row = rowRef.current
    if (!row) return
    gsap.to(row.querySelector('[data-bg-num]'), {
      opacity: 0, x: -10, duration: 0.4, ease: 'power2.out',
    })
    gsap.to(row.querySelector('[data-arrow]'), {
      x: 0, duration: 0.3, ease: 'power2.out',
    })
  }

  return (
    <Link
      ref={rowRef}
      to={`/tjenester/${service.slug}`}
      data-service-row
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex items-center justify-between py-7 border-b border-nm-border/60 hover:border-nm-accent/30 transition-colors duration-300 overflow-hidden"
    >
      {/* Decorative bg number */}
      <span
        data-bg-num
        className="absolute right-20 top-1/2 font-bespoke font-bold text-8xl leading-none text-nm-fg pointer-events-none select-none opacity-0"
        style={{ transform: 'translateY(-50%) translateX(-10px)' }}
        aria-hidden="true"
      >
        {service.number}
      </span>

      <div className="flex items-center gap-6 md:gap-10">
        <span data-arrow className="text-nm-muted group-hover:text-nm-accent transition-colors duration-200">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="font-satoshi font-semibold text-xl md:text-2xl text-nm-fg group-hover:text-white transition-colors duration-200">
          {service.title}
        </span>
      </div>

      <div className="flex items-center gap-4 text-nm-muted">
        <span className="font-satoshi text-sm tabular-nums tracking-widest">{service.number}</span>
        <div className="hidden md:flex items-end gap-0.5 h-5">
          {[3, 5, 4, 6, 3].map((h, i) => (
            <span
              key={i}
              className="w-0.5 bg-nm-border group-hover:bg-nm-accent/50 transition-all duration-300 rounded-full"
              style={{ height: h * 3, transitionDelay: `${i * 30}ms` }}
            />
          ))}
        </div>
      </div>
    </Link>
  )
}
