import { useEffect, useState } from 'react'
import { useTheme } from '#/components/theme-provider'
import { useScrollDirection } from '#/hooks/use-scroll-direction'
import { TopNavMenuDesktop } from './top-nav-menu-desktop'
import { cn } from '#/lib/utils'
import { Button } from '../ui/button'
import { MobileNavBackdrop, TopNavMenuMobile } from './top-nav-menu-mobile'
import { LinkLogo } from '../ui/link-logo'
import { ThemeToggler } from '../ui/theme-toggler'

export function TopNavBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { direction: scrollDirection, isAtTop } = useScrollDirection()
  const { resolvedTheme, toggleMode } = useTheme()
  const isFloating = !isAtTop
  const isHidden = isFloating && scrollDirection === 'down'

  useEffect(() => {
    if (isHidden) setMenuOpen(false)
  }, [isHidden])

  return (
    <>
      <section
        className={cn(
          'flex px-11 max-xl:px-7 h-(--layout-header-height)',
          'z-50 border-b transition-[transform,background-color,box-shadow,backdrop-filter] duration-300 motion-reduce:transition-none',
          'fixed inset-x-0 top-0 border-[rgba(185,145,75,.65)] bg-[rgba(251,248,241,.92)] shadow-[0_4px_20px_rgba(78,58,27,.06)] backdrop-blur-sm dark:border-[#3a4752] dark:bg-[rgba(18,34,49,.92)] dark:shadow-[0_4px_20px_rgba(2,8,14,.25)]',
          isHidden ? '-translate-y-full' : 'translate-y-0'
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl">
          <LinkLogo />
          <TopNavMenuDesktop className={cn(
            "max-lg:hidden",
            isHidden ? '-translate-y-full' : 'translate-y-0'
          )} />
          <TopNavMenuMobile menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

          <div className="flex items-center gap-2 max-lg:ml-auto">
            <ThemeToggler theme={resolvedTheme} onThemeToggle={toggleMode} />
            <Button
              variant="outline"
              size="icon"
              className={cn(
                'hidden max-lg:grid',
                'rounded-none cursor-pointer place-content-center gap-1.5 border border-[rgba(185,145,75,.45)] transition-colors duration-200 hover:bg-[rgba(185,145,75,.07)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#9b742e] dark:border-[#3a4752] dark:hover:bg-[#213140] dark:focus-visible:outline-[#c6a465] motion-reduce:transition-none'
              )}
              aria-label={menuOpen ? '關閉導覽' : '開啟導覽'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span
                className={cn(
                  'block h-px w-6 bg-[#17140f] transition-transform duration-200 dark:bg-[#f1eade] motion-reduce:transition-none',
                  menuOpen && 'translate-y-[3.5px] rotate-45',
                )}
              />
              <span
                className={cn(
                  'block h-px w-6 bg-[#17140f] transition-transform duration-200 dark:bg-[#f1eade] motion-reduce:transition-none',
                  menuOpen && 'translate-y-[-3.5px] -rotate-45',
                )}
              />
            </Button>
          </div>
        </div>
      </section>
      <MobileNavBackdrop isShown={menuOpen} onClick={() => setMenuOpen(false)} />
    </>)
}
