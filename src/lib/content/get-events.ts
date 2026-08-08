import { allEvents } from '../../../.content-collections/generated'
import { isFilterTag, type EventItem } from '#/lib/content/events'

function compareEventsByDateDesc(a: EventItem, b: EventItem) {
  return b.date.localeCompare(a.date) || a.id.localeCompare(b.id)
}

function toEventItem(document: (typeof allEvents)[number]): EventItem {
  return {
    id: document.id,
    title: document.title,
    category: document.category,
    tags: document.tags.filter(isFilterTag),
    date: document.date,
    author: document.author,
    ...(document.excerpt ? { excerpt: document.excerpt } : {}),
    content: document.content,
    attachments: document.attachments.map((attachment) => ({
      name: attachment.name,
      url: attachment.url,
      ...(attachment.size ? { size: attachment.size } : {}),
    })),
  }
}

export function getEvents(): Array<EventItem> {
  return allEvents.map(toEventItem).sort(compareEventsByDateDesc)
}

export function getEventById(eventId: string): EventItem | undefined {
  return getEvents().find((item) => item.id === eventId)
}
