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
          'fixed inset-x-0 top-0 border-ctea-nav-border bg-ctea-nav-surface text-[#fffaf0] backdrop-blur-sm dark:text-[#f1eade]',
          isFloating && 'shadow-[0_6px_20px_rgba(18,43,67,.16)] dark:shadow-[0_6px_24px_rgba(0,0,0,.28)]',
          isHidden ? '-translate-y-full' : 'translate-y-0'
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl">
          <LinkLogo />
          <TopNavMenuDesktop className={cn(
            "max-lg:hidden",
            isHidden ? '-translate-y-full' : 'translate-y-0'
          )} />
          <TopNavMenuMobile className="hidden max-lg:block" menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

          <div className="flex items-center gap-2 max-lg:ml-auto">
            <ThemeToggler theme={resolvedTheme} onThemeToggle={toggleMode} />
            <Button
              variant="outline"
              size="icon"
              className={cn(
                'hidden max-lg:grid',
                'rounded-none cursor-pointer place-content-center gap-1.5 border border-[rgba(208,174,109,.55)] bg-transparent transition-colors duration-200 hover:border-[#d0ae6d] hover:bg-[rgba(208,174,109,.1)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#f3dbad] dark:border-[#3a4752] dark:bg-transparent dark:hover:border-[#c6a465] dark:hover:bg-[#213140] dark:focus-visible:outline-[#c6a465] motion-reduce:transition-none'
              )}
              aria-label={menuOpen ? '關閉導覽' : '開啟導覽'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span
                className={cn(
                  'block h-px w-6 bg-[#fffaf0] transition-transform duration-200 dark:bg-[#f1eade] motion-reduce:transition-none',
                  menuOpen && 'translate-y-[3.5px] rotate-45',
                )}
              />
              <span
                className={cn(
                  'block h-px w-6 bg-[#fffaf0] transition-transform duration-200 dark:bg-[#f1eade] motion-reduce:transition-none',
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
