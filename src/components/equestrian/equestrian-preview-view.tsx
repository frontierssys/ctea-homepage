import {
  EquestrianFrame,
  EquestrianHeader,
  EquestrianMarkdown,
  EquestrianPageBody,
} from '#/components/equestrian/equestrian-parts'
import { HeadingToc, TocMobileJump } from '#/components/ui/toc/parts'
import type { EquestrianContent } from '#/lib/content/equestrian'

export type EquestrianPreviewViewProps = {
  equestrian: EquestrianContent
}

/**
 * Explicit preview variant — composes hook-free TOC parts only.
 * Do not import EquestrianPageView / LiveTocProvider (hooks).
 * Sveltia CMS preview has no React hooks dispatcher.
 */
export function EquestrianPreviewView({
  equestrian,
}: EquestrianPreviewViewProps) {
  const showToc = equestrian.headings.length > 0
  const activeId = equestrian.headings[0]?.id

  return (
    <EquestrianFrame className={showToc ? 'pb-28 lg:pb-16' : undefined}>
      <EquestrianHeader
        eyebrow={equestrian.eyebrow}
        title={equestrian.title}
        lead={equestrian.lead}
      />

      {showToc ? (
        <EquestrianPageBody>
          <HeadingToc
            className="hidden lg:flex"
            headings={equestrian.headings}
            activeId={activeId}
          />
          <EquestrianMarkdown content={equestrian.content} />
        </EquestrianPageBody>
      ) : (
        <div className="mt-10 sm:mt-14">
          <EquestrianMarkdown content={equestrian.content} />
        </div>
      )}

      {showToc ? (
        <TocMobileJump
          className="lg:hidden"
          headings={equestrian.headings}
          activeId={activeId}
          open={false}
        >
          <HeadingToc
            className="pb-2"
            headings={equestrian.headings}
            activeId={activeId}
          />
        </TocMobileJump>
      ) : null}
    </EquestrianFrame>
  )
}
