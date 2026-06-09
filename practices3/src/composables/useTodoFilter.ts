import { computed, ref, type ComputedRef, type Ref } from 'vue'
import type { TodoItem, TodoFilter } from '../types/todo'
import { TodoService } from '../services/todoService'

export interface UseTodoFilterReturn {
  filter: Ref<TodoFilter>
  filteredTodos: ComputedRef<TodoItem[]>
  setFilter: (value: TodoFilter) => void
}

export function useTodoFilter(todos: Ref<TodoItem[]>): UseTodoFilterReturn {
  const filter = ref<TodoFilter>('all')

  const filteredTodos = computed<TodoItem[]>(() => {
    return TodoService.filterTodos(todos.value, filter.value)
  })

  const setFilter = (value: TodoFilter): void => {
    filter.value = value
  }

  return {
    filter,
    filteredTodos,
    setFilter
  }
}