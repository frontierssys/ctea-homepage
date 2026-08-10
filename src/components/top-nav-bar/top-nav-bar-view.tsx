import { Moon, Sun } from 'lucide-react'
import type { ComponentProps, MouseEventHandler } from 'react'
import { cn } from '#/lib/utils'
import { Link, type FileRouteTypes } from '@tanstack/react-router'

const navLinks = [{
  label: '活動看板',
  to: '/events',
}, {
  label: '關於協會',
  to: '/about',
}, {
  label: '馬術介紹',
  to: '/equestrian',
}, {
  label: '制度專區',
  to: '/regulation',
}, {
  label: '行事曆',
  to: '/calendar',
}, {
  label: '會員專區',
  to: '/member',
}, {
  label: '下載專區',
  to: '/download',
}] as const satisfies Array<{
  label: string
  to: FileRouteTypes['to']
}>

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
            {navLinks.map(({ label, to }) => (
              <Link
                className="relative flex min-h-12 flex-1 items-center justify-center px-4 font-body text-nav whitespace-nowrap transition-colors duration-200 before:absolute before:bottom-1 before:left-1/2 before:h-px before:w-8 before:-translate-x-1/2 before:scale-x-0 before:bg-[#a77d35] before:transition-transform before:duration-200 hover:text-[#a77d35] hover:before:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9b742e] after:absolute after:top-1/2 after:right-0 after:h-6 after:w-px after:-translate-y-1/2 after:bg-[rgba(182,140,67,.38)] last:after:hidden dark:before:bg-[#c6a465] dark:hover:text-[#c6a465] dark:focus-visible:outline-[#c6a465] dark:after:bg-[#3a4752] max-[1500px]:px-3"
                to={to}
                key={to}
                onClick={onNavigate}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto items-center gap-2 flex">
            <ThemeToggle theme={theme} onThemeToggle={onThemeToggle} />
            <button
              type="button"
              className={cn(
                'hidden max-lg:grid',
                'size-9 cursor-pointer place-content-center gap-1.5 border border-[rgba(185,145,75,.45)] transition-colors duration-200 hover:bg-[rgba(185,145,75,.07)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#9b742e] dark:border-[#3a4752] dark:hover:bg-[#213140] dark:focus-visible:outline-[#c6a465] motion-reduce:transition-none'
              )}
              aria-label={menuOpen ? '關閉導覽' : '開啟導覽'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={onMenuToggle}
            >
              <span className="block h-px w-6 bg-[#17140f] transition-transform duration-200 group-data-[state=open]/mobile-nav:translate-y-[3.5px] group-data-[state=open]/mobile-nav:rotate-45 dark:bg-[#f1eade] motion-reduce:transition-none" />
              <span className="block h-px w-6 bg-[#17140f] transition-transform duration-200 group-data-[state=open]/mobile-nav:translate-y-[-3.5px] group-data-[state=open]/mobile-nav:-rotate-45 dark:bg-[#f1eade] motion-reduce:transition-none" />
            </button>
          </div>
        </div>

        <nav
          id="mobile-navigation"
          className="pointer-events-none absolute top-full right-4 left-4 grid -translate-y-2 border border-[rgba(185,145,75,.45)] bg-[rgba(251,248,241,.98)] px-6 opacity-0 shadow-[0_20px_55px_rgba(78,58,27,.07)] backdrop-blur-sm transition-[background,border-color,box-shadow,opacity,transform] duration-200 group-data-[state=open]/mobile-nav:pointer-events-auto group-data-[state=open]/mobile-nav:translate-y-0 group-data-[state=open]/mobile-nav:opacity-100 lg:hidden dark:border-[#3a4752] dark:bg-[rgba(23,42,60,.98)] dark:shadow-[0_20px_55px_rgba(2,8,14,.35)] motion-reduce:transition-none"
          aria-label="行動版導覽"
          aria-hidden={!menuOpen}
        >
          {navLinks.map(({ label, to }) => (
            <Link
              to={to}
              className="flex min-h-12 items-center border-b border-[rgba(182,140,67,.38)] font-body text-nav last:border-0 dark:border-[#3a4752]"
              key={to}
              tabIndex={menuOpen ? undefined : -1}
              onClick={(event) => {
                onNavigate?.(event)
                onMenuClose()
              }}
            >
              {label}
            </Link>
          ))}
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
    <button
      type="button"
      className="grid size-9 shrink-0 cursor-pointer place-items-center border border-[rgba(185,145,75,.45)] text-[#7e5f2e] transition-[background,color,border-color] duration-200 hover:border-[#b68c43] hover:bg-[rgba(185,145,75,.07)] hover:text-[#a77d35] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#9b742e] dark:border-[#3a4752] dark:text-[#a99267] dark:hover:border-[#c6a465] dark:hover:bg-[#213140] dark:hover:text-[#c6a465] dark:focus-visible:outline-[#c6a465] motion-reduce:transition-none"
      aria-label={label}
      aria-pressed={theme === 'dark'}
      title={label}
      onClick={onThemeToggle}
    >
      <span aria-hidden="true" className="grid size-5 place-items-center">
        <Sun className={iconClassName(theme === 'dark')} strokeWidth={1.5} />
        <Moon className={iconClassName(theme === 'light')} strokeWidth={1.5} />
      </span>
    </button>
  )
}
