import { createFileRoute } from '@tanstack/react-router'
import { Card } from '#/components/ui/card'
import { cn } from '#/lib/utils'
import { AboutNextLink, AboutTitle } from './-components/about-detail'

export const Route = createFileRoute('/about/vision')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <AboutTitle eyebrow="Vision" title="奮鬥願景" />
      <section className="grid gap-6 py-4 lg:grid-cols-[minmax(0,0.62fr)_minmax(18rem,0.38fr)] lg:items-end">
        <figure className="relative overflow-hidden border border-[rgba(17,17,15,0.16)]">
          <img
            src="/ctea-3.png"
            alt="馬術騎乘訓練中的騎手與馬匹"
            className="aspect-16/10 h-full w-full object-cover object-[38%_center]"
            loading="lazy"
          />
        </figure>

        <Card className="relative z-10 rounded-none border border-[rgba(17,17,15,0.16)] bg-[#f1f0eb]/90 p-6 ring-0 lg:-ml-16 lg:mb-8">
          <VisionTexts />
        </Card>
      </section>

      <AboutNextLink label="回顧協會歷史" to="/about/history" />
    </>
  )
}

function VisionTexts({ className, ...props }: React.ComponentProps<'article'>) {
  return (
    <article {...props} className={cn('space-y-4', className)}>
      {VISION_TEXTS.trim()
        .split('\n')
        .map((text) => text.trim())
        .filter(Boolean)
        .map((text) => (
          <p key={text}>{text}</p>
        ))}
    </article>
  )
}

const VISION_TEXTS = `
  推廣馬術運動，吸引運動人口
  引進國外技術，提升專業知識
  促進國際交流，提升國際地位
  提升選手實力，放眼亞奧運會.
   `
