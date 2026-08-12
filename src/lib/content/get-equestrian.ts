import { allEquestrianPages } from '../../../.content-collections/generated'
import type { EquestrianContent } from '#/lib/content/equestrian'

export function getEquestrian(): EquestrianContent {
  const page = allEquestrianPages[0]
  if (!page) {
    throw new Error('Missing content/equestrian/page.md')
  }

  return {
    eyebrow: page.eyebrow,
    title: page.title,
    lead: page.lead,
    content: page.content,
    headings: page.headings,
  }
}
