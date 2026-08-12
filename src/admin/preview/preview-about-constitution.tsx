import { entryToAboutConstitution } from '#/admin/preview/entry-to-about-constitution'
import {
  applyPreviewTheme,
  clearPreviewTheme,
  PreviewLayout,
  type PreviewWindowProps,
} from '#/admin/preview/shared'
import { AboutConstitutionPreviewView } from '#/components/about/about-constitution-preview-view'
import type { AboutConstitutionContent } from '#/lib/content/about-constitution'
import { renderMarkdown } from '#/lib/markdown'

type AboutConstitutionPreviewProps = PreviewWindowProps & {
  entry: Parameters<typeof entryToAboutConstitution>[0]
}

type AboutConstitutionPreviewState = {
  navMenuOpen: boolean
  previewTheme: 'light' | 'dark'
  contentHtml: string
  contentSource: string
  headings: AboutConstitutionContent['headings']
}

type AboutConstitutionPreviewInstance = {
  props: AboutConstitutionPreviewProps
  state: AboutConstitutionPreviewState
  setState: (
    update:
      | Partial<AboutConstitutionPreviewState>
      | ((
          state: AboutConstitutionPreviewState,
        ) => Partial<AboutConstitutionPreviewState>),
  ) => void
  _previewCompileToken?: number
}

function syncPreviewHtml(
  instance: AboutConstitutionPreviewInstance,
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

/** Preview for content/about/constitution.md — hook-free TOC composition. */
export const AboutConstitutionPreview = createClass({
  getInitialState: function (): AboutConstitutionPreviewState {
    return {
      navMenuOpen: false,
      previewTheme: 'light',
      contentHtml: '',
      contentSource: '',
      headings: [],
    }
  },

  componentDidMount: function (this: AboutConstitutionPreviewInstance) {
    applyPreviewTheme(this)
    const draft = entryToAboutConstitution(this.props.entry)
    syncPreviewHtml(this, draft?.content ?? '')
  },

  componentDidUpdate: function (
    this: AboutConstitutionPreviewInstance,
    _previousProps: AboutConstitutionPreviewProps,
    previousState: AboutConstitutionPreviewState,
  ) {
    if (previousState.previewTheme !== this.state.previewTheme) {
      applyPreviewTheme(this)
    }
    const draft = entryToAboutConstitution(this.props.entry)
    syncPreviewHtml(this, draft?.content ?? '')
  },

  componentWillUnmount: function (this: AboutConstitutionPreviewInstance) {
    clearPreviewTheme(this)
  },

  render: function (this: AboutConstitutionPreviewInstance) {
    const draft = entryToAboutConstitution(this.props.entry)
    const page =
      draft &&
      ({
        ...draft,
        content: this.state.contentHtml,
        headings: this.state.headings,
      } satisfies AboutConstitutionContent)

    return (
      <PreviewLayout instance={this}>
        {page ? (
          <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
            <AboutConstitutionPreviewView page={page} />
          </div>
        ) : (
          <p className="px-5 py-10 font-body text-body text-[#686762] dark:text-[#b3aa99] md:px-10 lg:px-16">
            請先填寫標題，即可預覽組織章程頁面。
          </p>
        )}
      </PreviewLayout>
    )
  },
})
