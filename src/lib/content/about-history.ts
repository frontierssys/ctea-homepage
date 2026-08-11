import { z } from 'zod'

export const ABOUT_HISTORY_NEXT_TO = [
  '/about/mission',
  '/about/constitution',
  '/about/vision',
  '/about/history',
] as const

export type AboutHistoryNextTo = (typeof ABOUT_HISTORY_NEXT_TO)[number]

const aboutHistoryNextToSchema = z.enum(ABOUT_HISTORY_NEXT_TO)

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
  nextTo: aboutHistoryNextToSchema,
  timeline: z.array(timelineItemSchema).min(1),
  content: z.string().default(''),
})

export type AboutHistoryContent = {
  eyebrow: string
  title: string
  nextLabel: string
  nextTo: AboutHistoryNextTo
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
  const title = typeof raw.title === 'string' ? raw.title.trim() : ''
  if (!title) return null

  const eyebrow =
    typeof raw.eyebrow === 'string' && raw.eyebrow.trim()
      ? raw.eyebrow.trim()
      : DEFAULT_ABOUT_HISTORY.eyebrow
  const nextLabel =
    typeof raw.nextLabel === 'string' && raw.nextLabel.trim()
      ? raw.nextLabel.trim()
      : DEFAULT_ABOUT_HISTORY.nextLabel
  const nextToParsed = aboutHistoryNextToSchema.safeParse(raw.nextTo)
  const nextTo = nextToParsed.success
    ? nextToParsed.data
    : DEFAULT_ABOUT_HISTORY.nextTo

  const timeline = Array.isArray(raw.timeline)
    ? raw.timeline.flatMap((item) => {
        const parsed = timelineItemSchema.safeParse(item)
        return parsed.success ? [parsed.data] : []
      })
    : []

  const content =
    typeof raw.content === 'string' && raw.content.trim() ? raw.content : ''

  return {
    eyebrow,
    title,
    nextLabel,
    nextTo,
    timeline,
    content,
  }
}
