import {
  HeadContent,
  Outlet,
  ScriptOnce,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { TopNavBar } from '#/components/top-nav-bar/top-nav-bar'
import { FONTS_NONBLOCKING_SCRIPT, FONTS_STYLESHEET } from '#/lib/fonts'
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import { ThemeProvider } from '../components/theme-provider'
import { SiteFooter } from './-component/landing-content'
import type { QueryClient } from '@tanstack/react-query'
import { GradientGlowTopRight } from './-component/gradient-glow-top-right'

import appCss from '../styles.css?url'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  // Default ISR cache for all page responses. Child routes can override.
  // Static /admin and API handlers return their own responses, so they ignore this.
  headers: () => ({
    'Cache-Control':
      'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    'CDN-Cache-Control': 'max-age=3600',
  }),
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: '中華民國馬術協會 CTEA',
      },
      {
        name: 'description',
        content:
          '中華民國馬術協會官方網站 - 推廣馬術運動，培育馬術人才，提升國際競技水準',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/media/favicon-32.png',
      },
      {
        rel: 'apple-touch-icon',
        href: '/media/apple-touch-icon.png',
      },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
})

function RootLayout() {
  return (
    <>
      <TopNavBar />
      <div className="min-h-screen pt-(--layout-header-height)">
        <GradientGlowTopRight />
        <Outlet />
      </div>
      <SiteFooter />
    </>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant" suppressHydrationWarning>
      <head>
        <HeadContent />
        <ScriptOnce>{FONTS_NONBLOCKING_SCRIPT}</ScriptOnce>
        <noscript>
          <link rel="stylesheet" href={FONTS_STYLESHEET} />
        </noscript>
      </head>
      <body className="antialiased wrap-anywhere">
        <ThemeProvider defaultTheme="system" storageKey="theme">
          {children}
        </ThemeProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
