import {
  normalizeAboutConstitution,
  type AboutConstitutionContent,
} from '#/lib/content/about-constitution'

type CmsEntry = {
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

/** Map constitution files-collection CMS entry (Markdown body). */
export function entryToAboutConstitution(
  entry: CmsEntry,
): AboutConstitutionContent | null {
  return normalizeAboutConstitution({
    eyebrow: readData(entry, 'eyebrow'),
    title: readData(entry, 'title'),
    nextLabel: readData(entry, 'nextLabel'),
    nextTo: readData(entry, 'nextTo'),
    content: normalizeContent(
      readData(entry, 'content') ?? readData(entry, 'body'),
    ),
    headings: [],
  })
}
