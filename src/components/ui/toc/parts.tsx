/**
 * Hook-free TOC surface — safe for Sveltia CMS preview.
 * Site interactive state lives in `#/components/toc/live`.
 */

import { ChevronRight, ChevronUp, List } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'
import type { TocHeading } from '#/lib/content/toc'
import { cn } from '#/lib/utils'

export type TocGroup = {
  heading: TocHeading
  children: Array<TocHeading>
}

/** Nest flat h2/h3 headings into expandable groups. */
export function groupTocHeadings(
  headings: Array<TocHeading>,
): Array<TocGroup> {
  const groups: Array<TocGroup> = []

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

export type HeadingTocProps = ComponentProps<'nav'> & {
  headings: Array<TocHeading>
  activeId?: string
  /** When omitted, groups with children render expanded (static preview). */
  expandedIds?: Set<string>
  onNavigate?: () => void
  /** When omitted, expand control is decorative (static preview). */
  onToggleGroup?: (id: string) => void
}

/**
 * Nested heading TOC.
 * Pass onToggleGroup + expandedIds for interactive expand/collapse.
 */
export function HeadingToc({
  className,
  headings,
  activeId,
  expandedIds,
  onNavigate,
  onToggleGroup,
}: HeadingTocProps) {
  const groups = groupTocHeadings(headings)
  const interactive = typeof onToggleGroup === 'function'

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
          const expanded =
            hasChildren &&
            (interactive ? Boolean(expandedIds?.has(group.heading.id)) : true)
          const groupActive =
            activeId === group.heading.id ||
            group.children.some((child) => child.id === activeId)
          const panelId = `toc-${group.heading.id}`

          return (
            <li key={group.heading.id} className="border-b border-border">
              <div className="flex items-stretch">
                <a
                  href={`#${group.heading.id}`}
                  aria-current={
                    activeId === group.heading.id ? 'true' : undefined
                  }
                  className={cn(
                    'group flex min-h-11 min-w-0 flex-1 items-baseline py-3 pr-1 pl-2 font-body text-body-sm',
                    interactive &&
                      'transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ctea-gold-focus',
                    groupActive
                      ? 'text-foreground'
                      : interactive
                        ? 'text-foreground hover:text-ctea-gold-statement'
                        : 'text-foreground',
                  )}
                  onClick={onNavigate}
                >
                  <span
                    className={cn(
                      'border-b',
                      interactive && 'transition-colors duration-200',
                      activeId === group.heading.id
                        ? 'border-ctea-gold-statement'
                        : interactive
                          ? 'border-transparent group-hover:border-ctea-gold-statement'
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
                  interactive ? (
                    <button
                      type="button"
                      className="grid w-10 shrink-0 place-items-center text-ctea-brown transition-colors hover:text-ctea-gold-statement focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ctea-gold-focus"
                      aria-expanded={expanded}
                      aria-controls={panelId}
                      aria-label={
                        expanded
                          ? `收合 ${group.heading.text}`
                          : `展開 ${group.heading.text}`
                      }
                      onClick={() => onToggleGroup(group.heading.id)}
                    >
                      <ChevronRight
                        className={cn(
                          'size-4 transition-transform duration-200 motion-reduce:transition-none',
                          expanded ? 'rotate-90' : 'rotate-0',
                        )}
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </button>
                  ) : (
                    <span
                      className="grid w-10 shrink-0 place-items-center text-ctea-brown"
                      aria-hidden="true"
                    >
                      <ChevronRight
                        className="size-4 rotate-90"
                        strokeWidth={1.5}
                      />
                    </span>
                  )
                ) : null}
              </div>

              {hasChildren && expanded ? (
                <ol id={panelId} className="border-t border-border/70 pb-1">
                  {group.children.map((child) => {
                    const active = activeId === child.id
                    return (
                      <li key={child.id}>
                        <a
                          href={`#${child.id}`}
                          aria-current={active ? 'true' : undefined}
                          className={cn(
                            'group flex min-h-10 items-baseline py-2.5 pl-5 pr-2 font-body text-body-sm',
                            interactive &&
                              'transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ctea-gold-focus',
                            active
                              ? 'text-foreground'
                              : interactive
                                ? 'text-muted-foreground hover:text-ctea-gold-statement'
                                : 'text-muted-foreground',
                          )}
                          onClick={onNavigate}
                        >
                          <span
                            className={cn(
                              'border-b',
                              interactive && 'transition-colors duration-200',
                              active
                                ? 'border-ctea-gold-statement'
                                : interactive
                                  ? 'border-transparent group-hover:border-ctea-gold-statement'
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

export type TocMobileJumpProps = ComponentProps<'div'> & {
  headings: Array<TocHeading>
  activeId?: string
  open: boolean
  /** When omitted, toggle is disabled (static preview). */
  onOpenChange?: (open: boolean) => void
  panelId?: string
  children: ReactNode
}

/**
 * Mobile TOC sheet chrome.
 * Pass children as the HeadingToc (or live-connected tree).
 */
export function TocMobileJump({
  headings,
  activeId,
  open,
  onOpenChange,
  panelId,
  className,
  children,
}: TocMobileJumpProps) {
  const interactive = typeof onOpenChange === 'function'
  const activeHeading =
    headings.find((heading) => heading.id === activeId) ?? headings[0]
  const activeIndex = Math.max(
    0,
    headings.findIndex((heading) => heading.id === activeHeading?.id),
  )

  if (headings.length === 0) return null

  return (
    <div className={cn(className)}>
      {open && interactive ? (
        <div
          className="fixed inset-0 z-40 bg-[rgb(5_15_25/0.42)] backdrop-blur-[1px] motion-reduce:backdrop-blur-none"
          aria-label="關閉目錄"
          onClick={() => onOpenChange(false)}
        />
      ) : null}

      <div
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 border-t border-ctea-gold/40 bg-[rgba(251,248,241,0.96)] shadow-[0_-12px_40px_rgba(78,58,27,0.08)] backdrop-blur-sm dark:border-[rgba(198,164,101,0.35)] dark:bg-[rgba(18,34,49,0.96)] dark:shadow-[0_-12px_40px_rgba(2,8,14,0.35)]',
          'pb-[max(0.75rem,env(safe-area-inset-bottom))]',
        )}
      >
        <section
          id={panelId}
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
          {children}
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
            className={cn(
              'inline-flex min-h-11 items-center gap-2 border border-ctea-gold px-3.5 font-body text-action text-foreground',
              interactive &&
                'transition-colors duration-200 hover:bg-ctea-gold hover:text-[#091725] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ctea-gold-focus dark:hover:text-[#0b1825]',
            )}
            aria-expanded={open}
            aria-controls={panelId}
            disabled={!interactive}
            onClick={interactive ? () => onOpenChange(!open) : undefined}
          >
            <List className="size-4" aria-hidden="true" />
            目錄
            <ChevronUp
              className={cn(
                'size-4',
                interactive &&
                  'transition-transform duration-200 motion-reduce:transition-none',
                open ? 'rotate-0' : 'rotate-180',
              )}
              aria-hidden="true"
            />
          </button>
        </section>
      </div>
    </div>
  )
}
