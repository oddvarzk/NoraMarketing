interface Props {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: { box: 28, text: 13 },
  md: { box: 36, text: 16 },
  lg: { box: 48, text: 22 },
}

export default function NMLogo({ className = '', size = 'md' }: Props) {
  const { box, text } = sizes[size]

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Mark */}
      <svg
        width={box}
        height={box}
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden="true"
      >
        {/* N */}
        <text
          x="2"
          y="27"
          fontFamily="'Bespoke Stencil', sans-serif"
          fontWeight="700"
          fontSize="24"
          fill="white"
        >
          N
        </text>
        {/* M – accent colour */}
        <text
          x="17"
          y="27"
          fontFamily="'Bespoke Stencil', sans-serif"
          fontWeight="700"
          fontSize="24"
          fill="#4B6EF5"
        >
          M
        </text>
      </svg>

      {/* Wordmark */}
      <span
        style={{ fontSize: text }}
        className="font-satoshi font-semibold tracking-wide text-nm-fg leading-none"
      >
        Nora Marketing
      </span>
    </div>
  )
}
