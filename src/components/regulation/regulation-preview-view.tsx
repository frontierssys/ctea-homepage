import {
  RegulationDownloadList,
  RegulationFrame,
  RegulationHeader,
  RegulationMarkdown,
  RegulationPageBody,
} from '#/components/regulation/regulation-parts'
import type {
  RegulationPage,
  RegulationTocHeading,
} from '#/lib/content/regulation'
import { cn } from '#/lib/utils'
import { ChevronRight, ChevronUp, List } from 'lucide-react'
import type { ComponentProps } from 'react'

/**
 * Explicit preview variant — composes hook-free parts only.
 * Do not import RegulationPageView here (scroll spy / TOC / mobile jump use hooks).
 * Sveltia CMS preview has no React hooks dispatcher.
 */
export function RegulationPagePreviewView({ page }: { page: RegulationPage }) {
  const showToc = page.headings.length > 0
  const activeId = page.headings[0]?.id

  return (
    <RegulationFrame className={showToc ? 'pb-28 lg:pb-16' : undefined}>
      <RegulationHeader
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
      />

      {page.downloads.length > 0 ? (
        <section
          aria-labelledby="regulation-downloads"
          className="mt-10 sm:mt-12"
        >
          <h2
            id="regulation-downloads"
            className="font-sport text-overline uppercase text-ctea-brown"
          >
            檔案下載
          </h2>
          <RegulationDownloadList
            className="mt-4"
            downloads={page.downloads}
          />
        </section>
      ) : null}

      {showToc ? (
        <RegulationPageBody>
          <RegulationHeadingToc
            className="hidden lg:flex"
            headings={page.headings}
            activeId={activeId}
          />
          <RegulationMarkdown content={page.content} />
        </RegulationPageBody>
      ) : (
        <div className="mt-10 sm:mt-14">
          <RegulationMarkdown content={page.content} />
        </div>
      )}

      {showToc ? (
        <MobileHeadingJump
          className="lg:hidden"
          headings={page.headings}
          activeId={activeId}
        />
      ) : null}
    </RegulationFrame>
  )
}

type RegulationTocGroup = {
  heading: RegulationTocHeading
  children: Array<RegulationTocHeading>
}

function groupRegulationHeadings(
  headings: Array<RegulationTocHeading>,
): Array<RegulationTocGroup> {
  const groups: Array<RegulationTocGroup> = []

  for (const heading of headings) {
    if (heading.level <= 2) {
      groups.push({ heading, children: [] })
      continue
    }

    const parent = groups.at(-1)
    if (parent && parent.heading.level <= 2) {
      parent.children.push(heading)
      continue
    }

    groups.push({ heading, children: [] })
  }

  return groups
}

type RegulationHeadingTocProps = ComponentProps<'nav'> & {
  headings: Array<RegulationTocHeading>
  activeId?: string
}

/** Static TOC chrome for CMS preview — no expand/collapse, no hooks. */
function RegulationHeadingToc({
  className,
  headings,
  activeId,
}: RegulationHeadingTocProps) {
  const groups = groupRegulationHeadings(headings)

  if (headings.length === 0) return null

  return (
    <nav
      aria-label="目錄"
      className={cn(
        'flex max-h-[calc(100dvh-var(--layout-header-height)-3rem)] flex-col overflow-hidden lg:sticky lg:top-[calc(var(--layout-header-height)+1.5rem)]',
        className,
      )}
    >
      <p className="shrink-0 font-sport text-overline uppercase text-ctea-brown">
        Contents
      </p>
      <ol className="mt-4 min-h-0 flex-1 overflow-y-auto overscroll-contain border-t border-border [scrollbar-gutter:stable]">
        {groups.map((group) => {
          const hasChildren = group.children.length > 0
          const groupActive =
            activeId === group.heading.id ||
            group.children.some((child) => child.id === activeId)

          return (
            <li key={group.heading.id} className="border-b border-border">
              <div className="flex items-stretch">
                <a
                  href={`#${group.heading.id}`}
                  aria-current={activeId === group.heading.id ? 'true' : undefined}
                  className={cn(
                    'group flex min-h-11 min-w-0 flex-1 items-baseline py-3 pr-1 pl-2 font-body text-body-sm',
                    groupActive
                      ? 'text-ctea-gold-statement'
                      : 'text-foreground',
                  )}
                >
                  <span
                    className={cn(
                      'border-b',
                      activeId === group.heading.id
                        ? 'border-ctea-gold-statement'
                        : 'border-transparent',
                    )}
                  >
                    {group.heading.text}
                  </span>
                  {hasChildren ? (
                    <span className="ml-2 font-sport text-meta tabular-nums text-ctea-brown">
                      {group.children.length}
                    </span>
                  ) : null}
                </a>

                {hasChildren ? (
                  <span
                    className="grid w-10 shrink-0 place-items-center text-ctea-brown"
                    aria-hidden="true"
                  >
                    <ChevronRight
                      className="size-4 rotate-90"
                      strokeWidth={1.5}
                    />
                  </span>
                ) : null}
              </div>

              {hasChildren ? (
                <ol className="border-t border-border/70 pb-1">
                  {group.children.map((child) => {
                    const active = activeId === child.id
                    return (
                      <li key={child.id}>
                        <a
                          href={`#${child.id}`}
                          aria-current={active ? 'true' : undefined}
                          className={cn(
                            'group flex min-h-10 items-baseline py-2.5 pl-5 pr-2 font-body text-body-sm',
                            active
                              ? 'text-ctea-gold-statement'
                              : 'text-muted-foreground',
                          )}
                        >
                          <span
                            className={cn(
                              'border-b',
                              active
                                ? 'border-ctea-gold-statement'
                                : 'border-transparent',
                            )}
                          >
                            {child.text}
                          </span>
                        </a>
                      </li>
                    )
                  })}
                </ol>
              ) : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

type MobileHeadingJumpProps = ComponentProps<'div'> & {
  headings: RegulationPage['headings']
  activeId?: string
}

/** Static mobile jump chrome for CMS preview — panel stays closed, no hooks. */
function MobileHeadingJump({
  headings,
  activeId,
  className,
}: MobileHeadingJumpProps) {
  const open = false
  const activeHeading =
    headings.find((heading) => heading.id === activeId) ?? headings[0]
  const activeIndex = Math.max(
    0,
    headings.findIndex((heading) => heading.id === activeHeading?.id),
  )

  if (headings.length === 0) return null

  return (
    <div className={cn(className)}>
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 border-t border-ctea-gold/40 bg-[rgba(251,248,241,0.96)] shadow-[0_-12px_40px_rgba(78,58,27,0.08)] backdrop-blur-sm dark:border-[rgba(198,164,101,0.35)] dark:bg-[rgba(18,34,49,0.96)] dark:shadow-[0_-12px_40px_rgba(2,8,14,0.35)]',
          'pb-[max(0.75rem,env(safe-area-inset-bottom))]',
        )}
      >
        <section
          role="dialog"
          aria-modal="true"
          aria-label="目錄"
          hidden={!open}
          className="max-h-[min(70dvh,28rem)] overflow-y-auto px-5 pt-2"
        >
          <div
            className="mx-auto mb-3 h-1 w-10 rounded-full bg-ctea-gold/45"
            aria-hidden="true"
          />
          <RegulationHeadingToc
            headings={headings}
            activeId={activeId}
            className="pb-2"
          />
        </section>

        <section className="flex items-center gap-3 px-4 pt-3">
          <div className="min-w-0 flex-1">
            <p className="font-sport text-overline uppercase text-ctea-brown">
              {String(activeIndex + 1).padStart(2, '0')} /{' '}
              {String(headings.length).padStart(2, '0')}
            </p>
            <p className="truncate font-body text-body-sm text-foreground">
              {activeHeading?.text}
            </p>
          </div>

          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-2 border border-ctea-gold px-3.5 font-body text-action text-foreground"
            aria-expanded={false}
            disabled
          >
            <List className="size-4" aria-hidden="true" />
            目錄
            <ChevronUp
              className="size-4 rotate-180"
              aria-hidden="true"
            />
          </button>
        </section>
      </div>
    </div>
  )
}
