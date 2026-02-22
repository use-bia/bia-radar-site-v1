import { createFileRoute } from "@tanstack/react-router";
import { m } from "@/paraglide/messages";
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
			<div className="bg-blue-600 h-200"></div>
			<section id={m.roadmap()}>
				<h2>Roadmap</h2>
				<h3>asdf</h3>
				<div>asdf</div>
			</section>
		</main>
	);
}
