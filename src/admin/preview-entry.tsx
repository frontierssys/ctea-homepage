import { entryToCarouselSlides } from '#/admin/entry-to-carousel'
import {
  AUTOPLAY_DELAY_MS,
  HeroCarouselView,
  shiftCarouselIndex,
} from '#/components/hero-carousel/hero-carousel-view'
import { TopNavBarView } from '#/components/top-nav-bar/top-nav-bar-view'
import '#/styles.css'

type HomepagePreviewProps = {
  entry: Parameters<typeof entryToCarouselSlides>[0]
  getAsset: (path: string) => { url?: string } | undefined
  window?: Window
  document?: Document
}

type HomepagePreviewState = {
  activeIndex: number
  autoplayEnabled: boolean
  isHovered: boolean
  hasFocus: boolean
  prefersReducedMotion: boolean
  navMenuOpen: boolean
  previewTheme: 'light' | 'dark'
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

function getPreviewWindow(instance: HomepagePreviewInstance) {
  return instance.props.window ?? window
}

function getPreviewDocument(instance: HomepagePreviewInstance) {
  return instance.props.document ?? document
}

function applyPreviewTheme(instance: HomepagePreviewInstance) {
  const previewDocument = getPreviewDocument(instance)
  const root = previewDocument.documentElement

  root.classList.remove('light', 'dark')
  root.classList.add(instance.state.previewTheme)
  root.style.colorScheme = instance.state.previewTheme
}

function isPreviewRotating(instance: HomepagePreviewInstance, slideCount: number) {
  const { autoplayEnabled, isHovered, hasFocus, prefersReducedMotion } = instance.state
  return slideCount > 1 && autoplayEnabled && !isHovered && !hasFocus && !prefersReducedMotion
}

function schedulePreviewAutoplay(instance: HomepagePreviewInstance) {
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

// Sveltia listens for resize pointer events on the admin document. Without pointer capture,
// dragging into the preview iframe moves the pointer to a different document, so Sveltia misses
// pointermove/pointerup and can leave the divider stuck in its dragging state.
/** ref: https://github.com/sveltia/sveltia-cms/issues/875 */
// document.addEventListener(
//   'pointerdown',
//   (event) => {
//     const target = event.target

//     if (!(target instanceof Element)) return

//     const handle = target.closest<HTMLElement>('.sui.resizable-handle')

//     if (!handle || handle.getAttribute('aria-disabled') === 'true') return

//     handle.setPointerCapture(event.pointerId)
//   },
//   { capture: true },
// )

CMS.registerPreviewStyle('/admin/preview-bundle.css')

const HomepagePreview = createClass({
  getInitialState: function (): HomepagePreviewState {
    return {
      activeIndex: 0,
      autoplayEnabled: true,
      isHovered: false,
      hasFocus: false,
      prefersReducedMotion: false,
      navMenuOpen: false,
      previewTheme: 'light',
    }
  },

  componentDidMount: function (this: HomepagePreviewInstance) {
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
    this: HomepagePreviewInstance,
    _previousProps: HomepagePreviewProps,
    previousState: HomepagePreviewState,
  ) {
    if (previousState.previewTheme !== this.state.previewTheme) applyPreviewTheme(this)

    const slideCount = getPreviewSlides(this).length

    if (this.state.activeIndex !== 0 && this.state.activeIndex >= slideCount) {
      this.setState({ activeIndex: 0 })
      return
    }

    schedulePreviewAutoplay(this)
  },

  componentWillUnmount: function (this: HomepagePreviewInstance) {
    if (this.autoplayTimer !== undefined) {
      getPreviewWindow(this).clearTimeout(this.autoplayTimer)
    }
    if (this.motionQuery && this.updateMotionPreference) {
      this.motionQuery.removeEventListener('change', this.updateMotionPreference)
    }

    const root = getPreviewDocument(this).documentElement
    root.classList.remove('light', 'dark')
    root.style.removeProperty('color-scheme')
  },

  render: function (this: HomepagePreviewInstance) {
    const slides = getPreviewSlides(this)
    const slideCount = slides.length
    const activeIndex = slideCount === 0 ? 0 : Math.min(this.state.activeIndex, slideCount - 1)
    const isRotating = isPreviewRotating(this, slideCount)

    return (
      <>
        <TopNavBarView
          menuOpen={this.state.navMenuOpen}
          hidden={false}
          theme={this.state.previewTheme}
          hydrated={true}
          onMenuToggle={() => {
            this.setState((state) => ({ navMenuOpen: !state.navMenuOpen }))
          }}
          onMenuClose={() => this.setState({ navMenuOpen: false })}
          onThemeToggle={() => {
            this.setState((state) => ({
              previewTheme: state.previewTheme === 'dark' ? 'light' : 'dark',
            }))
          }}
          onNavigate={(event) => event.preventDefault()}
        />

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
      </>
    )
  },
})

CMS.registerPreviewTemplate('homepage', HomepagePreview)
