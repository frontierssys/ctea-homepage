import { allAboutVisions } from '../../../.content-collections/generated'
import type { AboutMediaContent } from '#/lib/content/about-media'

export function getAboutVision(): AboutMediaContent {
  const document = allAboutVisions[0]
  if (!document) {
    throw new Error('Missing content/about/vision.md')
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
