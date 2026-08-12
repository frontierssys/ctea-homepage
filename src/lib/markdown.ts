import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import { visit } from 'unist-util-visit'
import { toString } from 'hast-util-to-string'
import type { Element, Root } from 'hast'

export type MarkdownHeading = {
  id: string
  text: string
  level: number
}

export type MarkdownResult = {
  markup: string
  headings: Array<MarkdownHeading>
}

/**
 * Shared Markdown → HTML pipeline (TanStack Start “Setting Up the Markdown Processor”).
 * Used at build time by content-collections; also by CMS preview for live drafts.
 * No syntax highlighting (shiki omitted on purpose).
 */
export async function renderMarkdown(content: string): Promise<MarkdownResult> {
  const headings: Array<MarkdownHeading> = []
  const source = content.trim()
  if (!source) return { markup: '', headings }

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    // Sveltia Lexical soft line breaks (single \n → <br>).
    .use(remarkBreaks)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(() => (tree: Root) => {
      visit(tree, 'element', (node: Element) => {
        if (!['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName)) return
        headings.push({
          id: typeof node.properties?.id === 'string' ? node.properties.id : '',
          text: toString(node),
          level: Number.parseInt(node.tagName.charAt(1), 10),
        })
      })
    })
    .use(rehypeStringify)
    .process(source)

  return {
    markup: String(result),
    headings,
  }
}
