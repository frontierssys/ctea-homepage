import { defineCollection, defineConfig } from '@content-collections/core'
import { aboutHistoryDocumentSchema } from './src/lib/content/about-history'
import {
  equestrianPageDocumentSchema,
  equestrianSectionSchema,
} from './src/lib/content/equestrian'
import { eventDocumentSchema } from './src/lib/content/events'
import { renderMarkdown } from './src/lib/markdown'

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
  include: '*.md',
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

const equestrianPage = defineCollection({
  name: 'equestrianPage',
  directory: 'content/equestrian-page',
  include: '*.md',
  parser: 'frontmatter',
  schema: equestrianPageDocumentSchema,
  transform: async (document) => ({
    eyebrow: document.eyebrow,
    title: document.title,
    lead: document.lead,
  }),
})

const equestrianSections = defineCollection({
  name: 'equestrianSections',
  directory: 'content/equestrian',
  include: '*.md',
  parser: 'frontmatter',
  schema: equestrianSectionSchema,
  transform: async (document, { cache }) => {
    const { markup } = await cache(document.content, (content) =>
      renderMarkdown(content),
    )

    return {
      // Anchor id comes from the filename / CMS slug, not an editable field.
      id: document._meta.path,
      order: document.order,
      eyebrow: document.eyebrow,
      title: document.title,
      content: markup,
    }
  },
})

export default defineConfig({
  content: [events, aboutHistory, equestrianPage, equestrianSections],
})
