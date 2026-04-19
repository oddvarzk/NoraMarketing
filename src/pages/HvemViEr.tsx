import { useEffect, useState } from 'react'
import SEO from '../components/ui/SEO'
import ArrowCTA from '../components/ui/ArrowCTA'
import CTABanner from '../components/sections/CTABanner'
import { TEAM, VALUES } from '../lib/data'
import { wp } from '../lib/wordpress'

interface TeamMember {
  id: string
  name: string
  role: string
  image: string | null
  initials: string
  bio: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapWpMember(post: any): TeamMember {
  const acf = post.acf ?? {}
  const media = post._embedded?.['wp:featuredmedia']?.[0]
  return {
    id:       post.slug ?? String(post.id),
    name:     post.title?.rendered ?? '',
    role:     acf.rolle ?? '',
    image:    media?.source_url ?? null,
    initials: acf.initialer ?? (post.title?.rendered ?? '??').slice(0, 2).toUpperCase(),
    bio:      acf.bio ?? '',
  }
}

function PageCover() {
  return (
    <section className="relative pt-40 pb-16 px-6 lg:px-10 border-b border-ink-500/40">
      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-2 flex flex-col gap-1 font-mono text-[10px] text-ink-300 tracking-widest2 uppercase">
          <div>Ch. 04</div>
          <div>Est. 2020</div>
          <div>Oslo, Norge</div>
        </div>
        <div className="col-span-12 md:col-span-10">
          <div className="font-mono text-[10px] text-accent-blue tracking-widest2 uppercase mb-8">
            N°— Hvem vi er · Ch. IV
          </div>
          <h1
            className="font-display font-light leading-[0.88] text-ink-50 mb-10"
            style={{ fontSize: 'clamp(2.8rem, 10vw, 9rem)' }}
          >
            Vi er <em className="font-normal italic text-accent-blue">Nora.</em>
            <br /><span className="t-outline">Syv mennesker,</span>
            <br />ett verksted.
          </h1>
          <p className="font-body text-ink-200 text-lg leading-relaxed max-w-2xl">
            Vi er et lite, selvstendig byrå i Oslo. Ingen kontortårn, ingen hierarki.
            Bare håndverkere som bryr seg om arbeidet som forlater studioet.
          </p>
        </div>
      </div>
    </section>
  )
}

export default function HvemViEr() {
  const [team, setTeam] = useState<TeamMember[]>([])
  const [teamLoading, setTeamLoading] = useState(true)

  useEffect(() => {
    wp.team()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((posts: any[]) => setTeam(posts.map(mapWpMember)))
      .catch(() => setTeam([]))
      .finally(() => setTeamLoading(false))
  }, [])

  const displayTeam = team.length > 0 ? team : TEAM.map(m => ({ ...m, image: null }))

  return (
    <>
      <SEO
        title="Hvem vi er"
        description="Lær om teamet bak Nora Marketing — et selvstendig byrå i Oslo bygget på håndverk, ærlighet og målbare resultater."
        canonical="/hvem-vi-er"
      />

      <PageCover />

      {/* History */}
      <section className="px-6 lg:px-10 py-28 border-b border-ink-500/40">
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <div className="font-mono text-[10px] text-accent-blue tracking-widest2 uppercase mb-6">Vår historie</div>
            <h2
              className="font-display font-light text-ink-50 leading-[0.95]"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
            >
              Fra frustrasjon,
              <br /><em className="font-normal italic">til fagmiljø.</em>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6 flex flex-col gap-6 border-l border-ink-500/60 pl-8">
            {[
              'Vi startet Nora fordi vi var lei av oppblåst markedsføringsprat. God markedsføring er tydelig og ærlig — ikke mest mulig støy. Bedrifter fortjener partnere som holder ting enkelt, og leverer det de lover.',
              'Vi har funnet balansen mellom god design og praktisk markedsføring. Ikke for stivt, ikke for løst. Vi liker kunder som vil ha reell hjelp, ikke fancy presentasjoner som samler støv.',
              'I dag hjelper vi primært SMB-bedrifter med å finne sin stemme. Profesjonell uten å være stiv, tilgjengelig uten å være billig.',
            ].map((p, i) => (
              <p key={i} className="font-body text-ink-200 text-lg leading-relaxed">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 lg:px-10 py-28 border-b border-ink-500/40">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-12 gap-6 items-end mb-14">
            <div className="col-span-12 lg:col-span-1">
              <div className="font-mono text-[10px] text-ink-300 tracking-widest2">§ I</div>
            </div>
            <div className="col-span-12 lg:col-span-7">
              <div className="font-mono text-[10px] text-accent-blue tracking-widest2 uppercase mb-4">Verdier</div>
              <h2
                className="font-display font-medium tracking-tight leading-[0.95] text-ink-50"
                style={{ fontSize: 'clamp(2.2rem, 5.2vw, 4.5rem)' }}
              >
                Prinsippene som
                <br /><em className="font-normal italic">styrer alt.</em>
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:pl-8">
              <p className="font-body text-ink-200 text-[15px] leading-relaxed">
                Verdiene bestemmer hvilke prosjekter vi tar, hvordan vi leverer,
                og hvem vi ansetter. Fire enkle punkter — ingen kompromiss.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-0 border-t border-ink-500/60">
            {VALUES.map((v, i) => (
              <div
                key={v.num}
                className={`col-span-12 md:col-span-6 p-10 border-b border-ink-500/60 ${i % 2 === 0 ? 'md:border-r' : ''}`}
              >
                <div className="flex items-baseline gap-6 mb-6">
                  <span
                    className="font-display text-accent-blue leading-none"
                    style={{ fontSize: '3rem', fontStyle: 'italic', fontWeight: 300 }}
                  >
                    {v.num}
                  </span>
                  <h3 className="font-display text-ink-50 text-2xl">{v.title}</h3>
                </div>
                <p className="font-body text-ink-200 text-[15px] leading-relaxed max-w-md">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 lg:px-10 py-28 border-b border-ink-500/40">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-12 gap-6 items-end mb-14">
            <div className="col-span-12 lg:col-span-1">
              <div className="font-mono text-[10px] text-ink-300 tracking-widest2">§ II</div>
            </div>
            <div className="col-span-12 lg:col-span-7">
              <div className="font-mono text-[10px] text-accent-blue tracking-widest2 uppercase mb-4">Teamet</div>
              <h2
                className="font-display font-medium tracking-tight leading-[0.95] text-ink-50"
                style={{ fontSize: 'clamp(2.2rem, 5.2vw, 4.5rem)' }}
              >
                Folkene
                <br /><span className="t-outline">bak arbeidet.</span>
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:pl-8">
              <p className="font-body text-ink-200 text-[15px] leading-relaxed">
                Fem faste, to frilansere vi har jobbet med i årevis.
                Alle med beina plantet i håndverket.
              </p>
            </div>
          </div>

          {teamLoading ? (
            <div className="flex items-center justify-center py-20">
              <span className="font-mono text-[10px] text-ink-300 tracking-widest2 uppercase">Laster teamet…</span>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-6">
              {displayTeam.map((m, i) => (
                <article key={m.id} className="col-span-6 md:col-span-4 lg:col-span-3">
                  {m.image ? (
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-full aspect-[3/4] object-cover mb-4"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="ph aspect-[3/4] mb-4"
                      data-label={m.initials}
                    />
                  )}
                  <div className="font-mono text-[10px] text-ink-300 tracking-widest uppercase mb-2">
                    {String(i + 1).padStart(2, '0')} · {m.role}
                  </div>
                  <h4 className="font-display text-ink-50 text-xl mb-2">{m.name}</h4>
                  <p className="font-body text-ink-300 text-[13px] leading-relaxed">{m.bio}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Mission */}
      <section className="px-6 lg:px-10 py-28 border-b border-ink-500/40">
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-6 items-center">
          <div className="col-span-12 md:col-span-5">
            <div className="font-mono text-[10px] text-accent-blue tracking-widest2 uppercase mb-6">Vår misjon</div>
            <h2
              className="font-display font-light text-ink-50 leading-[0.95] mb-8"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)' }}
            >
              Profesjonell markedsføring
              <br /><span className="t-outline">for alle.</span>
            </h2>
            <p className="font-body text-ink-200 text-lg leading-relaxed mb-8">
              Å demokratisere tilgangen til profesjonell markedsføring — slik at bedrifter
              i alle størrelser kan konkurrere og vokse. Vi er her for de som vil noe.
            </p>
            <ArrowCTA to="/kontakt" variant="solid">Ta kontakt</ArrowCTA>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <div className="border border-ink-500/60 p-12 flex flex-col gap-8">
              {[
                { val: '5+',  label: 'År' },
                { val: '120+', label: 'Kunder' },
                { val: '3×',  label: 'Snitt ROI' },
              ].map(({ val, label }) => (
                <div key={label} className="flex items-baseline gap-6">
                  <span
                    className="font-display text-accent-blue leading-none"
                    style={{ fontSize: '4rem', fontStyle: 'italic', fontWeight: 300 }}
                  >
                    {val}
                  </span>
                  <span className="font-mono text-[10px] text-ink-300 tracking-widest2 uppercase">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
