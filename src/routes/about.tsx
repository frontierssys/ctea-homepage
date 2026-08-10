import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutLayout,
})

function AboutLayout() {
  return (
    <div className="mx-auto w-[min(100%-32px,1440px)] py-8 sm:w-[min(100%-48px,1440px)]">
      <Outlet />
    </div>
  )
}
