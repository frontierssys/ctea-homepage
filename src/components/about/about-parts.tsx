import type { ReactNode } from 'react'
import { Markdown } from '#/components/markdown'
import { Card } from '#/components/ui/card'
import { cn } from '#/lib/utils'
import {
  AboutNextLink,
  AboutTitle,
} from '#/routes/about/-components/about-detail'
import type { AboutNextTo } from '#/lib/content/about-shared'

/** Hook-free building blocks — safe for Sveltia CMS preview (CMS React runtime). */

export function AboutChrome({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children?: ReactNode
}) {
  return (
    <>
      <AboutTitle
        className="border-b border-border pb-8 sm:pb-10"
        eyebrow={eyebrow}
        title={title}
      />
      {children}
    </>
  )
}

export function AboutFooterLink({
  label,
  to,
}: {
  label: string
  to: AboutNextTo
}) {
  return (
    <div className="mt-14 sm:mt-20">
      <AboutNextLink label={label} to={to} />
    </div>
  )
}

export function AboutMediaLayout({
  image,
  imageAlt,
  children,
}: {
  image: string
  imageAlt: string
  children: ReactNode
}) {
  return (
    <section className="grid gap-6 py-4 lg:grid-cols-[minmax(0,0.62fr)_minmax(18rem,0.38fr)] lg:items-end">
      <figure className="relative overflow-hidden border border-border">
        <img
          src={image}
          alt={imageAlt}
          className="aspect-16/10 h-full w-full object-cover object-[38%_center]"
          loading="lazy"
        />
      </figure>
      <Card className="relative z-10 rounded-none border border-border bg-[#f1f0eb]/90 p-6 ring-0 lg:-ml-16 lg:mb-8 dark:bg-card/90">
        {children}
      </Card>
    </section>
  )
}

export function AboutMediaMarkdown({ content }: { content: string }) {
  if (!content.trim()) return null

  return (
    <Markdown
      content={content}
      className={cn(
        'font-body text-body text-foreground/90',
        'prose-p:my-0 prose-p:text-foreground/90 prose-p:leading-8',
        '[&_p+p]:mt-4',
      )}
    />
  )
}

export function AboutConstitutionBody({ children }: { children: ReactNode }) {
  return (
    <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-[minmax(12rem,15rem)_minmax(0,1fr)] lg:items-start lg:gap-16">
      {children}
    </div>
  )
}

export function AboutConstitutionMarkdown({ content }: { content: string }) {
  if (!content.trim()) return null

  return (
    <Markdown
      content={content}
      className={cn(
        'min-w-0 max-w-3xl scroll-mt-[calc(var(--layout-header-height)+1.5rem)] font-body text-body text-foreground/90',
        'prose-headings:scroll-mt-[calc(var(--layout-header-height)+1.5rem)] prose-headings:font-display prose-headings:text-foreground',
        'prose-h2:mt-14 prose-h2:border-t prose-h2:border-border prose-h2:pt-10 prose-h2:text-feature-title first:prose-h2:mt-0 first:prose-h2:border-t-0 first:prose-h2:pt-0',
        'prose-h3:mt-10 prose-h3:border-t prose-h3:border-border/80 prose-h3:pt-8 prose-h3:text-card-title',
        'prose-p:text-foreground/90 prose-p:leading-[1.75]',
        'prose-strong:font-medium prose-strong:text-foreground',
        'prose-li:text-foreground/90 prose-li:leading-7',
        'prose-ul:my-3',
      )}
    />
  )
}
