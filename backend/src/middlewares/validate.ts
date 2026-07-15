import { type Request, type Response, type NextFunction } from "express";
import { ZodError, type ZodObject } from "zod";
import { ResponseHandler } from "../shared/response-handler.js";

export const validate = (schema: ZodObject<any>) => (req: Request, res: Response, next: NextFunction) => {
	try {
		const validatedData = schema.parse({
			params: req.params,
			query: req.query,
			body: req.body,
		});

		if (validatedData.body) req.body = validatedData.body;

		next();
	} catch (error) {
		if (error instanceof ZodError) {
			return ResponseHandler.badRequest(res, "Validation failed", formatZodErrors(error));
		}
		next(error);
	}
};

const formatZodErrors = (error: ZodError) =>
	error.issues.map((issue) => ({
		field: issue.path.join(".") || "request",
		message: issue.message,
	}));
