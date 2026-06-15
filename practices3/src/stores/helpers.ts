import { ref, type Ref } from 'vue'
import type { AppError } from '../types/errors'
import { createUnknownError } from '../types/errors'

export interface LoadingState {
  loading: Ref<boolean>
  error: Ref<AppError | null>
  withLoading: <T>(fn: () => Promise<T> | T, onError?: (e: AppError) => void) => Promise<T | undefined>
  clearError: () => void
}

export function createLoadingState(): LoadingState {
  const loading = ref(false)
  const error = ref<AppError | null>(null)

  const withLoading = async <T>(
    fn: () => Promise<T> | T,
    onError?: (e: AppError) => void
  ): Promise<T | undefined> => {
    loading.value = true
    error.value = null
    try {
      const result = await fn()
      return result
    } catch (e) {
      const appError = e instanceof Error
        ? createUnknownError(e)
        : createUnknownError(new Error(String(e)))
      error.value = appError
      onError?.(appError)
      return undefined
    } finally {
      loading.value = false
    }
  }

  const clearError = (): void => {
    error.value = null
  }

  return { loading, error, withLoading, clearError }
}