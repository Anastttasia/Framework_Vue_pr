import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AppError } from '../types/errors'
import { createUnknownError } from '../types/errors'
import { useLocalStorage } from '../composables/useLocalStorage'
import { createLoadingState } from './helpers'

export interface User {
  id: number
  username: string
  email: string
  avatar?: string
}

export interface UserSettings {
  language: string
  itemsPerPage: number
  showCompleted: boolean
}

const DEFAULT_SETTINGS: UserSettings = {
  language: 'ru',
  itemsPerPage: 10,
  showCompleted: true
}

const MOCK_USER: User = {
  id: 1,
  username: 'admin',
  email: 'admin@example.com',
  avatar: undefined
}

export const useUserStore = defineStore('user', () => {
  const currentUser = useLocalStorage<User | null>('user-current', null)
  const settings = useLocalStorage<UserSettings>('user-settings', { ...DEFAULT_SETTINGS })
  const loading = ref(false)
  const error = ref<AppError | null>(null)
  const { withLoading, clearError } = createLoadingState()

  const isAuthenticated = computed(() => currentUser.value !== null)
  const username = computed(() => currentUser.value?.username ?? '')
  const userSettings = computed(() => settings.value)

  async function login(usernameInput: string, _password: string): Promise<boolean> {
    const result = await withLoading(async () => {
      await new Promise(resolve => setTimeout(resolve, 300))
      if (usernameInput === MOCK_USER.username) {
        currentUser.value = { ...MOCK_USER }
        return true
      }
      throw new Error('Invalid username or password')
    }, (e) => {
      error.value = e
    })
    return result ?? false
  }

  function logout(): void {
    currentUser.value = null
  }

  function updateSettings(partial: Partial<UserSettings>): void {
    settings.value = { ...settings.value, ...partial }
  }

  function resetSettings(): void {
    settings.value = { ...DEFAULT_SETTINGS }
  }

  return {
    currentUser, isAuthenticated, username, settings, userSettings,
    loading, error,
    login, logout, updateSettings, resetSettings, clearError
  }
})