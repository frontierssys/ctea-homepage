import { createFileRoute } from '@tanstack/react-router'
import { CalendarPageView } from '#/components/calendar/calendar-page-view'
import { getCalendar } from '#/lib/content/get-calendar'

export const Route = createFileRoute('/calendar')({
  loader: () => ({ calendar: getCalendar() }),
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData.calendar.title}｜中華民國馬術協會 CTEA`,
      },
      {
        name: 'description',
        content: loaderData.calendar.lead,
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { calendar } = Route.useLoaderData()
  return <CalendarPageView page={calendar} />
}
