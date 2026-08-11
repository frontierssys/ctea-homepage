import { Markdown } from '#/components/markdown'
import type { AboutHistoryContent } from '#/lib/content/about-history'
import { cn } from '#/lib/utils'
import {
  AboutNextLink,
  AboutTitle,
} from '#/routes/about/-components/about-detail'

export type AboutHistoryViewProps = {
  history: AboutHistoryContent
}

export function AboutHistoryView({ history }: AboutHistoryViewProps) {
  return (
    <>
      <AboutTitle
        className="border-b border-border pb-8 sm:pb-10"
        eyebrow={history.eyebrow}
        title={history.title}
      />
      <section
        className="mt-10 grid gap-14 sm:mt-14 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.75fr)] lg:items-start lg:gap-16"
        aria-label={history.title}
      >
        <div className="lg:col-start-2 lg:row-start-1">
          <div className="relative grid pl-6 before:absolute before:top-2 before:bottom-0 before:left-[-0.7px] before:w-px before:bg-border before:content-[''] sm:pl-10">
            {history.timeline.map((item) => (
              <article
                key={`${item.year}-${item.title}`}
                className="border-t border-border py-7 first:border-t-0 first:pt-0 sm:py-8"
              >
                <p className="relative font-sport text-meta font-semibold tabular-nums text-ctea-brown">
                  <span
                    className="absolute top-1/2 -left-6 size-3 -translate-x-1/2 -translate-y-1 rounded-full border border-ctea-gold-ornament bg-background sm:-left-10"
                    aria-hidden="true"
                  />
                  {item.year}
                </p>
                <h3 className="mt-2 font-display text-card-title text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 font-body text-body-sm text-muted-foreground">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
        <div className="min-w-0 lg:col-start-1 lg:row-start-1">
          <Markdown
            content={history.content}
            className={cn(
              'max-w-3xl font-body text-body text-foreground/90',
              'prose-p:text-foreground/90 prose-p:leading-[inherit]',
              'prose-p:first:font-sport prose-p:first:text-meta prose-p:first:text-ctea-brown',
            )}
          />
        </div>
      </section>
      <div className="mt-14 sm:mt-20">
        <AboutNextLink label={history.nextLabel} to={history.nextTo} />
      </div>
    </>
  )
}
