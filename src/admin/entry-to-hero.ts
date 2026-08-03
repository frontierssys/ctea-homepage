import type { HomepageHero } from '#/lib/content/homepage'
import { DEFAULT_HOMEPAGE_HERO } from '#/lib/content/homepage'

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

type EntryToHeroOptions = {
  getAsset?: (path: string) => CmsAsset | undefined
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0
}

function pickString(value: unknown, fallback: string) {
  return isNonEmptyString(value) ? value : fallback
}

function readHeroField(hero: CmsFieldMap, key: keyof HomepageHero) {
  if (!hero || typeof hero !== 'object') return undefined

  if ('get' in hero && typeof hero.get === 'function') {
    return hero.get(key)
  }

  return (hero as Record<string, unknown>)[key]
}

function resolveImagePath(
  value: unknown,
  fallback: string,
  getAsset?: EntryToHeroOptions['getAsset'],
) {
  const path = pickString(value, fallback)
  if (!getAsset) return path

  return getAsset(path)?.url ?? path
}

export function entryToHero(entry: CmsEntry, options: EntryToHeroOptions = {}): HomepageHero {
  const { getAsset } = options
  const hero = entry.getIn(['data', 'hero']) as CmsFieldMap

  return {
    titleLine1: pickString(readHeroField(hero, 'titleLine1'), DEFAULT_HOMEPAGE_HERO.titleLine1),
    titleLine2: pickString(readHeroField(hero, 'titleLine2'), DEFAULT_HOMEPAGE_HERO.titleLine2),
    sloganAccent: pickString(readHeroField(hero, 'sloganAccent'), DEFAULT_HOMEPAGE_HERO.sloganAccent),
    sloganRest: pickString(readHeroField(hero, 'sloganRest'), DEFAULT_HOMEPAGE_HERO.sloganRest),
    subcopy: pickString(readHeroField(hero, 'subcopy'), DEFAULT_HOMEPAGE_HERO.subcopy),
    ctaLabel: pickString(readHeroField(hero, 'ctaLabel'), DEFAULT_HOMEPAGE_HERO.ctaLabel),
    ctaHref: pickString(readHeroField(hero, 'ctaHref'), DEFAULT_HOMEPAGE_HERO.ctaHref),
    logo: resolveImagePath(readHeroField(hero, 'logo'), DEFAULT_HOMEPAGE_HERO.logo, getAsset),
    rider: resolveImagePath(readHeroField(hero, 'rider'), DEFAULT_HOMEPAGE_HERO.rider, getAsset),
    bg: resolveImagePath(readHeroField(hero, 'bg'), DEFAULT_HOMEPAGE_HERO.bg, getAsset),
    bgDark: resolveImagePath(readHeroField(hero, 'bgDark'), DEFAULT_HOMEPAGE_HERO.bgDark, getAsset),
  }
}
