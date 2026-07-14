import { httpClient } from "../../../shared/api";
import type { ApiResponse, Order } from "../types/order.types";

const isApiResponse = <T>(payload: ApiResponse<T> | T): payload is ApiResponse<T> =>
	typeof payload === "object" && payload !== null && "success" in payload && "statusCode" in payload;

export const fetchOrders = async (signal?: AbortSignal): Promise<Order[]> => {
	
	const response = await httpClient.get<ApiResponse<Order[]> | Order[]>("/orders", { signal });
	const payload = response.data;
	const orders = isApiResponse(payload) ? payload.data : payload;

	if (!Array.isArray(orders)) {
		throw new Error("Orders response did not include a data array");
	}

	return orders;
};

export const advanceOrderStatus = async (orderId: number): Promise<Order> => {
	const response = await httpClient.put<ApiResponse<Order> | Order>(`/orders/${orderId}`);
	const payload = response.data;
	const order = isApiResponse(payload) ? payload.data : payload;

	if (!order) {
		throw new Error("Advance status response did not include an order");
	}

	return order;
};
