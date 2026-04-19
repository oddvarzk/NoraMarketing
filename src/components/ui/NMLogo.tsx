interface Props {
  className?: string
  compact?: boolean
}

export default function NMLogo({ className = '', compact = false }: Props) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div
        className="flex items-baseline gap-0 leading-none"
        style={{ fontFamily: "'Fraunces', serif", fontWeight: 700 }}
      >
        <span className="text-ink-50 text-[22px] leading-none italic">N</span>
        <span className="text-accent-blue text-[22px] leading-none italic">m</span>
      </div>
      {!compact && (
        <div className="flex flex-col leading-none">
          <span className="font-ui font-semibold text-[13px] text-ink-50 tracking-wide">
            Nora Marketing
          </span>
          <span className="font-mono text-[8px] text-ink-300 tracking-widest2 uppercase mt-1">
            Oslo · Est. 2020
          </span>
        </div>
      )}
    </div>
  )
}
