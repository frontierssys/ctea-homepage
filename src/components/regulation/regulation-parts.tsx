import { Link } from '@tanstack/react-router'
import { ArrowLeft, Download, FileText } from 'lucide-react'
import {
  type ReactNode,
} from 'react'
import { Markdown } from '#/components/markdown'
import {
  type RegulationDownload,
  type RegulationPageId,
} from '#/lib/content/regulation'
import { cn } from '#/lib/utils'


export function RegulationFrame({
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

export function RegulationHeader({
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

export function RegulationBackLink({
  label,
  to,
  params,
}: {
  label: string
  to: '/regulation' | '/regulation/$sectionId'
  params?: { sectionId: RegulationPageId }
}) {
  return (
    <Link
      to={to}
      params={params}
      className="inline-flex min-h-11 items-center gap-2 font-body text-action text-ctea-gold-statement transition-colors hover:text-ctea-brown focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ctea-gold-focus"
    >
      <ArrowLeft className="size-4" strokeWidth={1.5} aria-hidden="true" />
      {label}
    </Link>
  )
}

export function RegulationDownloadList({
  downloads,
  className,
}: {
  downloads: Array<RegulationDownload>
  className?: string
}) {
  if (downloads.length === 0) return null

  return (
    <ul className={cn('border-t border-border', className)}>
      {downloads.map((file) => {
        const meta = [file.source, file.format].filter(Boolean).join(' · ')
        return (
          <li key={`${file.name}-${file.url}`} className="border-b border-border">
            <a
              href={file.url}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-14 items-center gap-4 py-3 transition-colors duration-200 hover:bg-[rgba(185,145,75,.06)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ctea-gold-focus"
            >
              <FileText
                className="size-5 shrink-0 text-ctea-gold-statement"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span className="min-w-0 flex-1">
                <span className="block font-body text-body font-semibold text-foreground">
                  {file.name}
                </span>
                {meta ? (
                  <span className="mt-0.5 block font-sport text-meta uppercase text-ctea-brown">
                    {meta}
                  </span>
                ) : null}
              </span>
              <span className="inline-flex items-center gap-1.5 font-body text-action text-ctea-gold-statement">
                <Download className="size-4" strokeWidth={1.5} aria-hidden="true" />
                下載
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export function RegulationPageBody({ children }: { children: ReactNode }) {
  return (
    <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-[minmax(12rem,15rem)_minmax(0,1fr)] lg:items-start lg:gap-16">
      {children}
    </div>
  )
}



export function RegulationMarkdown({ content }: { content: string }) {
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