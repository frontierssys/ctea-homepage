import { useCallback, useEffect, useState } from 'react'
import type { CarouselSlide } from '#/lib/content/carousel'
import {
  AUTOPLAY_DELAY_MS,
  HeroCarouselView,
  shiftCarouselIndex,
} from './hero-carousel-view'

export type HeroCarouselProps = {
  slides: CarouselSlide[]
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplayEnabled, setAutoplayEnabled] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [hasFocus, setHasFocus] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const slideCount = slides.length
  const isRotating =
    slideCount > 1 && autoplayEnabled && !isHovered && !hasFocus && !prefersReducedMotion

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches)

    updateMotionPreference()
    mediaQuery.addEventListener('change', updateMotionPreference)
    return () => mediaQuery.removeEventListener('change', updateMotionPreference)
  }, [])

  useEffect(() => {
    if (!isRotating) return

    const interval = window.setInterval(() => {
      setActiveIndex((index) => shiftCarouselIndex(index, 1, slideCount))
    }, AUTOPLAY_DELAY_MS)

    return () => window.clearInterval(interval)
  }, [activeIndex, isRotating, slideCount])

  useEffect(() => {
    if (activeIndex >= slideCount) setActiveIndex(0)
  }, [activeIndex, slideCount])

  const changeSlide = useCallback(
    (direction: -1 | 1) => {
      setActiveIndex((index) => shiftCarouselIndex(index, direction, slideCount))
    },
    [slideCount],
  )

  return (
    <HeroCarouselView
      slides={slides}
      activeIndex={activeIndex}
      autoplayEnabled={autoplayEnabled}
      isRotating={isRotating}
      onChangeSlide={changeSlide}
      onSelectSlide={setActiveIndex}
      onAutoplayToggle={() => setAutoplayEnabled((enabled) => !enabled)}
      onHoverChange={setIsHovered}
      onFocusWithinChange={setHasFocus}
    />
  )
}
