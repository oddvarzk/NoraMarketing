import { useEffect, useState } from 'react'
import SEO from '../components/ui/SEO'
import ArrowCTA from '../components/ui/ArrowCTA'
import CTABanner from '../components/sections/CTABanner'
import { CASES } from '../lib/data'
import { wp } from '../lib/wordpress'

interface WpCase {
  idx: string
  client: string
  sector: string
  year: string
  headline: string
  metric: string
  metricLabel: string
  sub: string
  tags: string[]
  image?: string | null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapWpCase(post: any): WpCase {
  const acf = post.acf ?? {}
  const media = post._embedded?.['wp:featuredmedia']?.[0]
  return {
    idx:         acf.idx          ?? `N°${String(post.id).padStart(2, '0')}`,
    client:      acf.klient       ?? post.title?.rendered ?? '',
    sector:      acf.sektor       ?? '',
    year:        acf.aar          ?? '',
    headline:    post.title?.rendered ?? '',
    metric:      acf.metric       ?? '',
    metricLabel: acf.metric_label ?? '',
    sub:         acf.sub          ?? '',
    tags:        typeof acf.tags === 'string' ? acf.tags.split(',').map((t: string) => t.trim()) : [],
    image:       media?.source_url ?? null,
  }
}

function PageCover() {
  return (
    <section className="relative pt-40 pb-16 px-6 lg:px-10 border-b border-ink-500/40">
      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-2 flex flex-col gap-1 font-mono text-[10px] text-ink-300 tracking-widest2 uppercase">
          <div>Ch. 03</div>
          <div>6 cases</div>
          <div>2023 — 2024</div>
        </div>
        <div className="col-span-12 md:col-span-10">
          <div className="font-mono text-[10px] text-accent-blue tracking-widest2 uppercase mb-8">
            N°— Prosjekter · Ch. III
          </div>
          <h1
            className="font-display font-light leading-[0.88] text-ink-50 mb-10"
            style={{ fontSize: 'clamp(2.8rem, 10vw, 9rem)' }}
          >
            Utvalgt <em className="font-normal italic text-accent-blue">arbeid</em>,
            <br />som snakker for seg selv.
          </h1>
          <p className="font-body text-ink-200 text-lg leading-relaxed max-w-2xl">
            Seks prosjekter, seks bransjer, seks ulike utfordringer.
            Fellesnevner: strategi før eksekvering, og resultater du kan tallfeste.
          </p>
        </div>
      </div>
    </section>
  )
}

export default function Prosjekter() {
  const [cases, setCases] = useState<WpCase[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    wp.projects()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((posts: any[]) => setCases(posts.map(mapWpCase)))
      .catch(() => setCases([]))
      .finally(() => setLoading(false))
  }, [])

  const displayCases: WpCase[] = loading
    ? []
    : cases.length > 0
    ? cases
    : CASES.map(c => ({ ...c, metricLabel: '', image: null }))

  return (
    <>
      <SEO
        title="Prosjekter"
        description="Utvalgt arbeid fra Nora Marketing — digital strategi, SEO, innhold, annonsering og nettsider som leverer resultater."
        canonical="/prosjekter"
      />

      <PageCover />

      <section className="px-6 lg:px-10 py-20 border-b border-ink-500/40">
        <div className="max-w-[1400px] mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-40">
              <span className="font-mono text-[10px] text-ink-300 tracking-widest2 uppercase">Laster…</span>
            </div>
          ) : (
            displayCases.map((c, i) => (
              <article
                key={c.idx}
                className={`grid grid-cols-12 gap-6 py-16 border-b border-ink-500/60 ${i === 0 ? 'pt-6' : ''}`}
              >
                {/* Image */}
                <div className={`col-span-12 md:col-span-${i % 2 === 0 ? 7 : 5} md:order-${i % 2 === 0 ? 1 : 2}`}>
                  {c.image ? (
                    <img
                      src={c.image}
                      alt={c.client}
                      className="w-full aspect-[4/3] object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="ph aspect-[4/3]"
                      data-label={`${c.idx} · ${c.client}`}
                    />
                  )}
                </div>

                {/* Text */}
                <div className={`col-span-12 md:col-span-${i % 2 === 0 ? 5 : 7} md:order-${i % 2 === 0 ? 2 : 1} flex flex-col justify-center`}>
                  <div className="font-mono text-[10px] text-ink-300 tracking-widest2 uppercase mb-5">
                    {c.idx} · {c.sector} · {c.year}
                  </div>
                  <h3
                    className="font-display font-normal text-ink-50 leading-[0.95] mb-6"
                    style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
                  >
                    {c.headline}
                  </h3>
                  {c.metric && (
                    <div className="flex items-end gap-6 mb-6">
                      <span
                        className="font-display text-accent-blue leading-none"
                        style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontStyle: 'italic', fontWeight: 300 }}
                      >
                        {c.metric}
                      </span>
                      <div className="pb-2">
                        <div className="font-ui text-ink-50 text-sm">{c.client}</div>
                        <div className="font-body text-ink-300 text-[12px]">{c.sub}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] text-ink-300 tracking-widest uppercase mb-6">
                    {c.tags.map(t => <span key={t}>/ {t}</span>)}
                  </div>
                  <ArrowCTA to="/prosjekter">Les hele casen</ArrowCTA>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <CTABanner />
    </>
  )
}
