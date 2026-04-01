import SEO from '../components/ui/SEO'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <>
      <SEO title="404 – Siden finnes ikke" noindex />

      <div className="min-h-dvh flex flex-col items-center justify-center px-6 text-center gap-8">
        <span className="font-bespoke font-bold text-[10rem] leading-none text-nm-accent/15 select-none">
          404
        </span>

        <div className="-mt-8 flex flex-col items-center gap-4">
          <h1 className="font-lora font-bold text-4xl md:text-5xl text-nm-light">
            Siden finnes ikke
          </h1>
          <p className="font-cabinet text-nm-muted text-lg max-w-sm">
            Siden du leter etter eksisterer ikke eller har blitt flyttet.
          </p>
        </div>

        <Button href="/" variant="outline">
          Gå til forsiden
        </Button>
      </div>
    </>
  )
}
