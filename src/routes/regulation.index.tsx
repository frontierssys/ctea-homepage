import { createFileRoute, redirect } from '@tanstack/react-router'
import { REGULATION_DEFAULT_PAGE_ID } from '#/lib/content/regulation'

export const Route = createFileRoute('/regulation/')({
  beforeLoad: () => {
    throw redirect({
      to: '/regulation/$sectionId',
      params: { sectionId: REGULATION_DEFAULT_PAGE_ID },
    })
  },
})
