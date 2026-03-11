import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    number: '01',
    title: 'Strategi først',
    sub: 'Forstå for å lykkes',
    body: 'Vi starter alltid med å kartlegge din bedrift, målgruppe og markedsposisjon. Ingen løsninger uten en solid strategi i bunn – det er her suksessen begynner.',
    tags: ['Markedsanalyse', 'Målgruppe', 'Konkurranseanalyse'],
  },
  {
    number: '02',
    title: 'Smart gjennomføring',
    sub: 'Effektivt og presist',
    body: 'Effektiv implementering med fokus på det som gir størst effekt. Vi kutter gjennom støyen og leverer tiltak som faktisk beveger nålen.',
    tags: ['Innholdsproduksjon', 'Kanalstrategi', 'A/B-testing'],
  },
  {
    number: '03',
    title: 'Kontinuerlig forbedring',
    sub: 'Alltid i bevegelse',
    body: 'Vi måler, analyserer og optimaliserer løpende for å sikre resultater over tid. Stillstand er ikke et alternativ i et marked som aldri sover.',
    tags: ['Datainnsikt', 'Optimalisering', 'Rapportering'],
  },
]

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stRef = useRef<ScrollTrigger | null>(null)

  // Scroll to the hold position for each step (0-indexed)
  // Timeline breakdown: hold1(0→1) | transition(1→1.95) | hold2(1.95→2.95) | transition(2.95→3.9) | hold3(3.9→4.5)
  const STEP_FRACTIONS = [0, 0.44, 0.88] // fraction of total scroll distance

  function goToStep(stepIndex: number) {
    const st = stRef.current
    if (!st) return
    const scrollTo = st.start + STEP_FRACTIONS[stepIndex] * (st.end - st.start)
    window.scrollTo({ top: scrollTo, behavior: 'smooth' })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia('(min-width: 768px)').matches

      if (isDesktop) {
        const panels = gsap.utils.toArray<HTMLElement>('[data-proc-panel]', sectionRef.current!)
        const bgNums = gsap.utils.toArray<HTMLElement>('[data-proc-bgnum]', sectionRef.current!)
        const navItems = gsap.utils.toArray<HTMLElement>('[data-proc-navitem]', sectionRef.current!)
        const navDots = gsap.utils.toArray<HTMLElement>('[data-proc-dot]', sectionRef.current!)
        const accentLines = gsap.utils.toArray<HTMLElement>('[data-proc-aline]', sectionRef.current!)
        const progressFill = sectionRef.current!.querySelector<HTMLElement>('[data-proc-fill]')!

        // Initial states (panels 1+2 hidden)
        gsap.set(panels.slice(1), { opacity: 0, y: 48 })
        gsap.set(bgNums.slice(1), { opacity: 0, scale: 0.94 })
        gsap.set(navItems.slice(1), { opacity: 0.28 })
        gsap.set(navDots.slice(1), { backgroundColor: 'transparent', borderColor: '#2A2A35', scale: 0.7 })
        gsap.set(accentLines.slice(1), { scaleX: 0, transformOrigin: 'left center' })

        const tl = gsap.timeline()

        // Hold on step 1
        tl.to({}, { duration: 1 })

        // ── Step 1 → Step 2 ──────────────────────────────────────────────
        tl.to(panels[0], { opacity: 0, y: -48, duration: 0.45, ease: 'power2.in' }, 's2')
          .to(bgNums[0], { opacity: 0, scale: 0.94, duration: 0.35 }, 's2')
          .to(navItems[0], { opacity: 0.28, duration: 0.3 }, 's2')
          .to(navDots[0], { backgroundColor: 'transparent', borderColor: '#2A2A35', scale: 0.7, duration: 0.3 }, 's2')
          .to(bgNums[1], { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }, 's2+=0.18')
          .to(panels[1], { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, 's2+=0.22')
          .to(navItems[1], { opacity: 1, duration: 0.3 }, 's2+=0.22')
          .to(navDots[1], { backgroundColor: '#4B6EF5', borderColor: '#4B6EF5', scale: 1, duration: 0.3 }, 's2+=0.22')
          .to(accentLines[1], { scaleX: 1, duration: 0.55, ease: 'power2.inOut' }, 's2+=0.32')
          .to(progressFill, { scaleY: 0.5, duration: 0.9, ease: 'power2.inOut' }, 's2+=0.05')
          // hold on step 2
          .to({}, { duration: 1 })

        // ── Step 2 → Step 3 ──────────────────────────────────────────────
        tl.to(panels[1], { opacity: 0, y: -48, duration: 0.45, ease: 'power2.in' }, 's3')
          .to(bgNums[1], { opacity: 0, scale: 0.94, duration: 0.35 }, 's3')
          .to(navItems[1], { opacity: 0.28, duration: 0.3 }, 's3')
          .to(navDots[1], { backgroundColor: 'transparent', borderColor: '#2A2A35', scale: 0.7, duration: 0.3 }, 's3')
          .to(bgNums[2], { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }, 's3+=0.18')
          .to(panels[2], { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, 's3+=0.22')
          .to(navItems[2], { opacity: 1, duration: 0.3 }, 's3+=0.22')
          .to(navDots[2], { backgroundColor: '#4B6EF5', borderColor: '#4B6EF5', scale: 1, duration: 0.3 }, 's3+=0.22')
          .to(accentLines[2], { scaleX: 1, duration: 0.55, ease: 'power2.inOut' }, 's3+=0.32')
          .to(progressFill, { scaleY: 1, duration: 0.9, ease: 'power2.inOut' }, 's3+=0.05')
          // final hold
          .to({}, { duration: 0.6 })

        stRef.current = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=250%',
          pin: true,
          anticipatePin: 1,
          scrub: 1.8,
          animation: tl,
        })
      } else {
        // Mobile: simple stagger fade-up per card
        gsap.utils.toArray<HTMLElement>('[data-proc-mcard]', sectionRef.current!).forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
          })
        })
      }
    }, sectionRef)

    return () => {
      // Clear GSAP's saved scroll position before reverting the pin,
      // otherwise ctx.revert() scrolls the page back to where the pin was active.
      ScrollTrigger.clearScrollMemory()
      ctx.revert()
    }
  }, [])

  return (
    <div ref={sectionRef} className="relative bg-nm-dark">

      {/* ── DESKTOP ─────────────────────────────────────────────────────── */}
      <div className="hidden md:flex flex-col h-screen px-10 lg:px-20 pt-16 pb-12">

        {/* Section header */}
        <div className="flex-shrink-0 flex items-end justify-between mb-10">
          <div>
            <span className="font-bespoke text-xs tracking-widest2 text-nm-accent uppercase mb-3 block">
              Vår tilnærming
            </span>
            <h2 className="font-satoshi font-black text-4xl lg:text-[3.25rem] leading-tight text-nm-light">
              Enkel,{' '}
              <span className="text-gradient">men effektiv.</span>
            </h2>
          </div>
          <p className="hidden lg:block max-w-xs text-nm-muted font-cabinet text-sm leading-relaxed text-right">
            Vi fokuserer på det som virkelig betyr noe – tre steg som gjentar seg, forbedres og leverer resultater.
          </p>
        </div>

        {/* Body */}
        <div className="flex flex-1 gap-10 min-h-0">

          {/* Left nav + progress rail */}
          <div className="w-52 flex-shrink-0 flex flex-col justify-center relative">
            {/* Rail */}
            <div
              className="absolute left-[10px] top-[10%] bottom-[10%] w-px bg-nm-border"
              aria-hidden="true"
            >
              <div
                data-proc-fill
                className="absolute inset-x-0 top-0 bg-nm-accent"
                style={{ height: '100%', transform: 'scaleY(0.02)', transformOrigin: 'top center' }}
              />
            </div>

            <div className="flex flex-col gap-9">
              {STEPS.map((step, i) => (
                <button
                  key={i}
                  data-proc-navitem
                  onClick={() => goToStep(i)}
                  className="flex items-center gap-4 text-left group cursor-pointer"
                  aria-label={`Gå til steg ${step.number}: ${step.title}`}
                >
                  <div
                    data-proc-dot
                    className="w-5 h-5 rounded-full flex-shrink-0 relative z-10 border-2 transition-all duration-300 group-hover:scale-110"
                    style={
                      i === 0
                        ? { backgroundColor: '#4B6EF5', borderColor: '#4B6EF5' }
                        : { backgroundColor: 'transparent', borderColor: '#2A2A35' }
                    }
                    aria-hidden="true"
                  />
                  <div>
                    <span className="font-bespoke text-[10px] tracking-widest text-nm-muted uppercase block">
                      {step.number}
                    </span>
                    <span className="font-satoshi font-bold text-nm-fg text-sm leading-snug group-hover:text-nm-accent transition-colors duration-200">
                      {step.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Feature panel */}
          <div className="flex-1 relative rounded-2xl border border-nm-border bg-nm-surface/20 overflow-hidden">

            {/* Ghost numbers */}
            {STEPS.map((step, i) => (
              <div
                key={`bg-${i}`}
                data-proc-bgnum
                className="absolute inset-0 flex items-center justify-end pr-8 pointer-events-none select-none"
                style={i > 0 ? { opacity: 0, transform: 'scale(0.94)' } : {}}
                aria-hidden="true"
              >
                <span
                  className="font-bespoke font-bold leading-none"
                  style={{
                    fontSize: 'clamp(140px, 16vw, 280px)',
                    color: 'rgba(75,110,245,0.06)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {step.number}
                </span>
              </div>
            ))}

            {/* Step content panels (absolutely stacked) */}
            {STEPS.map((step, i) => (
              <div
                key={`panel-${i}`}
                data-proc-panel
                className="absolute inset-0 flex flex-col justify-center px-10 lg:px-14"
                style={i > 0 ? { opacity: 0, transform: 'translateY(48px)' } : {}}
              >
                {/* Eyebrow */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-bespoke text-xs tracking-widest2 text-nm-accent uppercase">
                    {step.number}
                  </span>
                  <div
                    data-proc-aline
                    className="h-px w-14 bg-nm-accent"
                    style={i === 0
                      ? { transformOrigin: 'left center' }
                      : { transform: 'scaleX(0)', transformOrigin: 'left center' }
                    }
                  />
                  <span className="font-cabinet text-nm-muted text-xs tracking-wide">
                    {step.sub}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-satoshi font-black text-[clamp(2rem,4vw,3.5rem)] text-nm-light leading-tight mb-5">
                  {step.title}
                </h3>

                {/* Body */}
                <p className="font-cabinet text-nm-muted text-base lg:text-lg leading-relaxed max-w-lg mb-8">
                  {step.body}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-3">
                  {step.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="font-cabinet text-xs text-nm-fg/80 border border-nm-border bg-nm-surface px-4 py-2 rounded-full tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MOBILE ──────────────────────────────────────────────────────── */}
      <div className="md:hidden px-6 py-20">
        <div className="mb-12">
          <span className="font-bespoke text-xs tracking-widest2 text-nm-accent uppercase mb-3 block">
            Vår tilnærming
          </span>
          <h2 className="font-satoshi font-black text-3xl text-nm-light leading-tight">
            Enkel, <span className="text-gradient">men effektiv.</span>
          </h2>
        </div>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Rail line */}
          <div className="absolute left-[19px] top-6 bottom-6 w-px bg-nm-border" aria-hidden="true" />

          <div className="flex flex-col gap-6">
            {STEPS.map((step, i) => (
              <div key={i} data-proc-mcard className="flex gap-5">
                {/* Dot */}
                <div className="flex-shrink-0 mt-6">
                  <div className="w-5 h-5 rounded-full bg-nm-accent border-2 border-nm-accent relative z-10" />
                </div>

                {/* Card */}
                <div className="flex-1 border border-nm-border bg-nm-surface/30 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-bespoke text-xs tracking-widest2 text-nm-accent uppercase">
                      {step.number}
                    </span>
                    <div className="h-px w-8 bg-nm-accent/60" />
                    <span className="font-cabinet text-nm-muted text-xs">{step.sub}</span>
                  </div>
                  <h3 className="font-satoshi font-black text-xl text-nm-light mb-3 leading-snug">
                    {step.title}
                  </h3>
                  <p className="font-cabinet text-nm-muted text-sm leading-relaxed mb-5">
                    {step.body}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {step.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="font-cabinet text-xs text-nm-fg/80 border border-nm-border bg-nm-surface px-3 py-1.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
