import { ref, watch, type Ref } from 'vue'

export function useLocalStorage<T>(key: string, initialValue: T): Ref<T> {
  const loadFromStorage = (): T => {
    try {
      const item = localStorage.getItem(key)
      if (item) {
        return JSON.parse(item) as T
      }
    } catch (error) {
      console.error(`Error loading from localStorage for key "${key}":`, error)
    }
    return initialValue
  }

  const storedValue = ref<T>(loadFromStorage()) as Ref<T>

  const saveToStorage = (value: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error saving to localStorage for key "${key}":`, error)
    }
  }

  watch(storedValue, (newValue) => {
    saveToStorage(newValue)
  }, { deep: true })

  return storedValue
}