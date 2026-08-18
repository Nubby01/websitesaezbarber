import { useMemo, useState } from 'react'
import { LocateFixed, MapPin, Search, X } from 'lucide-react'
import { Reveal } from './Reveal'
import { AlumniDirectoryMap } from './AlumniDirectoryMap'
import { SbBadge } from './SbBadge'
import {
  alumni,
  alumniLocationLabel,
  initials,
  type Alumni,
} from '../data/alumni'
import {
  matchesAlumniSearch,
  sortByDistance,
} from '../data/alumniGeo'

type VisagistasDirectoryProps = {
  activeId?: string | null
  onSelect: (person: Alumni) => void
}

export function VisagistasDirectory({
  activeId,
  onSelect,
}: VisagistasDirectoryProps) {
  const [query, setQuery] = useState('')
  const [expandedCityKey, setExpandedCityKey] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState<{
    lat: number
    lng: number
  } | null>(null)
  const [geoStatus, setGeoStatus] = useState<
    'idle' | 'loading' | 'denied' | 'error'
  >('idle')

  const located = useMemo(
    () =>
      alumni.filter(
        (p) => typeof p.lat === 'number' && typeof p.lng === 'number',
      ),
    [],
  )

  const filtered = useMemo(
    () => located.filter((person) => matchesAlumniSearch(person, query)),
    [located, query],
  )

  const results = useMemo(() => {
    if (userLocation) {
      return sortByDistance(filtered, userLocation).map((item) => item.person)
    }
    return filtered
  }, [filtered, userLocation])

  const distanceById = useMemo(() => {
    if (!userLocation) return new Map<string, number>()
    return new Map(
      sortByDistance(filtered, userLocation).map((item) => [
        item.person.id,
        item.km,
      ]),
    )
  }, [filtered, userLocation])

  const handleSelect = (person: Alumni) => {
    if (person.city && person.country) {
      setExpandedCityKey(
        `${person.country.trim().toLowerCase()}|${person.city.trim().toLowerCase()}`,
      )
    }
    onSelect(person)
  }

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus('error')
      return
    }

    setGeoStatus('loading')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setGeoStatus('idle')
        setExpandedCityKey(null)
      },
      () => setGeoStatus('denied'),
      { enableHighAccuracy: false, timeout: 12000, maximumAge: 300000 },
    )
  }

  return (
    <section
      id="directorio"
      className="section-pad pt-0 md:pt-0 bg-surface-secondary/40 border-y border-border"
      aria-labelledby="directorio-title"
    >
      <div className="container-grid">
        <Reveal className="mb-8 md:mb-10 max-w-3xl">
          <h2 id="directorio-title" className="sr-only">
            Mapa interactivo de Visagistas SB
          </h2>
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">
            Mapa interactivo
          </p>
          <p className="text-text-secondary text-sm md:text-base font-light leading-relaxed">
            Marcadores por ciudad. Selecciona un grupo o un perfil para ver más
            detalle.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <Reveal className="lg:col-span-4 xl:col-span-3">
            <div className="border border-border bg-surface p-4 md:p-5 shadow-soft">
              <label htmlFor="directorio-search" className="sr-only">
                Buscar Visagista SB o ciudad
              </label>
              <div className="relative mb-3">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary"
                  aria-hidden
                />
                <input
                  id="directorio-search"
                  type="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setExpandedCityKey(null)
                  }}
                  placeholder="Nombre, ciudad o país"
                  className="w-full border border-border bg-background py-3 pl-10 pr-10 text-sm text-text-primary placeholder:text-text-secondary/70 focus:outline-none focus:border-primary/50"
                />
                {query && (
                  <button
                    type="button"
                    aria-label="Limpiar búsqueda"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-text-secondary hover:text-primary"
                    onClick={() => setQuery('')}
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={requestLocation}
                disabled={geoStatus === 'loading'}
                className="w-full inline-flex items-center justify-center gap-2 border border-border px-4 py-3 text-sm text-text-primary hover:border-primary hover:text-primary transition-colors disabled:opacity-60"
              >
                <LocateFixed className="size-4" aria-hidden />
                {geoStatus === 'loading'
                  ? 'Obteniendo ubicación…'
                  : 'Cerca de mí'}
              </button>

              {geoStatus === 'denied' && (
                <p className="mt-3 text-xs text-text-secondary leading-relaxed">
                  No pudimos acceder a tu ubicación. Activa el permiso en el
                  navegador o busca por ciudad.
                </p>
              )}

              <p className="mt-4 mb-3 text-[10px] tracking-[0.2em] uppercase text-text-secondary">
                {results.length} resultado{results.length === 1 ? '' : 's'}
              </p>

              <ul className="max-h-[280px] md:max-h-[420px] overflow-y-auto scrollbar-none divide-y divide-border">
                {results.map((person) => {
                  const active = activeId === person.id
                  const distance = distanceById.get(person.id)

                  return (
                    <li key={person.id}>
                      <button
                        type="button"
                        onClick={() => handleSelect(person)}
                        className={`w-full text-left py-3.5 px-1 flex items-start gap-3 transition-colors ${
                          active
                            ? 'text-primary'
                            : 'text-text-primary hover:text-primary'
                        }`}
                      >
                        <div
                          className="size-11 shrink-0 overflow-hidden ring-1 ring-border"
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
                            <span className="flex size-full items-center justify-center text-display text-sm text-primary/30">
                              {initials(person.name)}
                            </span>
                          )}
                        </div>

                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium truncate">
                            {person.name}
                          </span>
                          <span className="mt-1 block">
                            <SbBadge />
                          </span>
                          {(person.city || person.country) && (
                            <span className="mt-1.5 flex items-center gap-1 text-xs text-text-secondary truncate">
                              <MapPin className="size-3 shrink-0" aria-hidden />
                              {alumniLocationLabel(person)}
                            </span>
                          )}
                          {distance != null && (
                            <span className="mt-1 block text-[10px] tracking-wide uppercase text-primary">
                              ~{distance < 1 ? '<1' : Math.round(distance)} km
                            </span>
                          )}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>

              {results.length === 0 && (
                <p className="py-6 text-sm text-text-secondary text-center">
                  No hay resultados para esa búsqueda.
                </p>
              )}
            </div>
          </Reveal>

          <Reveal className="lg:col-span-8 xl:col-span-9" delay={0.06}>
            <AlumniDirectoryMap
              people={filtered}
              activeId={activeId}
              expandedCityKey={expandedCityKey}
              onSelect={handleSelect}
              onExpandCity={setExpandedCityKey}
            />
            <p className="mt-3 text-xs text-text-secondary">
              Las ciudades con varios egresados se agrupan en un solo marcador.
              Selecciona el grupo para ver perfiles individuales.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
