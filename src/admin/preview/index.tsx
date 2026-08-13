import { AboutConstitutionPreview } from '#/admin/preview/preview-about-constitution'
import { AboutHistoryPreview } from '#/admin/preview/preview-about-history'
import { AboutMediaPreview } from '#/admin/preview/preview-about-media'
import { EventPreview } from '#/admin/preview/preview-event'
import { CarouselPreview } from '#/admin/preview/preview-carousel'
import { EquestrianPagePreview } from '#/admin/preview/preview-equestrian'
import { FooterPreview } from '#/admin/preview/preview-footer'
import { RegulationPagePreview } from '#/admin/preview/preview-regulation'
import { EventsPreview } from '#/admin/preview/preview-events'
import { NewsPreview } from '#/admin/preview/preview-news'
import '#/styles.css'

// CMS preview uses Google Fonts for Barlow; site self-hosts the same face via fontsource.
CMS.registerPreviewStyle(
  'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&display=swap',
)
CMS.registerPreviewStyle('/admin/preview-bundle.css')
CMS.registerPreviewTemplate('homepage', CarouselPreview)
CMS.registerPreviewTemplate('news', NewsPreview)
CMS.registerPreviewTemplate('event', EventPreview)
CMS.registerPreviewTemplate('events', EventsPreview)
CMS.registerPreviewTemplate('footer', FooterPreview)
CMS.registerPreviewTemplate('history', AboutHistoryPreview)
CMS.registerPreviewTemplate('mission', AboutMediaPreview)
CMS.registerPreviewTemplate('constitution', AboutConstitutionPreview)
CMS.registerPreviewTemplate('vision', AboutMediaPreview)
CMS.registerPreviewTemplate('equestrian', EquestrianPagePreview)
CMS.registerPreviewTemplate('fei', RegulationPagePreview)
CMS.registerPreviewTemplate('domestic', RegulationPagePreview)
CMS.registerPreviewTemplate('training', RegulationPagePreview)
CMS.registerPreviewTemplate('downloads', RegulationPagePreview)
