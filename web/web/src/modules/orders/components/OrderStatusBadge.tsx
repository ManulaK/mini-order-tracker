import { getOrderStatusDetails } from "../utils/order-status";

interface OrderStatusBadgeProps {
	status: string;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
	const statusDetails = getOrderStatusDetails(status);
	const BadgeIcon = statusDetails.badgeIcon;

	return (
		<span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusDetails.badgeClassName}`}>
			<BadgeIcon className="h-3 w-3" aria-hidden="true" strokeWidth={2.2} />
			{statusDetails.label}
		</span>
	);
}
