import ArrowCTA from '../ui/ArrowCTA'

export default function AboutTeaser() {
  return (
    <section className="py-28 px-6 lg:px-10 border-t border-ink-500/40">
      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-6">

        {/* Left: text */}
        <div className="col-span-12 md:col-span-5">
          <div className="font-mono text-[10px] text-accent-blue tracking-widest2 uppercase mb-6">
            N°05 — Hvem vi er
          </div>
          <h2
            className="font-display font-light leading-[0.9] text-ink-50 mb-8"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)' }}
          >
            Et byrå bygget på
            <br /><em className="font-normal italic text-accent-blue">håndverk,</em>
            <br /><span className="t-outline">ikke hype.</span>
          </h2>
          <p className="font-body text-ink-200 text-lg leading-relaxed mb-8 max-w-md">
            Vi er et lite team i Oslo. Vi jobber direkte med deg, uten mellomledd.
            Vi liker kaffe, lange detaljer og å se kunder lykkes.
          </p>
          <ArrowCTA to="/hvem-vi-er">Møt teamet</ArrowCTA>
        </div>

        {/* Right: image placeholder + testimonial */}
        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <figure className="relative">
            <div
              className="ph aspect-[4/5]"
              data-label="Studioportrett · team · Oslo"
            />
            <figcaption className="mt-4 flex items-start justify-between gap-4">
              <div className="font-mono text-[10px] text-ink-300 tracking-widest2 uppercase">
                Fig. 01 — Teamet, januar 2026
              </div>
              <div className="font-mono text-[10px] text-ink-300 tracking-widest2 uppercase text-right max-w-[200px]">
                Foto: Nora studio<br />Oslo, 59.9°N
              </div>
            </figcaption>
          </figure>

          <blockquote className="mt-12 max-w-lg">
            <p className="font-display italic font-light text-ink-50 text-2xl leading-snug mb-6">
              "Nora snudde vår digitale tilstedeværelse fra usynlig til markedsledende.
              Resultatene taler for seg selv."
            </p>
            <footer className="flex items-center gap-4">
              <div className="h-10 w-10 bg-ink-500 flex items-center justify-center font-ui text-[10px] text-ink-50">
                EH
              </div>
              <div>
                <div className="font-ui text-ink-50 text-sm">Erik Haugen</div>
                <div className="font-body text-ink-300 text-[12px]">Daglig leder, Nordvik Eiendom</div>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
