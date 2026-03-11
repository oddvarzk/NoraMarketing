import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SEO from '../components/ui/SEO'
import { SERVICES } from '../components/sections/ServicesSection'

gsap.registerPlugin(ScrollTrigger)

export default function Tjenester() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-hero-el]',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' },
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <SEO
        title="Tjenester"
        description="Utforsk alle tjenestene til Nora Marketing – fra innholdsmarkedsføring og sosiale medier til SEO, e-post og analyse."
        canonical="/tjenester"
      />

      {/* Page hero */}
      <div ref={heroRef} className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <div data-hero-el className="flex items-center gap-4 mb-6" style={{ opacity: 0 }}>
          <span className="w-8 h-px bg-nm-accent" />
          <span className="font-bespoke font-bold text-xs tracking-widest2 uppercase text-nm-fg">
            Tjenester
          </span>
        </div>

        <h1
          data-hero-el
          className="font-satoshi font-black text-6xl md:text-8xl lg:text-9xl text-nm-light leading-[0.95] mb-8"
          style={{ opacity: 0 }}
        >
          Alt du trenger for å <span className="text-gradient">vokse</span>.
        </h1>

        <p
          data-hero-el
          className="font-cabinet text-nm-muted text-xl max-w-2xl leading-relaxed"
          style={{ opacity: 0 }}
        >
          Vi tilbyr et komplett spekter av digitale markedsføringstjenester,
          skreddersydd for din bransje og dine mål.
        </p>
      </div>

      {/* Service cards */}
      <section className="px-6 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </section>
    </>
  )
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number]
  index: number
}) {
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: index * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        },
      )
    })
    return () => ctx.revert()
  }, [index])

  return (
    <Link
      ref={ref}
      to={`/tjenester/${service.slug}`}
      className="group flex flex-col gap-6 p-8 bg-nm-surface border border-nm-border/60 hover:border-nm-accent/50 rounded-sm transition-all duration-300 hover:-translate-y-1"
      style={{ opacity: 0 }}
    >
      <span className="font-bespoke font-bold text-4xl text-nm-accent/30 group-hover:text-nm-accent/60 transition-colors duration-300">
        {service.number}
      </span>

      <h2 className="font-satoshi font-bold text-xl text-nm-fg group-hover:text-white transition-colors duration-200">
        {service.title}
      </h2>

      <p className="font-cabinet text-nm-muted text-sm leading-relaxed flex-1">
        {service.excerpt}
      </p>

      <span className="flex items-center gap-2 text-nm-accent text-sm font-satoshi font-medium group-hover:gap-3 transition-all duration-200">
        Les mer
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  )
}
