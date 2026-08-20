import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

/**
 * Leaflet mide mal el contenedor si un padre anima con transform
 * o si el mapa nace fuera de pantalla (p. ej. al final de la ficha en móvil).
 */
export function MapSizeSync({ deps = [] }: { deps?: unknown[] }) {
  const map = useMap()
  const depsKey = deps.map(String).join('|')

  useEffect(() => {
    const isAlive = () => {
      try {
        return !!map.getContainer()?.isConnected && !!map.getPane('mapPane')
      } catch {
        return false
      }
    }

    const sync = () => {
      if (!isAlive()) return
      try {
        map.invalidateSize({ animate: false })
      } catch {
        /* mapa ya destruido */
      }
    }

    const timeouts = [0, 80, 200, 450, 900].map((ms) =>
      window.setTimeout(sync, ms),
    )

    const container = map.getContainer()

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => sync())
        : null
    resizeObserver?.observe(container)

    const visibilityObserver =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              if (entries.some((entry) => entry.isIntersecting)) {
                sync()
                window.requestAnimationFrame(sync)
              }
            },
            { threshold: [0, 0.1, 0.35, 0.7] },
          )
        : null
    visibilityObserver?.observe(container)

    window.addEventListener('orientationchange', sync)
    window.addEventListener('resize', sync)

    return () => {
      timeouts.forEach((id) => window.clearTimeout(id))
      resizeObserver?.disconnect()
      visibilityObserver?.disconnect()
      window.removeEventListener('orientationchange', sync)
      window.removeEventListener('resize', sync)
    }
  }, [map, depsKey])

  return null
}
