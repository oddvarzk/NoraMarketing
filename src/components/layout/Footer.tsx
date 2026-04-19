import { Link } from 'react-router-dom'

const SERVICES = [
  'Nettsideutvikling',
  'Digital Strategi',
  'Innholdsmarkedsføring',
  'Sosiale Medier',
  'SEO & SEM',
  'Videoproduksjon',
]

export default function Footer() {
  return (
    <footer className="border-t border-ink-500/40 bg-ink-900 pt-20 pb-8 px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto">

        {/* Top grid */}
        <div className="grid grid-cols-12 gap-8 mb-20">
          {/* CTA column */}
          <div className="col-span-12 md:col-span-5">
            <div
              className="font-display font-medium leading-[0.9] text-ink-50 mb-6"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              Klar for<br />
              <em className="font-normal text-accent-blue">arbeid som</em><br />
              <span className="t-outline">teller?</span>
            </div>
            <Link
              to="/kontakt"
              className="group inline-flex items-center gap-3"
            >
              <span className="font-ui font-medium text-[13px] tracking-wide text-ink-50 uppercase">
                Ta kontakt
              </span>
              <span className="h-px w-10 bg-ink-50 group-hover:w-16 transition-all duration-500" />
              <span className="text-accent-blue">→</span>
            </Link>
          </div>

          {/* Tjenester */}
          <div className="col-span-6 md:col-span-2">
            <div className="font-mono text-[10px] text-ink-300 uppercase tracking-widest2 mb-5">
              Tjenester
            </div>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.map(s => (
                <li key={s}>
                  <Link
                    to="/tjenester"
                    className="font-body text-[13px] text-ink-200 hover:text-ink-50 transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Selskapet */}
          <div className="col-span-6 md:col-span-2">
            <div className="font-mono text-[10px] text-ink-300 uppercase tracking-widest2 mb-5">
              Selskapet
            </div>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'Hvem vi er',  to: '/hvem-vi-er'  },
                { label: 'Prosjekter', to: '/prosjekter'  },
                { label: 'Kontakt',    to: '/kontakt'     },
              ].map(l => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="font-body text-[13px] text-ink-200 hover:text-ink-50 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontor */}
          <div className="col-span-12 md:col-span-3">
            <div className="font-mono text-[10px] text-ink-300 uppercase tracking-widest2 mb-5">
              Kontor
            </div>
            <div className="font-body text-[13px] text-ink-200 leading-relaxed mb-4">
              Husebybakken 28B<br />0379 Oslo, Norge
            </div>
            <a
              href="tel:+4741160640"
              className="block font-ui text-[13px] text-ink-50 mb-1 hover:text-accent-blue transition-colors"
            >
              +47 41 16 06 40
            </a>
            <a
              href="mailto:hei@noramarketing.no"
              className="block font-body text-[13px] text-ink-200 hover:text-ink-50 transition-colors"
            >
              hei@noramarketing.no
            </a>
          </div>
        </div>

        {/* Big display wordmark */}
        <div className="mb-10 overflow-hidden">
          <div
            className="font-display font-light text-ink-50 leading-[0.8] italic"
            style={{ fontSize: 'clamp(3rem, 18vw, 18rem)' }}
          >
            Nora<span className="text-accent-blue">.</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6 border-t border-ink-500/40">
          <div className="font-mono text-[10px] text-ink-300 tracking-widest2 uppercase">
            © {new Date().getFullYear()} Nora Marketing AS · Org. 924 183 501
          </div>
          <div className="flex gap-5 font-mono text-[10px] text-ink-300 tracking-widest2 uppercase">
            <a href="https://linkedin.com"  target="_blank" rel="noopener noreferrer" className="hover:text-ink-50 transition-colors">LinkedIn</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-ink-50 transition-colors">Instagram</a>
            <a href="https://tiktok.com"    target="_blank" rel="noopener noreferrer" className="hover:text-ink-50 transition-colors">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
