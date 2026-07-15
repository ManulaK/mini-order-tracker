import { ArrowRight, CircleCheck, Clock3, CookingPot, Truck, type LucideIcon } from "lucide-react";

interface OrderStatusDetails {
	actionLabel: string;
	badgeIcon: LucideIcon;
	badgeClassName: string;
	isComplete: boolean;
	label: string;
	loadingActionLabel: string;
}

const defaultStatusDetails: OrderStatusDetails = {
	actionLabel: "Advance status",
	badgeIcon: ArrowRight,
	badgeClassName: "bg-zinc-100 text-zinc-700 ring-zinc-200",
	isComplete: false,
	label: "Unknown",
	loadingActionLabel: "Saving",
};

const statusDetails: Record<string, OrderStatusDetails> = {
	pending: {
		actionLabel: "Start preparing",
		badgeIcon: Clock3,
		badgeClassName: "bg-amber-50 text-amber-700 ring-amber-200",
		isComplete: false,
		label: "Pending",
		loadingActionLabel: "Starting",
	},
	preparing: {
		actionLabel: "Dispatch order",
		badgeIcon: CookingPot,
		badgeClassName: "bg-violet-50 text-violet-700 ring-violet-200",
		isComplete: false,
		label: "Preparing",
		loadingActionLabel: "Dispatching",
	},
	on_the_way: {
		actionLabel: "Mark delivered",
		badgeIcon: Truck,
		badgeClassName: "bg-cyan-50 text-cyan-700 ring-cyan-200",
		isComplete: false,
		label: "On The Way",
		loadingActionLabel: "Delivering",
	},
	delivered: {
		actionLabel: "Completed",
		badgeIcon: CircleCheck,
		badgeClassName: "bg-emerald-50 text-emerald-700 ring-emerald-200",
		isComplete: true,
		label: "Delivered",
		loadingActionLabel: "Completed",
	},
};

export const getOrderStatusDetails = (status: string) => statusDetails[status] ?? defaultStatusDetails;
