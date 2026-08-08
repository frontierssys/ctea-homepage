import eventPageJson from '../../../content/event.json'

export type EventPageContent = {
  eyebrow: string
  title: string
  description: string
}

export const DEFAULT_EVENT_PAGE: EventPageContent = {
  eyebrow: 'Announcements',
  title: '活動看板',
  description: '依分類與標籤篩選協會公告，掌握賽事、會務、培訓與國際資訊。',
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

export function normalizeEventPage(value: unknown): EventPageContent {
  if (!value || typeof value !== 'object') return DEFAULT_EVENT_PAGE
  const data = value as Record<string, unknown>

  return {
    eyebrow: isNonEmptyString(data.eyebrow)
      ? data.eyebrow.trim()
      : DEFAULT_EVENT_PAGE.eyebrow,
    title: isNonEmptyString(data.title) ? data.title.trim() : DEFAULT_EVENT_PAGE.title,
    description: isNonEmptyString(data.description)
      ? data.description.trim()
      : DEFAULT_EVENT_PAGE.description,
  }
}

export function getEventPage(): EventPageContent {
  try {
    return normalizeEventPage(eventPageJson)
  } catch {
    return DEFAULT_EVENT_PAGE
  }
}
