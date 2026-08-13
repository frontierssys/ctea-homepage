import { normalizeFooter, type FooterContent } from '#/lib/content/footer'

type CmsEntry = {
  getIn: (path: string[]) => unknown
}

function dataToPlain(entry: CmsEntry): unknown {
  const data = entry.getIn(['data'])
  if (data && typeof data === 'object' && 'toJS' in data) {
    const toJS = (data as { toJS?: () => unknown }).toJS
    if (typeof toJS === 'function') return toJS.call(data)
  }
  return data
}

/** Map the `footer` CMS file entry to SiteFooter props. */
export function entryToFooter(entry: CmsEntry): FooterContent {
  return normalizeFooter(dataToPlain(entry))
}
