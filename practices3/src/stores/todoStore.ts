import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TodoItem, TodoCreateRequest } from '../types/todo'
import { useLocalStorage } from '../composables/useLocalStorage'
import { TodoService } from '../services/todoService'
import { isValidationError, isNotFoundError, type AppError } from '../types/errors'

export interface TodoStoreState {
  todos: TodoItem[]
  error: AppError | null
}

export const useTodoStore = defineStore('todo', () => {
  const todos = useLocalStorage<TodoItem[]>('todos', [])
  const error = ref<AppError | null>(null)

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

  const clearError = (): void => {
    error.value = null
  }

  return {
    todos,
    error,
    addTodo,
    removeTodo,
    toggleTodo,
    clearError
  }
})