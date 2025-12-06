/**
 * Error Handler Service
 * Custom error types and error handling utilities
 */

// ===== CUSTOM ERROR TYPES =====

/**
 * Base Application Error
 */
export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(
        message: string,
        statusCode: number = 500,
        isOperational: boolean = true
    ) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Validation Error
 */
export class ValidationError extends AppError {
    public readonly fields: Record<string, string>;

    constructor(message: string, fields: Record<string, string> = {}) {
        super(message, 400);
        this.name = 'ValidationError';
        this.fields = fields;
    }
}

/**
 * Database Error
 */
export class DatabaseError extends AppError {
    constructor(message: string) {
        super(message, 500);
        this.name = 'DatabaseError';
    }
}

/**
 * Authentication Error
 */
export class AuthenticationError extends AppError {
    constructor(message: string = 'Authentication failed') {
        super(message, 401);
        this.name = 'AuthenticationError';
    }
}

/**
 * Authorization Error
 */
export class AuthorizationError extends AppError {
    constructor(message: string = 'Access denied') {
        super(message, 403);
        this.name = 'AuthorizationError';
    }
}

/**
 * Not Found Error
 */
export class NotFoundError extends AppError {
    constructor(resource: string = 'Resource') {
        super(`${resource} not found`, 404);
        this.name = 'NotFoundError';
    }
}

/**
 * Duplicate Error
 */
export class DuplicateError extends AppError {
    constructor(field: string = 'Record') {
        super(`${field} already exists`, 409);
        this.name = 'DuplicateError';
    }
}

// ===== ERROR HANDLER CLASS =====

export interface ErrorResponse {
    success: false;
    error: {
        type: string;
        message: string;
        fields?: Record<string, string>;
        statusCode: number;
    };
}

export interface SuccessResponse<T> {
    success: true;
    data: T;
    message?: string;
}

export type ApiResponse<T> = ErrorResponse | SuccessResponse<T>;

export class ErrorHandler {
    private static instance: ErrorHandler;

    private constructor() { }

    /**
     * Get singleton instance
     */
    static getInstance(): ErrorHandler {
        if (!ErrorHandler.instance) {
            ErrorHandler.instance = new ErrorHandler();
        }
        return ErrorHandler.instance;
    }

    /**
     * Format error for API response
     */
    formatError(error: Error): ErrorResponse {
        if (error instanceof AppError) {
            const response: ErrorResponse = {
                success: false,
                error: {
                    type: error.name,
                    message: error.message,
                    statusCode: error.statusCode
                }
            };

            if (error instanceof ValidationError && Object.keys(error.fields).length > 0) {
                response.error.fields = error.fields;
            }

            return response;
        }

        // Handle unknown errors
        return {
            success: false,
            error: {
                type: 'InternalError',
                message: 'An unexpected error occurred',
                statusCode: 500
            }
        };
    }

    /**
     * Format success response
     */
    formatSuccess<T>(data: T, message?: string): SuccessResponse<T> {
        return {
            success: true,
            data,
            message
        };
    }

    /**
     * Log error to console (can be extended for external logging)
     */
    logError(error: Error, context?: string): void {
        const timestamp = new Date().toISOString();
        const contextStr = context ? ` [${context}]` : '';

        console.error(`[${timestamp}]${contextStr} ${error.name}: ${error.message}`);

        if (!(error instanceof AppError) || !error.isOperational) {
            console.error(error.stack);
        }
    }

    /**
     * Handle async errors in route handlers
     */
    async handleAsync<T>(
        fn: () => Promise<T>,
        context?: string
    ): Promise<ApiResponse<T>> {
        try {
            const result = await fn();
            return this.formatSuccess(result);
        } catch (error) {
            if (error instanceof Error) {
                this.logError(error, context);
                return this.formatError(error);
            }
            return this.formatError(new Error('Unknown error'));
        }
    }

    /**
     * Show error message (for client-side use)
     */
    showError(message: string): string {
        return message;
    }

    /**
     * Determine if error is operational (expected)
     */
    isOperationalError(error: Error): boolean {
        if (error instanceof AppError) {
            return error.isOperational;
        }
        return false;
    }
}

// Export singleton instance
export const errorHandler = ErrorHandler.getInstance();

export default ErrorHandler;
