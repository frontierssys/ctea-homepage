import { createFileRoute } from '@tanstack/react-router'
import { HeroCarousel } from '#/components/hero-carousel/hero-carousel'
import { TopNavBar } from '#/components/top-nav-bar/top-nav-bar'
import { DEFAULT_CAROUSEL_SLIDES, getCarousel } from '#/lib/content/carousel'
import { getNews } from '#/lib/content/news'
import { getSocial } from '#/lib/content/social'
import {
  LatestNews,
  LatestVideo,
  SiteFooter,
  SocialFeed,
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
      <TopNavBar />
      <HeroCarousel slides={carousel.slides} />
      <LatestNews
        featuredImage={news.featuredImage}
        featuredImageAlt={news.featuredImageAlt}
      />
      <SocialFeed backgroundImage={social.backgroundImage} />
      <LatestVideo />
      <SiteFooter />
    </>
  )
}
