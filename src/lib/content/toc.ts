import type { MarkdownHeading } from '#/lib/markdown'

/** Shared in-page TOC heading (h2/h3 extracted from Markdown). */
export type TocHeading = Pick<MarkdownHeading, 'id' | 'text' | 'level'>
