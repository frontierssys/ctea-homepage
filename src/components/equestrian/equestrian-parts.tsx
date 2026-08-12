import type { ReactNode } from 'react'
import { Markdown } from '#/components/markdown'
import { cn } from '#/lib/utils'

/** Hook-free building blocks — safe for Sveltia CMS preview (CMS React runtime). */

export function EquestrianFrame({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <article
      className={cn(
        'relative mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 sm:py-14 md:px-10 lg:px-16 lg:py-16',
        className,
      )}
    >
      {children}
    </article>
  )
}

export function EquestrianHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string
  title: string
  lead: string
}) {
  return (
    <header className="border-b border-border pb-10 sm:pb-12">
      <p className="font-sport text-kicker uppercase text-ctea-brown">{eyebrow}</p>
      <h1 className="mt-4 max-w-4xl font-display text-section text-foreground">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl font-body text-lead text-muted-foreground">
        {lead}
      </p>
    </header>
  )
}

export function EquestrianPageBody({ children }: { children: ReactNode }) {
  return (
    <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-[minmax(12rem,15rem)_minmax(0,1fr)] lg:items-start lg:gap-16">
      {children}
    </div>
  )
}

export function EquestrianMarkdown({ content }: { content: string }) {
  if (!content.trim()) return null

  return (
    <Markdown
      content={content}
      className={cn(
        'min-w-0 max-w-3xl scroll-mt-[calc(var(--layout-header-height)+1.5rem)] font-body text-body text-foreground/90',
        'prose-headings:scroll-mt-[calc(var(--layout-header-height)+1.5rem)] prose-headings:font-display prose-headings:text-foreground',
        'prose-h2:mt-14 prose-h2:border-t prose-h2:border-border prose-h2:pt-10 prose-h2:text-feature-title first:prose-h2:mt-0 first:prose-h2:border-t-0 first:prose-h2:pt-0',
        'prose-h3:mt-10 prose-h3:border-t prose-h3:border-border/80 prose-h3:pt-8 prose-h3:text-card-title',
        'prose-h4:mt-6 prose-h4:font-body prose-h4:text-action prose-h4:tracking-[0.04em] prose-h4:text-ctea-brown',
        'prose-p:text-foreground/90 prose-p:leading-[1.75]',
        'prose-li:text-foreground/90',
        'prose-blockquote:border-ctea-gold prose-blockquote:text-foreground',
        'prose-a:font-normal prose-a:no-underline hover:prose-a:text-ctea-gold-statement',
        'prose-table:text-body-sm',
        'prose-th:font-sport prose-th:text-meta prose-th:font-semibold prose-th:uppercase prose-th:tracking-brand prose-th:text-ctea-brown',
        'prose-td:align-top',
      )}
    />
  )
}
