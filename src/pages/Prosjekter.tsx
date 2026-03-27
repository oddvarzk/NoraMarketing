/**
 * Prosjekter – portfolio page
 *
 * Data source: WordPress CPT "prosjekter" (via wp.projects())
 * Falls back to FALLBACK_PROJECTS if WP is not yet configured.
 *
 * Each WP post should have:
 *   - Title          → project / client name
 *   - Featured Image → card image
 *   - Excerpt        → short description shown on hover
 *   - ACF fields:
 *       kategori  (text/select) e.g. "sosiale-medier"
 *       klient    (text)        client name
 *       aar       (text)        year e.g. "2024"
 *       tags      (text)        comma-separated: "Meta Ads, Kreativ"
 */

import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SEO from '../components/ui/SEO'
import { wp } from '../lib/wordpress'

gsap.registerPlugin(ScrollTrigger)

// ─── Types ────────────────────────────────────────────────────────────────────

interface Project {
  id: number
  slug: string
  title: string
  excerpt: string
  image: string | null
  kategori: string   // e.g. "sosiale-medier"
  klient: string
  aar: string
  tags: string[]
}

// ─── Category definitions ─────────────────────────────────────────────────────

const CATEGORY_META: Record<string, { label: string; number: string }> = {
  'sosiale-medier':         { label: 'Sosiale Medier',       number: '01' },
  'seo-sem':                { label: 'SEO & SEM',            number: '02' },
  'innholdsmarkedsforing':  { label: 'Innholdsmarkedsføring', number: '03' },
  'nettsideutvikling':      { label: 'Nettsideutvikling',    number: '04' },
  'digital-strategi':       { label: 'Digital Strategi',     number: '05' },
  'videoproduksjon':        { label: 'Videoproduksjon',      number: '06' },
}

const CATEGORY_ORDER = Object.keys(CATEGORY_META)

// ─── Fallback data (remove once WP CPT is live) ───────────────────────────────

const FALLBACK_PROJECTS: Project[] = [
  { id: 1,  slug: 'forma-studio-meta',    title: 'Forma Studio',     excerpt: 'Kampanjeoptimalisering som reduserte kostnad per kunde med 52 % på tre måneder.',   image: null, kategori: 'sosiale-medier',        klient: 'Forma Studio',     aar: '2024', tags: ['Meta Ads', 'A/B-testing'] },
  { id: 2,  slug: 'kvartett-innhold',     title: 'Kvartett AS',      excerpt: 'Redefinert innholdsstrategi som tredoblet engasjement på Instagram og TikTok.',       image: null, kategori: 'sosiale-medier',        klient: 'Kvartett AS',      aar: '2023', tags: ['Instagram', 'TikTok'] },
  { id: 3,  slug: 'vind-digital-reach',   title: 'Vind Digital',     excerpt: 'Fullstendig rebranding av sosiale kanaler med ×3.2 rekkevidde.',                       image: null, kategori: 'sosiale-medier',        klient: 'Vind Digital',     aar: '2024', tags: ['LinkedIn', 'Meta'] },
  { id: 4,  slug: 'helios-seo',           title: 'Helios AS',        excerpt: 'Teknisk SEO og innholdsstrategi som firedoblet organisk trafikk på 6 måneder.',        image: null, kategori: 'seo-sem',               klient: 'Helios AS',        aar: '2024', tags: ['SEO', 'Google'] },
  { id: 5,  slug: 'nordvik-leads',        title: 'Nordvik Eiendom',  excerpt: 'Google Ads-optimalisering som ga 340 % økning i kvalifiserte leads.',                  image: null, kategori: 'seo-sem',               klient: 'Nordvik Eiendom',  aar: '2024', tags: ['Google Ads', 'CRO'] },
  { id: 6,  slug: 'bergstrom-innhold',    title: 'Bergström Group',  excerpt: 'Innholdsrestrukturering og bloggstrategi økte tid på side med 95 %.',                  image: null, kategori: 'innholdsmarkedsforing', klient: 'Bergström Group',  aar: '2023', tags: ['Blogg', 'SEO'] },
  { id: 7,  slug: 'apex-leadgen',         title: 'Apex Group',       excerpt: 'Målrettet lead magnet-innhold som mer enn doblet konverteringsraten.',                  image: null, kategori: 'innholdsmarkedsforing', klient: 'Apex Group',       aar: '2024', tags: ['Lead gen', 'Innhold'] },
  { id: 8,  slug: 'solberg-nettside',     title: 'Solberg & Co',     excerpt: 'Fullstendig nettside-redesign som økte konverteringer med 210 %.',                     image: null, kategori: 'nettsideutvikling',     klient: 'Solberg & Co',     aar: '2024', tags: ['React', 'UX/UI'] },
  { id: 9,  slug: 'forma-performance',    title: 'Forma Studio',     excerpt: 'Fullstendig optimalisert nettside fra bunnen med 0.8 s lastetid.',                     image: null, kategori: 'nettsideutvikling',     klient: 'Forma Studio',     aar: '2023', tags: ['Performance', 'Vite'] },
  { id: 10, slug: 'nordvik-strategi',     title: 'Nordvik Eiendom',  excerpt: 'Full digital strategi og kanalplan som tredoblet gjennomsnittlig ROI.',                image: null, kategori: 'digital-strategi',      klient: 'Nordvik Eiendom',  aar: '2023', tags: ['Strategi', 'Vekst'] },
  { id: 11, slug: 'helios-budsjett',      title: 'Helios AS',        excerpt: 'Kanaloptimalisering som kuttet markedsbudsjettet med 40 % – med samme resultat.',     image: null, kategori: 'digital-strategi',      klient: 'Helios AS',        aar: '2023', tags: ['Budsjett', 'Effektivitet'] },
  { id: 12, slug: 'kvartett-video',       title: 'Kvartett AS',      excerpt: 'Viral merkevare-video som fikk 12 millioner visninger på TikTok og Reels.',           image: null, kategori: 'videoproduksjon',        klient: 'Kvartett AS',      aar: '2024', tags: ['TikTok', 'Reels'] },
  { id: 13, slug: 'vind-watchtime',       title: 'Vind Digital',     excerpt: 'Redesignet video-innholdsstrategi økte watch time med 320 %.',                         image: null, kategori: 'videoproduksjon',        klient: 'Vind Digital',     aar: '2024', tags: ['YouTube', 'Storytelling'] },
]

// ─── WP data mapper ───────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapWpProject(post: any): Project {
  const acf = post.acf ?? {}
  const embedded = post._embedded ?? {}
  const media = embedded['wp:featuredmedia']?.[0]
  const image = media?.source_url ?? null

  return {
    id: post.id,
    slug: post.slug,
    title: post.title?.rendered ?? '',
    excerpt: post.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim() ?? '',
    image,
    kategori: acf.kategori ?? 'sosiale-medier',
    klient: acf.klient ?? post.title?.rendered ?? '',
    aar: acf.aar ?? '',
    tags: typeof acf.tags === 'string'
      ? acf.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
      : [],
  }
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Prosjekter() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  // Fetch from WP, fall back to dummy data
  useEffect(() => {
    wp.projects()
      .then((posts) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mapped = (posts as any[]).map(mapWpProject)
        setProjects(mapped.length > 0 ? mapped : FALLBACK_PROJECTS)
      })
      .catch(() => setProjects(FALLBACK_PROJECTS))
      .finally(() => setLoading(false))
  }, [])

  // Hero entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('[data-p-hero]', { opacity: 0, y: 40 })
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .to('[data-p-hero]', { opacity: 1, y: 0, duration: 1.1, stagger: 0.1 }, 0)
    }, heroRef)
    return () => ctx.revert()
  }, [])

  // Group by category in the defined order
  const grouped = CATEGORY_ORDER.reduce<Record<string, Project[]>>((acc, key) => {
    const list = projects.filter((p) => p.kategori === key)
    if (list.length > 0) acc[key] = list
    return acc
  }, {})

  const visibleKeys = activeFilter
    ? ([activeFilter].filter((k) => grouped[k]))
    : Object.keys(grouped)

  return (
    <>
      <SEO
        title="Prosjekter"
        description="Et utvalg av hva vi har bygget, skapt og levert – på tvers av sosiale medier, SEO, innhold, strategi, nettside og video."
        canonical="/prosjekter"
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative flex flex-col justify-end overflow-hidden bg-nm-dark px-6 sm:px-12 lg:px-20 pb-16 pt-40"
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
            <span className="block text-nm-light">Noe av det</span>
            <span
              className="block"
              style={{ WebkitTextStroke: '2px rgba(232,232,238,0.55)', color: 'transparent' }}
            >
              vi har gjort.
            </span>
          </h1>

          <p
            data-p-hero
            className="font-cabinet text-nm-muted text-lg leading-relaxed max-w-lg"
            style={{ opacity: 0 }}
          >
            Et utvalg prosjekter vi har jobbet med – forskjellige kunder, forskjellige utfordringer.
          </p>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #0D0D0F)' }}
        />
      </section>

      {/* ── Filter bar ─────────────────────────────────────────────────── */}
      <div className="sticky top-[60px] z-30 bg-nm-dark/90 backdrop-blur-sm border-b border-nm-border/30">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-3">
            <FilterBtn label="Alle" active={activeFilter === null} onClick={() => setActiveFilter(null)} />
            {CATEGORY_ORDER.filter((k) => grouped[k]).map((key) => (
              <FilterBtn
                key={key}
                label={CATEGORY_META[key].label}
                active={activeFilter === key}
                onClick={() => setActiveFilter(activeFilter === key ? null : key)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <main className="bg-nm-dark pb-32">
        {loading ? (
          <div className="flex items-center justify-center py-40">
            <span className="font-cabinet text-nm-muted/50 text-sm tracking-wide">Laster prosjekter…</span>
          </div>
        ) : (
          visibleKeys.map((key) => (
            <CategorySection
              key={key}
              categoryKey={key}
              meta={CATEGORY_META[key]}
              projects={grouped[key]}
            />
          ))
        )}
      </main>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <div className="bg-nm-dark border-t border-nm-border/25 px-6 sm:px-12 lg:px-20 py-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <p className="font-satoshi font-black text-[clamp(1.5rem,3vw,2.5rem)] text-nm-light leading-tight">
            Klar for å bli neste<br />
            <span style={{ WebkitTextStroke: '1.5px rgba(232,232,238,0.5)', color: 'transparent' }}>
              suksesshistorie?
            </span>
          </p>
          <Link to="/kontakt" className="inline-flex items-center gap-3 group flex-shrink-0">
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

function CategorySection({
  categoryKey,
  meta,
  projects,
}: {
  categoryKey: string
  meta: { label: string; number: string }
  projects: Project[]
}) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-cat-hdr]',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-cat-hdr]', start: 'top 88%' } },
      )
      gsap.fromTo(
        '[data-proj-card]',
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.09, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-proj-card]', start: 'top 91%' } },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id={categoryKey}
      className="border-t border-nm-border/25 px-6 sm:px-12 lg:px-20 pt-18 pb-6"
      style={{ paddingTop: '4.5rem' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-5 mb-10">
          <span data-cat-hdr className="font-bespoke text-[10px] tracking-widest2 uppercase text-nm-accent/60 tabular-nums" style={{ opacity: 0 }}>
            {meta.number}
          </span>
          <span className="w-6 h-px bg-nm-border/50" />
          <h2 data-cat-hdr className="font-satoshi font-black text-[clamp(1.3rem,2.8vw,2.2rem)] text-nm-light tracking-tight" style={{ opacity: 0 }}>
            {meta.label}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 pb-14">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Project card (image-first) ───────────────────────────────────────────────

function ProjectCard({ project: p }: { project: Project }) {
  const cardRef = useRef<HTMLAnchorElement>(null)

  const handleEnter = () => {
    const card = cardRef.current
    if (!card) return
    gsap.to(card.querySelector('[data-card-overlay]'), { opacity: 1, duration: 0.35, ease: 'power2.out' })
    gsap.to(card.querySelector('[data-card-info]'), { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' })
    gsap.to(card.querySelector('[data-card-img]'), { scale: 1.04, duration: 0.6, ease: 'power2.out' })
  }

  const handleLeave = () => {
    const card = cardRef.current
    if (!card) return
    gsap.to(card.querySelector('[data-card-overlay]'), { opacity: 0, duration: 0.3 })
    gsap.to(card.querySelector('[data-card-info]'), { y: 12, opacity: 0, duration: 0.3, ease: 'power2.in' })
    gsap.to(card.querySelector('[data-card-img]'), { scale: 1, duration: 0.5, ease: 'power2.out' })
  }

  return (
    <Link
      to={`/prosjekter/${p.slug}`}
      ref={cardRef}
      data-proj-card
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group relative rounded-xl overflow-hidden bg-nm-surface border border-nm-border/50 hover:border-nm-accent/40 transition-colors duration-300 block"
      style={{ opacity: 0 }}
    >
      {/* Image area */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {p.image ? (
          <img
            data-card-img
            src={p.image}
            alt={p.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          /* Placeholder when no image is set yet */
          <div
            data-card-img
            className="w-full h-full flex items-center justify-center bg-nm-surface"
          >
            <span
              className="font-satoshi font-black text-nm-fg/[0.06] leading-none select-none"
              style={{ fontSize: 'clamp(3rem,8vw,6rem)' }}
            >
              {p.klient.charAt(0)}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div
          data-card-overlay
          className="absolute inset-0 bg-nm-dark/75 backdrop-blur-[2px] flex flex-col justify-end p-5"
          style={{ opacity: 0 }}
        >
          <div data-card-info style={{ opacity: 0, transform: 'translateY(12px)' }}>
            <p className="font-cabinet text-nm-muted/80 text-xs leading-relaxed mb-3">
              {p.excerpt}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-cabinet text-[10px] text-nm-fg/60 border border-nm-border/60 bg-nm-dark/60 px-2.5 py-0.5 rounded-full tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Card footer – always visible */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-nm-border/40">
        <div>
          <p className="font-satoshi font-semibold text-nm-fg text-sm leading-snug">
            {p.klient}
          </p>
          <p className="font-cabinet text-nm-muted/60 text-[11px] mt-0.5">
            {CATEGORY_META[p.kategori]?.label ?? p.kategori}
          </p>
        </div>
        <span className="font-bespoke text-[10px] text-nm-muted/40 tracking-widest flex-shrink-0">
          {p.aar}
        </span>
      </div>
    </Link>
  )
}
