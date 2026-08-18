import { Helmet } from 'react-helmet-async'
import { Compass, FlaskConical, Layers3 } from 'lucide-react'
import { Button } from '../components/Button'
import { tallyFormUrl } from '../data/siteContact'
import { Reveal } from '../components/Reveal'
import { AmbientField } from '../components/AmbientField'
import { FeaturedAlumniSection } from '../components/FeaturedAlumniSection'
import { Hero } from '../components/Hero'

const ejes = [
  {
    icon: Layers3,
    title: 'Metodología SB',
    text: 'Un sistema estandarizado de consultoría y prueba-error validado. Transforma la típica cita de corte en una sesión de asesoría premium mediante escucha activa, PNL y lenguaje corporal, asegurando un resultado 100% predecible para el cliente.',
  },
  {
    icon: FlaskConical,
    title: 'Fundamentos Científicos',
    text: 'Respaldado por más de 50 estudios internacionales (QOVES). Aplicamos la Proporción Áurea, Formas Arquetípicas de Carl Jung, Temperamentos y el análisis de Lateralidad Facial para armonizar el rostro de forma objetiva.',
  },
  {
    icon: Compass,
    title: 'Filosofía y Legado',
    text: 'Empatía e integridad absoluta. Elevamos la barbería a una profesión de alto estatus, logrando que los profesionales salgan de la "jaula de oro" y construyan un negocio con propósito, libertad y autoridad.',
  },
]

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Visagismo SB | Conviértete en Visagista SB Certificado</title>
        <meta
          name="description"
          content="Visagismo SB — metodología basada en ciencia, psicología y neurociencia. Fundamentos, filosofía y comunidad certificada."
        />
      </Helmet>

      <Hero />

      <section
        id="visagismo"
        className="section-pad bg-surface"
        aria-labelledby="visagismo-title"
      >
        <div className="container-grid grid lg:grid-cols-12 gap-14 lg:gap-20 xl:gap-24 items-center">
          <Reveal className="lg:col-span-6 text-left">
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-5">
              Nuestro origen y misión
            </p>
            <h2
              id="visagismo-title"
              className="text-display text-[clamp(2.6rem,6.5vw,4.5rem)] text-text-primary mb-8 md:mb-10 max-w-xl"
            >
              Restaurando un oficio que se volvió industrial.
            </h2>
            <div className="grid gap-6 md:gap-8 max-w-xl">
              <p className="text-text-primary text-lg md:text-xl font-light leading-relaxed">
                El mercado de la barbería tradicional se enfoca únicamente en
                cortar para otros barberos, tratando a las personas como ganado
                y vendiendo tiempo por dinero. Visagismo SB nace de una
                necesidad real: erradicar el miedo que sienten niños, jóvenes y
                adultos a cortarse el pelo por malas experiencias pasadas.
              </p>
              <p className="text-text-secondary text-base md:text-lg font-light leading-relaxed">
                Sáez creó esta metodología en base a prueba, error y
                neurociencia para asegurar que cada cliente tenga el control de
                su imagen. No vendemos cortes de pelo; co-creamos la identidad
                y confianza de cada persona.
              </p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.14}>
            <div className="aspect-[4/5] bg-surface-secondary overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=900&q=80"
                alt="Profesional analizando proporciones faciales antes del diseño"
                className="size-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="ejes"
        className="section-pad bg-background"
        aria-labelledby="ejes-title"
      >
        <div className="container-grid">
          <Reveal className="max-w-2xl mb-16 md:mb-24 text-left">
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-5">
              Los 3 ejes
            </p>
            <h2
              id="ejes-title"
              className="text-display text-[clamp(2.6rem,6.5vw,4.5rem)] text-text-primary mb-6"
            >
              Los 3 ejes del Visagismo SB
            </h2>
            <p className="text-text-secondary text-lg font-light leading-relaxed">
              Metodología, ciencia y filosofía: tres dimensiones que sostienen
              el estándar Visagista SB.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {ejes.map((eje, i) => {
              const Icon = eje.icon
              return (
                <Reveal key={eje.title} delay={i * 0.12} className="h-full">
                  <article className="flex h-full min-h-[280px] flex-col border border-border bg-surface p-8 md:p-10 shadow-soft">
                    <span className="inline-flex size-11 items-center justify-center border border-primary/25 text-primary mb-6">
                      <Icon className="size-5" strokeWidth={1.5} aria-hidden />
                    </span>
                    <h3 className="text-display text-[1.75rem] md:text-3xl text-text-primary mb-4">
                      {eje.title}
                    </h3>
                    <p className="text-text-secondary text-sm md:text-base leading-relaxed flex-1">
                      {eje.text}
                    </p>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <FeaturedAlumniSection />

      <section className="section-pad relative overflow-hidden bg-primary text-on-primary">
        <AmbientField variant="cta" className="absolute inset-0" />
        <div className="relative z-10 container-grid grid md:grid-cols-12 gap-8 items-center">
          <Reveal className="md:col-span-7">
            <h2 className="text-display text-[clamp(2.8rem,7vw,4.5rem)] mb-4">
              Da el siguiente paso
            </h2>
            <p className="text-on-primary/80 text-lg font-light max-w-xl">
              Si buscas formar parte de la metodología SB, conoce el programa,
              los requisitos y el proceso de certificación.
            </p>
          </Reveal>
          <Reveal className="md:col-span-5 md:justify-self-end" delay={0.1}>
            <Button
              href={tallyFormUrl}
              className="!bg-surface !text-primary hover:!bg-surface-secondary"
              ariaLabel="Postular a Academia SB"
            >
              Quiero postular
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  )
}
