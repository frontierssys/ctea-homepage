import {
  normalizeRegulationPage,
  type RegulationPage,
} from '#/lib/content/regulation'

type CmsEntry = {
  get?: (key: string) => unknown
  getIn: (path: string[]) => unknown
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

function readData(entry: CmsEntry, key: string) {
  return entry.getIn(['data', key])
}

function readSlug(entry: CmsEntry) {
  if (typeof entry.get === 'function') {
    const slug = entry.get('slug')
    if (isNonEmptyString(slug)) return slug.trim()
  }
  const slug = entry.getIn(['slug'])
  return isNonEmptyString(slug) ? slug.trim() : ''
}

function readMapField(value: unknown, key: string) {
  if (
    value &&
    typeof value === 'object' &&
    'get' in value &&
    typeof value.get === 'function'
  ) {
    return value.get(key)
  }
  const plain = toPlainObject(value)
  return plain?.[key]
}

function normalizeContent(value: unknown) {
  if (isNonEmptyString(value)) return value
  if (value && typeof value === 'object' && 'toString' in value) {
    const text = String(value)
    return text === '[object Object]' ? '' : text
  }
  return ''
}

/** Map a regulation files-collection entry (fei / domestic / training / downloads). */
export function entryToRegulationPage(entry: CmsEntry): RegulationPage | null {
  const downloads = toArray(readData(entry, 'downloads')).map((item) => {
    const plain = toPlainObject(item) ?? {}
    return {
      name: readMapField(item, 'name') ?? plain.name,
      url: readMapField(item, 'url') ?? plain.url,
      format: readMapField(item, 'format') ?? plain.format,
      source: readMapField(item, 'source') ?? plain.source,
    }
  })

  return normalizeRegulationPage({
    id: readSlug(entry),
    order: readData(entry, 'order'),
    eyebrow: readData(entry, 'eyebrow'),
    title: readData(entry, 'title'),
    lead: readData(entry, 'lead'),
    downloads,
    content: normalizeContent(
      readData(entry, 'content') ?? readData(entry, 'body'),
    ),
    headings: [],
  })
}
