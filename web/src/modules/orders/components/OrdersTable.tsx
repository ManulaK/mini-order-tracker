import { CircleCheck } from "lucide-react";
import type { Order } from "../types/order.types";
import { formatCurrency } from "../utils/order-formatters";
import { getOrderStatusDetails } from "../utils/order-status";
import { OrderStatusBadge } from "./OrderStatusBadge";

interface OrdersTableProps {
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

export function OrdersTable({ advancingOrderId, error, isLoading, onAdvanceOrder, orders }: OrdersTableProps) {
	return (
		<div className="w-full max-w-full overflow-x-auto overscroll-x-contain pb-2 [-webkit-overflow-scrolling:touch]">
			<table className="w-full min-w-[640px] border-collapse text-left text-sm">
				<thead className="bg-zinc-50 text-xs font-semibold uppercase text-zinc-500">
					<tr>
						<th className="px-3 py-2">Order</th>
						<th className="px-3 py-2">Customer</th>
						<th className="px-3 py-2">Items</th>
						<th className="px-3 py-2">Status</th>
						<th className="px-3 py-2 text-right">Total (LKR)</th>
						<th className="px-3 py-2 text-right">Next step</th>
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
					) : orders.length === 0 ? (
						<tr>
							<td className="px-3 py-7 text-center text-zinc-500" colSpan={6}>
								No orders match the current filters.
							</td>
						</tr>
					) : (
						orders.map((order) => {
							const isAdvancing = advancingOrderId === order.id;

							return (
								<tr className="transition hover:bg-zinc-50" key={order.id}>
									<td className="px-3 py-2 font-semibold text-zinc-950">#{order.id}</td>
									<td className="px-3 py-2 text-zinc-700">{order.customerName}</td>
									<td className="px-3 py-2 text-zinc-600">
										{order.items.length} {order.items.length === 1 ? "item" : "items"}
									</td>
									<td className="px-3 py-2">
										<OrderStatusBadge status={order.status.name} />
									</td>
									<td className="px-3 py-2 text-right font-semibold text-zinc-950">{formatCurrency(order.total)}</td>
									<td className="px-3 py-2 text-right">
										<OrderActionButton isAdvancing={isAdvancing} onAdvanceOrder={() => onAdvanceOrder(order.id)} order={order} />
									</td>
								</tr>
							);
						})
					)}
				</tbody>
			</table>
		</div>
	);
}
