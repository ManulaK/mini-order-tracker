import { type Response } from "express";

// Response shape for successful requests.
interface SuccessResponseBody<T = any> {
	success: true;
	statusCode: number;
	message: string;
	data?: T;
}

// Response shape for error responses.
// Used for validation failures, not found, server errors, etc.
interface ErrorResponseBody {
	success: false;
	statusCode: number;
	message: string;
	errors?: unknown;
}

/**
 * Centralized response helper for the backend API.
 *
 * Use this class in controllers to send consistent JSON responses.
 * Each method returns an Express Response object.
 */
export class ResponseHandler {
	// Prevent creating an instance of this class.
	// All methods are static helpers.
	private constructor() {}

	/**
	 * Send a successful 200 response.
	 *
	 * @param res - Express response object
	 * @param data - Payload to return to the client
	 * @param message - Optional success message
	 */
	static ok<T>(res: Response, data: T, message = "Success"): Response {
		return res.status(200).json({
			success: true,
			statusCode: 200,
			message,
			data,
		} as SuccessResponseBody<T>);
	}

	/**
	 * Send a successful 201 response for created resources.
	 */
	static created<T>(res: Response, data: T, message = "Created successfully"): Response {
		return res.status(201).json({
			success: true,
			statusCode: 201,
			message,
			data,
		} as SuccessResponseBody<T>);
	}

	/**
	 * Send a 400 bad request response.
	 */
	static badRequest(res: Response, message = "Bad request"): Response {
		return this.error(res, 400, message);
	}

	/**
	 * Send a 400 validation error response with details.
	 */
	static validationError(res: Response, errors: unknown, message = "Validation failed"): Response {
		return this.error(res, 400, message, errors);
	}

	/**
	 * Send a 404 not found response.
	 */
	static notFound(res: Response, message = "Not found"): Response {
		return this.error(res, 404, message);
	}

	/**
	 * Send a 500 internal server error response.
	 */
	static internalServerError(res: Response, message = "Internal server error"): Response {
		return this.error(res, 500, message);
	}

	/**
	 * Send a 401 unauthorized response.
	 */
	static unauthorized(res: Response, message = "Unauthorized"): Response {
		return this.error(res, 401, message);
	}

	/**
	 * Send a 403 forbidden response.
	 */
	static forbidden(res: Response, message = "Forbidden"): Response {
		return this.error(res, 403, message);
	}

	/**
	 * Generic error response builder.
	 *
	 * This method keeps all error responses consistent.
	 */
	private static error(res: Response, statusCode: number, message: string, errors?: unknown): Response {
		const body: ErrorResponseBody = {
			success: false,
			statusCode,
			message,
		};

		if (errors !== undefined) {
			body.errors = errors;
		}

		return res.status(statusCode).json(body);
	}
}
