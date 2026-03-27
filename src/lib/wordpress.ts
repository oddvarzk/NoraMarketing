/**
 * WordPress REST API client
 * Set WP_BASE_URL in .env: VITE_WP_BASE_URL=https://cms.noramarketing.no
 */

const BASE_URL = import.meta.env.VITE_WP_BASE_URL ?? 'https://cms.noramarketing.no'

async function wpFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}/wp-json/wp/v2${path}`)
  if (!res.ok) throw new Error(`WP API error: ${res.status} ${path}`)
  return res.json() as Promise<T>
}

export const wp = {
  page: (slug: string) =>
    wpFetch<unknown[]>(`/pages?slug=${slug}&_embed`).then((r) => r[0]),

  pages: () => wpFetch<unknown[]>('/pages?per_page=100&_embed'),

  posts: (perPage = 10) =>
    wpFetch<unknown[]>(`/posts?per_page=${perPage}&_embed`),

  post: (slug: string) =>
    wpFetch<unknown[]>(`/posts?slug=${slug}&_embed`).then((r) => r[0]),

  /** Custom post type – register "tjenester" CPT in WordPress */
  services: () =>
    wpFetch<unknown[]>('/tjenester?per_page=100&_embed').catch(() => []),

  service: (slug: string) =>
    wpFetch<unknown[]>(`/tjenester?slug=${slug}&_embed`).then((r) => r[0]),

  /**
   * Custom post type – register "team" CPT in WordPress.
   *
   * Required ACF fields per post:
   *   - rolle        (text)  – job title / role
   *   - bio          (textarea) – short bio paragraph
   *   - spesialisering (text) – comma-separated: "SEO, Innhold"
   *   - linkedin     (url)   – full LinkedIn profile URL
   *   - siden        (text)  – year joined, e.g. "2022"
   *   - initialer    (text)  – 2-letter initials shown when no photo, e.g. "NL"
   *
   * Set a Featured Image on each post – that becomes the profile photo.
   * Order team members using the "Order" field in WordPress (Menu Order).
   */
  team: () =>
    wpFetch<unknown[]>('/team?per_page=100&_embed&orderby=menu_order&order=asc').catch(() => []),

  /**
   * Custom post type – register "prosjekter" CPT in WordPress.
   *
   * Required ACF fields per post:
   *   - kategori       (text/select) – e.g. "sosiale-medier"
   *   - klient         (text)        – client name shown on card
   *   - aar            (text)        – year, e.g. "2024"
   *   - tags           (text)        – comma-separated: "Meta Ads, Kreativ"
   *
   * Extra ACF fields for the full project page:
   *   - utfordring     (textarea)    – the client's challenge / brief
   *   - losning        (textarea)    – what Nora Marketing did
   *   - resultat_tekst (textarea)    – qualitative result description
   *
   * Set a Featured Image on each post – that becomes the card image and hero.
   * Use Excerpt for the short hover description on the card.
   */
  projects: () =>
    wpFetch<unknown[]>('/prosjekter?per_page=100&_embed').catch(() => []),

  project: (slug: string) =>
    wpFetch<unknown[]>(`/prosjekter?slug=${slug}&_embed`).then((r) => r[0]),
}
