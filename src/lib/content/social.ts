import socialJson from '../../../content/social.json'

export type SocialContent = {
  backgroundImage: string
}

const FALLBACK_SOCIAL: SocialContent = {
  backgroundImage: '/media/ctea-sketch-ivory-bg.webp',
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

export function getSocial(): SocialContent {
  try {
    const data = socialJson as Partial<SocialContent>
    const backgroundImage = isNonEmptyString(data.backgroundImage)
      ? data.backgroundImage
      : FALLBACK_SOCIAL.backgroundImage

    return { backgroundImage }
  } catch {
    return FALLBACK_SOCIAL
  }
}
