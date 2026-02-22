import { createFileRoute } from "@tanstack/react-router";
import { m } from "@/paraglide/messages";
import SectionExpandiblePlatform from "./-section-expandible-platformt";
import SectionHero from "./-section-hero";
import SectionObjective from "./-section-objective";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<main>
			<SectionHero />
			<SectionObjective />
			<SectionExpandiblePlatform />

			<section id={m.roadmap_id()}>
				<h2>Roadmap</h2>
				<h3>asdf</h3>
				<div>asdf</div>
			</section>
			<section id={m.waiting_list_id()}>WAITING</section>
		</main>
	);
}
