/**
 * Custom Error Classes
 * Structured error handling for consistent API responses
 */

/**
 * AppError - Base custom error class
 * Extends native Error to include status code and isOperational flag
 */
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Flag to distinguish operational errors from programming errors

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * BadRequestError - 400
 * Used for invalid input, validation failures
 */
export class BadRequestError extends AppError {
  constructor(message = 'Bad Request') {
    super(message, 400);
    this.name = 'BadRequestError';
  }
}

/**
 * UnauthorizedError - 401
 * Used for missing or invalid authentication
 */
export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized - No valid token provided') {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}

/**
 * ForbiddenError - 403
 * Used for authorization failures (user doesn't have permission)
 */
export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden - You do not have permission to access this resource') {
    super(message, 403);
    this.name = 'ForbiddenError';
  }
}

/**
 * NotFoundError - 404
 * Used when requested resource doesn't exist
 */
export class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404);
    this.name = 'NotFoundError';
  }
}

/**
 * ConflictError - 409
 * Used for duplicate records or state conflicts
 */
export class ConflictError extends AppError {
  constructor(message = 'Conflict - Resource already exists') {
    super(message, 409);
    this.name = 'ConflictError';
  }
}

/**
 * ValidationError - 422
 * Used for entity validation failures
 */
export class ValidationError extends AppError {
  constructor(message = 'Validation Error', errors = []) {
    super(message, 422);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

/**
 * InternalServerError - 500
 * Used for unexpected server errors
 */
export class InternalServerError extends AppError {
  constructor(message = 'Internal Server Error') {
    super(message, 500);
    this.name = 'InternalServerError';
  }
}
