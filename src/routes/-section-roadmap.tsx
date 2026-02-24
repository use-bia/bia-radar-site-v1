import { Link } from "@tanstack/react-router";
import { PackageIcon } from "lucide-react";
import { type FunctionComponent, useId } from "react";
import { parseFormattedText } from "@/-helper-tsx";
import PricePlaceholder from "@/assets/price-placeholder.svg?react";
import ActionButton from "@/components/ActionButton";
import {
	Roadmap,
	RoadmapContent,
	RoadmapDescription,
	RoadmapIndicator,
	RoadmapItem,
	RoadmapTitle,
} from "@/components/Roadmap";

import { m } from "@/paraglide/messages";

type SectionRoadmapProps = Record<string, never>;

const SectionRoadmap: FunctionComponent<SectionRoadmapProps> = () => {
	const headingId = useId();
	return (
		<section
			id={m.roadmap_id()}
			aria-labelledby={headingId}
			className="relative w-full py-12 flex bg-background overflow-hidden"
		>
			<div className="container mx-auto px-4 lg:px-8 flex flex-col sm:flex-row-reverse justify-between gap-4 lg:gap-8 xl:gap-12 w-full">
				{/* 2. Left Column */}
				<div className="flex flex-col items-center sm:items-end text-center sm:text-right w-full">
					<h2 id={headingId} className="flex flex-col">
						<span className="uppercase text-muted-foreground text-base font-normal">
							{m.heading_to_launch()}
							<span className="sr-only">:</span>
						</span>
						<span className="text-3xl sm:text-4xl xl:text-5xl font-bold">
							{m.roadmap_title()}
						</span>
					</h2>

					<div className="relative border border-primary pt-10 mt-8">
						<div>
							<div className="w-full h-auto py-12 px-10">
								<PricePlaceholder className="w-full h-auto" />
							</div>
							<div className="absolute top-0 right-0 bg-primary">
								<p className="text-lg text-primary-foreground font-bold px-4 py-1">
									{m.coming_soon()}
								</p>
							</div>
							<div className="bg-secondary flex border-t border-primary p-6 gap-4 items-center justify-between">
								<div>
									<p className="uppercase text-left text-muted-foreground">
										{m.roadmap_distributors()}
									</p>
									<p className="uppercase text-left text-3xl">
										{m.coming_soon()}
									</p>
								</div>
								<ActionButton icon={<PackageIcon />}>
									<Link
										to="/"
										hash={m.waiting_list_id()}
										aria-label={m.roadmap_become_a_distributor()}
									>
										{m.roadmap_become_a_distributor()}
									</Link>
								</ActionButton>
							</div>
						</div>
					</div>
					{/* I want the screen reader to only the alt text and not the content as it has some */}
					<Link to="/" hash={m.waiting_list_id()}>
						* {parseFormattedText(m.roadmap_price_note())}.
					</Link>
				</div>

				{/* 3. Right Column */}
				<div className="flex w-full">
					<Roadmap className="">
						<RoadmapItem isActive>
							<RoadmapIndicator />
							<RoadmapContent>
								<RoadmapTitle>Q1: Foundation</RoadmapTitle>
								<RoadmapDescription>
									Establish core architecture, finalize the database schema, and
									deploy the MVP.
								</RoadmapDescription>
							</RoadmapContent>
						</RoadmapItem>

						<RoadmapItem isActive>
							<RoadmapIndicator />
							<RoadmapContent>
								<RoadmapTitle>Q2: Expansion</RoadmapTitle>
								<RoadmapDescription>
									Roll out user authentication, integrate third-party APIs, and
									begin marketing.
								</RoadmapDescription>
							</RoadmapContent>
						</RoadmapItem>

						<RoadmapItem>
							<RoadmapIndicator />
							<RoadmapContent>
								<RoadmapTitle>Q3: Scale</RoadmapTitle>
								<RoadmapDescription>
									Optimize for enterprise clients and launch the mobile
									application.
								</RoadmapDescription>
								<button
									type="button"
									className="mt-4 text-sm text-primary underline text-left"
								>
									View Q3 specs
								</button>
							</RoadmapContent>
						</RoadmapItem>

						<RoadmapItem>
							<RoadmapIndicator />
							<RoadmapContent>
								<RoadmapTitle>Q4: Future</RoadmapTitle>
								<RoadmapDescription>
									Explore AI integration, expand to international markets, and
									host the first annual user conference.
								</RoadmapDescription>
							</RoadmapContent>
						</RoadmapItem>
					</Roadmap>
				</div>
			</div>
		</section>
	);
};

export default SectionRoadmap;
