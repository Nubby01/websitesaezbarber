import { motion, useReducedMotion } from 'framer-motion'
import { AuroraHero } from './AuroraHero'
import { Button } from './Button'
import { tallyFormUrl } from '../data/siteContact'

export function AcademiaHero() {
  const reduceMotion = useReducedMotion()

  return (
    <AuroraHero
      className="min-h-[min(88svh,820px)]"
      contentClassName="pt-32 md:pt-36 pb-24 md:pb-32"
      innerClassName="max-w-3xl"
      ariaLabelledBy="academia-hero-title"
    >
      <motion.p
        className="text-primary text-xs tracking-[0.3em] uppercase"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        Academia SB
      </motion.p>

      <motion.h1
        id="academia-hero-title"
        className="text-display text-[clamp(2.75rem,10vw,6.5rem)] text-text-primary leading-[0.92]"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.85,
          delay: 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        De Barbero Ejecutor a Empresario Visagista SB
      </motion.h1>

      <motion.p
        className="text-text-secondary text-lg md:text-xl font-light leading-relaxed max-w-2xl"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.28,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        Un programa de 5 meses diseñado para barberos con experiencia que quieren
        dejar de cambiar tiempo por dinero, dominar la psicología del rostro y
        construir una marca personal de alto valor.
      </motion.p>

      <motion.div
        className="flex flex-wrap gap-3 sm:gap-4 pt-1"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.75,
          delay: 0.42,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Button href={tallyFormUrl} ariaLabel="Postular a la Academia SB">
          Postular a la Academia SB
        </Button>
      </motion.div>
    </AuroraHero>
  )
}
