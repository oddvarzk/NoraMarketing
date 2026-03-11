export const SITE_NAME = 'Nora Marketing'
export const SITE_URL = 'https://noramarketing.no'
export const DEFAULT_DESCRIPTION =
  'Nora Marketing – markedsføringsbyrå spesialisert i digital strategi, innholdsmarkedsføring, SEO og sosiale medier i hele Norden.'

export interface SEOMeta {
  title?: string
  description?: string
  image?: string
  noindex?: boolean
  canonical?: string
}

export function buildTitle(pageTitle?: string): string {
  if (!pageTitle) return `${SITE_NAME} – Markedsføring som gir resultater`
  return `${pageTitle} – ${SITE_NAME}`
}
