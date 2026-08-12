import { allRegulationPages } from '../../../.content-collections/generated'
import {
  REGULATION_PAGE_IDS,
  type RegulationPage,
  type RegulationPageId,
} from '#/lib/content/regulation'

export function getRegulationPages(): Array<RegulationPage> {
  return [...allRegulationPages]
    .map(
      (page): RegulationPage => ({
        id: page.id,
        order: page.order,
        eyebrow: page.eyebrow,
        title: page.title,
        lead: page.lead,
        downloads: page.downloads,
        content: page.content,
        headings: page.headings,
      }),
    )
    .sort((a, b) => a.order - b.order)
}

export function getRegulationPage(pageId: string): RegulationPage | null {
  if (!REGULATION_PAGE_IDS.includes(pageId as RegulationPageId)) {
    return null
  }
  return (
    getRegulationPages().find((page) => page.id === pageId) ?? null
  )
}
