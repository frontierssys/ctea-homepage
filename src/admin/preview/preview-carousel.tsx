import { entryToCarouselSlides } from '#/admin/preview/entry-to-carousel'
import {
  applyPreviewTheme,
  clearPreviewTheme,
  getPreviewWindow,
  PreviewLayout,
  type PreviewWindowProps,
} from '#/admin/preview/shared'
import {
  AUTOPLAY_DELAY_MS,
  HeroCarouselView,
  shiftCarouselIndex,
} from '#/components/hero-carousel/hero-carousel-view'

type CarouselPreviewProps = PreviewWindowProps & {
  entry: Parameters<typeof entryToCarouselSlides>[0]
  getAsset: (path: string) => { url?: string } | undefined
}

type CarouselPreviewState = {
  activeIndex: number
  isHovered: boolean
  prefersReducedMotion: boolean
  navMenuOpen: boolean
  previewTheme: 'light' | 'dark'
}

type CarouselPreviewInstance = {
  props: CarouselPreviewProps
  state: CarouselPreviewState
  setState: (
    update:
      | Partial<CarouselPreviewState>
      | ((state: CarouselPreviewState) => Partial<CarouselPreviewState>),
  ) => void
  autoplayTimer?: number
  motionQuery?: MediaQueryList
  updateMotionPreference?: () => void
}

function getPreviewSlides(instance: CarouselPreviewInstance) {
  const { entry, getAsset } = instance.props
  return entryToCarouselSlides(entry, { getAsset })
}

function isPreviewRotating(instance: CarouselPreviewInstance, slideCount: number) {
  const { isHovered, prefersReducedMotion } = instance.state
  return slideCount > 1 && !isHovered && !prefersReducedMotion
}

function schedulePreviewAutoplay(instance: CarouselPreviewInstance) {
  const previewWindow = getPreviewWindow(instance)
  if (instance.autoplayTimer !== undefined) previewWindow.clearTimeout(instance.autoplayTimer)

  const slideCount = getPreviewSlides(instance).length
  if (!isPreviewRotating(instance, slideCount)) return

  instance.autoplayTimer = previewWindow.setTimeout(() => {
    instance.setState((state) => ({
      activeIndex: shiftCarouselIndex(state.activeIndex, 1, slideCount),
    }))
  }, AUTOPLAY_DELAY_MS)
}

export const CarouselPreview = createClass({
  getInitialState: function (): CarouselPreviewState {
    return {
      activeIndex: 0,
      isHovered: false,
      prefersReducedMotion: false,
      navMenuOpen: false,
      previewTheme: 'light',
    }
  },

  componentDidMount: function (this: CarouselPreviewInstance) {
    const previewWindow = getPreviewWindow(this)
    this.motionQuery = previewWindow.matchMedia('(prefers-reduced-motion: reduce)')
    this.updateMotionPreference = () => {
      const prefersReducedMotion = this.motionQuery?.matches ?? false
      if (prefersReducedMotion !== this.state.prefersReducedMotion) {
        this.setState({ prefersReducedMotion })
      }
    }

    this.updateMotionPreference()
    this.motionQuery.addEventListener('change', this.updateMotionPreference)
    applyPreviewTheme(this)
    schedulePreviewAutoplay(this)
  },

  componentDidUpdate: function (
    this: CarouselPreviewInstance,
    _previousProps: CarouselPreviewProps,
    previousState: CarouselPreviewState,
  ) {
    if (previousState.previewTheme !== this.state.previewTheme) applyPreviewTheme(this)

    const slideCount = getPreviewSlides(this).length

    if (this.state.activeIndex !== 0 && this.state.activeIndex >= slideCount) {
      this.setState({ activeIndex: 0 })
      return
    }

    schedulePreviewAutoplay(this)
  },

  componentWillUnmount: function (this: CarouselPreviewInstance) {
    if (this.autoplayTimer !== undefined) {
      getPreviewWindow(this).clearTimeout(this.autoplayTimer)
    }
    if (this.motionQuery && this.updateMotionPreference) {
      this.motionQuery.removeEventListener('change', this.updateMotionPreference)
    }

    clearPreviewTheme(this)
  },

  render: function (this: CarouselPreviewInstance) {
    const slides = getPreviewSlides(this)
    const slideCount = slides.length
    const activeIndex = slideCount === 0 ? 0 : Math.min(this.state.activeIndex, slideCount - 1)
    const isRotating = isPreviewRotating(this, slideCount)

    return (
      <PreviewLayout instance={this}>
        <HeroCarouselView
          slides={slides}
          activeIndex={activeIndex}
          isRotating={isRotating}
          onChangeSlide={(direction) => {
            this.setState((state) => ({
              activeIndex: shiftCarouselIndex(state.activeIndex, direction, slideCount),
            }))
          }}
          onSelectSlide={(nextIndex) => this.setState({ activeIndex: nextIndex })}
          onHoverChange={(isHovered) => this.setState({ isHovered })}
        />
      </PreviewLayout>
    )
  },
})
