import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../ui/Button'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { raw: 5, suffix: '+', label: 'År i bransjen' },
  { raw: 120, suffix: '+', label: 'Fornøyde kunder' },
  { raw: 3, suffix: '×', label: 'Gjennomsnittlig ROI' },
]

export default function AboutTeaser() {
  const sectionRef = useRef<HTMLElement>(null)
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal
      gsap.fromTo(
        '[data-about-text]',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-about-text]', start: 'top 80%' },
        },
      )

      // Stat cards stagger in
      gsap.fromTo(
        '[data-stat-card]',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-stat-card]', start: 'top 85%' },
        },
      )

      // Counter animation
      STATS.forEach((stat, i) => {
        const el = counterRefs.current[i]
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.raw,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
          onUpdate() {
            el.textContent = Math.floor(obj.val) + stat.suffix
          },
        })
      })

      // Accent line on the left col
      gsap.fromTo(
        '[data-accent-line]',
        { scaleY: 0, transformOrigin: 'top' },
        {
          scaleY: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-accent-line]', start: 'top 80%' },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-32 px-6"
      aria-labelledby="about-teaser-heading"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Text col */}
        <div className="flex gap-8">
          {/* Vertical accent line */}
          <div
            data-accent-line
            className="hidden lg:block w-px bg-nm-warm/40 flex-shrink-0 mt-1"
            style={{ height: 260 }}
          />

          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <span className="w-8 h-px bg-nm-accent" />
              <span className="font-bespoke font-bold text-xs tracking-widest2 uppercase text-nm-fg">
                Hvem vi er
              </span>
            </div>

            <h2
              id="about-teaser-heading"
              data-about-text
              className="font-satoshi font-black text-4xl md:text-5xl text-nm-light leading-tight"
              style={{ opacity: 0 }}
            >
              Et byrå bygget på{' '}
              resultater,{' '}
              ikke løfter.
            </h2>

            <p
              data-about-text
              className="font-cabinet text-nm-muted text-lg leading-relaxed"
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

        {/* Stats col */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 items-stretch">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              data-stat-card
              className="flex flex-col gap-2 sm:gap-3 p-4 sm:p-5 lg:p-6 bg-nm-surface border border-nm-border/60 rounded-sm"
              style={{ opacity: 0 }}
            >
              <span
                ref={(el) => { counterRefs.current[i] = el }}
                className="font-satoshi font-black text-2xl sm:text-3xl lg:text-4xl text-nm-accent"
              >
                0{stat.suffix}
              </span>
              <span className="font-cabinet text-nm-muted text-xs sm:text-sm leading-snug">
                {stat.label}
              </span>
            </div>
          ))}

          {/* Decorative bespoke word below stats */}
          <div className="col-span-3 mt-2 overflow-hidden">
            <p className="font-bespoke font-bold text-3xl sm:text-5xl text-nm-fg/[0.04] leading-none select-none">
              RESULTATER
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
