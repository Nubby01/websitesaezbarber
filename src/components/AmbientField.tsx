import type { ReactNode } from 'react'

type AmbientVariant = 'corner' | 'cta' | 'counter'

type AmbientFieldProps = {
  variant: AmbientVariant
  children?: ReactNode
  className?: string
}

export function AmbientField({
  variant,
  children,
  className = '',
}: AmbientFieldProps) {
  return (
    <div
      className={`ambient ambient--${variant} ${className}`}
      aria-hidden={!children}
    >
      <div className="ambient__layer" />
      {children}
    </div>
  )
}
