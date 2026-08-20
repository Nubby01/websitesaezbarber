import { useEffect } from 'react'
import Lenis from 'lenis'

let lenisInstance: Lenis | null = null

export function stopLenis() {
  lenisInstance?.stop()
}

export function startLenis() {
  lenisInstance?.start()
}

export function scrollLenisToTop(immediate = false) {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate })
    return
  }
  window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
}

/** Lenis aplica transform al documento; Leaflet falla si un ancestro tiene transform. */
function prefersSmoothScroll() {
  if (typeof window === 'undefined') return false
  const desktopPointer = window.matchMedia(
    '(pointer: fine) and (hover: hover)',
  ).matches
  const wideEnough = window.matchMedia('(min-width: 768px)').matches
  return desktopPointer && wideEnough
}

export function useLenis() {
  useEffect(() => {
    if (!prefersSmoothScroll()) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Evita que el scroll suave capture gestos dentro de mapas Leaflet
      prevent: (node) =>
        node.closest(
          '.leaflet-container, .sb-directory-map, .sb-profile-map, [data-lenis-prevent]',
        ) != null,
    })
    lenisInstance = lenis

    document.documentElement.classList.add('lenis', 'lenis-smooth')

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    const onChange = () => {
      if (!prefersSmoothScroll()) {
        cancelAnimationFrame(frame)
        lenis.destroy()
        if (lenisInstance === lenis) lenisInstance = null
        document.documentElement.classList.remove('lenis', 'lenis-smooth')
      }
    }
    const mqPointer = window.matchMedia('(pointer: fine) and (hover: hover)')
    const mqWidth = window.matchMedia('(min-width: 768px)')
    mqPointer.addEventListener('change', onChange)
    mqWidth.addEventListener('change', onChange)

    return () => {
      mqPointer.removeEventListener('change', onChange)
      mqWidth.removeEventListener('change', onChange)
      cancelAnimationFrame(frame)
      lenis.destroy()
      if (lenisInstance === lenis) lenisInstance = null
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
    }
  }, [])
}
