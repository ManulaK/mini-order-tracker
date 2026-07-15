export interface OrderItem {
	id: number;
	name: string;
	mrp: number;
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

export interface ApiResponse<T> {
	success: boolean;
	statusCode: number;
	message: string;
	data?: T;
}
