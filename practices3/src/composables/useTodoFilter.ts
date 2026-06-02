import { computed, ref, type ComputedRef, type Ref } from 'vue'
import type { ITodoItem } from '../types/ITodoItem'
import type { FilterType } from '../types/FilterType'

export interface UseTodoFilterReturn {
  filter: Ref<FilterType>
  filteredTodos: ComputedRef<ITodoItem[]>
  setFilter: (value: FilterType) => void
}

export function useTodoFilter(todos: Ref<ITodoItem[]>): UseTodoFilterReturn {
  const filter = ref<FilterType>('all')

  const filteredTodos = computed<ITodoItem[]>(() => {
    switch (filter.value) {
      case 'active':
        return todos.value.filter(todo => !todo.done)
      case 'done':
        return todos.value.filter(todo => todo.done)
      case 'all':
      default:
        return todos.value
    }
  })

  const setFilter = (value: FilterType): void => {
    filter.value = value
  }

  return {
    filter,
    filteredTodos,
    setFilter
  }
}