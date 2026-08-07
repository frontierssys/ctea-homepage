import type { CarouselSlide } from '#/lib/content/carousel'
import { DEFAULT_CAROUSEL_SLIDES } from '#/lib/content/carousel'

type CmsEntry = {
  getIn: (path: string[]) => unknown
}

type CmsAsset = {
  url?: string
}

type CmsFieldMap =
  | { get: (key: string) => unknown }
  | Record<string, unknown>
  | null
  | undefined

type CmsList = {
  toArray?: () => unknown[]
  toJS?: () => unknown
}

type EntryToCarouselOptions = {
  getAsset?: (path: string) => CmsAsset | undefined
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function pickString(value: unknown, fallback: string) {
  return isNonEmptyString(value) ? value : fallback
}

function readField(slide: CmsFieldMap, key: keyof CarouselSlide) {
  if (!slide || typeof slide !== 'object') return undefined
  if ('get' in slide && typeof slide.get === 'function') return slide.get(key)
  return (slide as Record<string, unknown>)[key]
}

function resolveImagePath(
  value: unknown,
  fallback: string,
  getAsset?: EntryToCarouselOptions['getAsset'],
) {
  const path = pickString(value, fallback)
  return getAsset?.(path)?.url ?? path
}

function toArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value
  if (!value || typeof value !== 'object') return []

  const list = value as CmsList
  if (typeof list.toArray === 'function') return list.toArray()

  if (typeof list.toJS === 'function') {
    const plainValue = list.toJS()
    return Array.isArray(plainValue) ? plainValue : []
  }

  return []
}

export function entryToCarouselSlides(
  entry: CmsEntry,
  options: EntryToCarouselOptions = {},
): CarouselSlide[] {
  const slides = toArray(entry.getIn(['data', 'carousel', 'slides']))
  if (slides.length === 0) return DEFAULT_CAROUSEL_SLIDES

  return slides.map((value, index) => {
    const slide = value as CmsFieldMap
    const fallback = DEFAULT_CAROUSEL_SLIDES[index % DEFAULT_CAROUSEL_SLIDES.length]

    return {
      eyebrow: pickString(readField(slide, 'eyebrow'), fallback.eyebrow),
      titleLine1: pickString(readField(slide, 'titleLine1'), fallback.titleLine1),
      titleLine2: pickString(readField(slide, 'titleLine2'), fallback.titleLine2),
      description: pickString(readField(slide, 'description'), fallback.description),
      ctaLabel: pickString(readField(slide, 'ctaLabel'), fallback.ctaLabel),
      ctaHref: pickString(readField(slide, 'ctaHref'), fallback.ctaHref),
      image: resolveImagePath(readField(slide, 'image'), fallback.image, options.getAsset),
      imageAlt: pickString(readField(slide, 'imageAlt'), fallback.imageAlt),
      imagePosition: pickString(readField(slide, 'imagePosition'), fallback.imagePosition),
    }
  })
}
