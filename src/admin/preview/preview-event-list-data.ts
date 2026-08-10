import {
  normalizeEvent,
  type EventItem,
} from '#/lib/content/events'
import { parse as parseYaml } from 'yaml'

const eventModules = import.meta.glob('../../../content/events/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function slugFromModulePath(modulePath: string) {
  const match = modulePath.match(/([^/]+)\.md$/)
  return match?.[1]?.trim() ?? ''
}

function parseMarkdownEvent(source: string): unknown {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(source)
  if (!match) return null

  const data = parseYaml(match[1])
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null

  return {
    ...data,
    content: match[2].replace(/^\n+/, ''),
  }
}

/** CMS list preview only — reads source Markdown (not content-collections HTML). */
export function getPreviewEventList(): Array<EventItem> {
  return Object.entries(eventModules)
    .map(([modulePath, source]) =>
      normalizeEvent(parseMarkdownEvent(source), slugFromModulePath(modulePath)),
    )
    .filter((item): item is EventItem => item !== null)
    .sort((a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id))
}
