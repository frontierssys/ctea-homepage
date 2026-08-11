import { z } from 'zod'

const equestrianSectionDocumentSchema = z.object({
  order: z.coerce.number().int().nonnegative(),
  eyebrow: z.string().trim().min(1),
  title: z.string().trim().min(1),
  content: z.string().default(''),
})

/** Strict parse for content/equestrian/*.md front matter. */
export const equestrianSectionSchema = equestrianSectionDocumentSchema

/** Strict parse for content/equestrian.md front matter. */
export const equestrianPageDocumentSchema = z.object({
  eyebrow: z.string().trim().min(1),
  title: z.string().trim().min(1),
  lead: z.string().trim().min(1),
  content: z.string().default(''),
})

export type EquestrianSection = {
  id: string
  order: number
  eyebrow: string
  title: string
  /** HTML on the site (content-collections); Markdown in live CMS drafts. */
  content: string
}

export type EquestrianContent = {
  eyebrow: string
  title: string
  lead: string
  sections: Array<EquestrianSection>
}

const DEFAULT_EQUESTRIAN_PAGE = {
  eyebrow: 'Equestrian',
  title: '馬術介紹',
  lead: '從國內發展、運動起源、競賽項目、騎乘裝備、入門基礎到專家觀點與騎馬益處，認識中華民國馬術協會所推廣的馬術運動。',
}

/** Normalize CMS / raw draft page fields (lenient for live preview). */
export function normalizeEquestrianPage(
  value: unknown,
): Pick<EquestrianContent, 'eyebrow' | 'title' | 'lead'> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null

  const raw = value as Record<string, unknown>
  const title = typeof raw.title === 'string' ? raw.title.trim() : ''
  if (!title) return null

  return {
    eyebrow:
      typeof raw.eyebrow === 'string' && raw.eyebrow.trim()
        ? raw.eyebrow.trim()
        : DEFAULT_EQUESTRIAN_PAGE.eyebrow,
    title,
    lead:
      typeof raw.lead === 'string' && raw.lead.trim()
        ? raw.lead.trim()
        : DEFAULT_EQUESTRIAN_PAGE.lead,
  }
}

/** Normalize a CMS / raw draft section (lenient for live preview). */
export function normalizeEquestrianSection(
  value: unknown,
): EquestrianSection | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null

  const raw = value as Record<string, unknown>
  const title = typeof raw.title === 'string' ? raw.title.trim() : ''
  const id = typeof raw.id === 'string' ? raw.id.trim() : ''
  if (!id || !title) return null

  const orderRaw = raw.order
  const order =
    typeof orderRaw === 'number' && Number.isFinite(orderRaw)
      ? orderRaw
      : typeof orderRaw === 'string' && orderRaw.trim()
        ? Number(orderRaw)
        : 0

  return {
    id,
    order: Number.isFinite(order) ? order : 0,
    eyebrow:
      typeof raw.eyebrow === 'string' && raw.eyebrow.trim()
        ? raw.eyebrow.trim()
        : 'Section',
    title,
    content:
      typeof raw.content === 'string' && raw.content.trim() ? raw.content : '',
  }
}
