import {
  RegulationDownloadsSection,
  RegulationFrame,
  RegulationHeader,
  RegulationMarkdown,
  RegulationPageBody,
} from '#/components/regulation/regulation-parts'
import {
  LiveHeadingToc,
  LiveTocMobileJump,
  LiveTocProvider,
} from '#/components/ui/toc/live'
import type { RegulationPage } from '#/lib/content/regulation'

export function RegulationPageView({ page }: { page: RegulationPage }) {
  const showToc = page.headings.length > 0

  const header = (
    <RegulationHeader
      eyebrow={page.eyebrow}
      title={page.title}
      lead={page.lead}
    />
  )

  if (!showToc) {
    return (
      <RegulationFrame>
        {header}
        <div className="mt-10 sm:mt-14">
          <RegulationMarkdown content={page.content} />
        </div>
        <RegulationDownloadsSection downloads={page.downloads} />
      </RegulationFrame>
    )
  }

  return (
    <LiveTocProvider headings={page.headings}>
      <RegulationFrame className="pb-28 lg:pb-16">
        {header}
        <RegulationPageBody>
          <LiveHeadingToc className="hidden lg:flex" />
          <RegulationMarkdown content={page.content} />
        </RegulationPageBody>
        <RegulationDownloadsSection downloads={page.downloads} />
        <LiveTocMobileJump className="lg:hidden" />
      </RegulationFrame>
    </LiveTocProvider>
  )
}
