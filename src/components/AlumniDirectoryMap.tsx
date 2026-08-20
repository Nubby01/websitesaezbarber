import { useEffect, useMemo } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet'
import L from 'leaflet'
import type { Alumni } from '../data/alumni'
import { generationLabel } from '../data/alumni'
import { groupAlumniByCity, type CityGroup } from '../data/alumniGeo'
import { useTheme } from '../hooks/useTheme'
import {
  sbCityClusterIcon,
  sbMapTileUrl,
  sbPersonMarkerIcon,
} from '../lib/sbMap'
import { MapZoomControls } from './MapZoomControls'
import { MapSizeSync } from './MapSizeSync'

type AlumniDirectoryMapProps = {
  people: Alumni[]
  activeId?: string | null
  expandedCityKey?: string | null
  onSelect: (person: Alumni) => void
  onExpandCity: (key: string | null) => void
  className?: string
}

function MapViewController({
  people,
  activePerson,
  expandedCityKey,
  cityGroups,
}: {
  people: Alumni[]
  activePerson: Alumni | null
  expandedCityKey: string | null
  cityGroups: CityGroup[]
}) {
  const map = useMap()

  useEffect(() => {
    if (activePerson?.lat != null && activePerson.lng != null) {
      map.flyTo([activePerson.lat, activePerson.lng], 12, { duration: 0.75 })
      return
    }

    if (expandedCityKey) {
      const group = cityGroups.find((item) => item.key === expandedCityKey)
      if (!group) return

      if (group.people.length === 1) {
        map.flyTo([group.lat, group.lng], 11, { duration: 0.65 })
        return
      }

      const bounds = L.latLngBounds(
        group.people.map((p) => [p.lat!, p.lng!] as [number, number]),
      )
      map.flyToBounds(bounds, { padding: [72, 72], maxZoom: 11, duration: 0.75 })
      return
    }

    const points = people.filter(
      (p) => typeof p.lat === 'number' && typeof p.lng === 'number',
    )
    if (points.length === 0) return

    if (points.length === 1) {
      map.setView([points[0].lat!, points[0].lng!], 5)
      return
    }

    const bounds = L.latLngBounds(
      points.map((p) => [p.lat!, p.lng!] as [number, number]),
    )
    map.fitBounds(bounds, { padding: [56, 56], maxZoom: 6 })
  }, [map, people, activePerson, expandedCityKey, cityGroups])

  return null
}

export function AlumniDirectoryMap({
  people,
  activeId,
  expandedCityKey = null,
  onSelect,
  onExpandCity,
  className = '',
}: AlumniDirectoryMapProps) {
  const { theme } = useTheme()

  const located = useMemo(
    () =>
      people.filter(
        (p) => typeof p.lat === 'number' && typeof p.lng === 'number',
      ),
    [people],
  )

  const cityGroups = useMemo(() => groupAlumniByCity(located), [located])

  const activePerson = useMemo(
    () => located.find((person) => person.id === activeId) ?? null,
    [located, activeId],
  )

  const mapTheme = theme === 'dark' ? 'dark' : 'light'
  const tileUrl = sbMapTileUrl(mapTheme)

  if (located.length === 0) {
    return (
      <div
        className={`sb-map-card sb-map-card--directory flex h-[min(58svh,420px)] md:h-[560px] items-center justify-center text-text-secondary text-sm ${className}`}
      >
        Ubicaciones en actualización
      </div>
    )
  }

  const center: [number, number] =
    located.length === 1
      ? [located[0].lat!, located[0].lng!]
      : [-20, -70]

  return (
    <div
      data-lenis-prevent
      className={`sb-map-card sb-map-card--directory sb-directory-map relative h-[min(58svh,420px)] md:h-[560px] ${className}`}
    >
      <MapContainer
        key={`directory-${mapTheme}-${located.length}`}
        center={center}
        zoom={3}
        scrollWheelZoom
        className="size-full"
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer attribution="" url={tileUrl} />
        <MapSizeSync deps={[located.length, activeId, expandedCityKey]} />
        <MapViewController
          people={located}
          activePerson={activePerson}
          expandedCityKey={expandedCityKey}
          cityGroups={cityGroups}
        />
        <MapZoomControls />

        {cityGroups.map((group) => {
          const isExpanded = expandedCityKey === group.key
          const containsActive =
            activeId != null && group.people.some((p) => p.id === activeId)
          const showIndividuals =
            group.people.length === 1 || isExpanded || containsActive

          if (showIndividuals) {
            return group.people.map((person) => (
              <Marker
                key={person.id}
                position={[person.lat!, person.lng!]}
                icon={sbPersonMarkerIcon(activeId === person.id, mapTheme)}
                eventHandlers={{
                  click: () => onSelect(person),
                }}
              >
                <Popup className="sb-map-popup">
                  <div className="sb-map-popup__body min-w-[150px]">
                    <p className="font-medium text-sm text-text-primary">
                      {person.name}
                    </p>
                    <p className="text-xs text-text-secondary mt-1">
                      {generationLabel(person.generation)}
                    </p>
                    {(person.city || person.country) && (
                      <p className="text-xs text-primary mt-1">
                        {[person.city, person.country]
                          .filter(Boolean)
                          .join(', ')}
                      </p>
                    )}
                    <button
                      type="button"
                      className="mt-2 text-xs text-primary underline underline-offset-2"
                      onClick={() => onSelect(person)}
                    >
                      Ver perfil
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))
          }

          return (
            <Marker
              key={group.key}
              position={[group.lat, group.lng]}
              icon={sbCityClusterIcon(group.people.length, false, mapTheme)}
              eventHandlers={{
                click: () => onExpandCity(group.key),
              }}
            >
              <Popup className="sb-map-popup">
                <div className="sb-map-popup__body min-w-[160px]">
                  <p className="font-medium text-sm text-text-primary">
                    {[group.city, group.country].filter(Boolean).join(', ')}
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    {group.people.length} Visagistas SB
                  </p>
                  <button
                    type="button"
                    className="mt-2 text-xs text-primary underline underline-offset-2"
                    onClick={() => onExpandCity(group.key)}
                  >
                    Ver en el mapa
                  </button>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
