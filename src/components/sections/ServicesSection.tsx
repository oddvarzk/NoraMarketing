import { Link } from 'react-router-dom'
import { useGSAPContext, ScrollTrigger } from '../../hooks/useGSAP'
import gsap from 'gsap'

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
]

export default function ServicesSection() {
  const containerRef = useGSAPContext<HTMLElement>((ctx) => {
    ctx.add(() => {
      const rows = document.querySelectorAll<HTMLElement>('[data-service-row]')
      rows.forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            delay: i * 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        )
      })
    })
  })

  return (
    <section
      ref={containerRef}
      id="tjenester"
      className="max-w-7xl mx-auto px-6 py-24"
      aria-labelledby="services-heading"
    >
      {/* Section label */}
      <div className="flex items-center gap-4 mb-12">
        <span className="w-8 h-px bg-nm-accent" />
        <h2
          id="services-heading"
          className="font-bespoke font-bold text-xs tracking-widest2 uppercase text-nm-fg"
        >
          Tjenester
        </h2>
      </div>

      {/* Divider line */}
      <div className="border-t border-nm-border" />

      {/* Rows */}
      {SERVICES.map((service) => (
        <ServiceRow key={service.slug} service={service} />
      ))}
    </section>
  )
}

function ServiceRow({ service }: { service: (typeof SERVICES)[number] }) {
  return (
    <Link
      to={`/tjenester/${service.slug}`}
      data-service-row
      className="group flex items-center justify-between py-7 border-b border-nm-border/60 hover:border-nm-accent/40 transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-center gap-6 md:gap-10">
        {/* Arrow */}
        <span className="text-nm-muted group-hover:text-nm-accent group-hover:translate-x-1 transition-all duration-300">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M4 10h12M11 5l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="font-satoshi font-semibold text-xl md:text-2xl text-nm-fg group-hover:text-white transition-colors duration-200">
          {service.title}
        </span>
      </div>

      {/* Number + bars */}
      <div className="flex items-center gap-4 text-nm-muted">
        <span className="font-satoshi text-sm tracking-widest">{service.number}</span>
        <div className="hidden md:flex items-end gap-0.5 h-5">
          {[3, 5, 4, 6, 3].map((h, i) => (
            <span
              key={i}
              style={{ height: h * 3 }}
              className="w-0.5 bg-nm-border group-hover:bg-nm-accent/60 transition-colors duration-300 rounded-full"
            />
          ))}
        </div>
      </div>
    </Link>
  )
}
