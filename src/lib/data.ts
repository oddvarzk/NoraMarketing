export const SERVICES = [
  { num: '01', title: 'Nettsideutvikling',      slug: 'nettsideutvikling',     excerpt: 'Skreddersydde nettsider som ser unike ut og konverterer — raske, mobilvennlige, og klare for vekst.', category: 'Utvikling', deliverables: ['Design & UX', 'Utvikling', 'CMS', 'Vedlikehold'] },
  { num: '02', title: 'Digital Strategi',        slug: 'digital-strategi',      excerpt: 'En helhetlig strategi som binder kanalene sammen og peker hver krone mot samme mål.', category: 'Strategi',  deliverables: ['Analyse', 'Posisjonering', 'Kanalmiks', 'Roadmap'] },
  { num: '03', title: 'Innholdsmarkedsføring',   slug: 'innholdsmarkedsforing', excerpt: 'Strategisk innhold som bygger merkevare, tiltrekker riktige kunder og konverterer.', category: 'Innhold',   deliverables: ['Redaksjonell plan', 'Tekst', 'Foto & video', 'Distribusjon'] },
  { num: '04', title: 'Sosiale Medier',          slug: 'sosiale-medier',        excerpt: 'Målrettet tilstedeværelse på riktige plattformer – fra strategi og produksjon til analyse.', category: 'Kanaler',   deliverables: ['Konseptutvikling', 'Innhold', 'Annonsering', 'Community'] },
  { num: '05', title: 'SEO & SEM',               slug: 'seo-sem',               excerpt: 'Organisk synlighet og betalt annonsering som gir målbar trafikk og lavere CPA.', category: 'Søk',       deliverables: ['Teknisk SEO', 'Innholds-SEO', 'Google Ads', 'Rapportering'] },
  { num: '06', title: 'Videoproduksjon',          slug: 'videoproduksjon',       excerpt: 'Engasjerende videoinnhold som stopper scrollingen og forteller historien din.', category: 'Kreativ',   deliverables: ['Konsept', 'Storyboard', 'Opptak', 'Klipp & grading'] },
  { num: '07', title: 'E-post Markedsføring',    slug: 'epost-markedsforing',   excerpt: 'Personaliserte e-postløp som bygger relasjoner og øker livstidsverdien.', category: 'CRM',       deliverables: ['Flow-design', 'Segmentering', 'A/B-testing', 'Rapportering'] },
  { num: '08', title: 'Analyse & Rapportering',  slug: 'analyse-rapportering',  excerpt: 'Transparente dashboards og innsikter som gjør markedsføring målbar i krone og øre.', category: 'Data',      deliverables: ['Dashboard', 'Attribusjon', 'KPI-rammeverk', 'Månedsrapport'] },
]

export const CASES = [
  { idx: 'N°01', client: 'Nordvik Eiendom',  sector: 'Eiendom',     year: '2024', headline: 'Fra lokal til ledende',           metric: '+340%', metricLabel: 'Kvalifiserte leads',  sub: 'på 90 dager',              tags: ['Strategi', 'Google Ads', 'Meta'] },
  { idx: 'N°02', client: 'Helios AS',        sector: 'Energi',      year: '2024', headline: 'Firedoblet organisk synlighet',   metric: '4×',    metricLabel: 'Organisk trafikk',   sub: 'over 6 måneder',           tags: ['SEO', 'Innhold', 'E-post'] },
  { idx: 'N°03', client: 'Forma Studio',     sector: 'Design',      year: '2023', headline: 'Halverte kostnaden per kunde',    metric: '−52%',  metricLabel: 'CPA',                sub: 'ved kampanjeoptimalisering', tags: ['Meta Ads', 'Kreativ', 'Analyse'] },
  { idx: 'N°04', client: 'Bergström & Co.', sector: 'Retail',      year: '2024', headline: 'Nettbutikk som faktisk selger',   metric: '+218%', metricLabel: 'Omsetning netto',    sub: 'Q1 mot Q4 forrige år',     tags: ['Nettside', 'Shopify', 'CRO'] },
  { idx: 'N°05', client: 'Kvartett Hotell', sector: 'Hospitality', year: '2023', headline: 'Direkte bookinger over OTA',      metric: '+61%',  metricLabel: 'Direkte booking',    sub: 'fra 2022 til 2023',        tags: ['Strategi', 'Meta', 'SEO'] },
  { idx: 'N°06', client: 'Apex Group',      sector: 'B2B · SaaS',  year: '2024', headline: 'Pipeline med 7-sifret verdi',     metric: '12×',   metricLabel: 'ROI',                sub: 'på 12 måneder',            tags: ['ABM', 'LinkedIn', 'E-post'] },
]

export const PROCESS = [
  { num: '01', title: 'Oppdag',   sub: 'Uke 1 – 2',  body: 'Vi kartlegger din bedrift, målgruppe og marked. Vi finner hva som faktisk holder deg tilbake.',      tags: ['Intervjuer', 'Markedsanalyse', 'Datarevisjon'] },
  { num: '02', title: 'Strategi', sub: 'Uke 3 – 4',  body: 'Vi bygger en spissformulert plan som binder kanaler sammen og prioriterer innsats brutalt.',           tags: ['Posisjonering', 'Kanalmiks', 'KPI-rammeverk'] },
  { num: '03', title: 'Bygg',     sub: 'Uke 5 – 10', body: 'Kreativitet møter håndverk. Vi produserer innhold, nettsider og kampanjer som leverer.',               tags: ['Innhold', 'Design', 'Annonsering'] },
  { num: '04', title: 'Skalér',   sub: 'Løpende',    body: 'Data, iterasjon, optimalisering. Stillstand finnes ikke i markeder som beveger seg.',                  tags: ['Rapportering', 'A/B-testing', 'Læring'] },
]

export const TEAM = [
  { id: 'anna',   name: 'Anna Lindqvist', role: 'Partner · Strategi',  initials: 'AL', bio: 'Drev kommunikasjon for et av Nordens største eiendomsfirmaer før hun grunnla Nora. Liker korte møter og lange analyser.' },
  { id: 'jonas',  name: 'Jonas Berg',     role: 'Partner · Kreativ',   initials: 'JB', bio: 'Tidligere art director i Oslo-byrå. Gjør merkevarer tydelige — og skiftende trender forståelige.' },
  { id: 'maria',  name: 'Maria Solberg',  role: 'Innhold & Redaksjon', initials: 'MS', bio: 'Journalist i hjertet. Skriver som et menneske, ikke som et LinkedIn-innlegg.' },
  { id: 'erik',   name: 'Erik Haugen',    role: 'Performance & Data',  initials: 'EH', bio: 'Lever i regneark slik at du slipper. Ser trender før dashboards gjør det.' },
  { id: 'ingrid', name: 'Ingrid Sletten', role: 'Utvikling',           initials: 'IS', bio: 'Bygger nettsider du ikke vil lukke. Tror fortsatt at fart er en feature.' },
]

export const VALUES = [
  { num: '01', title: 'Strategi først',             body: 'Ingen løsninger før vi kjenner problemet. Vi begynner med kartlegging, ikke kampanje.' },
  { num: '02', title: 'Resultat over løfter',       body: 'Vi måler alt i krone og øre. Hvis det ikke beveger nålen, gjør vi det ikke.' },
  { num: '03', title: 'Enkel, klar kommunikasjon',  body: 'Uten jargong. Uten støy. Et budskap som treffer mottakeren, ikke bransjen.' },
  { num: '04', title: 'Partnerskap, ikke byrå',     body: 'Dine mål er våre mål. Vi sitter ved samme bord, ikke på motsatt side.' },
]

export const FAQS = [
  { q: 'Hvor raskt kan jeg forvente svar?',        a: 'Innen 24 timer på hverdager. Tar du kontakt i helgen, hører du fra oss første virkedag.' },
  { q: 'Tilbyr dere gratis konsultasjon?',         a: 'Ja — en uforpliktende 30-minutters samtale hvor vi forstår behov og diskuterer om vi passer sammen.' },
  { q: 'Jobber dere med bedrifter utenfor Oslo?',  a: 'Vi er basert i Oslo, men jobber med kunder i hele Norden. Det meste leveres digitalt uten friksjon.' },
  { q: 'Hva er minimumskontrakten?',               a: 'Vi tilpasser oss. Noen prosjekter er engangsleveranser, andre er løpende partnerskap. Ingen skjulte forpliktelser.' },
  { q: 'Hva koster et typisk prosjekt?',           a: 'Det varierer fra 40 000 NOK for mindre nettsideprosjekter til løpende retainer-avtaler. Vi gir alltid fastpris før vi starter.' },
]

export const TICKER = ['Vekst','·','Strategi','·','Resultater','·','Merkevare','·','Innhold','·','Konvertering','·','ROI','·','Oslo','·','Norden','·','Est. 2020','·']
