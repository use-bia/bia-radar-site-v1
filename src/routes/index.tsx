import { createFileRoute } from "@tanstack/react-router";
import SectionHero from "./-section-hero";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<main>
			<SectionHero />
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
