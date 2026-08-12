import {
  AboutChrome,
  AboutConstitutionBody,
  AboutConstitutionMarkdown,
  AboutFooterLink,
} from '#/components/about/about-parts'
import {
  LiveHeadingToc,
  LiveTocMobileJump,
  LiveTocProvider,
} from '#/components/ui/toc/live'
import type { AboutConstitutionContent } from '#/lib/content/about-constitution'

export function AboutConstitutionView({
  page,
}: {
  page: AboutConstitutionContent
}) {
  const showToc = page.headings.length > 0

  const chrome = <AboutChrome eyebrow={page.eyebrow} title={page.title} />
  const footer = <AboutFooterLink label={page.nextLabel} to={page.nextTo} />

  if (!showToc) {
    return (
      <>
        {chrome}
        <div className="mt-10 sm:mt-14">
          <AboutConstitutionMarkdown content={page.content} />
        </div>
        {footer}
      </>
    )
  }

  return (
    <LiveTocProvider headings={page.headings}>
      <div className="pb-28 lg:pb-16">
        {chrome}
        <AboutConstitutionBody>
          <LiveHeadingToc className="hidden lg:flex" />
          <AboutConstitutionMarkdown content={page.content} />
        </AboutConstitutionBody>
        <LiveTocMobileJump className="lg:hidden" />
        {footer}
      </div>
    </LiveTocProvider>
  )
}
