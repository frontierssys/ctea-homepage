import { z } from 'zod'
import {
  ABOUT_NEXT_TO,
  aboutNextToSchema,
  readTrimmedString,
  type AboutNextTo,
} from '#/lib/content/about-shared'

export { ABOUT_NEXT_TO, type AboutNextTo }

const timelineItemSchema = z.object({
  year: z.string().trim().min(1),
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
})

/** Strict parse for content-collections Markdown front matter. */
export const aboutHistoryDocumentSchema = z.object({
  eyebrow: z.string().trim().min(1),
  title: z.string().trim().min(1),
  nextLabel: z.string().trim().min(1),
  nextTo: aboutNextToSchema,
  timeline: z.array(timelineItemSchema).min(1),
  content: z.string().default(''),
})

export type AboutHistoryContent = {
  eyebrow: string
  title: string
  nextLabel: string
  nextTo: AboutNextTo
  timeline: Array<z.infer<typeof timelineItemSchema>>
  /** HTML on the site (content-collections); Markdown in live CMS drafts. */
  content: string
}

const DEFAULT_ABOUT_HISTORY = {
  eyebrow: 'History',
  nextLabel: '閱讀協會宗旨',
  nextTo: '/about/mission' as const,
}

/** Normalize a CMS / raw draft into AboutHistoryContent (lenient for live preview). */
export function normalizeAboutHistory(value: unknown): AboutHistoryContent | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null

  const raw = value as Record<string, unknown>
  const title = readTrimmedString(raw.title)
  if (!title) return null

  const nextToParsed = aboutNextToSchema.safeParse(raw.nextTo)
  const timeline = Array.isArray(raw.timeline)
    ? raw.timeline.flatMap((item) => {
        const parsed = timelineItemSchema.safeParse(item)
        return parsed.success ? [parsed.data] : []
      })
    : []

  return {
    eyebrow: readTrimmedString(raw.eyebrow) || DEFAULT_ABOUT_HISTORY.eyebrow,
    title,
    nextLabel:
      readTrimmedString(raw.nextLabel) || DEFAULT_ABOUT_HISTORY.nextLabel,
    nextTo: nextToParsed.success
      ? nextToParsed.data
      : DEFAULT_ABOUT_HISTORY.nextTo,
    timeline,
    content:
      typeof raw.content === 'string' && raw.content.trim() ? raw.content : '',
  }
}
