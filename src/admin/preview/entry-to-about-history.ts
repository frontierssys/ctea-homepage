import {
  normalizeAboutHistory,
  type AboutHistoryContent,
} from '#/lib/content/about-history'

type CmsEntry = {
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

/** Map a files-collection CMS entry to AboutHistoryContent (Markdown body). */
export function entryToAboutHistory(entry: CmsEntry): AboutHistoryContent | null {
  const timeline = toArray(readData(entry, 'timeline')).map((item) => {
    const plain = toPlainObject(item) ?? {}
    return {
      year: readMapField(item, 'year') ?? plain.year,
      title: readMapField(item, 'title') ?? plain.title,
      description: readMapField(item, 'description') ?? plain.description,
    }
  })

  return normalizeAboutHistory({
    eyebrow: readData(entry, 'eyebrow'),
    title: readData(entry, 'title'),
    nextLabel: readData(entry, 'nextLabel'),
    nextTo: readData(entry, 'nextTo'),
    timeline,
    content: normalizeContent(
      readData(entry, 'content') ?? readData(entry, 'body'),
    ),
  })
}
