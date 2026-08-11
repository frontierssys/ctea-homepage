import { entryToAboutHistory } from '#/admin/preview/entry-to-about-history'
import {
  applyPreviewTheme,
  clearPreviewTheme,
  PreviewLayout,
  type PreviewWindowProps,
} from '#/admin/preview/shared'
import { AboutHistoryView } from '#/components/about/about-history-view'
import type { AboutHistoryContent } from '#/lib/content/about-history'
import { renderMarkdown } from '#/lib/markdown'

type AboutHistoryPreviewProps = PreviewWindowProps & {
  entry: Parameters<typeof entryToAboutHistory>[0]
}

type AboutHistoryPreviewState = {
  navMenuOpen: boolean
  previewTheme: 'light' | 'dark'
  contentHtml: string
  contentSource: string
}

type AboutHistoryPreviewInstance = {
  props: AboutHistoryPreviewProps
  state: AboutHistoryPreviewState
  setState: (
    update:
      | Partial<AboutHistoryPreviewState>
      | ((state: AboutHistoryPreviewState) => Partial<AboutHistoryPreviewState>),
  ) => void
  _previewCompileToken?: number
}

function getPreviewDraft(instance: AboutHistoryPreviewInstance) {
  return entryToAboutHistory(instance.props.entry)
}

function syncPreviewHtml(
  instance: AboutHistoryPreviewInstance,
  draft: AboutHistoryContent | null,
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

export const AboutHistoryPreview = createClass({
  getInitialState: function (): AboutHistoryPreviewState {
    return {
      navMenuOpen: false,
      previewTheme: 'light',
      contentHtml: '',
      contentSource: '',
    }
  },

  componentDidMount: function (this: AboutHistoryPreviewInstance) {
    applyPreviewTheme(this)
    syncPreviewHtml(this, getPreviewDraft(this))
  },

  componentDidUpdate: function (
    this: AboutHistoryPreviewInstance,
    _previousProps: AboutHistoryPreviewProps,
    previousState: AboutHistoryPreviewState,
  ) {
    if (previousState.previewTheme !== this.state.previewTheme) {
      applyPreviewTheme(this)
    }
    syncPreviewHtml(this, getPreviewDraft(this))
  },

  componentWillUnmount: function (this: AboutHistoryPreviewInstance) {
    clearPreviewTheme(this)
  },

  render: function (this: AboutHistoryPreviewInstance) {
    const draft = getPreviewDraft(this)
    const history =
      draft &&
      ({
        ...draft,
        content: this.state.contentHtml,
      } satisfies AboutHistoryContent)

    return (
      <PreviewLayout instance={this}>
        {history ? (
          <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
            <AboutHistoryView history={history} />
          </div>
        ) : (
          <p className="px-5 py-10 font-body text-body text-[#686762] dark:text-[#b3aa99] md:px-10 lg:px-16">
            請先填寫標題，即可預覽協會歷史頁面。
          </p>
        )}
      </PreviewLayout>
    )
  },
})
