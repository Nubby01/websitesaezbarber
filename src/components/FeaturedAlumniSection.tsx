import { useMemo, useState } from 'react'
import { MapPin } from 'lucide-react'
import { Reveal } from './Reveal'
import { AlumniFicha } from './AlumniFicha'
import { AnimatedCounter } from './AnimatedCounter'
import { AmbientField } from './AmbientField'
import { Button } from './Button'
import { SbBadge } from './SbBadge'
import {
  alumni,
  alumniLocationLabel,
  featuredAlumni,
  initials,
  type Alumni,
} from '../data/alumni'

function FeaturedCard({
  person,
  onClick,
}: {
  person: Alumni
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Ver perfil certificado de ${person.name}`}
      className="group block w-full text-left border border-border bg-surface overflow-hidden shadow-soft transition-colors hover:border-primary/40"
    >
      <div
        className="aspect-[3/4] overflow-hidden"
        style={{ background: person.photoBackdrop ?? '#FFFFFF' }}
      >
        {person.photo ? (
          <img
            src={person.photo}
            alt=""
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            style={{
              objectPosition: person.photoPosition ?? 'center 16%',
              transform: person.photoScale
                ? `scale(${person.photoScale})`
                : undefined,
              transformOrigin: person.photoOrigin ?? 'center center',
            }}
            loading="lazy"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-surface-secondary">
            <span className="text-display text-4xl text-primary/25">
              {initials(person.name)}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-display text-xl leading-none text-text-primary truncate group-hover:text-primary transition-colors">
          {person.name}
        </p>
        <div className="mt-2">
          <SbBadge />
        </div>
        {(person.city || person.country) && (
          <p className="mt-2.5 flex items-center gap-1 text-xs text-text-secondary truncate">
            <MapPin className="size-3 shrink-0 text-primary" aria-hidden />
            {alumniLocationLabel(person)}
          </p>
        )}
        <p className="mt-3 pt-3 border-t border-border text-[10px] tracking-[0.2em] uppercase text-text-secondary group-hover:text-primary transition-colors">
          Ver perfil certificado
        </p>
      </div>
    </button>
  )
}

export function FeaturedAlumniSection() {
  const highlighted = useMemo(() => featuredAlumni(), [])
  const [selected, setSelected] = useState<Alumni | null>(null)

  return (
    <>
      <section
        id="egresados"
        className="section-pad relative overflow-hidden dark-section-comunidad"
        aria-labelledby="egresados-title"
      >
        <AmbientField
          variant="counter"
          className="absolute inset-0 opacity-80"
        />

        <div className="relative z-10 container-grid">
          <Reveal className="max-w-3xl mb-12 md:mb-16 text-left">
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-5">
              Visibilidad de egresados
            </p>
            <h2
              id="egresados-title"
              className="text-display text-[clamp(2.8rem,7vw,5rem)] leading-[0.92] mb-6"
            >
              Una nueva generación de profesionales liderando el mercado
            </h2>
            <p className="comunidad-muted text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              Encuentra a los Visagistas SB Certificados que están transformando
              la atención al cliente y elevando los estándares de la industria
              en cada ciudad.
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-12 md:mb-16">
            <Reveal className="lg:col-span-4 xl:col-span-3">
              <div className="border border-border bg-surface/80 backdrop-blur-sm p-8 md:p-10">
                <AnimatedCounter
                  value={alumni.length}
                  duration={1600}
                  className="text-display text-[clamp(4rem,14vw,7rem)] text-primary leading-none block"
                />
                <p className="mt-4 text-sm tracking-[0.2em] uppercase text-text-primary">
                  Profesionales certificados
                </p>
                <p className="mt-4 text-sm comunidad-muted leading-relaxed">
                  Una red en crecimiento que valida la metodología SB en el
                  oficio diario.
                </p>
              </div>
            </Reveal>

            <div className="lg:col-span-8 xl:col-span-9 grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5">
              {highlighted.map((person, i) => (
                <Reveal key={person.id} delay={i * 0.08}>
                  <FeaturedCard
                    person={person}
                    onClick={() => setSelected(person)}
                  />
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
            <Button
              to="/visagistas#directorio"
              ariaLabel="Ir al mapa de Visagistas SB certificados"
            >
              Ir a Mapa de Visagistas SB Certificados
            </Button>
            <p className="comunidad-muted text-sm max-w-md">
              Explora perfiles, generaciones y ubicación de toda la comunidad
              certificada.
            </p>
          </Reveal>
        </div>
      </section>

      <AlumniFicha
        person={selected}
        people={highlighted}
        onClose={() => setSelected(null)}
        onNavigate={setSelected}
      />
    </>
  )
}
