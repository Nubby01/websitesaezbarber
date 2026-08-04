type SbBadgeProps = {
  className?: string
  label?: string
}

export function SbBadge({
  className = '',
  label = 'Visagista SB',
}: SbBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 border border-primary/30 bg-primary/10 pl-1 pr-2.5 py-0.5 ${className}`}
      title={label}
    >
      <span
        className="relative flex size-4 items-center justify-center bg-primary text-on-primary"
        aria-hidden
      >
        <svg viewBox="0 0 16 16" className="size-2.5 fill-current">
          <path d="M8 1.5 9.7 5.3l4.1.4-3.1 2.8.9 4-3.6-2.1L4.4 12.5l.9-4L2.2 5.7l4.1-.4L8 1.5Z" />
        </svg>
      </span>
      <span className="text-[10px] tracking-[0.14em] uppercase text-primary font-medium leading-none">
        {label}
      </span>
    </span>
  )
}
