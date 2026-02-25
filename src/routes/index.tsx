import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Separator } from "@/components/ui/separator";

// KEEP: Direct import for the Hero to ensure it loads immediately
import SectionHero from "./-section-hero";

const SectionObjective = lazy(() => import("./-section-objective"));
const SectionExpandiblePlatform = lazy(
	() => import("./-section-expandible-platformt"),
);
const SectionHumanization = lazy(() => import("./-section-humanization"));
const SectionAudioEngine = lazy(() => import("./-section-audio-engine"));
const SectionRoadmap = lazy(() => import("./-section-roadmap"));
const SectionRecognition = lazy(() => import("./-section-recognition"));
const SectionWaitingList = lazy(() => import("./-section-waiting-list"));

export const Route = createFileRoute("/")({ component: App });

const SectionLoader = () => <div className="h-32 animate-pulse bg-muted/20" />;

function App() {
	return (
		<main>
			{/* Critical Path: No Suspense here so it's visible ASAP */}
			<SectionHero />

			<Separator />

			{/* Non-Critical: Wrapped in Suspense */}
			<Suspense fallback={<SectionLoader />}>
				<SectionObjective />
				<SectionExpandiblePlatform />
				<SectionHumanization />
				<SectionAudioEngine />
				<SectionRoadmap />
				<Separator />
				<SectionRecognition />
				<SectionWaitingList />
			</Suspense>
		</main>
	);
}
