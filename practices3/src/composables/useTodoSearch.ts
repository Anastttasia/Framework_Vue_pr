import { computed, type Ref } from 'vue'
import type { ITodoItem } from '../types/ITodoItem'

export interface UseTodoSearchReturn {
  searchedTodos: Ref<ITodoItem[]>
  clearSearch: () => void
}

export function useTodoSearch(
  todos: Ref<ITodoItem[]>,
  searchQuery: Ref<string>
): UseTodoSearchReturn {
  const searchedTodos = computed<ITodoItem[]>(() => {
    if (!searchQuery.value?.trim()) {
      return todos.value
    }

    const query = searchQuery.value.toLowerCase().trim()

    return todos.value.filter(todo =>
      todo.title.toLowerCase().includes(query)
    )
  })

  const clearSearch = (): void => {
    searchQuery.value = ''
  }

  return {
    searchedTodos,
    clearSearch
  }
}