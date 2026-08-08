import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/equestrian')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/equestrian"!</div>
}
