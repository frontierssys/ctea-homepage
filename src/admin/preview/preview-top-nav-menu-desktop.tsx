import type { ComponentProps } from 'react'
import { Link } from '@tanstack/react-router'
import { navLinks } from '#/components/top-nav-bar/const'
import { cn } from '#/lib/utils'

const desktopLinkClassName =
  'relative flex min-h-12 w-full flex-1 items-center justify-center px-4 font-body text-nav whitespace-nowrap transition-colors duration-200 before:absolute before:bottom-1 before:left-1/2 before:h-px before:w-8 before:-translate-x-1/2 before:scale-x-0 before:bg-[#a77d35] before:transition-transform before:duration-200 hover:text-[#a77d35] hover:before:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9b742e] after:absolute after:top-1/2 after:right-0 after:h-6 after:w-px after:-translate-y-1/2 after:bg-[rgba(182,140,67,.38)] last:after:hidden dark:before:bg-[#c6a465] dark:hover:text-[#c6a465] dark:focus-visible:outline-[#c6a465] dark:after:bg-[#3a4752] max-[1500px]:px-3'

/** Preview duplicate of desktop nav — CSS hover only, no Radix / no hooks. */
export function PreviewTopNavMenuDesktop({
  className,
}: ComponentProps<'nav'>) {
  return (
    <nav
      className={cn(
        'ml-12 flex flex-1 items-center justify-between max-lg:hidden max-[1500px]:ml-8',
        className,
      )}
      aria-label="主要導覽"
    >
      {navLinks.map((item) => {
        if (!item.children) {
          return (
            <Link
              className={desktopLinkClassName}
              to={item.to}
              key={item.to}
            >
              {item.label}
            </Link>
          )
        }

        return (
          <div key={item.to} className="group/nav-item relative flex flex-1">
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
              <div className="border border-[rgba(185,145,75,.45)] bg-[rgba(251,248,241,.98)] shadow-[0_20px_55px_rgba(78,58,27,.07)] backdrop-blur-sm dark:border-[#3a4752] dark:bg-[rgba(23,42,60,.98)] dark:shadow-[0_20px_55px_rgba(2,8,14,.35)]">
                {item.children.map((child) => (
                  <Link
                    key={child.to}
                    to={child.to}
                    role="menuitem"
                    className="flex min-h-12 items-center border-b border-[rgba(182,140,67,.38)] px-5 font-body text-nav whitespace-nowrap transition-colors duration-200 last:border-0 hover:text-[#a77d35] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#9b742e] dark:border-[#3a4752] dark:hover:text-[#c6a465] dark:focus-visible:outline-[#c6a465]"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </nav>
  )
}
