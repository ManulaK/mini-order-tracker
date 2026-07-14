import { useMemo, useState } from "react";
import { useOrders } from "./hooks/useOrders";
import { OrdersHero } from "./components/OrdersHero";
import { OrdersPanel } from "./components/OrdersPanel";
import { filterOrders, getOrderStatusOptions } from "./utils/order-filters";

export function OrdersPage() {
	const { advanceOrder, advancingOrderId, orders, isLoading, error } = useOrders();
	const [statusFilter, setStatusFilter] = useState("all");
	const [keyword, setKeyword] = useState("");

	const statusOptions = useMemo(() => getOrderStatusOptions(orders), [orders]);
	const filteredOrders = useMemo(() => filterOrders(orders, statusFilter, keyword), [keyword, orders, statusFilter]);

	return (
		<div className="mx-auto grid min-w-0 w-full max-w-6xl flex-1 items-center gap-8 py-8 lg:grid-cols-[minmax(240px,0.42fr)_minmax(0,1fr)] lg:py-10">
			<OrdersHero />
			<OrdersPanel
				advancingOrderId={advancingOrderId}
				error={error}
				filteredOrders={filteredOrders}
				isLoading={isLoading}
				keyword={keyword}
				onAdvanceOrder={advanceOrder}
				onKeywordChange={setKeyword}
				onStatusFilterChange={setStatusFilter}
				statusFilter={statusFilter}
				statusOptions={statusOptions}
			/>
		</div>
	);
}
