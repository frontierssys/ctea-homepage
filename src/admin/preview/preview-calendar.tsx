import { entryToEquestrianPage } from '#/admin/preview/entry-to-equestrian'
import {
  applyPreviewTheme,
  clearPreviewTheme,
  PreviewLayout,
  type PreviewWindowProps,
} from '#/admin/preview/shared'
import { CalendarPageView } from '#/components/calendar/calendar-page-view'
import { renderMarkdown } from '#/lib/markdown'

type CmsEntry = Parameters<typeof entryToEquestrianPage>[0]

type CalendarPreviewProps = PreviewWindowProps & {
  entry: CmsEntry
}

type CalendarPreviewState = {
  navMenuOpen: boolean
  previewTheme: 'light' | 'dark'
  contentHtml: string
  contentSource: string
}

type CalendarPreviewInstance = {
  props: CalendarPreviewProps
  state: CalendarPreviewState
  setState: (
    update:
      | Partial<CalendarPreviewState>
      | ((state: CalendarPreviewState) => Partial<CalendarPreviewState>),
  ) => void
  _previewCompileToken?: number
}

function syncPreviewHtml(instance: CalendarPreviewInstance, source: string) {
  if (source === instance.state.contentSource) return

  const token = (instance._previewCompileToken ?? 0) + 1
  instance._previewCompileToken = token
  instance.setState({
    contentSource: source,
    contentHtml: '',
  })

  if (!source.trim()) return

  renderMarkdown(source).then(({ markup }) => {
    if (instance._previewCompileToken !== token) return
    instance.setState({ contentHtml: markup })
  })
}

/** Preview for content/calendar/page.md */
export const CalendarPagePreview = createClass({
  getInitialState: function (): CalendarPreviewState {
    return {
      navMenuOpen: false,
      previewTheme: 'light',
      contentHtml: '',
      contentSource: '',
    }
  },

  componentDidMount: function (this: CalendarPreviewInstance) {
    applyPreviewTheme(this)
    const draft = entryToEquestrianPage(this.props.entry)
    syncPreviewHtml(this, draft?.content ?? '')
  },

  componentDidUpdate: function (
    this: CalendarPreviewInstance,
    _previousProps: CalendarPreviewProps,
    previousState: CalendarPreviewState,
  ) {
    if (previousState.previewTheme !== this.state.previewTheme) {
      applyPreviewTheme(this)
    }
    const draft = entryToEquestrianPage(this.props.entry)
    syncPreviewHtml(this, draft?.content ?? '')
  },

  componentWillUnmount: function (this: CalendarPreviewInstance) {
    clearPreviewTheme(this)
  },

  render: function (this: CalendarPreviewInstance) {
    const draft = entryToEquestrianPage(this.props.entry)

    return (
      <PreviewLayout instance={this}>
        {draft ? (
          <CalendarPageView
            page={{ ...draft, content: this.state.contentHtml }}
          />
        ) : (
          <p className="px-5 py-10 font-body text-body text-[#686762] dark:text-[#b3aa99] md:px-10 lg:px-16">
            請先填寫標題，即可預覽行事曆頁面。
          </p>
        )}
      </PreviewLayout>
    )
  },
})
