import { z } from 'zod'
import type { TocHeading } from '#/lib/content/toc'

/** Page front matter — content/equestrian/page.md */
export const equestrianPageDocumentSchema = z.object({
  eyebrow: z.string().trim().min(1),
  title: z.string().trim().min(1),
  lead: z.string().trim().min(1),
  content: z.string().default(''),
})

export type EquestrianContent = {
  eyebrow: string
  title: string
  lead: string
  /** HTML on the site (content-collections). */
  content: string
  /** h2/h3 from the page body for TOC. */
  headings: Array<TocHeading>
}

const DEFAULT_EQUESTRIAN_PAGE = {
  eyebrow: 'Equestrian',
  title: '馬術介紹',
  lead: '從國內發展、運動起源、競賽項目、騎乘裝備、入門基礎到專家觀點與騎馬益處，認識中華民國馬術協會所推廣的馬術運動。',
}

function readTrimmedString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : ''
}

function coerceHeadings(value: unknown): Array<TocHeading> {
  if (!Array.isArray(value)) return []
  return value.flatMap((item) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return []
    const raw = item as Record<string, unknown>
    const id = readTrimmedString(raw.id)
    const text = readTrimmedString(raw.text)
    const levelRaw = raw.level
    const level =
      typeof levelRaw === 'number' && Number.isFinite(levelRaw)
        ? levelRaw
        : typeof levelRaw === 'string' && levelRaw.trim()
          ? Number(levelRaw)
          : NaN
    if (!id || !text || (level !== 2 && level !== 3)) return []
    return [{ id, text, level }]
  })
}

/** Normalize CMS / raw draft page fields (lenient for live preview). */
export function normalizeEquestrianPage(
  value: unknown,
): EquestrianContent | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null

  const raw = value as Record<string, unknown>
  const title = readTrimmedString(raw.title)
  if (!title) return null

  return {
    eyebrow: readTrimmedString(raw.eyebrow) || DEFAULT_EQUESTRIAN_PAGE.eyebrow,
    title,
    lead: readTrimmedString(raw.lead) || DEFAULT_EQUESTRIAN_PAGE.lead,
    content:
      typeof raw.content === 'string' && raw.content.trim() ? raw.content : '',
    headings: coerceHeadings(raw.headings),
  }
}
