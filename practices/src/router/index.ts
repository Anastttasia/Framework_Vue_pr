import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('../pages/IndexPage.vue')
      },
      {
        path: 'create',
        name: 'create',
        component: () => import('../pages/CreateTodo.vue')
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
