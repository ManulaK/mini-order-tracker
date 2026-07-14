import { OrdersPage } from "./modules/orders";
import { AppHeader } from "./shared/components/AppHeader";

function App() {
	return (
		<main className="min-h-screen bg-stone-50 text-zinc-950">
			<section className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-6 py-5 sm:px-8 lg:px-12 xl:px-16">
				<AppHeader />
				<OrdersPage />
			</section>
		</main>
	);
}

export default App;
