import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/regulation')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/regulation"!</div>
}
