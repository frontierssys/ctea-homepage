import { allAboutMissions } from '../../../.content-collections/generated'
import type { AboutMediaContent } from '#/lib/content/about-media'

export function getAboutMission(): AboutMediaContent {
  const document = allAboutMissions[0]
  if (!document) {
    throw new Error('Missing content/about/mission.md')
  }

  return {
    eyebrow: document.eyebrow,
    title: document.title,
    nextLabel: document.nextLabel,
    nextTo: document.nextTo,
    image: document.image,
    imageAlt: document.imageAlt,
    content: document.content,
  }
}
