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
  const sectionRef  = useRef<HTMLElement>(null)
  const cycleRef    = useRef<HTMLSpanElement>(null)
  const cycleIndex  = useRef(0)

  // ── Entry animation ──────────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('[data-h-line]',  { opacity: 0, y: 64 })
      gsap.set('[data-e-tag]',   { opacity: 0, x: -14 })
      gsap.set('[data-e-line]',  { scaleX: 0, transformOrigin: 'left' })
      gsap.set('[data-e-sub]',   { opacity: 0, y: 22 })
      gsap.set('[data-stat]',    { opacity: 0, y: 18 })

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.to('[data-e-line]', { scaleX: 1, duration: 0.65 }, 0)
      tl.to('[data-e-tag]',  { opacity: 1, x: 0, duration: 0.55 }, 0.2)
      tl.to('[data-h-line]', { opacity: 1, y: 0, duration: 1.1, stagger: 0.09 }, 0.12)
      tl.to('[data-e-sub]',  { opacity: 1, y: 0, duration: 0.85, stagger: 0.13 }, 0.65)
      tl.to('[data-stat]',   { opacity: 1, y: 0, duration: 0.7,  stagger: 0.08 }, 1.05)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // ── Cycling specialty word ────────────────────────────────────────────────────
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

      {/* ── Main content ────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 pt-28 pb-10">

        {/* Eyebrow */}
        <div className="flex items-center justify-center lg:justify-start gap-3 mb-10 sm:mb-14">
          <span
            data-e-line
            className="block w-8 h-px bg-nm-warm/50"
            style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
          />
          <span
            data-e-tag
            className="font-bespoke text-[11px] tracking-widest2 uppercase text-nm-warm/70"
            style={{ opacity: 0 }}
          >
            Markedsføringsbyrå · Oslo, Norge
          </span>
          <span
            data-e-line
            className="block lg:hidden w-8 h-px bg-nm-warm/50"
            style={{ transform: 'scaleX(0)', transformOrigin: 'right' }}
          />
        </div>

        {/* Two-column grid — headline left, meta right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] items-end gap-10 lg:gap-6">

          {/* Headline */}
          <h1 className="font-satoshi font-black text-[clamp(3.4rem,9vw,10rem)] leading-[0.88] tracking-tight text-center lg:text-left">
            <span data-h-line className="block text-nm-light" style={{ opacity: 0 }}>Markedsføring</span>
            <span data-h-line className="block text-nm-light" style={{ opacity: 0 }}>som faktisk</span>
            <span data-h-line className="block text-nm-light" style={{ opacity: 0 }}>fungerer.</span>
          </h1>

          {/* Right column */}
          <div className="flex flex-col items-center lg:items-start gap-7 lg:pb-1">

            {/* Description */}
            <p
              data-e-sub
              className="font-cabinet text-nm-muted text-[15px] leading-relaxed max-w-[290px] text-center lg:text-left"
              style={{ opacity: 0 }}
            >
              Vi kombinerer kreativitet med strategi for å levere markedsføring som faktisk måles.
            </p>

            {/* Cycling specialty */}
            <div data-e-sub className="flex flex-col items-center lg:items-start gap-1.5" style={{ opacity: 0 }}>
              <span className="font-cabinet text-[10px] text-nm-muted/50 tracking-widest2 uppercase">
                Spesialisert i
              </span>
              <div
                className="h-8 flex items-center"
                style={{ clipPath: 'inset(0 -9999px)' }}
              >
                <span
                  ref={cycleRef}
                  className="font-bespoke text-[17px] tracking-widest2 uppercase text-nm-warm block whitespace-nowrap"
                >
                  {CYCLING_WORDS[0]}
                </span>
              </div>
            </div>

            {/* CTA — editorial arrow link */}
            <div data-e-sub className="flex flex-col items-center lg:items-start gap-5" style={{ opacity: 0 }}>
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-3 group"
                aria-label="Ta kontakt"
              >
                <span className="font-satoshi font-semibold text-nm-fg text-[14px] tracking-wide group-hover:text-nm-warm transition-colors duration-200">
                  Ta kontakt
                </span>
                <span
                  className="h-px bg-nm-border/80 group-hover:bg-nm-warm transition-all duration-300 ease-out"
                  style={{ width: '2rem' }}
                  aria-hidden="true"
                />
                <svg
                  className="w-[11px] h-[11px] text-nm-muted group-hover:text-nm-warm -ml-[0.85rem] transition-colors duration-200"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M1 6h10M7 2l4 4-4 4" />
                </svg>
              </Link>

              <Link
                to="/tjenester"
                className="font-cabinet text-[12px] text-nm-muted/50 hover:text-nm-muted tracking-wide transition-colors duration-200 underline underline-offset-4 decoration-nm-border/50"
              >
                Se alle tjenester
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* ── Stats strip ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 border-t border-nm-border/40">
        <div className="px-6 sm:px-10 lg:px-16 py-6 flex items-center justify-center lg:justify-start gap-8 sm:gap-14 lg:gap-20">
          {STATS.map(({ num, label }) => (
            <div key={label} data-stat className="flex flex-col gap-1" style={{ opacity: 0 }}>
              <span className="font-satoshi font-black text-[clamp(1.35rem,2.8vw,2rem)] leading-none text-nm-light">
                {num}
              </span>
              <span className="font-cabinet text-[10px] sm:text-[11px] text-nm-muted/60 tracking-wide uppercase whitespace-nowrap">
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

      {/* Dot grid — warm-tinted, left-weighted fade */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dot-grid-h" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#E8A44A" />
          </pattern>
          <radialGradient id="dot-mask-h" cx="20%" cy="45%" r="55%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="dot-fade-h">
            <rect width="100%" height="100%" fill="url(#dot-mask-h)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid-h)" mask="url(#dot-fade-h)" />
      </svg>

      {/* Very faint warm glow — bottom-left */}
      <div className="absolute bottom-0 left-[-5%] w-[45vw] h-[45vh] bg-nm-warm/[0.035] rounded-full blur-[120px]" />
    </div>
  )
}
