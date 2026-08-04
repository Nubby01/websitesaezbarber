import { useEffect } from 'react'
import Lenis from 'lenis'

let lenisInstance: Lenis | null = null

export function stopLenis() {
  lenisInstance?.stop()
}

export function startLenis() {
  lenisInstance?.start()
}

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisInstance = lenis

    document.documentElement.classList.add('lenis', 'lenis-smooth')

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      if (lenisInstance === lenis) lenisInstance = null
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
    }
  }, [])
}
