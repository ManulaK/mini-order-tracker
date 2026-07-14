import type { OrderStatus } from "../order.types.js";

export const orderStatuses: OrderStatus[] = [
	{ id: 1, name: "pending", sequence: 1 },
	{ id: 2, name: "preparing", sequence: 2 },
	{ id: 3, name: "on_the_way", sequence: 3 },
	{ id: 4, name: "delivered", sequence: 4 },
];
