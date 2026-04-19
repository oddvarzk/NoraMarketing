import { PROCESS } from '../../lib/data'

export default function ProcessSection() {
  return (
    <section className="py-28 px-6 lg:px-10 border-t border-ink-500/40">
      <div className="max-w-[1400px] mx-auto">

        {/* Section head */}
        <div className="grid grid-cols-12 gap-6 items-end mb-14">
          <div className="col-span-12 lg:col-span-1">
            <div className="font-mono text-[10px] text-ink-300 tracking-widest2">N°03</div>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] text-accent-blue tracking-widest2 uppercase mb-4">Prosess</div>
            <h2
              className="font-display font-medium tracking-tight leading-[0.95] text-ink-50"
              style={{ fontSize: 'clamp(2.2rem, 5.2vw, 4.5rem)' }}
            >
              <em className="font-normal italic">Enkel</em>, men ikke
              <br />uten struktur.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:pl-8">
            <p className="font-body text-ink-200 text-[15px] leading-relaxed">
              Fire faser. Hver fase har klare leveranser, en tidsramme du kan stole på,
              og ingen overraskelser i faktura.
            </p>
          </div>
        </div>

        {/* Four-column grid */}
        <div className="grid grid-cols-12 gap-0 border-t border-ink-500/60">
          {PROCESS.map((p) => (
            <div
              key={p.num}
              className="col-span-12 md:col-span-3 p-7 md:p-8 border-b md:border-b-0 md:border-r last:border-r-0 border-ink-500/60 flex flex-col min-h-[280px]"
            >
              <div className="flex items-baseline justify-between mb-6">
                <span
                  className="font-display text-accent-blue leading-none"
                  style={{ fontSize: '2.8rem', fontVariantNumeric: 'tabular-nums lining-nums', fontStyle: 'italic', fontWeight: 300 }}
                >
                  {p.num}
                </span>
                <span className="font-mono text-[10px] text-ink-300 tracking-widest uppercase">{p.sub}</span>
              </div>
              <h3 className="font-display font-medium text-ink-50 text-2xl mb-3">{p.title}</h3>
              <p className="font-body text-ink-200 text-[14px] leading-relaxed mb-6">{p.body}</p>
              <div className="mt-auto flex flex-wrap gap-2">
                {p.tags.map(t => (
                  <span
                    key={t}
                    className="font-mono text-[9px] text-ink-200 tracking-widest uppercase border-t border-ink-400 pt-1.5 pr-4"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
