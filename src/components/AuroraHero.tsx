import { useCallback, useRef, type MouseEvent, type ReactNode } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'

type AuroraHeroProps = {
  children: ReactNode
  /** Clases de la sección (altura mínima, fondos adicionales) */
  className?: string
  /** Clases del contenedor interno (paddings verticales) */
  contentClassName?: string
  /** Clases del bloque de contenido (ancho máximo) */
  innerClassName?: string
  ariaLabel?: string
  ariaLabelledBy?: string
}

export function AuroraHero({
  children,
  className = '',
  contentClassName = '',
  innerClassName = '',
  ariaLabel,
  ariaLabelledBy,
}: AuroraHeroProps) {
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 50, damping: 24, mass: 0.45 })
  const springY = useSpring(my, { stiffness: 50, damping: 24, mass: 0.45 })

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (reduceMotion) return
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const nx = (e.clientX - rect.left) / rect.width - 0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5
      mx.set(nx * rect.width * 0.045)
      my.set(ny * rect.height * 0.045)
    },
    [mx, my, reduceMotion],
  )

  const onMouseLeave = useCallback(() => {
    mx.set(0)
    my.set(0)
  }, [mx, my])

  return (
    <section
      ref={sectionRef}
      className={`hero relative flex items-center overflow-hidden bg-background ${className}`}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        className="hero-aurora pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{ x: springX, y: springY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="hero-aurora-wash"
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, 18, -12, 0],
                  y: [0, -14, 10, 0],
                  scale: [1, 1.03, 1.01, 1],
                }
          }
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <div
        className="hero-noise pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
      />

      <div className={`relative z-10 container-grid w-full ${contentClassName}`}>
        <div className={`relative ${innerClassName}`}>
          <motion.div
            className="hero-glow pointer-events-none absolute z-[2]"
            aria-hidden
            style={{ x: springX, y: springY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="hero-glow-core"
              animate={reduceMotion ? undefined : { scale: [1, 1.04, 0.98, 1] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="hero-glow-beam"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: [0.55, 0.78, 0.62, 0.55],
                      scaleY: [1, 1.05, 1.02, 1],
                    }
              }
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          <div className="relative z-[3] grid gap-5 md:gap-6">{children}</div>
        </div>
      </div>
    </section>
  )
}
