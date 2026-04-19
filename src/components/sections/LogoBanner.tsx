const PARTNERS = [
  { name: 'Nordvik',       style: 'italic font-display text-2xl' },
  { name: 'Bergström',     style: 'font-display text-2xl' },
  { name: 'HELIOS',        style: 'font-mono tracking-widest text-lg' },
  { name: 'APEX /',        style: 'font-ui font-bold text-xl tracking-wide' },
  { name: 'Kvartett',      style: 'italic font-display text-2xl' },
  { name: 'Solberg & Co.', style: 'font-display text-xl' },
  { name: 'FORMA',         style: 'font-ui font-semibold tracking-[0.3em] text-lg' },
  { name: 'vind.',         style: 'italic font-display text-2xl' },
]

const doubled = [...PARTNERS, ...PARTNERS]

export default function LogoBanner() {
  return (
    <div className="py-14 border-y border-ink-500/40 overflow-hidden">
      <div className="text-center mb-8">
        <span className="font-mono text-[10px] text-ink-300 tracking-widest2 uppercase">
          Utvalgte klienter — Norden
        </span>
      </div>
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee">
          {doubled.map((p, i) => (
            <span
              key={i}
              className={`mx-14 text-ink-200 whitespace-nowrap ${p.style}`}
            >
              {p.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
