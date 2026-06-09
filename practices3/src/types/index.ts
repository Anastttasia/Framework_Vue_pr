export type {
  TodoItem,
  TodoFilter,
  TodoCreateRequest,
  TodoUpdateRequest,
  TodoId,
  TodoValidationSchema
} from './todo'

export {
  TODO_FILTERS,
  TODO_TITLE_MIN_LENGTH,
  TODO_TITLE_MAX_LENGTH,
  TODO_DESCRIPTION_MAX_LENGTH,
  TODO_VALIDATION_SCHEMA
} from './todo'

// API types
export type {
  ApiResponse,
  PaginatedResponse,
  TodoCreateApiRequest,
  TodoUpdateApiRequest,
  TodoListResponse,
  TodoItemResponse,
  TodoDeleteResponse,
  TodoToggleResponse,
  LocalStorageTodoData,
  StorageAdapter
} from './api'

// Error types
export type {
  AppError,
  BaseAppError,
  ValidationError,
  StorageError,
  NotFoundError,
  UnknownError,
  Result
} from './errors'

export {
  isValidationError,
  isStorageError,
  isNotFoundError,
  isUnknownError,
  createValidationError,
  createStorageError,
  createNotFoundError,
  createUnknownError,
  success,
  failure
} from './errors'