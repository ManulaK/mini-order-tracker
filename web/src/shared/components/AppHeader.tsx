export function AppHeader() {
	return (
		<header className="flex items-center justify-between border-b border-zinc-200 pb-5">
			<div className="flex items-center gap-3">
				<span className="grid h-10 w-10 place-items-center rounded-md bg-emerald-600 text-base font-semibold text-white">Z</span>
				<div>
					<p className="text-sm font-semibold text-zinc-950">Zincat</p>
					<p className="text-xs text-zinc-500">Order operations</p>
				</div>
			</div>
			<span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
				GET /orders
			</span>
		</header>
	);
}
