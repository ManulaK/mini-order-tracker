export interface OrderItem {
	id: number;
	name: string;
	mrp: number;
}

export interface CreateOrderItemInput {
	id: number;
}

export interface OrderStatus {
	id: number;
	name: string;
	sequence: number;
}

export interface Order {
	id: number;
	customerName: string;
	items: OrderItem[];
	total: number;
	status: OrderStatus;
}

export interface CreateOrderInput {
	customerName: string;
	items: CreateOrderItemInput[];
	total: number;
}
