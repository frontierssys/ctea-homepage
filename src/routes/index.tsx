import { createFileRoute, ScriptOnce } from '@tanstack/react-router'
import { SectionHero } from '#/components/section-hero/section-hero'
import { HERO_DESKTOP_MQ, HERO_MOBILE_MQ } from '#/components/section-hero/hero-images'
import { getHeroImageGateScript } from '#/components/section-hero/hero-image-gate'
import { DEFAULT_HOMEPAGE_HERO, getHomepage } from '#/lib/content/homepage'
import { LandingContent } from './-component/landing-content'
import { TopNavBar } from './-component/top-nav-bar'

export const Route = createFileRoute('/')({
  loader: () => getHomepage(),
  head: ({ loaderData }) => {
    const hero = loaderData?.hero ?? DEFAULT_HOMEPAGE_HERO

    return {
      links: [
        {
          rel: 'preload',
          as: 'image',
          href: hero.rider,
          fetchPriority: 'high',
        },
        {
          rel: 'preload',
          as: 'image',
          href: hero.bg,
          media: HERO_MOBILE_MQ,
        },
        {
          rel: 'preload',
          as: 'image',
          href: hero.bg,
          media: `${HERO_DESKTOP_MQ} and (prefers-color-scheme: light)`,
        },
        {
          rel: 'preload',
          as: 'image',
          href: hero.bgDark,
          media: `${HERO_DESKTOP_MQ} and (prefers-color-scheme: dark)`,
        },
      ],
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { hero } = Route.useLoaderData()

  return (
    <>
      <TopNavBar />
      <SectionHero
        hero={hero}
        footer={<ScriptOnce>{getHeroImageGateScript()}</ScriptOnce>}
      />
      <LandingContent />
    </>
  )
}
