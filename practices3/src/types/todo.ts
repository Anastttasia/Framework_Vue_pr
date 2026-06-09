export interface TodoItem {
  id: number
  date: Date
  title: string
  done: boolean
}

export type TodoFilter = 'all' | 'active' | 'done'

export interface TodoCreateRequest {
  title: string
}

export interface TodoUpdateRequest {
  title?: string
  done?: boolean
}

export type TodoId = number

export const TODO_FILTERS: Record<TodoFilter, string> = {
  all: 'Все',
  active: 'Активные',
  done: 'Выполненные'
} as const

export const TODO_TITLE_MIN_LENGTH = 1
export const TODO_TITLE_MAX_LENGTH = 200

export interface TodoValidationSchema {
  title: {
    minLength: number
    maxLength: number
    required: true
  }
}

export const TODO_VALIDATION_SCHEMA: TodoValidationSchema = {
  title: {
    minLength: TODO_TITLE_MIN_LENGTH,
    maxLength: TODO_TITLE_MAX_LENGTH,
    required: true
  }
} as const