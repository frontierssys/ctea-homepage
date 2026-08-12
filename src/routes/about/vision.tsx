import { createFileRoute } from '@tanstack/react-router'
import { AboutMediaView } from '#/components/about/about-media-view'
import { getAboutVision } from '#/lib/content/get-about-vision'

export const Route = createFileRoute('/about/vision')({
  loader: () => ({ page: getAboutVision() }),
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.page.title}｜關於協會｜中華民國馬術協會 CTEA`
          : '奮鬥願景｜關於協會｜中華民國馬術協會 CTEA',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { page } = Route.useLoaderData()
  return <AboutMediaView page={page} />
}
