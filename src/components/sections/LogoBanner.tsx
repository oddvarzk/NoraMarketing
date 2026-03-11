/**
 * Auto-scrolling partner logo banner (infinite marquee).
 * Duplicates the track so the animation loops seamlessly.
 */

interface Partner {
  name: string
  src?: string
}

const PARTNERS: Partner[] = [
  { name: 'Partner 1' },
  { name: 'Partner 2' },
  { name: 'Partner 3' },
  { name: 'Partner 4' },
  { name: 'Partner 5' },
  { name: 'Partner 6' },
  { name: 'Partner 7' },
  { name: 'Partner 8' },
]

interface Props {
  heading?: string
}

export default function LogoBanner({ heading = 'Tillit fra utallige byråer i hele Norden' }: Props) {
  // Build a doubled array for seamless loop
  const doubled = [...PARTNERS, ...PARTNERS]

  return (
    <div className="py-16 border-y border-nm-border/40 overflow-hidden">
      <p className="text-center font-cabinet text-nm-muted text-sm mb-10 px-6">
        {heading.split('**').map((part, i) =>
          i % 2 === 1 ? (
            <strong key={i} className="text-nm-fg font-semibold">
              {part}
            </strong>
          ) : (
            part
          ),
        )}
      </p>

      {/* Marquee */}
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="marquee-track">
          {doubled.map((p, i) => (
            <LogoItem key={i} partner={p} />
          ))}
        </div>
      </div>
    </div>
  )
}

function LogoItem({ partner }: { partner: Partner }) {
  return (
    <div className="flex items-center justify-center mx-12 flex-shrink-0 h-10 opacity-50 hover:opacity-100 transition-opacity duration-300">
      {partner.src ? (
        <img
          src={partner.src}
          alt={partner.name}
          className="h-7 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
          loading="lazy"
        />
      ) : (
        <span className="font-satoshi font-semibold text-sm text-nm-muted tracking-wide">
          {partner.name}
        </span>
      )}
    </div>
  )
}
