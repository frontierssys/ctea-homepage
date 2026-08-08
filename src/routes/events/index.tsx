import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { EventsIndexView } from '#/components/events/events-index-view'
import {
  getEvents,
  type EventCategoryId,
  type EventFilterTag,
} from '#/lib/content/events'

export const Route = createFileRoute('/events/')({
  loader: () => ({
    events: getEvents(),
  }),
  head: () => ({
    meta: [
      { title: '活動看板｜中華民國馬術協會 CTEA' },
      {
        name: 'description',
        content: '中華民國馬術協會活動看板：賽事、會務、培訓與國際公告。',
      },
    ],
  }),
  component: EventsIndexPage,
})

function EventsIndexPage() {
  const { events } = Route.useLoaderData()
  const [activeCategory, setActiveCategory] = useState<EventCategoryId>('events')
  const [selectedTags, setSelectedTags] = useState<Array<EventFilterTag>>([])

  return (
    <EventsIndexView
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
