import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
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

const SectionLoader = () => (
	<div className="w-full flex py-16 md:py-24 justify-center bg-background">
		<div className="container mx-auto px-4 lg:px-8 flex flex-col gap-8 items-center md:items-start">
			<div className="flex flex-col w-full gap-2 items-center md:items-start text-center md:text-left">
				<Skeleton className="h-4 w-32" />
				<Skeleton className="h-10 w-3/4 max-w-md" />
			</div>
			<Skeleton className="h-16 w-full max-w-2xl" />
			<div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
				<Skeleton className="h-64 w-full rounded-xl" />
				<Skeleton className="h-64 w-full rounded-xl" />
				<Skeleton className="h-64 w-full rounded-xl" />
			</div>
		</div>
	</div>
);

function App() {
	return (
		<main>
			{/* Critical Path: Loaded immediately */}
			<SectionHero />

			{/* Non-Critical: Individual Suspense boundaries */}
			<Suspense fallback={<SectionLoader />}>
				<SectionObjective />
			</Suspense>

			<Suspense fallback={<SectionLoader />}>
				<SectionExpandiblePlatform />
			</Suspense>

			<Suspense fallback={<SectionLoader />}>
				<SectionHumanization />
			</Suspense>

			<Suspense fallback={<SectionLoader />}>
				<SectionAudioEngine />
			</Suspense>

			{/* <Suspense fallback={<SectionLoader />}>
				<SectionRoadmap />
			</Suspense> */}

			<Suspense fallback={<SectionLoader />}>
				<SectionRecognition />
			</Suspense>

			<Separator />

			<Suspense fallback={<SectionLoader />}>
				<SectionWaitingList />
			</Suspense>
		</main>
	);
}
