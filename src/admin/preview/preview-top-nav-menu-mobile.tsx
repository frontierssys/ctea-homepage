import { ChevronDown } from 'lucide-react'
import type { ComponentProps } from 'react'
import { Link } from '@tanstack/react-router'
import { navLinks } from '#/components/top-nav-bar/const'
import { cn } from '#/lib/utils'

type PreviewTopNavMenuMobileProps = ComponentProps<'nav'> & {
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}

/** Preview duplicate of TopNavMenuMobile — no useState / useRouterState. */
export function PreviewTopNavMenuMobile({
  className,
  menuOpen,
  setMenuOpen,
}: PreviewTopNavMenuMobileProps) {
  const aboutMenuOpen = false

  return (
    <nav
      id="mobile-navigation"
      className={cn(
        'absolute top-full right-4 left-4 grid border border-ctea-nav-overlay-border bg-ctea-nav-overlay px-6 text-[#fffaf0] shadow-[0_20px_55px_rgba(2,8,14,.24)] backdrop-blur-sm transition-[background,border-color,box-shadow,opacity] duration-200 motion-reduce:transition-none',
        'dark:text-[#f1eade] dark:shadow-[0_20px_55px_rgba(2,8,14,.38)]',
        menuOpen
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0',
        className,
      )}
      aria-label="行動版導覽"
      aria-hidden={!menuOpen}
    >
      {navLinks.map((item) => {
        if (!item.children) {
          return (
            <Link
              to={item.to}
              className="flex min-h-12 items-center border-b border-[rgba(208,174,109,.22)] font-body text-nav last:border-0 dark:border-[rgba(198,164,101,.2)]"
              key={item.to}
              tabIndex={menuOpen ? undefined : -1}
              onClick={() => {
                setMenuOpen(false)
              }}
            >
              {item.label}
            </Link>
          )
        }

        return (
          <div
            key={item.to}
            className="border-b border-[rgba(208,174,109,.22)] last:border-0 dark:border-[rgba(198,164,101,.2)]"
          >
            <button
              type="button"
              className="flex min-h-12 w-full cursor-pointer items-center gap-2 font-body text-nav"
              aria-label="展開關於協會子選單"
              aria-expanded={aboutMenuOpen}
              aria-controls="mobile-about-submenu"
              tabIndex={menuOpen ? undefined : -1}
            >
              <span className="flex min-h-12 flex-1 items-center text-left">
                {item.label}
              </span>
              <span
                className="grid size-11 shrink-0 place-items-center text-[#d0ae6d] dark:text-[#c6a465]"
                aria-hidden="true"
              >
                <ChevronDown
                  className="size-5 transition-transform duration-200 motion-reduce:transition-none"
                  strokeWidth={1.5}
                />
              </span>
            </button>
            <div
              id="mobile-about-submenu"
              hidden={!aboutMenuOpen}
              className="pb-2 pl-4"
            >
              {item.children.map((child) => (
                <Link
                  key={child.to}
                  to={child.to}
                  className="flex min-h-11 items-center border-t border-[rgba(208,174,109,.18)] font-body text-nav dark:border-[rgba(198,164,101,.18)]"
                  tabIndex={-1}
                  onClick={() => {
                    setMenuOpen(false)
                  }}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </div>
        )
      })}
    </nav>
  )
}
