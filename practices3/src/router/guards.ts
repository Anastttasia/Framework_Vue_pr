import type { Router } from 'vue-router'
import { useUserStore } from '../stores/userStore'

export function registerGuards(router: Router): void {
  router.beforeEach((to, _from, next) => {
    const userStore = useUserStore()

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth !== false)

    if (requiresAuth && !userStore.isAuthenticated) {
      next({ name: 'login', query: { redirect: to.fullPath } })
      return
    }

    if (to.name === 'login' && userStore.isAuthenticated) {
      next({ name: 'index' })
      return
    }

    next()
  })
}