import type { Order } from "../types/order.types";
import { getOrderStatusDetails } from "./order-status";

export const getOrderStatusOptions = (orders: Order[]) =>
	Array.from(new Set(orders.map((order) => order.status.name))).sort();

export const filterOrders = (orders: Order[], statusFilter: string, keyword: string) => {
	const normalizedKeyword = keyword.trim().toLowerCase();

	return orders.filter((order) => {
		const matchesStatus = statusFilter === "all" || order.status.name === statusFilter;
		const searchableText = [
				order.id,
				order.customerName,
				order.status.name,
				getOrderStatusDetails(order.status.name).label,
				...order.items.map((item) => item.name),
			]
			.join(" ")
			.toLowerCase();

		return matchesStatus && (!normalizedKeyword || searchableText.includes(normalizedKeyword));
	});
};
