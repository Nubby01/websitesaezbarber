import { Reveal } from './Reveal'
import { Button } from './Button'
import { TallyFormEmbed } from './TallyFormEmbed'
import { tallyFormUrl } from '../data/siteContact'

export function AcademiaApplication() {
  return (
    <section
      id="inscripcion"
      className="section-pad bg-background border-t border-border"
      aria-labelledby="inscripcion-title"
    >
      <div className="container-grid max-w-3xl">
        <Reveal className="text-center mb-12 md:mb-16">
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-5">
            Formulario de admisión
          </p>
          <h2
            id="inscripcion-title"
            className="text-display text-[clamp(2rem,6vw,3.6rem)] text-text-primary mb-5 leading-[0.92]"
          >
            Formulario de Admisión — Próxima Generación SB
          </h2>
          <p className="text-text-secondary text-lg font-light leading-relaxed max-w-xl mx-auto mb-8">
            Completa tu postulación para la próxima generación. El equipo de
            Academia SB revisará tu perfil y te contactará con los siguientes
            pasos.
          </p>
          <Button
            href={tallyFormUrl}
            ariaLabel="Abrir formulario de admisión en Tally"
            className="mx-auto"
          >
            Postular a la Academia SB
          </Button>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            id="formulario-postulacion"
            className="border border-border bg-surface p-5 sm:p-8 md:p-10 shadow-soft scroll-mt-24"
          >
            <TallyFormEmbed />
            <p className="mt-6 text-center text-sm text-text-secondary">
              ¿Problemas con el formulario embebido?{' '}
              <a
                href={tallyFormUrl}
                className="text-primary underline underline-offset-2 hover:text-primary-light transition-colors"
              >
                Ábrelo directamente en Tally
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
