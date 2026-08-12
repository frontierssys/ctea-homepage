import { entryToAboutMedia } from '#/admin/preview/entry-to-about-media'
import {
  applyPreviewTheme,
  clearPreviewTheme,
  PreviewLayout,
  type PreviewWindowProps,
} from '#/admin/preview/shared'
import { AboutMediaView } from '#/components/about/about-media-view'
import type { AboutMediaContent } from '#/lib/content/about-media'
import { renderMarkdown } from '#/lib/markdown'

type AboutMediaPreviewProps = PreviewWindowProps & {
  entry: Parameters<typeof entryToAboutMedia>[0]
}

type AboutMediaPreviewState = {
  navMenuOpen: boolean
  previewTheme: 'light' | 'dark'
  contentHtml: string
  contentSource: string
}

type AboutMediaPreviewInstance = {
  props: AboutMediaPreviewProps
  state: AboutMediaPreviewState
  setState: (
    update:
      | Partial<AboutMediaPreviewState>
      | ((state: AboutMediaPreviewState) => Partial<AboutMediaPreviewState>),
  ) => void
  _previewCompileToken?: number
}

function getPreviewDraft(instance: AboutMediaPreviewInstance) {
  return entryToAboutMedia(instance.props.entry)
}

function syncPreviewHtml(
  instance: AboutMediaPreviewInstance,
  draft: AboutMediaContent | null,
) {
  const source = draft?.content ?? ''
  if (source === instance.state.contentSource) return

  const token = (instance._previewCompileToken ?? 0) + 1
  instance._previewCompileToken = token
  instance.setState({ contentSource: source, contentHtml: '' })

  if (!source.trim()) return

  renderMarkdown(source).then(({ markup }) => {
    if (instance._previewCompileToken !== token) return
    instance.setState({ contentHtml: markup })
  })
}

/** Shared preview for content/about/mission.md and vision.md */
export const AboutMediaPreview = createClass({
  getInitialState: function (): AboutMediaPreviewState {
    return {
      navMenuOpen: false,
      previewTheme: 'light',
      contentHtml: '',
      contentSource: '',
    }
  },

  componentDidMount: function (this: AboutMediaPreviewInstance) {
    applyPreviewTheme(this)
    syncPreviewHtml(this, getPreviewDraft(this))
  },

  componentDidUpdate: function (
    this: AboutMediaPreviewInstance,
    _previousProps: AboutMediaPreviewProps,
    previousState: AboutMediaPreviewState,
  ) {
    if (previousState.previewTheme !== this.state.previewTheme) {
      applyPreviewTheme(this)
    }
    syncPreviewHtml(this, getPreviewDraft(this))
  },

  componentWillUnmount: function (this: AboutMediaPreviewInstance) {
    clearPreviewTheme(this)
  },

  render: function (this: AboutMediaPreviewInstance) {
    const draft = getPreviewDraft(this)
    const page =
      draft &&
      ({
        ...draft,
        content: this.state.contentHtml,
      } satisfies AboutMediaContent)

    return (
      <PreviewLayout instance={this}>
        {page ? (
          <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
            <AboutMediaView page={page} />
          </div>
        ) : (
          <p className="px-5 py-10 font-body text-body text-[#686762] dark:text-[#b3aa99] md:px-10 lg:px-16">
            請先填寫標題與圖片，即可預覽此頁面。
          </p>
        )}
      </PreviewLayout>
    )
  },
})
