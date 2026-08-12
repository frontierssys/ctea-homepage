import { createFileRoute, notFound } from '@tanstack/react-router'
import { RegulationPageView } from '#/components/regulation/regulation-page-view'
import { getRegulationPage } from '#/lib/content/get-regulation'

export const Route = createFileRoute('/regulation/$sectionId')({
  loader: ({ params }) => {
    const page = getRegulationPage(params.sectionId)
    if (!page) throw notFound()
    return { page }
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.page.title}｜制度專區｜中華民國馬術協會 CTEA`
          : '制度專區｜中華民國馬術協會 CTEA',
      },
      {
        name: 'description',
        content: loaderData?.page.lead ?? '中華民國馬術協會制度專區。',
      },
    ],
  }),
  component: RegulationSectionPage,
})

function RegulationSectionPage() {
  const { page } = Route.useLoaderData()
  return <RegulationPageView page={page} />
}
