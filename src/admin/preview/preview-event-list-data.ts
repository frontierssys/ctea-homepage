import {
  normalizeEvent,
  type EventItem,
} from '#/lib/content/events'

const eventModules = import.meta.glob('../../../content/events/*.json', {
  eager: true,
}) as Record<string, { default?: unknown } | unknown>

function slugFromModulePath(modulePath: string) {
  const match = modulePath.match(/([^/]+)\.json$/)
  return match?.[1]?.trim() ?? ''
}

/** CMS list preview only — reads source JSON (not content-collections HTML). */
export function getPreviewEventList(): Array<EventItem> {
  return Object.entries(eventModules)
    .map(([modulePath, module]) => {
      const data =
        module && typeof module === 'object' && 'default' in module
          ? module.default
          : module
      return normalizeEvent(data, slugFromModulePath(modulePath))
    })
    .filter((item): item is EventItem => item !== null)
    .sort((a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id))
}
