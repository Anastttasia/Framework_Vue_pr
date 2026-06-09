import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

export type RouteName = 'index'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'index' as RouteName,
        component: () => import('../pages/IndexPage.vue')
      }
    ]
  }
]

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  routes
})

export default router
