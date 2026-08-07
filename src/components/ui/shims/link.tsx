import type { AnchorHTMLAttributes, ReactNode } from 'react'

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to?: string
  href?: string
  children?: ReactNode
  /** TanStack Router-only — ignored in the CMS preview shim. */
  params?: unknown
  search?: unknown
  hash?: unknown
  state?: unknown
  activeOptions?: unknown
  activeProps?: unknown
  inactiveProps?: unknown
  preload?: unknown
  preloadDelay?: unknown
  resetScroll?: unknown
  viewTransition?: unknown
}

/**
 * Preview-only stand-in for `@tanstack/react-router`'s `Link`.
 * Renders a plain anchor so the CMS IIFE never needs Router context.
 */
function Link({
  to,
  href,
  params: _params,
  search: _search,
  hash: _hash,
  state: _state,
  activeOptions: _activeOptions,
  activeProps: _activeProps,
  inactiveProps: _inactiveProps,
  preload: _preload,
  preloadDelay: _preloadDelay,
  resetScroll: _resetScroll,
  viewTransition: _viewTransition,
  children,
  ...props
}: LinkProps) {
  const resolvedHref = typeof to === 'string' && to.length > 0 ? to : (href ?? '#')

  return (
    <a href={resolvedHref} {...props}>
      {children}
    </a>
  )
}

export { Link }
export type { LinkProps }
