import type { ComponentProps } from 'react'
import { Link } from '@tanstack/react-router'
import { navLinks } from '#/components/top-nav-bar/const'
import { cn } from '#/lib/utils'

const menuItemClassName =
  'relative flex flex-1 after:absolute after:top-1/2 after:right-0 after:h-6 after:w-px after:-translate-y-1/2 after:bg-[rgba(182,140,67,.38)] last:after:hidden dark:after:bg-[#3a4752]'

const desktopLinkClassName =
  'relative flex min-h-12 w-full flex-1 items-center justify-center rounded-none bg-transparent px-4 py-0 font-body text-nav whitespace-nowrap shadow-none transition-colors duration-200 before:absolute before:bottom-1 before:left-1/2 before:h-px before:w-8 before:-translate-x-1/2 before:scale-x-0 before:bg-[#d0ae6d] before:transition-transform before:duration-200 hover:bg-transparent hover:text-[#d0ae6d] hover:before:scale-x-100 focus:bg-transparent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f3dbad] focus-visible:ring-0 dark:before:bg-[#c6a465] dark:hover:text-[#c6a465] dark:focus-visible:outline-[#c6a465] max-[1500px]:px-3'

const dropdownLinkClassName =
  'flex min-h-12 flex-row items-center gap-0 rounded-none border-b border-[rgba(208,174,109,.22)] p-0 px-5 font-body text-nav whitespace-nowrap transition-colors duration-200 last:border-0 hover:bg-[rgba(208,174,109,.1)] hover:text-[#d0ae6d] focus:bg-[rgba(208,174,109,.1)] focus:text-[#d0ae6d] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#f3dbad] focus-visible:ring-0 dark:border-[rgba(198,164,101,.2)] dark:hover:bg-[rgba(198,164,101,.1)] dark:hover:text-[#c6a465] dark:focus:bg-[rgba(198,164,101,.1)] dark:focus:text-[#c6a465] dark:focus-visible:outline-[#c6a465]'

/** Preview duplicate of desktop nav — CSS hover only, no Radix / no hooks. */
export function PreviewTopNavMenuDesktop({
  className,
}: ComponentProps<'nav'>) {
  return (
    <nav
      className={cn(
        // Match NavigationMenu root: grow + vertically center in the tall header.
        'relative ml-auto flex max-w-max flex-1 items-center justify-center',
        className,
      )}
      aria-label="主要導覽"
    >
      <div className="flex w-full flex-1 items-center px-11 max-xl:px-7 max-sm:px-4">
        {navLinks.map((item) => {
          if (!item.children) {
            return (
              <div key={item.to} className={menuItemClassName}>
                <Link className={desktopLinkClassName} to={item.to}>
                  {item.label}
                </Link>
              </div>
            )
          }

          return (
            <div key={item.to} className={cn(menuItemClassName, 'group/nav-item')}>
              <Link
                className={cn(desktopLinkClassName, 'w-full')}
                to={item.to}
                aria-haspopup="menu"
              >
                {item.label}
              </Link>
              <div
                className="pointer-events-none invisible absolute top-full left-1/2 z-50 min-w-44 -translate-x-1/2 pt-2 opacity-0 transition-[opacity,visibility] duration-200 group-hover/nav-item:pointer-events-auto group-hover/nav-item:visible group-hover/nav-item:opacity-100 group-focus-within/nav-item:pointer-events-auto group-focus-within/nav-item:visible group-focus-within/nav-item:opacity-100 motion-reduce:transition-none"
                role="menu"
                aria-label={item.label}
              >
                <div className="rounded-none border border-ctea-nav-overlay-border bg-ctea-nav-overlay text-[#fffaf0] shadow-[0_20px_55px_rgba(2,8,14,.24)] backdrop-blur-sm dark:text-[#f1eade] dark:shadow-[0_20px_55px_rgba(2,8,14,.38)]">
                  {item.children.map((child) => (
                    <Link
                      key={child.to}
                      to={child.to}
                      role="menuitem"
                      className={dropdownLinkClassName}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </nav>
  )
}
