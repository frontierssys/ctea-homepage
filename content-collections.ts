import { defineCollection, defineConfig } from '@content-collections/core'
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

export default defineConfig({
  content: [events],
})
