import { useEffect, useRef } from 'react'
import { gsap } from '../../hooks/useGSAP'
import MagneticButton from '../ui/MagneticButton'

const CYCLING_WORDS = [
  'Digital strategi',
  'Innholdsmarkedsføring',
  'Sosiale medier',
  'SEO & SEM',
]

/** Splits a string into word-reveal spans */
function WordReveal({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((word, i) => (
        <span key={i} className="word-wrap">
          <span
            data-word
            className={`inline-block ${className}`}
            style={{ transform: 'translateY(110%)' }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </>
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const cycleRef = useRef<HTMLSpanElement>(null)
  const cycleIndex = useRef(0)

  // Word reveal on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = sectionRef.current!.querySelectorAll('[data-word]')
      gsap.to(words, {
        yPercent: 0,
        duration: 1.1,
        stagger: 0.065,
        ease: 'power4.out',
        delay: 0.2,
      })

      gsap.fromTo(
        '[data-eyebrow]',
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 },
      )
      gsap.fromTo(
        '[data-eyebrow-text]',
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out', delay: 0.4 },
      )

      gsap.fromTo(
        '[data-hero-sub]',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.9 },
      )
      gsap.fromTo(
        '[data-hero-cta]',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 1.1 },
      )
      gsap.fromTo(
        '[data-scroll-hint]',
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 1.8 },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Cycling word swap
  useEffect(() => {
    const el = cycleRef.current
    if (!el) return

    const cycle = () => {
      cycleIndex.current = (cycleIndex.current + 1) % CYCLING_WORDS.length
      gsap.to(el, {
        yPercent: -120,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          el.textContent = CYCLING_WORDS[cycleIndex.current]
          gsap.fromTo(
            el,
            { yPercent: 120, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
          )
        },
      })
    }

    const id = setInterval(cycle, 2600)
    return () => clearInterval(id)
  }, [])

  // Parallax on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('[data-hero-bg]', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh flex flex-col justify-center overflow-hidden px-6 pt-28 pb-20"
      aria-label="Introduksjon"
    >
      {/* Decorative huge background "NM" monogram */}
      <div
        data-hero-bg
        className="absolute -right-4 top-1/2 -translate-y-1/2 select-none pointer-events-none"
        aria-hidden="true"
      >
        <span className="font-bespoke font-bold leading-none block" style={{ fontSize: '32vw' }}>
          <span className="text-nm-fg/[0.022]">N</span>
          <span className="text-nm-accent/[0.06]">M</span>
        </span>
      </div>

      {/* Mesh dots + glow */}
      <MeshDots />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-nm-dark to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-10">
          <span data-eyebrow className="block w-10 h-px bg-nm-warm origin-left" />
          <span
            data-eyebrow-text
            className="font-bespoke text-xs tracking-widest2 uppercase text-nm-warm"
            style={{ opacity: 0 }}
          >
            Markedsføringsbyrå
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-satoshi font-black text-[clamp(3rem,8vw,8rem)] leading-[0.92] tracking-tight text-nm-light mb-10 max-w-5xl">
          <span className="block">
            <WordReveal text="Markedsføring" />
          </span>
          <span className="block">
            <WordReveal text="som faktisk gir" />
          </span>
          <span className="block">
            <WordReveal text="resultater" className="text-gradient" />
            <span className="word-wrap">
              <span data-word className="inline-block" style={{ transform: 'translateY(110%)' }}>.</span>
            </span>
          </span>
        </h1>

        {/* Sub row */}
        <div
          data-hero-sub
          className="flex flex-col md:flex-row md:items-end gap-8 mb-12"
          style={{ opacity: 0 }}
        >
          <p className="font-cabinet text-nm-muted text-lg leading-relaxed max-w-sm">
            Vi kombinerer Nora sitt design med moderne markedsføringsstrategi.
            Vi er spesialiserte i alt innenfor
          </p>

          <div className="flex items-center gap-3 pb-1">
            <span className="w-px h-10 bg-nm-border flex-shrink-0" />
            <div className="overflow-hidden h-8 flex items-center">
              <span
                ref={cycleRef}
                className="font-bespoke font-bold text-lg tracking-widest uppercase text-nm-warm block"
              >
                {CYCLING_WORDS[0]}
              </span>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div data-hero-cta className="flex flex-wrap gap-4" style={{ opacity: 0 }}>
          <MagneticButton href="/tjenester" variant="outline">
            Våre tjenester
          </MagneticButton>
          <MagneticButton href="/kontakt" variant="primary">
            Kom i kontakt
          </MagneticButton>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        data-scroll-hint
        className="absolute bottom-8 left-6 flex items-center gap-3"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <div className="w-px h-12 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nm-muted/50 to-transparent animate-[slideDown_2s_ease-in-out_infinite]" />
        </div>
        <span className="font-cabinet text-[10px] tracking-widest2 uppercase text-nm-muted/50">
          Scroll
        </span>
      </div>
    </section>
  )
}

function MeshDots() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const dots = ref.current?.querySelectorAll<HTMLSpanElement>('[data-dot]')
      dots?.forEach((d, i) => {
        gsap.to(d, {
          y: `${(i % 2 === 0 ? -1 : 1) * (8 + (i % 4) * 5)}`,
          x: `${(i % 3 === 0 ? -1 : 1) * (4 + (i % 3) * 4)}`,
          duration: 4 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {DOT_POSITIONS.map(({ x, y, size, opacity }, i) => (
        <span
          key={i}
          data-dot
          className="absolute rounded-full bg-nm-accent"
          style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, opacity }}
        />
      ))}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-nm-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-nm-warm/[0.04] rounded-full blur-3xl" />
    </div>
  )
}

const DOT_POSITIONS = [
  { x: 15, y: 20, size: 3, opacity: 0.4 },
  { x: 72, y: 12, size: 2, opacity: 0.3 },
  { x: 88, y: 35, size: 4, opacity: 0.2 },
  { x: 55, y: 70, size: 2, opacity: 0.35 },
  { x: 10, y: 65, size: 3, opacity: 0.25 },
  { x: 80, y: 80, size: 2, opacity: 0.3 },
  { x: 30, y: 85, size: 2, opacity: 0.2 },
  { x: 65, y: 45, size: 3, opacity: 0.15 },
  { x: 40, y: 15, size: 2, opacity: 0.3 },
  { x: 92, y: 60, size: 2, opacity: 0.25 },
]
