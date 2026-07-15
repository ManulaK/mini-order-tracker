import { useEffect, useState } from "react";
import { advanceOrderStatus, fetchOrders } from "../api/orders.api";
import type { Order } from "../types/order.types";

export const useOrders = () => {
	const [orders, setOrders] = useState<Order[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [advancingOrderId, setAdvancingOrderId] = useState<number | null>(null);
	const [error, setError] = useState("");

	useEffect(() => {
		const loadOrders = async () => {
			try {
				setIsLoading(true);
				setError("");
				setOrders(await fetchOrders());
			} catch (requestError) {
				setError(requestError instanceof Error ? requestError.message : "Unable to load orders");
			} finally {
				setIsLoading(false);
			}
		};

		void loadOrders();
	}, []);

	const advanceOrder = async (orderId: number) => {
		try {
			setError("");
			setAdvancingOrderId(orderId);

			await advanceOrderStatus(orderId);
			setOrders(await fetchOrders());
		} catch (requestError) {
			setError(requestError instanceof Error ? requestError.message : "Unable to advance order status");
		} finally {
			setAdvancingOrderId(null);
		}
	};

	return { advanceOrder, advancingOrderId, orders, isLoading, error };
};
