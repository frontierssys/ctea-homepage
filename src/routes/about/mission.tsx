import { createFileRoute } from '@tanstack/react-router'
import { AboutMediaView } from '#/components/about/about-media-view'
import { getAboutMission } from '#/lib/content/get-about-mission'

export const Route = createFileRoute('/about/mission')({
  loader: () => ({ page: getAboutMission() }),
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.page.title}｜關於協會｜中華民國馬術協會 CTEA`
          : '協會宗旨｜關於協會｜中華民國馬術協會 CTEA',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { page } = Route.useLoaderData()
  return <AboutMediaView page={page} />
}
