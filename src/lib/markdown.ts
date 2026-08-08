import { marked } from 'marked'

marked.setOptions({
  // Match Sveltia Lexical soft line breaks (single \n → <br>).
  breaks: true,
  gfm: true,
})

function looksLikeHtml(value: string) {
  return /^\s*</.test(value)
}

/**
 * Convert CMS Markdown (or legacy HTML) to an HTML string for
 * `dangerouslySetInnerHTML`. Call from loaders / server — not in leaf UI.
 */
export function markdownToHtml(source: string): string {
  const trimmed = source.trim()
  if (!trimmed) return ''
  // Passthrough for older seed HTML still stored as tags.
  if (looksLikeHtml(trimmed)) return trimmed
  return marked.parse(trimmed, { async: false }) as string
}
