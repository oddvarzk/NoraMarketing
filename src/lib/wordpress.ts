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
}
