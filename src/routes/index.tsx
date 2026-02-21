import { createFileRoute } from "@tanstack/react-router";
import { TargetIcon, WeightIcon } from "lucide-react";
import LottusBg from "@/assets/lottus.webp";
import StillFrame from "@/assets/still-frame-bia-radar.webp";
import ImageBoxComponent from "@/components/ImageBoxComponent";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<main>
			<section className="relative w-full flex py-15 justify-center overflow-hidden">
				<div
					className="absolute inset-0 bg-size-[100em] bg-center bg-no-repeat opacity-30 pointer-events-none"
					style={{ backgroundImage: `url(${LottusBg})` }}
					aria-hidden="true"
				/>

				<div className="relative z-10 container flex">
					<div>
						<h1 className="text-7xl">
							{m.feel_the_journey_reclaim_your_freedom()}
						</h1>
					</div>
					<ImageBoxComponent
						imageSrc={StillFrame}
						imageAlt="Still frame of a person wearing the Bia Radar, showcasing the device in use and highlighting its design and functionality."
						details={[
							{
								title: "Weight",
								value: "87 Grams",
								icon: <WeightIcon className="h-4 w-4" aria-hidden="true" />,
							},
							{
								title: "Precisão",
								value: "25mm",
								icon: <TargetIcon className="h-4 w-4" aria-hidden="true" />,
							},
						]}
						imageDetails={{
							title: m.description_of_the_bia_radar_device(),
							content: <p>bla bla bla bla </p>,
						}}
					/>
				</div>
			</section>
			<section>
				<h2>About</h2>
				<h3>asdf</h3>
				<div>asdf</div>
			</section>
			<section>
				<h2>About</h2>
				<h3>asdf</h3>
				<div>asdf</div>
			</section>
		</main>
	);
}
