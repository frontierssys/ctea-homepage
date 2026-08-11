import {
  normalizeEquestrianPage,
  normalizeEquestrianSection,
  type EquestrianContent,
  type EquestrianSection,
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

function readSlug(entry: CmsEntry) {
  if (typeof entry.get === 'function') {
    const slug = entry.get('slug')
    if (isNonEmptyString(slug)) return slug.trim()
  }
  const slug = entry.getIn(['slug'])
  return isNonEmptyString(slug) ? slug.trim() : ''
}

function normalizeContent(value: unknown) {
  if (isNonEmptyString(value)) return value
  if (value && typeof value === 'object' && 'toString' in value) {
    const text = String(value)
    return text === '[object Object]' ? '' : text
  }
  return ''
}

/** Map the equestrian page files-collection entry. */
export function entryToEquestrianPage(
  entry: CmsEntry,
): Pick<EquestrianContent, 'eyebrow' | 'title' | 'lead'> | null {
  return normalizeEquestrianPage({
    eyebrow: readData(entry, 'eyebrow'),
    title: readData(entry, 'title'),
    lead: readData(entry, 'lead'),
  })
}

/** Map an equestrian section folder-collection entry (Markdown body). */
export function entryToEquestrianSection(
  entry: CmsEntry,
): EquestrianSection | null {
  return normalizeEquestrianSection({
    id: readSlug(entry),
    order: readData(entry, 'order'),
    eyebrow: readData(entry, 'eyebrow'),
    title: readData(entry, 'title'),
    content: normalizeContent(
      readData(entry, 'content') ?? readData(entry, 'body'),
    ),
  })
}
