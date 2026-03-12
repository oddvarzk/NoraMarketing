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
      // Hero
      gsap.fromTo(
        '[data-hero-el]',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' },
      )

      // Intro strip
      gsap.fromTo(
        '[data-intro-el]',
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-intro-el]', start: 'top 88%' },
        },
      )

      // Service cards
      gsap.utils.toArray<HTMLElement>('[data-service-card]').forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 36 },
          {
            opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
            delay: (i % 3) * 0.08,
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
          },
        )
      })

      // FAQ items
      gsap.fromTo(
        '[data-faq-row]',
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.65, stagger: 0.07, ease: 'power3.out',
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

      <div ref={pageRef} className="max-w-7xl mx-auto px-6">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <div className="pt-40 pb-16">
          <div data-hero-el className="flex items-center gap-4 mb-6" style={{ opacity: 0 }}>
            <span className="w-8 h-px bg-nm-accent" />
            <span className="font-bespoke font-bold text-xs tracking-widest2 uppercase text-nm-fg">
              Tjenester
            </span>
          </div>

          <h1
            data-hero-el
            className="font-satoshi font-black text-6xl md:text-8xl lg:text-9xl text-nm-light leading-[0.95] mb-8 max-w-5xl"
            style={{ opacity: 0 }}
          >
            Tjenester som leverer{' '}
            resultater.
          </h1>

          <p
            data-hero-el
            className="font-cabinet text-nm-muted text-xl max-w-2xl leading-relaxed"
            style={{ opacity: 0 }}
          >
            Vi tilbyr skreddersydde markedsføringsløsninger som kombinerer strategisk tenkning
            med praktisk gjennomføring – designet for å gi målbare resultater uten unødvendig
            kompleksitet.
          </p>
        </div>

        {/* ── INTRO STRIP ───────────────────────────────────────────────── */}
        <div className="py-12 border-t border-nm-border/50 border-b grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { num: '8+', label: 'Spesialiserte tjenester' },
            { num: '100%', label: 'Skreddersydd til din bedrift' },
            { num: '1', label: 'Uforpliktende første samtale' },
          ].map((item) => (
            <div key={item.label} data-intro-el className="flex items-center gap-5" style={{ opacity: 0 }}>
              <span className="font-bespoke font-bold text-4xl text-nm-accent">{item.num}</span>
              <span className="font-cabinet text-nm-muted text-sm leading-snug">{item.label}</span>
            </div>
          ))}
        </div>

        {/* ── SERVICE CARDS ─────────────────────────────────────────────── */}
        <section aria-labelledby="services-heading" className="pb-24">
          <div className="flex items-center gap-4 mb-12">
            <span className="w-8 h-px bg-nm-accent" />
            <h2
              id="services-heading"
              className="font-bespoke font-bold text-xs tracking-widest2 uppercase text-nm-fg"
            >
              Våre tjenester
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RICH_SERVICES.map((service) => (
              <Link
                key={service.slug}
                to={`/tjenester/${service.slug}`}
                data-service-card
                className="group flex flex-col gap-5 p-8 bg-nm-surface/30 border border-nm-border/60 hover:border-nm-accent/50 rounded-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                style={{ opacity: 0 }}
              >
                {/* Category tag */}
                <span className="font-bespoke text-[10px] tracking-widest2 uppercase text-nm-accent self-start border border-nm-accent/30 px-3 py-1 rounded-full">
                  {service.category}
                </span>

                <h2 className="font-satoshi font-bold text-xl text-nm-fg group-hover:text-white transition-colors duration-200 leading-snug">
                  {service.title}
                </h2>

                <p className="font-cabinet text-nm-muted text-sm leading-relaxed">
                  {service.excerpt}
                </p>

                {/* Bullets */}
                <ul className="flex flex-col gap-2 flex-1">
                  {service.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-nm-accent/50 group-hover:bg-nm-accent transition-colors duration-200" />
                      <span className="font-cabinet text-nm-muted text-xs leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>

                <span className="flex items-center gap-2 text-nm-accent text-sm font-satoshi font-medium group-hover:gap-3 transition-all duration-200 mt-2 pt-4 border-t border-nm-border/50">
                  Les mer
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section aria-labelledby="faq-heading" className="py-24 border-t border-nm-border/50 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">

            {/* Left label */}
            <div className="lg:pt-1">
              <span className="font-bespoke font-bold text-xs tracking-widest2 uppercase text-nm-accent block mb-3">
                FAQ
              </span>
              <h2
                id="faq-heading"
                className="font-satoshi font-black text-3xl md:text-4xl text-nm-light leading-tight"
              >
                Ofte stilte{' '}
                spørsmål.
              </h2>
              <p className="font-cabinet text-nm-muted text-sm leading-relaxed mt-4 max-w-xs">
                Svar på det folk lurer mest på. Ikke finner du svaret her?{' '}
                <Link to="/kontakt" className="text-nm-accent hover:underline">
                  Ta kontakt
                </Link>
                .
              </p>
            </div>

            {/* Right accordion */}
            <div className="border border-nm-border/60 rounded-2xl overflow-hidden">
              {FAQS.map((faq, i) => (
                <div key={i} data-faq-row style={{ opacity: 0 }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className={[
                      'w-full flex items-center justify-between gap-4 px-7 py-6 text-left transition-colors duration-200 hover:bg-nm-surface/60',
                      i < FAQS.length - 1 ? 'border-b border-nm-border/60' : '',
                      openFaq === i ? 'bg-nm-surface/40' : '',
                    ].join(' ')}
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-satoshi font-semibold text-nm-fg text-base pr-4">
                      {faq.q}
                    </span>
                    <span
                      className={`flex-shrink-0 text-nm-accent transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M9 4v10M4 9h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>

                  <div
                    className={[
                      'overflow-hidden transition-all duration-300 ease-in-out',
                      i < FAQS.length - 1 && openFaq === i ? 'border-b border-nm-border/60' : '',
                    ].join(' ')}
                    style={{ maxHeight: openFaq === i ? '200px' : '0px' }}
                  >
                    <p className="font-cabinet text-nm-muted text-sm leading-relaxed px-7 pb-6 pt-1">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
