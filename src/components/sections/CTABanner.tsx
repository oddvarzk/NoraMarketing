import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from '../ui/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const MARQUEE_WORDS = [
  'Vekst', '—', 'Strategi', '—', 'Resultater', '—',
  'Merkevare', '—', 'Innhold', '—', 'Analyse', '—',
  'Vekst', '—', 'Strategi', '—', 'Resultater', '—',
  'Merkevare', '—', 'Innhold', '—', 'Analyse', '—',
]

export default function CTABanner() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clip-path reveal on heading lines
      gsap.fromTo(
        '[data-cta-line]',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1,
          stagger: 0.12,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: '[data-cta-line]', start: 'top 80%' },
        },
      )

      gsap.fromTo(
        '[data-cta-sub]',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-cta-sub]', start: 'top 82%' },
        },
      )

      gsap.fromTo(
        '[data-cta-btn]',
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-cta-btn]', start: 'top 85%' },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-nm-surface/40 border-t border-nm-border/40"
      aria-label="Ta kontakt"
    >
      {/* Scrolling background marquee */}
      <div
        className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <div className="marquee-track-slow opacity-[0.03]">
          {MARQUEE_WORDS.map((w, i) => (
            <span key={i} className="font-bespoke font-bold text-[8vw] text-nm-fg mx-6 whitespace-nowrap">
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* Accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-64 bg-nm-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-10">
          <span className="w-8 h-px bg-nm-warm" />
          <span className="font-bespoke font-bold text-xs tracking-widest2 uppercase text-nm-warm">
            La oss snakke
          </span>
        </div>

        {/* Heading – clip reveal line by line */}
        <h2 className="font-satoshi font-black text-5xl md:text-7xl text-nm-light leading-[0.95] tracking-tight mb-10">
          <span data-cta-line className="block" style={{ clipPath: 'inset(0 100% 0 0)' }}>
            La oss gjøre deg
          </span>
          <span data-cta-line className="block text-gradient" style={{ clipPath: 'inset(0 100% 0 0)' }}>
            umulig å ignorere.
          </span>
        </h2>

        <p
          data-cta-sub
          className="font-cabinet text-nm-muted text-xl leading-relaxed max-w-lg mb-12"
          style={{ opacity: 0 }}
        >
          La oss ta en uforpliktende prat om hva Nora Marketing kan gjøre for din bedrift.
        </p>

        <div className="flex flex-wrap gap-5">
          <div data-cta-btn style={{ opacity: 0 }}>
            <MagneticButton href="/kontakt" variant="primary" size="lg">
              Ta kontakt i dag
            </MagneticButton>
          </div>
          <div data-cta-btn style={{ opacity: 0 }}>
            <MagneticButton href="/tjenester" variant="outline" size="lg">
              Se alle tjenester
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}
