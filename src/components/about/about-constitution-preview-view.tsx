import {
  AboutChrome,
  AboutConstitutionBody,
  AboutConstitutionMarkdown,
  AboutFooterLink,
} from '#/components/about/about-parts'
import { HeadingToc, TocMobileJump } from '#/components/ui/toc/parts'
import type { AboutConstitutionContent } from '#/lib/content/about-constitution'

/**
 * Explicit preview variant — composes hook-free TOC parts only.
 * Do not import AboutConstitutionView / LiveTocProvider (hooks).
 * Sveltia CMS preview has no React hooks dispatcher.
 */
export function AboutConstitutionPreviewView({
  page,
}: {
  page: AboutConstitutionContent
}) {
  const showToc = page.headings.length > 0
  const activeId = page.headings[0]?.id

  return (
    <div className={showToc ? 'pb-28 lg:pb-16' : undefined}>
      <AboutChrome eyebrow={page.eyebrow} title={page.title} />

      {showToc ? (
        <AboutConstitutionBody>
          <HeadingToc
            className="hidden lg:flex"
            headings={page.headings}
            activeId={activeId}
          />
          <AboutConstitutionMarkdown content={page.content} />
        </AboutConstitutionBody>
      ) : (
        <div className="mt-10 sm:mt-14">
          <AboutConstitutionMarkdown content={page.content} />
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

      <AboutFooterLink label={page.nextLabel} to={page.nextTo} />
    </div>
  )
}
