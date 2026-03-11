export interface WPPage {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  yoast_head_json?: {
    title?: string
    description?: string
    og_image?: { url: string }[]
  }
}

export interface WPPost {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  acf?: Record<string, unknown>
  featured_media: number
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>
  }
}

export interface Service {
  id: number
  slug: string
  title: string
  excerpt: string
  description: string
  icon?: string
  number: string
}

export interface TeamMember {
  name: string
  role: string
  image?: string
}

export interface NavItem {
  label: string
  href: string
}
