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
      // ── Hero entrance ───────────────────────────────────────────────────
      gsap.fromTo(
        '[data-hero-el]',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' },
      )

      // ── History: section label + paragraphs ─────────────────────────────
      gsap.fromTo(
        '[data-hist-label]',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.9,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: '[data-hist-label]', start: 'top 88%' },
        },
      )

      gsap.utils.toArray<HTMLElement>('[data-hist-para]').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
            delay: i * 0.08,
          },
        )
      })

      // ── Values cards ────────────────────────────────────────────────────
      gsap.fromTo(
        '[data-value-card]',
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-value-card]', start: 'top 86%' },
        },
      )

      // ── Approach rows ───────────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>('[data-approach-row]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          },
        )
      })
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
        <div className="max-w-7xl mx-auto px-6">

          {/* ── HERO ──────────────────────────────────────────────────────── */}
          <div className="pt-40 pb-24">
            <div data-hero-el className="flex items-center gap-4 mb-6" style={{ opacity: 0 }}>
              <span className="w-8 h-px bg-nm-accent" />
              <span className="font-bespoke font-bold text-xs tracking-widest2 uppercase text-nm-fg">
                Hvem vi er
              </span>
            </div>

            <h1
              data-hero-el
              className="font-satoshi font-black text-5xl md:text-7xl text-nm-light leading-tight mb-8 max-w-4xl"
              style={{ opacity: 0 }}
            >
              Vi er Nora Marketing.
            </h1>

            <p
              data-hero-el
              className="font-cabinet text-nm-muted text-xl leading-relaxed max-w-2xl"
              style={{ opacity: 0 }}
            >
              Et markedsføringsbyrå grunnlagt på troen om at ærlighet, enkelhet og datadrevne
              beslutninger er det eneste som virkelig fungerer over tid.
            </p>
          </div>

          {/* ── VÅR HISTORIE ──────────────────────────────────────────────── */}
          <section
            aria-labelledby="history-heading"
            className="py-24 border-t border-nm-border/50"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
              {/* Left: label + heading */}
              <div className="lg:pt-1">
                <span
                  data-hist-label
                  className="font-bespoke font-bold text-xs tracking-widest2 uppercase text-nm-accent block mb-5"
                  style={{ clipPath: 'inset(0 100% 0 0)' }}
                >
                  Vår Historie
                </span>
                <h2
                  id="history-heading"
                  className="font-satoshi font-black text-3xl md:text-4xl text-nm-light leading-tight"
                >
                  Ekte hjelp,<br />
                  uten støy.
                </h2>
              </div>

              {/* Right: paragraphs */}
              <div className="flex flex-col gap-7 border-l border-nm-border/50 pl-8 lg:pl-12">
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

          {/* ── KJERNEVERDIEER ────────────────────────────────────────────── */}
          <section
            aria-labelledby="values-heading"
            className="py-24 border-t border-nm-border/50"
          >
            <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
              <div>
                <span className="font-bespoke font-bold text-xs tracking-widest2 uppercase text-nm-accent block mb-3">
                  Kjerneverdieer
                </span>
                <h2
                  id="values-heading"
                  className="font-satoshi font-black text-3xl md:text-4xl text-nm-light leading-tight"
                >
                  Prinsippene som{' '}
                  styrer alt vi gjør.
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {VALUES.map((v) => (
                <div
                  key={v.number}
                  data-value-card
                  className="group relative overflow-hidden p-8 bg-nm-surface border border-nm-border/60 rounded-2xl hover:border-nm-accent/40 transition-colors duration-300"
                  style={{ opacity: 0 }}
                >
                  {/* Ghost number */}
                  <span
                    className="absolute -top-3 -right-2 font-bespoke font-bold text-[7rem] leading-none pointer-events-none select-none"
                    style={{ color: 'rgba(75,110,245,0.055)' }}
                    aria-hidden="true"
                  >
                    {v.number}
                  </span>

                  <span className="font-bespoke text-xs tracking-widest2 text-nm-accent uppercase block mb-4">
                    {v.number}
                  </span>
                  <h3 className="font-satoshi font-bold text-xl text-nm-light mb-3">{v.title}</h3>
                  <p className="font-cabinet text-nm-muted text-sm leading-relaxed">{v.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── VÅR TILNÆRMING ────────────────────────────────────────────── */}
          <section
            aria-labelledby="approach-heading"
            className="py-24 border-t border-nm-border/50"
          >
            <div className="mb-14">
              <span className="font-bespoke font-bold text-xs tracking-widest2 uppercase text-nm-accent block mb-3">
                Vår Tilnærming
              </span>
              <h2
                id="approach-heading"
                className="font-satoshi font-black text-3xl md:text-4xl text-nm-light leading-tight max-w-xl"
              >
                Hvordan vi leverer{' '}
                markedsføring som fungerer.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-nm-border/50 rounded-2xl overflow-hidden">
              {APPROACH.map((item, i) => (
                <div
                  key={item.number}
                  data-approach-row
                  className={[
                    'group flex gap-6 p-8 border-nm-border/50 hover:bg-nm-surface/60 transition-colors duration-200',
                    // right border on left-column items (even index on 2-col)
                    i % 2 === 0 ? 'md:border-r' : '',
                    // bottom border on all but last row
                    i < APPROACH.length - 2 ? 'border-b' : '',
                    // last item on odd total: span full width on mobile
                    i === APPROACH.length - 1 && APPROACH.length % 2 !== 0 ? 'md:col-span-2' : '',
                  ].join(' ')}
                >
                  <span
                    className="font-bespoke font-bold text-2xl text-nm-accent/30 group-hover:text-nm-accent/60 transition-colors duration-200 flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    {item.number}
                  </span>
                  <div>
                    <h3 className="font-satoshi font-bold text-nm-fg text-base mb-2">
                      {item.title}
                    </h3>
                    <p className="font-cabinet text-nm-muted text-sm leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── MISSION / CTA ─────────────────────────────────────────────── */}
          <section className="py-24 border-t border-nm-border/50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="font-bespoke font-bold text-xs tracking-widest2 uppercase text-nm-accent block mb-5">
                  Vår Misjon
                </span>
                <h2 className="font-satoshi font-black text-3xl md:text-4xl text-nm-light mb-6 leading-tight">
                  Profesjonell markedsføring{' '}
                  for alle.
                </h2>
                <p className="font-cabinet text-nm-muted text-lg leading-relaxed mb-8">
                  Å demokratisere tilgangen til profesjonell markedsføring – slik at bedrifter i alle
                  størrelser kan konkurrere og vokse i det digitale landskapet. Vi er her for de som
                  vil noe, ikke bare de som har råd til å kaste penger på det.
                </p>
                <Button href="/kontakt" variant="primary">
                  Ta kontakt
                </Button>
              </div>

              {/* Placeholder – swap for real image later */}
              <div className="aspect-video bg-nm-surface border border-nm-border/50 rounded-2xl flex items-center justify-center">
                <span className="font-bespoke font-bold text-8xl text-nm-accent/15 select-none">
                  NM
                </span>
              </div>
            </div>
          </section>

        </div>

        <CTABanner />
      </div>
    </>
  )
}
