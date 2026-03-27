import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SEO from '../components/ui/SEO'

gsap.registerPlugin(ScrollTrigger)

const RICH_SERVICES = [
  {
    number: '01',
    slug: 'digital-strategi',
    category: 'Strategi',
    title: 'Digital Markedsføringsstrategi',
    excerpt:
      'En helhetlig digital strategi skreddersydd for din bedrifts mål og målgruppe. Vi kombinerer dataanalyse med kreativ tenkning for å skape strategier som faktisk fungerer.',
    bullets: [
      'Markedsanalyse og konkurransekartlegging',
      'Målgruppedefinisjon og persona-utvikling',
      'Kanalstrategi og budsjettallokering',
      'KPI-definisjon og måleplan',
    ],
  },
  {
    number: '02',
    slug: 'innholdsmarkedsforing',
    category: 'Innhold',
    title: 'Innholdsproduksjon',
    excerpt:
      'Profesjonelt innhold som engasjerer og konverterer. Vi produserer alt fra bloggartikler til sosiale medier-innlegg og visuelt innhold som resonerer med din målgruppe.',
    bullets: [
      'Bloggartikler og SEO-optimalisert innhold',
      'Sosiale medier-innhold og kampanjer',
      'Visuelt innhold og grafisk design',
      'Video- og podcastproduksjon',
    ],
  },
  {
    number: '03',
    slug: 'seo-sem',
    category: 'Annonsering & SEO',
    title: 'SEO & Betalt Annonsering',
    excerpt:
      'Maksimer synlighet og avkastning – organisk og betalt. Vi driver trafikk gjennom strategisk søkemotoroptimalisering og datadrevne annonsekampanjer på alle relevante plattformer.',
    bullets: [
      'Google Ads og søkemotorannonsering',
      'Teknisk SEO-audit og optimalisering',
      'Facebook, Instagram og LinkedIn-annonsering',
      'Remarketing og konverteringsoptimalisering',
    ],
  },
  {
    number: '04',
    slug: 'sosiale-medier',
    category: 'Sosiale Medier',
    title: 'Sosiale Medier-Håndtering',
    excerpt:
      'Bygg og engasjer ditt publikum på de riktige plattformene. Vi håndterer alt fra innholdsplanlegging og daglig publisering til community management og rapportering.',
    bullets: [
      'Innholdsstrategi og planlegging',
      'Daglig publisering og scheduling',
      'Community management og respons',
      'Analyse og rapportering',
    ],
  },
  {
    number: '05',
    slug: 'epost-markedsforing',
    category: 'E-post',
    title: 'E-postmarkedsføring',
    excerpt:
      'Bygg relasjoner og driv salg gjennom strategisk e-postmarkedsføring. Vi skaper kampanjer som åpnes, leses og konverterer – uten å havne i søppelpost.',
    bullets: [
      'E-poststrategi og segmentering',
      'Nyhetsbrev og kampanjedesign',
      'Automatisering og workflows',
      'A/B-testing og optimalisering',
    ],
  },
  {
    number: '06',
    slug: 'analyse-rapportering',
    category: 'Analyse',
    title: 'Analyse & Rapportering',
    excerpt:
      'Datadrevet innsikt som gir deg full kontroll. Klare dashbords og transparente rapporter slik at du alltid vet hva som fungerer og hvor pengene gir best avkastning.',
    bullets: [
      'Oppsett av sporingsverktøy og dashbords',
      'Konverteringsanalyse og attribusjon',
      'Månedlige ytelsesrapporter',
      'Innsiktsbaserte anbefalinger',
    ],
  },
  {
    number: '07',
    slug: 'nettsideutvikling',
    category: 'Nettside',
    title: 'Nettsideutvikling',
    excerpt:
      'En profesjonell nettside er ditt sterkeste salgsverktøy. Vi bygger skreddersydde, lynraske nettsider som ser unike ut og konverterer besøkende til kunder.',
    bullets: [
      'Skreddersydd design og utvikling',
      'Mobilvennlig og lynrask',
      'SEO-optimalisert struktur',
      'WordPress eller headless CMS',
    ],
  },
  {
    number: '08',
    slug: 'videoproduksjon',
    category: 'Video',
    title: 'Videoproduksjon',
    excerpt:
      'Video er det mest engasjerende formatet på nett. Vi produserer innhold som fanger oppmerksomheten til målgruppen din – fra promofilm til sosiale medier-klipp.',
    bullets: [
      'Promovideoer og bedriftspresentasjoner',
      'Sosiale medier-videoer og reels',
      'Animasjoner og motion graphics',
      'Redigering og etterarbeid',
    ],
  },
]

const FAQS = [
  {
    q: 'Hvor lang tid tar det før vi ser resultater?',
    a: 'Det avhenger av tjenesten. Betalt annonsering kan gi resultater innen dager, mens SEO og organisk innhold typisk tar 3–6 måneder å bygge momentum. Vi setter realistiske forventninger fra starten.',
  },
  {
    q: 'Kan vi tilpasse tjenestepakkene?',
    a: 'Absolutt. Vi tror ikke på standardpakker. Alle oppdrag starter med en grundig samtale der vi kartlegger dine mål og skreddersyr en løsning som passer din bedrift og ditt budsjett.',
  },
  {
    q: 'Hvordan måler dere suksess?',
    a: 'Vi definerer klare KPIer sammen med deg før vi starter – enten det er trafikk, leads, konverteringer eller merkevarebevissthet. Du mottar regelmessige rapporter med transparent innsikt.',
  },
  {
    q: 'Trenger vi å ha et stort budsjett?',
    a: 'Nei. Vi jobber med bedrifter i alle størrelser og tilpasser innsatsen etter budsjettet. Selv et begrenset budsjett kan gi gode resultater med riktig prioritering og strategi.',
  },
  {
    q: 'Hva skiller dere fra andre byråer?',
    a: 'Vi er lei av markedsføringsprat uten substans. Vi holder ting enkelt, ærlig og målbart. Ingen svarte bokser – du ser alltid nøyaktig hva vi gjør og hva det gir.',
  },
  {
    q: 'Kan vi starte med én tjeneste og utvide senere?',
    a: 'Ja, og det er faktisk slik de fleste starter. Vi hjelper deg å identifisere det området som gir størst effekt for deg akkurat nå, og bygger videre derfra i ditt tempo.',
  },
]

export default function Tjenester() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('[data-hero-el]', { opacity: 0, y: 48 })
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.to('[data-hero-el]', { opacity: 1, y: 0, duration: 1, stagger: 0.13 }, 0)

      gsap.fromTo(
        '[data-intro-el]',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.75, stagger: 0.09, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-intro-el]', start: 'top 88%' },
        },
      )

      gsap.utils.toArray<HTMLElement>('[data-service-card]').forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            delay: (i % 3) * 0.07,
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
          },
        )
      })

      gsap.fromTo(
        '[data-faq-row]',
        { opacity: 0, x: -18 },
        {
          opacity: 1, x: 0, duration: 0.6, stagger: 0.06, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-faq-row]', start: 'top 88%' },
        },
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <SEO
        title="Tjenester"
        description="Utforsk Nora Marketings tjenester – fra digital strategi og innholdsproduksjon til SEO, sosiale medier og e-postmarkedsføring."
        canonical="/tjenester"
      />

      <div ref={pageRef}>

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <div className="relative pt-36 pb-20 px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-nm-border/30">

          {/* Background stencil */}
          <div
            className="absolute bottom-0 right-0 font-bespoke font-bold leading-none pointer-events-none select-none"
            style={{
              fontSize: 'clamp(100px, 18vw, 220px)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(75,110,245,0.06)',
              letterSpacing: '-0.02em',
              transform: 'translate(8%, 30%)',
            }}
            aria-hidden="true"
          >
            08
          </div>

          <div className="max-w-7xl mx-auto">
            <div data-hero-el className="flex items-center gap-3 mb-8" style={{ opacity: 0 }}>
              <span className="w-8 h-px bg-nm-accent" />
              <span className="font-bespoke text-[10px] tracking-widest2 uppercase text-nm-accent">
                Tjenester
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-end">
              <h1
                data-hero-el
                className="font-satoshi font-black leading-[0.88] tracking-tight text-nm-light"
                style={{ fontSize: 'clamp(3rem,8vw,7rem)', opacity: 0 }}
              >
                Tjenester som<br />
                <span style={{ WebkitTextStroke: '1.5px #F4F4F8', color: 'transparent' }}>
                  leverer
                </span>{' '}
                <span className="text-nm-accent">resultater.</span>
              </h1>

              <p
                data-hero-el
                className="font-cabinet text-nm-muted text-lg leading-relaxed lg:pb-2"
                style={{ opacity: 0 }}
              >
                Skreddersydde markedsføringsløsninger som kombinerer strategisk tenkning med praktisk gjennomføring — uten unødvendig kompleksitet.
              </p>
            </div>

            {/* Stat strip */}
            <div
              data-hero-el
              className="mt-14 grid grid-cols-3 gap-0 border border-nm-border/50 rounded-2xl overflow-hidden"
              style={{ opacity: 0 }}
            >
              {[
                { num: '8+', label: 'Spesialiserte tjenester' },
                { num: '100%', label: 'Skreddersydd til din bedrift' },
                { num: '0', label: 'Standardpakker', sub: '— alt er tilpasset' },
              ].map((item, i) => (
                <div
                  key={item.label}
                  data-intro-el
                  className={`flex flex-col gap-1.5 px-6 py-6 ${i < 2 ? 'border-r border-nm-border/50' : ''}`}
                  style={{ opacity: 0 }}
                >
                  <span className="font-satoshi font-black text-[clamp(1.5rem,3vw,2.5rem)] text-nm-accent leading-none">{item.num}</span>
                  <span className="font-cabinet text-nm-muted text-xs leading-snug">{item.label}{item.sub ? item.sub : ''}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SERVICE CARDS ─────────────────────────────────────────────── */}
        <section aria-labelledby="services-heading" className="py-24 px-6 sm:px-10 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <span className="w-8 h-px bg-nm-accent" />
              <h2
                id="services-heading"
                className="font-bespoke text-[10px] tracking-widest2 uppercase text-nm-fg"
              >
                Våre tjenester
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {RICH_SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  to={`/tjenester/${service.slug}`}
                  data-service-card
                  className="group flex flex-col gap-5 p-7 bg-nm-surface/30 border border-nm-border/50 hover:border-nm-accent/40 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden"
                  style={{ opacity: 0 }}
                >
                  {/* Ghost number */}
                  <span
                    className="absolute -top-2 -right-1 font-bespoke font-bold text-[5.5rem] leading-none pointer-events-none select-none"
                    style={{ color: 'rgba(75,110,245,0.04)' }}
                    aria-hidden="true"
                  >
                    {service.number}
                  </span>

                  {/* Category */}
                  <span className="inline-flex self-start font-bespoke text-[9px] tracking-widest2 uppercase text-nm-accent border border-nm-accent/25 px-3 py-1 rounded-full">
                    {service.category}
                  </span>

                  <h2 className="font-satoshi font-bold text-lg text-nm-fg group-hover:text-white transition-colors duration-200 leading-snug">
                    {service.title}
                  </h2>

                  <p className="font-cabinet text-nm-muted text-sm leading-relaxed">
                    {service.excerpt}
                  </p>

                  <ul className="flex flex-col gap-2 flex-1">
                    {service.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <span className="flex-shrink-0 mt-[5px] w-1 h-1 rounded-full bg-nm-accent/50 group-hover:bg-nm-accent transition-colors duration-200" />
                        <span className="font-cabinet text-nm-muted/80 text-xs leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="flex items-center gap-2 text-nm-accent text-sm font-satoshi font-medium group-hover:gap-3 transition-all duration-200 mt-2 pt-4 border-t border-nm-border/40">
                    Les mer
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="faq-heading"
          className="py-24 px-6 sm:px-10 lg:px-16 border-t border-nm-border/30"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12 lg:gap-20">

            {/* Left */}
            <div className="lg:pt-1">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-px bg-nm-accent" />
                <span className="font-bespoke text-[10px] tracking-widest2 uppercase text-nm-accent">FAQ</span>
              </div>
              <h2
                id="faq-heading"
                className="font-satoshi font-black text-[clamp(1.8rem,4vw,3rem)] text-nm-light leading-tight mb-5"
              >
                Ofte stilte<br />
                <span style={{ WebkitTextStroke: '1px #F4F4F8', color: 'transparent' }}>
                  spørsmål.
                </span>
              </h2>
              <p className="font-cabinet text-nm-muted text-sm leading-relaxed">
                Ikke finner du svaret?{' '}
                <Link to="/kontakt" className="text-nm-accent hover:underline underline-offset-2">
                  Ta kontakt direkte.
                </Link>
              </p>
            </div>

            {/* Accordion */}
            <div className="border border-nm-border/50 rounded-2xl overflow-hidden divide-y divide-nm-border/50">
              {FAQS.map((faq, i) => (
                <div key={i} data-faq-row style={{ opacity: 0 }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className={`w-full flex items-center justify-between gap-4 px-7 py-5 text-left transition-colors duration-200 hover:bg-nm-surface/50 ${openFaq === i ? 'bg-nm-surface/30' : ''}`}
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-satoshi font-semibold text-nm-fg text-[15px] pr-4 leading-snug">
                      {faq.q}
                    </span>
                    <span className={`flex-shrink-0 text-nm-accent transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>

                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ maxHeight: openFaq === i ? '180px' : '0px' }}
                  >
                    <p className="font-cabinet text-nm-muted text-sm leading-relaxed px-7 pb-5 pt-1">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA strip */}
        <div className="px-6 sm:px-10 lg:px-16 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-2xl border border-nm-accent/20 bg-nm-accent/[0.04]">
              <div>
                <p className="font-satoshi font-bold text-nm-fg text-lg leading-snug">Klar til å starte?</p>
                <p className="font-cabinet text-nm-muted text-sm mt-1">Ta en uforpliktende prat om hva vi kan gjøre for deg.</p>
              </div>
              <Link
                to="/kontakt"
                className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-nm-accent text-white font-satoshi font-semibold text-sm rounded-xl hover:bg-nm-accent-light transition-colors duration-200"
              >
                Ta kontakt
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
