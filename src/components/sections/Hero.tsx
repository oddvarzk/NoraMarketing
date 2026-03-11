import { useEffect, useRef } from 'react'
import { gsap } from '../../hooks/useGSAP'
import MagneticButton from '../ui/MagneticButton'

const CYCLING_WORDS = [
  'Digital strategi',
  'Innholdsmarkedsføring',
  'Sosiale medier',
  'SEO & SEM',
]

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

  // Intro animations
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

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh flex flex-col justify-center overflow-hidden px-6 pt-28 pb-20"
      aria-label="Introduksjon"
    >
      {/* Background: dot grid + gradient glows */}
      <HeroBg />

      {/* Bottom fade into page */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-nm-dark to-transparent pointer-events-none" />

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

/**
 * Pure CSS background: a faint dot grid + two soft gradient glows.
 * No JS, no random dots — clean and works on all screen sizes.
 */
function HeroBg() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {/* Dot grid via SVG pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.18]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dot-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#4B6EF5" />
          </pattern>
          {/* Radial mask so dots fade to edges */}
          <radialGradient id="dot-mask" cx="40%" cy="50%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="fade-mask">
            <rect width="100%" height="100%" fill="url(#dot-mask)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" mask="url(#fade-mask)" />
      </svg>

      {/* Soft accent glow — top right */}
      <div className="absolute -top-20 right-0 w-[50vw] h-[60vh] bg-nm-accent/[0.07] rounded-full blur-[120px]" />
      {/* Warm glow — bottom left */}
      <div className="absolute bottom-0 -left-20 w-[40vw] h-[40vh] bg-nm-warm/[0.05] rounded-full blur-[100px]" />
    </div>
  )
}
