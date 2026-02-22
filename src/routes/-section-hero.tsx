import { Link } from "@tanstack/react-router";
import {
	ChevronRightIcon,
	CloudRainWindIcon,
	PuzzleIcon,
	TargetIcon,
	TrophyIcon,
	WeightIcon,
	WifiOffIcon,
} from "lucide-react";
import { type FunctionComponent, useState } from "react";
import LottusBg from "@/assets/lottus.webp";
import StillFrame from "@/assets/still-frame-bia-radar.webp";
import ActionButton from "@/components/ActionButton";
import ImageBoxComponent from "@/components/ImageBoxComponent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { m } from "@/paraglide/messages";

type HeroBadges = {
	title: string;
	icon: React.ReactNode;
};

const heroBadges: HeroBadges[] = [
	{
		title: m.one_hundred_percent_offline(),
		icon: <WifiOffIcon className="text-chart-2" aria-hidden="true" />,
	},
	{
		title: m.national_prize(),
		icon: <TrophyIcon className="text-chart-3" aria-hidden="true" />,
	},
	{
		title: m.water_resistant(),
		icon: <CloudRainWindIcon className="text-chart-1" aria-hidden="true" />,
	},
	{
		title: m.customizable(),
		icon: <PuzzleIcon className="text-chart-4" aria-hidden="true" />,
	},
];

type SectionHeroProps = {};

const SectionHero: FunctionComponent<SectionHeroProps> = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<section className="relative w-full flex py-4 md:py-12 xl:py-15 justify-center overflow-hidden">
			<div
				className="absolute inset-0 -z-1 bg-size-[80em] bg-center md:bg-position-[calc(50%+5em)_center] bg-no-repeat opacity-40 dark:opacity-20 pointer-events-none transition-all duration-500"
				style={{
					backgroundImage: `url(${LottusBg})`,
				}}
				aria-hidden="true"
			/>

			{/* Changed from Flex to Grid for explicit placement */}
			<div className="relative px-4 lg:px-8 container grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-8 lg:gap-8">
				{/* 1. HEADER (Badges + Title) */}
				{/* md: spans both cols | lg: spans 1 col top-left */}
				<div className="md:col-span-2 lg:col-span-1 lg:col-start-1 lg:row-start-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
					<ScrollArea className="w-full whitespace-nowrap pb-3">
						<div className="flex gap-2 w-max pb-1 mx-auto lg:mx-0">
							{heroBadges.map((badge) => (
								<Badge
									key={badge.title}
									variant="secondary"
									className="gap-2 bg-muted shrink-0"
								>
									{badge.icon}
									{badge.title}
								</Badge>
							))}
						</div>
						<ScrollBar orientation="horizontal" />
					</ScrollArea>
					<h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
						{m.feel_the_journey()}.
						<br />
						{m.reclaim_your_freedom()}!
					</h1>
				</div>

				{/* 2 & 4. CONTENT GROUP (Description + Buttons) */}
				{/* On mobile: 'contents' lets items be ordered individually. On md+: groups them into the left column. */}
				<div className="contents md:flex md:flex-col md:gap-6 md:col-start-1 md:row-start-2 lg:col-start-1 lg:row-start-2">
					{/* Description */}
					<div className="text-left w-full">
						<p className="text-base sm:text-lg">
							{m.hero_section_description()}: <b>{m.safety()}!</b>
						</p>
					</div>

					{/* Buttons */}
					<div className="flex flex-col items-start w-full gap-4 pt-2 md:pt-0">
						<Tooltip>
							<TooltipTrigger asChild>
								<ActionButton
									icon={<ChevronRightIcon />}
									asChild
									className="md:w-full xl:w-auto"
								>
									<Link
										to="/"
										hash={m.waiting_list_id()}
										aria-label={m.i_want_to_be_part_of_it()}
									>
										{m.i_want_to_be_part_of_it()}
										<Badge variant="secondary" className="bg-background">
											10% OFF
										</Badge>
									</Link>
								</ActionButton>
							</TooltipTrigger>
							<TooltipContent>
								<p>
									{m.join_the_waiting_list_and_get_a_10_percent_discount_on_your_purchase()}
								</p>
							</TooltipContent>
						</Tooltip>

						<div className="flex flex-wrap gap-2 sm:gap-4 w-full justify-between xl:justify-around">
							<Tooltip>
								<TooltipTrigger asChild>
									<Button variant="ghost" onClick={() => setIsDialogOpen(true)}>
										{m.description()}
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>{m.open_full_description_of_the_device()}</p>
								</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button variant="ghost" asChild>
										<Link to="/technology">{m.how_it_works()}</Link>
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>{m.find_out_how_bia_works()}</p>
								</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button variant="ghost" asChild>
										<Link to="/" hash={m.roadmap_id()}>
											{m.roadmap()}
										</Link>
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>{m.find_out_how_long_until_bia_is_available()}</p>
								</TooltipContent>
							</Tooltip>
						</div>
					</div>
				</div>

				{/* 3. IMAGE */}
				<div className="md:col-start-2 md:row-start-2 md:row-span-1 lg:col-start-2 lg:row-start-1 lg:row-span-2 flex justify-center lg:justify-end md:items-start lg:items-center w-full">
					<ImageBoxComponent
						imageSrc={StillFrame}
						imageAlt="Still frame of a person wearing the Bia Radar..."
						className="w-full h-auto aspect-square md:aspect-6/7 xl:aspect-square lg:w-auto lg:h-128 xl:h-xl 2xl:h-xl mx-auto lg:mx-0 shrink-0"
						details={[
							{
								title: m.weight(),
								value: `87 ${m.grams()}`,
								icon: <WeightIcon aria-hidden="true" />,
							},
							{
								title: m.precision(),
								value: "25mm",
								icon: <TargetIcon aria-hidden="true" />,
							},
						]}
						imageDetails={{
							title: m.description_of_the_bia_radar_device(),
							// Falar do tamanho de um cartão de crédito
							content: <p>bla bla bla bla </p>,
						}}
						open={isDialogOpen}
						onOpenChange={setIsDialogOpen}
					/>
				</div>
			</div>
		</section>
	);
};

export default SectionHero;
