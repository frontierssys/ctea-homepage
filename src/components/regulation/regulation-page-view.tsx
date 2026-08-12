import { ChevronUp, List } from 'lucide-react'
import {
  useEffect,
  useId,
  useMemo,
  useState,
  type ComponentProps,
} from 'react'
import {
  RegulationDownloadList,
  RegulationFrame,
  RegulationHeader,
  RegulationMarkdown,
  RegulationPageBody,
} from '#/components/regulation/regulation-parts'
import type { RegulationPage, RegulationTocHeading } from '#/lib/content/regulation'
import { cn } from '#/lib/utils'
import { ChevronRight } from 'lucide-react'


export function RegulationPageView({ page }: { page: RegulationPage }) {
  const headingIds = useMemo(
    () => page.headings.map((heading) => heading.id),
    [page.headings],
  )
  const activeId = useActiveHeadingId(headingIds)
  const showToc = page.headings.length > 0

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

function useActiveHeadingId(ids: Array<string>) {
  const [activeId, setActiveId] = useState(ids[0] ?? '')

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element))

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        const nextId = visible[0]?.target.id
        if (nextId) setActiveId(nextId)
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      },
    )

    for (const element of elements) observer.observe(element)
    return () => observer.disconnect()
  }, [ids])

  useEffect(() => {
    if (!ids.includes(activeId)) {
      setActiveId(ids[0] ?? '')
    }
  }, [activeId, ids])

  return activeId
}

type MobileHeadingJumpProps = ComponentProps<'div'> & {
  headings: RegulationPage['headings']
  activeId: string
}

function MobileHeadingJump({
  headings,
  activeId,
  className,
}: MobileHeadingJumpProps) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const activeHeading =
    headings.find((heading) => heading.id === activeId) ?? headings[0]
  const activeIndex = Math.max(
    0,
    headings.findIndex((heading) => heading.id === activeHeading?.id),
  )

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  if (headings.length === 0) return null

  return (
    <div className={cn(className)}>
      {open ? (
        <div
          className="fixed inset-0 z-40 bg-[rgb(5_15_25/0.42)] backdrop-blur-[1px] motion-reduce:backdrop-blur-none"
          aria-label="關閉目錄"
          onClick={() => setOpen(false)}
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
          <RegulationHeadingToc
            headings={headings}
            activeId={activeId}
            onNavigate={() => setOpen(false)}
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
            className="inline-flex min-h-11 items-center gap-2 border border-ctea-gold px-3.5 font-body text-action text-foreground transition-colors duration-200 hover:bg-ctea-gold hover:text-[#091725] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ctea-gold-focus dark:hover:text-[#0b1825]"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
          >
            <List className="size-4" aria-hidden="true" />
            目錄
            <ChevronUp
              className={cn(
                'size-4 transition-transform duration-200 motion-reduce:transition-none',
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
  onNavigate?: () => void
  activeId?: string
}


export function RegulationHeadingToc({
  className,
  headings,
  onNavigate,
  activeId,
}: RegulationHeadingTocProps) {
  const groups = useMemo(() => groupRegulationHeadings(headings), [headings])
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set())

  useEffect(() => {
    if (!activeId) return

    const activeGroup = groups.find(
      (group) =>
        group.heading.id === activeId ||
        group.children.some((child) => child.id === activeId),
    )
    if (!activeGroup || activeGroup.children.length === 0) return

    setExpandedIds((current) => {
      if (current.has(activeGroup.heading.id)) return current
      const next = new Set(current)
      next.add(activeGroup.heading.id)
      return next
    })
  }, [activeId, groups])

  if (headings.length === 0) return null

  function toggleGroup(id: string) {
    setExpandedIds((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

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
          const expanded = hasChildren && expandedIds.has(group.heading.id)
          const groupActive =
            activeId === group.heading.id ||
            group.children.some((child) => child.id === activeId)
          const panelId = `toc-${group.heading.id}`

          return (
            <li key={group.heading.id} className="border-b border-border">
              <div className="flex items-stretch">
                <a
                  href={`#${group.heading.id}`}
                  aria-current={activeId === group.heading.id ? 'true' : undefined}
                  className={cn(
                    'group flex min-h-11 min-w-0 flex-1 items-baseline py-3 pr-1 pl-2 font-body text-body-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ctea-gold-focus',
                    groupActive
                      ? 'text-ctea-gold-statement'
                      : 'text-foreground hover:text-ctea-gold-statement',
                  )}
                  onClick={onNavigate}
                >
                  <span
                    className={cn(
                      'border-b transition-colors duration-200',
                      activeId === group.heading.id
                        ? 'border-ctea-gold-statement'
                        : 'border-transparent group-hover:border-ctea-gold-statement',
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
                  <button
                    type="button"
                    className="grid w-10 shrink-0 place-items-center text-ctea-brown transition-colors hover:text-ctea-gold-statement focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ctea-gold-focus"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    aria-label={expanded ? `收合 ${group.heading.text}` : `展開 ${group.heading.text}`}
                    onClick={() => toggleGroup(group.heading.id)}
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
                            'group flex min-h-10 items-baseline py-2.5 pl-5 pr-2 font-body text-body-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ctea-gold-focus',
                            active
                              ? 'text-ctea-gold-statement'
                              : 'text-muted-foreground hover:text-ctea-gold-statement',
                          )}
                          onClick={onNavigate}
                        >
                          <span
                            className={cn(
                              'border-b transition-colors duration-200',
                              active
                                ? 'border-ctea-gold-statement'
                                : 'border-transparent group-hover:border-ctea-gold-statement',
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