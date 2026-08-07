import newsJson from '../../../content/news.json'

export type NewsContent = {
  featuredImage: string
  featuredImageAlt: string
}

const FALLBACK_NEWS: NewsContent = {
  featuredImage: '/ctea-4.webp',
  featuredImageAlt: '馬術賽事騎手與黑馬',
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

export function getNews(): NewsContent {
  try {
    const data = newsJson as Partial<NewsContent>

    return {
      featuredImage: isNonEmptyString(data.featuredImage)
        ? data.featuredImage
        : FALLBACK_NEWS.featuredImage,
      featuredImageAlt: isNonEmptyString(data.featuredImageAlt)
        ? data.featuredImageAlt
        : FALLBACK_NEWS.featuredImageAlt,
    }
  } catch {
    return FALLBACK_NEWS
  }
}
