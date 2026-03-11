import { Helmet } from 'react-helmet-async'
import { buildTitle, DEFAULT_DESCRIPTION, SITE_URL } from '../../lib/seo'
import type { SEOMeta } from '../../lib/seo'

interface Props extends SEOMeta {}

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image,
  noindex = false,
  canonical,
}: Props) {
  const fullTitle = buildTitle(title)
  const ogImage = image ?? `${SITE_URL}/og-default.jpg`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      {canonical && <link rel="canonical" href={`${SITE_URL}${canonical}`} />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {canonical && <meta property="og:url" content={`${SITE_URL}${canonical}`} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Language */}
      <meta httpEquiv="content-language" content="no" />
    </Helmet>
  )
}
