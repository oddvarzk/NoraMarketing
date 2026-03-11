import { useEffect, useRef } from 'react'
import { gsap } from '../../hooks/useGSAP'
import Button from '../ui/Button'

const CYCLING_WORDS = [
  'DIGITAL STRATEGI',
  'INNHOLDSMARKEDSFØRING',
  'SOSIALE MEDIER',
  'SEO & SEM',
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const cycleRef = useRef<HTMLSpanElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const cycleIndex = useRef(0)

  // Intro animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        headlineRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
      )
        .fromTo(
          subRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5',
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          '-=0.4',
        )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Cycling text
  useEffect(() => {
    const el = cycleRef.current
    if (!el) return

    const cycle = () => {
      cycleIndex.current = (cycleIndex.current + 1) % CYCLING_WORDS.length
      gsap.to(el, {
        opacity: 0,
        y: -12,
        duration: 0.35,
        onComplete: () => {
          el.textContent = CYCLING_WORDS[cycleIndex.current]
          gsap.fromTo(el, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 })
        },
      })
    }

    const interval = setInterval(cycle, 2800)
    return () => clearInterval(interval)
  }, [])

  // Parallax on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-dvh flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      aria-label="Introduksjon"
    >
      {/* Mesh background */}
      <MeshBackground />

      {/* Gradient vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-nm-dark/0 via-nm-dark/10 to-nm-dark pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
        <h1
          ref={headlineRef}
          className="font-satoshi font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-nm-light leading-[1.05] tracking-tight"
          style={{ opacity: 0 }}
        >
          Markedsføring som faktisk gir{' '}
          <span className="text-gradient">resultater</span>.
        </h1>

        <p
          ref={subRef}
          className="font-cabinet text-nm-muted text-lg md:text-xl max-w-xl leading-relaxed"
          style={{ opacity: 0 }}
        >
          Vi kombinerer Nora sitt design med moderne markedsføringsstrategi.
          Vi er spesialiserte i alt innenfor
        </p>

        {/* Cycling word */}
        <div className="h-10 flex items-center">
          <span
            ref={cycleRef}
            className="font-bespoke font-bold text-xl md:text-2xl tracking-widest2 text-nm-accent uppercase"
          >
            {CYCLING_WORDS[0]}
          </span>
        </div>

        <div
          ref={ctaRef}
          className="flex flex-wrap gap-4 justify-center mt-4"
          style={{ opacity: 0 }}
        >
          <Button href="/tjenester" variant="outline" size="lg">
            Våre tjenester
          </Button>
          <Button href="/kontakt" variant="outline" size="lg">
            Kom i kontakt
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-cabinet text-xs tracking-widest2 uppercase text-nm-muted">Scroll</span>
        <div className="w-px h-8 bg-nm-muted animate-pulse" />
      </div>
    </section>
  )
}

/** Animated polygon mesh SVG background */
function MeshBackground() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const circles = svg.querySelectorAll<SVGCircleElement>('circle[data-float]')

    circles.forEach((c, i) => {
      gsap.to(c, {
        attr: {
          cx: parseFloat(c.getAttribute('cx')!) + (Math.random() - 0.5) * 40,
          cy: parseFloat(c.getAttribute('cy')!) + (Math.random() - 0.5) * 40,
        },
        duration: 6 + i * 0.7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })
  }, [])

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1440 900"
    >
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#4B6EF5" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0D0D0F" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="900" fill="url(#glow)" />
      {MESH_POINTS.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="1.5"
          fill="#4B6EF5"
          data-float
        />
      ))}
      {MESH_LINES.map(([a, b], i) => (
        <line
          key={i}
          x1={MESH_POINTS[a][0]}
          y1={MESH_POINTS[a][1]}
          x2={MESH_POINTS[b][0]}
          y2={MESH_POINTS[b][1]}
          stroke="#4B6EF5"
          strokeWidth="0.4"
          strokeOpacity="0.5"
        />
      ))}
    </svg>
  )
}

// Sparse but nicely distributed mesh data
const MESH_POINTS: [number, number][] = [
  [100, 80], [300, 50], [520, 120], [750, 60], [980, 90], [1200, 55], [1380, 110],
  [60, 250], [220, 300], [440, 220], [680, 280], [900, 240], [1140, 310], [1400, 260],
  [150, 450], [380, 500], [600, 420], [840, 470], [1060, 440], [1300, 490],
  [80, 640], [280, 700], [500, 620], [740, 680], [960, 640], [1200, 700], [1420, 650],
  [200, 840], [460, 800], [720, 860], [1000, 820], [1250, 870],
  [720, 180], [1100, 160], [340, 360], [840, 380], [560, 560], [1160, 580],
]

const MESH_LINES: [number, number][] = [
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],
  [7,8],[8,9],[9,10],[10,11],[11,12],[12,13],
  [14,15],[15,16],[16,17],[17,18],[18,19],
  [20,21],[21,22],[22,23],[23,24],[24,25],[25,26],
  [27,28],[28,29],[29,30],[30,31],
  [0,7],[1,8],[2,9],[3,10],[4,11],[5,12],[6,13],
  [7,14],[8,15],[9,16],[10,17],[11,18],[12,19],
  [14,20],[15,21],[16,22],[17,23],[18,24],[19,25],
  [20,27],[21,28],[22,29],[23,30],[24,31],
  [32,33],[34,35],[36,37],
  [1,32],[5,33],[8,34],[10,35],[16,36],[18,37],
]
