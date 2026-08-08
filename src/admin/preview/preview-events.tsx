import { entryToEvent } from '#/admin/preview/entry-to-events'
import {
  applyPreviewTheme,
  clearPreviewTheme,
  PreviewLayout,
  type PreviewWindowProps,
} from '#/admin/preview/shared'
import { EventDetailView } from '#/components/events/event-detail-view'

type EventsPreviewProps = PreviewWindowProps & {
  entry: Parameters<typeof entryToEvent>[0]
  getAsset: (path: string) => { url?: string } | undefined
}

type EventsPreviewState = {
  navMenuOpen: boolean
  previewTheme: 'light' | 'dark'
}

type EventsPreviewInstance = {
  props: EventsPreviewProps
  state: EventsPreviewState
  setState: (
    update:
      | Partial<EventsPreviewState>
      | ((state: EventsPreviewState) => Partial<EventsPreviewState>),
  ) => void
}

function getPreviewEvent(instance: EventsPreviewInstance) {
  const { entry, getAsset } = instance.props
  return entryToEvent(entry, { getAsset })
}

export const EventsPreview = createClass({
  getInitialState: function (): EventsPreviewState {
    return {
      navMenuOpen: false,
      previewTheme: 'light',
    }
  },

  componentDidMount: function (this: EventsPreviewInstance) {
    applyPreviewTheme(this)
  },

  componentDidUpdate: function (
    this: EventsPreviewInstance,
    _previousProps: EventsPreviewProps,
    previousState: EventsPreviewState,
  ) {
    if (previousState.previewTheme !== this.state.previewTheme) applyPreviewTheme(this)
  },

  componentWillUnmount: function (this: EventsPreviewInstance) {
    clearPreviewTheme(this)
  },

  render: function (this: EventsPreviewInstance) {
    const event = getPreviewEvent(this)

    return (
      <PreviewLayout instance={this}>
        {event ? (
          <EventDetailView
            event={event}
            onNavigate={(clickEvent) => clickEvent.preventDefault()}
          />
        ) : (
          <p className="px-5 py-10 font-body text-body text-[#686762] dark:text-[#b3aa99] md:px-10 lg:px-16">
            請先填寫標題與分類，即可預覽公告詳情。
          </p>
        )}
      </PreviewLayout>
    )
  },
})
