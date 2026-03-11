import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SEO from '../components/ui/SEO'
import CTABanner from '../components/sections/CTABanner'
import Button from '../components/ui/Button'

gsap.registerPlugin(ScrollTrigger)

const VALUES = [
  {
    title: 'Resultatorientert',
    body: 'Vi måler alt. Ingen tiltak iverksettes uten et klart mål og en plan for å dokumentere effekten.',
  },
  {
    title: 'Transparent',
    body: 'Du får full innsikt i hva vi gjør, hvorfor vi gjør det, og hva det gir deg. Ingen svarte bokser.',
  },
  {
    title: 'Langsiktig',
    body: 'Vi bygger relasjoner, ikke kampanjer. Våre kunder er med oss fordi de ser varig vekst.',
  },
]

export default function HvemViEr() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-hero-el]',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' },
      )

      gsap.fromTo(
        '[data-value-card]',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-value-card]', start: 'top 85%' },
        },
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <SEO
        title="Hvem vi er"
        description="Lær om teamet bak Nora Marketing – et dedikert markedsføringsbyrå med lidenskap for digitale resultater."
        canonical="/hvem-vi-er"
      />

      <div ref={heroRef} className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <div className="pt-40 pb-24">
          <div data-hero-el className="flex items-center gap-4 mb-6" style={{ opacity: 0 }}>
            <span className="w-8 h-px bg-nm-accent" />
            <span className="font-bespoke font-bold text-xs tracking-widest2 uppercase text-nm-fg">
              Hvem vi er
            </span>
          </div>

          <h1
            data-hero-el
            className="font-satoshi font-black text-5xl md:text-7xl text-nm-light leading-tight mb-8 max-w-4xl"
            style={{ opacity: 0 }}
          >
            Vi er <span className="text-gradient">Nora Marketing</span>.
          </h1>

          <p
            data-hero-el
            className="font-cabinet text-nm-muted text-xl leading-relaxed max-w-2xl"
            style={{ opacity: 0 }}
          >
            Et markedsføringsbyrå grunnlagt på troen om at godt håndverk og datadrevne beslutninger
            ikke trenger å utelukke hverandre. Vi kombinerer kreativitet med strategi for å levere
            resultater som faktisk betyr noe for din bunnlinje.
          </p>
        </div>

        {/* Values */}
        <section aria-labelledby="values-heading" className="py-24 border-t border-nm-border/50">
          <h2
            id="values-heading"
            className="font-satoshi font-black text-3xl md:text-4xl text-nm-light mb-14"
          >
            Verdiene våre
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((v) => (
              <div
                key={v.title}
                data-value-card
                className="flex flex-col gap-4 p-8 bg-nm-surface border border-nm-border/60 rounded-sm"
                style={{ opacity: 0 }}
              >
                <h3 className="font-satoshi font-bold text-xl text-nm-fg">{v.title}</h3>
                <p className="font-cabinet text-nm-muted text-sm leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="py-24 border-t border-nm-border/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-satoshi font-black text-3xl md:text-4xl text-nm-light mb-6">
                Vår misjon
              </h2>
              <p className="font-cabinet text-nm-muted text-lg leading-relaxed mb-8">
                Å demokratisere tilgangen til profesjonell markedsføring – slik at bedrifter i alle
                størrelser kan konkurrere og vokse i det digitale landskapet.
              </p>
              <Button href="/kontakt" variant="primary">
                Ta kontakt
              </Button>
            </div>

            {/* Placeholder for image / illustration */}
            <div className="aspect-video bg-nm-surface border border-nm-border/50 rounded-sm flex items-center justify-center">
              <span className="font-bespoke font-bold text-6xl text-nm-accent/20 select-none">NM</span>
            </div>
          </div>
        </section>
      </div>

      <CTABanner />
    </>
  )
}
