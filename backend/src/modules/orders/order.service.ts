import { sampleOrders } from "./data/order.data.js";
import { orderStatuses } from "./data/order-status.data.js";
import { items } from "./data/item.data.js";
import type { CreateOrderInput, Order } from "./order.types.js";

const orders: Order[] = [...sampleOrders];

export const getAllOrders = (): Order[] => {
	return orders;
};

export const createOrder = (data: CreateOrderInput): Order => {
	const newOrder: Order = {
		id: orders.length + 1,
		customerName: data.customerName,
		items: data.items.map((item) => {
			const itemDetail = items.find((i) => i.id === item.id)!;
			return {
				id: item.id,
				name: itemDetail.name,
				mrp: itemDetail.mrp,
			};
		}),
		total:
			data.total ||
			data.items.reduce((acc, item) => {
				const itemDetail = items.find((i) => i.id === item.id)!;
				return acc + itemDetail.mrp;
			}, 0),
		status: orderStatuses[0]!,
	};

	orders.push(newOrder);

	return newOrder;
};

export const advanceOrderStatus = (orderId: number): Order | null => {
	const order = orders.find((o) => o.id === orderId);
	if (!order) return null;

	const nextStatus = orderStatuses
		.filter((status) => status.sequence > order.status.sequence)
		.sort((a, b) => a.sequence - b.sequence)[0];

	if (nextStatus) {
		order.status = nextStatus;
	}

	return order;
};
