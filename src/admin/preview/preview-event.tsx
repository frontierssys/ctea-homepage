import { entryToEventPage } from '#/admin/preview/entry-to-event-page'
import {
  applyPreviewTheme,
  clearPreviewTheme,
  PreviewLayout,
  type PreviewWindowProps,
} from '#/admin/preview/shared'
import { EventsIndexView } from '#/components/events/events-index-view'
import {
  getEvents,
  type EventCategoryId,
  type EventFilterTag,
} from '#/lib/content/events'

type EventPreviewProps = PreviewWindowProps & {
  entry: Parameters<typeof entryToEventPage>[0]
}

type EventPreviewState = {
  navMenuOpen: boolean
  previewTheme: 'light' | 'dark'
  activeCategory: EventCategoryId
  selectedTags: Array<EventFilterTag>
}

type EventPreviewInstance = {
  props: EventPreviewProps
  state: EventPreviewState
  setState: (
    update:
      | Partial<EventPreviewState>
      | ((state: EventPreviewState) => Partial<EventPreviewState>),
  ) => void
}

export const EventPreview = createClass({
  getInitialState: function (): EventPreviewState {
    return {
      navMenuOpen: false,
      previewTheme: 'light',
      activeCategory: 'events',
      selectedTags: [],
    }
  },

  componentDidMount: function (this: EventPreviewInstance) {
    applyPreviewTheme(this)
  },

  componentDidUpdate: function (
    this: EventPreviewInstance,
    _previousProps: EventPreviewProps,
    previousState: EventPreviewState,
  ) {
    if (previousState.previewTheme !== this.state.previewTheme) applyPreviewTheme(this)
  },

  componentWillUnmount: function (this: EventPreviewInstance) {
    clearPreviewTheme(this)
  },

  render: function (this: EventPreviewInstance) {
    const page = entryToEventPage(this.props.entry)
    const { activeCategory, selectedTags } = this.state

    return (
      <PreviewLayout instance={this}>
        <EventsIndexView
          page={page}
          events={getEvents()}
          activeCategory={activeCategory}
          selectedTags={selectedTags}
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
          onNavigate={(clickEvent) => clickEvent.preventDefault()}
        />
      </PreviewLayout>
    )
  },
})
