import { EventsPreview } from '#/admin/events-preview'
import { HomepagePreview } from '#/admin/homepage-preview'
import '#/styles.css'

CMS.registerPreviewStyle('/admin/preview-bundle.css')
CMS.registerPreviewTemplate('homepage', HomepagePreview)
CMS.registerPreviewTemplate('events', EventsPreview)
