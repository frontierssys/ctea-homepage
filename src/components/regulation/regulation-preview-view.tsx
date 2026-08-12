import {
  RegulationDownloadList,
  RegulationFrame,
  RegulationHeader,
  RegulationMarkdown,
  RegulationPageBody,
} from '#/components/regulation/regulation-parts'
import { HeadingToc, TocMobileJump } from '#/components/ui/toc/parts'
import type { RegulationPage } from '#/lib/content/regulation'

/**
 * Explicit preview variant — composes hook-free TOC parts only.
 * Do not import RegulationPageView / LiveTocProvider (hooks).
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
          <HeadingToc
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
        <TocMobileJump
          className="lg:hidden"
          headings={page.headings}
          activeId={activeId}
          open={false}
        >
          <HeadingToc
            className="pb-2"
            headings={page.headings}
            activeId={activeId}
          />
        </TocMobileJump>
      ) : null}
    </RegulationFrame>
  )
}
