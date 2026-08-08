import { entryToEvents } from '#/admin/entry-to-events'
import {
  applyPreviewTheme,
  clearPreviewTheme,
  PreviewChrome,
  type PreviewWindowProps,
} from '#/admin/preview-shared'
import { EventDetailView } from '#/components/events/event-detail-view'
import { EventsIndexView } from '#/components/events/events-index-view'
import type { EventCategoryId, EventFilterTag, EventItem } from '#/lib/content/events'

type EventsPreviewProps = PreviewWindowProps & {
  entry: Parameters<typeof entryToEvents>[0]
  getAsset: (path: string) => { url?: string } | undefined
}

type EventsPreviewState = {
  activeCategory: EventCategoryId
  selectedTags: Array<EventFilterTag>
  selectedEventId: string | null
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

function getPreviewEvents(instance: EventsPreviewInstance) {
  const { entry, getAsset } = instance.props
  return entryToEvents(entry, { getAsset })
}

export const EventsPreview = createClass({
  getInitialState: function (): EventsPreviewState {
    return {
      activeCategory: 'events',
      selectedTags: [],
      selectedEventId: null,
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

    const events = getPreviewEvents(this)
    if (
      this.state.selectedEventId &&
      !events.some((event) => event.id === this.state.selectedEventId)
    ) {
      this.setState({ selectedEventId: null })
    }
  },

  componentWillUnmount: function (this: EventsPreviewInstance) {
    clearPreviewTheme(this)
  },

  render: function (this: EventsPreviewInstance) {
    const events = getPreviewEvents(this)
    const selectedEvent: EventItem | undefined = this.state.selectedEventId
      ? events.find((event) => event.id === this.state.selectedEventId)
      : undefined

    return (
      <PreviewChrome instance={this}>
        {selectedEvent ? (
          <EventDetailView
            event={selectedEvent}
            onBack={() => this.setState({ selectedEventId: null })}
            onNavigate={(event) => event.preventDefault()}
          />
        ) : (
          <EventsIndexView
            events={events}
            activeCategory={this.state.activeCategory}
            selectedTags={this.state.selectedTags}
            onCategoryChange={(category) => {
              this.setState({ activeCategory: category, selectedTags: [] })
            }}
            onToggleTag={(tag) => {
              this.setState((state) => ({
                selectedTags: state.selectedTags.includes(tag)
                  ? state.selectedTags.filter((selectedTag) => selectedTag !== tag)
                  : [...state.selectedTags, tag],
              }))
            }}
            onSelectEvent={(eventId) => this.setState({ selectedEventId: eventId })}
          />
        )}
      </PreviewChrome>
    )
  },
})
