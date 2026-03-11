import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SEO from '../components/ui/SEO'

gsap.registerPlugin(ScrollTrigger)

const SERVICES_OPTIONS = [
  'Innholdsmarkedsføring',
  'Sosiale Medier',
  'SEO & SEM',
  'E-post Markedsføring',
  'Analyse & Rapportering',
  'Digital Strategi',
  'Annet',
]

const FAQS = [
  {
    q: 'Hvor raskt kan jeg forvente svar?',
    a: 'Vi svarer på alle henvendelser innen 24 timer på hverdager. Kontakter du oss i helgen, hører du fra oss første virkedag.',
  },
  {
    q: 'Tilbyr dere gratis konsultasjon?',
    a: 'Ja – vi tilbyr en gratis innledende konsultasjon på 30 minutter der vi diskuterer dine behov og hvordan vi kan hjelpe bedriften din å vokse.',
  },
  {
    q: 'Jobber dere med bedrifter utenfor Oslo?',
    a: 'Absolutt. Selv om kontoret vårt er i Oslo, jobber vi med kunder over hele Norge. De fleste tjenester leveres digitalt uten problemer.',
  },
  {
    q: 'Hva er minimumskontrakten?',
    a: 'Vi tilpasser oss dine behov. Noen prosjekter er engangsleveranser, andre er løpende samarbeid. Vi avklarer dette i den første konsultasjonen – ingen skjulte forpliktelser.',
  },
]

const SOCIALS = [
  {
    name: 'LinkedIn',
    handle: '@noramarketing',
    desc: 'Faglig innhold og bransjenyheter',
    href: 'https://linkedin.com',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    handle: '@noramarketing',
    desc: 'Bak kulissene og kreativt innhold',
    href: 'https://instagram.com',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    handle: '@noramarketing',
    desc: 'Kreativt videoinnhold og tips',
    href: 'https://tiktok.com',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.22 8.22 0 004.84 1.56V6.79a4.85 4.85 0 01-1.07-.1z" />
      </svg>
    ),
  },
]

interface FormState {
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
}

export default function Kontakt() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(
        '[data-hero-el]',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' },
      )

      // Contact detail cards
      gsap.fromTo(
        '[data-contact-card]',
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.09, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-contact-card]', start: 'top 88%' },
        },
      )

      // Office section
      gsap.fromTo(
        '[data-office-el]',
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-office-el]', start: 'top 88%' },
        },
      )

      // Socials
      gsap.fromTo(
        '[data-social-card]',
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-social-card]', start: 'top 88%' },
        },
      )

      // FAQ
      gsap.fromTo(
        '[data-faq-item]',
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-faq-item]', start: 'top 88%' },
        },
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: integrate with WordPress Contact Form 7 REST endpoint
    console.log('Form data:', form)
    setSubmitted(true)
  }

  return (
    <>
      <SEO
        title="Ta kontakt"
        description="Kontakt Nora Marketing for en uforpliktende konsultasjon om digital markedsføring og strategi."
        canonical="/kontakt"
      />

      <div ref={pageRef} className="max-w-7xl mx-auto px-6 pt-40 pb-32">

        {/* ── HERO + FORM ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 mb-24">

          {/* Left – intro + contact details */}
          <div className="flex flex-col gap-8">
            <div data-hero-el className="flex items-center gap-4" style={{ opacity: 0 }}>
              <span className="w-8 h-px bg-nm-accent" />
              <span className="font-bespoke font-bold text-xs tracking-widest2 uppercase text-nm-fg">
                Ta kontakt
              </span>
            </div>

            <h1
              data-hero-el
              className="font-satoshi font-black text-5xl md:text-6xl text-nm-light leading-tight"
              style={{ opacity: 0 }}
            >
              La oss snakke om{' '}
              <span className="text-gradient">din vekst</span>.
            </h1>

            <p
              data-hero-el
              className="font-cabinet text-nm-muted text-lg leading-relaxed"
              style={{ opacity: 0 }}
            >
              Enten du har et konkret prosjekt i tankene eller bare vil utforske mulighetene,
              er vi her for å hjelpe. Fyll ut skjemaet, så tar vi kontakt innen én virkedag.
              Ingen forpliktelser – bare en god samtale.
            </p>

            {/* Contact detail cards */}
            <div
              data-hero-el
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2"
              style={{ opacity: 0 }}
            >
              <ContactCard
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .98h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16z" />
                  </svg>
                }
                label="Telefon"
                value="+47 41 16 06 40"
                sub="Ring oss for en rask samtale"
              />
              <ContactCard
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                }
                label="E-post"
                value="Jo@noramarketing.no"
                sub="Send oss en e-post når som helst"
              />
              <ContactCard
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                }
                label="Adresse"
                value="Husebybakken 28B"
                sub="0379 Oslo, Norge"
              />
              <ContactCard
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                }
                label="Åpningstider"
                value="Man–Fre: 09:00–17:00"
                sub="Vi svarer innen 24 timer"
              />
            </div>
          </div>

          {/* Right – form */}
          <div data-hero-el style={{ opacity: 0 }}>
            {submitted ? (
              <div className="flex flex-col gap-5 items-start py-16 px-10 bg-nm-surface border border-nm-border/60 rounded-2xl">
                <span className="font-bespoke font-bold text-6xl text-nm-accent">Takk!</span>
                <p className="font-cabinet text-nm-muted text-lg leading-relaxed">
                  Vi har mottatt henvendelsen din og tar kontakt innen én virkedag.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-5 bg-nm-surface/30 border border-nm-border/60 rounded-2xl p-8"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Navn" id="name" name="name" value={form.name} onChange={handleChange} required placeholder="Ditt fulle navn" autoComplete="name" />
                  <Field label="E-post" id="email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="din@epost.no" autoComplete="email" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Telefon" id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="+47 123 45 678" autoComplete="tel" />
                  <Field label="Bedrift" id="company" name="company" value={form.company} onChange={handleChange} placeholder="Bedriftsnavn (valgfritt)" autoComplete="organization" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="service" className="font-cabinet text-sm text-nm-muted">
                    Tjeneste av interesse
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full bg-nm-surface border border-nm-border/60 focus:border-nm-accent rounded-xl px-4 py-3 text-nm-fg font-cabinet text-sm outline-none transition-colors duration-200 appearance-none pr-10"
                    >
                      <option value="">Velg en tjeneste (valgfritt)</option>
                      {SERVICES_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-nm-muted pointer-events-none" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="font-cabinet text-sm text-nm-muted">
                    Melding <span className="text-nm-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    required
                    placeholder="Fortell oss om ditt prosjekt eller hvordan vi kan hjelpe deg…"
                    className="bg-nm-surface border border-nm-border/60 focus:border-nm-accent rounded-xl px-4 py-3 text-nm-fg font-cabinet text-sm outline-none transition-colors duration-200 resize-none placeholder:text-nm-muted/50"
                  />
                </div>

                <p className="font-cabinet text-xs text-nm-muted/60">
                  * Påkrevde felt. Vi svarer vanligvis innen 24 timer på hverdager.
                </p>

                <button
                  type="submit"
                  className="mt-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-nm-accent text-white font-satoshi font-semibold rounded-xl hover:bg-nm-accent-light transition-colors duration-200"
                >
                  Send melding
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ── KONTOR ───────────────────────────────────────────────────────── */}
        <section aria-labelledby="office-heading" className="py-20 border-t border-nm-border/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            <div className="flex flex-col gap-8">
              <div data-office-el style={{ opacity: 0 }}>
                <span className="font-bespoke font-bold text-xs tracking-widest2 uppercase text-nm-accent block mb-3">
                  Vårt kontor
                </span>
                <h2 id="office-heading" className="font-satoshi font-black text-3xl text-nm-light leading-tight">
                  Nora Marketing Hub
                </h2>
              </div>

              <div data-office-el className="font-cabinet text-nm-muted text-lg leading-relaxed" style={{ opacity: 0 }}>
                Husebybakken 28B<br />
                0379 Oslo, Norge
              </div>

              <div data-office-el className="flex flex-col gap-5" style={{ opacity: 0 }}>
                <DirectionItem
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="3" width="15" height="13" rx="1" />
                      <path d="M16 8h4l3 3v5h-7V8z" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                  }
                  title="Parkering"
                  desc="Gratis parkering tilgjengelig ved kontoret"
                />
                <DirectionItem
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" />
                      <path d="M16 7V5a2 2 0 00-4 0v2M12 12v4M8 12h8" />
                    </svg>
                  }
                  title="Offentlig transport"
                  desc="Busstopp i nærheten – kort gåavstand fra kontoret"
                />
              </div>
            </div>

            {/* Decorative office card */}
            <div
              data-office-el
              className="aspect-[4/3] rounded-2xl border border-nm-border/60 bg-nm-surface/30 flex flex-col items-center justify-center gap-4 relative overflow-hidden"
              style={{ opacity: 0 }}
            >
              {/* Dot grid decoration */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: 'radial-gradient(circle, #E8E8EE 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
                aria-hidden="true"
              />
              <span className="font-bespoke font-bold text-[5rem] leading-none text-nm-accent/10 select-none" aria-hidden="true">NM</span>
              <div className="text-center">
                <p className="font-satoshi font-semibold text-nm-fg text-sm">Husebybakken 28B</p>
                <p className="font-cabinet text-nm-muted text-xs mt-1">0379 Oslo, Norge</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SOSIALE MEDIER ───────────────────────────────────────────────── */}
        <section aria-labelledby="socials-heading" className="py-20 border-t border-nm-border/50">
          <div className="mb-10">
            <span className="font-bespoke font-bold text-xs tracking-widest2 uppercase text-nm-accent block mb-3">
              Sosiale medier
            </span>
            <h2 id="socials-heading" className="font-satoshi font-black text-3xl text-nm-light">
              Følg oss for{' '}
              <span className="text-gradient">daglig innsikt.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                data-social-card
                className="group flex flex-col gap-4 p-7 bg-nm-surface/30 border border-nm-border/60 rounded-2xl hover:border-nm-accent/40 transition-colors duration-300"
                style={{ opacity: 0 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-nm-accent">{s.icon}</span>
                  <svg
                    className="text-nm-muted group-hover:text-nm-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                  >
                    <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="font-satoshi font-bold text-nm-light text-base">{s.name}</p>
                  <p className="font-cabinet text-nm-muted text-sm mt-1">{s.desc}</p>
                </div>
                <span className="font-cabinet text-xs text-nm-accent/70 group-hover:text-nm-accent transition-colors duration-200">
                  {s.handle} · Følg oss →
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section aria-labelledby="faq-heading" className="py-20 border-t border-nm-border/50">
          <div className="mb-10">
            <span className="font-bespoke font-bold text-xs tracking-widest2 uppercase text-nm-accent block mb-3">
              FAQ
            </span>
            <h2 id="faq-heading" className="font-satoshi font-black text-3xl text-nm-light">
              Ofte stilte{' '}
              <span className="text-gradient">spørsmål.</span>
            </h2>
          </div>

          <div className="flex flex-col border border-nm-border/60 rounded-2xl overflow-hidden">
            {FAQS.map((faq, i) => (
              <div key={i} data-faq-item style={{ opacity: 0 }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className={[
                    'w-full flex items-center justify-between gap-4 px-7 py-6 text-left transition-colors duration-200',
                    'hover:bg-nm-surface/60',
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
        </section>

      </div>
    </>
  )
}

function ContactCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode
  label: string
  value: string
  sub: string
}) {
  return (
    <div
      data-contact-card
      className="flex flex-col gap-2 p-5 bg-nm-surface/30 border border-nm-border/60 rounded-2xl"
      style={{ opacity: 0 }}
    >
      <span className="text-nm-accent">{icon}</span>
      <span className="font-bespoke text-[10px] tracking-widest uppercase text-nm-muted block">
        {label}
      </span>
      <span className="font-satoshi font-semibold text-nm-fg text-sm leading-snug">{value}</span>
      <span className="font-cabinet text-nm-muted text-xs">{sub}</span>
    </div>
  )
}

function DirectionItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-nm-surface border border-nm-border/60 flex items-center justify-center text-nm-accent mt-0.5">
        {icon}
      </div>
      <div>
        <p className="font-satoshi font-semibold text-nm-fg text-sm">{title}</p>
        <p className="font-cabinet text-nm-muted text-sm mt-0.5">{desc}</p>
      </div>
    </div>
  )
}

function Field({
  label,
  id,
  ...props
}: { label: string; id: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-cabinet text-sm text-nm-muted">
        {label}
        {props.required && <span className="text-nm-accent ml-0.5">*</span>}
      </label>
      <input
        id={id}
        {...props}
        className="bg-nm-surface border border-nm-border/60 focus:border-nm-accent rounded-xl px-4 py-3 text-nm-fg font-cabinet text-sm outline-none transition-colors duration-200 placeholder:text-nm-muted/50"
      />
    </div>
  )
}
