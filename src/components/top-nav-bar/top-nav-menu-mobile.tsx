import { ChevronDown } from 'lucide-react'
import { useState, type ComponentProps } from 'react'
import { cn } from '#/lib/utils'
import {
  Link,
  useRouterState,
} from '@tanstack/react-router'
import { isNavItemActive, navLinks } from './const'

type TopNavMenuMobileProps = ComponentProps<'nav'> & {
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}

function initialOpenMenus(pathname: string) {
  return Object.fromEntries(
    navLinks
      .filter((item) => item.children)
      .map((item) => [item.to, isNavItemActive(pathname, item.to)]),
  ) as Record<string, boolean>
}

export function TopNavMenuMobile({ className, menuOpen, setMenuOpen }: TopNavMenuMobileProps) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const [openMenus, setOpenMenus] = useState(() => initialOpenMenus(pathname))

  return (<>
    <nav
      id="mobile-navigation"
      className={cn(
        "absolute top-full right-4 left-4 grid border border-ctea-nav-overlay-border bg-ctea-nav-overlay px-6 text-[#fffaf0] shadow-[0_20px_55px_rgba(2,8,14,.24)] backdrop-blur-sm transition-[background,border-color,box-shadow,opacity] duration-200 motion-reduce:transition-none",
        "dark:text-[#f1eade] dark:shadow-[0_20px_55px_rgba(2,8,14,.38)]",
        menuOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
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

        const itemActive = isNavItemActive(pathname, item.to)
        const submenuOpen = openMenus[item.to] ?? false
        const submenuId = `mobile-submenu-${item.to.replaceAll('/', '')}`

        return (
          <div
            key={item.to}
            className="border-b border-[rgba(208,174,109,.22)] last:border-0 dark:border-[rgba(198,164,101,.2)]"
          >
            <button
              type="button"
              className={cn(
                'flex min-h-12 w-full items-center gap-2 font-body text-nav cursor-pointer',
                itemActive && 'text-[#d0ae6d] dark:text-[#c6a465]',
              )}
              aria-label={submenuOpen ? `收合${item.label}子選單` : `展開${item.label}子選單`}
              aria-expanded={submenuOpen}
              aria-controls={submenuId}
              tabIndex={menuOpen ? undefined : -1}
              onClick={() =>
                setOpenMenus((current) => ({
                  ...current,
                  [item.to]: !submenuOpen,
                }))
              }
            >
              <span className="flex min-h-12 flex-1 items-center text-left">
                {item.label}
              </span>
              <span
                className="grid size-11 shrink-0 place-items-center text-[#d0ae6d] dark:text-[#c6a465]"
                aria-hidden="true"
              >
                <ChevronDown
                  className={cn(
                    'size-5 transition-transform duration-200 motion-reduce:transition-none',
                    submenuOpen && 'rotate-180',
                  )}
                  strokeWidth={1.5}
                />
              </span>
            </button>
            <div
              id={submenuId}
              hidden={!submenuOpen}
              className="pb-2 pl-4"
            >
              {item.children.map((child) => (
                <Link
                  key={`${child.to}-${child.params?.sectionId ?? child.label}`}
                  to={child.to}
                  params={child.params}
                  className="flex min-h-11 items-center border-t border-[rgba(208,174,109,.18)] font-body text-nav dark:border-[rgba(198,164,101,.18)]"
                  tabIndex={menuOpen && submenuOpen ? undefined : -1}
                  onClick={() => {
                    setMenuOpen(false)
                  }}
                  activeProps={{
                    className: 'text-[#d0ae6d] dark:text-[#c6a465]',
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
  </>)
}

type MobileNavBackdropProps = {
  isShown: boolean
} & ComponentProps<'div'>
export function MobileNavBackdrop({ isShown, ...props }: MobileNavBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-x-0 top-(--layout-header-height) bottom-0 z-40 lg:hidden",
        "bg-[rgba(9,23,37,.46)] dark:bg-[rgba(2,8,14,.6)]",
        "backdrop-blur-xs transition-opacity duration-200",
        "motion-reduce:transition-none motion-reduce:backdrop-blur-none",
        isShown ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
      {...props}
    />
  )
}
