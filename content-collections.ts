import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'
import { renderMarkdown } from './src/lib/markdown'

const eventAttachmentSchema = z.object({
  name: z.string(),
  url: z.string(),
  size: z.string().optional(),
})

/** @see https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown#method-1-static-markdown-with-content-collections */
const events = defineCollection({
  name: 'events',
  directory: 'content/events',
  include: '*.json',
  parser: 'json',
  schema: z.object({
    title: z.string(),
    category: z.enum([
      'events',
      'administration',
      'education',
      'international',
      'rules',
      'other',
    ]),
    tags: z.array(z.string()).default([]),
    date: z.string(),
    author: z.string().default(''),
    excerpt: z.string().optional(),
    content: z.string().default(''),
    attachments: z.array(eventAttachmentSchema).default([]),
  }),
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
