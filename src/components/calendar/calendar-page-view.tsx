import {
  EquestrianFrame,
  EquestrianHeader,
} from '#/components/equestrian/equestrian-parts'
import { Markdown } from '#/components/markdown'
import { cn } from '#/lib/utils'

type CalendarPage = {
  eyebrow: string
  title: string
  lead: string
  content: string
}

/** Hook-free — safe for Sveltia CMS preview. */
export function CalendarPageView({ page }: { page: CalendarPage }) {
  return (
    // ponytail: reuse equestrian chrome; split if calendar layout diverges
    <EquestrianFrame>
      <EquestrianHeader
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
      />
      {page.content.trim() ? (
        <div
          className="mt-10 overflow-x-auto overscroll-x-contain focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ctea-gold-focus sm:mt-14"
          tabIndex={0}
          role="region"
          aria-label="行事曆內容，寬表可左右滑動"
        >
          <Markdown
            content={page.content}
            className={cn(
              'min-w-0 font-body text-body text-foreground/90',
              'prose-headings:font-display prose-headings:text-foreground',
              'prose-h2:mt-14 prose-h2:border-t prose-h2:border-border prose-h2:pt-10 prose-h2:text-feature-title first:prose-h2:mt-0 first:prose-h2:border-t-0 first:prose-h2:pt-0',
              'prose-p:text-foreground/90 prose-p:leading-[1.75]',
              'prose-li:text-foreground/90',
              'prose-em:text-muted-foreground',
              'prose-a:font-normal prose-a:no-underline hover:prose-a:text-ctea-gold-statement',
              'prose-table:min-w-176 prose-table:text-body-sm',
              'prose-th:px-3 prose-th:py-3 prose-th:text-left prose-th:font-sport prose-th:text-meta prose-th:font-semibold prose-th:uppercase prose-th:tracking-brand prose-th:text-ctea-brown',
              'prose-td:px-3 prose-td:py-3 prose-td:align-top',
            )}
          />
        </div>
      ) : null}
    </EquestrianFrame>
  )
}
