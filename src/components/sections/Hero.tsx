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
      gsap.set('[data-e-sub]',  { opacity: 0, y: 24 })
      gsap.set('[data-stat]',   { opacity: 0, y: 16 })

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.to('[data-h-line]',  { opacity: 1, y: 0, duration: 1.4, stagger: 0.1 }, 0)
        .to('[data-e-sub]',   { opacity: 1, y: 0, duration: 1.0, stagger: 0.15 }, 0.5)
        .to('[data-stat]',    { opacity: 1, y: 0, duration: 0.8, stagger: 0.07 }, 1.0)
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

        {/* Spacer replaces eyebrow */}
        <div className="mb-14" />

        {/* Headline */}
        <h1 className="font-erode font-bold leading-[0.86] tracking-tight mb-14 max-w-5xl">
          <span
            data-h-line
            className="block text-nm-light"
            style={{ fontSize: 'clamp(2.4rem,9.5vw,10.5rem)', opacity: 0 }}
          >
            Markedsføring
          </span>
          <span
            data-h-line
            className="block text-nm-light/60"
            style={{ fontSize: 'clamp(2.4rem,9.5vw,10.5rem)', opacity: 0 }}
          >
            som faktisk
          </span>
          <span
            data-h-line
            className="block text-nm-accent"
            style={{ fontSize: 'clamp(2.4rem,9.5vw,10.5rem)', opacity: 0 }}
          >
            fungerer.
          </span>
        </h1>

        {/* Sub-row — description + CTAs + cycling */}
        <div className="flex flex-col gap-6 max-w-lg">
          <p
            data-e-sub
            className="font-cabinet text-nm-fg/60 text-xl leading-relaxed"
            style={{ opacity: 0 }}
          >
            Vi kombinerer kreativitet med strategi for å levere markedsføring som faktisk måles i krone og øre.
          </p>

          <div data-e-sub className="flex items-center gap-6 flex-wrap sm:ml-6" style={{ opacity: 0 }}>
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-3 group"
            >
              <span className="font-satoshi font-semibold text-nm-fg text-sm tracking-wide group-hover:text-nm-accent transition-colors duration-200">
                Start et prosjekt
              </span>
              <span className="h-8 w-8 flex items-center justify-center rounded-full border border-nm-border/60 group-hover:border-nm-accent/40 transition-colors duration-300">
                <svg className="w-3 h-3 text-nm-muted group-hover:text-nm-accent transition-colors duration-200" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M1 6h10M7 2l4 4-4 4" />
                </svg>
              </span>
            </Link>

            <div className="w-px h-4 bg-nm-border hidden sm:block" />

            <Link
              to="/tjenester"
              className="font-cabinet text-[13px] text-nm-fg/70 hover:text-nm-fg tracking-wide transition-colors duration-200 underline underline-offset-4 decoration-nm-fg/30"
            >
              Se alle tjenester
            </Link>
          </div>

          {/* Cycling specialty — anchored under CTAs */}
          <div data-e-sub className="flex items-center gap-3 sm:ml-6" style={{ opacity: 0 }}>
            <span className="font-cabinet text-[10px] text-nm-fg/40 tracking-widest2 uppercase whitespace-nowrap">
              Spesialisert i
            </span>
            <div className="w-px h-3 bg-nm-border/60" />
            <div className="h-5 flex items-center overflow-hidden" style={{ clipPath: 'inset(0 -9999px)' }}>
              <span
                ref={cycleRef}
                className="font-bespoke text-[13px] tracking-widest uppercase text-nm-fg/70 block whitespace-nowrap"
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
              <span className="font-erode font-bold text-[clamp(1.2rem,2.5vw,1.8rem)] leading-none text-nm-light">
                {num}
              </span>
              <span className="font-cabinet text-[9px] sm:text-[11px] text-nm-muted/80 tracking-widest uppercase whitespace-nowrap">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function RainbowBg() {
  const LENGTH = 25
  const ANIM   = 45
  const dark   = 'rgb(13,13,15)'

  const purple = 'rgba(110,50,160,0.55)'
  const blue   = 'rgba(55,85,210,0.55)'
  const teal   = 'rgba(20,100,110,0.55)'

  const combos: [string, string, string][] = [
    [purple, blue,   teal  ],
    [purple, teal,   blue  ],
    [teal,   purple, blue  ],
    [teal,   blue,   purple],
    [blue,   teal,   purple],
    [blue,   purple, teal  ],
  ]

  return (
    <>
      {Array.from({ length: LENGTH }, (_, idx) => {
        const i          = idx + 1
        const [c1,c2,c3] = combos[(idx) % 6]
        const duration   = ANIM - (ANIM / LENGTH / 2) * i
        const delay      = -(i / LENGTH * ANIM)
        const shadow     = [
          `-130px 0 80px 40px ${dark}`,
          `-50px 0 45px 18px ${c1}`,
          `0 0 45px 18px ${c2}`,
          `50px 0 45px 18px ${c3}`,
          `130px 0 80px 40px ${dark}`,
        ].join(', ')

        return (
          <div
            key={idx}
            style={{
              position:        'absolute',
              height:          '100vh',
              width:           0,
              top:             0,
              transform:       'rotate(10deg)',
              transformOrigin: 'top right',
              boxShadow:       shadow,
              animation:       `rainbow-slide ${duration}s linear infinite`,
              animationDelay:  `${delay}s`,
            }}
          />
        )
      })}
    </>
  )
}

function HeroBg() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">

      {/* Rainbow strips */}
      <RainbowBg />

      {/* Dark overlay — keeps text readable */}
      <div className="absolute inset-0 bg-nm-dark/75" />

      {/* Radial accent — breaks the perfect gradient look */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(20,86,204,0.12), transparent 60%)',
        }}
      />

      {/* Bottom fade — bleeds seamlessly into the next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{ background: 'linear-gradient(to bottom, transparent, #0D0D0F)' }}
      />

      {/* Top fade — softens the navbar edge */}
      <div
        className="absolute top-0 left-0 right-0 h-32"
        style={{ background: 'linear-gradient(to top, transparent, rgba(13,13,15,0.7))' }}
      />
    </div>
  )
}
