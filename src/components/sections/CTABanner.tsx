import { useGSAPContext } from '../../hooks/useGSAP'
import { ScrollTrigger } from '../../hooks/useGSAP'
import gsap from 'gsap'
import Button from '../ui/Button'

gsap.registerPlugin(ScrollTrigger)

export default function CTABanner() {
  const ref = useGSAPContext<HTMLElement>((ctx) => {
    ctx.add(() => {
      gsap.fromTo(
        '[data-cta-content]',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-cta-content]',
            start: 'top 80%',
          },
        },
      )
    })
  })

  return (
    <section
      ref={ref}
      className="py-32 px-6"
      aria-label="Ta kontakt"
    >
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
        <h2
          data-cta-content
          className="font-satoshi font-black text-4xl md:text-6xl text-nm-light leading-tight"
          style={{ opacity: 0 }}
        >
          Klar for å ta markedsføringen til neste nivå?
        </h2>

        <p
          data-cta-content
          className="font-cabinet text-nm-muted text-lg leading-relaxed max-w-xl"
          style={{ opacity: 0 }}
        >
          La oss ta en uforpliktende prat om hva Nora Marketing kan gjøre for din bedrift.
        </p>

        <div
          data-cta-content
          className="flex flex-wrap gap-4 justify-center"
          style={{ opacity: 0 }}
        >
          <Button href="/kontakt" variant="primary" size="lg">
            Ta kontakt i dag
          </Button>
          <Button href="/tjenester" variant="outline" size="lg">
            Se alle tjenester
          </Button>
        </div>
      </div>
    </section>
  )
}
