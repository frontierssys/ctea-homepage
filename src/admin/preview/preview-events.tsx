import { entryToEvent } from '#/admin/preview/entry-to-events'
import {
  applyPreviewTheme,
  clearPreviewTheme,
  PreviewLayout,
  type PreviewWindowProps,
} from '#/admin/preview/shared'
import { EventDetailView } from '#/components/events/event-detail-view'
import type { EventItem } from '#/lib/content/events'
import { renderMarkdown } from '#/lib/markdown'

type EventsPreviewProps = PreviewWindowProps & {
  entry: Parameters<typeof entryToEvent>[0]
  getAsset: (path: string) => { url?: string } | undefined
}

type EventsPreviewState = {
  navMenuOpen: boolean
  previewTheme: 'light' | 'dark'
  contentHtml: string
  contentSource: string
}

type EventsPreviewInstance = {
  props: EventsPreviewProps
  state: EventsPreviewState
  setState: (
    update:
      | Partial<EventsPreviewState>
      | ((state: EventsPreviewState) => Partial<EventsPreviewState>),
  ) => void
  _previewCompileToken?: number
}

function getPreviewDraft(instance: EventsPreviewInstance) {
  const { entry, getAsset } = instance.props
  return entryToEvent(entry, { getAsset })
}

function syncPreviewHtml(instance: EventsPreviewInstance, draft: EventItem | null) {
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

export const EventsPreview = createClass({
  getInitialState: function (): EventsPreviewState {
    return {
      navMenuOpen: false,
      previewTheme: 'light',
      contentHtml: '',
      contentSource: '',
    }
  },

  componentDidMount: function (this: EventsPreviewInstance) {
    applyPreviewTheme(this)
    syncPreviewHtml(this, getPreviewDraft(this))
  },

  componentDidUpdate: function (
    this: EventsPreviewInstance,
    _previousProps: EventsPreviewProps,
    previousState: EventsPreviewState,
  ) {
    if (previousState.previewTheme !== this.state.previewTheme) applyPreviewTheme(this)
    syncPreviewHtml(this, getPreviewDraft(this))
  },

  componentWillUnmount: function (this: EventsPreviewInstance) {
    clearPreviewTheme(this)
  },

  render: function (this: EventsPreviewInstance) {
    const draft = getPreviewDraft(this)
    const event =
      draft &&
      ({
        ...draft,
        content: this.state.contentHtml,
      } satisfies EventItem)

    return (
      <PreviewLayout instance={this}>
        {event ? (
          <EventDetailView event={event} />
        ) : (
          <p className="px-5 py-10 font-body text-body text-[#686762] dark:text-[#b3aa99] md:px-10 lg:px-16">
            請先填寫標題與分類，即可預覽公告詳情。
          </p>
        )}
      </PreviewLayout>
    )
  },
})
