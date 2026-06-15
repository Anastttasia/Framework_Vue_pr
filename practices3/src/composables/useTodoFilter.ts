import { computed, type ComputedRef } from 'vue'
import { useTodoStore } from '../stores/todoStore'
import type { TodoFilter, TodoItem } from '../types/todo'

export interface UseTodoFilterReturn {
  filter: ComputedRef<TodoFilter>
  filteredTodos: ComputedRef<TodoItem[]>
  setFilter: (value: TodoFilter) => void
}

export function useTodoFilter(): UseTodoFilterReturn {
  const store = useTodoStore()

  return {
    filter: computed(() => store.filter),
    filteredTodos: computed(() => store.filteredTodos),
    setFilter: (value: TodoFilter) => store.setFilter(value)
  }
}