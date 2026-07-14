import { type Order } from "../order.types.js";
import { items } from "./item.data.js";
import { orderStatuses } from "./order-status.data.js";

export const sampleOrders: Order[] = [
	{
		id: 1,
		customerName: "John",
		items: [items[0]!, items[1]!],
		total: items[0]!.mrp + items[1]!.mrp,
		status: orderStatuses[0]!,
	},
	{
		id: 2,
		customerName: "Sarah",
		items: [items[2]!],
		total: items[2]!.mrp,
		status: orderStatuses[1]!,
	},
	{
		id: 3,
		customerName: "David",
		items: [items[3]!],
		total: items[3]!.mrp,
		status: orderStatuses[2]!,
	},
];
