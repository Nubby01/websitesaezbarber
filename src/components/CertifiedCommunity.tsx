import { useMemo, useState } from 'react'
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from 'framer-motion'
import { Reveal } from './Reveal'
import { AlumniFicha } from './AlumniFicha'
import { AnimatedCounter } from './AnimatedCounter'
import { SbBadge } from './SbBadge'
import {
  alumni,
  initials,
  type Alumni,
  type Generation,
} from '../data/alumni'

type Filter = 'Todos' | Generation

const filters: { id: Filter; label: string }[] = [
  { id: 'Todos', label: 'Todos' },
  { id: '1.0', label: 'Gen. 1.0' },
  { id: '2.0', label: 'Gen. 2.0' },
]

const PREVIEW_COUNT = 6
const EXPAND_MS = 280

export function CertifiedCommunity() {
  const [filter, setFilter] = useState<Filter>('Todos')
  const [expanded, setExpanded] = useState(false)
  const [expandingId, setExpandingId] = useState<string | null>(null)
  const [selected, setSelected] = useState<Alumni | null>(null)
  const reduceMotion = useReducedMotion()

  const list = useMemo(
    () =>
      filter === 'Todos'
        ? alumni
        : alumni.filter((person) => person.generation === filter),
    [filter],
  )

  const visible = expanded ? list : list.slice(0, PREVIEW_COUNT)
  const canExpand = list.length > PREVIEW_COUNT

  const openFicha = (person: Alumni) => {
    if (reduceMotion) {
      setSelected(person)
      return
    }

    setExpandingId(person.id)
    window.setTimeout(() => {
      setSelected(person)
      setExpandingId(null)
    }, EXPAND_MS)
  }

  return (
    <>
      <section className="pt-32 md:pt-36 pb-16 md:pb-20 bg-background">
        <div className="container-grid">
          <Reveal className="mb-12 md:mb-16">
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-5">
              Comunidad · Metodología SB
            </p>
            <h1 className="text-display text-[clamp(3rem,8vw,5.5rem)] text-text-primary mb-4">
              Visagistas certificados
            </h1>
            <p className="max-w-2xl text-text-secondary text-base md:text-lg font-light leading-relaxed mb-10 md:mb-12">
              Cada profesional representa el estándar de calidad y criterio
              desarrollado por Academia SB. Esta red es la prueba del método.
            </p>

            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end">
              <div className="md:col-span-4">
                <AnimatedCounter
                  value={alumni.length}
                  duration={1400}
                  className="text-display text-[clamp(5rem,16vw,8.5rem)] text-primary leading-none block"
                />
                <p className="mt-3 text-sm tracking-[0.2em] uppercase text-text-primary">
                  Profesionales certificados
                </p>
              </div>
              <p className="md:col-span-7 md:col-start-6 text-text-secondary text-lg font-light leading-relaxed max-w-xl">
                Personas formadas para llevar el Visagismo SB al oficio real.
                Explorá fichas y generaciones de la comunidad certificada.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="comunidad"
        className="section-pad bg-background"
        aria-labelledby="comunidad-title"
      >
        <div className="container-grid">
          <Reveal className="mb-8">
            <h2
              id="comunidad-title"
              className="text-display text-[clamp(2.6rem,6vw,4.2rem)] text-text-primary mb-4"
            >
              Profesionales destacados
            </h2>
            <p className="text-text-secondary max-w-xl font-light">
              Selección de Visagistas SB. Tocá una tarjeta para abrir el perfil
              completo.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <div
              className="inline-flex mb-8 md:mb-10 p-1 bg-surface border border-border"
              role="tablist"
              aria-label="Filtrar generaciones"
            >
              <LayoutGroup id="certified-segment">
                {filters.map((item) => {
                  const active = filter === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => {
                        setFilter(item.id)
                        setExpanded(false)
                      }}
                      className={`relative px-4 sm:px-5 py-2.5 text-sm tracking-wide transition-colors duration-300 ${
                        active
                          ? 'text-on-primary'
                          : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="segment-thumb"
                          className="absolute inset-0 bg-primary"
                          transition={
                            reduceMotion
                              ? { duration: 0 }
                              : {
                                  type: 'spring',
                                  stiffness: 420,
                                  damping: 34,
                                }
                          }
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </button>
                  )
                })}
              </LayoutGroup>
            </div>
          </Reveal>

          <motion.ul
            layout
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((person, i) => {
                const isExpanding = expandingId === person.id

                return (
                  <motion.li
                    key={person.id}
                    layout
                    initial={
                      reduceMotion ? false : { opacity: 0, y: 28, scale: 0.97 }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: isExpanding ? 1.045 : 1,
                      zIndex: isExpanding ? 5 : 1,
                    }}
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, scale: 0.96, y: -10 }
                    }
                    transition={
                      reduceMotion
                        ? { duration: 0.15 }
                        : {
                            layout: {
                              type: 'spring',
                              stiffness: 320,
                              damping: 30,
                            },
                            scale: {
                              type: 'spring',
                              stiffness: 380,
                              damping: 26,
                            },
                            opacity: { duration: 0.35 },
                            y: {
                              type: 'spring',
                              stiffness: 280,
                              damping: 24,
                              delay: Math.min(i * 0.04, 0.28),
                            },
                          }
                    }
                  >
                    <motion.button
                      type="button"
                      onClick={() => openFicha(person)}
                      whileHover={
                        reduceMotion || isExpanding ? undefined : { y: -4 }
                      }
                      className={`group relative w-full text-left overflow-hidden border bg-surface transition-colors duration-300 p-5 md:p-6 shadow-soft ${
                        isExpanding
                          ? 'border-primary/50 bg-primary/5'
                          : 'border-border hover:border-primary/40'
                      }`}
                      aria-label={`Ver perfil de ${person.name}`}
                    >
                      <span className="absolute inset-y-0 left-0 w-0.5 bg-primary scale-y-0 origin-top transition-transform duration-300 group-hover:scale-y-100" />

                      <div className="flex items-start gap-4">
                        <motion.div
                          layoutId={
                            selected?.id === person.id
                              ? undefined
                              : `photo-${person.id}`
                          }
                          className="relative size-20 md:size-24 shrink-0 overflow-hidden ring-1 ring-border"
                          style={{
                            background: person.photoBackdrop ?? '#FFFFFF',
                          }}
                        >
                          {person.photo ? (
                            <img
                              src={person.photo}
                              alt=""
                              className="size-full object-cover"
                              style={{
                                objectPosition:
                                  person.photoPosition ?? 'center 16%',
                                transform: person.photoScale
                                  ? `scale(${person.photoScale})`
                                  : undefined,
                                transformOrigin:
                                  person.photoOrigin ?? 'center center',
                              }}
                              loading="lazy"
                            />
                          ) : (
                            <span className="flex size-full items-center justify-center text-display text-2xl md:text-3xl text-primary leading-none">
                              {initials(person.name)}
                            </span>
                          )}
                        </motion.div>

                        <div className="min-w-0 flex-1">
                          <p className="text-display text-[1.55rem] md:text-[1.75rem] leading-[0.95] text-text-primary truncate group-hover:text-primary transition-colors">
                            {person.name}
                          </p>

                          <div className="mt-2.5">
                            <SbBadge />
                          </div>

                          <p className="mt-3 text-xs text-text-secondary tracking-wide truncate">
                            Gen. {person.generation}
                            {person.city ? ` · ${person.city}` : ''}
                            {person.instagram
                              ? ` · @${person.instagram}`
                              : ''}
                          </p>
                        </div>
                      </div>

                      <p className="mt-5 text-[10px] tracking-[0.2em] uppercase text-text-secondary group-hover:text-primary transition-colors">
                        Ver perfil
                      </p>
                    </motion.button>
                  </motion.li>
                )
              })}
            </AnimatePresence>
          </motion.ul>

          {canExpand && (
            <motion.div
              layout
              className="mt-10 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="px-7 py-3.5 border border-border text-sm tracking-wide text-text-primary hover:border-primary hover:text-primary transition-colors duration-300"
              >
                {expanded ? 'Mostrar menos' : 'Mostrar más'}
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <AlumniFicha
        person={selected}
        people={list}
        onClose={() => setSelected(null)}
        onNavigate={setSelected}
      />
    </>
  )
}
