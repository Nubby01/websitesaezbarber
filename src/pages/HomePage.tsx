import { Helmet } from 'react-helmet-async'
import { Button } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { AnimatedCounter } from '../components/AnimatedCounter'
import { AmbientField } from '../components/AmbientField'
import { Hero } from '../components/Hero'
import { alumni } from '../data/alumni'

const fundamentals = [
  {
    n: '01',
    title: 'Análisis facial',
    text: 'Leemos proporciones, líneas y rasgos para entender qué armoniza con cada persona.',
  },
  {
    n: '02',
    title: 'Diseño de identidad',
    text: 'El estilo se construye como extensión de la personalidad, no como moda pasajera.',
  },
  {
    n: '03',
    title: 'Criterio profesional',
    text: 'Formamos decisión, no repetición: cada Visagista SB aprende a justificar su diseño.',
  },
]

const philosophy = [
  {
    title: 'Método, no tendencia',
    text: 'El Visagismo SB prioriza estructura y coherencia por sobre lo viral.',
  },
  {
    title: 'Identidad primero',
    text: 'Cada transformación busca que la persona se reconozca con más fuerza.',
  },
  {
    title: 'Estándar verificable',
    text: 'La certificación acredita un criterio compartido y un nivel exigente.',
  },
]

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Academia SB | Conviértete en Visagista SB Certificado</title>
        <meta
          name="description"
          content="Academia SB — metodología de visagismo desarrollada por SaezBarber. Fundamentos, filosofía y comunidad certificada."
        />
      </Helmet>

      <Hero />

      <section
        id="visagismo"
        className="section-pad bg-surface"
        aria-labelledby="visagismo-title"
      >
        <div className="container-grid grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <Reveal className="lg:col-span-5">
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4">
              Visagismo SB
            </p>
            <h2
              id="visagismo-title"
              className="text-display text-[clamp(2.8rem,7vw,4.8rem)] text-text-primary mb-6"
            >
              Qué es el método
            </h2>
            <div className="aspect-[4/5] bg-surface-secondary overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=900&q=80"
                alt="Profesional aplicando técnica de barbería con precisión"
                className="size-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.12}>
            <p className="text-text-primary text-xl md:text-2xl font-light leading-relaxed mb-6">
              El Visagismo SB es una metodología para diseñar imagen a partir
              del rostro, la personalidad y el contexto de cada persona.
            </p>
            <p className="text-text-secondary leading-relaxed max-w-2xl mb-8">
              No se trata de repetir referencias. Se trata de observar,
              decidir y crear un resultado coherente: una identidad que se
              sostiene en el tiempo. La Academia SB transmite este sistema y lo
              multiplica a través de profesionales certificados.
            </p>
            <Button to="/visagistas" variant="secondary">
              Ver comunidad
            </Button>
          </Reveal>
        </div>
      </section>

      <section
        id="fundamentos"
        className="section-pad bg-surface"
        aria-labelledby="fundamentos-title"
      >
        <div className="container-grid">
          <Reveal className="max-w-3xl mb-14 md:mb-20">
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4">
              Fundamentos
            </p>
            <h2
              id="fundamentos-title"
              className="text-display text-[clamp(2.8rem,7vw,4.8rem)] text-text-primary mb-5"
            >
              Tres pilares del criterio SB
            </h2>
            <p className="text-text-secondary text-lg font-light leading-relaxed max-w-2xl">
              Una base clara, breve y aplicable: lo que todo Visagista SB
              practica en cada servicio.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-10 md:gap-12">
            {fundamentals.map((item, i) => (
              <Reveal key={item.n} delay={i * 0.1}>
                <article className="border-t border-primary/35 pt-6">
                  <span className="text-display text-primary text-2xl">
                    {item.n}
                  </span>
                  <h3 className="text-display text-3xl text-text-primary mt-4 mb-3">
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
        id="filosofia"
        className="section-pad bg-surface relative overflow-hidden"
        aria-labelledby="filosofia-title"
      >
        <AmbientField variant="corner" className="absolute inset-0" />
        <div className="relative z-10 container-grid">
          <Reveal className="max-w-3xl mb-14">
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4">
              Filosofía
            </p>
            <h2
              id="filosofia-title"
              className="text-display text-[clamp(2.8rem,7vw,4.8rem)] text-text-primary mb-5"
            >
              Cómo pensamos el oficio
            </h2>
            <p className="text-text-secondary text-lg font-light leading-relaxed">
              La Academia SB no forma ejecutores de tendencias: forma
              profesionales con mirada propia y estándar compartido.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-px bg-border">
            {philosophy.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <article className="bg-surface h-full p-8 md:p-10">
                  <h3 className="text-display text-3xl text-text-primary mb-4">
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
        className="section-pad relative overflow-hidden dark-section-comunidad"
        aria-labelledby="comunidad-teaser"
      >
        <div className="relative z-10 container-grid grid md:grid-cols-12 gap-10 items-end">
          <Reveal className="md:col-span-5 relative">
            <AmbientField
              variant="counter"
              className="absolute -inset-8 md:-inset-12"
            />
            <div className="relative z-10">
              <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4">
                Prueba del método
              </p>
              <AnimatedCounter
                value={alumni.length}
                duration={1400}
                className="text-display text-[clamp(5rem,16vw,8.5rem)] text-primary leading-none block"
              />
              <p
                id="comunidad-teaser"
                className="mt-3 text-sm tracking-[0.2em] uppercase"
              >
                Profesionales certificados
              </p>
            </div>
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-7" delay={0.1}>
            <p className="comunidad-muted text-lg font-light leading-relaxed mb-8 max-w-xl">
              Cada profesional certificado representa el estándar de calidad y
              criterio desarrollado por Academia SB. La comunidad es la prueba
              viva del método.
            </p>
            <Button to="/visagistas" ariaLabel="Explorar Visagistas SB">
              Explorar Visagistas
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="section-pad relative overflow-hidden bg-primary text-on-primary">
        <AmbientField variant="cta" className="absolute inset-0" />
        <div className="relative z-10 container-grid grid md:grid-cols-12 gap-8 items-center">
          <Reveal className="md:col-span-7">
            <h2 className="text-display text-[clamp(2.8rem,7vw,4.5rem)] mb-4">
              Da el siguiente paso
            </h2>
            <p className="text-on-primary/80 text-lg font-light max-w-xl">
              Si buscás formar parte de la metodología SB, conocé el programa,
              los requisitos y el proceso de certificación.
            </p>
          </Reveal>
          <Reveal className="md:col-span-5 md:justify-self-end" delay={0.1}>
            <Button
              to="/academia#inscripcion"
              className="!bg-surface !text-primary hover:!bg-surface-secondary"
              ariaLabel="Ir a postulación"
            >
              Quiero postular
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  )
}
