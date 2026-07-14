const orderStats = [
	{ label: "Active orders", value: "128" },
	{ label: "Ready items", value: "42" },
	{ label: "Open routes", value: "16" },
];

function App() {
	return (
		<main className="min-h-screen bg-stone-50 text-zinc-950">
			<section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-6 sm:px-8 lg:px-10">
				<header className="flex items-center justify-between border-b border-zinc-200 pb-5">
					<div className="flex items-center gap-3">
						<span className="grid h-10 w-10 place-items-center rounded-md bg-emerald-600 text-base font-semibold text-white">Z</span>
						<div>
							<p className="text-sm font-semibold text-zinc-950">Zincat</p>
							<p className="text-xs text-zinc-500">Order operations</p>
						</div>
					</div>
					<a
						className="hidden rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 sm:inline-flex"
						href="mailto:hello@zincat.local"
					>
						Contact
					</a>
				</header>

				<div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1fr_0.92fr] lg:py-16">
					<div className="max-w-2xl">
						<p className="text-sm font-semibold uppercase text-emerald-700">Operations workspace</p>
						<h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight text-zinc-950 sm:text-5xl lg:text-6xl">
							Track every order from request to ready.
						</h1>
						<p className="mt-5 max-w-xl text-base leading-7 text-zinc-600">
							Zincat keeps order status, item details, and service responses in a clear single-page view for fast daily checks.
						</p>

						<div className="mt-8 flex flex-col gap-3 sm:flex-row">
							<a
								className="inline-flex justify-center rounded-md bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
								href="#orders"
							>
								View Orders
							</a>
							<a
								className="inline-flex justify-center rounded-md border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:border-zinc-500 hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
								href="#flow"
							>
								Check Flow
							</a>
						</div>

						<div id="orders" className="mt-10 grid gap-3 sm:grid-cols-3" aria-label="Order summary">
							{orderStats.map((stat) => (
								<article className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm" key={stat.label}>
									<p className="text-3xl font-semibold text-zinc-950">{stat.value}</p>
									<p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
								</article>
							))}
						</div>
					</div>

					<aside id="flow" className="rounded-lg border border-zinc-200 bg-white p-5 shadow-soft" aria-label="Order flow">
						<div className="flex items-center justify-between gap-4">
							<div>
								<h2 className="text-lg font-semibold text-zinc-950">Today's Flow</h2>
								<p className="mt-1 text-sm text-zinc-500">Updated just now</p>
							</div>
							<span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Live</span>
						</div>

						<div className="mt-8 space-y-5">
							{[
								["Placed", "Orders received from sales channels", "bg-cyan-500"],
								["Packed", "Items verified and prepared", "bg-amber-500"],
								["Ready", "Completed orders waiting for pickup", "bg-emerald-600"],
							].map(([title, description, color]) => (
								<div className="flex gap-4" key={title}>
									<span className={`mt-1 h-3 w-3 shrink-0 rounded-full ${color}`} aria-hidden="true" />
									<div>
										<h3 className="text-sm font-semibold text-zinc-950">{title}</h3>
										<p className="mt-1 text-sm leading-6 text-zinc-500">{description}</p>
									</div>
								</div>
							))}
						</div>

						<div className="mt-8 rounded-md bg-zinc-950 p-4 font-mono text-sm leading-6 text-zinc-100">
							<p>GET /api/orders</p>
							<p className="text-emerald-300">200 synced</p>
						</div>
					</aside>
				</div>
			</section>
		</main>
	);
}

export default App;
