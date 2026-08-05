import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react'
import type { HomepageCarouselSlide } from '#/lib/content/homepage'
import './style.css'

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
  slides: HomepageCarouselSlide[]
  activeIndex: number
  autoplayEnabled: boolean
  isRotating: boolean
  onChangeSlide: (direction: -1 | 1) => void
  onSelectSlide: (index: number) => void
  onAutoplayToggle: () => void
  onHoverChange: (isHovered: boolean) => void
  onFocusWithinChange: (hasFocus: boolean) => void
}

export function HeroCarouselView({
  slides,
  activeIndex,
  autoplayEnabled,
  isRotating,
  onChangeSlide,
  onSelectSlide,
  onAutoplayToggle,
  onHoverChange,
  onFocusWithinChange,
}: HeroCarouselViewProps) {
  const slideCount = slides.length

  if (slideCount === 0) return null

  return (
    <section
      id="home"
      className="ctea-hero-carousel relative isolate min-h-dvh overflow-hidden bg-[#091725] text-[#fffaf0]"
      role="region"
      aria-roledescription="carousel"
      aria-label="首頁焦點輪播"
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      onFocusCapture={() => onFocusWithinChange(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) onFocusWithinChange(false)
      }}
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
              <div
                className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,15,25,.94)_0%,rgba(7,20,33,.79)_38%,rgba(8,21,34,.28)_70%,rgba(8,21,34,.12)_100%)] max-md:bg-[linear-gradient(90deg,rgba(5,15,25,.9)_0%,rgba(7,20,33,.64)_70%,rgba(8,21,34,.4)_100%)]"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,15,25,.38)_0%,transparent_35%,rgba(5,15,25,.78)_100%)]"
                aria-hidden="true"
              />
            </article>
          )
        })}
      </div>

      <div
        className="pointer-events-none absolute inset-5 z-10 border border-[rgba(208,174,109,.3)] max-sm:inset-x-3 max-sm:top-[94px] max-sm:bottom-3"
        aria-hidden="true"
      />

      <div className="relative z-20 mx-auto flex min-h-dvh w-full max-w-[1600px] flex-col px-12 pt-[122px] max-lg:px-8 max-lg:pt-[96px] max-sm:px-6 max-sm:pt-[82px]">
        <div className="flex items-center justify-between border-b border-[rgba(208,174,109,.38)] py-4">
          <p className="font-[Georgia,serif] text-[10px] tracking-[0.28em] text-[#d0ae6d] uppercase max-sm:tracking-[0.18em]">
            CTEA · Official
          </p>
          <p className="font-[Georgia,serif] text-[10px] tracking-[0.22em] text-[rgba(255,250,240,.72)] uppercase">
            Taiwan · Est. 1973
          </p>
        </div>

        <div className="grid flex-1 items-center py-6 max-sm:items-end max-sm:pt-8 max-sm:pb-5">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex

            return (
              <div
                className="ctea-carousel-copy col-start-1 row-start-1 w-full max-w-[880px]"
                data-active={isActive}
                aria-hidden={!isActive}
                key={`${slide.eyebrow}-${index}`}
              >
                <div className="flex items-center gap-4 text-[#d0ae6d]">
                  <span className="h-px w-12 bg-current" aria-hidden="true" />
                  <p className="font-[Georgia,serif] text-[11px] tracking-[0.24em] uppercase max-sm:text-[9px] max-sm:tracking-[0.16em]">
                    {slide.eyebrow}
                  </p>
                </div>

                <h1 className="mt-6 text-balance font-['Noto_Serif_TC','Songti_TC',serif] text-[clamp(46px,5.8vw,90px)] leading-[1.12] font-medium tracking-[0.055em] text-[#fffaf0] max-sm:mt-5 max-sm:text-[clamp(36px,11.2vw,52px)] max-sm:leading-[1.2] max-sm:tracking-[0.035em]">
                  <span className="block">{slide.titleLine1}</span>
                  <span className="block text-[#d0ae6d]">{slide.titleLine2}</span>
                </h1>

                <p className="mt-5 max-w-[640px] text-pretty font-['Noto_Serif_TC','Songti_TC',serif] text-[clamp(15px,1.25vw,19px)] leading-8 tracking-[0.08em] text-[rgba(255,250,240,.82)] max-sm:text-sm max-sm:leading-7 max-sm:tracking-[0.045em]">
                  {slide.description}
                </p>

                <a
                  href={slide.ctaHref}
                  tabIndex={isActive ? 0 : -1}
                  className="group mt-7 inline-flex min-h-13 items-center gap-7 border border-[#d0ae6d] bg-[rgba(9,23,37,.62)] px-7 font-['Noto_Serif_TC','Songti_TC',serif] text-sm tracking-[0.12em] text-[#fffaf0] backdrop-blur-sm transition-[background-color,color] duration-200 hover:bg-[#d0ae6d] hover:text-[#091725] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f3dbad] motion-reduce:transition-none max-sm:min-h-12 max-sm:px-5 max-sm:text-xs"
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
        </div>

        {slideCount > 1 ? (
          <div className="mb-5 flex min-h-16 items-center gap-7 border-t border-[rgba(208,174,109,.38)] max-sm:mb-4 max-sm:gap-3">
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
                    <span className="font-[Georgia,serif] text-[10px] text-[rgba(255,250,240,.65)] tabular-nums max-md:hidden">
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

            <button
              type="button"
              className="grid size-12 shrink-0 cursor-pointer place-items-center text-[rgba(255,250,240,.82)] transition-colors duration-200 hover:text-[#d0ae6d] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#f3dbad] motion-reduce:transition-none max-sm:size-11"
              aria-label={autoplayEnabled ? '暫停自動播放' : '開始自動播放'}
              aria-pressed={!autoplayEnabled}
              onClick={onAutoplayToggle}
            >
              {autoplayEnabled ? (
                <Pause className="size-4" strokeWidth={1.5} aria-hidden="true" />
              ) : (
                <Play className="size-4" strokeWidth={1.5} aria-hidden="true" />
              )}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
