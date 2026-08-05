import { entryToCarouselSlides } from '#/admin/entry-to-carousel'
import {
  AUTOPLAY_DELAY_MS,
  HeroCarouselView,
  shiftCarouselIndex,
} from '#/components/hero-carousel/hero-carousel-view'
import '#/styles.css'

type HomepagePreviewProps = {
  entry: Parameters<typeof entryToCarouselSlides>[0]
  getAsset: (path: string) => { url?: string } | undefined
}

type HomepagePreviewState = {
  activeIndex: number
  autoplayEnabled: boolean
  isHovered: boolean
  hasFocus: boolean
  prefersReducedMotion: boolean
}

type HomepagePreviewInstance = {
  props: HomepagePreviewProps
  state: HomepagePreviewState
  setState: (
    update:
      | Partial<HomepagePreviewState>
      | ((state: HomepagePreviewState) => Partial<HomepagePreviewState>),
  ) => void
  autoplayTimer?: number
  motionQuery?: MediaQueryList
  updateMotionPreference?: () => void
}

function getPreviewSlides(instance: HomepagePreviewInstance) {
  const { entry, getAsset } = instance.props
  return entryToCarouselSlides(entry, { getAsset })
}

function isPreviewRotating(instance: HomepagePreviewInstance, slideCount: number) {
  const { autoplayEnabled, isHovered, hasFocus, prefersReducedMotion } = instance.state
  return slideCount > 1 && autoplayEnabled && !isHovered && !hasFocus && !prefersReducedMotion
}

function schedulePreviewAutoplay(instance: HomepagePreviewInstance) {
  if (instance.autoplayTimer !== undefined) window.clearTimeout(instance.autoplayTimer)

  const slideCount = getPreviewSlides(instance).length
  if (!isPreviewRotating(instance, slideCount)) return

  instance.autoplayTimer = window.setTimeout(() => {
    instance.setState((state) => ({
      activeIndex: shiftCarouselIndex(state.activeIndex, 1, slideCount),
    }))
  }, AUTOPLAY_DELAY_MS)
}

CMS.registerPreviewStyle('/admin/preview-bundle.css')

const HomepagePreview = createClass({
  getInitialState: function (): HomepagePreviewState {
    return {
      activeIndex: 0,
      autoplayEnabled: true,
      isHovered: false,
      hasFocus: false,
      prefersReducedMotion: false,
    }
  },

  componentDidMount: function (this: HomepagePreviewInstance) {
    this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    this.updateMotionPreference = () => {
      const prefersReducedMotion = this.motionQuery?.matches ?? false
      if (prefersReducedMotion !== this.state.prefersReducedMotion) {
        this.setState({ prefersReducedMotion })
      }
    }

    this.updateMotionPreference()
    this.motionQuery.addEventListener('change', this.updateMotionPreference)
    schedulePreviewAutoplay(this)
  },

  componentDidUpdate: function (this: HomepagePreviewInstance) {
    const slideCount = getPreviewSlides(this).length

    if (this.state.activeIndex !== 0 && this.state.activeIndex >= slideCount) {
      this.setState({ activeIndex: 0 })
      return
    }

    schedulePreviewAutoplay(this)
  },

  componentWillUnmount: function (this: HomepagePreviewInstance) {
    if (this.autoplayTimer !== undefined) window.clearTimeout(this.autoplayTimer)
    if (this.motionQuery && this.updateMotionPreference) {
      this.motionQuery.removeEventListener('change', this.updateMotionPreference)
    }
  },

  render: function (this: HomepagePreviewInstance) {
    const slides = getPreviewSlides(this)
    const slideCount = slides.length
    const activeIndex = slideCount === 0 ? 0 : Math.min(this.state.activeIndex, slideCount - 1)
    const isRotating = isPreviewRotating(this, slideCount)

    return (
      <HeroCarouselView
        slides={slides}
        activeIndex={activeIndex}
        autoplayEnabled={this.state.autoplayEnabled}
        isRotating={isRotating}
        onChangeSlide={(direction) => {
          this.setState((state) => ({
            activeIndex: shiftCarouselIndex(state.activeIndex, direction, slideCount),
          }))
        }}
        onSelectSlide={(nextIndex) => this.setState({ activeIndex: nextIndex })}
        onAutoplayToggle={() => {
          this.setState((state) => ({ autoplayEnabled: !state.autoplayEnabled }))
        }}
        onHoverChange={(isHovered) => this.setState({ isHovered })}
        onFocusWithinChange={(hasFocus) => this.setState({ hasFocus })}
      />
    )
  },
})

CMS.registerPreviewTemplate('homepage', HomepagePreview)
