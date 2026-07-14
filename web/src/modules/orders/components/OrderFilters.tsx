import { DropdownMenu, type DropdownOption } from "../../../shared/components/DropdownMenu";
import { getOrderStatusDetails } from "../utils/order-status";

interface OrderFiltersProps {
	keyword: string;
	onKeywordChange: (value: string) => void;
	onStatusFilterChange: (value: string) => void;
	statusFilter: string;
	statusOptions: string[];
}

export function OrderFilters({
	keyword,
	onKeywordChange,
	onStatusFilterChange,
	statusFilter,
	statusOptions,
}: OrderFiltersProps) {
	const statusFilterOptions: DropdownOption[] = [
		{ label: "All statuses", value: "all" },
		...statusOptions.map((status) => ({
			label: getOrderStatusDetails(status).label,
			value: status,
		})),
	];

	return (
		<div className="grid flex-1 gap-3 sm:grid-cols-[minmax(0,1fr)_180px]">
			<label className="sr-only" htmlFor="keyword-search">
				Keyword search
			</label>
			<input
				className="h-10 rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
				id="keyword-search"
				onChange={(event) => onKeywordChange(event.target.value)}
				placeholder="Search orders, customers, items"
				type="search"
				value={keyword}
			/>

			<DropdownMenu label="Status filter" onChange={onStatusFilterChange} options={statusFilterOptions} value={statusFilter} />
		</div>
	);
}
