import homepageJson from '../../../content/homepage.json'
import { DEFAULT_HERO_IMAGES } from '#/components/section-hero/hero-images'

export type HomepageHero = {
  titleLine1: string
  titleLine2: string
  sloganAccent: string
  sloganRest: string
  subcopy: string
  ctaLabel: string
  ctaHref: string
  logo: string
  rider: string
  bg: string
  bgDark: string
}

export type HomepageContent = {
  hero: HomepageHero
}

export const DEFAULT_HOMEPAGE_HERO: HomepageHero = {
  titleLine1: 'Chinese Taipei',
  titleLine2: 'Equestrian Association',
  sloganAccent: '傳承經典，',
  sloganRest: '策馬向前',
  subcopy: '賽事主辦・教育推廣・國際接軌・培育卓越人才',
  ctaLabel: '查看最近賽事',
  ctaHref: '#events',
  logo: DEFAULT_HERO_IMAGES.logo,
  rider: DEFAULT_HERO_IMAGES.rider,
  bg: DEFAULT_HERO_IMAGES.bg,
  bgDark: DEFAULT_HERO_IMAGES.bgDark,
}

const FALLBACK_HOMEPAGE: HomepageContent = {
  hero: DEFAULT_HOMEPAGE_HERO,
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0
}

function pickString(value: unknown, fallback: string) {
  return isNonEmptyString(value) ? value : fallback
}

export function getHomepage(): HomepageContent {
  try {
    const hero = (homepageJson as { hero?: Partial<Record<keyof HomepageHero, unknown>> })
      .hero

    return {
      hero: {
        titleLine1: pickString(hero?.titleLine1, FALLBACK_HOMEPAGE.hero.titleLine1),
        titleLine2: pickString(hero?.titleLine2, FALLBACK_HOMEPAGE.hero.titleLine2),
        sloganAccent: pickString(hero?.sloganAccent, FALLBACK_HOMEPAGE.hero.sloganAccent),
        sloganRest: pickString(hero?.sloganRest, FALLBACK_HOMEPAGE.hero.sloganRest),
        subcopy: pickString(hero?.subcopy, FALLBACK_HOMEPAGE.hero.subcopy),
        ctaLabel: pickString(hero?.ctaLabel, FALLBACK_HOMEPAGE.hero.ctaLabel),
        ctaHref: pickString(hero?.ctaHref, FALLBACK_HOMEPAGE.hero.ctaHref),
        logo: pickString(hero?.logo, FALLBACK_HOMEPAGE.hero.logo),
        rider: pickString(hero?.rider, FALLBACK_HOMEPAGE.hero.rider),
        bg: pickString(hero?.bg, FALLBACK_HOMEPAGE.hero.bg),
        bgDark: pickString(hero?.bgDark, FALLBACK_HOMEPAGE.hero.bgDark),
      },
    }
  } catch {
    return FALLBACK_HOMEPAGE
  }
}
