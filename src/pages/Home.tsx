import SEO from '../components/ui/SEO'
import Hero from '../components/sections/Hero'
import LogoBanner from '../components/sections/LogoBanner'
import ServicesSection from '../components/sections/ServicesSection'
import ProcessSection from '../components/sections/ProcessSection'
import AboutTeaser from '../components/sections/AboutTeaser'
import CTABanner from '../components/sections/CTABanner'

export default function Home() {
  return (
    <>
      <SEO
        canonical="/"
        description="Nora Marketing – markedsføringsbyrå spesialisert i digital strategi, innholdsmarkedsføring, SEO og sosiale medier i hele Norden."
      />

      <Hero />
      <LogoBanner heading="Tillit fra utallige byråer **i hele Norden**" />
      <ProcessSection />
      <ServicesSection />
      <AboutTeaser />
      <CTABanner />
    </>
  )
}
