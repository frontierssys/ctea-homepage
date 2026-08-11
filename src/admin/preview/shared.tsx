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
    // Single full-width root: Sveltia mounts the template on iframe <body>;
    // a fragment of fixed + in-flow siblings can shrink the content column.
    <div className="min-h-screen w-full">
      <section
        className={cn(
          'flex h-(--layout-header-height) w-full items-center px-11 max-xl:px-7',
          'z-50 border-b transition-[transform,background-color,box-shadow,backdrop-filter] duration-300 motion-reduce:transition-none',
          'fixed inset-x-0 top-0 border-ctea-nav-border bg-ctea-nav-surface text-[#fffaf0] backdrop-blur-sm dark:text-[#f1eade]',
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_-40%,rgba(208,174,109,.2),transparent_38%),radial-gradient(circle_at_88%_140%,rgba(96,143,177,.16),transparent_38%)] dark:bg-[radial-gradient(circle_at_14%_-40%,rgba(198,164,101,.14),transparent_38%),radial-gradient(circle_at_88%_140%,rgba(96,143,177,.12),transparent_38%)]"
        />
        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center">
          <LinkLogo />
          {/* Swap: no Radix NavigationMenu */}
          <PreviewTopNavMenuDesktop className="max-lg:hidden" />
          {/* Swap: no useState / useRouterState */}
          <PreviewTopNavMenuMobile
            className="hidden max-lg:block"
            menuOpen={menuOpen}
            setMenuOpen={(open) => instance.setState({ navMenuOpen: open })}
          />

          <div className="flex shrink-0 items-center gap-2 max-lg:ml-auto">
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
                'cursor-pointer place-content-center gap-1.5 rounded-none border border-[rgba(208,174,109,.55)] bg-transparent transition-colors duration-200 hover:border-[#d0ae6d] hover:bg-[rgba(208,174,109,.1)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#f3dbad] motion-reduce:transition-none dark:border-[#3a4752] dark:bg-transparent dark:hover:border-[#c6a465] dark:hover:bg-[#213140] dark:focus-visible:outline-[#c6a465]',
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
                  'block h-px w-6 bg-[#fffaf0] transition-transform duration-200 motion-reduce:transition-none dark:bg-[#f1eade]',
                  menuOpen && 'translate-y-[3.5px] rotate-45',
                )}
              />
              <span
                className={cn(
                  'block h-px w-6 bg-[#fffaf0] transition-transform duration-200 motion-reduce:transition-none dark:bg-[#f1eade]',
                  menuOpen && 'translate-y-[-3.5px] -rotate-45',
                )}
              />
            </Button>
          </div>
        </div>
      </section>

      <PreviewMobileNavBackdrop
        isShown={menuOpen}
        onClick={() => instance.setState({ navMenuOpen: false })}
      />

      <div className="w-full pt-(--layout-header-height)">{children}</div>
    </div>
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
        'bg-[rgba(9,23,37,.46)] dark:bg-[rgba(2,8,14,.6)]',
        'backdrop-blur-xs transition-opacity duration-200',
        'motion-reduce:transition-none motion-reduce:backdrop-blur-none',
        isShown ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
      {...props}
    />
  )
}
