import {
  entryToEquestrianPage,
  entryToEquestrianSection,
} from '#/admin/preview/entry-to-equestrian'
import {
  applyPreviewTheme,
  clearPreviewTheme,
  PreviewLayout,
  type PreviewWindowProps,
} from '#/admin/preview/shared'
import { EquestrianPreviewView } from '#/components/equestrian/equestrian-preview-view'
import type {
  EquestrianContent,
  EquestrianSection,
} from '#/lib/content/equestrian'
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
  instance.setState({ contentSource: source, contentHtml: '' })

  if (!source.trim()) return

  renderMarkdown(source).then(({ markup }) => {
    if (instance._previewCompileToken !== token) return
    instance.setState({ contentHtml: markup })
  })
}

/** Preview for content/equestrian-page/page.md (page chrome only). */
export const EquestrianPagePreview = createClass({
  getInitialState: function (): EquestrianPreviewState {
    return {
      navMenuOpen: false,
      previewTheme: 'light',
      contentHtml: '',
      contentSource: '',
    }
  },

  componentDidMount: function (this: EquestrianPreviewInstance) {
    applyPreviewTheme(this)
  },

  componentDidUpdate: function (
    this: EquestrianPreviewInstance,
    _previousProps: EquestrianPreviewProps,
    previousState: EquestrianPreviewState,
  ) {
    if (previousState.previewTheme !== this.state.previewTheme) {
      applyPreviewTheme(this)
    }
  },

  componentWillUnmount: function (this: EquestrianPreviewInstance) {
    clearPreviewTheme(this)
  },

  render: function (this: EquestrianPreviewInstance) {
    const page = entryToEquestrianPage(this.props.entry)
    const equestrian =
      page &&
      ({
        ...page,
        sections: [],
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

/** Preview for content/equestrian/*.md section entries. */
export const EquestrianSectionPreview = createClass({
  getInitialState: function (): EquestrianPreviewState {
    return {
      navMenuOpen: false,
      previewTheme: 'light',
      contentHtml: '',
      contentSource: '',
    }
  },

  componentDidMount: function (this: EquestrianPreviewInstance) {
    applyPreviewTheme(this)
    const draft = entryToEquestrianSection(this.props.entry)
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
    const draft = entryToEquestrianSection(this.props.entry)
    syncPreviewHtml(this, draft?.content ?? '')
  },

  componentWillUnmount: function (this: EquestrianPreviewInstance) {
    clearPreviewTheme(this)
  },

  render: function (this: EquestrianPreviewInstance) {
    const draft = entryToEquestrianSection(this.props.entry)
    const section =
      draft &&
      ({
        ...draft,
        content: this.state.contentHtml,
      } satisfies EquestrianSection)

    const equestrian =
      section &&
      ({
        eyebrow: 'Equestrian',
        title: '馬術介紹',
        lead: '章節預覽',
        sections: [section],
      } satisfies EquestrianContent)

    return (
      <PreviewLayout instance={this}>
        {equestrian ? (
          <EquestrianPreviewView equestrian={equestrian} />
        ) : (
          <p className="px-5 py-10 font-body text-body text-[#686762] dark:text-[#b3aa99] md:px-10 lg:px-16">
            請先填寫章節標題，即可預覽。
          </p>
        )}
      </PreviewLayout>
    )
  },
})
