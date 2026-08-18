import { useMemo, useState } from 'react'
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from 'framer-motion'
import { Reveal } from './Reveal'
import { AuroraHero } from './AuroraHero'
import { AlumniFicha } from './AlumniFicha'
import { AlumniCard } from './AlumniCard'
import { VisagistasDirectory } from './VisagistasDirectory'
import {
  alumni,
  generationLabel,
  type Alumni,
  type Generation,
} from '../data/alumni'

type Filter = 'Todos' | Generation

const filters: { id: Filter; label: string }[] = [
  { id: 'Todos', label: 'Todos' },
  { id: '1.0', label: generationLabel('1.0') },
  { id: '2.0', label: generationLabel('2.0') },
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

  const fichaPeople = useMemo(() => {
    if (!selected) return list
    if (list.some((person) => person.id === selected.id)) return list
    return alumni
  }, [list, selected])

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
      <AuroraHero
        className="min-h-[min(72svh,680px)]"
        contentClassName="pt-32 md:pt-36 pb-16 md:pb-20"
        innerClassName="max-w-4xl"
        ariaLabelledBy="visagistas-hero-title"
      >
        <motion.p
          className="text-primary text-xs tracking-[0.3em] uppercase"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Visagistas SB Certificados
        </motion.p>

        <motion.h1
          id="visagistas-hero-title"
          className="text-display text-[clamp(2.6rem,9vw,5.6rem)] text-text-primary leading-[0.92]"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.85,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Directorio y Mapa Oficial de Visagistas SB
        </motion.h1>

        <motion.p
          className="max-w-2xl text-text-secondary text-lg md:text-xl font-light leading-relaxed"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.28,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Ubica geográficamente al profesional certificado más cercano a ti.
          Garantiza una experiencia de asesoría de imagen basada en ciencia,
          respeto y empatía.
        </motion.p>
      </AuroraHero>

      <VisagistasDirectory
        activeId={selected?.id ?? expandingId}
        onSelect={openFicha}
      />

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
              Profesionales certificados
            </h2>
            <p className="text-text-secondary max-w-xl font-light">
              Selecciona una tarjeta para ver el perfil completo o visita su
              Instagram directamente.
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
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5"
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
                      scale: isExpanding ? 1.03 : 1,
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
                    <AlumniCard
                      person={person}
                      onClick={() => openFicha(person)}
                      isExpanding={isExpanding}
                      selectedId={selected?.id ?? null}
                      reduceMotion={reduceMotion}
                    />
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
        people={fichaPeople}
        onClose={() => setSelected(null)}
        onNavigate={setSelected}
      />
    </>
  )
}
