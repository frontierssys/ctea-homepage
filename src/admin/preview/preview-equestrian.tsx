import { entryToEquestrianPage } from '#/admin/preview/entry-to-equestrian'
import {
  applyPreviewTheme,
  clearPreviewTheme,
  PreviewLayout,
  type PreviewWindowProps,
} from '#/admin/preview/shared'
import { EquestrianPreviewView } from '#/components/equestrian/equestrian-preview-view'
import type { EquestrianContent } from '#/lib/content/equestrian'
import { renderMarkdown } from '#/lib/markdown'

type CmsEntry = Parameters<typeof entryToEquestrianPage>[0]

type EquestrianPreviewProps = PreviewWindowProps & {
  entry: CmsEntry
}

type EquestrianPreviewState = {
  navMenuOpen: boolean
  previewTheme: 'light' | 'dark'
  contentHtml: string
  contentSource: string
  headings: EquestrianContent['headings']
}

type EquestrianPreviewInstance = {
  props: EquestrianPreviewProps
  state: EquestrianPreviewState
  setState: (
    update:
      | Partial<EquestrianPreviewState>
      | ((state: EquestrianPreviewState) => Partial<EquestrianPreviewState>),
  ) => void
  _previewCompileToken?: number
}

function syncPreviewHtml(
  instance: EquestrianPreviewInstance,
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

/** Preview for content/equestrian/page.md */
export const EquestrianPagePreview = createClass({
  getInitialState: function (): EquestrianPreviewState {
    return {
      navMenuOpen: false,
      previewTheme: 'light',
      contentHtml: '',
      contentSource: '',
      headings: [],
    }
  },

  componentDidMount: function (this: EquestrianPreviewInstance) {
    applyPreviewTheme(this)
    const draft = entryToEquestrianPage(this.props.entry)
    syncPreviewHtml(this, draft?.content ?? '')
  },

  componentDidUpdate: function (
    this: EquestrianPreviewInstance,
    _previousProps: EquestrianPreviewProps,
    previousState: EquestrianPreviewState,
  ) {
    if (previousState.previewTheme !== this.state.previewTheme) {
      applyPreviewTheme(this)
    }
    const draft = entryToEquestrianPage(this.props.entry)
    syncPreviewHtml(this, draft?.content ?? '')
  },

  componentWillUnmount: function (this: EquestrianPreviewInstance) {
    clearPreviewTheme(this)
  },

  render: function (this: EquestrianPreviewInstance) {
    const draft = entryToEquestrianPage(this.props.entry)
    const equestrian =
      draft &&
      ({
        ...draft,
        content: this.state.contentHtml,
        headings: this.state.headings,
      } satisfies EquestrianContent)

    return (
      <PreviewLayout instance={this}>
        {equestrian ? (
          <EquestrianPreviewView equestrian={equestrian} />
        ) : (
          <p className="px-5 py-10 font-body text-body text-[#686762] dark:text-[#b3aa99] md:px-10 lg:px-16">
            請先填寫標題，即可預覽馬術介紹頁面。
          </p>
        )}
      </PreviewLayout>
    )
  },
})
