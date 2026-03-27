import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../ui/Button'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { raw: 5,   suffix: '+', label: 'År i bransjen',       sub: 'Med dokumenterte resultater' },
  { raw: 120, suffix: '+', label: 'Fornøyde kunder',     sub: 'I hele Norden' },
  { raw: 3,   suffix: '×', label: 'Gjennomsnittlig ROI', sub: 'For våre kunder' },
]

const TESTIMONIAL = {
  quote: 'Nora Marketing snudde vår digitale tilstedeværelse fra usynlig til markedsledende. Resultatene taler for seg selv.',
  author: 'Erik Haugen',
  title: 'Daglig leder, Nordvik Eiendom',
}

export default function AboutTeaser() {
  const sectionRef = useRef<HTMLElement>(null)
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-about-text]',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.13, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-about-text]', start: 'top 82%' },
        },
      )

      gsap.fromTo(
        '[data-stat-card]',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-stat-card]', start: 'top 86%' },
        },
      )

      STATS.forEach((stat, i) => {
        const el = counterRefs.current[i]
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.raw,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 86%' },
          onUpdate() {
            el.textContent = Math.floor(obj.val) + stat.suffix
          },
        })
      })

      gsap.fromTo(
        '[data-testimonial]',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-testimonial]', start: 'top 85%' },
        },
      )

      gsap.fromTo(
        '[data-accent-line]',
        { scaleY: 0, transformOrigin: 'top' },
        {
          scaleY: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-accent-line]', start: 'top 82%' },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-32 px-6 sm:px-12 lg:px-20 border-t border-nm-border/25"
      aria-labelledby="about-teaser-heading"
    >
      <div className="max-w-7xl mx-auto">

        {/* Top grid: text left, stats right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-20">

          {/* Text column */}
          <div className="flex gap-8">
            <div
              data-accent-line
              className="hidden lg:block w-px bg-gradient-to-b from-nm-accent/60 to-nm-accent/0 flex-shrink-0 mt-1"
              style={{ height: 280 }}
            />

            <div className="flex flex-col gap-7">
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-nm-accent" />
                <span className="font-bespoke text-[10px] tracking-widest2 uppercase text-nm-accent">
                  Hvem vi er
                </span>
              </div>

              <h2
                id="about-teaser-heading"
                data-about-text
                className="font-satoshi font-black text-[clamp(1.9rem,4vw,3.5rem)] text-nm-light leading-[0.92] tracking-tight"
                style={{ opacity: 0 }}
              >
                Et byrå bygget på<br />resultater,{' '}
                <span style={{ WebkitTextStroke: '1px #E8E8EE', color: 'transparent' }}>
                  ikke løfter.
                </span>
              </h2>

              <p
                data-about-text
                className="font-cabinet text-nm-muted text-base lg:text-lg leading-relaxed"
                style={{ opacity: 0 }}
              >
                Nora Marketing ble grunnlagt med én ambisjon: å levere markedsføring
                som faktisk måles i krone og øre. Vi er et dedikert team med dyp
                bransjeforståelse og ingen unnskyldninger.
              </p>

              <div data-about-text style={{ opacity: 0 }}>
                <Button href="/hvem-vi-er" variant="outline">
                  Les mer om oss
                </Button>
              </div>
            </div>
          </div>

          {/* Stats column */}
          <div className="flex flex-col gap-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                data-stat-card
                className="flex items-center gap-6 p-5 bg-nm-surface/40 border border-nm-border/50 rounded-xl hover:border-nm-border transition-colors duration-300"
                style={{ opacity: 0 }}
              >
                <span
                  ref={(el) => { counterRefs.current[i] = el }}
                  className="font-satoshi font-black text-[clamp(2rem,4vw,2.75rem)] text-nm-accent leading-none tabular-nums w-[5ch] flex-shrink-0"
                >
                  0{stat.suffix}
                </span>
                <div>
                  <p className="font-satoshi font-semibold text-nm-fg text-sm leading-snug">
                    {stat.label}
                  </p>
                  <p className="font-cabinet text-nm-muted/60 text-xs mt-0.5">
                    {stat.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial strip */}
        <div
          data-testimonial
          className="relative border border-nm-border/50 bg-nm-surface/20 rounded-2xl px-8 py-8 md:px-12 md:py-10 overflow-hidden"
          style={{ opacity: 0 }}
        >
          {/* Quote mark */}
          <span
            className="absolute top-4 left-8 font-bespoke font-bold text-[6rem] leading-none text-nm-accent/[0.07] select-none pointer-events-none"
            aria-hidden="true"
          >
            "
          </span>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-end">
            <blockquote>
              <p className="font-satoshi font-semibold text-nm-fg text-lg md:text-xl leading-relaxed">
                "{TESTIMONIAL.quote}"
              </p>
            </blockquote>

            <div className="flex flex-col gap-0.5 md:text-right flex-shrink-0">
              <p className="font-satoshi font-bold text-nm-fg text-sm">
                {TESTIMONIAL.author}
              </p>
              <p className="font-cabinet text-nm-muted/60 text-xs tracking-wide">
                {TESTIMONIAL.title}
              </p>
              {/* Star rating */}
              <div className="flex gap-1 md:justify-end mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-3 h-3 text-nm-accent" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                    <path d="M6 1l1.4 2.8 3.1.4-2.25 2.2.53 3.1L6 8.05 3.22 9.5l.53-3.1L1.5 4.2l3.1-.4L6 1z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
