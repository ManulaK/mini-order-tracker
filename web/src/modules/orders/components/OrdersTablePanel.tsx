import { useMemo, useState } from "react";
import { CircleCheck } from "lucide-react";
import { DropdownMenu, type DropdownOption } from "../../../shared/components/DropdownMenu";
import type { Order } from "../types/order.types";
import { filterOrders, getOrderStatusOptions } from "../utils/order-filters";
import { formatCurrency } from "../utils/order-formatters";
import { getOrderStatusDetails } from "../utils/order-status";
import { OrderStatusBadge } from "./OrderStatusBadge";

interface OrdersTablePanelProps {
	advancingOrderId: number | null;
	error: string;
	isLoading: boolean;
	onAdvanceOrder: (orderId: number) => void;
	orders: Order[];
}

interface OrderActionButtonProps {
	isAdvancing: boolean;
	onAdvanceOrder: () => void;
	order: Order;
}

function OrderActionButton({ isAdvancing, onAdvanceOrder, order }: OrderActionButtonProps) {
	const statusDetails = getOrderStatusDetails(order.status.name);

	return (
		<button
			aria-label={`${statusDetails.actionLabel} for order #${order.id}`}
			className="group inline-flex h-8 min-w-36 items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-3 text-xs font-semibold text-zinc-900 transition hover:border-zinc-500 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:border-zinc-200 disabled:bg-zinc-50 disabled:text-zinc-400"
			disabled={statusDetails.isComplete || isAdvancing}
			onClick={onAdvanceOrder}
			type="button"
		>
			<CircleCheck className="h-3.5 w-3.5 text-emerald-600 group-disabled:text-zinc-400" aria-hidden="true" strokeWidth={2.2} />
			{isAdvancing ? statusDetails.loadingActionLabel : statusDetails.actionLabel}
		</button>
	);
}

export function OrdersTablePanel({ advancingOrderId, error, isLoading, onAdvanceOrder, orders }: OrdersTablePanelProps) {
	const [statusFilter, setStatusFilter] = useState("all");
	const [keyword, setKeyword] = useState("");

	const statusOptions = useMemo(() => getOrderStatusOptions(orders), [orders]);
	const filteredOrders = useMemo(() => filterOrders(orders, statusFilter, keyword), [keyword, orders, statusFilter]);
	const statusFilterOptions: DropdownOption[] = [
		{ label: "All statuses", value: "all" },
		...statusOptions.map((status) => ({
			label: getOrderStatusDetails(status).label,
			value: status,
		})),
	];

	return (
		<section id="orders" className="min-w-0 rounded-lg border border-zinc-200 bg-white shadow-soft">
			<div className="flex flex-col gap-3 border-b border-zinc-200 p-3 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h2 className="text-lg font-semibold text-zinc-950">Orders</h2>
					<p className="mt-1 text-sm text-zinc-500">Track customer orders and update each delivery step.</p>
				</div>
				<span className="w-fit rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">{filteredOrders.length} shown</span>
			</div>

			<div className="flex flex-col gap-3 border-b border-zinc-200 p-3 lg:flex-row lg:items-center">
				<div className="grid flex-1 gap-3 sm:grid-cols-[minmax(0,1fr)_180px]">
					<label className="sr-only" htmlFor="keyword-search">
						Keyword search
					</label>
					<input
						className="h-10 rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
						id="keyword-search"
						onChange={(event) => setKeyword(event.target.value)}
						placeholder="Search orders, customers, items"
						type="search"
						value={keyword}
					/>

					<DropdownMenu label="Status filter" onChange={setStatusFilter} options={statusFilterOptions} value={statusFilter} />
				</div>
				<button
					className="inline-flex h-10 w-full items-center justify-center rounded-md bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 sm:w-auto"
					type="button"
				>
					+ Add New Order
				</button>
			</div>

			<div className="w-full max-w-full overflow-x-auto overscroll-x-contain pb-2 [-webkit-overflow-scrolling:touch]">
				<table className="w-full min-w-[640px] border-collapse text-left text-sm">
					<thead className="bg-zinc-50 text-xs font-semibold uppercase text-zinc-500">
						<tr>
							<th className="px-3 py-2 text-center">Order</th>
							<th className="px-3 py-2 text-center">Customer</th>
							<th className="px-3 py-2 text-center">Items</th>
							<th className="px-3 py-2 text-center">Status</th>
							<th className="px-3 py-2 text-center">Total (LKR)</th>
							<th className="px-3 py-2 text-center">Next step</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-zinc-100">
						{isLoading ? (
							<tr>
								<td className="px-3 py-7 text-center text-zinc-500" colSpan={6}>
									Loading orders...
								</td>
							</tr>
						) : error ? (
							<tr>
								<td className="px-3 py-7 text-center text-red-600" colSpan={6}>
									{error}
								</td>
							</tr>
						) : filteredOrders.length === 0 ? (
							<tr>
								<td className="px-3 py-7 text-center text-zinc-500" colSpan={6}>
									No orders match the current filters.
								</td>
							</tr>
						) : (
							filteredOrders.map((order) => {
								const isAdvancing = advancingOrderId === order.id;

								return (
									<tr className="transition hover:bg-zinc-50" key={order.id}>
										<td className="px-3 py-2 text-center font-semibold text-zinc-950">#{order.id}</td>
										<td className="px-3 py-2 text-center text-zinc-700">{order.customerName}</td>
										<td className="px-3 py-2 text-center text-zinc-600">
											{order.items.length} {order.items.length === 1 ? "item" : "items"}
										</td>
										<td className="px-3 py-2 text-center">
											<OrderStatusBadge status={order.status.name} />
										</td>
										<td className="px-3 py-2 text-center font-semibold text-zinc-950">{formatCurrency(order.total)}</td>
										<td className="px-3 py-2 text-center">
											<OrderActionButton isAdvancing={isAdvancing} onAdvanceOrder={() => onAdvanceOrder(order.id)} order={order} />
										</td>
									</tr>
								);
							})
						)}
					</tbody>
				</table>
			</div>
		</section>
	);
}
