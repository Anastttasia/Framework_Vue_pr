export type ErrorCategory = 'validation' | 'storage' | 'not_found' | 'unknown'

export interface BaseAppError {
  category: ErrorCategory
  message: string
  timestamp: Date
}

export interface ValidationError extends BaseAppError {
  category: 'validation'
  field: string
  value: unknown
  constraint: string
}

export interface StorageError extends BaseAppError {
  category: 'storage'
  key: string
  operation: 'read' | 'write' | 'delete'
  originalError?: Error
}

export interface NotFoundError extends BaseAppError {
  category: 'not_found'
  resourceId: string | number
  resourceType: string
}

export interface UnknownError extends BaseAppError {
  category: 'unknown'
  originalError?: Error
}

// Discriminated union of all app errors
export type AppError = ValidationError | StorageError | NotFoundError | UnknownError

// Error type guard functions
export function isValidationError(error: AppError): error is ValidationError {
  return error.category === 'validation'
}

export function isStorageError(error: AppError): error is StorageError {
  return error.category === 'storage'
}

export function isNotFoundError(error: AppError): error is NotFoundError {
  return error.category === 'not_found'
}

export function isUnknownError(error: AppError): error is UnknownError {
  return error.category === 'unknown'
}

// Error factory functions
export function createValidationError(
  field: string,
  value: unknown,
  constraint: string,
  message: string
): ValidationError {
  return {
    category: 'validation',
    field,
    value,
    constraint,
    message,
    timestamp: new Date()
  }
}

export function createStorageError(
  key: string,
  operation: 'read' | 'write' | 'delete',
  originalError?: Error
): StorageError {
  return {
    category: 'storage',
    key,
    operation,
    message: `Storage ${operation} failed for key "${key}"`,
    timestamp: new Date(),
    originalError
  }
}

export function createNotFoundError(
  resourceType: string,
  resourceId: string | number
): NotFoundError {
  return {
    category: 'not_found',
    resourceType,
    resourceId,
    message: `${resourceType} with id ${resourceId} not found`,
    timestamp: new Date()
  }
}

export function createUnknownError(originalError?: Error): UnknownError {
  return {
    category: 'unknown',
    message: originalError?.message ?? 'An unknown error occurred',
    timestamp: new Date(),
    originalError
  }
}

// Result type for operations that can fail
export type Result<T> = { success: true; data: T } | { success: false; error: AppError }

// Result helper functions
export function success<T>(data: T): Result<T> {
  return { success: true, data }
}

export function failure<T>(error: AppError): Result<T> {
  return { success: false, error }
}