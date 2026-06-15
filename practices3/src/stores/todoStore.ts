import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { TodoItem, TodoCreateRequest, TodoFilter } from '../types/todo'
import type { AppError } from '../types/errors'
import { useLocalStorage } from '../composables/useLocalStorage'
import { TodoService } from '../services/todoService'
import { createLoadingState } from './helpers'

export const useTodoStore = defineStore('todo', () => {
  const todos = useLocalStorage<TodoItem[]>('todos', [])
  const filter = ref<TodoFilter>('all')
  const searchQuery = ref('')
  const { loading, error, withLoading, clearError } = createLoadingState()

  const activeTodos = computed(() => TodoService.filterTodos(todos.value, 'active'))
  const completedTodos = computed(() => TodoService.filterTodos(todos.value, 'done'))
  const filteredTodos = computed(() => TodoService.filterTodos(todos.value, filter.value))
  const searchedTodos = computed(() => TodoService.searchTodos(filteredTodos.value, searchQuery.value))
  const hasTodos = computed(() => todos.value.length > 0)
  const todoCounts = computed(() => TodoService.getCounts(todos.value))

  const addTodo = (request: TodoCreateRequest): boolean => {
    const result = TodoService.createTodo(request)
    if (!result.success) {
      error.value = result.error
      return false
    }
    todos.value.push(result.data)
    error.value = null
    return true
  }

  const removeTodo = (id: number): boolean => {
    const result = TodoService.removeTodo(todos.value, id)
    if (!result.success) {
      error.value = result.error
      return false
    }
    error.value = null
    return true
  }

  const toggleTodo = (id: number): boolean => {
    const result = TodoService.toggleTodo(todos.value, id)
    if (!result.success) {
      error.value = result.error
      return false
    }
    error.value = null
    return true
  }

  const getTodoById = (id: number): TodoItem | undefined => {
    const result = TodoService.getTodoById(todos.value, id)
    return result.success ? result.data : undefined
  }

  function setFilter(value: TodoFilter): void {
    filter.value = value
  }

  function setSearchQuery(value: string): void {
    searchQuery.value = value
  }

  function clearSearch(): void {
    searchQuery.value = ''
  }

  return {
    todos, filter, searchQuery, loading, error,
    activeTodos, completedTodos, filteredTodos, searchedTodos,
    hasTodos, todoCounts,
    addTodo, removeTodo, toggleTodo, getTodoById,
    setFilter, setSearchQuery, clearSearch, clearError
  }
})