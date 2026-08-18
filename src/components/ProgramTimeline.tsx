import { motion, useReducedMotion } from 'framer-motion'
import { Reveal } from './Reveal'

type Module = {
  month: string
  title: string
  text: string
}

const modules: Module[] = [
  {
    month: 'Módulo 1',
    title: 'Psicología del Rostro y Visagismo SB',
    text: 'Dominio de la Proporción Áurea, Formas Arquetípicas de Carl Jung, Temperamentos y lectura de Lateralidad Facial.',
  },
  {
    month: 'Módulo 2',
    title: 'Consultoría Premium y Cierre',
    text: 'Proceso de diagnóstico facial en vivo, PNL, lenguaje corporal y comunicación para empaquetar servicios High Ticket.',
  },
  {
    month: 'Módulo 3',
    title: 'Marca Personal para Barberos',
    text: 'Creación de contenido estratégico enfocado en atraer clientes finales dispuestos a pagar más (no en impresionar a otros barberos).',
  },
  {
    month: 'Módulo 4',
    title: 'Reingeniería de Negocio',
    text: 'Reestructuración de tarifas, sistemas delegables e independización para dejar de ser esclavo de la silla.',
  },
  {
    month: 'Módulo 5',
    title: 'Certificación e Integración',
    text: 'Exámenes prácticos finales, obtención de la Certificación Oficial SB e inclusión en el mapa interactivo.',
  },
]

function TimelineLine() {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <div
        className="absolute left-[1.125rem] md:left-1/2 md:-translate-x-px top-2 bottom-2 w-px bg-primary/25"
        aria-hidden
      />
    )
  }

  return (
    <motion.div
      className="absolute left-[1.125rem] md:left-1/2 md:-translate-x-px top-2 bottom-2 w-px bg-primary/25 origin-top"
      aria-hidden
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
    />
  )
}

function TimelineNode({ index }: { index: number }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.span
      className="absolute left-[1.125rem] md:left-1/2 top-8 size-3 -translate-x-1/2 rounded-full border-2 border-primary bg-surface z-10"
      aria-hidden
      initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    />
  )
}

function TimelineModule({
  module,
  index,
}: {
  module: Module
  index: number
}) {
  const isEven = index % 2 === 0

  return (
    <Reveal delay={index * 0.12} className="relative">
      <TimelineNode index={index} />

      <article
        className={`relative pl-10 md:pl-0 md:grid md:grid-cols-2 md:gap-12 lg:gap-20 ${
          isEven ? '' : 'md:[&>*:first-child]:order-2'
        }`}
      >
        <div
          className={`hidden md:block ${isEven ? 'md:pr-8' : 'md:pl-8 md:order-2'}`}
          aria-hidden
        />

        <div
          className={`md:py-2 ${isEven ? 'md:pl-8 md:text-left' : 'md:pr-8 md:text-right md:order-1'}`}
        >
          <p className="text-primary text-xs tracking-[0.25em] uppercase mb-2">
            {module.month}
          </p>
          <h3 className="text-display text-[clamp(1.75rem,4vw,2.5rem)] text-text-primary mb-3 leading-[0.95]">
            {module.title}
          </h3>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-md md:max-w-none inline-block">
            {module.text}
          </p>
        </div>
      </article>
    </Reveal>
  )
}

export function ProgramTimeline() {
  return (
    <section
      id="programa"
      className="section-pad bg-background"
      aria-labelledby="programa-title"
    >
      <div className="container-grid max-w-5xl">
        <Reveal className="max-w-3xl mb-16 md:mb-24">
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-5">
            Programa · 5 meses
          </p>
          <h2
            id="programa-title"
            className="text-display text-[clamp(2.6rem,6vw,4.2rem)] text-text-primary mb-5"
          >
            Estructura del programa
          </h2>
          <p className="text-text-secondary text-lg font-light leading-relaxed">
            Cinco módulos en 5 meses. Una ruta progresiva del rostro al negocio,
            con certificación e integración al mapa oficial.
          </p>
        </Reveal>

        <div className="relative space-y-12 md:space-y-16 pb-4">
          <TimelineLine />
          {modules.map((module, index) => (
            <TimelineModule key={module.month} module={module} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
