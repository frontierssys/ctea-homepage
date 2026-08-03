import { entryToHero } from '#/admin/entry-to-hero'
import { SectionHero } from '#/components/section-hero/section-hero'
import '#/styles.css'

declare const createClass: (spec: Record<string, unknown>) => unknown

CMS.registerPreviewStyle('/admin/preview-bundle.css')

const HomepagePreview = createClass({
  render: function (this: {
    props: {
      entry: Parameters<typeof entryToHero>[0]
      getAsset: (path: string) => { url?: string } | undefined
    }
  }) {
    const { entry, getAsset } = this.props
    const hero = entryToHero(entry, { getAsset })
    return <SectionHero hero={hero} />
  },
})

CMS.registerPreviewTemplate('homepage', HomepagePreview)
