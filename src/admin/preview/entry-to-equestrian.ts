import {
  normalizeEquestrianPage,
  type EquestrianContent,
} from '#/lib/content/equestrian'

type CmsEntry = {
  get?: (key: string) => unknown
  getIn: (path: string[]) => unknown
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function readData(entry: CmsEntry, key: string) {
  return entry.getIn(['data', key])
}

function normalizeContent(value: unknown) {
  if (isNonEmptyString(value)) return value
  if (value && typeof value === 'object' && 'toString' in value) {
    const text = String(value)
    return text === '[object Object]' ? '' : text
  }
  return ''
}

/** Map the equestrian files-collection entry (content/equestrian/page.md). */
export function entryToEquestrianPage(
  entry: CmsEntry,
): EquestrianContent | null {
  return normalizeEquestrianPage({
    eyebrow: readData(entry, 'eyebrow'),
    title: readData(entry, 'title'),
    lead: readData(entry, 'lead'),
    content: normalizeContent(
      readData(entry, 'content') ?? readData(entry, 'body'),
    ),
    headings: [],
  })
}
