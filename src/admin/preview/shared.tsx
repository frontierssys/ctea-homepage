import { Button } from '#/components/ui/button'
import { LinkLogo } from '#/components/ui/link-logo'
import { ThemeToggler } from '#/components/ui/theme-toggler'
import { PreviewTopNavMenuDesktop } from '#/admin/preview/preview-top-nav-menu-desktop'
import { PreviewTopNavMenuMobile } from '#/admin/preview/preview-top-nav-menu-mobile'
import { cn } from '#/lib/utils'
import type { ComponentProps, ReactNode } from 'react'

export type PreviewWindowProps = {
  window?: Window
  document?: Document
}

export type PreviewLayoutState = {
  navMenuOpen: boolean
  previewTheme: 'light' | 'dark'
}

export type PreviewLayoutInstance = {
  props: PreviewWindowProps
  state: PreviewLayoutState
  setState: (
    update:
      | Partial<PreviewLayoutState>
      | ((state: PreviewLayoutState) => Partial<PreviewLayoutState>),
  ) => void
}

export function getPreviewWindow(instance: { props: PreviewWindowProps }) {
  return instance.props.window ?? window
}

export function getPreviewDocument(instance: { props: PreviewWindowProps }) {
  return instance.props.document ?? document
}

export function applyPreviewTheme(instance: {
  props: PreviewWindowProps
  state: { previewTheme: 'light' | 'dark' }
}) {
  const previewDocument = getPreviewDocument(instance)
  const root = previewDocument.documentElement

  root.classList.remove('light', 'dark')
  root.classList.add(instance.state.previewTheme)
  root.style.colorScheme = instance.state.previewTheme
}

export function clearPreviewTheme(instance: { props: PreviewWindowProps }) {
  const root = getPreviewDocument(instance).documentElement
  root.classList.remove('light', 'dark')
  root.style.removeProperty('color-scheme')
}

export function PreviewLayout({
  instance,
  children,
}: {
  instance: PreviewLayoutInstance
  children: ReactNode
}) {
  const menuOpen = instance.state.navMenuOpen
  const theme = instance.state.previewTheme

  return (
    <>
      <section
        className={cn(
          'flex h-(--layout-header-content-height) px-11 max-xl:px-7',
          'z-50 border-b transition-[transform,background-color,box-shadow,backdrop-filter] duration-300 motion-reduce:transition-none',
          'fixed inset-x-0 top-0 border-[rgba(185,145,75,.65)] bg-[rgba(251,248,241,.92)] shadow-[0_4px_20px_rgba(78,58,27,.06)] backdrop-blur-sm dark:border-[#3a4752] dark:bg-[rgba(18,34,49,.92)] dark:shadow-[0_4px_20px_rgba(2,8,14,.25)]',
        )}
      >
        <LinkLogo />
        {/* Swap: no Radix NavigationMenu */}
        <PreviewTopNavMenuDesktop />
        {/* Swap: no useState / useRouterState */}
        <PreviewTopNavMenuMobile
          menuOpen={menuOpen}
          setMenuOpen={(open) => instance.setState({ navMenuOpen: open })}
        />

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggler
            theme={theme}
            onThemeToggle={() => {
              instance.setState((state) => ({
                previewTheme: state.previewTheme === 'dark' ? 'light' : 'dark',
              }))
            }}
          />
          <Button
            variant="outline"
            size="icon"
            className={cn(
              'hidden max-lg:grid',
              'cursor-pointer place-content-center gap-1.5 rounded-none border border-[rgba(185,145,75,.45)] transition-colors duration-200 hover:bg-[rgba(185,145,75,.07)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#9b742e] motion-reduce:transition-none dark:border-[#3a4752] dark:hover:bg-[#213140] dark:focus-visible:outline-[#c6a465]',
            )}
            aria-label={menuOpen ? '關閉導覽' : '開啟導覽'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() =>
              instance.setState((state) => ({
                navMenuOpen: !state.navMenuOpen,
              }))
            }
          >
            <span
              className={cn(
                'block h-px w-6 bg-[#17140f] transition-transform duration-200 motion-reduce:transition-none dark:bg-[#f1eade]',
                menuOpen && 'translate-y-[3.5px] rotate-45',
              )}
            />
            <span
              className={cn(
                'block h-px w-6 bg-[#17140f] transition-transform duration-200 motion-reduce:transition-none dark:bg-[#f1eade]',
                menuOpen && 'translate-y-[-3.5px] -rotate-45',
              )}
            />
          </Button>
        </div>
      </section>

      <PreviewMobileNavBackdrop
        isShown={menuOpen}
        onClick={() => instance.setState({ navMenuOpen: false })}
      />

      <div className="min-h-screen pt-(--layout-header-height)">{children}</div>
    </>
  )
}

/** Duplicate of MobileNavBackdrop — avoid importing site menu (hooks / router). */
function PreviewMobileNavBackdrop({
  isShown,
  ...props
}: { isShown: boolean } & ComponentProps<'div'>) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'fixed inset-x-0 top-(--layout-header-height) bottom-0 z-40 lg:hidden',
        'bg-[rgba(251,248,241,.45)] dark:bg-[rgba(9,23,37,.5)]',
        'backdrop-blur-xs transition-opacity duration-200',
        'motion-reduce:transition-none motion-reduce:backdrop-blur-none',
        isShown ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
      {...props}
    />
  )
}
