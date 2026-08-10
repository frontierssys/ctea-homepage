import { Link } from '@tanstack/react-router'
import {
  DEFAULT_EVENT_PAGE,
  type EventPageContent,
} from '#/lib/content/event-page'
import {
  EVENT_CATEGORIES,
  EVENT_FILTER_TAGS,
  type EventCategoryId,
  type EventFilterTag,
  type EventItem,
} from '#/lib/content/events'
import { cn } from '#/lib/utils'

export type EventsIndexViewProps = {
  page?: EventPageContent
  events: Array<EventItem>
  activeCategory: EventCategoryId
  selectedTags: Array<EventFilterTag>
  onCategoryChange: (category: EventCategoryId) => void
  onToggleTag: (tag: EventFilterTag) => void
}

export function EventsIndexView({
  page = DEFAULT_EVENT_PAGE,
  events,
  activeCategory,
  selectedTags,
  onCategoryChange,
  onToggleTag,
}: EventsIndexViewProps) {
  const filteredEvents = events.filter((event) => {
    const matchesCategory = event.category === activeCategory
    const matchesTags = selectedTags.every((tag) => event.tags.includes(tag))
    return matchesCategory && matchesTags
  })

  return (
    <main className="events-motion relative z-10 px-5 py-10 text-[#151310] transition-colors duration-200 dark:text-[#f1eade] md:px-10 lg:px-16">
      <div className="mx-auto max-w-360">
        <header className="events-motion-intro max-w-2xl">
          <p className="font-sport text-kicker text-[#a77d35] uppercase dark:text-[#c6a465]">
            {page.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-section text-[#151310] dark:text-[#f1eade]">
            {page.title}
          </h1>
          <span className="events-motion-rule mt-5 block h-px w-16 bg-[#a77d35] dark:bg-[#c6a465]" aria-hidden="true" />
          <p className="mt-4 font-body text-lead text-[#62615e] dark:text-[#b3aa99]">
            {page.description}
          </p>
        </header>

        <nav aria-label="公告分類" className="mt-8 flex flex-wrap gap-3">
          {EVENT_CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id

            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  'events-motion-chip min-h-11 border border-[rgba(182,140,67,.38)] bg-[rgba(251,246,237,.8)] px-5 font-body text-action text-[#43423e] transition-colors duration-200 hover:bg-[rgba(185,145,75,.1)] hover:text-[#151310] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#9b742e] dark:border-[#3a4752] dark:bg-[rgba(18,34,49,.72)] dark:text-[#b3aa99] dark:hover:bg-[#213140] dark:hover:text-[#f1eade] dark:focus-visible:outline-[#c6a465]',
                  isActive &&
                    'border-[#a77d35] bg-[#a77d35] text-[#fbf6ed] hover:border-[#a77d35] hover:bg-[#a77d35] hover:text-[#fbf6ed] dark:border-[#c6a465] dark:bg-[#c6a465] dark:text-[#0b1825] dark:hover:border-[#c6a465] dark:hover:bg-[#c6a465] dark:hover:text-[#0b1825]',
                )}
              >
                {category.label}
              </button>
            )
          })}
        </nav>

        <section
          className="events-motion-filters mt-6 border border-[rgba(182,140,67,.38)] bg-[rgba(251,246,237,.72)] p-5 dark:border-[#3a4752] dark:bg-[rgba(18,34,49,.55)]"
          aria-labelledby="tag-filter-title"
        >
          <h2
            id="tag-filter-title"
            className="font-display text-card-title text-[#151310] dark:text-[#f1eade]"
          >
            標籤篩選
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {EVENT_FILTER_TAGS.map((tag) => {
              const isSelected = selectedTags.includes(tag)

              return (
                <button
                  key={tag}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onToggleTag(tag)}
                  className={cn(
                    'min-h-9 border border-[rgba(182,140,67,.35)] bg-[#fbf6ed] px-4 font-body text-meta text-[#43423e] transition-colors duration-200 hover:border-[#a77d35] hover:bg-[rgba(185,145,75,.1)] hover:text-[#151310] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#9b742e] dark:border-[#3a4752] dark:bg-[#122231] dark:text-[#b3aa99] dark:hover:border-[#c6a465] dark:hover:bg-[#213140] dark:hover:text-[#f1eade] dark:focus-visible:outline-[#c6a465]',
                    isSelected &&
                      'border-[#a77d35] bg-[rgba(167,125,53,.14)] text-[#7e5f2e] hover:border-[#a77d35] hover:bg-[rgba(167,125,53,.18)] hover:text-[#7e5f2e] dark:border-[#c6a465] dark:bg-[rgba(198,164,101,.16)] dark:text-[#c6a465] dark:hover:border-[#c6a465] dark:hover:bg-[rgba(198,164,101,.22)] dark:hover:text-[#c6a465]',
                  )}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        </section>

        <section className="events-motion-list mt-8" aria-label="公告列表">
          {filteredEvents.length > 0 ? (
            <ul className="divide-y divide-[rgba(182,140,67,.38)] border-y border-[rgba(182,140,67,.38)] dark:divide-[#3a4752] dark:border-[#3a4752]">
              {filteredEvents.map((event) => (
                <li key={event.id}>
                  <Link
                    to="/events/$eventId"
                    params={{ eventId: event.id }}
                    className="group flex min-h-14 flex-col gap-2 py-5 transition-colors duration-200 hover:bg-[rgba(185,145,75,.06)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9b742e] dark:hover:bg-[#213140] dark:focus-visible:outline-[#c6a465] sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                  >
                    <EventRowContent event={event} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-body text-body text-[#686762] dark:text-[#b3aa99]">
              目前沒有符合條件的公告。
            </p>
          )}
        </section>
      </div>

      <style>{`
        .events-motion {
          --events-ease: cubic-bezier(0.16, 1, 0.3, 1);
        }

        .events-motion-intro {
          animation: events-intro-resolve 640ms var(--events-ease) both;
        }

        .events-motion-rule {
          transform-origin: left center;
          animation: events-rule-draw 520ms var(--events-ease) 120ms both;
        }

        .events-motion-chip {
          animation: events-chip-settle 480ms var(--events-ease) both;
        }

        .events-motion-chip:nth-child(2) {
          animation-delay: 60ms;
        }

        .events-motion-chip:nth-child(3) {
          animation-delay: 120ms;
        }

        .events-motion-chip:nth-child(4) {
          animation-delay: 180ms;
        }

        .events-motion-chip:nth-child(5) {
          animation-delay: 180ms;
        }

        .events-motion-chip:nth-child(6) {
          animation-delay: 180ms;
        }

        .events-motion-filters {
          animation: events-panel-settle 600ms var(--events-ease) 140ms both;
        }

        .events-motion-list {
          animation: events-list-resolve 700ms var(--events-ease) 200ms both;
        }

        @keyframes events-intro-resolve {
          from {
            opacity: 0;
            transform: translate3d(-14px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes events-rule-draw {
          from {
            opacity: 0.35;
            transform: scaleX(0);
          }
          to {
            opacity: 1;
            transform: scaleX(1);
          }
        }

        @keyframes events-chip-settle {
          from {
            opacity: 0;
            transform: translate3d(-12px, 0, 0) scaleX(0.985);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scaleX(1);
          }
        }

        @keyframes events-panel-settle {
          from {
            opacity: 0;
            transform: translate3d(-10px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes events-list-resolve {
          from {
            opacity: 0;
            transform: translate3d(16px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .events-motion *,
          .events-motion *::before,
          .events-motion *::after {
            animation: none !important;
            transition-duration: 1ms !important;
            transform: none !important;
          }
        }
      `}</style>
    </main>
  )
}

function EventRowContent({ event }: { event: EventItem }) {
  return (
    <>
      <span className="font-body text-body font-semibold text-[#151310] group-hover:text-[#a77d35] dark:text-[#f1eade] dark:group-hover:text-[#c6a465]">
        {event.title}
      </span>
      {event.date ? (
        <time
          dateTime={event.date}
          className="shrink-0 font-sport text-meta text-[#7e5f2e] uppercase dark:text-[#a99267]"
        >
          {event.date.replaceAll('-', '.')}
        </time>
      ) : null}
    </>
  )
}
