import {
  RegulationDownloadList,
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

  const chrome = (
    <>
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
    </>
  )

  if (!showToc) {
    return (
      <RegulationFrame>
        {chrome}
        <div className="mt-10 sm:mt-14">
          <RegulationMarkdown content={page.content} />
        </div>
      </RegulationFrame>
    )
  }

  return (
    <LiveTocProvider headings={page.headings}>
      <RegulationFrame className="pb-28 lg:pb-16">
        {chrome}
        <RegulationPageBody>
          <LiveHeadingToc className="hidden lg:flex" />
          <RegulationMarkdown content={page.content} />
        </RegulationPageBody>
        <LiveTocMobileJump className="lg:hidden" />
      </RegulationFrame>
    </LiveTocProvider>
  )
}
