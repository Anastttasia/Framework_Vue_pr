import type { RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    breadcrumb?: string
  }
}

export type RouteName = 'index' | 'create' | 'settings' | 'login' | 'not-found'

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('../layouts/AuthLayout.vue'),
    meta: { requiresAuth: false },
    children: [
      {
        path: '',
        name: 'login' as RouteName,
        component: () => import('../pages/LoginPage.vue'),
        meta: { requiresAuth: false, breadcrumb: 'Вход' }
      }
    ]
  },
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'index' as RouteName,
        component: () => import('../pages/IndexPage.vue'),
        meta: { requiresAuth: true, breadcrumb: 'Мои задачи' }
      },
      {
        path: 'create',
        name: 'create' as RouteName,
        component: () => import('../pages/CreateTodo.vue'),
        meta: { requiresAuth: true, breadcrumb: 'Добавить задачу' }
      },
      {
        path: 'settings',
        name: 'settings' as RouteName,
        component: () => import('../pages/SettingsPage.vue'),
        meta: { requiresAuth: true, breadcrumb: 'Настройки' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found' as RouteName,
    component: () => import('../pages/NotFoundPage.vue'),
    meta: { requiresAuth: false, breadcrumb: '404' }
  }
]