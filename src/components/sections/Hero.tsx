import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CYCLING_WORDS = [
  'Digital strategi',
  'Innholdsmarkedsføring',
  'Sosiale medier',
  'SEO & SEM',
]

const STATS = [
  { num: '5+',   label: 'År i bransjen' },
  { num: '120+', label: 'Fornøyde kunder' },
  { num: '3×',   label: 'Gj.snittlig ROI' },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const cycleRef   = useRef<HTMLSpanElement>(null)
  const cycleIndex = useRef(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('[data-h-line]', { opacity: 0, y: 72 })
      gsap.set('[data-e-tag]',  { opacity: 0, x: -16 })
      gsap.set('[data-e-line]', { scaleX: 0, transformOrigin: 'left' })
      gsap.set('[data-e-sub]',  { opacity: 0, y: 24 })
      gsap.set('[data-stat]',   { opacity: 0, y: 16 })

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.to('[data-e-line]',  { scaleX: 1, duration: 0.7 }, 0)
        .to('[data-e-tag]',   { opacity: 1, x: 0, duration: 0.6 }, 0.2)
        .to('[data-h-line]',  { opacity: 1, y: 0, duration: 1.3, stagger: 0.1 }, 0.1)
        .to('[data-e-sub]',   { opacity: 1, y: 0, duration: 0.9, stagger: 0.15 }, 0.6)
        .to('[data-stat]',    { opacity: 1, y: 0, duration: 0.7, stagger: 0.07 }, 1.1)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

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
      className="relative min-h-dvh flex flex-col overflow-hidden bg-nm-dark"
      aria-label="Introduksjon"
    >
      <HeroBg />

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 pt-32 pb-12">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-14">
          <span
            data-e-line
            className="block w-10 h-px bg-nm-accent/50"
            style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
          />
          <span
            data-e-tag
            className="font-bespoke text-[10px] tracking-widest2 uppercase text-nm-accent"
            style={{ opacity: 0 }}
          >
            Markedsføringsbyrå · Oslo, Norge
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-satoshi font-black leading-[0.86] tracking-tight mb-14 max-w-5xl">
          <span
            data-h-line
            className="block text-nm-light"
            style={{ fontSize: 'clamp(3.5rem,9.5vw,10.5rem)', opacity: 0 }}
          >
            Markedsføring
          </span>
          <span
            data-h-line
            className="block"
            style={{
              fontSize: 'clamp(3.5rem,9.5vw,10.5rem)',
              opacity: 0,
              WebkitTextStroke: '1.5px #E8E8EE',
              color: 'transparent',
            }}
          >
            som faktisk
          </span>
          <span
            data-h-line
            className="block text-nm-warm"
            style={{ fontSize: 'clamp(3.5rem,9.5vw,10.5rem)', opacity: 0 }}
          >
            fungerer.
          </span>
        </h1>

        {/* Sub-row — description + CTAs + cycling */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-end gap-10 max-w-5xl">

          <div className="flex flex-col gap-6">
            <p
              data-e-sub
              className="font-cabinet text-nm-muted text-lg leading-relaxed max-w-md"
              style={{ opacity: 0 }}
            >
              Vi kombinerer kreativitet med strategi for å levere markedsføring som faktisk måles i krone og øre.
            </p>

            <div data-e-sub className="flex items-center gap-6 flex-wrap" style={{ opacity: 0 }}>
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-3 group"
              >
                <span className="font-satoshi font-semibold text-nm-fg text-sm tracking-wide group-hover:text-nm-warm transition-colors duration-200">
                  Start et prosjekt
                </span>
                <span className="h-8 w-8 flex items-center justify-center rounded-full border border-nm-border/60 group-hover:border-nm-warm/40 transition-colors duration-300">
                  <svg className="w-3 h-3 text-nm-muted group-hover:text-nm-warm transition-colors duration-200" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M1 6h10M7 2l4 4-4 4" />
                  </svg>
                </span>
              </Link>

              <div className="w-px h-4 bg-nm-border hidden sm:block" />

              <Link
                to="/tjenester"
                className="font-cabinet text-[12px] text-nm-muted/50 hover:text-nm-muted tracking-wide transition-colors duration-200 underline underline-offset-4 decoration-nm-border/40"
              >
                Se alle tjenester
              </Link>
            </div>
          </div>

          {/* Cycling specialty — right, subtle */}
          <div data-e-sub className="flex flex-col items-start lg:items-end gap-1.5 lg:pb-1" style={{ opacity: 0 }}>
            <span className="font-cabinet text-[9px] text-nm-muted/40 tracking-widest2 uppercase">
              Spesialisert i
            </span>
            <div className="h-6 flex items-center overflow-hidden" style={{ clipPath: 'inset(0 -9999px)' }}>
              <span
                ref={cycleRef}
                className="font-bespoke text-[13px] tracking-widest uppercase text-nm-fg/40 block whitespace-nowrap"
              >
                {CYCLING_WORDS[0]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats strip ──────────────────────────────────────────────── */}
      <div className="relative z-10 border-t border-nm-border/25">
        <div className="px-6 sm:px-12 lg:px-20 py-6 flex items-center gap-10 sm:gap-16 lg:gap-24">
          {STATS.map(({ num, label }) => (
            <div key={label} data-stat className="flex flex-col gap-0.5" style={{ opacity: 0 }}>
              <span className="font-satoshi font-black text-[clamp(1.2rem,2.5vw,1.8rem)] leading-none text-nm-light">
                {num}
              </span>
              <span className="font-cabinet text-[9px] sm:text-[10px] text-nm-muted/50 tracking-widest uppercase whitespace-nowrap">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HeroBg() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">

      {/* Fine grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.022]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <pattern id="grid-h" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#E8E8EE" strokeWidth="0.5" />
          </pattern>
          <radialGradient id="grid-fade" cx="25%" cy="40%" r="65%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="grid-mask">
            <rect width="100%" height="100%" fill="url(#grid-fade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-h)" mask="url(#grid-mask)" />
      </svg>

      {/* Stencil watermark — very faint */}
      <div
        className="absolute bottom-8 left-0 font-bespoke font-bold leading-none whitespace-nowrap"
        style={{
          fontSize: 'clamp(100px, 18vw, 240px)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(232,164,74,0.04)',
          letterSpacing: '-0.02em',
          transform: 'translateX(-1%)',
        }}
      >
        NORA
      </div>

      {/* Warm glow — bottom left */}
      <div className="absolute bottom-0 left-[-10%] w-[45vw] h-[40vh] bg-nm-warm/[0.025] rounded-full blur-[130px]" />
      {/* Accent glow — top right */}
      <div className="absolute top-[-15%] right-[-8%] w-[40vw] h-[50vh] bg-nm-accent/[0.03] rounded-full blur-[140px]" />
    </div>
  )
}
