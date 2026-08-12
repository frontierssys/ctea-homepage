import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/regulation')({
  component: RegulationLayout,
})

function RegulationLayout() {
  return <Outlet />
}
