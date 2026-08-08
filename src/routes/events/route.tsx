import { Outlet, createFileRoute } from '@tanstack/react-router'
import { TopNavBar } from '#/components/top-nav-bar/top-nav-bar'
import { SiteFooter } from '../-component/landing-content'

export const Route = createFileRoute('/events')({
  component: EventsLayout,
})

function EventsLayout() {
  return (
    <>
      <TopNavBar />
      <div className="min-h-screen pt-[var(--layout-header-height)]">
        <Outlet />
      </div>
      <SiteFooter />
    </>
  )
}
