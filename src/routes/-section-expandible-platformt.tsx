import { ArrowRightIcon } from "lucide-react";
import { type FunctionComponent, useId } from "react";
import UniverseBg from "@/assets/universe.webp";
import { Button } from "@/components/ui/button";
import { m } from "@/paraglide/messages";

type SectionExpandiblePlatformProps = {};

const SectionExpandiblePlatform: FunctionComponent<
	SectionExpandiblePlatformProps
> = () => {
	const headingId = useId();

	return (
		<section
			id={m.expandible_platform_id()}
			aria-labelledby={headingId}
			className="relative w-full flex py-8 justify-center"
		>
			<div
				className="absolute inset-0 -z-1 bg-size-[80em] bg-center md:bg-position-[calc(50%+15em)_center] bg-no-repeat opacity-40 dark:opacity-20 pointer-events-none transition-all duration-500"
				style={{
					backgroundImage: `url(${UniverseBg})`,
				}}
				aria-hidden="true"
			/>
			<div className="container mx-auto px-4 lg:px-8 flex gap-8 lg:gap-16">
				<div className="w-3/5 space-y-8">
					<h2 id={headingId} className="flex flex-col">
						<span className="uppercase text-muted-foreground text-base font-normal">
							{m.expandible_platform()}
						</span>
						<span className="text-3xl md:text-4xl xl:text-5xl font-bold">
							{m.expandible_platform_title()}
						</span>
					</h2>

					<p>{m.expandible_platform_description()}.</p>
				</div>
				<div className="flex flex-col w-2/5 border items-center justify-between p-6 border-primary backdrop-blur-xs">
					<div>
						<h3 className="text-2xl text-center">
							{m.more_information_soon()}!
						</h3>
						<p className="text-muted-foreground text-center mt-2">
							{m.join_the_waiting_list_to_not_miss_anything()}.
						</p>
					</div>

					<Button variant="default" className="my-4 uppercase font-bold w-70">
						{m.be_a_part()}
						<ArrowRightIcon aria-hidden="true" />
					</Button>
				</div>
			</div>
		</section>
	);
};

export default SectionExpandiblePlatform;
