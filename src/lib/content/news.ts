import newsJson from '../../../content/news.json'
import type { EventItem } from '#/lib/content/events'
import { getEventById, getEvents } from '#/lib/content/get-events'

export type NewsContent = {
  featuredImage: string
  featuredImageAlt: string
  events: Array<EventItem>
}

const NEWS_COUNT = 4

const FALLBACK_NEWS = {
  featuredImage: '/ctea-4.webp',
  featuredImageAlt: '馬術賽事騎手與黑馬',
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function resolveNewsEvents(ids: unknown): Array<EventItem> {
  const selected = Array.isArray(ids)
    ? ids.flatMap((id) => {
        const event = typeof id === 'string' ? getEventById(id) : undefined
        return event ? [event] : []
      })
    : []

  // ponytail: stale CMS slugs drop out; empty list uses newest events
  return (selected.length ? selected : getEvents()).slice(0, NEWS_COUNT)
}

export function getNews(): NewsContent {
  try {
    const data = newsJson as Partial<{
      featuredImage: string
      featuredImageAlt: string
      eventIds: Array<string>
    }>

    return {
      featuredImage: isNonEmptyString(data.featuredImage)
        ? data.featuredImage
        : FALLBACK_NEWS.featuredImage,
      featuredImageAlt: isNonEmptyString(data.featuredImageAlt)
        ? data.featuredImageAlt
        : FALLBACK_NEWS.featuredImageAlt,
      events: resolveNewsEvents(data.eventIds),
    }
  } catch {
    return {
      ...FALLBACK_NEWS,
      events: resolveNewsEvents(undefined),
    }
  }
}
