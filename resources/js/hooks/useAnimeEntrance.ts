import { useEffect, useRef } from 'react'

export function useAnimeEntrance<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let dispose: (() => void) | undefined
    let cancelled = false

    void import('animejs').then(({ animate }) => {
      if (cancelled) return
      const animation = animate(element, {
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 720,
        ease: 'out(3)',
      })
      dispose = () => {
        animation.pause()
      }
    })

    return () => {
      cancelled = true
      dispose?.()
    }
  }, [])

  return ref
}
