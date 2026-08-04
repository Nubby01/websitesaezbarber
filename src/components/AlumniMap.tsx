import { useEffect, useMemo } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet'
import L from 'leaflet'
import { Minus, Plus } from 'lucide-react'
import type { Alumni } from '../data/alumni'
import { useTheme } from '../hooks/useTheme'

type AlumniMapProps = {
  people: Alumni[]
  onSelect?: (person: Alumni) => void
  activeId?: string | null
  compact?: boolean
  zoomable?: boolean
  className?: string
}

function FitBounds({
  people,
  compact,
}: {
  people: Alumni[]
  compact?: boolean
}) {
  const map = useMap()

  useEffect(() => {
    const points = people.filter(
      (p) => typeof p.lat === 'number' && typeof p.lng === 'number',
    )
    if (points.length === 0) return

    const singleZoom = compact ? 6 : 5

    if (points.length === 1) {
      map.setView([points[0].lat!, points[0].lng!], singleZoom)
      return
    }

    const bounds = L.latLngBounds(
      points.map((p) => [p.lat!, p.lng!] as [number, number]),
    )
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 5 })
  }, [map, people, compact])

  return null
}

function InvalidateSize() {
  const map = useMap()

  useEffect(() => {
    const t1 = window.setTimeout(() => map.invalidateSize(), 50)
    const t2 = window.setTimeout(() => map.invalidateSize(), 300)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [map])

  return null
}

function ZoomControls() {
  const map = useMap()

  return (
    <div className="absolute bottom-3 right-3 z-[1000] flex flex-col border border-border bg-surface shadow-soft overflow-hidden">
      <button
        type="button"
        aria-label="Acercar mapa"
        className="size-9 flex items-center justify-center text-text-primary hover:bg-surface-secondary hover:text-primary transition-colors border-b border-border"
        onClick={(e) => {
          e.stopPropagation()
          map.zoomIn()
        }}
      >
        <Plus className="size-4" strokeWidth={1.75} />
      </button>
      <button
        type="button"
        aria-label="Alejar mapa"
        className="size-9 flex items-center justify-center text-text-primary hover:bg-surface-secondary hover:text-primary transition-colors"
        onClick={(e) => {
          e.stopPropagation()
          map.zoomOut()
        }}
      >
        <Minus className="size-4" strokeWidth={1.75} />
      </button>
    </div>
  )
}

function ScrollWheelToggle({ enabled }: { enabled: boolean }) {
  const map = useMap()

  useEffect(() => {
    if (enabled) {
      map.scrollWheelZoom.enable()
    } else {
      map.scrollWheelZoom.disable()
    }
  }, [map, enabled])

  return null
}

function markerIcon(active: boolean) {
  return L.divIcon({
    className: 'sb-map-marker',
    html: `<span style="
      display:block;
      width:${active ? 18 : 14}px;
      height:${active ? 18 : 14}px;
      background:${active ? '#0f5c2e' : '#1a7a42'};
      border:2px solid #F8F8F5;
      box-shadow:0 2px 10px rgba(0,0,0,0.25);
    "></span>`,
    iconSize: [active ? 18 : 14, active ? 18 : 14],
    iconAnchor: [active ? 9 : 7, active ? 9 : 7],
  })
}

export function AlumniMap({
  people,
  onSelect,
  activeId,
  compact = false,
  zoomable = false,
  className = '',
}: AlumniMapProps) {
  const { theme } = useTheme()
  const located = useMemo(
    () =>
      people.filter(
        (p) => typeof p.lat === 'number' && typeof p.lng === 'number',
      ),
    [people],
  )

  const tileUrl =
    theme === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'

  const shellClass = compact
    ? `relative h-full min-h-[200px] border border-border overflow-hidden bg-surface-secondary ${className}`
    : `relative h-[360px] md:h-[520px] border border-border overflow-hidden bg-surface-secondary shadow-soft ${className}`

  if (located.length === 0) {
    return (
      <div
        className={`${compact ? 'h-full min-h-[160px]' : 'h-[360px] md:h-[480px]'} border border-border bg-surface-secondary flex items-center justify-center text-text-secondary text-sm ${className}`}
      >
        Ubicación por confirmar
      </div>
    )
  }

  const center: [number, number] =
    located.length === 1
      ? [located[0].lat!, located[0].lng!]
      : [-20, -70]

  return (
    <div className={shellClass}>
      <MapContainer
        key={`${theme}-${located.map((p) => p.id).join('-')}`}
        center={center}
        zoom={located.length === 1 ? (compact ? 6 : 5) : 3}
        scrollWheelZoom={zoomable}
        className="size-full"
        attributionControl={!compact}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url={tileUrl}
        />
        <InvalidateSize />
        <FitBounds people={located} compact={compact} />
        <ScrollWheelToggle enabled={zoomable} />
        {zoomable && <ZoomControls />}
        {located.map((person) => (
          <Marker
            key={person.id}
            position={[person.lat!, person.lng!]}
            icon={markerIcon(activeId === person.id || compact)}
            eventHandlers={
              onSelect
                ? {
                    click: () => onSelect(person),
                  }
                : undefined
            }
          >
            {!compact && (
              <Popup>
                <div className="min-w-[140px]">
                  <p className="font-medium text-sm text-[#111]">
                    {person.name}
                  </p>
                  <p className="text-xs text-[#4F4F4F] mt-1">
                    Gen. {person.generation}
                  </p>
                  {(person.city || person.country) && (
                    <p className="text-xs text-[#0f5c2e] mt-1">
                      {[person.city, person.country]
                        .filter(Boolean)
                        .join(', ')}
                    </p>
                  )}
                  {onSelect && (
                    <button
                      type="button"
                      className="mt-2 text-xs text-[#0f5c2e] underline"
                      onClick={() => onSelect(person)}
                    >
                      Ver perfil
                    </button>
                  )}
                </div>
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
