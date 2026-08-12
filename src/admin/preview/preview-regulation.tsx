import { entryToRegulationPage } from '#/admin/preview/entry-to-regulation'
import {
  applyPreviewTheme,
  clearPreviewTheme,
  PreviewLayout,
  type PreviewWindowProps,
} from '#/admin/preview/shared'
import { RegulationPagePreviewView } from '#/components/regulation/regulation-preview-view'
import type { RegulationPage } from '#/lib/content/regulation'
import { renderMarkdown } from '#/lib/markdown'

type CmsEntry = Parameters<typeof entryToRegulationPage>[0]

type RegulationPreviewProps = PreviewWindowProps & {
  entry: CmsEntry
}

type RegulationPreviewState = {
  navMenuOpen: boolean
  previewTheme: 'light' | 'dark'
  contentHtml: string
  contentSource: string
  headings: RegulationPage['headings']
}

type RegulationPreviewInstance = {
  props: RegulationPreviewProps
  state: RegulationPreviewState
  setState: (
    update:
      | Partial<RegulationPreviewState>
      | ((state: RegulationPreviewState) => Partial<RegulationPreviewState>),
  ) => void
  _previewCompileToken?: number
}

function syncPreviewHtml(
  instance: RegulationPreviewInstance,
  source: string,
) {
  if (source === instance.state.contentSource) return

  const token = (instance._previewCompileToken ?? 0) + 1
  instance._previewCompileToken = token
  instance.setState({
    contentSource: source,
    contentHtml: '',
    headings: [],
  })

  if (!source.trim()) return

  renderMarkdown(source).then(({ markup, headings }) => {
    if (instance._previewCompileToken !== token) return
    instance.setState({
      contentHtml: markup,
      headings: headings
        .filter((heading) => heading.level === 2 || heading.level === 3)
        .map((heading) => ({
          id: heading.id,
          text: heading.text,
          level: heading.level,
        })),
    })
  })
}

/** Preview for content/regulation/{fei,domestic,training,downloads}.md */
export const RegulationPagePreview = createClass({
  getInitialState: function (): RegulationPreviewState {
    return {
      navMenuOpen: false,
      previewTheme: 'light',
      contentHtml: '',
      contentSource: '',
      headings: [],
    }
  },

  componentDidMount: function (this: RegulationPreviewInstance) {
    applyPreviewTheme(this)
    const draft = entryToRegulationPage(this.props.entry)
    syncPreviewHtml(this, draft?.content ?? '')
  },

  componentDidUpdate: function (
    this: RegulationPreviewInstance,
    _previousProps: RegulationPreviewProps,
    previousState: RegulationPreviewState,
  ) {
    if (previousState.previewTheme !== this.state.previewTheme) {
      applyPreviewTheme(this)
    }
    const draft = entryToRegulationPage(this.props.entry)
    syncPreviewHtml(this, draft?.content ?? '')
  },

  componentWillUnmount: function (this: RegulationPreviewInstance) {
    clearPreviewTheme(this)
  },

  render: function (this: RegulationPreviewInstance) {
    const draft = entryToRegulationPage(this.props.entry)
    const page =
      draft &&
      ({
        ...draft,
        content: this.state.contentHtml,
        headings: this.state.headings,
      } satisfies RegulationPage)

    return (
      <PreviewLayout instance={this}>
        {page ? (
          <RegulationPagePreviewView page={page} />
        ) : (
          <p className="px-5 py-10 font-body text-body text-[#686762] dark:text-[#b3aa99] md:px-10 lg:px-16">
            請先填寫標題，即可預覽制度專區頁面。
          </p>
        )}
      </PreviewLayout>
    )
  },
})
