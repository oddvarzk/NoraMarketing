import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SEO from '../components/ui/SEO'

gsap.registerPlugin(ScrollTrigger)

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: 'sosiale-medier',
    label: 'Sosiale Medier',
    number: '01',
    description: 'Kampanjer og tilstedeværelse som engasjerer og bygger merkevare på tvers av plattformer.',
    projects: [
      {
        client: 'Forma Studio',
        year: '2024',
        headline: '−52 % kostnad per kunde',
        sub: 'ved kampanjeoptimalisering',
        tags: ['Meta Ads', 'Kreativ', 'A/B-testing'],
        metric: '−52%',
      },
      {
        client: 'Kvartett AS',
        year: '2023',
        headline: '+180 % engasjement',
        sub: 'på 60 dager med redefinert innholdsstrategi',
        tags: ['Instagram', 'TikTok', 'Strategi'],
        metric: '+180%',
      },
      {
        client: 'Vind Digital',
        year: '2024',
        headline: '×3.2 rekkevidde',
        sub: 'etter rebranding av sosiale kanaler',
        tags: ['LinkedIn', 'Meta', 'Innhold'],
        metric: '×3.2',
      },
    ],
  },
  {
    id: 'seo-sem',
    label: 'SEO & SEM',
    number: '02',
    description: 'Organisk synlighet og betalt annonsering som leverer målbar trafikk og lavere CPA.',
    projects: [
      {
        client: 'Helios AS',
        year: '2024',
        headline: '×4 organisk trafikk',
        sub: 'over 6 måneder med teknisk SEO og innhold',
        tags: ['SEO', 'Innhold', 'Google'],
        metric: '×4',
      },
      {
        client: 'Nordvik Eiendom',
        year: '2024',
        headline: '+340 % kvalifiserte leads',
        sub: 'gjennom Google Ads-optimalisering',
        tags: ['Google Ads', 'Søkestrategi', 'CRO'],
        metric: '+340%',
      },
    ],
  },
  {
    id: 'innholdsmarkedsforing',
    label: 'Innholdsmarkedsføring',
    number: '03',
    description: 'Strategisk innhold som bygger autoritet, tiltrekker de rette kundene og konverterer.',
    projects: [
      {
        client: 'Bergström Group',
        year: '2023',
        headline: '+95 % tid på side',
        sub: 'etter innholdsrestrukturering og bloggstrategi',
        tags: ['Blogg', 'E-post', 'SEO'],
        metric: '+95%',
      },
      {
        client: 'Apex Group',
        year: '2024',
        headline: '×2.7 konverteringsrate',
        sub: 'med målrettet lead magnet-innhold',
        tags: ['Lead gen', 'Innhold', 'Automasjon'],
        metric: '×2.7',
      },
    ],
  },
  {
    id: 'nettsideutvikling',
    label: 'Nettsideutvikling',
    number: '04',
    description: 'Skreddersydde nettsider som konverterer — raske, mobilvennlige og klare for vekst.',
    projects: [
      {
        client: 'Solberg & Co',
        year: '2024',
        headline: '+210 % konverteringer',
        sub: 'etter fullstendig nettside-redesign',
        tags: ['React', 'UX/UI', 'CRO'],
        metric: '+210%',
      },
      {
        client: 'Forma Studio',
        year: '2023',
        headline: '0.8 s lastetid',
        sub: 'fullstendig optimalisert nettside fra bunnen',
        tags: ['Performance', 'Core Web Vitals', 'Vite'],
        metric: '0.8s',
      },
    ],
  },
  {
    id: 'digital-strategi',
    label: 'Digital Strategi',
    number: '05',
    description: 'Helhetlige strategier som binder kanaler og aktiviteter mot samme vekstmål.',
    projects: [
      {
        client: 'Nordvik Eiendom',
        year: '2023',
        headline: '3× gjennomsnittlig ROI',
        sub: 'etter full digital strategi og kanalplan',
        tags: ['Strategi', 'Analyse', 'Vekst'],
        metric: '3×',
      },
      {
        client: 'Helios AS',
        year: '2023',
        headline: '−40 % markedsbudsjett',
        sub: 'med samme resultat etter kanaloptimalisering',
        tags: ['Budsjett', 'Effektivitet', 'Kanalmix'],
        metric: '−40%',
      },
    ],
  },
  {
    id: 'videoproduksjon',
    label: 'Videoproduksjon',
    number: '06',
    description: 'Videoinnhold som stopper scrollingen og forteller merkevarehistorien din.',
    projects: [
      {
        client: 'Kvartett AS',
        year: '2024',
        headline: '12 M visninger',
        sub: 'på viral merkevare-video på TikTok og Reels',
        tags: ['TikTok', 'Reels', 'Promofilm'],
        metric: '12M',
      },
      {
        client: 'Vind Digital',
        year: '2024',
        headline: '+320 % watch time',
        sub: 'etter redesign av video-innholdsstrategi',
        tags: ['YouTube', 'Storytelling', 'Kreativ'],
        metric: '+320%',
      },
    ],
  },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Prosjekter() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('[data-p-hero]', { opacity: 0, y: 40 })
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.to('[data-p-hero]', { opacity: 1, y: 0, duration: 1.1, stagger: 0.1 }, 0)
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const visible = activeFilter
    ? CATEGORIES.filter((c) => c.id === activeFilter)
    : CATEGORIES

  return (
    <>
      <SEO
        title="Prosjekter"
        description="Se hva vi har levert – resultater på tvers av sosiale medier, SEO, innhold, strategi, nettsideutvikling og videoproduksjon."
        canonical="/prosjekter"
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[52vh] flex flex-col justify-end overflow-hidden bg-nm-dark px-6 sm:px-12 lg:px-20 pb-16 pt-40"
      >
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-6" data-p-hero style={{ opacity: 0 }}>
            <span className="w-8 h-px bg-nm-accent" />
            <span className="font-bespoke text-[10px] tracking-widest2 uppercase text-nm-accent">
              Prosjekter
            </span>
          </div>

          <h1
            data-p-hero
            className="font-satoshi font-black leading-[0.88] tracking-tight mb-8"
            style={{ fontSize: 'clamp(2.8rem,8vw,8rem)', opacity: 0 }}
          >
            <span className="block text-nm-light">Arbeid vi</span>
            <span
              className="block"
              style={{
                WebkitTextStroke: '2px rgba(232,232,238,0.55)',
                color: 'transparent',
              }}
            >
              er stolte av.
            </span>
          </h1>

          <p
            data-p-hero
            className="font-cabinet text-nm-muted text-lg leading-relaxed max-w-lg"
            style={{ opacity: 0 }}
          >
            Reelle resultater for reelle kunder. Her er et utvalg av hva vi har bygget, skapt og levert.
          </p>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #0D0D0F)' }}
        />
      </section>

      {/* ── Category filter bar ────────────────────────────────────────── */}
      <div className="sticky top-[60px] z-30 bg-nm-dark/90 backdrop-blur-sm border-b border-nm-border/30">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-3">
            <FilterBtn
              label="Alle"
              active={activeFilter === null}
              onClick={() => setActiveFilter(null)}
            />
            {CATEGORIES.map((c) => (
              <FilterBtn
                key={c.id}
                label={c.label}
                active={activeFilter === c.id}
                onClick={() => setActiveFilter(activeFilter === c.id ? null : c.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Category sections ──────────────────────────────────────────── */}
      <main className="bg-nm-dark pb-32">
        {visible.map((cat) => (
          <CategorySection key={cat.id} category={cat} />
        ))}
      </main>

      {/* ── CTA strip ──────────────────────────────────────────────────── */}
      <div className="bg-nm-dark border-t border-nm-border/25 px-6 sm:px-12 lg:px-20 py-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <p className="font-satoshi font-black text-[clamp(1.5rem,3vw,2.5rem)] text-nm-light leading-tight">
              Klar for å bli neste<br />
              <span style={{ WebkitTextStroke: '1.5px rgba(232,232,238,0.5)', color: 'transparent' }}>
                suksesshistorie?
              </span>
            </p>
          </div>
          <Link
            to="/kontakt"
            className="inline-flex items-center gap-3 group flex-shrink-0"
          >
            <span className="font-satoshi font-semibold text-nm-fg text-sm tracking-wide group-hover:text-nm-accent transition-colors duration-200">
              Start et prosjekt
            </span>
            <span className="h-9 w-9 flex items-center justify-center rounded-full border border-nm-border/60 group-hover:border-nm-accent/40 transition-colors duration-300">
              <svg className="w-3.5 h-3.5 text-nm-muted group-hover:text-nm-accent transition-colors duration-200" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M1 6h10M7 2l4 4-4 4" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </>
  )
}

// ─── Filter button ────────────────────────────────────────────────────────────

function FilterBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 font-cabinet text-xs px-4 py-1.5 rounded-full border transition-all duration-200 ${
        active
          ? 'bg-nm-accent/10 border-nm-accent/50 text-nm-accent'
          : 'border-nm-border/50 text-nm-muted/70 hover:text-nm-fg hover:border-nm-border'
      }`}
    >
      {label}
    </button>
  )
}

// ─── Category section ─────────────────────────────────────────────────────────

function CategorySection({ category: cat }: { category: (typeof CATEGORIES)[number] }) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-cat-header]',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-cat-header]', start: 'top 88%' },
        },
      )
      gsap.fromTo(
        '[data-proj-card]',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-proj-card]', start: 'top 90%' },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id={cat.id}
      className="border-t border-nm-border/25 px-6 sm:px-12 lg:px-20 pt-20 pb-4"
    >
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 lg:gap-16 items-start mb-12">
          <div className="flex items-center gap-4 lg:pt-1" data-cat-header style={{ opacity: 0 }}>
            <span className="font-bespoke text-[10px] tracking-widest2 uppercase text-nm-accent/60 tabular-nums">
              {cat.number}
            </span>
            <span className="w-8 h-px bg-nm-border/60" />
          </div>

          <div data-cat-header style={{ opacity: 0 }}>
            <h2 className="font-satoshi font-black text-[clamp(1.5rem,3.5vw,2.8rem)] text-nm-light leading-tight tracking-tight mb-2">
              {cat.label}
            </h2>
            <p className="font-cabinet text-nm-muted text-sm leading-relaxed max-w-md">
              {cat.description}
            </p>
          </div>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 pb-16">
          {cat.projects.map((project, i) => (
            <ProjectCard key={project.client} project={project} accent={i === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({
  project: p,
  accent,
}: {
  project: (typeof CATEGORIES)[number]['projects'][number]
  accent: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleEnter = () => {
    const card = cardRef.current
    if (!card) return
    gsap.to(card.querySelector('[data-metric]'), { y: -4, duration: 0.3, ease: 'power2.out' })
    gsap.to(card.querySelector('[data-glow]'), { opacity: 1, duration: 0.35 })
  }

  const handleLeave = () => {
    const card = cardRef.current
    if (!card) return
    gsap.to(card.querySelector('[data-metric]'), { y: 0, duration: 0.3, ease: 'power2.out' })
    gsap.to(card.querySelector('[data-glow]'), { opacity: 0, duration: 0.35 })
  }

  return (
    <div
      ref={cardRef}
      data-proj-card
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`group relative flex flex-col p-7 rounded-2xl border overflow-hidden transition-colors duration-300 cursor-default ${
        accent
          ? 'bg-nm-surface border-nm-border hover:border-nm-accent/40'
          : 'bg-nm-surface/40 border-nm-border/50 hover:border-nm-border'
      }`}
      style={{ opacity: 0 }}
    >
      {/* Hover glow ring */}
      <div
        data-glow
        className="absolute inset-0 rounded-2xl ring-1 ring-nm-accent/20 pointer-events-none"
        style={{ opacity: 0 }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between mb-8">
        <span className="font-cabinet text-xs text-nm-muted/60 tracking-wide">
          {p.client}
        </span>
        <span className="font-bespoke text-[10px] text-nm-muted/40 tracking-widest">
          {p.year}
        </span>
      </div>

      {/* Metric */}
      <div data-metric className="mb-5">
        <span
          className={`font-satoshi font-black leading-none block ${accent ? 'text-nm-accent' : 'text-nm-fg'}`}
          style={{ fontSize: 'clamp(2.2rem,4.5vw,3rem)' }}
        >
          {p.metric}
        </span>
        <p className="font-cabinet text-nm-muted text-xs mt-1.5 leading-relaxed">
          {p.sub}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-nm-border/50 mb-5" />

      {/* Headline */}
      <p className="font-satoshi font-semibold text-nm-fg text-sm leading-snug mb-6">
        {p.headline}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {p.tags.map((tag) => (
          <span
            key={tag}
            className="font-cabinet text-[10px] text-nm-fg/50 border border-nm-border/60 bg-nm-dark/40 px-3 py-1 rounded-full tracking-wide"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
