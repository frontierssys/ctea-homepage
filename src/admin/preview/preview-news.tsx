import { getPreviewEventList } from '#/admin/preview/preview-event-list-data'
import {
  applyPreviewTheme,
  clearPreviewTheme,
  PreviewLayout,
  type PreviewWindowProps,
} from '#/admin/preview/shared'
import type { NewsContent } from '#/lib/content/news'
import { SectionLatestNews } from '#/routes/-component/landing-content'

type CmsEntry = {
  getIn: (path: string[]) => unknown
}

type CmsList = {
  toArray?: () => unknown[]
  toJS?: () => unknown
}

type NewsPreviewProps = PreviewWindowProps & {
  entry: CmsEntry
  getAsset: (path: string) => { url?: string } | undefined
}

type NewsPreviewState = {
  navMenuOpen: boolean
  previewTheme: 'light' | 'dark'
}

type NewsPreviewInstance = {
  props: NewsPreviewProps
  state: NewsPreviewState
  setState: (
    update:
      | Partial<NewsPreviewState>
      | ((state: NewsPreviewState) => Partial<NewsPreviewState>),
  ) => void
}

const FALLBACK_IMAGE = '/ctea-4.webp'
const FALLBACK_IMAGE_ALT = '馬術賽事騎手與黑馬'
const NEWS_COUNT = 4

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function toArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value
  if (!value || typeof value !== 'object') return []

  const list = value as CmsList
  if (typeof list.toArray === 'function') return list.toArray()
  if (typeof list.toJS === 'function') {
    const plainValue = list.toJS()
    return Array.isArray(plainValue) ? plainValue : []
  }

  return []
}

function entryToNews(
  entry: CmsEntry,
  getAsset: NewsPreviewProps['getAsset'],
): NewsContent {
  const imageValue = entry.getIn(['data', 'featuredImage'])
  const imagePath = isNonEmptyString(imageValue) ? imageValue : FALLBACK_IMAGE
  const altValue = entry.getIn(['data', 'featuredImageAlt'])
  const list = getPreviewEventList()
  const selected = toArray(entry.getIn(['data', 'eventIds'])).flatMap((id) => {
    const event = isNonEmptyString(id)
      ? list.find((item) => item.id === id)
      : undefined
    return event ? [event] : []
  })

  return {
    featuredImage: getAsset(imagePath)?.url ?? imagePath,
    featuredImageAlt: isNonEmptyString(altValue) ? altValue : FALLBACK_IMAGE_ALT,
    // ponytail: preview reads source markdown, not content-collections
    events: (selected.length ? selected : list).slice(0, NEWS_COUNT),
  }
}

/** Preview for content/news.json */
export const NewsPreview = createClass({
  getInitialState: function (): NewsPreviewState {
    return {
      navMenuOpen: false,
      previewTheme: 'light',
    }
  },

  componentDidMount: function (this: NewsPreviewInstance) {
    applyPreviewTheme(this)
  },

  componentDidUpdate: function (
    this: NewsPreviewInstance,
    _previousProps: NewsPreviewProps,
    previousState: NewsPreviewState,
  ) {
    if (previousState.previewTheme !== this.state.previewTheme) {
      applyPreviewTheme(this)
    }
  },

  componentWillUnmount: function (this: NewsPreviewInstance) {
    clearPreviewTheme(this)
  },

  render: function (this: NewsPreviewInstance) {
    const news = entryToNews(this.props.entry, this.props.getAsset)

    return (
      <PreviewLayout instance={this}>
        <SectionLatestNews {...news} />
      </PreviewLayout>
    )
  },
})
