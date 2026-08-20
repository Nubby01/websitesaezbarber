import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ExternalLink, MapPin, Minimize2 } from 'lucide-react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import {
  alumniCommercialLabel,
  alumniMapFooterLines,
  alumniMapZoom,
  alumniMapsUrl,
  alumniProfessionalLocationLabel,
  type Alumni,
} from '../data/alumni'
import { useTheme } from '../hooks/useTheme'
import { sbMapTileUrl, sbPersonMarkerIcon } from '../lib/sbMap'
import { MapZoomControls } from './MapZoomControls'
import { MapSizeSync } from './MapSizeSync'

type MapVariant = 'panel' | 'expanded'

function panelZoomLevel(person: Alumni) {
  return alumniMapZoom(person, 'panel')
}

function expandedZoomLevel(person: Alumni) {
  return alumniMapZoom(person, 'expanded')
}

type AlumniProfileMapProps = {
  person: Alumni
  className?: string
  variant?: MapVariant
}

function ProfileMapIntro({
  person,
  variant,
  onReady,
}: {
  person: Alumni
  variant: MapVariant
  onReady: () => void
}) {
  const map = useMap()
  const onReadyRef = useRef(onReady)
  onReadyRef.current = onReady

  useEffect(() => {
    if (person.lat == null || person.lng == null) return

    let cancelled = false
    const targetZoom =
      variant === 'expanded'
        ? expandedZoomLevel(person)
        : panelZoomLevel(person)

    // Leaflet lanza excepciones si el mapa ya fue desmontado del DOM
    const isAlive = () => {
      try {
        return !!map.getContainer()?.isConnected && !!map.getPane('mapPane')
      } catch {
        return false
      }
    }

    const finish = () => {
      if (!cancelled) onReadyRef.current()
    }

    const run = () => {
      if (cancelled || !isAlive()) return

      map.invalidateSize(false)

      if (variant === 'panel') {
        const fromZoom = Math.max(targetZoom - 1, 8)
        map.setView([person.lat!, person.lng!], fromZoom, { animate: false })

        window.requestAnimationFrame(() => {
          if (cancelled || !isAlive()) return
          map.flyTo([person.lat!, person.lng!], targetZoom, { duration: 0.48 })
          map.once('moveend', finish)
        })
        return
      }

      const startZoom = Math.max(targetZoom - 2, 8)
      map.setView([person.lat!, person.lng!], startZoom, { animate: false })

      window.requestAnimationFrame(() => {
        if (cancelled || !isAlive()) return
        map.flyTo([person.lat!, person.lng!], targetZoom, { duration: 0.75 })
        map.once('moveend', finish)
      })
    }

    const t = window.setTimeout(run, 160)

    return () => {
      cancelled = true
      window.clearTimeout(t)

      try {
        map.off('moveend', finish)
        if (isAlive()) map.stop()
      } catch {
        /* el mapa ya fue destruido */
      }
    }
  }, [map, person.id, person.lat, person.lng, variant])

  return null
}

function ProfileMarker({
  person,
  mapTheme,
  pulse,
}: {
  person: Alumni
  mapTheme: 'light' | 'dark'
  pulse: boolean
}) {
  const markerRef = useRef<L.Marker>(null)
  const icon = useMemo(
    () => sbPersonMarkerIcon(true, mapTheme, 'primary', pulse),
    [mapTheme, pulse],
  )

  useEffect(() => {
    markerRef.current?.setIcon(icon)
  }, [icon])

  if (person.lat == null || person.lng == null) return null

  return (
    <Marker
      ref={markerRef}
      position={[person.lat, person.lng]}
      icon={icon}
      zIndexOffset={1000}
    />
  )
}

export function AlumniProfileMap({
  person,
  className = '',
  variant = 'panel',
}: AlumniProfileMapProps) {
  const { theme } = useTheme()
  const mapTheme = theme === 'dark' ? 'dark' : 'light'
  const expanded = variant === 'expanded'
  const interactive = true
  const [hovered, setHovered] = useState(false)
  const [markerPulse, setMarkerPulse] = useState(false)

  useEffect(() => {
    setMarkerPulse(false)
  }, [person.id])

  const handleMapReady = useCallback(() => {
    setMarkerPulse(true)
    window.setTimeout(() => setMarkerPulse(false), 700)
  }, [])

  const tileUrl = sbMapTileUrl(mapTheme)
  const mapsUrl = alumniMapsUrl(person)
  const professionalLocation = alumniProfessionalLocationLabel(person)
  const commercialLabel = alumniCommercialLabel(person)
  const footerLines = alumniMapFooterLines(person)

  const panelZoom = panelZoomLevel(person)
  const expandedZoom = expandedZoomLevel(person)
  const initialZoom = expanded
    ? Math.max(expandedZoom - 2, 8)
    : Math.max(panelZoom - 1, 8)

  const hasLocation =
    typeof person.lat === 'number' && typeof person.lng === 'number'

  const shellClass = expanded
    ? 'sb-map-card sb-map-card--square sb-profile-map relative h-full min-h-0 border-0 shadow-none'
    : `sb-map-card sb-map-card--square sb-profile-map sb-profile-map--panel relative size-full min-h-[15rem] md:min-h-0 overflow-hidden border-0 shadow-none${hovered ? ' is-hovered' : ''}`

  if (!hasLocation) {
    return (
      <div
        className={`flex items-center justify-center text-text-secondary text-xs text-center px-4 bg-surface-secondary/50 h-full min-h-[15rem] md:min-h-0 border-t border-border ${className}`}
      >
        Ubicación por confirmar
      </div>
    )
  }

  return (
    <div
      data-lenis-prevent
      className={`${shellClass} ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <MapContainer
        key={`profile-${mapTheme}-${person.id}-${variant}`}
        center={[person.lat!, person.lng!]}
        zoom={initialZoom}
        minZoom={8}
        maxZoom={18}
        scrollWheelZoom={interactive}
        dragging={interactive}
        touchZoom={interactive}
        doubleClickZoom={interactive}
        zoomAnimation={expanded}
        fadeAnimation={false}
        zoomControl={false}
        attributionControl={false}
        className="size-full z-0"
      >
        <TileLayer attribution="" url={tileUrl} />
        <MapSizeSync deps={[person.id, variant, expanded]} />
        <ProfileMapIntro
          person={person}
          variant={variant}
          onReady={handleMapReady}
        />
        <MapZoomControls className="bottom-3 right-3" />
        <ProfileMarker
          person={person}
          mapTheme={mapTheme}
          pulse={markerPulse}
        />
      </MapContainer>

      {expanded ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1001] p-4">
          <div className="pointer-events-auto border border-border/80 bg-surface/95 backdrop-blur-md px-4 py-3.5 shadow-soft max-w-lg">
            <div className="flex items-start gap-2.5">
              <MapPin
                className="size-4 text-primary shrink-0 mt-0.5"
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] tracking-[0.22em] uppercase text-text-secondary mb-1">
                  Ubicación Profesional
                </p>
                <p className="text-sm text-text-primary leading-snug">
                  {professionalLocation || footerLines.city}
                </p>
                {commercialLabel ? (
                  <p className="mt-1.5 text-xs text-text-secondary">
                    Barbería: {commercialLabel}
                  </p>
                ) : null}
              </div>
            </div>
            {mapsUrl ? (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary-light transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Abrir en Google Maps
                <ExternalLink className="size-3.5" aria-hidden />
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export function AlumniProfileMapExpandButton({
  onClick,
  expanded = false,
  className = '',
}: {
  onClick: () => void
  expanded?: boolean
  className?: string
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    onClick()
  }

  if (expanded) {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex items-center gap-2 h-9 px-3 text-sm bg-surface/95 border border-border text-text-primary hover:text-primary hover:border-primary/40 transition-colors pointer-events-auto ${className}`}
      >
        <Minimize2 className="size-3.5 shrink-0" aria-hidden />
        Reducir mapa
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`text-sm text-primary hover:text-primary-light transition-colors pointer-events-auto ${className}`}
    >
      Ampliar mapa
    </button>
  )
}
