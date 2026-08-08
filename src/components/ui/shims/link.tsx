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
 * No href / no navigation — CMS preview should never leave the current canvas.
 */
function Link({
  to: _to,
  href: _href,
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
  onClick,
  ...props
}: LinkProps) {
  return (
    <a
      {...props}
      href={undefined}
      role="link"
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        onClick?.(event)
      }}
    >
      {children}
    </a>
  )
}

export { Link }
export type { LinkProps }

// Satisfy accidental named imports from `@tanstack/react-router` during preview builds.
export type FileRouteTypes = { to: string }
