import { cn } from "#/lib/utils"
import { Button } from "./button"
import { Moon, Sun } from 'lucide-react'

type ThemeTogglerProps = {
  theme: 'light' | 'dark'
  onThemeToggle: () => void
}

export function ThemeToggler({
  theme,
  onThemeToggle,
}: ThemeTogglerProps) {
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
