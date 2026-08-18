import { motion } from 'framer-motion'
import { AuroraHero } from './AuroraHero'
import { Button } from './Button'
import { tallyFormUrl } from '../data/siteContact'

export function Hero() {
  return (
    <AuroraHero
      className="min-h-svh"
      contentClassName="pt-28 pb-20 md:pt-32 md:pb-28"
      innerClassName="max-w-4xl"
      ariaLabel="Portada Academia SB"
    >
      <motion.h1
        className="text-display text-[clamp(2.85rem,12vw,7.75rem)] text-text-primary max-w-5xl leading-[0.92]"
        initial={{ opacity: 0, y: 48, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 1,
          delay: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        Conviértete en Visagista SB Certificado
      </motion.h1>

      <motion.p
        className="max-w-2xl text-text-secondary text-lg md:text-xl font-light leading-relaxed"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.85,
          delay: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        Pasa de ejecutar cortes en piloto automático a dominar la primera
        metodología basada en ciencia, psicología y neurociencia para transformar
        la imagen de tus clientes y escalar tu valor profesional.
      </motion.p>

      <motion.div
        className="flex flex-wrap gap-3 sm:gap-4 pt-1"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.85,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Button href={tallyFormUrl} ariaLabel="Postular a la Academia SB">
          Postular a la Academia SB
        </Button>
        <Button
          to="/visagistas#directorio"
          variant="secondary"
          ariaLabel="Buscar un Visagista SB certificado"
        >
          Buscar un Visagista SB Certificado
        </Button>
      </motion.div>
    </AuroraHero>
  )
}
