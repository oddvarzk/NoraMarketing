import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SEO from '../components/ui/SEO'

gsap.registerPlugin(ScrollTrigger)

const SERVICES_OPTIONS = [
  'Innholdsmarkedsføring',
  'Sosiale Medier',
  'SEO & SEM',
  'Digital Strategi',
  'Nettsideutvikling',
  'Videoproduksjon',
  'Annet',
]

const CF7_FORM_ID = import.meta.env.VITE_CF7_FORM_ID ?? ''
const WP_BASE    = import.meta.env.VITE_WP_BASE_URL ?? 'https://cms.noramarketing.no'

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

const CONTACT_DETAILS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .98h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16z" />
      </svg>
    ),
    label: 'Telefon',
    value: '+47 41 16 06 40',
    href: 'tel:+4741160640',
    sub: 'Man–Fre, 09:00–17:00',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'E-post',
    value: 'hei@noramarketing.no',
    href: 'mailto:hei@noramarketing.no',
    sub: 'Svar innen 24 timer',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Adresse',
    value: 'Husebybakken 28B',
    href: null,
    sub: '0379 Oslo, Norge',
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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('[data-hero-el]', { opacity: 0, y: 40 })
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .to('[data-hero-el]', { opacity: 1, y: 0, duration: 1, stagger: 0.12 }, 0)

      gsap.fromTo(
        '[data-faq-item]',
        { opacity: 0, x: -18 },
        {
          opacity: 1, x: 0, duration: 0.6, stagger: 0.07, ease: 'power3.out',
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const body = new FormData()
      body.append('your-name',    form.name)
      body.append('your-email',   form.email)
      body.append('your-phone',   form.phone)
      body.append('your-company', form.company)
      body.append('your-service', form.service)
      body.append('your-message', form.message)

      const res = await fetch(
        `${WP_BASE}/wp-json/contact-form-7/v1/contact-forms/${CF7_FORM_ID}/feedback`,
        { method: 'POST', body },
      )

      const data = await res.json() as { status: string; message: string }

      if (data.status === 'mail_sent') {
        setSubmitted(true)
      } else {
        setError(data.message ?? 'Noe gikk galt. Prøv igjen eller send oss en e-post direkte.')
      }
    } catch {
      setError('Kunne ikke nå serveren. Sjekk internettforbindelsen din og prøv igjen.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO
        title="Ta kontakt"
        description="Kontakt Nora Marketing for en uforpliktende konsultasjon om digital markedsføring og strategi."
        canonical="/kontakt"
      />

      <div ref={pageRef}>

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <div className="relative pt-36 pb-20 px-6 sm:px-10 lg:px-16 border-b border-nm-border/30 overflow-hidden">
          {/* Bg watermark */}
          <div
            className="absolute bottom-0 right-0 font-bespoke font-bold leading-none pointer-events-none select-none"
            style={{
              fontSize: 'clamp(100px, 18vw, 220px)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(75,110,245,0.05)',
              transform: 'translate(5%, 35%)',
              letterSpacing: '-0.02em',
            }}
            aria-hidden="true"
          >
            HALLO
          </div>

          <div className="max-w-7xl mx-auto">
            <div data-hero-el className="flex items-center gap-3 mb-8" style={{ opacity: 0 }}>
              <span className="w-8 h-px bg-nm-accent" />
              <span className="font-bespoke text-[10px] tracking-widest2 uppercase text-nm-accent">
                Ta kontakt
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-end">
              <h1
                data-hero-el
                className="font-lora font-bold leading-[0.88] tracking-tight text-nm-light"
                style={{ fontSize: 'clamp(3rem,8vw,7rem)', opacity: 0 }}
              >
                La oss snakke om<br />
                <span className="text-nm-accent">din vekst.</span>
              </h1>

              <div data-hero-el className="flex flex-col gap-5 lg:pb-1" style={{ opacity: 0 }}>
                <p className="font-cabinet text-nm-muted text-base leading-relaxed">
                  Enten du har et konkret prosjekt eller bare vil utforske mulighetene – vi er her. Fyll ut skjemaet, så tar vi kontakt innen én virkedag.
                </p>
                {/* Contact details inline */}
                <div className="flex flex-col gap-3">
                  {CONTACT_DETAILS.map((d) => (
                    <div key={d.label} className="flex items-center gap-3">
                      <span className="text-nm-accent/60 flex-shrink-0">{d.icon}</span>
                      <div className="min-w-0">
                        {d.href ? (
                          <a href={d.href} className="font-satoshi font-medium text-nm-fg text-sm hover:text-nm-accent transition-colors duration-200">
                            {d.value}
                          </a>
                        ) : (
                          <span className="font-satoshi font-medium text-nm-fg text-sm">{d.value}</span>
                        )}
                        <span className="font-cabinet text-nm-muted/50 text-xs ml-2">{d.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── FORM + SIDEBAR ─────────────────────────────────��──────────── */}
        <div className="py-20 px-6 sm:px-10 lg:px-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-16">

            {/* Form */}
            <div data-hero-el style={{ opacity: 0 }}>
              {submitted ? (
                <div className="flex flex-col gap-5 items-start py-16 px-10 bg-nm-surface/30 border border-nm-border/50 rounded-2xl">
                  <span className="font-bespoke font-bold text-6xl text-nm-accent">Takk!</span>
                  <p className="font-cabinet text-nm-muted text-lg leading-relaxed">
                    Vi har mottatt henvendelsen din og tar kontakt innen én virkedag.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-5 bg-nm-surface/20 border border-nm-border/50 rounded-2xl p-8"
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
                      className="bg-nm-surface border border-nm-border/60 focus:border-nm-accent rounded-xl px-4 py-3 text-nm-fg font-cabinet text-sm outline-none transition-colors duration-200 resize-none placeholder:text-nm-muted/40"
                    />
                  </div>

                  <p className="font-cabinet text-xs text-nm-muted/50">
                    * Påkrevde felt. Vi svarer vanligvis innen 24 timer på hverdager.
                  </p>

                  {error && (
                    <p className="font-cabinet text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-nm-accent text-white font-satoshi font-semibold text-sm rounded-xl hover:bg-nm-accent-light transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sender…' : 'Send melding'}
                    {!loading && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-5">
              {/* Office card */}
              <div
                data-hero-el
                className="p-7 bg-nm-surface/20 border border-nm-border/50 rounded-2xl"
                style={{ opacity: 0 }}
              >
                <p className="font-bespoke text-[9px] tracking-widest2 uppercase text-nm-accent mb-4">Kontor</p>
                <p className="font-satoshi font-semibold text-nm-fg text-sm leading-snug mb-1">
                  Nora Marketing Hub
                </p>
                <p className="font-cabinet text-nm-muted text-sm leading-relaxed">
                  Husebybakken 28B<br />0379 Oslo, Norge
                </p>
                <div className="mt-5 pt-5 border-t border-nm-border/40">
                  <p className="font-bespoke text-[9px] tracking-widest2 uppercase text-nm-muted/50 mb-2">Åpningstider</p>
                  <p className="font-cabinet text-nm-muted text-sm">Man–Fre: 09:00–17:00</p>
                </div>
              </div>

              {/* Social links */}
              <div
                data-hero-el
                className="p-7 bg-nm-surface/20 border border-nm-border/50 rounded-2xl"
                style={{ opacity: 0 }}
              >
                <p className="font-bespoke text-[9px] tracking-widest2 uppercase text-nm-accent mb-5">Sosiale medier</p>
                <div className="flex flex-col gap-3">
                  {[
                    { name: 'LinkedIn', handle: '@noramarketing', href: 'https://linkedin.com' },
                    { name: 'Instagram', handle: '@noramarketing', href: 'https://instagram.com' },
                    { name: 'TikTok', handle: '@noramarketing', href: 'https://tiktok.com' },
                  ].map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between py-2 hover:text-nm-fg transition-colors duration-200"
                    >
                      <span className="font-satoshi font-medium text-nm-fg text-sm">{s.name}</span>
                      <span className="font-cabinet text-nm-muted/50 text-xs group-hover:text-nm-accent transition-colors duration-200">
                        {s.handle} →
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section aria-labelledby="faq-heading" className="py-20 px-6 sm:px-10 lg:px-16 border-t border-nm-border/30">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">

            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-px bg-nm-accent" />
                <span className="font-bespoke text-[10px] tracking-widest2 uppercase text-nm-accent">FAQ</span>
              </div>
              <h2 id="faq-heading" className="font-lora font-bold text-[clamp(1.6rem,3.5vw,2.5rem)] text-nm-light leading-[0.92] tracking-tight">
                Ofte stilte<br />
                <span style={{ WebkitTextStroke: '1px #F4F4F8', color: 'transparent' }}>spørsmål.</span>
              </h2>
            </div>

            <div className="border border-nm-border/50 rounded-2xl overflow-hidden divide-y divide-nm-border/50">
              {FAQS.map((faq, i) => (
                <div key={i} data-faq-item style={{ opacity: 0 }}>
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

      </div>
    </>
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
        className="bg-nm-surface border border-nm-border/60 focus:border-nm-accent rounded-xl px-4 py-3 text-nm-fg font-cabinet text-sm outline-none transition-colors duration-200 placeholder:text-nm-muted/40"
      />
    </div>
  )
}
