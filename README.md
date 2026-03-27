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

## CMS – WordPress oppsett

Nettsiden henter innhold fra WordPress via REST API. Begge innholdstyper (tjenester og prosjekter) fungerer med fallback-data hvis WP ikke er koblet til ennå – så siden vil alltid vise noe.

### 1. Miljøvariabel

Lag en `.env`-fil i rotkatalogen (eller sett den i hostingpanelet):

```env
VITE_WP_BASE_URL=https://cms.noramarketing.no
```

---

### 2. Nødvendige plugins i WordPress

Installer disse to pluginene:

| Plugin | Hvorfor |
|---|---|
| **Custom Post Type UI** (gratisversjon fra wordpress.org) | Lager de egendefinerte innholdstypene |
| **Advanced Custom Fields (ACF)** (gratisversjon holder) | Legger til ekstrafelter på postene |

---

### 3. Tjenester (`/tjenester`)

#### Steg 1 – Lag CPT med Custom Post Type UI

Gå til **CPT UI → Add/Edit Post Types** og fyll inn:

| Felt | Verdi |
|---|---|
| Post Type Slug | `tjenester` |
| Plural Label | `Tjenester` |
| Singular Label | `Tjeneste` |
| Has Archive | Av |
| Show in REST API | **På** ← viktig |
| REST API base slug | `tjenester` |

Klikk **Add Post Type**.

#### Steg 2 – Legg til ACF-felter

Gå til **ACF → Field Groups → Add New**, gi gruppen navnet `Tjeneste-felter`, og sett **Location** til `Post Type == tjenester`.

Legg til disse feltene:

| Feltnavn (Label) | Field Name | Felttype |
|---|---|---|
| Kategori | `kategori` | Text |
| Ingress / Excerpt | – | Bruk den innebygde WordPress Excerpt-boksen i stedet |

> Tjenestens tittel og innhold skrives i den vanlige WordPress-editoren. Excerpt-feltet (kort beskrivelse) finner du under editoren – klikk **Screen Options** øverst til høyre og huk av for **Excerpt** hvis det ikke vises.

#### Steg 3 – Legg til en tjeneste

1. Gå til **Tjenester → Add New**
2. Skriv inn tjenestens navn som **tittel**
3. Skriv full beskrivelse i **innholdsblokken**
4. Fyll inn `kategori`-feltet (f.eks. `Strategi`)
5. Legg til en **Featured Image** (vises på tjenestesiden)
6. Klikk **Publish**

---

### 4. Team (`/hvem-vi-er`)

#### Steg 1 – Lag CPT med Custom Post Type UI

Gå til **CPT UI → Add/Edit Post Types** og fyll inn:

| Felt | Verdi |
|---|---|
| Post Type Slug | `team` |
| Plural Label | `Team` |
| Singular Label | `Teammedlem` |
| Has Archive | Av |
| Show in REST API | **På** ← viktig |
| REST API base slug | `team` |
| Supports | Title, Thumbnail (Featured Image) |

Klikk **Add Post Type**.

#### Steg 2 – Legg til ACF-felter

Gå til **ACF → Field Groups → Add New**, gi gruppen navnet `Team-felter`, og sett **Location** til `Post Type == team`.

Legg til disse feltene:

| Feltnavn (Label) | Field Name | Felttype | Eksempel |
|---|---|---|---|
| Rolle | `rolle` | Text | `Grunnlegger & Daglig leder` |
| Bio | `bio` | Textarea | Kort beskrivende avsnitt |
| Spesialisering | `spesialisering` | Text | `SEO, Innhold, Strategi` |
| LinkedIn | `linkedin` | URL | `https://linkedin.com/in/navn` |
| Siden | `siden` | Text | `2019` |
| Initialer | `initialer` | Text | `NL` (vises hvis ingen bilde) |

#### Steg 3 – Legg til et teammedlem

1. Gå til **Team → Add New**
2. Skriv personens fulle navn som **tittel**
3. Fyll inn alle ACF-feltene
4. Last opp et **Featured Image** – dette blir profilbildet
5. Sett **rekkefølge** under **Page Attributes → Order** (0 = først, 1 = andre, osv.)
6. Klikk **Publish**

Teammedlemmet dukker opp automatisk på `/hvem-vi-er` i riktig rekkefølge. Slett et teammedlem ved å flytte det til papirkurven i WordPress.

---

### 5. Prosjekter (`/prosjekter`)

#### Steg 1 – Lag CPT med Custom Post Type UI

Gå til **CPT UI → Add/Edit Post Types** og fyll inn:

| Felt | Verdi |
|---|---|
| Post Type Slug | `prosjekter` |
| Plural Label | `Prosjekter` |
| Singular Label | `Prosjekt` |
| Has Archive | Av |
| Show in REST API | **På** ← viktig |
| REST API base slug | `prosjekter` |

Klikk **Add Post Type**.

#### Steg 2 – Legg til ACF-felter

Gå til **ACF → Field Groups → Add New**, gi gruppen navnet `Prosjekt-felter`, og sett **Location** til `Post Type == prosjekter`.

Legg til disse feltene:

| Feltnavn (Label) | Field Name | Felttype | Eksempel-verdi |
|---|---|---|---|
| Kategori | `kategori` | Text | `sosiale-medier` |
| Klient | `klient` | Text | `Nordvik Eiendom` |
| År | `aar` | Text | `2024` |
| Tags | `tags` | Text | `Meta Ads, Kreativ, A/B-testing` |
| Utfordringen | `utfordring` | Textarea | Hva var kundens problem/brief |
| Løsningen | `losning` | Textarea | Hva Nora Marketing gjorde |
| Resultat-beskrivelse | `resultat_tekst` | Textarea | Kvalitativ beskrivelse av resultatet |

> `utfordring`, `losning` og `resultat_tekst` vises på den individuelle prosjektsiden (`/prosjekter/:slug`). Kortet på oversiktssiden bruker WordPress **Excerpt**-feltet (aktiver via Screen Options).

**Gyldige verdier for `kategori`** (må skrives nøyaktig slik):

```
sosiale-medier
seo-sem
innholdsmarkedsforing
nettsideutvikling
digital-strategi
videoproduksjon
```

#### Steg 3 – Legg til et prosjekt

1. Gå til **Prosjekter → Add New**
2. Skriv klientens navn som **tittel** (vises på kortet)
3. Skriv en kort beskrivelse i **Excerpt**-feltet (vises på hover) – aktiver det via **Screen Options** hvis det ikke synes
4. Fyll inn ACF-feltene: `kategori`, `klient`, `aar`, `tags`
5. Last opp et **Featured Image** – dette er bildet som vises på prosjektkortet
6. Klikk **Publish**

Prosjektet dukker nå opp automatisk på `/prosjekter` under riktig kategori.

> For å **slette** et prosjekt: flytt det til papirkurven i WordPress. Det forsvinner fra nettsiden umiddelbart.

---

### 5. CORS

Hvis nettsiden og WordPress ligger på forskjellige domener (f.eks. nettside på Vercel og WP på et eget subdomain), må du tillate forespørsler fra nettsidens domene. Legg dette til i WordPress-temaets `functions.php`:

```php
add_action('rest_api_init', function () {
    header('Access-Control-Allow-Origin: https://noramarketing.no');
    header('Access-Control-Allow-Methods: GET');
});
```

Bytt ut `https://noramarketing.no` med det faktiske domenet til nettsiden.

---

### 6. Kontaktskjema (Contact Form 7)

Kontaktskjemaet er koblet til Contact Form 7 via REST API. Slik setter du det opp:

#### Steg 1 – Installer plugin

Installer **Contact Form 7** fra wordpress.org (gratis).

#### Steg 2 – Lag skjemaet

Gå til **Contact → Add New** i WordPress og gi skjemaet et navn, f.eks. `Kontaktskjema – Nora Marketing`.

Erstatt innholdet i **Form**-fanen med dette:

```
[text* your-name placeholder "Ditt fulle navn"]
[email* your-email placeholder "din@epost.no"]
[tel* your-phone placeholder "+47 123 45 678"]
[text your-company placeholder "Bedriftsnavn (valgfritt)"]
[select your-service "Innholdsmarkedsføring" "Sosiale Medier" "SEO & SEM" "Digital Strategi" "Nettsideutvikling" "Videoproduksjon" "Annet"]
[textarea* your-message placeholder "Fortell oss om ditt prosjekt…"]
[submit "Send melding"]
```

> Feltnavnene (`your-name`, `your-email` osv.) **må** skrives nøyaktig slik – nettsiden sender data med disse navnene.

#### Steg 3 – Sett opp e-postvarsling

Under **Mail**-fanen i CF7, sett:

| Felt | Verdi |
|---|---|
| To | `hei@noramarketing.no` |
| From | `[your-email]` |
| Subject | `Ny henvendelse fra [your-name]` |
| Message body | `Navn: [your-name]` `E-post: [your-email]` `Telefon: [your-phone]` `Bedrift: [your-company]` `Tjeneste: [your-service]` `Melding: [your-message]` |

Klikk **Save**.

#### Steg 4 – Finn skjema-ID

Etter lagring vises skjema-IDen øverst på siden, f.eks.:

```
ID: 123
```

#### Steg 5 – Legg til i .env

```env
VITE_WP_BASE_URL=https://ditt-staging-domene.no
VITE_CF7_FORM_ID=123
```

Bytt ut `123` med din faktiske skjema-ID. Husk å sette begge variablene i hostingpanelet ved deploy.

#### Test det

Fyll ut skjemaet på `/kontakt` og trykk Send. Hvis alt er riktig får du en bekreftelse på siden og en e-post i innboksen.

---

## Bygg og deploy

```bash
npm run build
```

Outputen legges i `dist/`-mappen og kan deployes til Vercel, Netlify eller en hvilken som helst statisk host.

> Husk å sette `VITE_WP_BASE_URL` som miljøvariabel i hostingpanelet.
