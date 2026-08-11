import {
  allEquestrianPages,
  allEquestrianSections,
} from '../../../.content-collections/generated'
import type { EquestrianContent } from '#/lib/content/equestrian'

export function getEquestrian(): EquestrianContent {
  const page = allEquestrianPages[0]
  if (!page) {
    throw new Error('Missing content/equestrian-page/page.md')
  }

  const sections = [...allEquestrianSections].sort((a, b) => a.order - b.order)

  if (sections.length === 0) {
    throw new Error('Missing content/equestrian/*.md sections')
  }

  return {
    eyebrow: page.eyebrow,
    title: page.title,
    lead: page.lead,
    sections: sections.map((section) => ({
      id: section.id,
      order: section.order,
      eyebrow: section.eyebrow,
      title: section.title,
      content: section.content,
    })),
  }
}
