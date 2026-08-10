import { z } from 'zod'
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

const nonEmptyTrimmed = z.string().trim().min(1)

const eventPageSchema = z.object({
  eyebrow: nonEmptyTrimmed.catch(DEFAULT_EVENT_PAGE.eyebrow),
  title: nonEmptyTrimmed.catch(DEFAULT_EVENT_PAGE.title),
  description: nonEmptyTrimmed.catch(DEFAULT_EVENT_PAGE.description),
})

export function normalizeEventPage(value: unknown): EventPageContent {
  const parsed = eventPageSchema.safeParse(
    value && typeof value === 'object' ? value : {},
  )
  return parsed.success ? parsed.data : DEFAULT_EVENT_PAGE
}

export function getEventPage(): EventPageContent {
  try {
    return normalizeEventPage(eventPageJson)
  } catch {
    return DEFAULT_EVENT_PAGE
  }
}
