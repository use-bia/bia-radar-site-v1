import { BrainCircuitIcon, HandCoinsIcon, HeartIcon } from "lucide-react";
import { type FunctionComponent, useId } from "react";
import { parseFormattedText } from "@/-helper-tsx";
import { BasicItemBox, BasicItemList } from "@/components/BasicItemBox";
import { m } from "@/paraglide/messages";

type SectionHumanizationProps = Record<string, never>;

const SectionHumanization: FunctionComponent<SectionHumanizationProps> = () => {
	const headingId = useId();

	return (
		<section
			id={m.humanization_id()}
			aria-labelledby={headingId}
			className="relative w-full py-16 md:py-24 xl:py-32 bg-background flex justify-center"
		>
			<div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12 items-center">
				{/* LEFT SIDE: 30% width (3 out of 10 cols) */}
				<div className="lg:col-span-4 flex flex-col space-y-8 h-full">
					<h2 id={headingId} className="flex flex-col text-left">
						<span className="uppercase text-muted-foreground text-base font-normal">
							{m.humanization()}
							<span className="sr-only">:</span>
						</span>
						<span className="text-3xl md:text-4xl xl:text-5xl font-bold">
							{m.humanization_title()}
						</span>
					</h2>

					<p className="text-left text-base md:text-lg leading-relaxed text-muted-foreground">
						{m.humanization_description()}.
					</p>
				</div>

				{/* RIGHT SIDE: 70% width (7 out of 10 cols) */}
				<BasicItemList className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
					{/* Top Left Box: Classes merged directly into the li (BasicItemBox) */}
					<BasicItemBox
						title={m.humanization_item_1_title()}
						icon={<HandCoinsIcon />}
						className="col-span-1 flex flex-col h-full grow"
					>
						{parseFormattedText(m.humanization_item_1_description())}.
					</BasicItemBox>

					{/* Top Right Box */}
					<BasicItemBox
						title={m.humanization_item_2_title()}
						icon={<HeartIcon />}
						className="col-span-1 flex flex-col h-full grow"
					>
						{parseFormattedText(m.humanization_item_2_description())}.
					</BasicItemBox>

					{/* Bottom Box: Spans both columns */}
					<BasicItemBox
						title={m.humanization_item_3_title()}
						icon={<BrainCircuitIcon />}
						className="col-span-1 sm:col-span-2 flex flex-col h-full grow"
					>
						{parseFormattedText(m.humanization_item_3_description())}.
					</BasicItemBox>
				</BasicItemList>
			</div>
		</section>
	);
};

export default SectionHumanization;
