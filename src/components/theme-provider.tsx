/** Pattern: https://github.com/TanStack/tanstack.com/blob/main/src/components/ThemeProvider.tsx */
import { ScriptOnce } from '@tanstack/react-router'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

type ThemeMode = 'dark' | 'light' | 'system'
type ResolvedTheme = 'dark' | 'light'

type ThemeProviderProps = {
  children: ReactNode
  defaultTheme?: ThemeMode
  storageKey?: string
}

type ThemeContextProps = {
  theme: ThemeMode
  resolvedTheme: ResolvedTheme
  setTheme: (theme: ThemeMode) => void
  toggleMode: () => void
}

function isThemeMode(value: string | null): value is ThemeMode {
  return value === 'light' || value === 'dark' || value === 'system'
}

function getThemeScript(storageKey: string, defaultTheme: ThemeMode) {
  const key = JSON.stringify(storageKey)
  const fallback = JSON.stringify(defaultTheme)

  return `(function(){try{var t=localStorage.getItem(${key});if(t!=='light'&&t!=='dark'&&t!=='system'){t=${fallback}}var d=matchMedia('(prefers-color-scheme: dark)').matches;var r=t==='system'?(d?'dark':'light'):t;var e=document.documentElement;e.classList.add(r);e.style.colorScheme=r}catch(e){}})();`
}

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: ThemeMode): ResolvedTheme {
  const root = document.documentElement
  root.classList.remove('light', 'dark')

  const resolved = theme === 'system' ? getSystemTheme() : theme
  root.classList.add(resolved)
  root.style.colorScheme = resolved
  return resolved
}

const ThemeProviderContext = createContext<ThemeContextProps | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
}: ThemeProviderProps) {
  // Fixed initials — same on server and first client render (no localStorage/DOM reads).
  const [theme, setThemeState] = useState<ThemeMode>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light')

  useEffect(() => {
    const stored = localStorage.getItem(storageKey)
    const next = isThemeMode(stored) ? stored : defaultTheme
    setThemeState(next)
    setResolvedTheme(applyTheme(next))
  }, [defaultTheme, storageKey])

  useEffect(() => {
    if (theme !== 'system') return

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => setResolvedTheme(applyTheme('system'))
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [theme])

  const setTheme = (next: ThemeMode) => {
    localStorage.setItem(storageKey, next)
    setThemeState(next)
    setResolvedTheme(applyTheme(next))
  }

  const toggleMode = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeProviderContext value={{ theme, resolvedTheme, setTheme, toggleMode }}>
      <ScriptOnce>{getThemeScript(storageKey, defaultTheme)}</ScriptOnce>
      {children}
    </ThemeProviderContext>
  )
}

export function useTheme() {
  const context = useContext(ThemeProviderContext)
  if (!context) throw new Error('useTheme must be used within a ThemeProvider')
  return context
}
