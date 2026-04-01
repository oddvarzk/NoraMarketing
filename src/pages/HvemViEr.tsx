import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SEO from '../components/ui/SEO'
import CTABanner from '../components/sections/CTABanner'
import Button from '../components/ui/Button'
import { wp } from '../lib/wordpress'

gsap.registerPlugin(ScrollTrigger)

// ─── Types ───────────────────────────────────────────────────────────────────

interface TeamMember {
  id: string
  name: string
  role: string
  image: string | null
  initials: string
  bio: string
  specialties: string[]


}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapWpTeamMember(post: any): TeamMember {
  const acf      = post.acf ?? {}
  const embedded = post._embedded ?? {}
  const media    = embedded['wp:featuredmedia']?.[0]

  return {
    id:          post.slug ?? String(post.id),
    name:        post.title?.rendered ?? '',
    role:        acf.rolle ?? '',
    image:       media?.source_url ?? null,
    initials:    acf.initialer ?? (post.title?.rendered ?? '??').slice(0, 2).toUpperCase(),
    bio:         acf.bio ?? '',
    specialties: typeof acf.spesialisering === 'string'
                   ? acf.spesialisering.split(',').map((s: string) => s.trim()).filter(Boolean)
                   : [],
  }
}

const VALUES = [
  {
    number: '01',
    title: 'Enkelhet',
    body: 'Strategisk enkelhet over kompleksitet for kompleksitetens skyld. Vi fjerner støyen og fokuserer på det som faktisk beveger nålen.',
  },
  {
    number: '02',
    title: 'Autentisitet',
    body: 'Ærlig, direkte kommunikasjon som gjenspeiler skandinaviske verdier og bygger ekte, varige forbindelser.',
  },
  {
    number: '03',
    title: 'Klarhet',
    body: 'Klare budskap som gjør komplekse markedsføringskonsepter enkle å forstå – for deg og for dine kunder.',
  },
  {
    number: '04',
    title: 'Resultater',
    body: 'Fokus på utfall, ikke funksjoner. Markedsføring som faktisk fungerer for din bedrift og din bunnlinje.',
  },
]

const APPROACH = [
  {
    number: '01',
    title: 'Strategisk oppdagelse',
    body: 'Vi starter med dyp forståelse av din bedrift, målgruppe og markedsposisjon – ingen løsninger før vi kjenner problemet.',
  },
  {
    number: '02',
    title: 'Klar kommunikasjon',
    body: 'Hver kampanje bygges på et presist budskap som treffer målgruppen din uten jargong eller støy.',
  },
  {
    number: '03',
    title: 'Datadrevet innsikt',
    body: 'Vi bruker analyser for å informere strategi, men lar aldri tall alene overskygge det menneskelige bildet.',
  },
  {
    number: '04',
    title: 'Kontinuerlig forbedring',
    body: 'Markedsføring er ikke sett-det-og-glem-det. Vi optimaliserer løpende basert på ytelse og tilbakemeldinger.',
  },
  {
    number: '05',
    title: 'Samarbeidende partnerskap',
    body: 'Vi jobber tett med deg som ekte partnere, ikke leverandører. Dine mål er våre mål.',
  },
  {
    number: '06',
    title: 'Målbar suksess',
    body: 'Klare KPIer og transparente rapporter – slik at du alltid vet nøyaktig hvilken verdi vi leverer.',
  },
]

const HISTORY_PARAS = [
  'Vi startet Nora Marketing fordi vi var lei av oppblåst markedsføringsprat. God markedsføring handler om å være tydelig og ærlig – ikke om å lage mest mulig støy. Vi mente bedrifter fortjente partnere som holder ting enkelt og leverer det de lover.',
  'Vi har funnet balansen mellom god design og praktisk markedsføring. Ikke for stivt og formelt, men heller ikke for løst og ustrukturert. Vi liker å jobbe med bedrifter som vil ha reell hjelp, ikke fancy presentasjoner som samler støv.',
  'I dag hjelper vi primært SMB-bedrifter med å finne sin stemme i markedet. Det handler om å være tydelig på hvem du er og hva du tilbyr – med en profil som balanserer tilgjengelighet og profesjonalitet, slik at kundene dine vet de er i trygge hender.',
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HvemViEr() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [team, setTeam] = useState<TeamMember[]>([])
  const [teamLoading, setTeamLoading] = useState(true)
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null)

  useEffect(() => {
    wp.team()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((posts: any[]) => setTeam(posts.map(mapWpTeamMember)))
      .catch(() => {})
      .finally(() => setTeamLoading(false))
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('[data-hero-el]', { opacity: 0, y: 48 })
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .to('[data-hero-el]', { opacity: 1, y: 0, duration: 1, stagger: 0.13 }, 0)

      gsap.fromTo(
        '[data-hist-label]',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.9, ease: 'power3.inOut',
          scrollTrigger: { trigger: '[data-hist-label]', start: 'top 88%' },
        },
      )

      gsap.utils.toArray<HTMLElement>('[data-hist-para]').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.07,
            scrollTrigger: { trigger: el, start: 'top 88%' },
          },
        )
      })

      gsap.fromTo(
        '[data-value-card]',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.09, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-value-card]', start: 'top 87%' },
        },
      )

      gsap.utils.toArray<HTMLElement>('[data-approach-row]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0, duration: 0.65, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 89%' },
          },
        )
      })

      gsap.fromTo(
        '[data-mission-el]',
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-mission-el]', start: 'top 85%' },
        },
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  // Run team card animation after WP data loads
  useEffect(() => {
    if (team.length === 0) return
    const cards = gsap.utils.toArray<HTMLElement>('[data-team-card]')
    if (cards.length === 0) return
    gsap.fromTo(
      cards,
      { opacity: 0, y: 36 },
      {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: cards[0], start: 'top 88%' },
      },
    )
  }, [team])

  return (
    <>
      <SEO
        title="Hvem vi er"
        description="Lær om teamet bak Nora Marketing – et markedsføringsbyrå grunnlagt på ærlighet, enkelhet og målbare resultater."
        canonical="/hvem-vi-er"
      />

      <div ref={pageRef}>

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <div className="relative pt-36 pb-24 px-6 sm:px-10 lg:px-16 border-b border-nm-border/30 overflow-hidden">
          <div
            className="absolute top-1/2 right-0 font-bespoke font-bold leading-none pointer-events-none select-none"
            style={{
              fontSize: 'clamp(120px, 20vw, 300px)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(75,110,245,0.05)',
              transform: 'translate(10%, -50%)',
              letterSpacing: '-0.02em',
            }}
            aria-hidden="true"
          >
            NM
          </div>

          <div className="max-w-7xl mx-auto">
            <div data-hero-el className="flex items-center gap-3 mb-8" style={{ opacity: 0 }}>
              <span className="w-8 h-px bg-nm-accent" />
              <span className="font-bespoke text-[10px] tracking-widest2 uppercase text-nm-accent">
                Hvem vi er
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 items-end">
              <h1
                data-hero-el
                className="font-erode font-bold leading-[0.88] tracking-tight text-nm-light"
                style={{ fontSize: 'clamp(3rem,8vw,7rem)', opacity: 0 }}
              >
                Vi er<br />
                Nora{' '}
                <span className="text-nm-accent">Marketing.</span>
              </h1>

              <p
                data-hero-el
                className="font-cabinet text-nm-muted text-lg leading-relaxed lg:pb-1"
                style={{ opacity: 0 }}
              >
                Et markedsføringsbyrå grunnlagt på troen om at ærlighet, enkelhet og datadrevne beslutninger er det eneste som virkelig fungerer over tid.
              </p>
            </div>
          </div>
        </div>

        {/* ── VÅR HISTORIE ─────────────────────────────────────────────── */}
        <section aria-labelledby="history-heading" className="py-28 px-6 sm:px-10 lg:px-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">
            <div className="lg:pt-1">
              <span
                data-hist-label
                className="font-bespoke text-[10px] tracking-widest2 uppercase text-nm-accent block mb-5"
                style={{ clipPath: 'inset(0 100% 0 0)' }}
              >
                Vår Historie
              </span>
              <h2
                id="history-heading"
                className="font-erode font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] text-nm-light leading-[0.92] tracking-tight"
              >
                Ekte hjelp,<br />
                <span style={{ WebkitTextStroke: '1px #F4F4F8', color: 'transparent' }}>
                  uten støy.
                </span>
              </h2>
            </div>

            <div className="flex flex-col gap-7 border-l border-nm-border/40 pl-8 lg:pl-12">
              {HISTORY_PARAS.map((para, i) => (
                <p
                  key={i}
                  data-hist-para
                  className="font-cabinet text-nm-muted text-lg leading-relaxed"
                  style={{ opacity: 0 }}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEAMET ───────────────────────────────────────────────────── */}
        <section
          aria-labelledby="team-heading"
          className="py-28 px-6 sm:px-10 lg:px-16 border-t border-nm-border/30"
        >
          <div className="max-w-7xl mx-auto">

            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20 mb-16">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-nm-accent" />
                  <span className="font-bespoke text-[10px] tracking-widest2 uppercase text-nm-accent">
                    Teamet
                  </span>
                </div>
                <h2
                  id="team-heading"
                  className="font-erode font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] text-nm-light leading-[0.92] tracking-tight"
                >
                  Folkene<br />
                  <span style={{ WebkitTextStroke: '1px #F4F4F8', color: 'transparent' }}>
                    bak arbeidet.
                  </span>
                </h2>
              </div>

              <p className="font-cabinet text-nm-muted text-base leading-relaxed max-w-lg lg:pt-1 self-end">
                Vi er et lite, dedikert team som setter seg grundig inn i hvert eneste kundeforhold. Klikk på en person for å lære mer.
              </p>
            </div>

            {/* Team grid */}
            {teamLoading ? (
              <div className="flex items-center justify-center py-20">
                <span className="font-cabinet text-nm-muted/50 text-sm tracking-wide">Laster teamet…</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {team.map((member, i) => (
                  <TeamCard
                    key={member.id}
                    member={member}
                    featured={i === 0}
                    onClick={() => setActiveMember(member)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── KJERNEVERDIER ─────────────────────────────────────────────── */}
        <section
          aria-labelledby="values-heading"
          className="py-28 px-6 sm:px-10 lg:px-16 border-t border-nm-border/30"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-nm-accent" />
                  <span className="font-bespoke text-[10px] tracking-widest2 uppercase text-nm-accent">
                    Kjerneverdier
                  </span>
                </div>
                <h2
                  id="values-heading"
                  className="font-erode font-bold text-[clamp(1.8rem,4vw,3rem)] text-nm-light leading-[0.92] tracking-tight"
                >
                  Prinsippene som<br />
                  <span style={{ WebkitTextStroke: '1px #F4F4F8', color: 'transparent' }}>
                    styrer alt vi gjør.
                  </span>
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {VALUES.map((v) => (
                <div
                  key={v.number}
                  data-value-card
                  className="group relative overflow-hidden flex gap-6 p-7 bg-nm-surface/30 border border-nm-border/50 rounded-2xl hover:border-nm-accent/30 transition-colors duration-300"
                  style={{ opacity: 0 }}
                >
                  <span
                    className="absolute -top-2 -right-1 font-bespoke font-bold text-[5.5rem] leading-none pointer-events-none select-none"
                    style={{ color: 'rgba(75,110,245,0.05)' }}
                    aria-hidden="true"
                  >
                    {v.number}
                  </span>
                  <span className="font-bespoke font-bold text-2xl text-nm-accent/20 group-hover:text-nm-accent/40 transition-colors duration-300 flex-shrink-0 mt-0.5">
                    {v.number}
                  </span>
                  <div>
                    <h3 className="font-satoshi font-bold text-lg text-nm-light mb-2">{v.title}</h3>
                    <p className="font-cabinet text-nm-muted text-sm leading-relaxed">{v.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VÅR TILNÆRMING ────────────────────────────────────────────── */}
        <section
          aria-labelledby="approach-heading"
          className="py-28 px-6 sm:px-10 lg:px-16 border-t border-nm-border/30"
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-nm-accent" />
                <span className="font-bespoke text-[10px] tracking-widest2 uppercase text-nm-accent">
                  Vår Tilnærming
                </span>
              </div>
              <h2
                id="approach-heading"
                className="font-erode font-bold text-[clamp(1.8rem,4vw,3rem)] text-nm-light leading-[0.92] tracking-tight max-w-xl"
              >
                Hvordan vi leverer<br />
                <span className="text-nm-accent">markedsføring som fungerer.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 border border-nm-border/50 rounded-2xl overflow-hidden divide-y md:divide-y-0">
              {APPROACH.map((item, i) => (
                <div
                  key={item.number}
                  data-approach-row
                  className={[
                    'group flex gap-6 p-8 hover:bg-nm-surface/40 transition-colors duration-200',
                    i % 2 === 0 ? 'md:border-r border-nm-border/50' : '',
                    i < APPROACH.length - 2 ? 'md:border-b border-nm-border/50' : '',
                    'border-b border-nm-border/50 last:border-b-0',
                  ].join(' ')}
                  style={{ opacity: 0 }}
                >
                  <span className="font-bespoke font-bold text-xl text-nm-accent/25 group-hover:text-nm-accent/50 transition-colors duration-200 flex-shrink-0 mt-0.5">
                    {item.number}
                  </span>
                  <div>
                    <h3 className="font-satoshi font-semibold text-nm-fg text-sm mb-2">{item.title}</h3>
                    <p className="font-cabinet text-nm-muted text-sm leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MISJON ────────────────────────────────────────────────────── */}
        <section className="py-28 px-6 sm:px-10 lg:px-16 border-t border-nm-border/30">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-nm-accent" />
                <span className="font-bespoke text-[10px] tracking-widest2 uppercase text-nm-accent">Vår Misjon</span>
              </div>
              <h2
                data-mission-el
                className="font-erode font-bold text-[clamp(1.8rem,4vw,3rem)] text-nm-light mb-6 leading-[0.92] tracking-tight"
                style={{ opacity: 0 }}
              >
                Profesjonell markedsføring<br />
                <span style={{ WebkitTextStroke: '1px #F4F4F8', color: 'transparent' }}>
                  for alle.
                </span>
              </h2>
              <p
                data-mission-el
                className="font-cabinet text-nm-muted text-lg leading-relaxed mb-8"
                style={{ opacity: 0 }}
              >
                Å demokratisere tilgangen til profesjonell markedsføring – slik at bedrifter i alle
                størrelser kan konkurrere og vokse i det digitale landskapet. Vi er her for de som
                vil noe, ikke bare de som har råd til å kaste penger på det.
              </p>
              <div data-mission-el style={{ opacity: 0 }}>
                <Button href="/kontakt" variant="primary">
                  Ta kontakt
                </Button>
              </div>
            </div>

            <div
              data-mission-el
              className="aspect-[4/3] bg-nm-surface/30 border border-nm-border/50 rounded-2xl flex items-center justify-center relative overflow-hidden"
              style={{ opacity: 0 }}
            >
              <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid-about" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#E8E8EE" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-about)" />
              </svg>
              <div className="relative z-10 grid grid-cols-3 gap-6 px-10 w-full">
                {[
                  { val: '5+', label: 'År' },
                  { val: '120+', label: 'Kunder' },
                  { val: '3×', label: 'ROI' },
                ].map(({ val, label }) => (
                  <div key={label} className="text-center">
                    <p className="font-erode font-bold text-nm-accent text-3xl leading-none">{val}</p>
                    <p className="font-cabinet text-nm-muted text-xs mt-1.5 uppercase tracking-widest">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CTABanner />
      </div>

      {/* ── TEAM MEMBER PANEL ─────────────────────────────────────────── */}
      <TeamPanel member={activeMember} onClose={() => setActiveMember(null)} />
    </>
  )
}

// ─── Team card ────────────────────────────────────────────────────────────────

function TeamCard({
  member: m,
  featured,
  onClick,
}: {
  member: TeamMember
  featured: boolean
  onClick: () => void
}) {
  const cardRef = useRef<HTMLButtonElement>(null)

  const handleEnter = () => {
    const el = cardRef.current
    if (!el) return
    gsap.to(el.querySelector('[data-tc-overlay]'), { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.to(el.querySelector('[data-tc-label]'), { y: 0, opacity: 1, duration: 0.35, ease: 'power3.out' })
    gsap.to(el.querySelector('[data-tc-img]'), { scale: 1.05, duration: 0.5, ease: 'power2.out' })
  }

  const handleLeave = () => {
    const el = cardRef.current
    if (!el) return
    gsap.to(el.querySelector('[data-tc-overlay]'), { opacity: 0, duration: 0.25 })
    gsap.to(el.querySelector('[data-tc-label]'), { y: 8, opacity: 0, duration: 0.25, ease: 'power2.in' })
    gsap.to(el.querySelector('[data-tc-img]'), { scale: 1, duration: 0.45, ease: 'power2.out' })
  }

  return (
    <button
      ref={cardRef}
      data-team-card
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`group relative rounded-xl overflow-hidden text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-nm-accent ${featured ? 'md:row-span-1' : ''}`}
      aria-label={`Les mer om ${m.name}`}
    >
      {/* Photo / placeholder */}
      <div className="aspect-[3/4] relative overflow-hidden bg-nm-surface">
        {m.image ? (
          <img
            data-tc-img
            src={m.image}
            alt={m.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            data-tc-img
            className="w-full h-full flex items-center justify-center bg-gradient-to-br from-nm-surface to-nm-dark"
          >
            <span
              className="font-erode font-bold text-nm-fg/10 leading-none select-none"
              style={{ fontSize: 'clamp(2.5rem,6vw,4rem)' }}
            >
              {m.initials}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div
          data-tc-overlay
          className="absolute inset-0 bg-nm-dark/70 flex flex-col justify-end p-4"
          style={{ opacity: 0 }}
        >
          <div data-tc-label style={{ opacity: 0, transform: 'translateY(8px)' }}>
            <span className="font-cabinet text-[10px] text-nm-accent tracking-widest uppercase">
              Se profil →
            </span>
          </div>
        </div>
      </div>

      {/* Name + role */}
      <div className="pt-3 pb-1 px-0.5">
        <p className="font-satoshi font-semibold text-nm-fg text-sm leading-snug">{m.name}</p>
        <p className="font-cabinet text-nm-muted/60 text-[11px] mt-0.5 leading-snug">{m.role}</p>
      </div>
    </button>
  )
}

// ─── Team panel (slide-in from right) ────────────────────────────────────────

function TeamPanel({ member, onClose }: { member: TeamMember | null; onClose: () => void }) {
  const panelRef  = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const panel    = panelRef.current
    const backdrop = backdropRef.current
    if (!panel || !backdrop) return

    if (member) {
      document.body.style.overflow = 'hidden'
      gsap.set(backdrop, { display: 'block' })
      gsap.set(panel, { display: 'flex' })
      gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.fromTo(panel,    { x: '100%' },  { x: '0%',  duration: 0.45, ease: 'power4.out' })
    } else {
      document.body.style.overflow = ''
      gsap.to(backdrop, { opacity: 0, duration: 0.25, ease: 'power2.in' })
      gsap.to(panel, {
        x: '100%', duration: 0.35, ease: 'power3.in',
        onComplete: () => {
          gsap.set(panel,    { display: 'none' })
          gsap.set(backdrop, { display: 'none' })
        },
      })
    }

    return () => { document.body.style.overflow = '' }
  }, [member])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-nm-dark/60 backdrop-blur-sm"
        style={{ display: 'none' }}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={member ? `Profil: ${member.name}` : 'Teammedlem'}
        className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md flex-col bg-nm-dark border-l border-nm-border/50 overflow-y-auto"
        style={{ display: 'none' }}
      >
        {member && (
          <>
            {/* Close button */}
            <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-nm-border/30 flex-shrink-0">
              <span className="font-bespoke text-[10px] tracking-widest2 uppercase text-nm-accent">
                Profil
              </span>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-nm-border/60 text-nm-muted hover:text-nm-fg hover:border-nm-border transition-all duration-200"
                aria-label="Lukk panel"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Photo */}
            <div className="px-7 pt-7">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-nm-surface mb-6">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-nm-surface to-nm-dark">
                    <span
                      className="font-erode font-bold text-nm-fg/10 leading-none select-none"
                      style={{ fontSize: '5rem' }}
                    >
                      {member.initials}
                    </span>
                  </div>
                )}
              </div>

              {/* Name + role */}
              <div className="mb-6">
                <h2 className="font-erode font-bold text-2xl text-nm-light leading-tight mb-1">
                  {member.name}
                </h2>
                <p className="font-cabinet text-nm-accent text-sm tracking-wide">{member.role}</p>
              </div>

              {/* Bio */}
              <p className="font-cabinet text-nm-muted text-sm leading-relaxed mb-7">
                {member.bio}
              </p>

              {/* Specialties */}
              <div className="mb-8">
                <p className="font-bespoke text-[9px] tracking-widest2 uppercase text-nm-muted/50 mb-3">
                  Spesialisering
                </p>
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((s) => (
                    <span
                      key={s}
                      className="font-cabinet text-[11px] text-nm-fg/60 border border-nm-border/60 bg-nm-surface/60 px-3 py-1 rounded-full tracking-wide"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom padding */}
            <div className="h-12 flex-shrink-0" />
          </>
        )}
      </div>
    </>
  )
}
