import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MapPin,
  X,
} from 'lucide-react'
import {
  AlumniProfileMap,
  AlumniProfileMapExpandButton,
} from './AlumniProfileMap'
import {
  alumniCommercialLabel,
  alumniMapFooterLines,
  alumniProfessionalLocationLabel,
  generationLabel,
  initials,
  instagramUrl,
  type Alumni,
} from '../data/alumni'
import { startLenis, stopLenis } from '../hooks/useLenis'

type AlumniFichaProps = {
  person: Alumni | null
  people: Alumni[]
  onClose: () => void
  onNavigate: (person: Alumni) => void
}

const staggerEase = [0.22, 1, 0.36, 1] as const
const BLOCK_GAP = 'gap-7 md:gap-5'
const INNER_GAP = 'gap-3'

function StaggerItem({
  index,
  reduceMotion,
  className = '',
  children,
}: {
  index: number
  reduceMotion: boolean | null
  className?: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.38,
        delay: reduceMotion ? 0 : 0.08 + index * 0.05,
        ease: staggerEase,
      }}
    >
      {children}
    </motion.div>
  )
}

function ProfilePhoto({
  person,
  reduceMotion,
}: {
  person: Alumni
  reduceMotion: boolean | null
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.42, ease: staggerEase }}
      className="relative size-[11rem] md:size-[9.5rem] shrink-0 border-2 border-primary overflow-hidden shadow-[0_12px_32px_rgba(74,82,56,0.16)]"
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
          <span className="text-display text-4xl text-primary/25 select-none">
            {initials(person.name)}
          </span>
        </div>
      )}
    </motion.div>
  )
}

function CertificationBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 bg-primary text-on-primary px-3.5 py-1.5 text-xs font-medium tracking-wide">
      <Check className="size-3.5 shrink-0" strokeWidth={2.5} aria-hidden />
      Certificación Oficial SB
    </span>
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
      className={`flex items-center justify-center border border-border bg-surface/95 text-text-primary shadow-soft transition-colors hover:text-primary hover:border-primary/40 disabled:opacity-30 disabled:pointer-events-none pointer-events-auto ${className}`}
    >
      <Icon className="size-5 sm:size-6" strokeWidth={1.75} />
    </button>
  )
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] tracking-[0.22em] uppercase text-text-secondary mb-1.5">
        {label}
      </p>
      <div className="text-sm text-text-primary leading-snug">{children}</div>
    </div>
  )
}

function ProfessionalLocationBlock({ person }: { person: Alumni }) {
  const professionalLocation = alumniProfessionalLocationLabel(person)
  const commercialLabel = alumniCommercialLabel(person)

  if (!person.city && !person.region && !person.country && !commercialLabel) {
    return null
  }

  return (
    <InfoRow label="Ubicación Profesional">
      <div className={`flex flex-col ${INNER_GAP}`}>
        {professionalLocation ? (
          <span className="inline-flex items-start gap-1.5 justify-center md:justify-start text-left">
            <MapPin
              className="size-3.5 text-primary shrink-0 mt-0.5"
              aria-hidden
            />
            {professionalLocation}
          </span>
        ) : null}
        {commercialLabel ? (
          <p className="text-text-secondary text-left">
            Barbería:{' '}
            <span className="text-text-primary">{commercialLabel}</span>
          </p>
        ) : null}
      </div>
    </InfoRow>
  )
}

const PRIMARY_ACTION_CLASS =
  'inline-flex h-11 items-center justify-center gap-2 px-5 text-sm font-medium leading-none bg-primary text-on-primary hover:bg-primary-light transition-colors'

function LocationFicha({
  person,
  contextLabel,
  mapFooter,
  showMap,
  reduceMotion,
  staggerIndex,
  onExpand,
}: {
  person: Alumni
  contextLabel: string
  mapFooter: { city: string; regionCountry: string }
  showMap: boolean
  reduceMotion: boolean | null
  staggerIndex: number
  onExpand: () => void
}) {
  const locationText = contextLabel || 'ubicación por confirmar'

  return (
    <StaggerItem
      index={staggerIndex}
      reduceMotion={reduceMotion}
      className="w-full md:flex-1 md:min-h-0 md:flex md:flex-col"
    >
      <div className="border border-border md:border-0 bg-surface-secondary/40 flex flex-col md:flex-1 md:min-h-0 md:h-full">
        <div className="pt-8 px-6 pb-5 shrink-0 flex flex-col gap-3">
          <p className="text-[10px] tracking-[0.25em] uppercase text-text-secondary">
            Ubicación Profesional
          </p>
          <p className="text-sm text-text-secondary font-light leading-relaxed">
            Ejerciendo actualmente en{' '}
            <span className="text-text-primary">{locationText}</span>
          </p>
        </div>

        <div className="relative border-t border-border min-h-[15rem] sm:min-h-[18rem] md:min-h-0 md:flex-1">
          {showMap ? (
            <AlumniProfileMap
              person={person}
              variant="panel"
              className="absolute inset-0 h-full"
            />
          ) : (
            <div className="absolute inset-0 bg-surface-secondary/80 animate-pulse" />
          )}
        </div>

        <div className="relative z-20 px-6 pt-4 pb-5 shrink-0 border-t border-border pointer-events-auto">
          <p className="text-sm text-text-primary font-medium">
            {mapFooter.city}
          </p>
          {mapFooter.regionCountry ? (
            <p className="text-xs text-text-secondary mt-1">
              {mapFooter.regionCountry}
            </p>
          ) : null}
          <div className="mt-3">
            <AlumniProfileMapExpandButton onClick={onExpand} />
          </div>
        </div>
      </div>
    </StaggerItem>
  )
}

function ExpandedMapLayer({
  person,
  contextLabel,
  mapFooter,
  reduceMotion,
  onCollapse,
}: {
  person: Alumni
  contextLabel: string
  mapFooter: { city: string; regionCountry: string }
  reduceMotion: boolean | null
  onCollapse: () => void
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center p-0 sm:p-6 lg:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      role="dialog"
      aria-modal="true"
      aria-label={`Mapa ampliado de ${person.name}`}
    >
      <motion.button
        type="button"
        className="absolute inset-0 bg-text-primary/55 backdrop-blur-lg"
        aria-label="Reducir mapa"
        onClick={onCollapse}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28 }}
      />

      <motion.div
        className="relative z-10 flex flex-col w-full h-[100dvh] sm:h-[min(90svh,780px)] sm:w-[min(96vw,1120px)] bg-surface border-0 sm:border border-border shadow-soft overflow-hidden"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
        transition={
          reduceMotion ? { duration: 0.15 } : { duration: 0.34, ease: staggerEase }
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 flex items-center gap-4 border-b border-border px-5 py-3.5 safe-pt">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] tracking-[0.25em] uppercase text-text-secondary">
              Ubicación Profesional
            </p>
            <p className="text-sm text-text-primary font-medium truncate mt-1">
              {person.name}
              <span className="text-text-secondary font-normal">
                {' · '}
                {contextLabel || mapFooter.city}
              </span>
            </p>
          </div>

          <AlumniProfileMapExpandButton
            expanded
            onClick={onCollapse}
            className="hidden sm:inline-flex shrink-0"
          />

          <button
            type="button"
            onClick={onCollapse}
            className="sm:hidden size-10 shrink-0 flex items-center justify-center border border-border text-text-primary hover:text-primary transition-colors"
            aria-label="Reducir mapa"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 min-h-0">
          <AlumniProfileMap person={person} variant="expanded" />
        </div>
      </motion.div>
    </motion.div>
  )
}

export function AlumniFicha({
  person,
  people,
  onClose,
  onNavigate,
}: AlumniFichaProps) {
  const reduceMotion = useReducedMotion()
  const [mapExpanded, setMapExpanded] = useState(false)
  const [showMap, setShowMap] = useState(false)

  const index = useMemo(() => {
    if (!person) return -1
    return people.findIndex((p) => p.id === person.id)
  }, [person, people])

  const canPrev = index > 0
  const canNext = index >= 0 && index < people.length - 1

  const contextLabel = person ? alumniProfessionalLocationLabel(person) : ''
  const mapFooter = person
    ? alumniMapFooterLines(person)
    : { city: '', regionCountry: '' }

  const goPrev = () => {
    if (!canPrev) return
    onNavigate(people[index - 1])
  }

  const goNext = () => {
    if (!canNext) return
    onNavigate(people[index + 1])
  }

  useEffect(() => {
    setMapExpanded(false)
    setShowMap(false)
    if (!person) return

    const delay = reduceMotion ? 0 : 420
    const t = window.setTimeout(() => setShowMap(true), delay)
    return () => window.clearTimeout(t)
  }, [person?.id, reduceMotion])

  useEffect(() => {
    if (!person) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mapExpanded) setMapExpanded(false)
        else onClose()
      }
      if (mapExpanded) return
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
  }, [person, onClose, onNavigate, index, people, mapExpanded])

  return (
    <AnimatePresence>
      {person && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-stretch md:items-center justify-center p-0 md:p-6 lg:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="ficha-nombre"
        >
          <motion.button
            type="button"
            className="absolute inset-0 z-[1] bg-text-primary/40 backdrop-blur-md"
            aria-label="Cerrar ficha"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32 }}
          />

          {!mapExpanded ? (
            <>
              <NavArrow
                direction="prev"
                disabled={!canPrev}
                onClick={goPrev}
                className="hidden md:flex absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 z-[80] pointer-events-auto size-11 lg:size-12"
              />
              <NavArrow
                direction="next"
                disabled={!canNext}
                onClick={goNext}
                className="hidden md:flex absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 z-[80] pointer-events-auto size-11 lg:size-12"
              />
            </>
          ) : null}

          <motion.article
            key={person.id}
            className="relative z-[10] pointer-events-auto w-full md:max-w-4xl lg:max-w-5xl md:mx-12 lg:mx-16 bg-surface border-0 md:border border-border shadow-soft overflow-hidden flex flex-col h-[100dvh] md:h-[min(88svh,640px)]"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96 }
            }
            transition={
              reduceMotion
                ? { duration: 0.15 }
                : { duration: 0.42, ease: staggerEase }
            }
            onClick={(e) => e.stopPropagation()}
          >
            <div className="md:hidden flex justify-center pt-2 pb-1 shrink-0 safe-pt">
              <span className="h-1 w-10 bg-border" aria-hidden />
            </div>

            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 z-30 size-10 flex items-center justify-center bg-surface/90 text-text-primary hover:text-primary transition-colors border border-border safe-pt"
              aria-label="Cerrar"
            >
              <X className="size-5" />
            </button>

            <div className="flex-1 min-h-0 flex flex-col md:flex-row gap-6 md:gap-0 md:items-stretch overflow-y-auto md:overflow-hidden">
                  <div
                    className={`md:w-[60%] shrink-0 md:min-h-0 md:overflow-y-auto scrollbar-none flex flex-col items-center md:items-start text-center md:text-left px-8 pt-8 pb-8 md:py-8 md:border-r md:border-border ${BLOCK_GAP}`}
                  >
                    <ProfilePhoto person={person} reduceMotion={reduceMotion} />

                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.36,
                        delay: reduceMotion ? 0 : 0.1,
                        ease: staggerEase,
                      }}
                    >
                      <h2
                        id="ficha-nombre"
                        className="text-display text-[clamp(1.65rem,5vw,2.35rem)] text-text-primary leading-[0.95]"
                      >
                        {person.name}
                      </h2>
                    </motion.div>

                    <StaggerItem index={2} reduceMotion={reduceMotion}>
                      <p className="text-[10px] tracking-[0.18em] uppercase text-primary font-medium">
                        Visagista SB Certificado
                      </p>
                    </StaggerItem>

                    <StaggerItem index={3} reduceMotion={reduceMotion}>
                      <CertificationBadge />
                    </StaggerItem>

                    <StaggerItem
                      index={4}
                      reduceMotion={reduceMotion}
                      className={`w-full max-w-sm flex flex-col ${INNER_GAP}`}
                    >
                      <ProfessionalLocationBlock person={person} />
                      <InfoRow label="Generación">
                        {generationLabel(person.generation)}
                      </InfoRow>
                      <InfoRow label="Especialidad">{person.specialty}</InfoRow>
                    </StaggerItem>

                    <div className="w-full max-w-sm shrink-0 mt-10">
                      {person.instagram ? (
                        <a
                          href={instagramUrl(person.instagram)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={PRIMARY_ACTION_CLASS}
                        >
                          <span>Ver Instagram</span>
                          <ExternalLink className="size-4 shrink-0" aria-hidden />
                        </a>
                      ) : (
                        <p className="text-sm text-text-secondary">
                          Perfil social pendiente de publicación
                        </p>
                      )}
                    </div>

                    {people.length > 1 ? (
                      <p className="text-[10px] text-text-secondary/70 tracking-wide hidden md:block md:mt-auto">
                        {index + 1} / {people.length}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-col min-h-0 md:h-full shrink-0 md:w-[40%] px-8 py-8 md:p-0 md:bg-surface-secondary/35 border-t md:border-t-0 md:border-l border-border">
                    <LocationFicha
                      person={person}
                      contextLabel={contextLabel}
                      mapFooter={mapFooter}
                      showMap={showMap}
                      reduceMotion={reduceMotion}
                      staggerIndex={6}
                      onExpand={() => setMapExpanded(true)}
                    />
                  </div>
                </div>

                <div className="md:hidden relative z-20 flex items-center justify-between gap-3 border-t border-border px-3 py-2.5 shrink-0 bg-surface safe-pb pointer-events-auto">
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

          <AnimatePresence>
            {mapExpanded && showMap ? (
              <ExpandedMapLayer
                key={`mapa-amplio-${person.id}`}
                person={person}
                contextLabel={contextLabel}
                mapFooter={mapFooter}
                reduceMotion={reduceMotion}
                onCollapse={() => setMapExpanded(false)}
              />
            ) : null}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
