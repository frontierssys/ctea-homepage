import {
  normalizeAboutMedia,
  type AboutMediaContent,
} from '#/lib/content/about-media'

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

/** Map mission / vision files-collection CMS entry to AboutMediaContent. */
export function entryToAboutMedia(entry: CmsEntry): AboutMediaContent | null {
  return normalizeAboutMedia({
    eyebrow: readData(entry, 'eyebrow'),
    title: readData(entry, 'title'),
    nextLabel: readData(entry, 'nextLabel'),
    nextTo: readData(entry, 'nextTo'),
    image: readData(entry, 'image'),
    imageAlt: readData(entry, 'imageAlt'),
    content: normalizeContent(
      readData(entry, 'content') ?? readData(entry, 'body'),
    ),
  })
}
