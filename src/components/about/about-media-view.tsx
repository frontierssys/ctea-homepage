import {
  AboutChrome,
  AboutFooterLink,
  AboutMediaLayout,
  AboutMediaMarkdown,
} from '#/components/about/about-parts'
import type { AboutMediaContent } from '#/lib/content/about-media'

export function AboutMediaView({ page }: { page: AboutMediaContent }) {
  return (
    <>
      <AboutChrome eyebrow={page.eyebrow} title={page.title} />
      <AboutMediaLayout image={page.image} imageAlt={page.imageAlt}>
        <AboutMediaMarkdown content={page.content} />
      </AboutMediaLayout>
      <AboutFooterLink label={page.nextLabel} to={page.nextTo} />
    </>
  )
}
