import { z } from 'zod'

export const EVENT_CATEGORIES = [
  { id: 'events', label: '活動賽事' },
  { id: 'administration', label: '行政會務' },
  { id: 'education', label: '培訓講習' },
  { id: 'international', label: '國際資訊' },
  { id: 'rules', label: '規章制度' },
  { id: 'other', label: '其他公告' },
] as const

export const EVENT_FILTER_TAGS = [
  '2025全運',
  '大專盃',
  '亞洲錦標賽',
  'FEI挑戰賽',
  '選手',
  '教練',
  '裁判',
  '會員單位',
  '證照',
  '證件申請',
  'TUE',
  '藥檢',
  '收據',
  'FEI',
  'AEF',
  'Quota',
  'YOG',
  '規程',
  '秩序冊',
  '成績',
  '積分',
  '會議',
  '人事',
  '會費',
  '培訓',
  '講習',
  '活動',
  '緊急通知',
  '延期',
  '天氣',
] as const

export type EventCategoryId = (typeof EVENT_CATEGORIES)[number]['id']
export type EventFilterTag = (typeof EVENT_FILTER_TAGS)[number]

const eventCategoryIdSchema = z.enum(
  EVENT_CATEGORIES.map<EventCategoryId>((category) => category.id)
)

const eventFilterTagSchema = z.enum(EVENT_FILTER_TAGS)

/** Shared attachment contract (content-collections + normalize). */
const eventAttachmentDocumentSchema = z.object({
  name: z.string(),
  url: z.string(),
  size: z.string().optional(),
})

/** Shared event field contract — one shape, two consumers. */
const eventFields = {
  title: z.string(),
  category: eventCategoryIdSchema,
  tags: z.array(z.string()).default([]),
  date: z.union([
    z.string(),
    z.date().transform((value) => value.toISOString().slice(0, 10)),
  ]),
  author: z.string().default(''),
  excerpt: z.string().optional(),
  content: z.string().default(''),
  attachments: z.array(eventAttachmentDocumentSchema).default([]),
}

/** Strict parse for content-collections Markdown front matter (id from file meta). */
export const eventDocumentSchema = z.object(eventFields)

type EventDocument = z.infer<typeof eventDocumentSchema>
type EventAttachment = z.infer<typeof eventAttachmentDocumentSchema>

export type EventItem = {
  id: string
  title: string
  category: EventCategoryId
  tags: Array<EventFilterTag>
  date: string
  author: string
  excerpt?: string
  /** HTML on the site (content-collections); Markdown in live CMS drafts. */
  content: string
  attachments: Array<EventAttachment>
}

/** Normalize a CMS / raw JSON entry into EventItem. */
export function normalizeEvent(
  value: unknown,
  fallbackId?: string,
): EventItem | null {
  const parsed = z
    .unknown()
    .transform(toDocumentShape)
    .pipe(eventDocumentSchema)
    .safeParse(value)
  if (!parsed.success) return null

  const id = readEventId(value, fallbackId)
  if (!id) return null

  return toEventItem(parsed.data, id)
}

export function getCategoryLabel(category: EventCategoryId) {
  return EVENT_CATEGORIES.find((item) => item.id === category)?.label ?? category
}

export function isFilterTag(value: string): value is EventFilterTag {
  return eventFilterTagSchema.safeParse(value).success
}

function readNonEmptyString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

function coerceAttachment(value: unknown): EventAttachment | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null

  const raw = value as Record<string, unknown>
  const name = readNonEmptyString(raw.name)
  if (!name) return null

  const size = readNonEmptyString(raw.size)
  return {
    name,
    url: readNonEmptyString(raw.url) ?? '#',
    ...(size ? { size } : {}),
  }
}

/** CMS / raw JSON → shape that satisfies `eventDocumentSchema`. */
function toDocumentShape(value: unknown): unknown {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}

  const raw = value as Record<string, unknown>
  const title = readNonEmptyString(raw.title)
  const excerpt = readNonEmptyString(raw.excerpt)

  return {
    ...(title ? { title } : {}),
    category: raw.category,
    tags: Array.isArray(raw.tags)
      ? raw.tags.filter((tag): tag is string => typeof tag === 'string')
      : [],
    date:
      typeof raw.date === 'string' && raw.date.trim()
        ? raw.date.trim().slice(0, 10)
        : '',
    author:
      typeof raw.author === 'string' && raw.author.trim()
        ? raw.author.trim()
        : '',
    ...(excerpt ? { excerpt } : {}),
    content:
      typeof raw.content === 'string' && raw.content.trim() ? raw.content : '',
    attachments: Array.isArray(raw.attachments)
      ? raw.attachments.flatMap((item) => {
          const attachment = coerceAttachment(item)
          return attachment ? [attachment] : []
        })
      : [],
  }
}

function toEventItem(document: EventDocument, id: string): EventItem {
  return {
    id,
    title: document.title,
    category: document.category,
    tags: document.tags.filter(isFilterTag),
    date: document.date.slice(0, 10),
    author: document.author,
    ...(document.excerpt?.trim() ? { excerpt: document.excerpt.trim() } : {}),
    content: document.content,
    attachments: document.attachments.map((attachment) => ({
      name: attachment.name,
      url: attachment.url,
      ...(attachment.size?.trim() ? { size: attachment.size.trim() } : {}),
    })),
  }
}

function readEventId(value: unknown, fallbackId?: string): string | undefined {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const id = readNonEmptyString((value as { id?: unknown }).id)
    if (id) return id
  }
  return readNonEmptyString(fallbackId)
}