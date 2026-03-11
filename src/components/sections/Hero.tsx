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

const STRIPS = [
  {
    text: 'VEKST · STRATEGI · RESULTATER · VEKST · STRATEGI · RESULTATER · ',
    dir: 1,
    speed: 28,
    cls: 'font-satoshi font-black text-[3.5rem] leading-none text-nm-fg/[0.09]',
  },
  {
    text: 'Innholdsmarkedsføring · SEO & SEM · Sosiale Medier · Analyse · ',
    dir: -1,
    speed: 40,
    cls: 'font-cabinet text-[1.4rem] leading-none text-nm-fg/[0.07]',
  },
  {
    text: 'MARKEDSFØRING · MARKEDSFØRING · MARKEDSFØRING · ',
    dir: 1,
    speed: 18,
    cls: 'font-bespoke font-bold text-[5.5rem] leading-none text-nm-fg/[0.08]',
  },
  {
    text: 'Digital Strategi · Merkevare · Konvertering · ROI · Vekst · ',
    dir: -1,
    speed: 50,
    cls: 'font-satoshi text-[1.1rem] leading-none text-nm-fg/[0.06]',
  },
  {
    text: 'NM · NM · NM · NM · NM · NM · NM · NM · NM · NM · NM · ',
    dir: 1,
    speed: 22,
    cls: 'font-bespoke font-bold text-[3rem] leading-none text-nm-accent/[0.18]',
  },
]

function WordReveal({ text, className = '' }: { text: string; className?: string }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <span key={i} className="word-wrap">
          <span
            data-word
            className={`inline-block ${className}`}
            style={{ transform: 'translateY(110%)' }}
          >
            {word}
            {i < text.split(' ').length - 1 ? '\u00A0' : ''}
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
        yPercent: 0, duration: 1.1, stagger: 0.065, ease: 'power4.out', delay: 0.2,
      })
      gsap.fromTo('[data-eyebrow]',
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 },
      )
      gsap.fromTo('[data-eyebrow-text]',
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out', delay: 0.4 },
      )
      gsap.fromTo('[data-hero-sub]',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.9 },
      )
      gsap.fromTo('[data-hero-cta]',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 1.1 },
      )
      gsap.fromTo('[data-scroll-hint]',
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 1.8 },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Cycling word
  useEffect(() => {
    const el = cycleRef.current
    if (!el) return
    const cycle = () => {
      cycleIndex.current = (cycleIndex.current + 1) % CYCLING_WORDS.length
      gsap.to(el, {
        yPercent: -120, opacity: 0, duration: 0.4, ease: 'power2.in',
        onComplete: () => {
          el.textContent = CYCLING_WORDS[cycleIndex.current]
          gsap.fromTo(el,
            { yPercent: 120, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
          )
        },
      })
    }
    const id = setInterval(cycle, 2600)
    return () => clearInterval(id)
  }, [])

  // Strips parallax on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      const stripsEls = document.querySelectorAll('[data-strip]')
      stripsEls.forEach((el, i) => {
        const dir = i % 2 === 0 ? -1 : 1
        gsap.to(el, {
          x: dir * 60,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh overflow-hidden"
      aria-label="Introduksjon"
    >
      {/* Subtle dot grid + glow blobs */}
      <HeroBg />

      {/* Bottom page fade */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-nm-dark to-transparent pointer-events-none z-10" />

      {/* Two-column grid */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 min-h-dvh grid grid-cols-1 lg:grid-cols-2">

        {/* ── Left: content ── */}
        <div className="flex flex-col justify-center pt-28 pb-20 pr-0 lg:pr-12">
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
          <h1 className="font-satoshi font-black text-[clamp(2.8rem,6.5vw,7rem)] leading-[0.92] tracking-tight text-nm-light mb-10">
            <span className="block"><WordReveal text="Markedsføring" /></span>
            <span className="block"><WordReveal text="som faktisk gir" /></span>
            <span className="block">
              <WordReveal text="resultater" className="text-gradient" />
              <span className="word-wrap">
                <span data-word className="inline-block" style={{ transform: 'translateY(110%)' }}>.</span>
              </span>
            </span>
          </h1>

          {/* Sub */}
          <div
            data-hero-sub
            className="flex flex-col md:flex-row md:items-end gap-8 mb-12"
            style={{ opacity: 0 }}
          >
            <p className="font-cabinet text-nm-muted text-lg leading-relaxed max-w-xs">
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
            <MagneticButton href="/tjenester" variant="outline">Våre tjenester</MagneticButton>
            <MagneticButton href="/kontakt" variant="primary">Kom i kontakt</MagneticButton>
          </div>
        </div>

        {/* ── Right: kinetic visual ── */}
        <div className="hidden lg:block relative overflow-hidden">
          <KineticStrips />
        </div>
      </div>

      {/* Scroll hint */}
      <div
        data-scroll-hint
        className="absolute bottom-8 left-6 flex items-center gap-3 z-20"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <div className="w-px h-12 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nm-muted/50 to-transparent animate-[slideDown_2s_ease-in-out_infinite]" />
        </div>
        <span className="font-cabinet text-[10px] tracking-widest2 uppercase text-nm-muted/50">Scroll</span>
      </div>
    </section>
  )
}

/** Kinetic marquee strips with cursor lens effect */
function KineticStrips() {
  const panelRef = useRef<HTMLDivElement>(null)
  const lensRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const panel = panelRef.current
    const lens = lensRef.current
    if (!panel || !lens) return

    const onMove = (e: MouseEvent) => {
      const rect = panel.getBoundingClientRect()
      gsap.to(lens, {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        duration: 0.55,
        ease: 'power2.out',
      })
    }
    const onEnter = () => gsap.to(lens, { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' })
    const onLeave = () => gsap.to(lens, { opacity: 0, scale: 0.6, duration: 0.5, ease: 'power3.out' })

    panel.addEventListener('mousemove', onMove)
    panel.addEventListener('mouseenter', onEnter)
    panel.addEventListener('mouseleave', onLeave)
    return () => {
      panel.removeEventListener('mousemove', onMove)
      panel.removeEventListener('mouseenter', onEnter)
      panel.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={panelRef}
      className="absolute inset-0 flex flex-col justify-center gap-6 overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 18%, black 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
        maskComposite: 'intersect',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 18%, black 100%)',
      }}
    >
      {/* Lens / portal spotlight */}
      <div
        ref={lensRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none z-20 opacity-0 scale-75"
        style={{
          background: 'radial-gradient(circle, rgba(75,110,245,0.08) 0%, rgba(75,110,245,0.03) 50%, transparent 70%)',
          boxShadow: '0 0 0 1px rgba(75,110,245,0.12), 0 0 60px rgba(75,110,245,0.05)',
        }}
      />

      {/* Central glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-80 h-80 bg-nm-accent/[0.05] rounded-full blur-3xl" />
      </div>

      {/* Strips */}
      {STRIPS.map((strip, i) => (
        <div key={i} className="whitespace-nowrap overflow-visible" data-strip>
          <span
            className={`inline-block ${strip.cls}`}
            style={{
              animation: `marquee ${strip.speed}s linear infinite${strip.dir === -1 ? ' reverse' : ''}`,
              willChange: 'transform',
            }}
          >
            {/* Repeat text enough to fill */}
            {(strip.text).repeat(4)}
          </span>
        </div>
      ))}
    </div>
  )
}

function HeroBg() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full opacity-[0.15]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dot-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#4B6EF5" />
          </pattern>
          <radialGradient id="dot-mask-g" cx="30%" cy="50%" r="55%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="dot-fade">
            <rect width="100%" height="100%" fill="url(#dot-mask-g)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" mask="url(#dot-fade)" />
      </svg>
      <div className="absolute top-0 right-0 w-[45vw] h-[55vh] bg-nm-accent/[0.06] rounded-full blur-[140px]" />
      <div className="absolute bottom-0 left-0 w-[35vw] h-[40vh] bg-nm-warm/[0.04] rounded-full blur-[100px]" />
    </div>
  )
}
