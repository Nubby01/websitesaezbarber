import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

type AnimatedCounterProps = {
  value: number
  duration?: number
  className?: string
}

export function AnimatedCounter({
  value,
  duration = 820,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.35, margin: '0px 0px -10% 0px' })
  const reduceMotion = useReducedMotion()
  const [display, setDisplay] = useState(0)
  const done = useRef(false)

  useEffect(() => {
    if (!inView || done.current) return

    if (reduceMotion) {
      setDisplay(value)
      done.current = true
      return
    }

    const start = performance.now()
    let frame = 0
    let cancelled = false

    const tick = (now: number) => {
      if (cancelled) return
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(value * eased))
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        done.current = true
      }
    }

    frame = requestAnimationFrame(tick)

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      if (!done.current) {
        setDisplay(0)
      }
    }
  }, [inView, value, duration, reduceMotion])

  return (
    <span ref={ref} className={className} aria-label={`${value}`}>
      {display}
    </span>
  )
}
