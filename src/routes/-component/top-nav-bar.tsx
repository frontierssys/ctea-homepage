import { Link, useHydrated } from '@tanstack/react-router'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTheme } from '#/components/theme-provider'
import { useScrollDirection } from '#/hooks/use-scroll-direction'
import { cn } from '#/lib/utils'

const navItems = [
  ['活動看板', '#news'],
  ['關於協會', '#footer'],
  ['馬術介紹', '#video'],
  ['制度專區', '#news'],
  ['行事曆', '#news'],
  ['會員專區', '#footer'],
  ['下載專區', '#footer'],
] as const

const navSpacerClassName = 'h-[122px] max-lg:h-[96px] max-sm:h-[82px]'

export function TopNavBar({ className, ...props }: React.ComponentProps<'header'>) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { direction: scrollDirection, isAtTop } = useScrollDirection()
  const isFloating = !isAtTop
  const isHidden = isFloating && scrollDirection === 'down'

  useEffect(() => {
    if (isHidden) setMenuOpen(false)
  }, [isHidden])

  return (
    <>
      <header
        {...props}
        className={cn(
          'z-50 border-b transition-[transform,background-color,box-shadow,backdrop-filter] duration-300 motion-reduce:transition-none',
          'fixed inset-x-0 top-0 border-[rgba(185,145,75,.65)] bg-[rgba(251,248,241,.92)] shadow-[0_4px_20px_rgba(78,58,27,.06)] backdrop-blur-sm dark:border-[#3a4752] dark:bg-[rgba(18,34,49,.92)] dark:shadow-[0_4px_20px_rgba(2,8,14,.25)]',
          isHidden ? '-translate-y-full' : 'translate-y-0',
          className,
        )}
      >
        <div
          className={cn(
            'mx-auto flex w-full items-center px-[44px] max-xl:px-7 max-sm:px-4',
            navSpacerClassName,
          )}
        >
          <Link
            to="/"
            className="flex min-h-14 shrink-0 items-center gap-4"
            aria-label="中華民國馬術協會首頁"
          >
            <img src="/media/ctea-logo.png" alt="CTEA" className="h-10 w-auto" />
            <span className="min-w-0">
              <strong className="block whitespace-nowrap font-['Noto_Serif_TC','Songti_TC',serif] text-[29px] font-semibold tracking-[0.16em] text-[#151310] dark:text-[#f1eade] max-2xl:text-2xl max-xl:text-xl max-sm:text-base">
                中華民國馬術協會
              </strong>
              <span className="mt-1.5 block whitespace-nowrap font-[Georgia,serif] text-[12px] tracking-[0.08em] text-[#7e5f2e] dark:text-[#a99267] uppercase max-xl:text-[10px] max-sm:hidden">
                Chinese Taipei Equestrian Association
              </span>
            </span>
          </Link>

          <nav
            className="ml-12 flex flex-1 items-center justify-between max-[1500px]:ml-8 max-lg:hidden"
            aria-label="主要導覽"
          >
            {navItems.map(([item, href]) => (
              <a
                className="relative flex min-h-12 flex-1 items-center justify-center px-4 font-['Noto_Serif_TC','Songti_TC',serif] text-xl font-semibold tracking-[0.08em] whitespace-nowrap transition-colors duration-200 before:absolute before:bottom-1 before:left-1/2 before:h-px before:w-8 before:-translate-x-1/2 before:scale-x-0 before:bg-[#a77d35] before:transition-transform before:duration-200 hover:text-[#a77d35] hover:before:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9b742e] after:absolute after:top-1/2 after:right-0 after:h-6 after:w-px after:-translate-y-1/2 after:bg-[rgba(182,140,67,.38)] last:after:hidden dark:before:bg-[#c6a465] dark:hover:text-[#c6a465] dark:focus-visible:outline-[#c6a465] dark:after:bg-[#3a4752] max-[1500px]:px-3 max-[1300px]:text-base"
                href={href}
                key={item}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="ml-5 border-l border-[rgba(182,140,67,.38)] pl-5 dark:border-[#3a4752] max-lg:hidden">
            <ThemeToggle />
          </div>

          <div className="ml-auto hidden items-center gap-2 max-lg:flex">
            <ThemeToggle />
            <button
              type="button"
              className="group grid size-12 cursor-pointer place-content-center gap-1.5 border border-[rgba(185,145,75,.45)] transition-colors duration-200 hover:bg-[rgba(185,145,75,.07)] dark:border-[#3a4752] dark:hover:bg-[#213140]"
              aria-label={menuOpen ? '關閉導覽' : '開啟導覽'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span
                className={`block h-px w-6 bg-[#17140f] transition-transform duration-200 dark:bg-[#f1eade] ${menuOpen ? 'translate-y-[3.5px] rotate-45' : ''}`}
              />
              <span
                className={`block h-px w-6 bg-[#17140f] transition-transform duration-200 dark:bg-[#f1eade] ${menuOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`}
              />
            </button>
          </div>
        </div>

        <nav
          className={`absolute top-full right-4 left-4 grid border border-[rgba(185,145,75,.45)] bg-[rgba(251,248,241,.98)] px-6 shadow-[0_20px_55px_rgba(78,58,27,.07)] backdrop-blur-sm transition-[background,border-color,box-shadow,opacity,transform] duration-200 dark:border-[#3a4752] dark:bg-[rgba(23,42,60,.98)] dark:shadow-[0_20px_55px_rgba(2,8,14,.35)] lg:hidden ${menuOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'}`}
          aria-label="行動版導覽"
        >
          {navItems.map(([item, href]) => (
            <a
              href={href}
              className="flex min-h-12 items-center border-b border-[rgba(182,140,67,.38)] dark:border-[#3a4752] font-['Noto_Serif_TC','Songti_TC',serif] tracking-[0.1em] last:border-0"
              key={item}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>
      </header>
    </>
  )
}

function ThemeToggle() {
  const hydrated = useHydrated()
  const { theme, setTheme } = useTheme()
  const label = theme === 'dark' ? '切換至淺色模式' : '切換至深色模式'

  return (
    <button
      type="button"
      className={`grid size-12 shrink-0 cursor-pointer place-items-center border border-[rgba(185,145,75,.45)] text-[#7e5f2e] transition-[background,color,border-color] duration-200 hover:border-[#b68c43] hover:bg-[rgba(185,145,75,.07)] hover:text-[#a77d35] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#9b742e] dark:border-[#3a4752] dark:text-[#a99267] dark:hover:border-[#c6a465] dark:hover:bg-[#213140] dark:hover:text-[#c6a465] dark:focus-visible:outline-[#c6a465] motion-reduce:transition-none`}
      aria-label={label}
      aria-pressed={theme === 'dark'}
      title={label}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {hydrated &&
        (theme === 'dark' ? (
          <Sun className="size-5" strokeWidth={1.5} aria-hidden="true" />
        ) : (
          <Moon className="size-5" strokeWidth={1.5} aria-hidden="true" />
        ))}
    </button>
  )
}
