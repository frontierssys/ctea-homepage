import { allCalendarPages } from '../../../.content-collections/generated'

export function getCalendar() {
  const page = allCalendarPages[0]
  if (!page) {
    throw new Error('Missing content/calendar/page.md')
  }
  return page
}
