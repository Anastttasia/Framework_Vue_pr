import { computed, type Ref } from 'vue'
import type { TodoItem } from '../types/todo'
import { TodoService } from '../services/todoService'

export interface UseTodoSearchReturn {
  searchedTodos: Ref<TodoItem[]>
  clearSearch: () => void
}

export function useTodoSearch(
  todos: Ref<TodoItem[]>,
  searchQuery: Ref<string>
): UseTodoSearchReturn {
  const searchedTodos = computed<TodoItem[]>(() => {
    return TodoService.searchTodos(todos.value, searchQuery.value)
  })

  const clearSearch = (): void => {
    searchQuery.value = ''
  }

  return {
    searchedTodos,
    clearSearch
  }
}