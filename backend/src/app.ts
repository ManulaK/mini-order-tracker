import cors from "cors";
import express, { type Request, type Response } from "express";
import orderRoutes from "./modules/orders/order.routes.js";
import { ResponseHandler } from "./shared/response-handler.js";

export const app = express();

app.use(
	cors({
		methods: ["GET", "PUT", "POST", "OPTIONS"],
		origin: "*",
	}),
);

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
	ResponseHandler.ok(res, { version: "1.0.0" }, "Server is running");
});

app.use("/orders", orderRoutes);
