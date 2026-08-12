import { z } from 'zod'
import type { MarkdownHeading } from '#/lib/markdown'

export const REGULATION_PAGE_IDS = [
  'fei',
  'domestic',
  'training',
  'downloads',
] as const

export type RegulationPageId = (typeof REGULATION_PAGE_IDS)[number]

/** Default landing page when visiting `/regulation`. */
export const REGULATION_DEFAULT_PAGE_ID: RegulationPageId = 'fei'

const regulationPageIdSchema = z.enum(REGULATION_PAGE_IDS)
const regulationSourceSchema = z.enum(['CTEA', 'FEI'])

const regulationDownloadSchema = z.object({
  name: z.string().trim().min(1),
  url: z.string().trim().min(1),
  format: z.string().trim().min(1).optional(),
  source: regulationSourceSchema.optional(),
})

/** Page front matter — content/regulation/*.md */
export const regulationPageDocumentSchema = z.object({
  order: z.coerce.number().int().nonnegative(),
  eyebrow: z.string().trim().min(1),
  title: z.string().trim().min(1),
  lead: z.string().trim().min(1),
  downloads: z.array(regulationDownloadSchema).default([]),
  content: z.string().default(''),
})

export type RegulationDownload = z.infer<typeof regulationDownloadSchema>

export type RegulationTocHeading = Pick<MarkdownHeading, 'id' | 'text' | 'level'>

export type RegulationPage = {
  id: RegulationPageId
  order: number
  eyebrow: string
  title: string
  lead: string
  downloads: Array<RegulationDownload>
  /** HTML on the site (content-collections). */
  content: string
  /** h2/h3 from the page body for TOC. */
  headings: Array<RegulationTocHeading>
}

const DEFAULT_REGULATION_PAGE = {
  eyebrow: 'Regulation',
  title: '制度專區',
  lead: '查閱 FEI 規章、國內制度、培訓甄選與相關下載檔。',
}

function readTrimmedString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : ''
}

function coerceDownload(value: unknown): RegulationDownload | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const raw = value as Record<string, unknown>
  const name = readTrimmedString(raw.name)
  const url = readTrimmedString(raw.url)
  if (!name || !url) return null

  const format = readTrimmedString(raw.format)
  const sourceRaw = readTrimmedString(raw.source)
  const source =
    sourceRaw === 'CTEA' || sourceRaw === 'FEI' ? sourceRaw : undefined

  return {
    name,
    url,
    ...(format ? { format } : {}),
    ...(source ? { source } : {}),
  }
}

function coerceHeadings(value: unknown): Array<RegulationTocHeading> {
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
export function normalizeRegulationPage(value: unknown): RegulationPage | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null

  const raw = value as Record<string, unknown>
  const id = readTrimmedString(raw.id)
  const title = readTrimmedString(raw.title)
  if (!regulationPageIdSchema.safeParse(id).success || !title) return null

  const orderRaw = raw.order
  const order =
    typeof orderRaw === 'number' && Number.isFinite(orderRaw)
      ? orderRaw
      : typeof orderRaw === 'string' && orderRaw.trim()
        ? Number(orderRaw)
        : 0

  const downloads = Array.isArray(raw.downloads)
    ? raw.downloads.flatMap((item) => {
        const download = coerceDownload(item)
        return download ? [download] : []
      })
    : []

  return {
    id: id as RegulationPageId,
    order: Number.isFinite(order) ? order : 0,
    eyebrow: readTrimmedString(raw.eyebrow) || DEFAULT_REGULATION_PAGE.eyebrow,
    title,
    lead: readTrimmedString(raw.lead) || DEFAULT_REGULATION_PAGE.lead,
    downloads,
    content:
      typeof raw.content === 'string' && raw.content.trim() ? raw.content : '',
    headings: coerceHeadings(raw.headings),
  }
}
