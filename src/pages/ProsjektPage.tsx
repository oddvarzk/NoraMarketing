/**
 * ProsjektPage – individual case study page
 * Route: /prosjekter/:slug
 *
 * Fetches from WordPress CPT "prosjekter" via wp.project(slug).
 * Falls back to FALLBACK_DETAIL if WP is not configured yet.
 *
 * WP ACF fields used here (in addition to the list-page fields):
 *   utfordring     → challenge / brief (textarea)
 *   losning        → what we did (textarea)
 *   resultat_tekst → qualitative result description (textarea)
 */

import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SEO from '../components/ui/SEO'
import { wp } from '../lib/wordpress'
import NotFound from './NotFound'

gsap.registerPlugin(ScrollTrigger)

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProjectDetail {
  slug: string
  title: string
  klient: string
  kategori: string
  aar: string
  tags: string[]
  image: string | null
  utfordring: string
  losning: string
  resultat_tekst: string
}

// ─── Category labels ──────────────────────────────────────────────────────────

const CATEGORY_LABEL: Record<string, string> = {
  'sosiale-medier':        'Sosiale Medier',
  'seo-sem':               'SEO & SEM',
  'innholdsmarkedsforing': 'Innholdsmarkedsføring',
  'nettsideutvikling':     'Nettsideutvikling',
  'digital-strategi':      'Digital Strategi',
  'videoproduksjon':       'Videoproduksjon',
}

// ─── Fallback detail data ─────────────────────────────────────────────────────

const FALLBACK_DETAIL: Record<string, ProjectDetail> = {
  'forma-studio-meta': {
    slug: 'forma-studio-meta', title: 'Forma Studio – Meta-kampanje', klient: 'Forma Studio',
    kategori: 'sosiale-medier', aar: '2024', tags: ['Meta Ads', 'A/B-testing', 'Kreativ'],
    image: null,
    utfordring: 'Forma Studio brukte store summer på Meta-annonsering uten å vite hva som faktisk fungerte. Kostnad per kunde var høy og skalerte ikke med budsjettet.',
    losning: 'Vi satte opp et strukturert A/B-testingsystem på tvers av alle annonseformater, målgrupper og creatives. Gjennom kontinuerlig optimalisering over 90 dager identifiserte vi de beste kombinasjonene og skalerte disse.',
    resultat_tekst: 'Kostnad per kunde falt med 52 % over tre måneder, mens konverteringsvolumet økte. Forma Studio har nå et repeterbart annonsesystem de kan skalere trygt.',
  },
  'nordvik-leads': {
    slug: 'nordvik-leads', title: 'Nordvik Eiendom – Google Ads', klient: 'Nordvik Eiendom',
    kategori: 'seo-sem', aar: '2024', tags: ['Google Ads', 'CRO', 'Søkestrategi'],
    image: null,
    utfordring: 'Nordvik hadde en Google Ads-konto med bred, uspesifikk annonsering. Mange klikk, få kvalifiserte henvendelser og et budsjett som ikke sto i stil med resultatene.',
    losning: 'Vi restrukturerte hele kontoen – ny kampanjearkitektur, keyword-strategi rettet mot kjøpeklare søk, og en optimalisert landingsside med klar CTA. Kvalitet over kvantitet.',
    resultat_tekst: '340 % flere kvalifiserte leads på samme budsjett på 90 dager. Nordvik Eiendom bruker nå modellen vi bygget som standard for nye markeder de skal inn i.',
  },
  'helios-seo': {
    slug: 'helios-seo', title: 'Helios AS – SEO & innhold', klient: 'Helios AS',
    kategori: 'seo-sem', aar: '2024', tags: ['SEO', 'Innhold', 'Google'],
    image: null,
    utfordring: 'Helios AS hadde god kunnskap om produktene sine, men lite synlighet i søk. Nettsiden var teknisk svak og innholdet var ikke optimalisert for hva kundene faktisk søker etter.',
    losning: 'Teknisk SEO-audit og full gjennomgang av nettstedet, etterfulgt av en innholdsstrategi basert på søkedata og konkurranseanalyse. Vi produserte og publiserte artikler over seks måneder.',
    resultat_tekst: 'Organisk trafikk firedoblet seg over seks måneder. Helios AS rangerer nå på side 1 for sine viktigste produktkategorier og har en stabil, skalérbar kilde til nye kunder.',
  },
  'solberg-nettside': {
    slug: 'solberg-nettside', title: 'Solberg & Co – Nettsideredesign', klient: 'Solberg & Co',
    kategori: 'nettsideutvikling', aar: '2024', tags: ['React', 'UX/UI', 'CRO'],
    image: null,
    utfordring: 'Solberg & Co hadde en utdatert nettside som ikke reflekterte kvaliteten på tjenestene deres. Besøkende forlot siden uten å ta kontakt.',
    losning: 'Fullstendig redesign med fokus på konvertering. Vi kartla brukerreisen, forenklet navigasjonen og bygde en ny nettside med klare CTAs og profesjonelt innhold.',
    resultat_tekst: '210 % økning i konverteringer etter lansering. Solberg & Co rapporterer at kvaliteten på henvendelsene er markant bedre enn før.',
  },
  'kvartett-video': {
    slug: 'kvartett-video', title: 'Kvartett AS – Videoproduksjon', klient: 'Kvartett AS',
    kategori: 'videoproduksjon', aar: '2024', tags: ['TikTok', 'Reels', 'Storytelling'],
    image: null,
    utfordring: 'Kvartett AS ville nå et yngre publikum men visste ikke hvordan de skulle kommunisere merkevaren sin på kortvideo-plattformer.',
    losning: 'Vi utviklet et konsept som oversatte merkevarehistorien til Kvartett til TikTok- og Reels-format. Produserte en serie med videoer tilpasset plattformenes algoritmer og estetikk.',
    resultat_tekst: '12 millioner visninger på den første serien. En av videoene gikk viralt og ga Kvartett AS sin sterkeste uke i netthandelhistorien.',
  },
  'nordvik-strategi': {
    slug: 'nordvik-strategi', title: 'Nordvik Eiendom – Digital strategi', klient: 'Nordvik Eiendom',
    kategori: 'digital-strategi', aar: '2023', tags: ['Strategi', 'Analyse', 'Vekst'],
    image: null,
    utfordring: 'Nordvik Eiendom brukte budsjett på tvers av mange kanaler uten en overordnet strategi. Kanalene jobbet ikke sammen og det var vanskelig å måle hva som ga avkastning.',
    losning: 'Vi gjennomførte en full strategiprosess – kartla alle kanaler, satte klare KPIer og laget en helhetlig kanalplan der innsatsen trakk i samme retning.',
    resultat_tekst: 'Gjennomsnittlig ROI på tvers av alle kanaler tredoblet seg. Nordvik Eiendom har nå et klart rammeverk for hvordan de allokerer markedsbudsjett fremover.',
  },
}

// ─── WP mapper ────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapWpDetail(post: any): ProjectDetail {
  const acf      = post.acf ?? {}
  const embedded = post._embedded ?? {}
  const image    = embedded['wp:featuredmedia']?.[0]?.source_url ?? null

  return {
    slug:          post.slug,
    title:         post.title?.rendered ?? '',
    klient:        acf.klient ?? post.title?.rendered ?? '',
    kategori:      acf.kategori ?? '',
    aar:           acf.aar ?? '',
    tags:          typeof acf.tags === 'string'
                     ? acf.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
                     : [],
    image,
    utfordring:    acf.utfordring ?? '',
    losning:       acf.losning ?? '',
    resultat_tekst: acf.resultat_tekst ?? '',
  }
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ProsjektPage() {
  const { slug } = useParams<{ slug: string }>()
  const pageRef  = useRef<HTMLDivElement>(null)
  const [project, setProject] = useState<ProjectDetail | null | 'loading'>('loading')

  useEffect(() => {
    if (!slug) return
    wp.project(slug)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((post: any) => {
        if (post) {
          setProject(mapWpDetail(post))
        } else {
          // Try fallback
          setProject(FALLBACK_DETAIL[slug] ?? null)
        }
      })
      .catch(() => setProject(FALLBACK_DETAIL[slug] ?? null))
  }, [slug])

  useEffect(() => {
    if (!project || project === 'loading') return
    const ctx = gsap.context(() => {
      gsap.set('[data-pp-el]', { opacity: 0, y: 40 })
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .to('[data-pp-el]', { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 0)

      gsap.fromTo('[data-pp-body]',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-pp-body]', start: 'top 86%' } },
      )
    }, pageRef)
    return () => ctx.revert()
  }, [project])

  if (project === 'loading') {
    return (
      <div className="min-h-screen bg-nm-dark flex items-center justify-center">
        <span className="font-cabinet text-nm-muted/40 text-sm tracking-wide">Laster prosjekt…</span>
      </div>
    )
  }

  if (!project) return <NotFound />

  const p = project
  const catLabel = CATEGORY_LABEL[p.kategori] ?? p.kategori

  return (
    <>
      <SEO
        title={p.title}
        description={p.utfordring || p.klient}
        canonical={`/prosjekter/${p.slug}`}
      />

      <div ref={pageRef}>

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <div className="relative pt-36 pb-0 overflow-hidden bg-nm-dark">

          {/* Ghost client watermark */}
          <div
            className="absolute bottom-0 right-0 font-erode font-bold leading-none pointer-events-none select-none"
            style={{
              fontSize: 'clamp(80px,16vw,220px)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(75,110,245,0.05)',
              transform: 'translate(6%, 30%)',
              letterSpacing: '-0.04em',
            }}
            aria-hidden="true"
          >
            {p.klient.split(' ')[0].toUpperCase()}
          </div>

          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

            {/* Breadcrumb */}
            <div data-pp-el className="flex items-center gap-2 mb-10 text-nm-muted/50 text-xs font-cabinet tracking-wide" style={{ opacity: 0 }}>
              <Link to="/prosjekter" className="hover:text-nm-fg transition-colors duration-200">Prosjekter</Link>
              <span>/</span>
              <span className="text-nm-muted">{p.klient}</span>
            </div>

            {/* Eyebrow */}
            <div data-pp-el className="flex items-center gap-3 mb-6" style={{ opacity: 0 }}>
              <span className="w-8 h-px bg-nm-accent" />
              <span className="font-bespoke text-[10px] tracking-widest2 uppercase text-nm-accent">
                {catLabel}
              </span>
            </div>

            {/* Title */}
            <h1
              data-pp-el
              className="font-erode font-bold leading-[0.88] tracking-tight mb-10 max-w-4xl"
              style={{ fontSize: 'clamp(2.4rem,7vw,7rem)', opacity: 0 }}
            >
              <span className="block text-nm-light">{p.klient}</span>
              <span
                className="block"
                style={{ WebkitTextStroke: '2px rgba(232,232,238,0.45)', color: 'transparent' }}
              >
                {catLabel}
              </span>
            </h1>

            {/* Meta row */}
            <div data-pp-el className="flex items-center gap-6 flex-wrap pb-12 border-b border-nm-border/30" style={{ opacity: 0 }}>
              <span className="font-cabinet text-nm-muted text-sm">{p.aar}</span>
              <span className="w-px h-4 bg-nm-border/60" />
              {p.tags.map((tag) => (
                <span key={tag} className="font-cabinet text-[11px] text-nm-fg/50 border border-nm-border/50 px-3 py-1 rounded-full tracking-wide">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Hero image */}
          {p.image && (
            <div className="mt-12 mx-6 sm:mx-10 lg:mx-16 max-w-7xl lg:mx-auto rounded-2xl overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="w-full aspect-[16/7] object-cover"
              />
            </div>
          )}
        </div>

        {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">

          {/* Big metric + two-column text */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 lg:gap-24 mb-24">

            {/* Left — challenge + solution */}
            <div className="flex flex-col gap-14">

              {p.utfordring && (
                <div data-pp-body style={{ opacity: 0 }}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-6 h-px bg-nm-accent/60" />
                    <span className="font-bespoke text-[10px] tracking-widest2 uppercase text-nm-accent/70">
                      Utfordringen
                    </span>
                  </div>
                  <p className="font-cabinet text-nm-muted text-lg leading-relaxed border-l border-nm-border/40 pl-6">
                    {p.utfordring}
                  </p>
                </div>
              )}

              {p.losning && (
                <div data-pp-body style={{ opacity: 0 }}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-6 h-px bg-nm-accent/60" />
                    <span className="font-bespoke text-[10px] tracking-widest2 uppercase text-nm-accent/70">
                      Løsningen
                    </span>
                  </div>
                  <p className="font-cabinet text-nm-muted text-lg leading-relaxed border-l border-nm-border/40 pl-6">
                    {p.losning}
                  </p>
                </div>
              )}
            </div>

            {/* Right — sticky metric card */}
            <div data-pp-body style={{ opacity: 0 }}>
              <div className="lg:sticky lg:top-28 p-8 bg-nm-surface/40 border border-nm-border/50 rounded-2xl flex flex-col gap-6">

                <div className="h-px w-full bg-nm-border/50" />

                <div className="flex flex-col gap-2">
                  <p className="font-bespoke text-[9px] tracking-widest2 uppercase text-nm-muted/50">Klient</p>
                  <p className="font-satoshi font-semibold text-nm-fg text-sm">{p.klient}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bespoke text-[9px] tracking-widest2 uppercase text-nm-muted/50">Kategori</p>
                  <p className="font-satoshi font-semibold text-nm-fg text-sm">{catLabel}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bespoke text-[9px] tracking-widest2 uppercase text-nm-muted/50">År</p>
                  <p className="font-satoshi font-semibold text-nm-fg text-sm">{p.aar}</p>
                </div>

                <div className="h-px w-full bg-nm-border/50" />

                <Link
                  to="/kontakt"
                  className="inline-flex items-center justify-between group w-full"
                >
                  <span className="font-satoshi font-semibold text-nm-fg text-sm group-hover:text-nm-accent transition-colors duration-200">
                    Start et lignende prosjekt
                  </span>
                  <svg className="w-3.5 h-3.5 text-nm-muted group-hover:text-nm-accent transition-colors duration-200" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 6h10M7 2l4 4-4 4" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Resultat */}
          {p.resultat_tekst && (
            <div data-pp-body className="mb-24 max-w-3xl" style={{ opacity: 0 }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-nm-accent" />
                <span className="font-bespoke text-[10px] tracking-widest2 uppercase text-nm-accent">
                  Resultat
                </span>
              </div>
              <p className="font-satoshi font-semibold text-nm-light text-[clamp(1.1rem,2.2vw,1.5rem)] leading-relaxed">
                {p.resultat_tekst}
              </p>
            </div>
          )}

          {/* Divider line */}
          <div className="flex items-center gap-6 mb-16">
            <div className="h-px flex-1 bg-nm-border/30" />
            <span className="font-bespoke text-[10px] tracking-widest2 text-nm-muted/20 uppercase whitespace-nowrap">
              Resultater over løfter · Alltid
            </span>
            <div className="h-px flex-1 bg-nm-border/30" />
          </div>

          {/* Back + forward nav */}
          <div className="flex items-center justify-between">
            <Link
              to="/prosjekter"
              className="inline-flex items-center gap-2 group"
            >
              <svg className="w-3.5 h-3.5 text-nm-muted group-hover:text-nm-accent transition-colors duration-200 rotate-180" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 6h10M7 2l4 4-4 4" />
              </svg>
              <span className="font-cabinet text-sm text-nm-muted group-hover:text-nm-fg transition-colors duration-200">
                Alle prosjekter
              </span>
            </Link>

            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 group"
            >
              <span className="font-cabinet text-sm text-nm-muted group-hover:text-nm-fg transition-colors duration-200">
                Ta kontakt
              </span>
              <svg className="w-3.5 h-3.5 text-nm-muted group-hover:text-nm-accent transition-colors duration-200" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 6h10M7 2l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
