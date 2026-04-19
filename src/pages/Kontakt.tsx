import { useState } from 'react'
import SEO from '../components/ui/SEO'
import ArrowCTA from '../components/ui/ArrowCTA'
import CTABanner from '../components/sections/CTABanner'
import { SERVICES, FAQS } from '../lib/data'

const CF7_FORM_ID = import.meta.env.VITE_CF7_FORM_ID ?? ''
const WP_BASE    = import.meta.env.VITE_WP_BASE_URL ?? 'https://cms.noramarketing.no'

const SERVICE_CHIPS = SERVICES.map(s => s.title)

interface FormState {
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
}

function PageCover() {
  return (
    <section className="relative pt-40 pb-16 px-6 lg:px-10 border-b border-ink-500/40">
      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-2 flex flex-col gap-1 font-mono text-[10px] text-ink-300 tracking-widest2 uppercase">
          <div>Ch. 05</div>
          <div>Svar &lt; 24t</div>
          <div>Husebybakken 28B</div>
        </div>
        <div className="col-span-12 md:col-span-10">
          <div className="font-mono text-[10px] text-accent-blue tracking-widest2 uppercase mb-8">
            N°— Kontakt · Ch. V
          </div>
          <h1
            className="font-display font-light leading-[0.88] text-ink-50 mb-10"
            style={{ fontSize: 'clamp(2.8rem, 10vw, 9rem)' }}
          >
            La oss snakke
            <br /><em className="font-normal italic text-accent-blue">om din vekst.</em>
          </h1>
          <p className="font-body text-ink-200 text-lg leading-relaxed max-w-2xl">
            Enten du har et konkret prosjekt eller bare vil utforske mulighetene — vi er her.
            Fyll ut skjemaet, så tar vi kontakt innen én virkedag.
          </p>
        </div>
      </div>
    </section>
  )
}

function FaqRow({ f }: { f: { q: string; a: string } }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-t border-ink-500/60 last:border-b">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between py-6 text-left"
      >
        <span className="font-display text-ink-50 text-xl">{f.q}</span>
        <span className={`text-accent-blue transition-transform text-2xl ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: open ? 200 : 0 }}
      >
        <p className="font-body text-ink-200 text-[15px] leading-relaxed pb-6 max-w-2xl">{f.a}</p>
      </div>
    </div>
  )
}

export default function Kontakt() {
  const [form, setForm] = useState<FormState>({
    name: '', email: '', phone: '', company: '', service: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function toggleChip(chip: string) {
    setForm(prev => ({ ...prev, service: prev.service === chip ? '' : chip }))
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

      const res  = await fetch(
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
        title="Kontakt"
        description="Ta kontakt med Nora Marketing for en uforpliktende samtale om digital markedsføring og strategi."
        canonical="/kontakt"
      />

      <PageCover />

      {/* Form + Sidebar */}
      <section className="px-6 lg:px-10 py-20 border-b border-ink-500/40">
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-10">

          {/* Form */}
          <div className="col-span-12 lg:col-span-8">
            {submitted ? (
              <div className="border border-ink-500/60 p-16 flex flex-col gap-6">
                <span
                  className="font-display text-accent-blue leading-none"
                  style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', fontStyle: 'italic', fontWeight: 300 }}
                >
                  Takk.
                </span>
                <p className="font-body text-ink-200 text-lg leading-relaxed max-w-lg">
                  Vi har mottatt henvendelsen din og tar kontakt innen én virkedag.
                </p>
                <ArrowCTA to="/" variant="line">Tilbake til forsiden</ArrowCTA>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="border border-ink-500/60 p-10 flex flex-col gap-8">
                <div className="font-mono text-[10px] text-ink-300 tracking-widest2 uppercase">§ I — Dine opplysninger</div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label="Navn" id="name" name="name" value={form.name} onChange={handleChange} required placeholder="Ditt fulle navn" autoComplete="name" />
                  <Field label="E-post" id="email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="din@epost.no" autoComplete="email" />
                  <Field label="Telefon" id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+47 123 45 678" autoComplete="tel" />
                  <Field label="Bedrift" id="company" name="company" value={form.company} onChange={handleChange} placeholder="Bedriftsnavn (valgfritt)" autoComplete="organization" />
                </div>

                <div>
                  <div className="font-mono text-[10px] text-ink-300 tracking-widest2 uppercase mb-5">§ II — Tjeneste av interesse</div>
                  <div className="flex flex-wrap gap-3">
                    {SERVICE_CHIPS.map(chip => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => toggleChip(chip)}
                        className={`px-4 py-2 border font-mono text-[10px] tracking-widest uppercase transition-colors ${
                          form.service === chip
                            ? 'border-accent-blue bg-accent-blue/10 text-accent-blue'
                            : 'border-ink-500/60 text-ink-300 hover:border-ink-400 hover:text-ink-200'
                        }`}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[10px] text-ink-300 tracking-widest2 uppercase mb-5">§ III — Melding</div>
                  <label htmlFor="message" className="sr-only">Melding</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    required
                    placeholder="Fortell oss om prosjektet ditt…"
                    className="w-full bg-transparent border border-ink-500/60 focus:border-accent-blue px-5 py-4 font-body text-ink-100 text-[15px] outline-none transition-colors placeholder:text-ink-500 resize-none"
                  />
                </div>

                {error && (
                  <p className="font-body text-sm text-red-400 border border-red-400/30 px-5 py-3">
                    {error}
                  </p>
                )}

                <div className="flex items-center gap-8">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-accent-blue text-ink-50 font-ui font-medium text-sm tracking-wide hover:bg-accent-blueL transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sender…' : 'Send melding'}
                    {!loading && <span className="text-base">→</span>}
                  </button>
                  <p className="font-mono text-[10px] text-ink-400 tracking-widest2">
                    * Svar innen 24 timer på hverdager
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div className="border border-ink-500/60 p-8">
              <div className="font-mono text-[10px] text-accent-blue tracking-widest2 uppercase mb-6">Kontor</div>
              <div className="flex flex-col gap-1 mb-6">
                <span className="font-ui text-ink-50 text-sm font-medium">Nora Marketing</span>
                <span className="font-body text-ink-300 text-[14px]">Husebybakken 28B</span>
                <span className="font-body text-ink-300 text-[14px]">0379 Oslo, Norge</span>
              </div>
              <div className="border-t border-ink-500/40 pt-6 flex flex-col gap-3">
                <a href="tel:+4741160640" className="font-ui text-ink-200 text-sm hover:text-ink-50 transition-colors">
                  +47 41 16 06 40
                </a>
                <a href="mailto:hei@noramarketing.no" className="font-body text-ink-300 text-[13px] hover:text-ink-100 transition-colors">
                  hei@noramarketing.no
                </a>
                <span className="font-mono text-[10px] text-ink-400 tracking-widest2 uppercase">Man–Fre · 09:00–17:00</span>
              </div>
            </div>

            <div className="border border-ink-500/60 p-8">
              <div className="font-mono text-[10px] text-accent-blue tracking-widest2 uppercase mb-6">Følg oss</div>
              <div className="flex flex-col gap-4">
                {[
                  { name: 'LinkedIn', handle: '@noramarketing', href: 'https://linkedin.com/company/noramarketing' },
                  { name: 'Instagram', handle: '@noramarketing', href: 'https://instagram.com/noramarketing' },
                  { name: 'TikTok', handle: '@noramarketing', href: 'https://tiktok.com/@noramarketing' },
                ].map(s => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between group"
                  >
                    <span className="font-ui text-ink-200 text-sm group-hover:text-ink-50 transition-colors">{s.name}</span>
                    <span className="font-mono text-[10px] text-ink-400 tracking-widest group-hover:text-accent-blue transition-colors">{s.handle} →</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 lg:px-10 py-28 border-b border-ink-500/40">
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-4">
            <div className="font-mono text-[10px] text-accent-blue tracking-widest2 uppercase mb-4">FAQ</div>
            <h2
              className="font-display font-light text-ink-50 leading-[0.95]"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
            >
              Ofte stilte<br /><em className="font-normal italic">spørsmål.</em>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-8">
            {FAQS.map((f, i) => <FaqRow key={i} f={f} />)}
          </div>
        </div>
      </section>

      <CTABanner />
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
      <label htmlFor={id} className="font-mono text-[10px] text-ink-300 tracking-widest2 uppercase">
        {label}{props.required && <span className="text-accent-blue ml-1">*</span>}
      </label>
      <input
        id={id}
        {...props}
        className="bg-transparent border border-ink-500/60 focus:border-accent-blue px-5 py-4 font-body text-ink-100 text-[15px] outline-none transition-colors placeholder:text-ink-500"
      />
    </div>
  )
}
