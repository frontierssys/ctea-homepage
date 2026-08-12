/**
 * Site-only TOC surface (hooks).
 * Do not import from CMS preview — use `#/components/toc/parts` instead.
 */

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react'
import {
  groupTocHeadings,
  HeadingToc,
  TocMobileJump,
} from '#/components/ui/toc/parts'
import type { TocHeading } from '#/lib/content/toc'

type TocState = {
  headings: Array<TocHeading>
  activeId: string
  expandedIds: Set<string>
  open: boolean
}

type TocActions = {
  navigate: () => void
  toggleGroup: (id: string) => void
  setOpen: (open: boolean) => void
}

type TocMeta = {
  panelId: string
}

type TocContextValue = {
  state: TocState
  actions: TocActions
  meta: TocMeta
}

const TocContext = createContext<TocContextValue | null>(null)

function useToc() {
  const value = useContext(TocContext)
  if (!value) {
    throw new Error('Live TOC components must be used within LiveTocProvider')
  }
  return value
}

export function LiveTocProvider({
  headings,
  children,
}: {
  headings: Array<TocHeading>
  children: ReactNode
}) {
  const headingIds = useMemo(
    () => headings.map((heading) => heading.id),
    [headings],
  )
  const activeId = useActiveAnchorId(headingIds)
  const groups = useMemo(() => groupTocHeadings(headings), [headings])
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set())
  const [open, setOpen] = useState(false)
  const panelId = useId()

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

  const value = useMemo<TocContextValue>(
    () => ({
      state: { headings, activeId, expandedIds, open },
      actions: {
        navigate: () => setOpen(false),
        toggleGroup: (id: string) => {
          setExpandedIds((current) => {
            const next = new Set(current)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
          })
        },
        setOpen,
      },
      meta: { panelId },
    }),
    [headings, activeId, expandedIds, open, panelId],
  )

  return <TocContext.Provider value={value}>{children}</TocContext.Provider>
}

export function LiveHeadingToc({
  className,
}: Pick<ComponentProps<'nav'>, 'className'>) {
  const {
    state: { headings, activeId, expandedIds },
    actions: { navigate, toggleGroup },
  } = useToc()

  return (
    <HeadingToc
      className={className}
      headings={headings}
      activeId={activeId}
      expandedIds={expandedIds}
      onNavigate={navigate}
      onToggleGroup={toggleGroup}
    />
  )
}

export function LiveTocMobileJump({
  className,
}: Pick<ComponentProps<'div'>, 'className'>) {
  const {
    state: { headings, activeId, expandedIds, open },
    actions: { setOpen, navigate, toggleGroup },
    meta: { panelId },
  } = useToc()

  return (
    <TocMobileJump
      className={className}
      headings={headings}
      activeId={activeId}
      open={open}
      onOpenChange={setOpen}
      panelId={panelId}
    >
      <HeadingToc
        className="pb-2"
        headings={headings}
        activeId={activeId}
        expandedIds={expandedIds}
        onNavigate={navigate}
        onToggleGroup={toggleGroup}
      />
    </TocMobileJump>
  )
}

/** Scroll-spy active anchor id via IntersectionObserver. Site only (uses hooks). */
export function useActiveAnchorId(ids: Array<string>) {
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
