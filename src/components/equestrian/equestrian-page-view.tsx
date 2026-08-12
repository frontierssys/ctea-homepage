import {
  EquestrianFrame,
  EquestrianHeader,
  EquestrianMarkdown,
  EquestrianPageBody,
} from '#/components/equestrian/equestrian-parts'
import {
  LiveHeadingToc,
  LiveTocMobileJump,
  LiveTocProvider,
} from '#/components/ui/toc/live'
import type { EquestrianContent } from '#/lib/content/equestrian'

export function EquestrianPageView({ page }: { page: EquestrianContent }) {
  const showToc = page.headings.length > 0

  if (!showToc) {
    return (
      <EquestrianFrame>
        <EquestrianHeader
          eyebrow={page.eyebrow}
          title={page.title}
          lead={page.lead}
        />
        <div className="mt-10 sm:mt-14">
          <EquestrianMarkdown content={page.content} />
        </div>
      </EquestrianFrame>
    )
  }

  return (
    <LiveTocProvider headings={page.headings}>
      <EquestrianFrame className="pb-28 lg:pb-16">
        <EquestrianHeader
          eyebrow={page.eyebrow}
          title={page.title}
          lead={page.lead}
        />
        <EquestrianPageBody>
          <LiveHeadingToc className="hidden lg:flex" />
          <EquestrianMarkdown content={page.content} />
        </EquestrianPageBody>
        <LiveTocMobileJump className="lg:hidden" />
      </EquestrianFrame>
    </LiveTocProvider>
  )
}
