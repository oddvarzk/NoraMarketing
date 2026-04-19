import { useState } from 'react'
import { Link } from 'react-router-dom'
import ArrowCTA from '../ui/ArrowCTA'
import { SERVICES } from '../../lib/data'

export default function ServicesSection() {
  return (
    <section className="py-28 px-6 lg:px-10 border-t border-ink-500/40">
      <div className="max-w-[1400px] mx-auto">

        {/* Section head */}
        <div className="grid grid-cols-12 gap-6 items-end mb-14">
          <div className="col-span-12 lg:col-span-1">
            <div className="font-mono text-[10px] text-ink-300 tracking-widest2">N°02</div>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] text-accent-blue tracking-widest2 uppercase mb-4">Tjenester</div>
            <h2
              className="font-display font-medium tracking-tight leading-[0.95] text-ink-50"
              style={{ fontSize: 'clamp(2.2rem, 5.2vw, 4.5rem)' }}
            >
              Håndverk for <em className="font-normal italic text-accent-blue">merkevarer</em>
              <br />med ambisjoner.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:pl-8">
            <p className="font-body text-ink-200 text-[15px] leading-relaxed">
              Seks disipliner, én filosofi: gjør færre ting, gjør dem bedre.
              Vi plukker prosjekter vi vet vi kan flytte, og sier nei til resten.
            </p>
          </div>
        </div>

        {/* Service list */}
        <div className="border-t border-ink-500/60">
          {SERVICES.slice(0, 6).map((s) => (
            <ServiceRow key={s.slug} s={s} />
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <ArrowCTA to="/tjenester">Alle tjenester</ArrowCTA>
        </div>
      </div>
    </section>
  )
}

function ServiceRow({ s }: { s: (typeof SERVICES)[number] }) {
  const [hover, setHover] = useState(false)
  return (
    <Link
      to={`/tjenester/${s.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative flex items-center gap-6 py-7 border-b border-ink-500/60 transition-colors hover:bg-ink-800/40"
    >
      <span className={`font-mono text-[10px] tracking-widest w-10 shrink-0 transition-colors ${hover ? 'text-accent-blue' : 'text-ink-300'}`}>
        {s.num}
      </span>
      <div className="flex-1 min-w-0">
        <span
          className="font-display font-normal text-ink-50 block leading-tight transition-transform duration-500"
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', transform: hover ? 'translateX(14px)' : 'none' }}
        >
          {s.title}
        </span>
        <span
          className="font-body text-ink-300 text-[13px] leading-relaxed block mt-2 max-w-lg transition-opacity"
          style={{ opacity: hover ? 1 : 0.5 }}
        >
          {s.excerpt}
        </span>
      </div>
      <span className="hidden md:block font-mono text-[10px] text-ink-300 tracking-widest uppercase">
        {s.category}
      </span>
      <span className={`text-lg transition-transform ${hover ? 'translate-x-2 text-accent-blue' : 'text-ink-300'}`}>
        →
      </span>
    </Link>
  )
}
