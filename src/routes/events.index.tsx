import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { EventsIndexView } from '#/components/events/events-index-view'
import { getEventPage } from '#/lib/content/event-page'
import {
  getEvents,
  type EventCategoryId,
  type EventFilterTag,
} from '#/lib/content/events'

export const Route = createFileRoute('/events/')({
  loader: () => ({
    page: getEventPage(),
    events: getEvents(),
  }),
  head: () => {
    const page = getEventPage()
    return {
      meta: [
        { title: `${page.title}｜中華民國馬術協會 CTEA` },
        {
          name: 'description',
          content: page.description,
        },
      ],
    }
  },
  component: EventsIndexPage,
})

function EventsIndexPage() {
  const { page, events } = Route.useLoaderData()
  const [activeCategory, setActiveCategory] = useState<EventCategoryId>('events')
  const [selectedTags, setSelectedTags] = useState<Array<EventFilterTag>>([])

  return (
    <EventsIndexView
      page={page}
      events={events}
      activeCategory={activeCategory}
      selectedTags={selectedTags}
      onCategoryChange={(category) => {
        setActiveCategory(category)
        setSelectedTags([])
      }}
      onToggleTag={(tag) => {
        setSelectedTags((current) =>
          current.includes(tag)
            ? current.filter((selectedTag) => selectedTag !== tag)
            : [...current, tag],
        )
      }}
    />
  )
}
