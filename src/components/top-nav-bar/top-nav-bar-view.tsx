import { ChevronDown, Moon, Sun } from 'lucide-react'
import { useEffect, useState, type ComponentProps, type MouseEventHandler } from 'react'
import { cn } from '#/lib/utils'
import {
  Link,
  useRouterState,
  type FileRouteTypes,
} from '@tanstack/react-router'
import { Button } from '#/components/ui/button'

type NavChild = {
  label: string
  to: FileRouteTypes['to']
}

type NavLink = {
  label: string
  to: FileRouteTypes['to']
  children?: ReadonlyArray<NavChild>
}


const navLinks: ReadonlyArray<NavLink> = [
  {
    label: '活動看板',
    to: '/events',
  },
  {
    label: '關於協會',
    to: '/about',
    children: [
      { label: '協會歷史', to: '/about/history' },
      { label: '協會宗旨', to: '/about/mission' },
      { label: '組織章程', to: '/about/constitution' },
      { label: '奮鬥願景', to: '/about/vision' }
    ],
  },
  {
    label: '馬術介紹',
    to: '/equestrian',
  },
  {
    label: '制度專區',
    to: '/regulation',
  },
  {
    label: '行事曆',
    to: '/calendar',
  },
  {
    label: '會員專區',
    to: '/member',
  },
  {
    label: '下載專區',
    to: '/download',
  },
]

const desktopLinkClassName =
  'relative flex min-h-12 flex-1 items-center justify-center px-4 font-body text-nav whitespace-nowrap transition-colors duration-200 before:absolute before:bottom-1 before:left-1/2 before:h-px before:w-8 before:-translate-x-1/2 before:scale-x-0 before:bg-[#a77d35] before:transition-transform before:duration-200 hover:text-[#a77d35] hover:before:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9b742e] after:absolute after:top-1/2 after:right-0 after:h-6 after:w-px after:-translate-y-1/2 after:bg-[rgba(182,140,67,.38)] last:after:hidden dark:before:bg-[#c6a465] dark:hover:text-[#c6a465] dark:focus-visible:outline-[#c6a465] dark:after:bg-[#3a4752] max-[1500px]:px-3'

export type TopNavBarViewProps = Omit<ComponentProps<'header'>, 'hidden'> & {
  menuOpen: boolean
  hidden: boolean
  theme: 'light' | 'dark'
  onMenuToggle: () => void
  onMenuClose: () => void
  onThemeToggle: () => void
  onNavigate?: MouseEventHandler<HTMLAnchorElement>
}

export function TopNavBarView({
  menuOpen,
  hidden,
  theme,
  onMenuToggle,
  onMenuClose,
  onThemeToggle,
  onNavigate,
  className,
  ...props
}: TopNavBarViewProps) {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const aboutActive = pathname === '/about' || pathname.startsWith('/about/')
  const [aboutMenuOpen, setAboutMenuOpen] = useState(aboutActive)

  useEffect(() => {
    if (menuOpen) setAboutMenuOpen(aboutActive)
  }, [menuOpen, aboutActive])

  return (
    <div
      className="group/mobile-nav"
      data-state={menuOpen ? 'open' : 'closed'}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-(--layout-header-height) bottom-0 z-40 bg-[rgba(251,248,241,.45)] opacity-0 backdrop-blur-xs transition-opacity duration-200 group-data-[state=open]/mobile-nav:pointer-events-auto group-data-[state=open]/mobile-nav:opacity-100 lg:hidden dark:bg-[rgba(9,23,37,.5)] motion-reduce:transition-none motion-reduce:backdrop-blur-none"
        onClick={onMenuClose}
      />

      <header
        {...props}
        className={cn(
          'z-50 border-b transition-[transform,background-color,box-shadow,backdrop-filter] duration-300 motion-reduce:transition-none',
          'fixed inset-x-0 top-0 border-[rgba(185,145,75,.65)] bg-[rgba(251,248,241,.92)] shadow-[0_4px_20px_rgba(78,58,27,.06)] backdrop-blur-sm dark:border-[#3a4752] dark:bg-[rgba(18,34,49,.92)] dark:shadow-[0_4px_20px_rgba(2,8,14,.25)]',
          hidden ? '-translate-y-full' : 'translate-y-0',
          className,
        )}
      >
        <div className="mx-auto flex h-(--layout-header-content-height) w-full items-center px-11 max-xl:px-7 max-sm:px-4">
          <Link
            to="/"
            className="flex min-h-14 shrink-0 items-center gap-4"
            aria-label="中華民國馬術協會首頁"
            onClick={onNavigate}
          >
            <img
              src="/media/ctea-logo-nav.webp"
              alt="CTEA"
              width={80}
              height={80}
              className="h-10 w-auto"
              decoding="async"
            />
            <span className="min-w-0">
              <strong className="block whitespace-nowrap font-brand text-brand text-[#151310] dark:text-[#f1eade]">
                中華民國馬術協會
              </strong>
              <span className="mt-1.5 block whitespace-nowrap font-sport text-meta text-[#7e5f2e] uppercase dark:text-[#a99267] max-sm:hidden">
                Chinese Taipei Equestrian Association
              </span>
            </span>
          </Link>

          <nav
            className="ml-12 flex flex-1 items-center justify-between max-[1500px]:ml-8 max-lg:hidden"
            aria-label="主要導覽"
          >
            {navLinks.map((item) => {
              if (!item.children) {
                return (
                  <Link
                    className={desktopLinkClassName}
                    to={item.to}
                    key={item.to}
                    onClick={onNavigate}
                  >
                    {item.label}
                  </Link>
                )
              }

              return (
                <div
                  key={item.to}
                  className="group/nav-item relative flex flex-1"
                >
                  <Link
                    className={cn(
                      desktopLinkClassName,
                      'w-full',
                      aboutActive && 'text-[#a77d35] before:scale-x-100 dark:text-[#c6a465]',
                    )}
                    to={item.to}
                    onClick={onNavigate}
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
                          onClick={onNavigate}
                          activeProps={{
                            className: 'text-[#a77d35] dark:text-[#c6a465]',
                          }}
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

          <div className="ml-auto items-center gap-2 flex">
            <ThemeToggle theme={theme} onThemeToggle={onThemeToggle} />
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
              onClick={onMenuToggle}
            >
              <span className="block h-px w-6 bg-[#17140f] transition-transform duration-200 group-data-[state=open]/mobile-nav:translate-y-[3.5px] group-data-[state=open]/mobile-nav:rotate-45 dark:bg-[#f1eade] motion-reduce:transition-none" />
              <span className="block h-px w-6 bg-[#17140f] transition-transform duration-200 group-data-[state=open]/mobile-nav:translate-y-[-3.5px] group-data-[state=open]/mobile-nav:-rotate-45 dark:bg-[#f1eade] motion-reduce:transition-none" />
            </Button>
          </div>
        </div>

        <nav
          id="mobile-navigation"
          className="pointer-events-none absolute top-full right-4 left-4 grid -translate-y-2 border border-[rgba(185,145,75,.45)] bg-[rgba(251,248,241,.98)] px-6 opacity-0 shadow-[0_20px_55px_rgba(78,58,27,.07)] backdrop-blur-sm transition-[background,border-color,box-shadow,opacity,transform] duration-200 group-data-[state=open]/mobile-nav:pointer-events-auto group-data-[state=open]/mobile-nav:translate-y-0 group-data-[state=open]/mobile-nav:opacity-100 lg:hidden dark:border-[#3a4752] dark:bg-[rgba(23,42,60,.98)] dark:shadow-[0_20px_55px_rgba(2,8,14,.35)] motion-reduce:transition-none"
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
                  onClick={(event) => {
                    onNavigate?.(event)
                    onMenuClose()
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
                <div className="flex min-h-12 items-center gap-2">
                  <Link
                    to={item.to}
                    className={cn(
                      'flex min-h-12 flex-1 items-center font-body text-nav',
                      aboutActive && 'text-[#a77d35] dark:text-[#c6a465]',
                    )}
                    tabIndex={menuOpen ? undefined : -1}
                    onClick={(event) => {
                      onNavigate?.(event)
                      onMenuClose()
                    }}
                  >
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    className="grid size-11 shrink-0 place-items-center text-[#7e5f2e] transition-colors duration-200 hover:text-[#a77d35] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b742e] dark:text-[#a99267] dark:hover:text-[#c6a465] dark:focus-visible:outline-[#c6a465]"
                    aria-label={aboutMenuOpen ? '收合關於協會子選單' : '展開關於協會子選單'}
                    aria-expanded={aboutMenuOpen}
                    aria-controls="mobile-about-submenu"
                    tabIndex={menuOpen ? undefined : -1}
                    onClick={() => setAboutMenuOpen((open) => !open)}
                  >
                    <ChevronDown
                      className={cn(
                        'size-5 transition-transform duration-200 motion-reduce:transition-none',
                        aboutMenuOpen && 'rotate-180',
                      )}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </button>
                </div>
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
                      tabIndex={menuOpen && aboutMenuOpen ? undefined : -1}
                      onClick={(event) => {
                        onNavigate?.(event)
                        onMenuClose()
                      }}
                      activeProps={{
                        className: 'text-[#a77d35] dark:text-[#c6a465]',
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
      </header>
    </div>
  )
}

function ThemeToggle({
  theme,
  onThemeToggle,
}: Pick<TopNavBarViewProps, 'theme' | 'onThemeToggle'>) {
  const label = theme === 'dark' ? '切換至淺色模式' : '切換至深色模式'
  const iconClassName = (active: boolean) =>
    cn(
      'col-start-1 row-start-1 size-5 transition-opacity motion-reduce:transition-none',
      active ? 'opacity-100' : 'opacity-0',
    )

  return (
    <Button
      variant="outline"
      size="icon"
      className="grid rounded-none shrink-0 cursor-pointer place-items-center border border-[rgba(185,145,75,.45)] text-[#7e5f2e] transition-[background,color,border-color] duration-200 hover:border-[#b68c43] hover:bg-[rgba(185,145,75,.07)] hover:text-[#a77d35] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#9b742e] dark:border-[#3a4752] dark:text-[#a99267] dark:hover:border-[#c6a465] dark:hover:bg-[#213140] dark:hover:text-[#c6a465] dark:focus-visible:outline-[#c6a465] motion-reduce:transition-none"
      aria-label={label}
      aria-pressed={theme === 'dark'}
      title={label}
      onClick={onThemeToggle}
    >
      <span aria-hidden="true" className="grid size-5 place-items-center">
        <Sun className={iconClassName(theme === 'dark')} strokeWidth={1.5} />
        <Moon className={iconClassName(theme === 'light')} strokeWidth={1.5} />
      </span>
    </Button>
  )
}
