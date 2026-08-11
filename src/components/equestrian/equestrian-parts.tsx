import type { ComponentProps, ReactNode } from 'react'
import { Markdown } from '#/components/markdown'
import type { EquestrianSection } from '#/lib/content/equestrian'
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

export function EquestrianBody({ children }: { children: ReactNode }) {
  return (
    <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-[minmax(12rem,15rem)_minmax(0,1fr)] lg:items-start lg:gap-16">
      {children}
    </div>
  )
}

export function EquestrianSectionList({
  sections,
}: {
  sections: EquestrianSection[]
}) {
  return (
    <div className="min-w-0 space-y-16 sm:space-y-20">
      {sections.map((section) => (
        <EquestrianSectionBlock key={section.id} section={section} />
      ))}
    </div>
  )
}

type EquestrianSectionTocProps = ComponentProps<'nav'> & {
  sections: EquestrianSection[]
  onNavigate?: () => void
  activeId?: string
}
export function EquestrianSectionToc({
  className,
  sections,
  onNavigate,
  activeId,
}: EquestrianSectionTocProps) {
  return (
    <nav
      aria-label="馬術介紹章節"
      className={cn(
        'lg:sticky lg:top-[calc(var(--layout-header-height)+1.5rem)]',
        className,
      )}
    >
      <p className="font-sport text-overline uppercase text-ctea-brown">
        Contents
      </p>
      <ol className="mt-4 border-t border-border">
        {sections.map((section, index) => {
          const active = activeId === section.id
          return (
            <li key={section.id} className="border-b border-border">
              <a
                href={`#${section.id}`}
                aria-current={active ? 'true' : undefined}
                className={cn(
                  'group flex min-h-11 items-baseline gap-3 py-3 font-body text-body-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ctea-gold-focus',
                  active
                    ? 'text-ctea-gold-statement'
                    : 'text-foreground hover:text-ctea-gold-statement',
                )}
                onClick={onNavigate}
              >
                <span className="font-sport text-meta tabular-nums text-ctea-brown">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  className={cn(
                    'border-b transition-colors duration-200',
                    active
                      ? 'border-ctea-gold-statement'
                      : 'border-transparent group-hover:border-ctea-gold-statement',
                  )}
                >
                  {section.title}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export function EquestrianSectionBlock({
  section,
}: {
  section: EquestrianSection
}) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="scroll-mt-[calc(var(--layout-header-height)+1.5rem)]"
    >
      <header className="border-t border-border pt-8 sm:pt-10">
        <p className="font-sport text-kicker uppercase text-ctea-brown">
          {section.eyebrow}
        </p>
        <h2
          id={`${section.id}-title`}
          className="mt-3 max-w-3xl font-display text-feature-title text-foreground"
        >
          {section.title}
        </h2>
      </header>
      <Markdown
        content={section.content}
        className={cn(
          'mt-6 max-w-3xl font-body text-body text-foreground/90 sm:mt-8',
          'prose-headings:font-display prose-headings:text-foreground',
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
    </section>
  )
}
