import { TopNavBarView } from '#/components/top-nav-bar/top-nav-bar-view'
import type { ReactNode } from 'react'

export type PreviewWindowProps = {
  window?: Window
  document?: Document
}

export type PreviewChromeState = {
  navMenuOpen: boolean
  previewTheme: 'light' | 'dark'
}

export type PreviewChromeInstance = {
  props: PreviewWindowProps
  state: PreviewChromeState
  setState: (
    update:
      | Partial<PreviewChromeState>
      | ((state: PreviewChromeState) => Partial<PreviewChromeState>),
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

export function PreviewChrome({
  instance,
  children,
}: {
  instance: PreviewChromeInstance
  children: ReactNode
}) {
  return (
    <>
      <TopNavBarView
        menuOpen={instance.state.navMenuOpen}
        hidden={false}
        theme={instance.state.previewTheme}
        hydrated={true}
        onMenuToggle={() => {
          instance.setState((state) => ({ navMenuOpen: !state.navMenuOpen }))
        }}
        onMenuClose={() => instance.setState({ navMenuOpen: false })}
        onThemeToggle={() => {
          instance.setState((state) => ({
            previewTheme: state.previewTheme === 'dark' ? 'light' : 'dark',
          }))
        }}
        onNavigate={(event) => event.preventDefault()}
      />
      <div className="min-h-screen pt-[var(--layout-header-height)]">{children}</div>
    </>
  )
}
