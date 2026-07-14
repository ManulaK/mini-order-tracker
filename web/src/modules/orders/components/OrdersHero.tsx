
export function OrdersHero() {
	return (
		<div className="max-w-md">
			<p className="text-sm font-semibold uppercase text-emerald-700">Operations workspace</p>
			<h1 className="mt-3 text-xl font-semibold leading-tight text-zinc-950 sm:text-2xl lg:text-4xl">Track every order from request to ready.</h1>
			<p className="mt-4 text-sm leading-6 text-zinc-600 sm:text-base">
				Zincat keeps order status, item details, and service responses in a clear single-page view for fast daily checks.
			</p>

			<div className="mt-6 flex flex-col gap-3 sm:flex-row">
				<a
					className="inline-flex justify-center rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
					href="#orders"
				>
					View Orders
				</a>
				<a
					className="inline-flex justify-center rounded-md border border-zinc-300 px-4 py-2.5 text-sm font-semibold text-zinc-900 transition hover:border-zinc-500 hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
					href="#keyword-search"
				>
					Search Orders
				</a>
			</div>
		</div>
	);
}
