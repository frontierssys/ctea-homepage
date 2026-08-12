import { createFileRoute } from '@tanstack/react-router'
import { EquestrianPageView } from '#/components/equestrian/equestrian-page-view'
import { getEquestrian } from '#/lib/content/get-equestrian'

export const Route = createFileRoute('/equestrian')({
  loader: () => ({ equestrian: getEquestrian() }),
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.equestrian.title}｜中華民國馬術協會 CTEA`
          : '馬術介紹｜中華民國馬術協會 CTEA',
      },
      {
        name: 'description',
        content:
          loaderData?.equestrian.lead ??
          '認識國內馬術發展史、馬術起源、競賽項目、騎乘裝備、入門基礎、專家專欄與騎馬的好處。',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { equestrian } = Route.useLoaderData()
  return <EquestrianPageView page={equestrian} />
}
