import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useLocalStorage } from '../composables/useLocalStorage'
import { createLoadingState } from './helpers'

export type Theme = 'light' | 'dark'

export interface NotificationItem {
  id: number
  message: string
  type: 'positive' | 'negative' | 'warning' | 'info'
  timestamp: Date
}

export const useUiStore = defineStore('ui', () => {
  const theme = useLocalStorage<Theme>('ui-theme', 'light')
  const drawerOpen = ref(false)
  const notifications = ref<NotificationItem[]>([])
  const { loading, error, withLoading, clearError } = createLoadingState()

  const isDarkMode = computed(() => theme.value === 'dark')
  const isDrawerOpen = computed(() => drawerOpen.value)

  function toggleTheme(): void {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  function setTheme(newTheme: Theme): void {
    theme.value = newTheme
  }

  function toggleDrawer(): void {
    drawerOpen.value = !drawerOpen.value
  }

  function setDrawer(open: boolean): void {
    drawerOpen.value = open
  }

  function addNotification(message: string, type: NotificationItem['type'] = 'info'): void {
    const notification: NotificationItem = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    }
    notifications.value.push(notification)
    setTimeout(() => removeNotification(notification.id), 5000)
  }

  function removeNotification(id: number): void {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }

  function clearNotifications(): void {
    notifications.value = []
  }

  return {
    theme, drawerOpen, notifications, loading, error,
    isDarkMode, isDrawerOpen,
    toggleTheme, setTheme, toggleDrawer, setDrawer,
    addNotification, removeNotification, clearNotifications, clearError
  }
})