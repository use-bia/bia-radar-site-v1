import { createFileRoute } from "@tanstack/react-router";
import { useId } from "react";
import GuidesNavigation from "./-guides-navigation";
import { createSlug, VIDEOS } from "./-guides-types";
import VideoGuideItem from "./-video-guide-item";

export const Route = createFileRoute("/guides/")({
	component: RouteComponent,
});

function RouteComponent() {
	const headingId = useId();

	return (
		<main
			className="relative w-full py-12 md:py-24 flex justify-center bg-background"
			aria-labelledby={headingId}
		>
			<div className="container relative mx-auto px-4 lg:px-8 flex flex-col gap-12 w-full">
				<header className="flex flex-col items-start border-l-4 border-primary pl-4 md:pl-8">
					<h1 id={headingId} className="flex flex-col">
						<span className="uppercase tracking-[0.2em] mb-2 text-sm md:text-base text-muted-foreground font-semibold">
							Guias em vídeo
						</span>
						<span className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase">
							Dominando Seu Dispositivo
						</span>
					</h1>
				</header>

				<div className="flex flex-col md:flex-row-reverse gap-12 lg:gap-16 items-start relative">
					{/* Render Navigation Component */}
					<GuidesNavigation sections={VIDEOS} />

					{/* Videos List Area - Adjusted width to md:w-2/3 lg:w-3/4 */}
					<div className="w-full md:w-2/3 lg:w-3/4 flex flex-col gap-16">
						{VIDEOS.map((section) => {
							const sectionId = createSlug(section.title);

							return (
								<section
									key={section.title}
									id={sectionId}
									tabIndex={-1}
									aria-labelledby={`heading-${sectionId}`}
									className="flex flex-col gap-8 scroll-mt-24 focus:outline-none"
								>
									<div className="sticky top-0 z-20 py-4 -mx-4 px-4 md:mx-0 md:px-0 bg-background/90 backdrop-blur-md border-b border-border/50">
										<h2
											id={`heading-${sectionId}`}
											className="text-2xl md:text-3xl font-bold tracking-tight"
										>
											{section.title}
										</h2>
									</div>

									<div className="flex flex-col gap-12 lg:gap-16 pt-4">
										{section.videos.map((video) => (
											<VideoGuideItem key={video.id} video={video} />
										))}
									</div>
								</section>
							);
						})}
					</div>
				</div>
			</div>
		</main>
	);
}
