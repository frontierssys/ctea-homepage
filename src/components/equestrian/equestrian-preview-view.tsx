import {
  EquestrianBody,
  EquestrianFrame,
  EquestrianHeader,
  EquestrianSectionList,
  EquestrianSectionToc,
} from '#/components/equestrian/equestrian-parts'
import type { EquestrianContent, EquestrianSection } from '#/lib/content/equestrian'
import { cn } from '#/lib/utils'
import { ChevronUp, List } from 'lucide-react'
import type { ComponentProps } from 'react'

export type EquestrianPreviewViewProps = {
  equestrian: EquestrianContent
}

/**
 * Explicit preview variant — composes hook-free parts only.
 * Do not import EquestrianView here (scroll spy / mobile jump use hooks).
 */
export function EquestrianPreviewView({
  equestrian,
}: EquestrianPreviewViewProps) {
  return (
    <EquestrianFrame>
      <EquestrianHeader
        eyebrow={equestrian.eyebrow}
        title={equestrian.title}
        lead={equestrian.lead}
      />
      <EquestrianBody>
        <EquestrianSectionToc
          className="hidden lg:block"
          sections={equestrian.sections}
          activeId={equestrian.sections[0]?.id}
        />
        <EquestrianSectionList sections={equestrian.sections} />
      </EquestrianBody>
      <MobileSectionJump
        className="lg:hidden"
        sections={equestrian.sections}
        activeId={equestrian.sections[0]?.id}
      />
    </EquestrianFrame>
  )
}

type MobileSectionJumpProps = ComponentProps<'div'> & {
  sections: Array<EquestrianSection>
  activeId: string
}
function MobileSectionJump({ sections, activeId, className }: MobileSectionJumpProps) {
  const open = false
  const activeSection =
    sections.find((section) => section.id === activeId) ?? sections[0]
  const activeIndex = Math.max(
    0,
    sections.findIndex((section) => section.id === activeSection?.id),
  )

  if (sections.length === 0) return null

  return (
    <div className={cn(className)}>
       {open ? (
        <div
          className="fixed inset-0 z-40 bg-[rgb(5_15_25/0.42)] backdrop-blur-[1px] motion-reduce:backdrop-blur-none"
          aria-label="關閉章節選單"
          // onClick={() => setOpen(false)}
        />
      ) : null}

      <div
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 border-t border-ctea-gold/40 bg-[rgba(251,248,241,0.96)] shadow-[0_-12px_40px_rgba(78,58,27,0.08)] backdrop-blur-sm dark:border-[rgba(198,164,101,0.35)] dark:bg-[rgba(18,34,49,0.96)] dark:shadow-[0_-12px_40px_rgba(2,8,14,0.35)]',
          'pb-[max(0.75rem,env(safe-area-inset-bottom))]',
        )}
      >
        <section
          role="dialog"
          aria-modal="true"
          aria-label="馬術介紹章節"
          hidden={!open}
          className="max-h-[min(70dvh,28rem)] overflow-y-auto px-5 pt-2"
        >
          <div
            className="mx-auto mb-3 h-1 w-10 rounded-full bg-ctea-gold/45"
            aria-hidden="true"
          />
          <EquestrianSectionToc
            sections={sections}
            activeId={activeId}
            // onNavigate={() => setOpen(false)}
            className="pb-2"
          />
        </section>

        <section className="flex items-center gap-3 px-4 pt-3">
          <div className="min-w-0 flex-1">
            <p className="font-sport text-overline uppercase text-ctea-brown">
              {String(activeIndex + 1).padStart(2, '0')} /{' '}
              {String(sections.length).padStart(2, '0')}
            </p>
            <p className="truncate font-body text-body-sm text-foreground">
              {activeSection?.title}
            </p>
          </div>

          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-2 border border-ctea-gold px-3.5 font-body text-action text-foreground transition-colors duration-200 hover:bg-ctea-gold hover:text-[#091725] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ctea-gold-focus dark:hover:text-[#0b1825]"
            aria-expanded={false}
            aria-controls={""}
            // onClick={() => setOpen((value) => !value)}
          >
            <List className="size-4" aria-hidden="true" />
            章節
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
