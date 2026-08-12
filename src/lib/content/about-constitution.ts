import { z } from 'zod'
import {
  aboutNextToSchema,
  readTrimmedString,
  type AboutNextTo,
} from '#/lib/content/about-shared'
import type { TocHeading } from '#/lib/content/toc'

/** Front matter for content/about/constitution.md */
export const aboutConstitutionDocumentSchema = z.object({
  eyebrow: z.string().trim().min(1),
  title: z.string().trim().min(1),
  nextLabel: z.string().trim().min(1),
  nextTo: aboutNextToSchema,
  content: z.string().default(''),
})

export type AboutConstitutionContent = {
  eyebrow: string
  title: string
  nextLabel: string
  nextTo: AboutNextTo
  /** HTML on the site (content-collections); Markdown in live CMS drafts. */
  content: string
  /** h2/h3 from the page body for TOC. */
  headings: Array<TocHeading>
}

const DEFAULT_ABOUT_CONSTITUTION = {
  eyebrow: 'Institutional Charter',
  nextLabel: '閱讀奮鬥願景',
  nextTo: '/about/vision' as const,
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

/** Normalize CMS / raw draft constitution fields (lenient for live preview). */
export function normalizeAboutConstitution(
  value: unknown,
): AboutConstitutionContent | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null

  const raw = value as Record<string, unknown>
  const title = readTrimmedString(raw.title)
  if (!title) return null

  const nextToParsed = aboutNextToSchema.safeParse(raw.nextTo)

  return {
    eyebrow:
      readTrimmedString(raw.eyebrow) || DEFAULT_ABOUT_CONSTITUTION.eyebrow,
    title,
    nextLabel:
      readTrimmedString(raw.nextLabel) ||
      DEFAULT_ABOUT_CONSTITUTION.nextLabel,
    nextTo: nextToParsed.success
      ? nextToParsed.data
      : DEFAULT_ABOUT_CONSTITUTION.nextTo,
    content:
      typeof raw.content === 'string' && raw.content.trim() ? raw.content : '',
    headings: coerceHeadings(raw.headings),
  }
}
