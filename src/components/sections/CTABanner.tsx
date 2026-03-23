import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from '../ui/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const TICKER_ITEMS = [
  'Vekst', '·', 'Strategi', '·', 'Resultater', '·',
  'Merkevare', '·', 'Innhold', '·', 'Analyse', '·',
  'ROI', '·', 'Konvertering', '·', 'Suksess', '·',
  'Vekst', '·', 'Strategi', '·', 'Resultater', '·',
  'Merkevare', '·', 'Innhold', '·', 'Analyse', '·',
]

export default function CTABanner() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-cta-eyebrow]',
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-cta-eyebrow]', start: 'top 85%' },
        },
      )

      gsap.fromTo(
        '[data-cta-line]',
        { clipPath: 'inset(0 100% 0.5em 0)' },
        {
          clipPath: 'inset(0 0% -0.5em 0)',
          duration: 1.1,
          stagger: 0.13,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: '[data-cta-line]', start: 'top 80%' },
        },
      )

      gsap.fromTo(
        '[data-cta-sub]',
        { opacity: 0, y: 18 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-cta-sub]', start: 'top 84%' },
        },
      )

      gsap.fromTo(
        '[data-cta-btn]',
        { opacity: 0, y: 14 },
        {
          opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-cta-btn]', start: 'top 88%' },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-nm-mid border-t border-nm-border/40"
      aria-label="Ta kontakt"
    >
      {/* Scrolling ticker — top */}
      <div
        className="border-b border-nm-border/30 py-3 overflow-hidden"
        aria-hidden="true"
      >
        <div className="marquee-track-slow opacity-[0.18]">
          {TICKER_ITEMS.map((w, i) => (
            <span key={i} className="font-bespoke text-xs tracking-widest uppercase text-nm-fg mx-5 whitespace-nowrap">
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-28 lg:py-36">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 lg:gap-12 items-end">

          {/* Left: Heading */}
          <div>
            {/* Eyebrow */}
            <div
              data-cta-eyebrow
              className="flex items-center gap-3 mb-10"
              style={{ opacity: 0 }}
            >
              <span className="w-8 h-px bg-nm-warm" />
              <span className="font-bespoke text-[10px] tracking-widest2 uppercase text-nm-warm">
                La oss snakke
              </span>
            </div>

            {/* Headline — clip reveal */}
            <h2 className="font-satoshi font-black leading-[0.88] tracking-tight" style={{ fontSize: 'clamp(3rem,8vw,7.5rem)' }}>
              <span
                data-cta-line
                className="block text-nm-light"
                style={{ clipPath: 'inset(0 100% 0.5em 0)' }}
              >
                Ta en prat
              </span>
              <span
                data-cta-line
                className="block"
                style={{ clipPath: 'inset(0 100% 0.5em 0)', WebkitTextStroke: '1.5px #F4F4F8', color: 'transparent' }}
              >
                med oss.
              </span>
            </h2>
          </div>

          {/* Right: Sub + CTAs */}
          <div className="flex flex-col gap-8">
            <p
              data-cta-sub
              className="font-cabinet text-nm-muted text-lg leading-relaxed"
              style={{ opacity: 0 }}
            >
              La oss ta en uforpliktende prat om hva Nora Marketing kan gjøre for din bedrift — ingen forpliktelser, bare muligheter.
            </p>

            {/* Contact details */}
            <div
              data-cta-sub
              className="flex flex-col gap-2 border-l-2 border-nm-accent/40 pl-4"
              style={{ opacity: 0 }}
            >
              <a
                href="tel:+4741160640"
                className="font-satoshi font-medium text-nm-fg text-sm hover:text-nm-accent transition-colors duration-200"
              >
                +47 41 16 06 40
              </a>
              <a
                href="mailto:hei@noramarketing.no"
                className="font-cabinet text-nm-muted text-sm hover:text-nm-fg transition-colors duration-200"
              >
                hei@noramarketing.no
              </a>
            </div>

            <div className="flex flex-wrap gap-4">
              <div data-cta-btn style={{ opacity: 0 }}>
                <MagneticButton href="/kontakt" variant="primary" size="lg">
                  Ta kontakt i dag
                </MagneticButton>
              </div>
              <div data-cta-btn style={{ opacity: 0 }}>
                <MagneticButton href="/tjenester" variant="outline" size="lg">
                  Se tjenester
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom ticker — reversed */}
      <div
        className="border-t border-nm-border/30 py-3 overflow-hidden"
        aria-hidden="true"
      >
        <div className="marquee-track-slow-reverse opacity-[0.12]">
          {[...TICKER_ITEMS].reverse().map((w, i) => (
            <span key={i} className="font-bespoke text-xs tracking-widest uppercase text-nm-warm mx-5 whitespace-nowrap">
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* Subtle corner accent */}
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vh] bg-nm-accent/[0.03] rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
    </section>
  )
}
