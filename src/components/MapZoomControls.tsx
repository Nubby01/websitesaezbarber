import { Minus, Plus } from 'lucide-react'
import { useMap } from 'react-leaflet'

type MapZoomControlsProps = {
  className?: string
}

export function MapZoomControls({ className = 'bottom-5 right-5' }: MapZoomControlsProps) {
  const map = useMap()

  return (
    <div
      className={`sb-map-zoom absolute z-[1000] flex flex-col overflow-hidden ${className}`}
    >
      <button
        type="button"
        aria-label="Acercar mapa"
        className="sb-map-zoom-btn border-b border-border/80"
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
        className="sb-map-zoom-btn"
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
