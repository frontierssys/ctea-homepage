import { createFileRoute, notFound } from '@tanstack/react-router'
import { EventDetailView } from '#/components/events/event-detail-view'
import { getEventById } from '#/lib/content/events'

export const Route = createFileRoute('/events/$eventId')({
  loader: ({ params }) => {
    const event = getEventById(params.eventId)
    if (!event) throw notFound()
    return { event }
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.event.title}｜活動看板｜中華民國馬術協會 CTEA`
          : '活動看板｜中華民國馬術協會 CTEA',
      },
      {
        name: 'description',
        content: loaderData?.event.excerpt ?? '中華民國馬術協會活動看板公告詳情。',
      },
    ],
  }),
  component: EventDetailPage,
})

function EventDetailPage() {
  const { event } = Route.useLoaderData()
  return <EventDetailView event={event} />
}
