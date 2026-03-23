import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CASES = [
  {
    index: '01',
    client: 'Nordvik Eiendom',
    type: 'Digital strategi · Betalt annonsering',
    headline: '+340% kvalifiserte leads',
    metric: '340%',
    metricLabel: 'Leads',
    sub: 'på 90 dager',
    year: '2024',
    tags: ['Google Ads', 'Meta', 'Strategi'],
  },
  {
    index: '02',
    client: 'Helios AS',
    type: 'Innholdsmarkedsføring · SEO',
    headline: '×4 organisk trafikk',
    metric: '4×',
    metricLabel: 'Trafikk',
    sub: 'over 6 måneder',
    year: '2024',
    tags: ['SEO', 'Innhold', 'E-post'],
  },
  {
    index: '03',
    client: 'Forma Studio',
    type: 'Sosiale medier · Merkevarebygging',
    headline: '−52% kostnad per kunde',
    metric: '−52%',
    metricLabel: 'CPA',
    sub: 'ved kampanjeoptimalisering',
    year: '2023',
    tags: ['Meta Ads', 'Kreativ', 'Analyse'],
  },
]

export default function WorkTeaser() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        '[data-wt-header]',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-wt-header]', start: 'top 85%' },
        },
      )

      // Case cards stagger
      gsap.fromTo(
        '[data-wt-card]',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.85, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-wt-card]', start: 'top 88%' },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-32 px-6 sm:px-12 lg:px-20 bg-nm-dark border-t border-nm-border/25"
      aria-labelledby="work-teaser-heading"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-nm-warm" data-wt-header style={{ opacity: 0 }} />
              <span className="font-bespoke text-[10px] tracking-widest2 uppercase text-nm-warm" data-wt-header style={{ opacity: 0 }}>
                Utvalgte resultater
              </span>
            </div>
            <h2
              id="work-teaser-heading"
              data-wt-header
              className="font-satoshi font-black text-[clamp(2rem,5vw,4rem)] text-nm-light leading-[0.9] tracking-tight"
              style={{ opacity: 0 }}
            >
              Kunder.<br />
              <span style={{ WebkitTextStroke: '1px #E8E8EE', color: 'transparent' }}>
                Resultater.
              </span>{' '}
              <span className="text-nm-warm">Vekst.</span>
            </h2>
          </div>

          <Link
            to="/hvem-vi-er"
            data-wt-header
            className="inline-flex items-center gap-2 group flex-shrink-0"
            style={{ opacity: 0 }}
          >
            <span className="font-cabinet text-sm text-nm-muted group-hover:text-nm-fg transition-colors duration-200">
              Se alle prosjekter
            </span>
            <svg className="w-3.5 h-3.5 text-nm-muted group-hover:text-nm-accent group-hover:translate-x-0.5 transition-all duration-200" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M1 6h10M7 2l4 4-4 4" />
            </svg>
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {CASES.map((c, i) => (
            <CaseCard key={c.client} caseItem={c} isFirst={i === 0} />
          ))}
        </div>

        {/* Divider manifesto line */}
        <div className="mt-16 flex items-center gap-6 overflow-hidden">
          <div className="h-px flex-1 bg-nm-border/40" />
          <p className="font-bespoke text-[10px] tracking-widest2 text-nm-muted/30 uppercase whitespace-nowrap">
            Resultater over løfter · Alltid
          </p>
          <div className="h-px flex-1 bg-nm-border/40" />
        </div>

      </div>
    </section>
  )
}

function CaseCard({ caseItem: c, isFirst }: { caseItem: (typeof CASES)[number]; isFirst: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleEnter = () => {
    const card = cardRef.current
    if (!card) return
    gsap.to(card.querySelector('[data-metric]'), { y: -4, duration: 0.3, ease: 'power2.out' })
    gsap.to(card.querySelector('[data-card-border]'), { opacity: 1, duration: 0.3 })
  }

  const handleLeave = () => {
    const card = cardRef.current
    if (!card) return
    gsap.to(card.querySelector('[data-metric]'), { y: 0, duration: 0.3, ease: 'power2.out' })
    gsap.to(card.querySelector('[data-card-border]'), { opacity: 0, duration: 0.3 })
  }

  return (
    <div
      ref={cardRef}
      data-wt-card
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`group relative flex flex-col p-7 rounded-2xl border transition-colors duration-300 cursor-default overflow-hidden ${
        isFirst
          ? 'bg-nm-surface border-nm-border hover:border-nm-warm/40'
          : 'bg-nm-surface/40 border-nm-border/50 hover:border-nm-border'
      }`}
      style={{ opacity: 0 }}
    >
      {/* Hover accent border overlay */}
      <div
        data-card-border
        className="absolute inset-0 rounded-2xl ring-1 ring-nm-warm/20 pointer-events-none"
        style={{ opacity: 0 }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between mb-8">
        <span className="font-bespoke text-[10px] tracking-widest2 text-nm-muted/50 uppercase">
          {c.index}
        </span>
        <span className="font-cabinet text-[10px] text-nm-muted/40 tracking-wide">
          {c.year}
        </span>
      </div>

      {/* Big metric */}
      <div data-metric className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className={`font-satoshi font-black leading-none ${isFirst ? 'text-nm-warm' : 'text-nm-fg'}`}
            style={{ fontSize: 'clamp(2.5rem,5vw,3.5rem)' }}
          >
            {c.metric}
          </span>
        </div>
        <p className="font-cabinet text-nm-muted text-xs mt-1">{c.sub}</p>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-nm-border/50 mb-5" />

      {/* Client + type */}
      <p className="font-satoshi font-semibold text-nm-fg text-base leading-snug mb-1">
        {c.client}
      </p>
      <p className="font-cabinet text-nm-muted text-xs leading-relaxed mb-6">
        {c.type}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {c.tags.map((tag) => (
          <span
            key={tag}
            className="font-cabinet text-[10px] text-nm-fg/60 border border-nm-border/70 bg-nm-dark/50 px-3 py-1 rounded-full tracking-wide"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
