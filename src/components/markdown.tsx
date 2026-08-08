import { cn } from '#/lib/utils'

type MarkdownProps = {
  /** HTML from `renderMarkdown` / content-collections build transform. */
  content: string
  className?: string
}

const proseClassName =
  'prose prose-lg max-w-none text-[#43423e] prose-headings:font-display prose-headings:text-[#151310] prose-a:text-[#a77d35] prose-strong:text-[#151310] dark:text-[#b3aa99] dark:prose-headings:text-[#f1eade] dark:prose-a:text-[#c6a465] dark:prose-strong:text-[#f1eade]'

/**
 * Renders pre-processed Markdown HTML.
 *
 * Uses `dangerouslySetInnerHTML` (trusted CMS / build-time HTML) instead of
 * `html-react-parser` + hooks, for two host environments:
 *
 * 1. Cloudflare Workers / workerd prerender — parser needs
 *    `document.implementation.createHTMLDocument`, which workerd lacks.
 *    Error seen: "This browser does not support createHTMLDocument".
 *    @see https://github.com/remarkablemark/html-react-parser
 *    @see https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown
 *
 * 2. Sveltia CMS preview — JSX compiles to CMS `h()`/`rf()`, but a bundled
 *    `react` `useState` has a null dispatcher →
 *    "Cannot read properties of null (reading 'useState')".
 *    Preview must stay hook-free / single React (CMS runtime).
 *    @see vite.admin-preview.config.ts (jsxFactory: 'h')
 */
export function Markdown({ content, className }: MarkdownProps) {
  if (!content) return null

  return (
    <div
      className={cn(proseClassName, className)}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
