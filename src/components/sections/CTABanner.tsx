import ArrowCTA from '../ui/ArrowCTA'
import { TICKER } from '../../lib/data'

const doubled = [...TICKER, ...TICKER]

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden border-t border-ink-500/40">

      {/* Top ticker */}
      <div className="py-4 border-b border-ink-500/30 overflow-hidden" aria-hidden>
        <div className="marquee">
          {doubled.map((w, i) => (
            <span key={i} className="font-mono text-[11px] text-ink-300 tracking-widest2 uppercase mx-4">
              {w}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-32 grid grid-cols-12 gap-6">
        {/* Left: headline */}
        <div className="col-span-12 md:col-span-8">
          <div className="font-mono text-[10px] text-accent-blue tracking-widest2 uppercase mb-8">
            N°06 — La oss snakke
          </div>
          <h2
            className="font-display font-light leading-[0.92] text-ink-50"
            style={{ fontSize: 'clamp(2.4rem, 7vw, 7rem)' }}
          >
            <span className="block overflow-hidden">
              <span className="inline-block">Ta en</span>
            </span>
            <span className="block overflow-hidden">
              <span className="inline-block italic">prat med</span>
            </span>
            <span className="block overflow-hidden">
              <span className="inline-block text-accent-blue">oss.</span>
            </span>
          </h2>
        </div>

        {/* Right: sub + contact + CTA */}
        <div className="col-span-12 md:col-span-4 flex flex-col justify-end gap-6">
          <p className="font-body text-ink-200 text-lg leading-relaxed">
            30 minutter uten forpliktelser. Vi hører, stiller dumme spørsmål,
            og sier ærlig om vi er riktig partner.
          </p>
          <div className="border-l-2 border-accent-blue pl-4">
            <a href="tel:+4741160640" className="block font-ui text-ink-50 text-sm hover:text-accent-blue transition-colors">
              +47 41 16 06 40
            </a>
            <a href="mailto:hei@noramarketing.no" className="block font-body text-ink-200 text-sm hover:text-ink-50 transition-colors">
              hei@noramarketing.no
            </a>
          </div>
          <ArrowCTA to="/kontakt" variant="solid">Bestill samtale</ArrowCTA>
        </div>
      </div>

      {/* Bottom ticker (reversed, accent colour) */}
      <div className="py-4 border-t border-ink-500/30 overflow-hidden" aria-hidden>
        <div className="marquee-rev">
          {doubled.map((w, i) => (
            <span key={i} className="font-mono text-[11px] text-accent-blue tracking-widest2 uppercase mx-4">
              {w}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
