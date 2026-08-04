import { Helmet } from 'react-helmet-async'
import { Reveal } from '../components/Reveal'
import { Button } from '../components/Button'

const program = [
  {
    title: 'Fundamentos técnicos',
    text: 'Base de corte, ergonomía y ejecución limpia con mirada de identidad.',
  },
  {
    title: 'Visagismo aplicado',
    text: 'Análisis facial, proporciones y diseño de imagen para cada tipo de cliente.',
  },
  {
    title: 'Criterio y marca personal',
    text: 'Cómo comunicar tu valor, posicionarte y sostener un estándar SB.',
  },
]

const requirements = [
  'Interés real por el oficio y la formación continua',
  'Disponibilidad para completar el proceso teórico-práctico',
  'Compromiso con el estándar ético y profesional Academia SB',
  'Postulación completa con datos de contacto vigentes',
]

const benefits = [
  'Metodología clara y aplicable desde el primer día',
  'Certificación Visagista SB con sello de la academia',
  'Pertenencia a una comunidad profesional en expansión',
  'Criterio para construir identidad, no solo cortes',
]

const process = [
  {
    step: '01',
    title: 'Postulación',
    text: 'Completás tu interés y compartís tu perfil profesional.',
  },
  {
    step: '02',
    title: 'Evaluación',
    text: 'Revisamos encaje, motivación y nivel de partida.',
  },
  {
    step: '03',
    title: 'Formación',
    text: 'Cursás el programa con mentoría y práctica guiada.',
  },
  {
    step: '04',
    title: 'Certificación',
    text: 'Obtenés el sello Visagista SB al cumplir el estándar.',
  },
]

export function AcademiaPage() {
  return (
    <>
      <Helmet>
        <title>Academia | Programa y certificación Visagista SB</title>
        <meta
          name="description"
          content="Programa de formación Academia SB: requisitos, proceso de certificación e inscripción."
        />
      </Helmet>

      <section className="pt-32 md:pt-40 pb-16 md:pb-24 bg-background">
        <div className="container-grid max-w-4xl">
          <Reveal>
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4">
              Academia SB
            </p>
            <h1 className="text-display text-[clamp(3rem,9vw,6rem)] text-text-primary mb-6">
              Formar identidad
            </h1>
            <p className="text-text-secondary text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              Un programa para quienes quieren dominar el Visagismo SB y
              ejercer con criterio. SaezBarber es el creador de la metodología;
              la Academia es el espacio donde se transmite y certifica.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        id="programa"
        className="section-pad bg-surface"
        aria-labelledby="programa-title"
      >
        <div className="container-grid">
          <Reveal className="max-w-3xl mb-14">
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4">
              Programa
            </p>
            <h2
              id="programa-title"
              className="text-display text-[clamp(2.6rem,6vw,4.2rem)] text-text-primary mb-5"
            >
              Qué vas a aprender
            </h2>
            <p className="text-text-secondary text-lg font-light leading-relaxed">
              Módulos pensados para construir mirada, técnica y posicionamiento
              profesional bajo el estándar SB.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {program.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <article className="h-full border border-border bg-background p-7 md:p-8 shadow-soft">
                  <h3 className="text-display text-3xl text-text-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {item.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="requisitos"
        className="section-pad bg-background"
        aria-labelledby="requisitos-title"
      >
        <div className="container-grid grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-5">
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4">
              Requisitos
            </p>
            <h2
              id="requisitos-title"
              className="text-display text-[clamp(2.6rem,6vw,4.2rem)] text-text-primary mb-5"
            >
              Para postular
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Buscamos personas comprometidas con el oficio y con la
              responsabilidad de representar el sello Visagista SB.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <ul className="grid gap-4">
              {requirements.map((item, i) => (
                <Reveal key={item} delay={0.08 + i * 0.06} as="li">
                  <div className="flex gap-4 border-b border-border pb-4 text-text-primary">
                    <span className="text-primary shrink-0" aria-hidden>
                      —
                    </span>
                    <span className="text-sm md:text-base leading-relaxed">
                      {item}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section
        id="certificacion"
        className="section-pad bg-surface-secondary"
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

      <section
        id="inscripcion"
        className="section-pad bg-surface"
        aria-labelledby="inscripcion-title"
      >
        <div className="container-grid">
          <Reveal className="max-w-3xl mb-12">
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4">
              Inscripción
            </p>
            <h2
              id="inscripcion-title"
              className="text-display text-[clamp(2.8rem,7vw,4.5rem)] text-text-primary mb-5"
            >
              Empezá tu camino como Visagista SB
            </h2>
            <p className="text-text-secondary text-lg font-light leading-relaxed max-w-xl">
              Contanos quién sos y por qué querés formar parte de la
              metodología. El equipo de Academia SB te orientará en los
              siguientes pasos.
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 mb-12">
            <Reveal className="lg:col-span-7">
              <div className="border border-border bg-background p-7 md:p-10 shadow-soft">
                <p className="text-[10px] tracking-[0.25em] uppercase text-text-secondary mb-5">
                  Beneficios
                </p>
                <ul className="grid gap-4">
                  {benefits.map((item, i) => (
                    <Reveal key={item} delay={0.1 + i * 0.07} as="li">
                      <div className="flex gap-3 text-sm md:text-base text-text-primary">
                        <span className="text-primary mt-1" aria-hidden>
                          ●
                        </span>
                        {item}
                      </div>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-5" delay={0.12}>
              <div className="h-full border border-primary/25 bg-primary/5 p-7 md:p-8 flex flex-col justify-between gap-8">
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-primary mb-3">
                    Metodología
                  </p>
                  <p className="text-display text-3xl text-text-primary mb-3">
                    Desarrollada por SaezBarber
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    La Academia SB transmite, evalúa y certifica el estándar
                    Visagista SB para profesionales que buscan elevar su oficio.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <Button href="https://wa.me/" ariaLabel="Postular por WhatsApp">
                    Postular ahora
                  </Button>
                  <Button
                    to="/visagistas"
                    variant="secondary"
                    ariaLabel="Ver Visagistas certificados"
                  >
                    Ver comunidad
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
