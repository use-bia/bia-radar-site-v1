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
		<section className="relative w-full flex py-4 md:py-12 xl:py-15 justify-center">
			<div
				className="absolute inset-0 -z-1 bg-size-[80em] bg-center bg-no-repeat opacity-40 dark:opacity-20 pointer-events-none"
				style={{
					backgroundImage: `url(${LottusBg})`,
					backgroundPositionX: "5em",
				}}
				aria-hidden="true"
			/>

			<div className="relative px-4 lg:px-8 container flex flex-col lg:flex-row gap-12 lg:gap-8 justify-between">
				<div className="w-full flex flex-col space-y-1">
					<ScrollArea className="w-0 min-w-full whitespace-nowrap pb-3">
						{/* w-max forces this inner container to be exactly as wide as the badges need */}
						<div className="flex gap-2 w-max pb-1">
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
					<h1 className="text-5xl sm:text-6xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
						{m.feel_the_journey()}.
						<br />
						{m.reclaim_your_freedom()}!
					</h1>
					<p className="w-0 min-w-full mt-2">
						{m.hero_section_description()}: <b>{m.safety()}!</b>
					</p>
					<Tooltip>
						<TooltipTrigger asChild>
							<ActionButton
								icon={<ChevronRightIcon />}
								asChild
								className="mt-7"
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
					<div className="flex gap-4 w-0 min-w-full mt-3">
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
				<ImageBoxComponent
					imageSrc={StillFrame}
					imageAlt="Still frame of a person wearing the Bia Radar..."
					className="w-full aspect-square  mx-auto lg:mx-0 lg:max-w-none md:w-lg lg:w-md xl:w-lg shrink-0"
					details={[
						{
							title: "Weight",
							value: "87 Grams",
							icon: <WeightIcon aria-hidden="true" />,
						},
						{
							title: "Precisão",
							value: "25mm",
							icon: <TargetIcon aria-hidden="true" />,
						},
					]}
					imageDetails={{
						title: m.description_of_the_bia_radar_device(),
						content: <p>bla bla bla bla </p>,
					}}
					open={isDialogOpen}
					onOpenChange={setIsDialogOpen}
				/>
			</div>
		</section>
	);
};

export default SectionHero;
