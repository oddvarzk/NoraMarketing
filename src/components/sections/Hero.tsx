import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from '../ui/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const CYCLING_WORDS = [
  'Digital strategi',
  'Innholdsmarkedsføring',
  'Sosiale medier',
  'SEO & SEM',
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const cycleRef = useRef<HTMLSpanElement>(null)
  const cycleIndex = useRef(0)

  // Entry animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-up reveal — no overflow clipping, so descenders are always fully visible
      gsap.set('[data-h-line]', { opacity: 0, y: 55 })

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      // Eyebrow line + text
      tl.fromTo('[data-e-line]',
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 0.7 },
        0,
      )
      tl.fromTo('[data-e-tag]',
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.5 },
        0.25,
      )

      // Each headline line fades up — staggered
      tl.to('[data-h-line]',
        { opacity: 1, y: 0, duration: 1.05, stagger: 0.1 },
        0.15,
      )

      // Sub text + CTAs
      tl.fromTo('[data-e-sub]',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
        0.75,
      )
      tl.fromTo('[data-e-cta]',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.9,
      )
      tl.fromTo('[data-e-scroll]',
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        1.4,
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Cycling specialty word
  useEffect(() => {
    const el = cycleRef.current
    if (!el) return

    const cycle = () => {
      cycleIndex.current = (cycleIndex.current + 1) % CYCLING_WORDS.length
      gsap.to(el, {
        yPercent: -110, opacity: 0, duration: 0.35, ease: 'power2.in',
        onComplete: () => {
          el.textContent = CYCLING_WORDS[cycleIndex.current]
          gsap.fromTo(el,
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.45, ease: 'power3.out' },
          )
        },
      })
    }

    const id = setInterval(cycle, 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-20"
      aria-label="Introduksjon"
    >
      <HeroBg />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-nm-dark to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center text-center">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-10 justify-center">
          <span data-e-line className="block w-8 h-px bg-nm-warm origin-left" />
          <span data-e-tag className="font-bespoke text-xs tracking-widest2 uppercase text-nm-warm" style={{ opacity: 0 }}>
            Markedsføringsbyrå
          </span>
          <span data-e-line className="block w-8 h-px bg-nm-warm" style={{ transformOrigin: 'right' }} />
        </div>

        {/* Headline */}
        <h1 className="font-satoshi font-black text-[clamp(3.2rem,7.5vw,8.5rem)] leading-[0.93] tracking-tight text-nm-light mb-10">
          <span data-h-line className="block">Vi gjør deg</span>
          <span data-h-line className="block">umulig å</span>
          <span data-h-line className="block text-gradient" style={{ paddingBottom: '0.35em', marginBottom: '-0.35em' }}>ignorere.</span>
        </h1>

        {/* Sub + cycling word */}
        <div data-e-sub className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-12" style={{ opacity: 0 }}>
          <p className="font-cabinet text-nm-muted text-lg leading-relaxed max-w-sm">
            Vi kombinerer kreativitet med strategi for å levere markedsføring som faktisk måles. Vi er spesialiserte i
          </p>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="hidden sm:block w-px h-10 bg-nm-border" />
            <div className="h-12 w-[22ch] flex items-center justify-center sm:justify-start" style={{ clipPath: 'inset(0 -9999px)' }}>
              <span
                ref={cycleRef}
                className="font-bespoke font-bold text-2xl tracking-widest uppercase text-nm-warm block whitespace-nowrap"
              >
                {CYCLING_WORDS[0]}
              </span>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div data-e-cta className="flex flex-wrap gap-4 justify-center" style={{ opacity: 0 }}>
          <MagneticButton href="/tjenester" variant="outline" size="lg">Våre tjenester</MagneticButton>
          <MagneticButton href="/kontakt" variant="primary" size="lg">Kom i kontakt</MagneticButton>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        data-e-scroll
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <span className="font-cabinet text-[10px] tracking-widest2 uppercase text-nm-muted/40">Scroll</span>
        <div className="w-px h-10 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nm-muted/40 to-transparent animate-[slideDown_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  )
}

function HeroBg() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dot-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#4B6EF5" />
          </pattern>
          <radialGradient id="dot-mask-g" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="dot-fade">
            <rect width="100%" height="100%" fill="url(#dot-mask-g)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" mask="url(#dot-fade)" />
      </svg>
      {/* Accent glow — top center */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[60vw] h-[50vh] bg-nm-accent/[0.07] rounded-full blur-[130px]" />
      {/* Warm glow — bottom */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[40vw] h-[30vh] bg-nm-warm/[0.04] rounded-full blur-[100px]" />
    </div>
  )
}
