import { parseEventItems, type EventItem } from '#/lib/content/events'

type CmsEntry = {
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

type EntryToEventsOptions = {
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

function readField(item: CmsFieldMap, key: string) {
  if (!item || typeof item !== 'object') return undefined
  if ('get' in item && typeof item.get === 'function') return item.get(key)
  return (item as Record<string, unknown>)[key]
}

function toPlainObject(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object') return null

  const maybeMap = value as CmsFieldMap
  if (maybeMap && typeof maybeMap === 'object' && 'toJS' in maybeMap && typeof maybeMap.toJS === 'function') {
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
  getAsset?: EntryToEventsOptions['getAsset'],
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

export function entryToEvents(
  entry: CmsEntry,
  options: EntryToEventsOptions = {},
): Array<EventItem> {
  const rawItems = toArray(entry.getIn(['data', 'items']))

  const plainItems = rawItems.map((value) => {
    const item = toPlainObject(value) ?? {}
    const tags = toArray(readField(value as CmsFieldMap, 'tags') ?? item.tags)
    const attachments = toArray(
      readField(value as CmsFieldMap, 'attachments') ?? item.attachments,
    ).map((attachmentValue) => {
      const attachment = toPlainObject(attachmentValue) ?? {}
      const urlValue = readField(attachmentValue as CmsFieldMap, 'url') ?? attachment.url

      return {
        name: readField(attachmentValue as CmsFieldMap, 'name') ?? attachment.name,
        url: resolveAssetPath(urlValue, options.getAsset),
        size: readField(attachmentValue as CmsFieldMap, 'size') ?? attachment.size,
      }
    })

    return {
      id: readField(value as CmsFieldMap, 'id') ?? item.id,
      title: readField(value as CmsFieldMap, 'title') ?? item.title,
      category: readField(value as CmsFieldMap, 'category') ?? item.category,
      tags,
      date: normalizeDate(readField(value as CmsFieldMap, 'date') ?? item.date),
      author: readField(value as CmsFieldMap, 'author') ?? item.author,
      excerpt: readField(value as CmsFieldMap, 'excerpt') ?? item.excerpt,
      content: normalizeContent(readField(value as CmsFieldMap, 'content') ?? item.content),
      attachments,
    }
  })

  return parseEventItems(plainItems)
}
