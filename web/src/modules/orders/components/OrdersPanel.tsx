import type { Order } from "../types/order.types";
import { OrderFilters } from "./OrderFilters";
import { OrdersTable } from "./OrdersTable";

interface OrdersPanelProps {
	advancingOrderId: number | null;
	error: string;
	filteredOrders: Order[];
	isLoading: boolean;
	keyword: string;
	onAdvanceOrder: (orderId: number) => void;
	onKeywordChange: (value: string) => void;
	onStatusFilterChange: (value: string) => void;
	statusFilter: string;
	statusOptions: string[];
}

export function OrdersPanel({
	advancingOrderId,
	error,
	filteredOrders,
	isLoading,
	keyword,
	onAdvanceOrder,
	onKeywordChange,
	onStatusFilterChange,
	statusFilter,
	statusOptions,
}: OrdersPanelProps) {
	return (
		<section id="orders" className="min-w-0 rounded-lg border border-zinc-200 bg-white shadow-soft">
			<div className="flex flex-col gap-3 border-b border-zinc-200 p-3 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h2 className="text-lg font-semibold text-zinc-950">Orders</h2>
					<p className="mt-1 text-sm text-zinc-500">Loaded from localhost:3000</p>
				</div>
				<span className="w-fit rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">{filteredOrders.length} shown</span>
			</div>

			<div className="flex flex-col gap-3 border-b border-zinc-200 p-3 lg:flex-row lg:items-center">
				<OrderFilters
					keyword={keyword}
					onKeywordChange={onKeywordChange}
					onStatusFilterChange={onStatusFilterChange}
					statusFilter={statusFilter}
					statusOptions={statusOptions}
				/>
				<button
					className="inline-flex h-10 w-full items-center justify-center rounded-md bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 sm:w-auto"
					type="button"
				>
					+ Add New Order
				</button>
			</div>

			<OrdersTable
				advancingOrderId={advancingOrderId}
				error={error}
				isLoading={isLoading}
				onAdvanceOrder={onAdvanceOrder}
				orders={filteredOrders}
			/>
		</section>
	);
}
