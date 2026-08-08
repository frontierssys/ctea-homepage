import { Link } from '@tanstack/react-router'
import { ArrowLeft, Download, FileText } from 'lucide-react'
import type { MouseEventHandler } from 'react'
import { getCategoryLabel, type EventItem } from '#/lib/content/events'

export type EventDetailViewProps = {
  event: EventItem
  onBack?: () => void
  onNavigate?: MouseEventHandler<HTMLAnchorElement>
}

export function EventDetailView({ event, onBack, onNavigate }: EventDetailViewProps) {
  const categoryLabel = getCategoryLabel(event.category)

  return (
    <main className="relative z-10 px-5 py-10 text-[#151310] transition-colors duration-200 dark:text-[#f1eade] md:px-10 lg:px-16">
      <div className="mx-auto max-w-[840px]">
        <article>
          <header className="border-b border-[rgba(182,140,67,.38)] pb-8 dark:border-[#3a4752]">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="font-sport text-kicker text-[#a77d35] uppercase dark:text-[#c6a465]">
                {categoryLabel}
              </span>
              {event.date ? (
                <time
                  dateTime={event.date}
                  className="font-sport text-meta text-[#7e5f2e] uppercase dark:text-[#a99267]"
                >
                  {event.date.replaceAll('-', '.')}
                </time>
              ) : null}
              {event.author ? (
                <span className="font-body text-body-sm text-[#62615e] dark:text-[#b3aa99]">
                  {event.author}
                </span>
              ) : null}
            </div>
            <h1 className="mt-5 font-display text-feature-title text-[#151310] dark:text-[#f1eade]">
              {event.title}
            </h1>
            {event.tags.length > 0 ? (
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="標籤">
                {event.tags.map((tag) => (
                  <li
                    key={tag}
                    className="border border-[rgba(182,140,67,.38)] px-3 py-1 font-body text-meta text-[#7e5f2e] dark:border-[#3a4752] dark:text-[#a99267]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </header>

          {event.content ? (
            <div
              className="prose prose-lg mt-8 max-w-none text-[#43423e] prose-headings:font-display prose-headings:text-[#151310] prose-a:text-[#a77d35] prose-strong:text-[#151310] dark:text-[#b3aa99] dark:prose-headings:text-[#f1eade] dark:prose-a:text-[#c6a465] dark:prose-strong:text-[#f1eade]"
              // Expects HTML from the route loader / CMS preview (Markdown → HTML via marked).
              dangerouslySetInnerHTML={{ __html: event.content }}
            />
          ) : null}

          {event.attachments.length > 0 ? (
            <section
              className="mt-12 border-t border-[rgba(182,140,67,.38)] pt-8 dark:border-[#3a4752]"
              aria-labelledby="attachments-title"
            >
              <h2
                id="attachments-title"
                className="font-display text-card-title text-[#151310] dark:text-[#f1eade]"
              >
                附件下載
              </h2>
              <ul className="mt-5 space-y-3">
                {event.attachments.map((file) => (
                  <li key={`${file.name}-${file.url}`}>
                    <a
                      href={file.url}
                      className="flex min-h-14 items-center gap-4 border border-[rgba(182,140,67,.38)] px-4 py-3 transition-colors duration-200 hover:bg-[rgba(185,145,75,.08)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#9b742e] dark:border-[#3a4752] dark:hover:bg-[#213140] dark:focus-visible:outline-[#c6a465]"
                      onClick={onNavigate}
                    >
                      <FileText
                        className="size-5 shrink-0 text-[#a77d35] dark:text-[#c6a465]"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block font-body text-body font-semibold text-[#151310] dark:text-[#f1eade]">
                          {file.name}
                        </span>
                        {file.size ? (
                          <span className="mt-0.5 block font-sport text-meta text-[#7e5f2e] uppercase dark:text-[#a99267]">
                            {file.size}
                          </span>
                        ) : null}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-body text-action text-[#a77d35] dark:text-[#c6a465]">
                        <Download className="size-4" strokeWidth={1.5} aria-hidden="true" />
                        下載
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </article>

        <div className="mt-12">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex min-h-11 items-center gap-2 font-body text-action text-[#a77d35] transition-colors hover:text-[#7e5f2e] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#9b742e] dark:text-[#c6a465] dark:hover:text-[#a99267] dark:focus-visible:outline-[#c6a465]"
            >
              <ArrowLeft className="size-4" strokeWidth={1.5} aria-hidden="true" />
              返回活動看板
            </button>
          ) : (
            <Link
              to="/events"
              onClick={onNavigate}
              className="inline-flex min-h-11 items-center gap-2 font-body text-action text-[#a77d35] transition-colors hover:text-[#7e5f2e] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#9b742e] dark:text-[#c6a465] dark:hover:text-[#a99267] dark:focus-visible:outline-[#c6a465]"
            >
              <ArrowLeft className="size-4" strokeWidth={1.5} aria-hidden="true" />
              返回活動看板
            </Link>
          )}
        </div>
      </div>
    </main>
  )
}
