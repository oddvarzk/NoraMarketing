import { Link } from 'react-router-dom'
import ArrowCTA from '../ui/ArrowCTA'
import { CASES } from '../../lib/data'

export default function WorkTeaser() {
  const items = CASES.slice(0, 3)
  return (
    <section className="py-28 px-6 lg:px-10 border-t border-ink-500/40">
      <div className="max-w-[1400px] mx-auto">

        {/* Section head */}
        <div className="grid grid-cols-12 gap-6 items-end mb-14">
          <div className="col-span-12 lg:col-span-1">
            <div className="font-mono text-[10px] text-ink-300 tracking-widest2">N°04</div>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] text-accent-blue tracking-widest2 uppercase mb-4">Utvalgt arbeid</div>
            <h2
              className="font-display font-medium tracking-tight leading-[0.95] text-ink-50"
              style={{ fontSize: 'clamp(2.2rem, 5.2vw, 4.5rem)' }}
            >
              Resultater
              <br /><span className="t-outline">i krone og øre.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:pl-8">
            <p className="font-body text-ink-200 text-[15px] leading-relaxed mb-6">
              Utvalgte prosjekter fra det siste året. Klikk deg inn for hele casen —
              brief, tilnærming og resultater.
            </p>
            <ArrowCTA to="/prosjekter">Alle prosjekter</ArrowCTA>
          </div>
        </div>

        {/* Case grid */}
        <div className="grid grid-cols-12 gap-6">
          {items.map((c, i) => (
            <article
              key={c.idx}
              className={`col-span-12 ${i === 0 ? 'md:col-span-12 lg:col-span-7' : 'md:col-span-6 lg:col-span-5'}`}
            >
              <Link to="/prosjekter" className="group block">
                {/* Placeholder image */}
                <div
                  className={`ph mb-6 ${i === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}
                  data-label={`${c.idx} — ${c.client}`}
                />
                <div className="flex items-center justify-between mb-3 font-mono text-[10px] text-ink-300 tracking-widest2 uppercase">
                  <span>{c.idx} · {c.sector}</span>
                  <span>{c.year}</span>
                </div>
                <h3
                  className="font-display font-normal text-ink-50 leading-[0.95] mb-3"
                  style={{ fontSize: i === 0 ? 'clamp(1.8rem, 3.5vw, 3rem)' : 'clamp(1.4rem, 2.2vw, 2rem)' }}
                >
                  {c.headline}
                </h3>
                <div className="flex items-baseline gap-6 mb-3">
                  <span
                    className="font-display text-accent-blue leading-none"
                    style={{ fontSize: i === 0 ? '3.5rem' : '2.5rem', fontStyle: 'italic', fontWeight: 300 }}
                  >
                    {c.metric}
                  </span>
                  <div>
                    <div className="font-ui text-ink-50 text-sm">{c.client}</div>
                    <div className="font-body text-ink-300 text-[12px]">{c.sub}</div>
                  </div>
                </div>
                <div className="h-px w-full bg-ink-500 mt-5 mb-4 origin-left group-hover:bg-ink-50 transition-colors" />
                <div className="flex flex-wrap gap-3 font-mono text-[10px] text-ink-300 tracking-widest uppercase">
                  {c.tags.map(t => <span key={t}>/ {t}</span>)}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
