import { useEffect, useRef, useState } from 'react'

const SCROLL_TOP_THRESHOLD = 120

export function useScrollDirection(threshold = 10) {
  const [direction, setDirection] = useState<'up' | 'down'>('up')
  const [scrollY, setScrollY] = useState(0)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const update = () => {
      const y = window.scrollY
      setScrollY(y)

      const delta = y - lastScrollY.current
      if (Math.abs(delta) >= threshold) {
        setDirection(delta > 0 ? 'down' : 'up')
        lastScrollY.current = y > 0 ? y : 0
      }

      ticking.current = false
    }

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true
        requestAnimationFrame(update)
      }
    }

    lastScrollY.current = window.scrollY
    setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  const isAtTop = scrollY <= SCROLL_TOP_THRESHOLD

  return { direction, scrollY, isAtTop }
}
