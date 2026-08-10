import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutLayout,
})

function AboutLayout() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <Outlet />
    </div>
  )
}
