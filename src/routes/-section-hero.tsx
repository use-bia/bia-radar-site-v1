import {
	CloudRainWindIcon,
	PuzzleIcon,
	TargetIcon,
	TrophyIcon,
	WeightIcon,
	WifiOffIcon,
} from "lucide-react";
import type { FunctionComponent } from "react";
import LottusBg from "@/assets/lottus.webp";
import StillFrame from "@/assets/still-frame-bia-radar.webp";
import ImageBoxComponent from "@/components/ImageBoxComponent";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { m } from "@/paraglide/messages";

type HeroBadges = {
	title: string;
	icon: React.ReactNode;
};

const heroBadges: HeroBadges[] = [
	{
		title: "100% offline",
		icon: <WifiOffIcon className="text-chart-2" aria-hidden="true" />,
	},
	{
		title: "Premio nacional",
		icon: <TrophyIcon className="text-chart-3" aria-hidden="true" />,
	},
	{
		title: "À prova d'água",
		icon: <CloudRainWindIcon className="text-chart-1" aria-hidden="true" />,
	},
	{
		title: "Customizável",
		icon: <PuzzleIcon className="text-chart-4" aria-hidden="true" />,
	},
];

type SectionHeroProps = {};

const SectionHero: FunctionComponent<SectionHeroProps> = () => {
	return (
		<section className="relative w-full flex py-12 xl:py-15 justify-center overflow-hidden">
			<div
				className="absolute inset-0 -z-1 bg-size-[80em] bg-center bg-no-repeat opacity-40 dark:opacity-20 pointer-events-none"
				style={{
					backgroundImage: `url(${LottusBg})`,
					backgroundPositionX: "5em",
				}}
				aria-hidden="true"
			/>

			<div className="relative px-4 lg:px-8 container flex gap-4 justify-between">
				<div className="w-fit flex flex-col space-y-1">
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
						{/* Explicitly call the horizontal ScrollBar */}
						<ScrollBar orientation="horizontal" />
					</ScrollArea>

					<h1 className="text-6xl">
						{m.feel_the_journey()}.
						<br />
						{m.reclaim_your_freedom()}!
					</h1>
					<p className="w-0 min-w-full mt-2">
						O poder dos carros autônomos na palma da sua mão. A BIA-RADAR
						utiliza tecnologia para filtrar o mundo e entregar apenas o que
						importa: <b>segurança!</b>
					</p>
				</div>
				<ImageBoxComponent
					imageSrc={StillFrame}
					imageAlt="Still frame of a person wearing the Bia Radar, showcasing the device in use and highlighting its design and functionality."
					className="w-120 lg:w-110 xl:w-100 "
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
				/>
			</div>
		</section>
	);
};

export default SectionHero;
