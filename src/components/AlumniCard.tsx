import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import { SbBadge } from './SbBadge'
import {
  generationLabel,
  initials,
  instagramUrl,
  alumniLocationLabel,
  type Alumni,
} from '../data/alumni'

type AlumniCardProps = {
  person: Alumni
  onClick: () => void
  isExpanding?: boolean
  selectedId?: string | null
  reduceMotion?: boolean | null
}

export function AlumniCard({
  person,
  onClick,
  isExpanding = false,
  selectedId,
  reduceMotion = false,
}: AlumniCardProps) {
  const useLayoutPhoto = selectedId !== person.id

  return (
    <article
      className={`group relative w-full overflow-hidden border bg-surface transition-colors duration-300 shadow-soft ${
        isExpanding
          ? 'border-primary/50 bg-primary/5'
          : 'border-border hover:border-primary/40'
      }`}
    >
      <motion.button
        type="button"
        onClick={onClick}
        whileHover={reduceMotion || isExpanding ? undefined : { y: -4 }}
        className="w-full text-left"
        aria-label={`Ver perfil certificado de ${person.name}`}
      >
        <div
          className="aspect-[3/4] overflow-hidden"
          style={{ background: person.photoBackdrop ?? '#FFFFFF' }}
        >
          {useLayoutPhoto ? (
            <motion.div
              layoutId={`photo-${person.id}`}
              className="size-full"
              style={{ background: person.photoBackdrop ?? '#FFFFFF' }}
            >
              {person.photo ? (
                <img
                  src={person.photo}
                  alt=""
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
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
                <span className="flex size-full items-center justify-center text-display text-5xl text-primary/25">
                  {initials(person.name)}
                </span>
              )}
            </motion.div>
          ) : person.photo ? (
            <img
              src={person.photo}
              alt=""
              className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
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
            <span className="flex size-full items-center justify-center text-display text-5xl text-primary/25">
              {initials(person.name)}
            </span>
          )}
        </div>

        <div className="p-4 md:p-5">
          <div className="mb-2.5">
            <SbBadge />
          </div>

          <p className="text-display text-[1.45rem] md:text-[1.6rem] leading-[0.95] text-text-primary group-hover:text-primary transition-colors">
            {person.name}
          </p>

          <dl className="mt-3">
            {(person.city || person.country) && (
              <div>
                <dt className="sr-only">Comuna / Ciudad</dt>
                <dd className="flex items-center gap-1.5 text-[0.9rem] text-text-primary leading-snug">
                  <MapPin
                    className="size-3.5 shrink-0 text-primary"
                    aria-hidden
                  />
                  <span className="truncate">
                    {alumniLocationLabel(person)}
                  </span>
                </dd>
              </div>
            )}

            <div className="mt-3.5">
              <dt className="sr-only">Generación</dt>
              <dd className="text-[10px] tracking-[0.22em] uppercase text-text-secondary">
                {generationLabel(person.generation)}
              </dd>
            </div>

            <div className="mt-1.5">
              <dt className="sr-only">Especialidad</dt>
              <dd className="text-[0.8rem] text-text-secondary font-light leading-relaxed">
                {person.specialty}
              </dd>
            </div>
          </dl>

          <p className="mt-4 pt-3.5 border-t border-border text-[10px] tracking-[0.2em] uppercase text-text-secondary group-hover:text-primary transition-colors">
            Ver perfil certificado
          </p>
        </div>
      </motion.button>

      {person.instagram && (
        <div className="border-t border-border px-4 md:px-5 py-3.5 bg-surface-secondary/50">
          <a
            href={instagramUrl(person.instagram)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-light transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Ver Perfil en Instagram
            <ArrowRight className="size-3.5" aria-hidden />
          </a>
        </div>
      )}
    </article>
  )
}
