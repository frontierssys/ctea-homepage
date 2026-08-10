import { normalizeEvent, type EventItem } from '#/lib/content/events'

type CmsEntry = {
  get?: (key: string) => unknown
  getIn: (path: string[]) => unknown
}

type CmsAsset = {
  url?: string
}

type CmsFieldMap =
  | { get: (key: string) => unknown; toJS?: () => unknown }
  | Record<string, unknown>
  | null
  | undefined

type CmsList = {
  toArray?: () => unknown[]
  toJS?: () => unknown
}

type EntryToEventOptions = {
  getAsset?: (path: string) => CmsAsset | undefined
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function toArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value
  if (!value || typeof value !== 'object') return []

  const list = value as CmsList
  if (typeof list.toArray === 'function') return list.toArray()

  if (typeof list.toJS === 'function') {
    const plainValue = list.toJS()
    return Array.isArray(plainValue) ? plainValue : []
  }

  return []
}

function readData(entry: CmsEntry, key: string) {
  return entry.getIn(['data', key])
}

function toPlainObject(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object') return null

  const maybeMap = value as CmsFieldMap
  if (
    maybeMap &&
    typeof maybeMap === 'object' &&
    'toJS' in maybeMap &&
    typeof maybeMap.toJS === 'function'
  ) {
    const plain = maybeMap.toJS()
    return plain && typeof plain === 'object' && !Array.isArray(plain)
      ? (plain as Record<string, unknown>)
      : null
  }

  if (Array.isArray(value)) return null
  return value as Record<string, unknown>
}

function resolveAssetPath(
  value: unknown,
  getAsset?: EntryToEventOptions['getAsset'],
) {
  if (!isNonEmptyString(value)) return '#'
  return getAsset?.(value)?.url ?? value
}

function normalizeDate(value: unknown) {
  if (isNonEmptyString(value)) return value.trim().slice(0, 10)
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10)
  }
  return ''
}

function normalizeContent(value: unknown) {
  if (isNonEmptyString(value)) return value
  if (value && typeof value === 'object' && 'toString' in value) {
    const text = String(value)
    return text === '[object Object]' ? '' : text
  }
  return ''
}

function readEntrySlug(entry: CmsEntry) {
  if (typeof entry.get === 'function') {
    const slug = entry.get('slug')
    if (isNonEmptyString(slug)) return slug.trim()
  }
  const slug = entry.getIn(['slug'])
  return isNonEmptyString(slug) ? slug.trim() : ''
}

/** Map a folder-collection CMS entry to a single EventItem. */
export function entryToEvent(
  entry: CmsEntry,
  options: EntryToEventOptions = {},
): EventItem | null {
  const attachments = toArray(readData(entry, 'attachments')).map((attachmentValue) => {
    const attachment = toPlainObject(attachmentValue) ?? {}
    const urlValue =
      (attachmentValue &&
      typeof attachmentValue === 'object' &&
      'get' in attachmentValue &&
      typeof attachmentValue.get === 'function'
        ? attachmentValue.get('url')
        : undefined) ?? attachment.url

    return {
      name:
        (attachmentValue &&
        typeof attachmentValue === 'object' &&
        'get' in attachmentValue &&
        typeof attachmentValue.get === 'function'
          ? attachmentValue.get('name')
          : undefined) ?? attachment.name,
      url: resolveAssetPath(urlValue, options.getAsset),
      size:
        (attachmentValue &&
        typeof attachmentValue === 'object' &&
        'get' in attachmentValue &&
        typeof attachmentValue.get === 'function'
          ? attachmentValue.get('size')
          : undefined) ?? attachment.size,
    }
  })

  return normalizeEvent(
    {
      title: readData(entry, 'title'),
      category: readData(entry, 'category'),
      tags: toArray(readData(entry, 'tags')),
      date: normalizeDate(readData(entry, 'date')),
      author: readData(entry, 'author'),
      excerpt: readData(entry, 'excerpt'),
      content: normalizeContent(
        readData(entry, 'content') ?? readData(entry, 'body'),
      ),
      attachments,
    },
    readEntrySlug(entry),
  )
}
