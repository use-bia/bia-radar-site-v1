import { Link } from "@tanstack/react-router";
import { PackageIcon } from "lucide-react";
import { type FunctionComponent, useId } from "react";
import { generateLoremIpsum } from "@/-helper";
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
			<div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row-reverse justify-between w-full">
				{/* Right Column: Title & Price */}
				<div className="flex flex-col items-center md:items-end text-center md:text-right w-full md:w-2/5 lg:w-1/2">
					<h2 id={headingId} className="flex flex-col">
						<span className="uppercase text-muted-foreground text-base font-normal">
							{m.heading_to_launch()}
							<span className="sr-only">:</span>
						</span>
						<span className="text-3xl sm:text-4xl xl:text-5xl font-bold">
							{m.roadmap_title()}
						</span>
					</h2>

					<div className="relative border border-primary pt-10 mt-8 w-full flex flex-col overflow-hidden">
						<div className="w-full h-auto py-12 md:py-12 px-6 lg:px-10 flex justify-center">
							<PricePlaceholder
								className="w-full max-w-full h-auto text-foreground"
								aria-label={m.roadmap_price_alt()}
							/>
						</div>

						<div
							className="absolute top-0 right-0 bg-primary"
							aria-hidden="true"
						>
							<p className="text-lg text-primary-foreground font-bold px-4 py-1">
								{m.coming_soon()}
							</p>
						</div>

						<div className="bg-secondary flex border-t border-primary p-6 sm:px-8 md:px-4 lg:px-8 sm:py-6 gap-4 items-center justify-between flex-col sm:flex-row md:flex-col lg:flex-row">
							<div className="flex flex-col gap-1 items-center sm:items-start md:items-center lg:items-start text-center sm:text-left md:text-center lg:text-left">
								<p className="uppercase text-sm sm:text-base text-muted-foreground">
									{m.roadmap_distributors()}
								</p>
								<p className="uppercase text-lg font-bold">{m.coming_soon()}</p>
							</div>
							<div className="w-full sm:w-auto md:w-full lg:w-auto flex justify-center shrink-0">
								<ActionButton
									icon={<PackageIcon />}
									className="w-full sm:w-auto md:w-full lg:w-auto"
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

					<p className="mt-3 w-full text-xs sm:text-sm text-muted-foreground text-center px-2 md:px-0">
						<Link
							to="/"
							hash={m.waiting_list_id()}
							className="hover:underline hover:text-primary transition-colors"
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
				<div
					className="bg-border h-[0.08em] w-full md:h-full md:w-[0.08em] mt-6 md:mt-0 md:ml-4 md:mr-4 lg:mr-10"
					aria-hidden="true"
				/>

				{/* Left Column: Roadmap */}
				<div className="flex w-full md:w-3/5 lg:w-1/2 mt-12 md:mt-6">
					<Roadmap className="w-full">
						<RoadmapItem isActive>
							<RoadmapIndicator />
							<RoadmapContent>
								<RoadmapTitle>Q1: {generateLoremIpsum(2)}</RoadmapTitle>
								<RoadmapDescription>
									{generateLoremIpsum(16)}
								</RoadmapDescription>
							</RoadmapContent>
						</RoadmapItem>

						<RoadmapItem isActive>
							<RoadmapIndicator />
							<RoadmapContent>
								<RoadmapTitle>Q2: {generateLoremIpsum(1)}</RoadmapTitle>
								<RoadmapDescription>{generateLoremIpsum(8)}</RoadmapDescription>
							</RoadmapContent>
						</RoadmapItem>

						<RoadmapItem>
							<RoadmapIndicator />
							<RoadmapContent>
								<RoadmapTitle>Q3: {generateLoremIpsum(1)}</RoadmapTitle>
								<RoadmapDescription>
									{generateLoremIpsum(10)}
								</RoadmapDescription>
								<button
									type="button"
									className="mt-4 text-sm text-primary underline text-left hover:text-primary/80 transition-colors w-max"
								>
									View Q3 specs
								</button>
							</RoadmapContent>
						</RoadmapItem>

						<RoadmapItem>
							<RoadmapIndicator />
							<RoadmapContent>
								<RoadmapTitle>Q4: {generateLoremIpsum(2)}</RoadmapTitle>
								<RoadmapDescription>
									{generateLoremIpsum(20)}
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
