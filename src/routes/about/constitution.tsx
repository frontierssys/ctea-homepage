import { createFileRoute } from '@tanstack/react-router'
import { AboutConstitutionView } from '#/components/about/about-constitution-view'
import { getAboutConstitution } from '#/lib/content/get-about-constitution'

export const Route = createFileRoute('/about/constitution')({
  loader: () => ({ page: getAboutConstitution() }),
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.page.title}｜關於協會｜中華民國馬術協會 CTEA`
          : '組織章程｜關於協會｜中華民國馬術協會 CTEA',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { page } = Route.useLoaderData()
  return <AboutConstitutionView page={page} />
}
