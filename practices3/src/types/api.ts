import type { TodoItem, TodoId, TodoCreateRequest, TodoUpdateRequest } from './todo'

export interface ApiResponse<T> {
  data: T
  success: boolean
  message: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

export type TodoCreateApiRequest = TodoCreateRequest
export type TodoUpdateApiRequest = TodoUpdateRequest

export type TodoListResponse = ApiResponse<TodoItem[]>
export type TodoItemResponse = ApiResponse<TodoItem>
export type TodoDeleteResponse = ApiResponse<{ id: TodoId }>
export type TodoToggleResponse = ApiResponse<{ id: TodoId; done: boolean }>


export interface LocalStorageTodoData {
  todos: TodoItem[]
  lastUpdated: string
}


export interface StorageAdapter {
  get: <T>(key: string) => T | null
  set: <T>(key: string, value: T) => void
  remove: (key: string) => void
  clear: () => void
}