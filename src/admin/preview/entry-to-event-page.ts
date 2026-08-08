import {
  normalizeEventPage,
  type EventPageContent,
} from '#/lib/content/event-page'

type CmsEntry = {
  getIn: (path: string[]) => unknown
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function readData(entry: CmsEntry, key: string) {
  return entry.getIn(['data', key])
}

function asText(value: unknown) {
  if (isNonEmptyString(value)) return value.trim()
  if (value && typeof value === 'object' && 'toString' in value) {
    const text = String(value)
    return text === '[object Object]' ? '' : text.trim()
  }
  return ''
}

/** Map the singular `event` CMS file entry to EventsIndexView page chrome. */
export function entryToEventPage(entry: CmsEntry): EventPageContent {
  return normalizeEventPage({
    eyebrow: asText(readData(entry, 'eyebrow')),
    title: asText(readData(entry, 'title')),
    description: asText(readData(entry, 'description')),
  })
}
