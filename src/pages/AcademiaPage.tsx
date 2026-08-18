import { Helmet } from 'react-helmet-async'
import { Reveal } from '../components/Reveal'
import { AcademiaHero } from '../components/AcademiaHero'
import { AcademiaRequirements } from '../components/AcademiaRequirements'
import { ProgramTimeline } from '../components/ProgramTimeline'
import { AcademiaApplication } from '../components/AcademiaApplication'

const process = [
  {
    step: '01',
    title: 'Postulación',
    text: 'Completas tu interés y compartes tu perfil profesional.',
  },
  {
    step: '02',
    title: 'Evaluación',
    text: 'Revisamos encaje, motivación y nivel de partida.',
  },
  {
    step: '03',
    title: 'Formación',
    text: 'Cursas el programa con mentoría y práctica guiada.',
  },
  {
    step: '04',
    title: 'Certificación',
    text: 'Obtienes el sello Visagista SB al cumplir el estándar.',
  },
]

export function AcademiaPage() {
  return (
    <>
      <Helmet>
        <title>Visagismo SB | De Barbero Ejecutor a Empresario Visagista SB</title>
        <meta
          name="description"
          content="Programa de 5 meses Visagismo SB: requisitos de admisión, módulos, certificación e integración al mapa oficial. Postula a la próxima generación."
        />
      </Helmet>

      <AcademiaHero />

      <AcademiaRequirements />

      <ProgramTimeline />

      <section
        id="certificacion"
        className="section-pad bg-surface-secondary border-y border-border"
        aria-labelledby="certificacion-title"
      >
        <div className="container-grid">
          <Reveal className="max-w-3xl mb-12">
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4">
              Certificación
            </p>
            <h2
              id="certificacion-title"
              className="text-display text-[clamp(2.6rem,6vw,4.2rem)] text-text-primary mb-5"
            >
              Proceso claro
            </h2>
            <p className="text-text-secondary text-lg font-light leading-relaxed">
              Del interés inicial al sello Visagista SB: un recorrido exigente y
              transparente.
            </p>
          </Reveal>

          <ol className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, i) => (
              <Reveal key={item.step} delay={i * 0.1}>
                <li className="relative">
                  <p className="text-display text-primary text-2xl mb-2">
                    {item.step}
                  </p>
                  <p className="text-text-primary font-medium mb-1">
                    {item.title}
                  </p>
                  <p className="text-text-secondary text-sm">{item.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <AcademiaApplication />
    </>
  )
}
