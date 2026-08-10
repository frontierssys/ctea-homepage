import { useEffect, useState } from 'react'
import { useTheme } from '#/components/theme-provider'
import { useScrollDirection } from '#/hooks/use-scroll-direction'
import {
  TopNavBarView,
  type TopNavBarViewProps,
} from './top-nav-bar-view'

export type TopNavBarProps = Omit<
  TopNavBarViewProps,
  | 'menuOpen'
  | 'hidden'
  | 'theme'
  | 'onMenuToggle'
  | 'onMenuClose'
  | 'onThemeToggle'
>

export function TopNavBar(props: TopNavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { direction: scrollDirection, isAtTop } = useScrollDirection()
  const { resolvedTheme, toggleMode } = useTheme()
  const isFloating = !isAtTop
  const isHidden = isFloating && scrollDirection === 'down'

  useEffect(() => {
    if (isHidden) setMenuOpen(false)
  }, [isHidden])

  return (
    <TopNavBarView
      {...props}
      menuOpen={menuOpen}
      hidden={isHidden}
      theme={resolvedTheme}
      onMenuToggle={() => setMenuOpen((open) => !open)}
      onMenuClose={() => setMenuOpen(false)}
      onThemeToggle={toggleMode}
    />
  )
}
