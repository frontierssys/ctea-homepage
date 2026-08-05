import homepageJson from '../../../content/homepage.json'

export type HomepageCarouselSlide = {
  eyebrow: string
  titleLine1: string
  titleLine2: string
  description: string
  ctaLabel: string
  ctaHref: string
  image: string
  imageAlt: string
  imagePosition: string
}

export type HomepageContent = {
  carousel: {
    slides: HomepageCarouselSlide[]
  }
}

export const DEFAULT_CAROUSEL_SLIDES: HomepageCarouselSlide[] = [
  {
    eyebrow: 'Chinese Taipei Equestrian Association',
    titleLine1: '傳承經典，',
    titleLine2: '策馬向前',
    description: '串連賽事、教育與國際交流，讓每一份專注都成為臺灣馬術向前的力量。',
    ctaLabel: '探索協會動態',
    ctaHref: '#news',
    image: '/media/ctea-sketch-ivory-rider.webp',
    imageAlt: '馬場馬術騎手與黑馬在場上訓練',
    imagePosition: 'center center',
  },
  {
    eyebrow: 'Competition · 2026',
    titleLine1: '看見臺灣馬術的',
    titleLine2: '每一次突破',
    description: '從全國賽事到國際舞台，掌握最新競賽規程、報名資訊與代表隊動態。',
    ctaLabel: '查看賽事公告',
    ctaHref: '#news',
    image: '/ctea-4.webp',
    imageAlt: '馬場馬術騎手與馬匹在競賽場中',
    imagePosition: 'center center',
  },
  {
    eyebrow: 'Education · International',
    titleLine1: '讓專業扎根，',
    titleLine2: '與世界並肩',
    description: '以人才培育、制度接軌與國際合作，建立安全、專業且永續的馬術環境。',
    ctaLabel: '觀看精選影音',
    ctaHref: '#video',
    image: '/media/ctea-sketch-ivory-bg-dark.webp',
    imageAlt: '深藍色臺灣歷史建築線稿背景',
    imagePosition: 'center bottom',
  },
]

const FALLBACK_HOMEPAGE: HomepageContent = {
  carousel: { slides: DEFAULT_CAROUSEL_SLIDES },
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function pickString(value: unknown, fallback: string) {
  return isNonEmptyString(value) ? value : fallback
}

function readSlide(value: unknown, fallback: HomepageCarouselSlide): HomepageCarouselSlide {
  const slide = value && typeof value === 'object' ? (value as Record<string, unknown>) : {}

  return {
    eyebrow: pickString(slide.eyebrow, fallback.eyebrow),
    titleLine1: pickString(slide.titleLine1, fallback.titleLine1),
    titleLine2: pickString(slide.titleLine2, fallback.titleLine2),
    description: pickString(slide.description, fallback.description),
    ctaLabel: pickString(slide.ctaLabel, fallback.ctaLabel),
    ctaHref: pickString(slide.ctaHref, fallback.ctaHref),
    image: pickString(slide.image, fallback.image),
    imageAlt: pickString(slide.imageAlt, fallback.imageAlt),
    imagePosition: pickString(slide.imagePosition, fallback.imagePosition),
  }
}

export function getHomepage(): HomepageContent {
  try {
    const slides = (homepageJson as { carousel?: { slides?: unknown } }).carousel?.slides

    if (!Array.isArray(slides) || slides.length === 0) return FALLBACK_HOMEPAGE

    return {
      carousel: {
        slides: slides.map((slide, index) =>
          readSlide(slide, DEFAULT_CAROUSEL_SLIDES[index % DEFAULT_CAROUSEL_SLIDES.length]),
        ),
      },
    }
  } catch {
    return FALLBACK_HOMEPAGE
  }
}
