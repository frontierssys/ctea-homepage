import { entryToEvents } from '#/admin/preview/entry-to-events'
import {
  applyPreviewTheme,
  clearPreviewTheme,
  PreviewLayout,
  type PreviewWindowProps,
} from '#/admin/preview/shared'
import { EventsIndexView } from '#/components/events/events-index-view'
import type { EventCategoryId, EventFilterTag } from '#/lib/content/events'

type EventsPreviewProps = PreviewWindowProps & {
  entry: Parameters<typeof entryToEvents>[0]
  getAsset: (path: string) => { url?: string } | undefined
}

type EventsPreviewState = {
  activeCategory: EventCategoryId
  selectedTags: Array<EventFilterTag>
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
    return (
      <PreviewLayout instance={this}>
        <EventsIndexView
          events={getPreviewEvents(this)}
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
        />
      </PreviewLayout>
    )
  },
})
