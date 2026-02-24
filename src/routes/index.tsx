import { createFileRoute } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import { m } from "@/paraglide/messages";
import SectionAudioEngine from "./-section-audio-engine";
import SectionExpandiblePlatform from "./-section-expandible-platformt";
import SectionHero from "./-section-hero";
import SectionHumanization from "./-section-humanization";
import SectionObjective from "./-section-objective";
import SectionRecognition from "./-section-recognition";
import SectionRoadmap from "./-section-roadmap";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<main>
			<SectionHero />
			<Separator />
			<SectionObjective />
			<SectionExpandiblePlatform />
			<SectionHumanization />
			<SectionAudioEngine />
			<SectionRoadmap />
			<Separator />
			<SectionRecognition />

			<section id={m.waiting_list_id()}>WAITING</section>
		</main>
	);
}
