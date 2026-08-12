import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { getContext } from './integrations/tanstack-query/root-provider'

export function getRouter() {
  const context = getContext()

  const router = createTanStackRouter({
    routeTree,
    context,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    // Same-document View Transitions: keep the fixed header stable while the
    // viewport snapshot follows browser history direction (see styles).
    defaultViewTransition: {
      types: ({ fromLocation, toLocation, pathChanged }) => {
        if (!pathChanged || !fromLocation) return false
        if (
          typeof window !== 'undefined' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
          return false
        }

        const fromIndex = fromLocation.state.__TSR_index
        const toIndex = toLocation.state.__TSR_index

        if (toIndex < fromIndex) return ['navigation-back']
        if (toIndex > fromIndex) return ['navigation-forward']
        return ['navigation-neutral']
      },
    },
  })

  setupRouterSsrQueryIntegration({ router, queryClient: context.queryClient })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
