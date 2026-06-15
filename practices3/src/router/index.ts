import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { registerGuards } from './guards'

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  routes
})

registerGuards(router)

export default router