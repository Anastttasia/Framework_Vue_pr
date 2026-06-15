import { computed, type ComputedRef } from 'vue'
import { useTodoStore } from '../stores/todoStore'
import type { TodoItem } from '../types/todo'

export interface UseTodoSearchReturn {
  searchQuery: ComputedRef<string>
  searchedTodos: ComputedRef<TodoItem[]>
  setSearchQuery: (value: string) => void
  clearSearch: () => void
}

export function useTodoSearch(): UseTodoSearchReturn {
  const store = useTodoStore()

  return {
    searchQuery: computed(() => store.searchQuery),
    searchedTodos: computed(() => store.searchedTodos),
    setSearchQuery: (value: string) => store.setSearchQuery(value),
    clearSearch: () => store.clearSearch()
  }
}