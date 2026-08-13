import { entryToFooter } from '#/admin/preview/entry-to-footer'
import {
  applyPreviewTheme,
  clearPreviewTheme,
  PreviewLayout,
  type PreviewWindowProps,
} from '#/admin/preview/shared'
import { SiteFooter } from '#/routes/-component/landing-content'

type FooterPreviewProps = PreviewWindowProps & {
  entry: Parameters<typeof entryToFooter>[0]
}

type FooterPreviewState = {
  navMenuOpen: boolean
  previewTheme: 'light' | 'dark'
}

type FooterPreviewInstance = {
  props: FooterPreviewProps
  state: FooterPreviewState
  setState: (
    update:
      | Partial<FooterPreviewState>
      | ((state: FooterPreviewState) => Partial<FooterPreviewState>),
  ) => void
}

/** Preview for content/footer.json */
export const FooterPreview = createClass({
  getInitialState: function (): FooterPreviewState {
    return {
      navMenuOpen: false,
      previewTheme: 'light',
    }
  },

  componentDidMount: function (this: FooterPreviewInstance) {
    applyPreviewTheme(this)
  },

  componentDidUpdate: function (
    this: FooterPreviewInstance,
    _previousProps: FooterPreviewProps,
    previousState: FooterPreviewState,
  ) {
    if (previousState.previewTheme !== this.state.previewTheme) {
      applyPreviewTheme(this)
    }
  },

  componentWillUnmount: function (this: FooterPreviewInstance) {
    clearPreviewTheme(this)
  },

  render: function (this: FooterPreviewInstance) {
    const footer = entryToFooter(this.props.entry)

    return (
      <PreviewLayout instance={this}>
        <div className="min-h-[15dvh] pt-(--layout-header-height)" aria-hidden="true" />
        <SiteFooter footer={footer} />
      </PreviewLayout>
    )
  },
})
