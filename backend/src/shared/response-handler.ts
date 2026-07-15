import { type Response } from "express";

interface SuccessResponseBody<T = any> {
	success: true;
	statusCode: number;
	message: string;
	data?: T;
}

interface ErrorResponseBody {
	success: false;
	statusCode: number;
	message: string;
	errors?: unknown;
}

export class ResponseHandler {
	private constructor() {}

	static ok<T>(res: Response, data: T, message = "Success"): Response {
		return res.status(200).json({
			success: true,
			statusCode: 200,
			message,
			data,
		} as SuccessResponseBody<T>);
	}

	static created<T>(res: Response, data: T, message = "Created successfully"): Response {
		return res.status(201).json({
			success: true,
			statusCode: 201,
			message,
			data,
		} as SuccessResponseBody<T>);
	}

	static badRequest(res: Response, message = "Bad request", errors?: unknown): Response {
		return this.error(res, 400, message, errors);
	}

	static notFound(res: Response, message = "Not found"): Response {
		return this.error(res, 404, message);
	}

	static internalServerError(res: Response, message = "Internal server error"): Response {
		return this.error(res, 500, message);
	}

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
