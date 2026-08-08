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

export type EventAttachment = {
  name: string
  url: string
  size?: string
}

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

const CATEGORY_IDS = new Set<string>(EVENT_CATEGORIES.map((c) => c.id))
const TAG_IDS = new Set<string>(EVENT_FILTER_TAGS)

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function isCategoryId(value: unknown): value is EventCategoryId {
  return isNonEmptyString(value) && CATEGORY_IDS.has(value)
}

export function isFilterTag(value: unknown): value is EventFilterTag {
  return isNonEmptyString(value) && TAG_IDS.has(value)
}

function normalizeAttachment(value: unknown): EventAttachment | null {
  if (!value || typeof value !== 'object') return null
  const item = value as Record<string, unknown>
  if (!isNonEmptyString(item.name)) return null

  return {
    name: item.name.trim(),
    url: isNonEmptyString(item.url) ? item.url.trim() : '#',
    ...(isNonEmptyString(item.size) ? { size: item.size.trim() } : {}),
  }
}

/** Normalize a CMS / raw JSON entry into EventItem. */
export function normalizeEvent(
  value: unknown,
  fallbackId?: string,
): EventItem | null {
  if (!value || typeof value !== 'object') return null
  const item = value as Record<string, unknown>

  const id = isNonEmptyString(item.id)
    ? item.id.trim()
    : isNonEmptyString(fallbackId)
      ? fallbackId.trim()
      : ''

  if (!id || !isNonEmptyString(item.title)) return null
  if (!isCategoryId(item.category)) return null

  const tags = Array.isArray(item.tags) ? item.tags.filter(isFilterTag) : []
  const attachments = Array.isArray(item.attachments)
    ? item.attachments
        .map(normalizeAttachment)
        .filter((attachment): attachment is EventAttachment => attachment !== null)
    : []

  return {
    id,
    title: item.title.trim(),
    category: item.category,
    tags,
    date: isNonEmptyString(item.date) ? item.date.trim().slice(0, 10) : '',
    author: isNonEmptyString(item.author) ? item.author.trim() : '',
    ...(isNonEmptyString(item.excerpt) ? { excerpt: item.excerpt.trim() } : {}),
    content: isNonEmptyString(item.content) ? item.content : '',
    attachments,
  }
}

export function getCategoryLabel(category: EventCategoryId) {
  return EVENT_CATEGORIES.find((item) => item.id === category)?.label ?? category
}
