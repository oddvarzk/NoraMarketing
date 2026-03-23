/**
 * Auto-scrolling partner logo banner.
 * Uses styled SVG text-marks that look like real brand logos.
 * Replace with <img src={logo} /> when real assets are available.
 */

interface Partner {
  name: string
  src?: string
  style?: 'serif' | 'sans' | 'mono' | 'stencil'
}

const PARTNERS: Partner[] = [
  { name: 'Nordvik', style: 'sans' },
  { name: 'Bergström', style: 'serif' },
  { name: 'Helios AS', style: 'mono' },
  { name: 'Apex Group', style: 'stencil' },
  { name: 'Kvartett', style: 'sans' },
  { name: 'Solberg & Co', style: 'serif' },
  { name: 'Forma Studio', style: 'mono' },
  { name: 'Vind Digital', style: 'stencil' },
]

interface Props {
  heading?: string
}

export default function LogoBanner({ heading = 'Tillit fra utallige byråer **i hele Norden**' }: Props) {
  const doubled = [...PARTNERS, ...PARTNERS]

  return (
    <div className="py-14 border-y border-nm-border/25 overflow-hidden">
      <p className="text-center font-cabinet text-nm-muted text-sm mb-10 px-6">
        {heading.split('**').map((part, i) =>
          i % 2 === 1 ? (
            <strong key={i} className="text-nm-fg font-semibold">{part}</strong>
          ) : (
            part
          ),
        )}
      </p>

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

const styleMap = {
  sans:    'font-satoshi font-bold text-base tracking-tight',
  serif:   'font-satoshi font-black text-base italic tracking-tight',
  mono:    'font-cabinet font-bold text-sm tracking-widest uppercase',
  stencil: 'font-bespoke font-bold text-base tracking-wide uppercase',
}

function LogoItem({ partner }: { partner: Partner }) {
  return (
    <div className="flex items-center justify-center mx-14 flex-shrink-0 h-10 opacity-40 hover:opacity-80 transition-opacity duration-300">
      {partner.src ? (
        <img
          src={partner.src}
          alt={partner.name}
          className="h-7 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
          loading="lazy"
        />
      ) : (
        <span className={`text-nm-fg whitespace-nowrap ${styleMap[partner.style ?? 'sans']}`}>
          {partner.name}
        </span>
      )}
    </div>
  )
}
