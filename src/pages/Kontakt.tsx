import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import SEO from '../components/ui/SEO'

const SERVICES_OPTIONS = [
  'Innholdsmarkedsføring',
  'Sosiale Medier',
  'SEO & SEM',
  'E-post Markedsføring',
  'Analyse & Rapportering',
  'Annet',
]

interface FormState {
  name: string
  email: string
  company: string
  service: string
  message: string
}

export default function Kontakt() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-hero-el]',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' },
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: integrate with WordPress Contact Form 7 REST endpoint or similar
    // e.g. POST /wp-json/contact-form-7/v1/contact-forms/{id}/feedback
    console.log('Form data:', form)
    setSubmitted(true)
  }

  return (
    <>
      <SEO
        title="Ta kontakt"
        description="Kontakt Nora Marketing for en uforpliktende prat om markedsføring og digital strategi."
        canonical="/kontakt"
      />

      <div ref={heroRef} className="max-w-7xl mx-auto px-6 pt-40 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left – intro */}
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
              <span className="text-gradient">vekst</span>.
            </h1>

            <p
              data-hero-el
              className="font-cabinet text-nm-muted text-lg leading-relaxed"
              style={{ opacity: 0 }}
            >
              Fyll ut skjemaet, så tar vi kontakt innen én virkedag.
              Ingen forpliktelser – bare en god samtale.
            </p>

            {/* Contact details */}
            <div
              data-hero-el
              className="flex flex-col gap-4 mt-4 pt-8 border-t border-nm-border/50"
              style={{ opacity: 0 }}
            >
              <ContactDetail label="E-post" value="hei@noramarketing.no" />
              <ContactDetail label="Telefon" value="+47 000 00 000" />
              <ContactDetail label="Adresse" value="Oslo, Norge" />
            </div>
          </div>

          {/* Right – form */}
          <div data-hero-el style={{ opacity: 0 }}>
            {submitted ? (
              <div className="flex flex-col gap-4 items-start py-16">
                <span className="font-bespoke font-bold text-5xl text-nm-accent">Takk!</span>
                <p className="font-cabinet text-nm-muted text-lg">
                  Vi har mottatt henvendelsen din og tar kontakt snart.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field
                    label="Navn"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                  />
                  <Field
                    label="E-post"
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>

                <Field
                  label="Bedrift"
                  id="company"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  autoComplete="organization"
                />

                {/* Service select */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="service" className="font-cabinet text-sm text-nm-muted">
                    Hva kan vi hjelpe med?
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="bg-nm-surface border border-nm-border/60 focus:border-nm-accent rounded-sm px-4 py-3 text-nm-fg font-cabinet text-sm outline-none transition-colors duration-200 appearance-none"
                  >
                    <option value="">Velg tjeneste…</option>
                    {SERVICES_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="font-cabinet text-sm text-nm-muted">
                    Melding
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    required
                    placeholder="Fortell oss kort om bedriften din og hva du ønsker å oppnå…"
                    className="bg-nm-surface border border-nm-border/60 focus:border-nm-accent rounded-sm px-4 py-3 text-nm-fg font-cabinet text-sm outline-none transition-colors duration-200 resize-none placeholder:text-nm-muted/50"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-4 bg-nm-accent text-white font-satoshi font-medium rounded-sm hover:bg-nm-accent-light transition-colors duration-200"
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
      </div>
    </>
  )
}

function ContactDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-cabinet text-xs text-nm-muted tracking-widest uppercase">{label}</span>
      <span className="font-satoshi font-medium text-nm-fg">{value}</span>
    </div>
  )
}

function Field({
  label,
  id,
  ...props
}: {
  label: string
  id: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-cabinet text-sm text-nm-muted">
        {label}
        {props.required && <span className="text-nm-accent ml-0.5">*</span>}
      </label>
      <input
        id={id}
        {...props}
        className="bg-nm-surface border border-nm-border/60 focus:border-nm-accent rounded-sm px-4 py-3 text-nm-fg font-cabinet text-sm outline-none transition-colors duration-200 placeholder:text-nm-muted/50"
      />
    </div>
  )
}
