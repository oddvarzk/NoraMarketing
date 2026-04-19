import { useState } from 'react'
import SEO from '../components/ui/SEO'
import ProcessSection from '../components/sections/ProcessSection'
import CTABanner from '../components/sections/CTABanner'
import { SERVICES, FAQS } from '../lib/data'

const RICH_SERVICES = SERVICES.map(s => ({
  ...s,
  deliverables: s.deliverables,
}))

function PageCover() {
  return (
    <section className="relative pt-40 pb-16 px-6 lg:px-10 border-b border-ink-500/40 overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-2 flex flex-col gap-1 font-mono text-[10px] text-ink-300 tracking-widest2 uppercase">
          <div>Ch. 02</div>
          <div>8 disipliner</div>
          <div>Oslo · 2026</div>
        </div>
        <div className="col-span-12 md:col-span-10">
          <div className="font-mono text-[10px] text-accent-blue tracking-widest2 uppercase mb-8">
            N°— Tjenester · Ch. II
          </div>
          <h1
            className="font-display font-light leading-[0.88] text-ink-50 mb-10"
            style={{ fontSize: 'clamp(2.8rem, 10vw, 9rem)' }}
          >
            <em className="font-normal italic">Åtte</em> disipliner.
            <br /><span className="t-outline">Én standard.</span>
          </h1>
          <p className="font-body text-ink-200 text-lg leading-relaxed max-w-2xl">
            Alt vi leverer er skreddersydd. Ingen pakker, ingen tiers. Du får det som faktisk trengs
            — og ingenting mer.
          </p>
        </div>
      </div>
    </section>
  )
}

export default function Tjenester() {
  return (
    <>
      <SEO
        title="Tjenester"
        description="Åtte markedsføringsdisipliner — skreddersydd for din bedrift. Digital strategi, innhold, SEO, sosiale medier, video og mer."
        canonical="/tjenester"
      />

      <PageCover />

      {/* Service grid */}
      <section className="px-6 lg:px-10 py-20 border-b border-ink-500/40">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-12 gap-6">
            {RICH_SERVICES.map(s => (
              <article key={s.slug} className="col-span-12 md:col-span-6 group">
                <div className="flex items-start justify-between py-8 border-t border-ink-500/60">
                  <div className="flex gap-6 flex-1 min-w-0">
                    <span className="font-mono text-[10px] text-ink-300 tracking-widest w-10 shrink-0 pt-2">
                      {s.num}
                    </span>
                    <div className="flex-1">
                      <h3
                        className="font-display font-normal text-ink-50 leading-tight mb-3"
                        style={{ fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)' }}
                      >
                        {s.title}
                      </h3>
                      <p className="font-body text-ink-200 text-[14px] leading-relaxed mb-5 max-w-md">
                        {s.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-4 font-mono text-[10px] text-ink-300 tracking-widest uppercase">
                        {s.deliverables.map(d => <span key={d}>— {d}</span>)}
                      </div>
                    </div>
                  </div>
                  <span className="text-accent-blue text-xl group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection />

      {/* FAQ */}
      <section className="px-6 lg:px-10 py-28 border-b border-ink-500/40">
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-4">
            <div className="font-mono text-[10px] text-accent-blue tracking-widest2 uppercase mb-4">FAQ</div>
            <h2
              className="font-display font-light text-ink-50 leading-[0.95]"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
            >
              Ofte stilte<br /><em className="font-normal italic">spørsmål.</em>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-8">
            {FAQS.map((f, i) => <FaqRow key={i} f={f} />)}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}

function FaqRow({ f }: { f: { q: string; a: string } }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-t border-ink-500/60 last:border-b">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between py-6 text-left"
      >
        <span className="font-display text-ink-50 text-xl">{f.q}</span>
        <span className={`text-accent-blue transition-transform text-2xl ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: open ? 200 : 0 }}
      >
        <p className="font-body text-ink-200 text-[15px] leading-relaxed pb-6 max-w-2xl">{f.a}</p>
      </div>
    </div>
  )
}
