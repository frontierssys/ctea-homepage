import { z } from 'zod'
import {
  aboutNextToSchema,
  readTrimmedString,
  type AboutNextTo,
} from '#/lib/content/about-shared'

/** Front matter for content/about/mission.md and vision.md */
export const aboutMediaDocumentSchema = z.object({
  eyebrow: z.string().trim().min(1),
  title: z.string().trim().min(1),
  nextLabel: z.string().trim().min(1),
  nextTo: aboutNextToSchema,
  image: z.string().trim().min(1),
  imageAlt: z.string().trim().min(1),
  content: z.string().default(''),
})

export type AboutMediaContent = {
  eyebrow: string
  title: string
  nextLabel: string
  nextTo: AboutNextTo
  image: string
  imageAlt: string
  /** HTML on the site (content-collections); Markdown in live CMS drafts. */
  content: string
}

const DEFAULT_ABOUT_MEDIA = {
  eyebrow: 'About',
  nextLabel: '繼續閱讀',
  nextTo: '/about/history' as const,
  imageAlt: '馬術相關圖片',
}

/** Normalize CMS / raw draft media page fields (lenient for live preview). */
export function normalizeAboutMedia(value: unknown): AboutMediaContent | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null

  const raw = value as Record<string, unknown>
  const title = readTrimmedString(raw.title)
  const image = readTrimmedString(raw.image)
  if (!title || !image) return null

  const nextToParsed = aboutNextToSchema.safeParse(raw.nextTo)

  return {
    eyebrow: readTrimmedString(raw.eyebrow) || DEFAULT_ABOUT_MEDIA.eyebrow,
    title,
    nextLabel:
      readTrimmedString(raw.nextLabel) || DEFAULT_ABOUT_MEDIA.nextLabel,
    nextTo: nextToParsed.success
      ? nextToParsed.data
      : DEFAULT_ABOUT_MEDIA.nextTo,
    image,
    imageAlt: readTrimmedString(raw.imageAlt) || DEFAULT_ABOUT_MEDIA.imageAlt,
    content:
      typeof raw.content === 'string' && raw.content.trim() ? raw.content : '',
  }
}
