import type { ComponentProps } from 'react'
import {
  Link,
  useNavigate,
  useRouterState,
} from '@tanstack/react-router'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '#/components/ui/navigation-menu'
import { cn } from '#/lib/utils'
import { navLinks } from './const'



const menuItemClassName =
  'relative flex flex-1 after:absolute after:top-1/2 after:right-0 after:h-6 after:w-px after:-translate-y-1/2 after:bg-[rgba(182,140,67,.38)] last:after:hidden dark:after:bg-[#3a4752]'

const desktopLinkClassName =
  'relative flex min-h-12 w-full flex-1 items-center justify-center rounded-none bg-transparent px-4 py-0 font-body text-nav whitespace-nowrap shadow-none transition-colors duration-200 before:absolute before:bottom-1 before:left-1/2 before:h-px before:w-8 before:-translate-x-1/2 before:scale-x-0 before:bg-[#d0ae6d] before:transition-transform before:duration-200 hover:bg-transparent hover:text-[#d0ae6d] hover:before:scale-x-100 focus:bg-transparent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f3dbad] focus-visible:ring-0 dark:before:bg-[#c6a465] dark:hover:text-[#c6a465] dark:focus-visible:outline-[#c6a465] max-[1500px]:px-3'

const triggerClassName = cn(
  desktopLinkClassName,
  'cursor-pointer',
  'h-auto w-full data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent data-[state=open]:text-[#d0ae6d] dark:data-[state=open]:text-[#c6a465] [&_svg]:hidden',
)

const dropdownPanelClassName =
  'left-1/2 mt-2 min-w-44 -translate-x-1/2 rounded-none border border-ctea-nav-overlay-border bg-ctea-nav-overlay p-0 text-[#fffaf0] shadow-[0_20px_55px_rgba(2,8,14,.24)] backdrop-blur-sm dark:text-[#f1eade] dark:shadow-[0_20px_55px_rgba(2,8,14,.38)]'

/** Beats NavigationMenuContent `group-data-[viewport=false]/navigation-menu:*` defaults. */
const dropdownPanelViewportFalseOverrideClassName =
  'group-data-[viewport=false]/navigation-menu:mt-2 group-data-[viewport=false]/navigation-menu:rounded-none group-data-[viewport=false]/navigation-menu:border-ctea-nav-overlay-border group-data-[viewport=false]/navigation-menu:bg-ctea-nav-overlay group-data-[viewport=false]/navigation-menu:text-[#fffaf0] group-data-[viewport=false]/navigation-menu:shadow-[0_20px_55px_rgba(2,8,14,.24)] group-data-[viewport=false]/navigation-menu:backdrop-blur-sm dark:group-data-[viewport=false]/navigation-menu:text-[#f1eade] dark:group-data-[viewport=false]/navigation-menu:shadow-[0_20px_55px_rgba(2,8,14,.38)]'

const dropdownLinkClassName =
  'flex min-h-12 flex-row items-center gap-0 rounded-none border-b border-[rgba(208,174,109,.22)] p-0 px-5 font-body text-nav whitespace-nowrap transition-colors duration-200 last:border-0 hover:bg-[rgba(208,174,109,.1)] hover:text-[#d0ae6d] focus:bg-[rgba(208,174,109,.1)] focus:text-[#d0ae6d] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#f3dbad] focus-visible:ring-0 dark:border-[rgba(198,164,101,.2)] dark:hover:bg-[rgba(198,164,101,.1)] dark:hover:text-[#c6a465] dark:focus:bg-[rgba(198,164,101,.1)] dark:focus:text-[#c6a465] dark:focus-visible:outline-[#c6a465]'


export function TopNavMenuDesktop({ className }: ComponentProps<'nav'>) {
  const navigate = useNavigate()
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const aboutActive = pathname === '/about' || pathname.startsWith('/about/')

  return (
    <NavigationMenu
      viewport={false}
      className={cn("ml-auto", className)}
      delayDuration={50}
      aria-label="主要導覽"
    >
      <NavigationMenuList
        className="flex w-full items-center px-11 max-xl:px-7 max-sm:px-4"
      >
        {navLinks.map((item) => {
          if (!item.children) {
            return (
              <NavigationMenuItem key={item.to} className={menuItemClassName}>
                <NavigationMenuLink asChild className={desktopLinkClassName}>
                  <Link to={item.to}>
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )
          }

          return (
            <NavigationMenuItem key={item.to} className={menuItemClassName}>
              <NavigationMenuTrigger
                className={cn(
                  triggerClassName,
                  aboutActive &&
                  'text-[#d0ae6d] before:scale-x-100 dark:text-[#c6a465]',
                )}
                onClick={() => {
                  navigate({ to: item.to })
                }}
              >
                {item.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent
                className={cn(
                  dropdownPanelClassName,
                  dropdownPanelViewportFalseOverrideClassName,
                )}
              >
                <ul className="m-0 grid list-none p-0">
                  {item.children.map((child) => (
                    <li key={child.to}>
                      <NavigationMenuLink
                        asChild
                        className={dropdownLinkClassName}
                      >
                        <Link
                          to={child.to}
                          activeProps={{
                            className: 'text-[#d0ae6d] dark:text-[#c6a465]',
                          }}
                        >
                          {child.label}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>

    </NavigationMenu>
  )
}
