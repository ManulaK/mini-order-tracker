import { type Request, type Response } from "express";
import { getAllOrders, createOrder, advanceOrderStatus } from "./order.service.js";
import { items as catalogItems } from "./data/item.data.js";
import type { CreateOrderInput } from "./order.schema.js";
import { ResponseHandler } from "../../shared/response-handler.js";

const validItemIds = new Set(catalogItems.map((item) => item.id));

export const getOrders = async (_req: Request, res: Response) => {
	try {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		const orders = getAllOrders();
		return ResponseHandler.ok(res, orders);
	} catch (error) {
		return ResponseHandler.internalServerError(res);
	}
};

export const postOrder = (req: Request, res: Response) => {
	try {
		const validatedData = req.body as CreateOrderInput;

		const invalidItem = validatedData.items.find((item) => !validItemIds.has(item.id));
		if (invalidItem) {
			return ResponseHandler.badRequest(res, `Invalid item ID: ${invalidItem.id}`);
		}

		const order = createOrder(validatedData);
		return ResponseHandler.created(res, order);
	} catch (error) {
		return ResponseHandler.internalServerError(res);
	}
};

export const updateOrder = (req: Request, res: Response) => {
	try {
		const orderId = Number(req.params.id);

		const order = advanceOrderStatus(orderId);
		if (!order) {
			return ResponseHandler.notFound(res, "Order not found");
		}

		return ResponseHandler.ok(res, order);
	} catch (error) {
		return ResponseHandler.internalServerError(res);
	}
};
