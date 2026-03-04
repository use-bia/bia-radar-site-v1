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
			className="relative w-full py-12 flex justify-center"
		>
			{/* 1. Changed to a 10-column grid for the 30/70 split */}
			<div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12 items-center">
				{/* LEFT SIDE: 30% width (3 out of 10 cols). Removed all text-center classes. */}
				<div className="lg:col-span-4 flex flex-col space-y-6 h-full">
					<h2 id={headingId} className="flex flex-col text-left">
						<span className="uppercase text-muted-foreground text-base font-normal">
							{m.humanization()}
							<span className="sr-only">:</span>
						</span>
						<span className="text-3xl md:text-4xl xl:text-5xl font-bold">
							{m.humanization_title()}
						</span>
					</h2>

					<p className="text-left">{m.humanization_description()}.</p>
				</div>

				{/* RIGHT SIDE: 70% width (7 out of 10 cols) */}
				<BasicItemList className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
					{/* Top Left Box: Added h-full to force equal heights */}
					<div className="col-span-1 flex flex-col h-full">
						<BasicItemBox
							title={m.humanization_item_1_title()}
							icon={<HandCoinsIcon />}
							className="h-full grow"
						>
							{parseFormattedText(m.humanization_item_1_description())}.
						</BasicItemBox>
					</div>

					{/* Top Right Box */}
					<div className="col-span-1 flex flex-col h-full">
						<BasicItemBox
							title={m.humanization_item_2_title()}
							icon={<HeartIcon />}
							className="h-full grow"
						>
							{parseFormattedText(m.humanization_item_2_description())}.
						</BasicItemBox>
					</div>

					{/* Bottom Box: Spans both columns */}
					<div className="col-span-1 sm:col-span-2 flex flex-col h-full">
						<BasicItemBox
							title={m.humanization_item_3_title()}
							icon={<BrainCircuitIcon />}
							className="h-full grow" // Add this if your component supports it!
						>
							{parseFormattedText(m.humanization_item_3_description())}.
						</BasicItemBox>
					</div>
				</BasicItemList>
			</div>
		</section>
	);
};

export default SectionHumanization;
