import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SEO from '../components/ui/SEO'
import CTABanner from '../components/sections/CTABanner'
import Button from '../components/ui/Button'

gsap.registerPlugin(ScrollTrigger)

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

export default function HvemViEr() {
  const pageRef = useRef<HTMLDivElement>(null)

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

  return (
    <>
      <SEO
        title="Hvem vi er"
        description="Lær om teamet bak Nora Marketing – et markedsføringsbyrå grunnlagt på ærlighet, enkelhet og målbare resultater."
        canonical="/hvem-vi-er"
      />

      <div ref={pageRef}>

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <div className="relative pt-36 pb-24 px-6 sm:px-10 lg:px-16 border-b border-nm-border/30 overflow-hidden">
          {/* Background watermark */}
          <div
            className="absolute top-1/2 right-0 font-bespoke font-bold leading-none pointer-events-none select-none"
            style={{
              fontSize: 'clamp(120px, 20vw, 300px)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(232,164,74,0.05)',
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
                className="font-satoshi font-black leading-[0.88] tracking-tight text-nm-light"
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

        {/* ── VÅR HISTORIE ──────────────────────────────────────────────── */}
        <section
          aria-labelledby="history-heading"
          className="py-28 px-6 sm:px-10 lg:px-16"
        >
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
                className="font-satoshi font-black text-[clamp(1.8rem,3.5vw,2.8rem)] text-nm-light leading-[0.92] tracking-tight"
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

        {/* ── KJERNEVERDIER ──────────────────────────────────────────────── */}
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
                  className="font-satoshi font-black text-[clamp(1.8rem,4vw,3rem)] text-nm-light leading-[0.92] tracking-tight"
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
                  {/* Ghost number */}
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
                className="font-satoshi font-black text-[clamp(1.8rem,4vw,3rem)] text-nm-light leading-[0.92] tracking-tight max-w-xl"
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
                className="font-satoshi font-black text-[clamp(1.8rem,4vw,3rem)] text-nm-light mb-6 leading-[0.92] tracking-tight"
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

            {/* Visual block */}
            <div
              data-mission-el
              className="aspect-[4/3] bg-nm-surface/30 border border-nm-border/50 rounded-2xl flex items-center justify-center relative overflow-hidden"
              style={{ opacity: 0 }}
            >
              {/* Grid decoration */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid-about" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#E8E8EE" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-about)" />
              </svg>
              {/* Stat trio */}
              <div className="relative z-10 grid grid-cols-3 gap-6 px-10 w-full">
                {[
                  { val: '5+', label: 'År' },
                  { val: '120+', label: 'Kunder' },
                  { val: '3×', label: 'ROI' },
                ].map(({ val, label }) => (
                  <div key={label} className="text-center">
                    <p className="font-satoshi font-black text-nm-accent text-3xl leading-none">{val}</p>
                    <p className="font-cabinet text-nm-muted text-xs mt-1.5 uppercase tracking-widest">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CTABanner />
      </div>
    </>
  )
}
