import { useGSAPContext } from '../../hooks/useGSAP'
import { ScrollTrigger } from '../../hooks/useGSAP'
import gsap from 'gsap'
import Button from '../ui/Button'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: '5+', label: 'År i bransjen' },
  { value: '120+', label: 'Fornøyde kunder' },
  { value: '3×', label: 'Gjennomsnittlig ROI' },
]

export default function AboutTeaser() {
  const ref = useGSAPContext<HTMLElement>((ctx) => {
    ctx.add(() => {
      gsap.fromTo(
        '[data-about-text]',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-about-text]',
            start: 'top 80%',
          },
        },
      )

      gsap.fromTo(
        '[data-stat]',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-stat]',
            start: 'top 85%',
          },
        },
      )
    })
  })

  return (
    <section
      ref={ref}
      className="py-32 px-6"
      aria-labelledby="about-teaser-heading"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <span className="w-8 h-px bg-nm-accent" />
            <span className="font-bespoke font-bold text-xs tracking-widest2 uppercase text-nm-fg">
              Hvem vi er
            </span>
          </div>

          <h2
            id="about-teaser-heading"
            data-about-text
            className="font-satoshi font-black text-4xl md:text-5xl text-nm-light leading-tight"
            style={{ opacity: 0 }}
          >
            Et byrå bygget på{' '}
            <span className="text-gradient">resultater</span>,{' '}
            ikke løfter.
          </h2>

          <p
            data-about-text
            className="font-cabinet text-nm-muted text-lg leading-relaxed"
            style={{ opacity: 0 }}
          >
            Nora Marketing ble grunnlagt med én ambisjon: å levere markedsføring
            som faktisk måles i krone og øre. Vi er et dedikert team med dyp
            bransjeforståelse og ingen unnskyldninger.
          </p>

          <div data-about-text style={{ opacity: 0 }}>
            <Button href="/hvem-vi-er" variant="outline">
              Les mer om oss
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              data-stat
              className="flex flex-col gap-2 p-6 bg-nm-surface border border-nm-border/60 rounded-sm"
              style={{ opacity: 0 }}
            >
              <span className="font-satoshi font-black text-4xl text-nm-accent">
                {stat.value}
              </span>
              <span className="font-cabinet text-nm-muted text-sm leading-snug">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
