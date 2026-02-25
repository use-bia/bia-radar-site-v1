import { ArrowRightIcon } from "lucide-react";
import { type FunctionComponent, useEffect, useId, useState } from "react";
import MountainBg from "@/assets/mountain-bg-light.jpg";
import UniverseBg from "@/assets/universe-bg-dark.jpg";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages";

type SectionExpandiblePlatformProps = Record<string, never>;

const SectionExpandiblePlatform: FunctionComponent<
	SectionExpandiblePlatformProps
> = () => {
	const headingId = useId();
	const { theme } = useTheme();
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const currentBg = mounted && theme === "light" ? MountainBg : UniverseBg;

	return (
		<section
			id={m.expandible_platform_id()}
			aria-labelledby={headingId}
			className="relative w-full flex py-12 justify-center"
		>
			<div
				className={cn(
					"absolute inset-0 -z-1 bg-no-repeat opacity-20 pointer-events-none transition-all duration-500",
					"bg-size-[100%] dark:bg-size-[80em] bg-center",
					"dark:md:bg-position-[calc(50%+15em)_center]",
				)}
				style={{
					backgroundImage: `url(${currentBg})`,
				}}
				aria-hidden="true"
			/>

			<div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-16">
				<div className="col-span-1 md:col-span-3">
					<h2 id={headingId} className="flex flex-col text-center md:text-left">
						<span className="uppercase text-muted-foreground text-base font-normal">
							{m.expandible_platform()}
							<span className="sr-only">:</span>
						</span>
						<span className="text-3xl md:text-4xl xl:text-5xl font-bold">
							{m.expandible_platform_title()}
						</span>
					</h2>
				</div>

				{/* Description 
                    Mobile: Natural stack.
                    Tablet & Desktop (md+): Takes up the left 3 columns, naturally falling under the title.
                */}
				<div className="col-span-1 md:col-span-3 text-center md:text-left">
					<p>{m.expandible_platform_description()}.</p>
				</div>

				{/* Card 
                    Mobile: Natural stack at the bottom.
                    Tablet & Desktop (md+): Forced to the top right (col 4), spanning 2 columns wide and 2 rows tall.
                */}
				<div className="col-span-1 md:col-span-2 md:col-start-4 md:row-start-1 md:row-span-2 flex flex-col border border-primary items-center justify-between p-6 backdrop-blur-sm">
					<div>
						<h3 className="text-2xl text-center font-bold">
							{m.more_information_soon()}!
						</h3>
						<p className="text-muted-foreground text-center mt-2">
							{m.join_the_waiting_list_to_not_miss_anything()}.
						</p>
					</div>

					<Button
						variant="default"
						className="my-4 uppercase font-bold w-full max-w-xs flex items-center justify-center gap-2"
						onClick={() => {
							document
								.getElementById(m.waiting_list_id())
								?.scrollIntoView({ behavior: "smooth" });
						}}
					>
						<span>{m.be_a_part()}</span>
						<ArrowRightIcon aria-hidden="true" className="w-5 h-5 shrink-0" />
					</Button>
				</div>
			</div>
		</section>
	);
};

export default SectionExpandiblePlatform;
