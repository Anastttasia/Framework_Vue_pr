import type { TodoItem, TodoCreateRequest, TodoId, TodoFilter } from '../types/todo'
import type { Result } from '../types/errors'
import { createValidationError, createNotFoundError, success, failure } from '../types/errors'
import { TODO_TITLE_MIN_LENGTH, TODO_TITLE_MAX_LENGTH } from '../types/todo'

export class TodoService {

  static validateCreateRequest(request: TodoCreateRequest): Result<void> {
    const { title } = request

    if (!title || title.trim().length < TODO_TITLE_MIN_LENGTH) {
      return failure(
        createValidationError(
          'title',
          title,
          `minLength: ${TODO_TITLE_MIN_LENGTH}`,
          'Title is required and must not be empty'
        )
      )
    }

    if (title.length > TODO_TITLE_MAX_LENGTH) {
      return failure(
        createValidationError(
          'title',
          title,
          `maxLength: ${TODO_TITLE_MAX_LENGTH}`,
          `Title must be at most ${TODO_TITLE_MAX_LENGTH} characters`
        )
      )
    }

    return success(undefined)
  }


  static createTodo(request: TodoCreateRequest): Result<TodoItem> {
    const validation = this.validateCreateRequest(request)

    if (!validation.success) {
      return validation
    }

    const newTodo: TodoItem = {
      id: Date.now(),
      date: new Date(),
      title: request.title.trim(),
      done: false
    }

    return success(newTodo)
  }


  static toggleTodo(todos: TodoItem[], id: TodoId): Result<TodoItem[]> {
    const todo = todos.find(t => t.id === id)

    if (!todo) {
      return failure(createNotFoundError('Todo', id))
    }

    todo.done = !todo.done

    return success(todos)
  }


  static removeTodo(todos: TodoItem[], id: TodoId): Result<TodoItem[]> {
    const index = todos.findIndex(t => t.id === id)

    if (index === -1) {
      return failure(createNotFoundError('Todo', id))
    }

    todos.splice(index, 1)

    return success(todos)
  }


  static filterTodos(todos: TodoItem[], filter: TodoFilter): TodoItem[] {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.done)
      case 'done':
        return todos.filter(todo => todo.done)
      case 'all':
      default:
        return todos
    }
  }


  static searchTodos(todos: TodoItem[], query: string): TodoItem[] {
    const trimmedQuery = query.trim().toLowerCase()

    if (!trimmedQuery) {
      return todos
    }

    return todos.filter(
      todo =>
        todo.title.toLowerCase().includes(trimmedQuery)
    )
  }


  static getTodoById(todos: TodoItem[], id: TodoId): Result<TodoItem> {
    const todo = todos.find(t => t.id === id)

    if (!todo) {
      return failure(createNotFoundError('Todo', id))
    }

    return success(todo)
  }


  static getCounts(todos: TodoItem[]): {
    total: number
    active: number
    done: number
  } {
    const active = todos.filter(t => !t.done).length
    return {
      total: todos.length,
      active,
      done: todos.length - active
    }
  }
}