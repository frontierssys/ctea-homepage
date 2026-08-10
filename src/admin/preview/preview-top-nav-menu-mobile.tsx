import { ChevronDown } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { navLinks } from '#/components/top-nav-bar/const'
import { cn } from '#/lib/utils'

/** Preview duplicate of TopNavMenuMobile — no useState / useRouterState. */
export function PreviewTopNavMenuMobile({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}) {
  const aboutMenuOpen = false

  return (
    <nav
      id="mobile-navigation"
      className={cn(
        'absolute top-full right-4 left-4 grid -translate-y-2 border border-[rgba(185,145,75,.45)] bg-[rgba(251,248,241,.98)] px-6 shadow-[0_20px_55px_rgba(78,58,27,.07)] backdrop-blur-sm transition-[background,border-color,box-shadow,opacity,transform] duration-200 motion-reduce:transition-none',
        'dark:border-[#3a4752] dark:bg-[rgba(23,42,60,.98)] dark:shadow-[0_20px_55px_rgba(2,8,14,.35)]',
        menuOpen
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none opacity-0',
      )}
      aria-label="行動版導覽"
      aria-hidden={!menuOpen}
    >
      {navLinks.map((item) => {
        if (!item.children) {
          return (
            <Link
              to={item.to}
              className="flex min-h-12 items-center border-b border-[rgba(182,140,67,.38)] font-body text-nav last:border-0 dark:border-[#3a4752]"
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
            className="border-b border-[rgba(182,140,67,.38)] last:border-0 dark:border-[#3a4752]"
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
                className="grid size-11 shrink-0 place-items-center text-[#7e5f2e] dark:text-[#a99267]"
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
                  className="flex min-h-11 items-center border-t border-[rgba(182,140,67,.28)] font-body text-nav dark:border-[#3a4752]"
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
