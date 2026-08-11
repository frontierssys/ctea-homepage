import { allAboutHistories } from '../../../.content-collections/generated'
import type { AboutHistoryContent } from '#/lib/content/about-history'

export function getAboutHistory(): AboutHistoryContent {
  const document = allAboutHistories[0]
  if (!document) {
    throw new Error('Missing content/about/history.md')
  }

  return {
    eyebrow: document.eyebrow,
    title: document.title,
    nextLabel: document.nextLabel,
    nextTo: document.nextTo,
    timeline: document.timeline,
    content: document.content,
  }
}
