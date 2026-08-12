import { allAboutConstitutions } from '../../../.content-collections/generated'
import type { AboutConstitutionContent } from '#/lib/content/about-constitution'

export function getAboutConstitution(): AboutConstitutionContent {
  const document = allAboutConstitutions[0]
  if (!document) {
    throw new Error('Missing content/about/constitution.md')
  }

  return {
    eyebrow: document.eyebrow,
    title: document.title,
    nextLabel: document.nextLabel,
    nextTo: document.nextTo,
    content: document.content,
    headings: document.headings,
  }
}
