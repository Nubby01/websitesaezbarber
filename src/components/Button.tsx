import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
  ariaLabel?: string
} & (
  | { to: string; href?: never; onClick?: never }
  | { href: string; to?: never; onClick?: never }
  | { onClick: () => void; to?: never; href?: never; type?: 'button' }
)

export function Button({
  children,
  variant = 'primary',
  className = '',
  ariaLabel,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary'

  const styles =
    variant === 'primary'
      ? 'bg-primary text-on-primary hover:bg-primary-light'
      : 'border border-primary text-primary bg-transparent hover:bg-primary hover:text-on-primary'

  const content = (
    <>
      {children}
      {variant === 'primary' && <ArrowRight className="size-4" aria-hidden />}
    </>
  )

  if ('to' in props && props.to) {
    return (
      <Link
        to={props.to}
        className={`${base} ${styles} ${className}`}
        aria-label={ariaLabel}
      >
        {content}
      </Link>
    )
  }

  if ('href' in props && props.href) {
    return (
      <a
        href={props.href}
        className={`${base} ${styles} ${className}`}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type="button"
      onClick={'onClick' in props ? props.onClick : undefined}
      className={`${base} ${styles} ${className}`}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  )
}
