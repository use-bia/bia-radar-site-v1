import { createFileRoute } from "@tanstack/react-router";
import LottusBg from "@/assets/lottus.webp";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<main>
			<section
				className="relative w-full min-h-[500px] bg-cover bg-center bg-no-repeat flex items-center justify-center"
				style={{ backgroundImage: `url(${LottusBg})` }}
			>
				Main
				<h1>Welcome to the BIA Radar</h1>
			</section>
			<section>
				<h2>About</h2>
				<h3>asdf</h3>
				<div>asdf</div>
			</section>
			<section>
				<h2>About</h2>
				<h3>asdf</h3>
				<div>asdf</div>
			</section>
		</main>
	);
}
