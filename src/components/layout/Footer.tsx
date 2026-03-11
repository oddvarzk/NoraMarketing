import { Link } from 'react-router-dom'
import NMLogo from '../ui/NMLogo'

const LINKS = {
  Tjenester: [
    { label: 'Innholdsmarkedsføring', href: '/tjenester/innholdsmarkedsforing' },
    { label: 'Sosiale Medier', href: '/tjenester/sosiale-medier' },
    { label: 'SEO & SEM', href: '/tjenester/seo-sem' },
    { label: 'E-post Markedsføring', href: '/tjenester/epost-markedsforing' },
    { label: 'Analyse & Rapportering', href: '/tjenester/analyse-rapportering' },
    { label: 'Digital Strategi', href: '/tjenester/digital-strategi' },
  ],
  Selskapet: [
    { label: 'Hvem vi er', href: '/hvem-vi-er' },
    { label: 'Ta kontakt', href: '/kontakt' },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-nm-border/50 bg-nm-mid">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <NMLogo />
            <p className="text-nm-muted text-sm leading-relaxed max-w-xs">
              Markedsføringsbyrå spesialisert i digital strategi for bedrifter i hele Norden.
            </p>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([section, items]) => (
            <div key={section}>
              <p className="font-satoshi text-xs font-semibold tracking-widest2 uppercase text-nm-muted mb-5">
                {section}
              </p>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-sm text-nm-fg/70 hover:text-nm-fg transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-nm-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-nm-muted text-xs">
            © {year} Nora Marketing. Alle rettigheter forbeholdt.
          </p>
          <p className="text-nm-muted text-xs">
            Organisasjonsnummer: 123 456 789
          </p>
        </div>
      </div>
    </footer>
  )
}
