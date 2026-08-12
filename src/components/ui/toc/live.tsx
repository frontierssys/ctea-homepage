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

/** Match sticky header + heading scroll-mt so click/scroll share the same active line. */
function getHeadingActivationOffset() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--layout-header-height')
    .trim()
  const headerHeight = Number.parseFloat(raw) || 0
  return headerHeight + 24
}

/**
 * Scroll-spy active anchor id.
 * Last heading whose top has crossed the sticky-header line — works for
 * wheel scroll and hash clicks (scroll-mt parks headings above mid-viewport
 * IntersectionObserver bands, which used to leave active stuck).
 */
export function useActiveAnchorId(ids: Array<string>) {
  const [activeId, setActiveId] = useState(ids[0] ?? '')

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element))

    if (elements.length === 0) return

    const resolveActiveId = () => {
      const offset = getHeadingActivationOffset()
      let current = elements[0]?.id ?? ''
      for (const element of elements) {
        if (element.getBoundingClientRect().top <= offset) {
          current = element.id
        } else {
          break
        }
      }

      const atPageEnd =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 1
      if (atPageEnd) current = elements.at(-1)?.id ?? current

      setActiveId((prev) => (prev === current ? prev : current))
    }

    window.addEventListener('scroll', resolveActiveId, { passive: true })
    window.addEventListener('resize', resolveActiveId)
    window.addEventListener('hashchange', resolveActiveId)
    resolveActiveId()

    return () => {
      window.removeEventListener('scroll', resolveActiveId)
      window.removeEventListener('resize', resolveActiveId)
      window.removeEventListener('hashchange', resolveActiveId)
    }
  }, [ids])

  useEffect(() => {
    if (!ids.includes(activeId)) {
      setActiveId(ids[0] ?? '')
    }
  }, [activeId, ids])

  return activeId
}
