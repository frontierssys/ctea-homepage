import { createFileRoute } from '@tanstack/react-router'
import { HeroCarousel } from '#/components/hero-carousel/hero-carousel'
import { DEFAULT_CAROUSEL_SLIDES, getHomepage } from '#/lib/content/homepage'
import { LandingContent } from './-component/landing-content'
import { TopNavBar } from './-component/top-nav-bar'

export const Route = createFileRoute('/')({
  loader: () => getHomepage(),
  head: ({ loaderData }) => {
    const firstSlide = loaderData?.carousel.slides[0] ?? DEFAULT_CAROUSEL_SLIDES[0]

    return {
      links: [
        {
          rel: 'preload',
          as: 'image',
          href: firstSlide.image,
          fetchPriority: 'high',
        },
      ],
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { carousel } = Route.useLoaderData()

  return (
    <>
      <TopNavBar />
      <HeroCarousel slides={carousel.slides} />
      <LandingContent />
    </>
  )
}
