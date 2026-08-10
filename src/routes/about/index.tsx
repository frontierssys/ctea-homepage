import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/about/')({
  component: () => <></>,
  beforeLoad: () => {
    throw redirect({ to: '/about/history' })
  },
})
