import type { FileRouteTypes } from "#/routeTree.gen"

export type NavChild = {
  label: string
  to: FileRouteTypes['to']
}

export type NavLink = {
  label: string
  to: FileRouteTypes['to']
  children?: ReadonlyArray<NavChild>
}

export const navLinks: ReadonlyArray<NavLink> = [
  {
    label: '活動看板',
    to: '/events',
  },
  {
    label: '關於協會',
    to: '/about',
    children: [
      { label: '協會歷史', to: '/about/history' },
      { label: '協會宗旨', to: '/about/mission' },
      { label: '組織章程', to: '/about/constitution' },
      { label: '奮鬥願景', to: '/about/vision' },
    ],
  },
  {
    label: '馬術介紹',
    to: '/equestrian',
  },
  {
    label: '制度專區',
    to: '/regulation',
  },
  {
    label: '行事曆',
    to: '/calendar',
  },
  {
    label: '會員專區',
    to: '/member',
  },
  {
    label: '下載專區',
    to: '/download',
  },
]