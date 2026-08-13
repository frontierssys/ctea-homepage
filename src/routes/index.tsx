import { createFileRoute } from '@tanstack/react-router'
import { HeroCarousel } from '#/components/hero-carousel/hero-carousel'
import { DEFAULT_CAROUSEL_SLIDES, getCarousel } from '#/lib/content/carousel'
import { getNews } from '#/lib/content/news'
import { getSocial } from '#/lib/content/social'
import {
  SectionLatestNews,
  SectionLatestVideo,
  SectionPartner,
  SectionSocialFeed,
} from './-component/landing-content'

export const Route = createFileRoute('/')({
  loader: () => ({
    carousel: getCarousel(),
    news: getNews(),
    social: getSocial(),
  }),
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
  const { carousel, news, social } = Route.useLoaderData()

  return (
    <>
      <HeroCarousel slides={carousel.slides} />
      <SectionLatestNews {...news} />
      <SectionSocialFeed backgroundImage={social.backgroundImage} />
      <SectionLatestVideo />
      <SectionPartner />
    </>
  )
}
