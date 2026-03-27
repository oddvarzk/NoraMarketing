# Nora Marketing – Nettside

Offisiell nettside for Nora Marketing. Bygget med Vite, React 19, TypeScript og Tailwind CSS.

---

## Tech-stack

| Verktøy | Bruk |
|---|---|
| [Vite](https://vitejs.dev) | Byggverktøy og dev-server |
| [React 19](https://react.dev) | UI-rammeverk |
| [TypeScript](https://www.typescriptlang.org) | Typesikkerhet |
| [Tailwind CSS v3](https://tailwindcss.com) | Styling |
| [GSAP](https://gsap.com) | Animasjoner og ScrollTrigger |
| [React Router v7](https://reactrouter.com) | Klientside-routing |
| [react-helmet-async](https://github.com/staylor/react-helmet-async) | SEO / meta-tags |

---

## Fonter

Lastes inn via [Fontshare](https://www.fontshare.com) i `index.html`:

- **Satoshi** → overskrifter (`font-satoshi`)
- **Cabinet Grotesk** → brødtekst (`font-cabinet`)
- **Bespoke Stencil** → logo og aksent-tekst (`font-bespoke`)

---

## Fargepalette

Alle farger er definert under `nm-*` prefikset i `tailwind.config.js`:

| Token | Farge | Bruk |
|---|---|---|
| `nm-dark` | `#0D0D0F` | Sidebakgrunn |
| `nm-mid` | `#141418` | Footer-bakgrunn |
| `nm-surface` | `#1A1A22` | Kort og paneler |
| `nm-border` | `#2A2A35` | Kanter og skillelinjer |
| `nm-accent` | `#4B6EF5` | Primær aksent (blå) |
| `nm-accent-light` | `#7B96FF` | Lysere aksent-variant |
| `nm-muted` | `#6B6B80` | Sekundær tekst |
| `nm-fg` | `#E8E8EE` | Primær forgrunns-tekst |
| `nm-light` | `#F4F4F8` | Lyseste tekst (hero-overskrift) |

---

## Kom i gang

```bash
# Installer avhengigheter
npm install

# Start utviklingsserver
npm run dev

# Bygg for produksjon
npm run build

# Forhåndsvis produksjonsbygg
npm run preview
```

---

## Prosjektstruktur

```
src/
├── components/
│   ├── layout/       # Navbar, Footer, Layout-wrapper
│   ├── sections/     # Hero, ServicesSection, AboutTeaser, osv.
│   └── ui/           # Button, SEO, NMLogo
├── pages/            # Home, Tjenester, Prosjekter, HvemViEr, Kontakt
├── hooks/            # useGSAP-helper
├── lib/              # wordpress.ts (CMS-klient), seo.ts
└── index.css         # Globale stiler og marquee-animasjoner
```

---

## Sider

| Rute | Side |
|---|---|
| `/` | Forside |
| `/tjenester` | Tjenesteoversikt |
| `/tjenester/:slug` | Enkelt tjeneste-side |
| `/prosjekter` | Prosjekter og case studies |
| `/hvem-vi-er` | Om byrået |
| `/kontakt` | Kontaktskjema |

---

## Miljøvariabler

Lag en `.env`-fil i rotkatalogen:

```env
VITE_WP_BASE_URL=https://cms.noramarketing.no
```

Denne peker mot WordPress REST API for headless CMS-integrasjon. `src/lib/wordpress.ts` håndterer alle API-kall.

---

## Video (Hero)

Hero-seksjonen bruker en bakgrunnsvideo. Plasser filen her:

```
public/noraMarketing.mp4
```

Videoen refereres direkte i `src/components/sections/Hero.tsx`.

---

## CMS – WordPress

Nettsiden støtter headless WordPress via REST API:

- Sett `VITE_WP_BASE_URL` i `.env`
- WordPress trenger custom post type `tjenester` registrert
- Kontaktskjema kan kobles til Contact Form 7 eller WPForms REST API i `src/pages/Kontakt.tsx`

---

## Bygg og deploy

```bash
npm run build
```

Outputen legges i `dist/`-mappen og kan deployes til Vercel, Netlify eller en hvilken som helst statisk host.

> Husk å sette `VITE_WP_BASE_URL` som miljøvariabel i hostingpanelet.
