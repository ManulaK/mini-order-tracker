import cors from "cors";
import express, { type Request, type Response } from "express";
import orderRoutes from "./modules/orders/order.routes.js";
import { ResponseHandler } from "./shared/response-handler.js";

export const app = express();

const API_PREFIX = "/api/v1";

app.use(
	cors({
		methods: ["GET", "POST", "PATCH", "OPTIONS"],
		origin: "*",
	}),
);

app.use(express.json());

app.get(`${API_PREFIX}/`, (_req: Request, res: Response) => {
	return ResponseHandler.ok(res, { version: "1.0.0" }, "Server is running");
});

app.use(`${API_PREFIX}/orders`, orderRoutes);
