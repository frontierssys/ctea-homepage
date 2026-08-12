import { defineCollection, defineConfig } from '@content-collections/core'
import { aboutConstitutionDocumentSchema } from './src/lib/content/about-constitution'
import { aboutHistoryDocumentSchema } from './src/lib/content/about-history'
import { aboutMediaDocumentSchema } from './src/lib/content/about-media'
import { equestrianPageDocumentSchema } from './src/lib/content/equestrian'
import { eventDocumentSchema } from './src/lib/content/events'
import {
  REGULATION_PAGE_IDS,
  regulationPageDocumentSchema,
  type RegulationPageId,
} from './src/lib/content/regulation'
import { renderMarkdown } from './src/lib/markdown'

function mapTocHeadings(
  headings: Array<{ id: string; text: string; level: number }>,
) {
  return headings
    .filter((heading) => heading.level === 2 || heading.level === 3)
    .map((heading) => ({
      id: heading.id,
      text: heading.text,
      level: heading.level,
    }))
}

/** @see https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown#method-1-static-markdown-with-content-collections */
const events = defineCollection({
  name: 'events',
  directory: 'content/events',
  include: '*.md',
  parser: 'frontmatter',
  schema: eventDocumentSchema,
  transform: async (document, { cache }) => {
    const { markup } = await cache(document.content, (content) =>
      renderMarkdown(content),
    )

    return {
      id: document._meta.path,
      title: document.title,
      category: document.category,
      tags: document.tags,
      date: document.date.slice(0, 10),
      author: document.author,
      ...(document.excerpt ? { excerpt: document.excerpt } : {}),
      // HTML from the shared Markdown processor — site renders via <Markdown />.
      content: markup,
      attachments: document.attachments,
    }
  },
})

const aboutHistory = defineCollection({
  name: 'aboutHistory',
  directory: 'content/about',
  include: 'history.md',
  parser: 'frontmatter',
  schema: aboutHistoryDocumentSchema,
  transform: async (document, { cache }) => {
    const { markup } = await cache(document.content, (content) =>
      renderMarkdown(content),
    )

    return {
      eyebrow: document.eyebrow,
      title: document.title,
      nextLabel: document.nextLabel,
      nextTo: document.nextTo,
      timeline: document.timeline,
      content: markup,
    }
  },
})

const aboutMission = defineCollection({
  name: 'aboutMission',
  directory: 'content/about',
  include: 'mission.md',
  parser: 'frontmatter',
  schema: aboutMediaDocumentSchema,
  transform: async (document, { cache }) => {
    const { markup } = await cache(document.content, (content) =>
      renderMarkdown(content),
    )

    return {
      eyebrow: document.eyebrow,
      title: document.title,
      nextLabel: document.nextLabel,
      nextTo: document.nextTo,
      image: document.image,
      imageAlt: document.imageAlt,
      content: markup,
    }
  },
})

const aboutVision = defineCollection({
  name: 'aboutVision',
  directory: 'content/about',
  include: 'vision.md',
  parser: 'frontmatter',
  schema: aboutMediaDocumentSchema,
  transform: async (document, { cache }) => {
    const { markup } = await cache(document.content, (content) =>
      renderMarkdown(content),
    )

    return {
      eyebrow: document.eyebrow,
      title: document.title,
      nextLabel: document.nextLabel,
      nextTo: document.nextTo,
      image: document.image,
      imageAlt: document.imageAlt,
      content: markup,
    }
  },
})

const aboutConstitution = defineCollection({
  name: 'aboutConstitution',
  directory: 'content/about',
  include: 'constitution.md',
  parser: 'frontmatter',
  schema: aboutConstitutionDocumentSchema,
  transform: async (document, { cache }) => {
    const { markup, headings } = await cache(document.content, (content) =>
      renderMarkdown(content),
    )

    return {
      eyebrow: document.eyebrow,
      title: document.title,
      nextLabel: document.nextLabel,
      nextTo: document.nextTo,
      content: markup,
      headings: mapTocHeadings(headings),
    }
  },
})

const equestrianPage = defineCollection({
  name: 'equestrianPage',
  directory: 'content/equestrian',
  include: 'page.md',
  parser: 'frontmatter',
  schema: equestrianPageDocumentSchema,
  transform: async (document, { cache }) => {
    const { markup, headings } = await cache(document.content, (content) =>
      renderMarkdown(content),
    )

    return {
      eyebrow: document.eyebrow,
      title: document.title,
      lead: document.lead,
      content: markup,
      headings: mapTocHeadings(headings),
    }
  },
})

const regulationPages = defineCollection({
  name: 'regulationPages',
  directory: 'content/regulation',
  include: '*.md',
  parser: 'frontmatter',
  schema: regulationPageDocumentSchema,
  transform: async (document, { cache }) => {
    const { markup, headings } = await cache(document.content, (content) =>
      renderMarkdown(content),
    )

    const id = document._meta.path
    if (!REGULATION_PAGE_IDS.includes(id as RegulationPageId)) {
      throw new Error(
        `Invalid regulation page id "${id}". Expected one of: ${REGULATION_PAGE_IDS.join(', ')}`,
      )
    }

    return {
      id: id as RegulationPageId,
      order: document.order,
      eyebrow: document.eyebrow,
      title: document.title,
      lead: document.lead,
      downloads: document.downloads,
      content: markup,
      headings: mapTocHeadings(headings),
    }
  },
})

export default defineConfig({
  content: [
    events,
    aboutHistory,
    aboutMission,
    aboutVision,
    aboutConstitution,
    equestrianPage,
    regulationPages,
  ],
})
