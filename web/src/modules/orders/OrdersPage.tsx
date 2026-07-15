import { useOrders } from "./hooks/useOrders";
import { OrdersHero } from "./components/OrdersHero";
import { OrdersTablePanel } from "./components/OrdersTablePanel";

export function OrdersPage() {
	const { advanceOrder, advancingOrderId, orders, isLoading, error } = useOrders();

	return (
		<div className="mx-auto grid min-w-0 w-full max-w-6xl flex-1 items-center gap-8 py-8 lg:grid-cols-[minmax(240px,0.42fr)_minmax(0,1fr)] lg:py-10">
			<OrdersHero />
			<OrdersTablePanel
				advancingOrderId={advancingOrderId}
				error={error}
				isLoading={isLoading}
				onAdvanceOrder={advanceOrder}
				orders={orders}
			/>
		</div>
	);
}
