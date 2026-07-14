import { useEffect, useState } from "react";
import { isHttpRequestCanceled } from "../../../shared/api";
import { advanceOrderStatus, fetchOrders } from "../api/orders.api";
import type { Order } from "../types/order.types";

export const useOrders = () => {
	const [orders, setOrders] = useState<Order[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [advancingOrderId, setAdvancingOrderId] = useState<number | null>(null);
	const [error, setError] = useState("");

	useEffect(() => {
		const controller = new AbortController();

		const loadOrders = async () => {
			try {
				setIsLoading(true);
				setError("");
				setOrders(await fetchOrders(controller.signal));
			} catch (requestError) {
				// Ignore aborts from cleanup; they are not real user-facing errors.
				if (isHttpRequestCanceled(requestError)) {
					return;
				}

				setError(requestError instanceof Error ? requestError.message : "Unable to load orders");
			} finally {
				if (!controller.signal.aborted) {
					setIsLoading(false);
				}
			}
		};

		void loadOrders();

		return () => controller.abort();
	}, []);

	const advanceOrder = async (orderId: number) => {
		try {
			setError("");
			setAdvancingOrderId(orderId);

			const updatedOrder = await advanceOrderStatus(orderId);
			setOrders((currentOrders) => currentOrders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order)));
		} catch (requestError) {
			setError(requestError instanceof Error ? requestError.message : "Unable to advance order status");
		} finally {
			setAdvancingOrderId(null);
		}
	};

	return { advanceOrder, advancingOrderId, orders, isLoading, error };
};
