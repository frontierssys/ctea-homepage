import { createFileRoute } from '@tanstack/react-router'
// import StarterKit from '@tiptap/starter-kit'
// import { renderToReactElement } from '@tiptap/static-renderer'
import { Card } from '#/components/ui/card'
import { AboutNextLink, AboutTitle } from './-components/about-detail'

export const Route = createFileRoute('/about/mission')({
  component: RouteComponent,
  loader: async () => ({
    doc: await getMissionDoc(),
  }),
})

function RouteComponent() {
  const { doc } = Route.useLoaderData()
  // const ContentNode = renderToReactElement({
  //   extensions: [StarterKit],
  //   content: doc,
  // })
  return (
    <>
      <AboutTitle eyebrow="Mission" title="協會宗旨" />
      <section className="grid gap-6 py-4 lg:grid-cols-[minmax(0,0.62fr)_minmax(18rem,0.38fr)] lg:items-end">
        <figure className="relative overflow-hidden border border-[rgba(17,17,15,0.16)]">
          <img
            src="/ctea-4.webp"
            alt="馬術騎乘訓練中的騎手與馬匹"
            className="aspect-16/10 h-full w-full object-cover object-[38%_center]"
            loading="lazy"
          />
        </figure>

        <Card className="relative z-10 rounded-none border border-[rgba(17,17,15,0.16)] bg-[#f1f0eb]/90 p-6 ring-0 lg:-ml-16 lg:mb-8">
          {/* <section className="space-y-4">{ContentNode}</section> */}
        </Card>
      </section>
      <AboutNextLink label="查看組織章程" to="/mock/main/about/constitution" />
    </>
  )
}

/** TipTap json format */
const CONTENT = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: '推展馬術運動，使人人皆能馬上馳騁。',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: '倡導馬術禮儀，期個個都是紳士淑女。',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: '專研馬術教育，求場場比賽揚眉吐氣。',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: '善用馬術強身，讓男男女女健康美麗。',
        },
      ],
    },
  ],
}
async function getMissionDoc() {
  return Promise.resolve(CONTENT)
}
