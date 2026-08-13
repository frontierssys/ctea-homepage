import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import type { CarouselSlide } from '#/lib/content/carousel'

export const AUTOPLAY_DELAY_MS = 7000

export function shiftCarouselIndex(
  activeIndex: number,
  direction: -1 | 1,
  slideCount: number,
) {
  if (slideCount === 0) return 0
  return (activeIndex + direction + slideCount) % slideCount
}

export type HeroCarouselViewProps = {
  slides: CarouselSlide[]
  activeIndex: number
  isRotating: boolean
  onChangeSlide: (direction: -1 | 1) => void
  onSelectSlide: (index: number) => void
  onHoverChange: (isHovered: boolean) => void
}

export function HeroCarouselView({
  slides,
  activeIndex,
  isRotating,
  onChangeSlide,
  onSelectSlide,
  onHoverChange,
}: HeroCarouselViewProps) {
  const slideCount = slides.length

  if (slideCount === 0) return null

  return (
    <section
      id="home"
      className="ctea-hero-carousel relative isolate min-h-[calc(100dvh-var(--layout-header-height))] overflow-hidden bg-[#091725] text-[#fffaf0]"
      role="region"
      aria-roledescription="carousel"
      aria-label="首頁焦點輪播"
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          onChangeSlide(-1)
        }
        if (event.key === 'ArrowRight') {
          event.preventDefault()
          onChangeSlide(1)
        }
        if (event.key === 'Home') {
          event.preventDefault()
          onSelectSlide(0)
        }
        if (event.key === 'End') {
          event.preventDefault()
          onSelectSlide(slideCount - 1)
        }
      }}
    >
      <div className="absolute inset-0" aria-live={isRotating ? 'off' : 'polite'}>
        {slides.map((slide, index) => {
          const isActive = index === activeIndex

          return (
            <article
              className="ctea-carousel-slide absolute inset-0"
              data-active={isActive}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} / ${slideCount}：${slide.titleLine1}${slide.titleLine2}`}
              aria-hidden={!isActive}
              key={`${slide.titleLine1}-${slide.image}`}
            >
              <img
                src={slide.image}
                alt={isActive ? slide.imageAlt : ''}
                className="ctea-carousel-image absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: slide.imagePosition }}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
              <div className="ctea-carousel-scrim" aria-hidden="true" />
            </article>
          )
        })}
      </div>

      <div className="relative mx-auto z-20 flex min-h-[calc(100dvh-var(--layout-header-height))] w-full max-w-7xl px-12 xl:px-0 flex-col max-lg:px-8 max-sm:px-6">
        <article className="grid flex-1 items-center py-6 max-sm:items-end max-sm:pt-8 max-sm:pb-5">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex
            return (
              <div
                className="ctea-carousel-copy col-start-1 row-start-1 w-full max-w-4xl"
                data-active={isActive}
                aria-hidden={!isActive}
                key={`${slide.eyebrow}-${index}`}
              >
                <div className="flex items-center gap-4 text-[#d0ae6d]">
                  <span className="ctea-hero-kicker-rule h-px w-12 bg-current" aria-hidden="true" />
                  <p className="font-sport text-kicker uppercase">
                    {slide.eyebrow}
                  </p>
                </div>

                <h1 className="mt-6 text-balance font-display text-hero text-[#fffaf0] max-sm:mt-5">
                  <span className="block">{slide.titleLine1}</span>
                  <span className="block text-[#d0ae6d]">{slide.titleLine2}</span>
                </h1>

                <p className="mt-5 max-w-2xl text-pretty font-body text-lead text-[rgba(255,250,240,.82)]">
                  {slide.description}
                </p>

                <a
                  href={slide.ctaHref}
                  tabIndex={isActive ? 0 : -1}
                  className="group mt-7 inline-flex min-h-13 items-center gap-7 border border-[#d0ae6d] bg-[rgba(9,23,37,.62)] px-7 font-body text-action text-[#fffaf0] backdrop-blur-sm transition-[background-color,color] duration-200 hover:bg-[#d0ae6d] hover:text-[#091725] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f3dbad] motion-reduce:transition-none max-sm:min-h-12 max-sm:px-5"
                >
                  {slide.ctaLabel}
                  <ArrowUpRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                    strokeWidth={1.4}
                    aria-hidden="true"
                  />
                </a>
              </div>
            )
          })}
        </article>

        {slideCount > 1 ? (
          <section className="ctea-hero-controls mb-5 flex min-h-16 items-center gap-7 max-sm:mb-4 max-sm:gap-3">
            <button
              type="button"
              className="grid size-12 shrink-0 cursor-pointer place-items-center border border-[rgba(208,174,109,.5)] text-[#fffaf0] transition-[background-color,color,border-color] duration-200 hover:border-[#d0ae6d] hover:bg-[#d0ae6d] hover:text-[#091725] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#f3dbad] motion-reduce:transition-none max-sm:size-11"
              aria-label="上一張"
              onClick={() => onChangeSlide(-1)}
            >
              <ArrowLeft className="size-5" strokeWidth={1.3} aria-hidden="true" />
            </button>

            <div className="flex min-w-0 flex-1 items-center gap-2" aria-label="選擇投影片">
              {slides.map((slide, index) => {
                const isActive = index === activeIndex

                return (
                  <button
                    type="button"
                    className="group flex h-12 min-w-0 flex-1 cursor-pointer items-center gap-3 px-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3dbad] max-sm:h-11"
                    aria-label={`前往第 ${index + 1} 張：${slide.titleLine1}${slide.titleLine2}`}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => onSelectSlide(index)}
                    key={`${slide.titleLine1}-indicator`}
                  >
                    <span className="font-sport text-overline text-[rgba(255,250,240,.65)] tabular-nums max-md:hidden">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="relative h-px flex-1 overflow-hidden bg-[rgba(255,250,240,.28)]">
                      <span
                        className="ctea-carousel-progress absolute inset-0 origin-left bg-[#d0ae6d]"
                        data-active={isActive}
                        data-rotating={isActive && isRotating}
                      />
                    </span>
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              className="grid size-12 shrink-0 cursor-pointer place-items-center border border-[rgba(208,174,109,.5)] text-[#fffaf0] transition-[background-color,color,border-color] duration-200 hover:border-[#d0ae6d] hover:bg-[#d0ae6d] hover:text-[#091725] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#f3dbad] motion-reduce:transition-none max-sm:size-11"
              aria-label="下一張"
              onClick={() => onChangeSlide(1)}
            >
              <ArrowRight className="size-5" strokeWidth={1.3} aria-hidden="true" />
            </button>
          </section>
        ) : null}
      </div>
    </section>
  )
}
