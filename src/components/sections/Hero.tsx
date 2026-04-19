import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CYCLE_WORDS = [
  'Digital strategi',
  'Innholdsmarkedsføring',
  'Sosiale medier',
  'SEO & SEM',
  'Nettsideutvikling',
  'Videoproduksjon',
]

const STATS = [
  { k: '120+', v: 'Kunder'    },
  { k: '3×',   v: 'Snitt ROI' },
  { k: '5',    v: 'År'        },
]

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0)
  const [revealed, setRevealed] = useState(false)

  // Trigger clip-reveal on next frame after mount
  useEffect(() => {
    const id = requestAnimationFrame(() => setRevealed(true))
    return () => cancelAnimationFrame(id)
  }, [])

  // Cycling specialization words
  useEffect(() => {
    const id = setInterval(() => setWordIdx(i => (i + 1) % CYCLE_WORDS.length), 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative min-h-svh pt-32 pb-10 px-6 lg:px-10 border-b border-ink-500/40 overflow-hidden">

      {/* Giant ghost N — decorative */}
      <div
        aria-hidden
        className="absolute pointer-events-none select-none right-[-4vw] bottom-[-8vh] font-display leading-none"
        style={{
          fontSize: 'clamp(30rem, 60vw, 60rem)',
          color: 'rgba(255,255,255,0.018)',
          fontStyle: 'italic',
          zIndex: 0,
          lineHeight: 1,
        }}
      >
        N
      </div>

      {/* Main header grid */}
      <div className="relative max-w-[1400px] mx-auto grid grid-cols-12 gap-6" style={{ zIndex: 1 }}>

        {/* Masthead metadata — left strip */}
        <div className="col-span-12 md:col-span-2 flex flex-col gap-1 font-mono text-[10px] text-ink-300 tracking-widest2 uppercase">
          <div>Volume VI</div>
          <div>Est. 2020</div>
          <div>Oslo, Norge</div>
        </div>

        {/* Headline */}
        <div className="col-span-12 md:col-span-10">
          <div className="font-mono text-[10px] text-accent-blue tracking-widest2 uppercase mb-8">
            N°01 — Markedsføringsbyrå siden 2020
          </div>

          <h1
            className="font-display font-light leading-[0.92] text-ink-50"
            style={{ fontSize: 'clamp(2.2rem, 7vw, 7rem)', letterSpacing: '-0.02em' }}
          >
            <span className="block overflow-hidden">
              <span
                className="inline-block"
                style={{
                  clipPath: revealed ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                  transition: 'clip-path 1.3s cubic-bezier(.77,0,.175,1)',
                }}
              >
                Et byrå for
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="inline-block"
                style={{
                  clipPath: revealed ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                  transition: 'clip-path 1.3s cubic-bezier(.77,0,.175,1) 0.1s',
                }}
              >
                <em className="font-normal italic">merkevarer</em> som
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="inline-block text-accent-blue"
                style={{
                  clipPath: revealed ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                  transition: 'clip-path 1.3s cubic-bezier(.77,0,.175,1) 0.2s',
                }}
              >
                vil bli lagt merke til.
              </span>
            </span>
          </h1>
        </div>
      </div>

      {/* Bottom row */}
      <div
        className="relative max-w-[1400px] mx-auto mt-16 md:mt-28 grid grid-cols-12 gap-6 items-end"
        style={{ zIndex: 1 }}
      >
        {/* Description + CTAs */}
        <div className="col-span-12 md:col-span-5">
          <p className="font-body text-ink-100 text-lg leading-relaxed mb-7">
            Vi er Nora — et lite, selvstendig byrå i Oslo. Vi lager nettsider,
            kampanjer, innhold og strategi for bedrifter som vil vokse uten å
            miste sjelen.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-3 bg-accent-blue text-white px-6 py-3.5 font-ui font-medium text-sm tracking-wide hover:opacity-90 transition-opacity"
            >
              <span>Start et prosjekt</span>
              <span>→</span>
            </Link>
            <Link
              to="/prosjekter"
              className="font-ui text-[13px] text-ink-50 underline underline-offset-4 decoration-ink-400 hover:decoration-ink-50 transition-colors"
            >
              Se utvalgt arbeid
            </Link>
          </div>
        </div>

        {/* Cycling specialty */}
        <div className="col-span-12 md:col-span-3 md:col-start-7">
          <div className="font-mono text-[10px] text-ink-300 uppercase tracking-widest2 mb-3">
            Spesialisering
          </div>
          <div className="h-8 overflow-hidden relative">
            {CYCLE_WORDS.map((w, i) => (
              <div
                key={w}
                className="absolute inset-0 font-display text-xl text-ink-50"
                style={{
                  transform: `translateY(${(i - wordIdx) * 100}%)`,
                  opacity: i === wordIdx ? 1 : 0,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  transition: 'transform 0.5s cubic-bezier(.2,.8,.2,1), opacity 0.5s',
                }}
              >
                {w}
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="col-span-12 md:col-span-3 flex justify-end gap-6">
          {STATS.map(s => (
            <div key={s.v} className="flex flex-col">
              <span
                className="font-display text-ink-50 leading-none"
                style={{ fontSize: '2.2rem', fontVariantNumeric: 'tabular-nums lining-nums' }}
              >
                {s.k}
              </span>
              <span className="font-mono text-[9px] text-ink-300 tracking-widest2 uppercase mt-2">
                {s.v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
