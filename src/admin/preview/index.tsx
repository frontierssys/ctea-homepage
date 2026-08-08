import { CarouselPreview } from '#/admin/preview/preview-carousel'
import { EventsPreview } from '#/admin/preview/preview-events'
import '#/styles.css'

CMS.registerPreviewStyle('/admin/preview-bundle.css')
CMS.registerPreviewTemplate('homepage', CarouselPreview)
CMS.registerPreviewTemplate('events', EventsPreview)
