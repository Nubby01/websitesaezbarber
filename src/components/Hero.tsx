import { useCallback, useRef, type MouseEvent } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { Button } from './Button'

export function Hero() {
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
      className="hero relative min-h-svh flex items-center overflow-hidden bg-background"
      aria-label="Portada Academia SB"
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

      <div className="relative z-10 container-grid w-full pt-28 pb-20 md:pt-32 md:pb-28">
        <div className="relative max-w-4xl">
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
              animate={
                reduceMotion
                  ? undefined
                  : {
                      scale: [1, 1.04, 0.98, 1],
                    }
              }
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

          <div className="relative z-[3] grid gap-7">
            <motion.p
              className="text-primary text-xs md:text-sm tracking-[0.35em] uppercase font-medium"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.75,
                delay: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Academia SB · Metodología SaezBarber
            </motion.p>

            <motion.h1
              className="text-display text-[clamp(2.6rem,11vw,7.5rem)] text-text-primary max-w-5xl"
              initial={{ opacity: 0, y: 52, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1.05,
                delay: 0.85,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Conviértete en Visagista SB Certificado
            </motion.h1>

            <motion.p
              className="max-w-xl text-text-secondary text-base md:text-lg font-light leading-relaxed"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 1.25,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Una metodología clara para diseñar identidad desde el rostro y la
              personalidad. SaezBarber la creó; Academia SB la enseña y
              certifica.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 pt-2"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.85,
                delay: 1.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Button to="/academia" ariaLabel="Conocer Academia SB">
                Conocer Academia
              </Button>
              <Button
                to="/academia#inscripcion"
                variant="secondary"
                ariaLabel="Postular a Academia SB"
              >
                Postular
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
