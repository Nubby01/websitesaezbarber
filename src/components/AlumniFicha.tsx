import { useEffect, useMemo } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Award,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MapPin,
  X,
} from 'lucide-react'
import { SbBadge } from './SbBadge'
import { AlumniMap } from './AlumniMap'
import { initials, instagramUrl, type Alumni } from '../data/alumni'
import { startLenis, stopLenis } from '../hooks/useLenis'

type AlumniFichaProps = {
  person: Alumni | null
  people: Alumni[]
  onClose: () => void
  onNavigate: (person: Alumni) => void
}

function PhotoBlock({ person }: { person: Alumni }) {
  return (
    <motion.div
      layoutId={`photo-${person.id}`}
      className="relative overflow-hidden shrink-0 size-20 xs:size-[7.5rem] sm:size-[9.5rem] lg:size-[11rem]"
      style={{ background: person.photoBackdrop ?? '#FFFFFF' }}
    >
      {person.photo ? (
        <img
          src={person.photo}
          alt={`Foto profesional de ${person.name}`}
          className="size-full object-cover"
          style={{
            objectPosition: person.photoPosition ?? 'center 16%',
            transform: person.photoScale
              ? `scale(${person.photoScale})`
              : undefined,
            transformOrigin: person.photoOrigin ?? 'center center',
          }}
        />
      ) : (
        <div className="flex size-full items-center justify-center bg-gradient-to-br from-white via-surface to-primary/15">
          <span className="text-display text-3xl sm:text-4xl text-primary/25 select-none">
            {initials(person.name)}
          </span>
        </div>
      )}
    </motion.div>
  )
}

function NavArrow({
  direction,
  disabled,
  onClick,
  className = '',
}: {
  direction: 'prev' | 'next'
  disabled: boolean
  onClick: () => void
  className?: string
}) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      disabled={disabled}
      aria-label={direction === 'prev' ? 'Perfil anterior' : 'Perfil siguiente'}
      className={`flex items-center justify-center border border-border bg-surface/95 text-text-primary shadow-soft transition-colors hover:text-primary hover:border-primary/40 disabled:opacity-30 disabled:pointer-events-none ${className}`}
    >
      <Icon className="size-5 sm:size-6" strokeWidth={1.75} />
    </button>
  )
}

export function AlumniFicha({
  person,
  people,
  onClose,
  onNavigate,
}: AlumniFichaProps) {
  const reduceMotion = useReducedMotion()
  const hasLocation =
    !!person &&
    typeof person.lat === 'number' &&
    typeof person.lng === 'number'

  const index = useMemo(() => {
    if (!person) return -1
    return people.findIndex((p) => p.id === person.id)
  }, [person, people])

  const canPrev = index > 0
  const canNext = index >= 0 && index < people.length - 1

  const goPrev = () => {
    if (!canPrev) return
    onNavigate(people[index - 1])
  }

  const goNext = () => {
    if (!canNext) return
    onNavigate(people[index + 1])
  }

  useEffect(() => {
    if (!person) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        if (index > 0) onNavigate(people[index - 1])
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        if (index >= 0 && index < people.length - 1)
          onNavigate(people[index + 1])
      }
    }

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    stopLenis()
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = prev
      startLenis()
      window.removeEventListener('keydown', onKey)
    }
  }, [person, onClose, onNavigate, index, people])

  return (
    <AnimatePresence>
      {person && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end md:items-center justify-center p-0 md:p-6 lg:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: reduceMotion ? 0 : 0.05 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="ficha-nombre"
          onWheel={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="absolute inset-0 bg-text-primary/35 backdrop-blur-md"
            aria-label="Cerrar ficha"
            onClick={onClose}
          />

          {/* Flechas laterales: solo tablet/desktop */}
          <NavArrow
            direction="prev"
            disabled={!canPrev}
            onClick={goPrev}
            className="hidden md:flex absolute left-3 lg:left-5 top-1/2 -translate-y-1/2 z-30 size-11 lg:size-12"
          />
          <NavArrow
            direction="next"
            disabled={!canNext}
            onClick={goNext}
            className="hidden md:flex absolute right-3 lg:right-5 top-1/2 -translate-y-1/2 z-30 size-11 lg:size-12"
          />

          <motion.article
            key={person.id}
            className="relative z-10 w-full md:max-w-5xl md:mx-14 lg:mx-16 bg-surface border border-border shadow-soft overflow-hidden flex flex-col h-[min(94svh,900px)] md:h-auto md:max-h-[min(88svh,680px)] rounded-t-2xl md:rounded-none"
            initial={
              reduceMotion ? false : { y: 40, opacity: 0, scale: 0.98 }
            }
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { y: 24, opacity: 0, scale: 0.98 }
            }
            transition={
              reduceMotion
                ? { duration: 0.15 }
                : { type: 'spring', stiffness: 300, damping: 28, delay: 0.08 }
            }
            style={{ overscrollBehavior: 'contain' }}
          >
            <div className="md:hidden flex justify-center pt-2.5 pb-1 shrink-0">
              <span className="h-1 w-10 rounded-full bg-border" aria-hidden />
            </div>

            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 z-30 size-10 flex items-center justify-center bg-surface/90 text-text-primary hover:text-primary transition-colors border border-border"
              aria-label="Cerrar"
            >
              <X className="size-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 min-h-0 flex-1 overflow-y-auto md:overflow-hidden overscroll-contain">
              <div className="md:col-span-7 flex flex-col min-h-0 p-4 sm:p-6 md:p-8 gap-4 sm:gap-5 md:gap-6">
                <div className="flex items-start gap-3 sm:gap-5 min-w-0">
                  <PhotoBlock person={person} />
                  <div className="min-w-0 flex-1 pt-0.5 pr-8">
                    <SbBadge className="mb-2" />
                    <h3
                      id="ficha-nombre"
                      className="text-display text-[clamp(1.6rem,7vw,2.75rem)] text-text-primary leading-[0.95]"
                    >
                      {person.name}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-text-secondary tracking-wide">
                      Gen. {person.generation} · {person.year}
                      {people.length > 1 ? (
                        <span className="text-text-secondary/70">
                          {' '}
                          · {index + 1}/{people.length}
                        </span>
                      ) : null}
                    </p>
                  </div>
                </div>

                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 sm:gap-y-4 shrink-0">
                  <div>
                    <dt className="text-[10px] tracking-[0.25em] uppercase text-text-secondary mb-1">
                      Especialidad
                    </dt>
                    <dd className="text-text-primary text-sm">
                      {person.specialty}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] tracking-[0.25em] uppercase text-text-secondary mb-1">
                      Ubicación
                    </dt>
                    <dd className="text-text-primary text-sm flex items-center gap-1.5">
                      {person.city || person.country ? (
                        <>
                          <MapPin
                            className="size-3.5 text-primary shrink-0"
                            aria-hidden
                          />
                          <span className="truncate">
                            {[person.city, person.country]
                              .filter(Boolean)
                              .join(', ')}
                          </span>
                        </>
                      ) : (
                        <span className="text-text-secondary">
                          Por confirmar
                        </span>
                      )}
                    </dd>
                  </div>
                  {person.instagram && (
                    <div className="col-span-2">
                      <dt className="text-[10px] tracking-[0.25em] uppercase text-text-secondary mb-1">
                        Instagram
                      </dt>
                      <dd className="text-primary text-sm">
                        @{person.instagram}
                      </dd>
                    </div>
                  )}
                </dl>

                <div className="flex items-start gap-3 border border-primary/25 bg-primary/10 p-3 sm:p-4 shrink-0">
                  <Award
                    className="size-5 text-primary shrink-0 mt-0.5"
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <p className="text-text-primary text-sm font-medium">
                      Certificado {person.certificate}
                    </p>
                    <p className="text-text-secondary text-xs mt-1 leading-relaxed">
                      Estándar de calidad Academia SB · Gen.{' '}
                      {person.generation} · {person.year}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 pt-1 md:mt-auto">
                  {person.instagram ? (
                    <a
                      href={instagramUrl(person.instagram)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-primary text-on-primary text-sm font-medium tracking-wide hover:bg-primary-light transition-colors"
                    >
                      Ir a Instagram
                      <ExternalLink className="size-4" aria-hidden />
                    </a>
                  ) : (
                    <p className="text-center text-sm text-text-secondary py-2">
                      Perfil social pendiente de publicación
                    </p>
                  )}
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col min-h-[200px] sm:min-h-[240px] md:min-h-0 border-t md:border-t-0 md:border-l border-border bg-surface-secondary">
                <div className="px-4 pt-3 pb-2 md:px-5 md:pt-4 shrink-0">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-text-secondary">
                    Localidad
                  </p>
                  {(person.city || person.country) && (
                    <p className="mt-1 text-sm text-text-primary truncate">
                      {[person.city, person.country]
                        .filter(Boolean)
                        .join(', ')}
                    </p>
                  )}
                </div>
                <div className="flex-1 min-h-[180px] h-[200px] sm:h-[240px] md:h-auto md:min-h-0">
                  {hasLocation ? (
                    <AlumniMap
                      people={[person]}
                      activeId={person.id}
                      compact
                      zoomable
                      className="!border-0 !h-full rounded-none"
                    />
                  ) : (
                    <div className="h-full min-h-[180px] flex items-center justify-center text-text-secondary text-sm px-6 text-center">
                      Ubicación por confirmar
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Navegación inferior en móvil */}
            <div className="md:hidden flex items-center justify-between gap-3 border-t border-border px-3 py-2.5 shrink-0 bg-surface safe-pb">
              <NavArrow
                direction="prev"
                disabled={!canPrev}
                onClick={goPrev}
                className="size-11"
              />
              <p className="text-xs text-text-secondary tracking-wide tabular-nums">
                {index + 1} / {people.length}
              </p>
              <NavArrow
                direction="next"
                disabled={!canNext}
                onClick={goNext}
                className="size-11"
              />
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
