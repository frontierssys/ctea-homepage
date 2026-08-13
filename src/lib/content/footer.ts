import { z } from 'zod'
import footerJson from '../../../content/footer.json'

const SOCIAL_PLATFORMS = ['facebook', 'instagram', 'youtube'] as const

export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number]

export type FooterContent = {
  brandNameZh: string
  brandNameEn: string
  tagline: string
  phone: string
  email: string
  address: string
  socialLinks: Array<{ platform: SocialPlatform; url: string }>
  copyright: string
  legalLinks: Array<{ label: string; href: string }>
}

const nonEmpty = z.string().trim().min(1)

const footerSchema = z.object({
  brandNameZh: nonEmpty,
  brandNameEn: nonEmpty,
  tagline: nonEmpty,
  phone: nonEmpty,
  email: nonEmpty,
  address: nonEmpty,
  socialLinks: z
    .array(
      z.object({
        platform: z.enum(SOCIAL_PLATFORMS),
        url: nonEmpty,
      }),
    )
    .min(1),
  copyright: nonEmpty,
  legalLinks: z
    .array(
      z.object({
        label: nonEmpty,
        href: nonEmpty,
      }),
    )
    .min(1),
})

// ponytail: footer.json is the only copy; bad CMS draft falls back to it
export function normalizeFooter(value: unknown): FooterContent {
  const parsed = footerSchema.safeParse(value)
  return parsed.success ? parsed.data : (footerJson as FooterContent)
}

export function getFooter(): FooterContent {
  return normalizeFooter(footerJson)
}
