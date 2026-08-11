import { createFileRoute } from '@tanstack/react-router'
import { AboutHistoryView } from '#/components/about/about-history-view'
import { getAboutHistory } from '#/lib/content/get-about-history'

export const Route = createFileRoute('/about/history')({
  loader: () => ({ history: getAboutHistory() }),
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.history.title}｜關於協會｜中華民國馬術協會 CTEA`
          : '協會歷史｜關於協會｜中華民國馬術協會 CTEA',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { history } = Route.useLoaderData()
  return <AboutHistoryView history={history} />
}
