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
			// REMOVED 'overflow-hidden' to allow sticky positioning to work.
			// If you have horizontal overflow issues, use 'overflow-x-clip' instead.
			className="relative w-full py-16 md:py-24 xl:py-32 flex bg-background"
		>
			<div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row-reverse justify-between gap-12 lg:gap-24 w-full">
				{/* Right Column: Title & Price */}
				{/* ADDED: md:sticky md:top-32 self-start */}
				<div className="flex flex-col items-center md:items-end text-center md:text-right w-full md:w-2/5 lg:w-1/2 md:sticky md:top-32 self-start">
					<h2 id={headingId} className="flex flex-col">
						<span className="uppercase text-muted-foreground text-base font-normal mb-2">
							{m.heading_to_launch()}
							<span className="sr-only">:</span>
						</span>
						<span className="text-3xl sm:text-4xl xl:text-5xl font-bold">
							{m.roadmap_title()}
						</span>
					</h2>

					<div className="relative border bg-card pt-10 mt-8 lg:mt-12 w-full flex flex-col overflow-hidden shadow-md">
						<div className="w-full h-auto py-12 px-6 lg:px-10 flex justify-center">
							<PricePlaceholder
								className="w-full max-w-full h-auto text-foreground"
								aria-label={m.roadmap_price_alt()}
							/>
						</div>

						{/* ROUNDED BOTTOM LEFT CORNER OF RIBBON */}
						<div
							className="absolute top-0 right-0 bg-primary rounded-bl-xl"
							aria-hidden="true"
						>
							<p className="text-sm md:text-base text-primary-foreground font-bold px-4 py-2">
								{m.coming_soon()}
							</p>
						</div>

						{/* SOFTENED BOTTOM AREA */}
						<div className="bg-muted/40 flex border-t border-primary/20 p-6 sm:px-8 md:px-6 lg:px-8 sm:py-8 gap-6 items-center justify-between flex-col xl:flex-row">
							<div className="flex flex-col gap-1 items-center xl:items-start text-center xl:text-left">
								<p className="uppercase text-xs sm:text-sm font-semibold tracking-wide text-muted-foreground">
									{m.roadmap_distributors()}
								</p>
								<p className="uppercase text-lg font-bold">{m.coming_soon()}</p>
							</div>
							<div className="w-full xl:w-auto flex justify-center shrink-0">
								<ActionButton
									icon={<PackageIcon />}
									className="w-full xl:w-auto"
									asChild
									onClick={() => {
										document
											.getElementById(m.waiting_list_id())
											?.scrollIntoView({ behavior: "smooth" });
									}}
								>
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

					<p className="mt-6 w-full text-xs sm:text-sm text-muted-foreground text-center md:text-right px-2 md:px-0">
						<Link
							to="/"
							hash={m.waiting_list_id()}
							className="hover:underline hover:text-primary transition-colors leading-relaxed block"
							onClick={() => {
								document
									.getElementById(m.waiting_list_id())
									?.scrollIntoView({ behavior: "smooth" });
							}}
						>
							* {parseFormattedText(m.roadmap_price_note())}.
						</Link>
					</p>
				</div>

				{/* Left Column: Roadmap */}
				{/* (No changes needed here) */}
				<div className="flex w-full md:w-3/5 lg:w-1/2 mt-4 md:mt-2">
					<Roadmap className="w-full">
						<RoadmapItem isActive>
							<RoadmapIndicator />
							<RoadmapContent expandedDefault>
								<RoadmapTitle>{m.roadmap_item_1_title()}</RoadmapTitle>
								<RoadmapDescription>
									{m.roadmap_item_1_description()}
								</RoadmapDescription>
							</RoadmapContent>
						</RoadmapItem>

						<RoadmapItem isActive>
							<RoadmapIndicator />
							<RoadmapContent expandedDefault>
								<RoadmapTitle>{m.roadmap_item_2_title()}</RoadmapTitle>
								<RoadmapDescription>
									{m.roadmap_item_2_description()}
								</RoadmapDescription>
							</RoadmapContent>
						</RoadmapItem>

						<RoadmapItem isActive>
							<RoadmapIndicator />
							<RoadmapContent expandedDefault>
								<RoadmapTitle>{m.roadmap_item_3_title()}</RoadmapTitle>
								<RoadmapDescription>
									{parseFormattedText(m.roadmap_item_3_description())}
								</RoadmapDescription>
							</RoadmapContent>
						</RoadmapItem>

						<RoadmapItem>
							<RoadmapIndicator />
							<RoadmapContent>
								<RoadmapTitle>{m.roadmap_item_4_title()}</RoadmapTitle>
								<RoadmapDescription>
									{m.roadmap_item_4_description()}
								</RoadmapDescription>
							</RoadmapContent>
						</RoadmapItem>

						<RoadmapItem>
							<RoadmapIndicator />
							<RoadmapContent>
								<RoadmapTitle>{m.roadmap_item_5_title()}</RoadmapTitle>
								<RoadmapDescription>
									{m.roadmap_item_5_description()}
								</RoadmapDescription>
							</RoadmapContent>
						</RoadmapItem>

						<RoadmapItem>
							<RoadmapIndicator />
							<RoadmapContent>
								<RoadmapTitle>{m.roadmap_item_6_title()}</RoadmapTitle>
								<RoadmapDescription>
									{m.roadmap_item_6_description()}
								</RoadmapDescription>
							</RoadmapContent>
						</RoadmapItem>

						<RoadmapItem>
							<RoadmapIndicator />
							<RoadmapContent>
								<RoadmapTitle>{m.roadmap_item_7_title()}</RoadmapTitle>
								<RoadmapDescription>
									{m.roadmap_item_7_description()}
								</RoadmapDescription>
							</RoadmapContent>
						</RoadmapItem>

						<RoadmapItem>
							<RoadmapIndicator />
							<RoadmapContent>
								<RoadmapTitle>{m.roadmap_item_7_title()}</RoadmapTitle>
								<RoadmapDescription>
									{m.roadmap_item_8_description()}
									<br />
									<br />
									<strong>{m.recognition_quote_sub()}.</strong>
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
