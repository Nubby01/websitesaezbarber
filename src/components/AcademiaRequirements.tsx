import type { LucideIcon } from 'lucide-react'
import {
  MessageCircle,
  Megaphone,
  RefreshCw,
  Scissors,
} from 'lucide-react'
import { Reveal } from './Reveal'

type Requirement = {
  icon: LucideIcon
  title: string
  text: string
}

const requirements: Requirement[] = [
  {
    icon: Scissors,
    title: 'Experiencia previa comprobable',
    text: 'Mínimo 2 a 4 años en el rubro de la barbería masculina. Domina la técnica de corte y tijera (no es un curso para principiantes).',
  },
  {
    icon: RefreshCw,
    title: 'Voluntad de salir del modelo tradicional',
    text: 'Estar cansado del "piloto automático", de trabajar de lunes a sábado agotando horas físicas y de competir por precio.',
  },
  {
    icon: MessageCircle,
    title: 'Compromiso con el diagnóstico real',
    text: 'Querer resolver la frustración de no saber qué responder cuando el cliente pregunta "¿qué me queda bien según mi rostro?".',
  },
  {
    icon: Megaphone,
    title: 'Disposición a exponerse y escalar',
    text: 'Compromiso para reestructurar su comunicación, perder el miedo a las redes sociales y aplicar evaluaciones y exámenes.',
  },
]

export function AcademiaRequirements() {
  return (
    <section
      id="requisitos"
      className="section-pad bg-surface border-y border-border"
      aria-labelledby="requisitos-title"
    >
      <div className="container-grid">
        <Reveal className="max-w-2xl mb-14 md:mb-20">
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-5">
            Requisitos de admisión
          </p>
          <h2
            id="requisitos-title"
            className="text-display text-[clamp(2.6rem,6vw,4.2rem)] text-text-primary mb-5"
          >
            Perfil del Postulante y Requisitos de Admisión
          </h2>
          <p className="text-text-secondary text-lg font-light leading-relaxed">
            Criterios de elegibilidad para la próxima generación SB. Si te
            reconoces en estos puntos, este programa es para ti.
          </p>
        </Reveal>

        <ul className="grid sm:grid-cols-2 gap-5 md:gap-6">
          {requirements.map((item, i) => {
            const Icon = item.icon
            return (
              <Reveal key={item.title} delay={i * 0.1} as="li">
                <article className="h-full flex flex-col border border-border bg-background p-6 md:p-8 shadow-soft">
                  <span className="inline-flex size-11 items-center justify-center border border-primary/25 text-primary mb-5">
                    <Icon className="size-5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <h3 className="text-display text-2xl text-text-primary mb-3 leading-none">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed flex-1">
                    {item.text}
                  </p>
                </article>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
