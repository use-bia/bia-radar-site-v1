import { BrainCircuitIcon, HandCoinsIcon, HeartIcon } from "lucide-react";
import { type FunctionComponent, useId } from "react";
import { parseBold } from "@/-helper-tsx";
import { BasicItemBox, BasicItemList } from "@/components/BasicItemBox";
import { m } from "@/paraglide/messages";

type SectionHumanizationProps = {};

const SectionHumanization: FunctionComponent<SectionHumanizationProps> = () => {
	const headingId = useId();

	return (
		<section
			id={m.humanization_id()}
			aria-labelledby={headingId}
			className="relative w-full py-12 flex justify-center"
		>
			{/* 2x2 Grid setup on non-mobile screens with a gap */}
			<div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-12">
				{/* Top-Left Cell: Title and Description */}
				<div className="flex flex-col space-y-6">
					<h2 id={headingId} className="flex flex-col text-center md:text-left">
						<span className="uppercase text-muted-foreground text-base font-normal">
							{m.humanization()}
						</span>
						<span className="text-3xl md:text-4xl xl:text-5xl font-bold">
							{m.humanization_title()}
						</span>
					</h2>

					<p>{m.humanization_description()}.</p>
				</div>

				{/* Remaining Cells: Items (Using 'contents' to pass items to the parent grid) */}
				<BasicItemList className="contents">
					<BasicItemBox
						title={m.humanization_item_1_title()}
						icon={<HandCoinsIcon />}
					>
						{parseBold(m.humanization_item_1_description())}.
					</BasicItemBox>
					<BasicItemBox
						title={m.humanization_item_2_title()}
						icon={<HeartIcon />}
					>
						{parseBold(m.humanization_item_2_description())}.
					</BasicItemBox>
					<BasicItemBox
						title={m.humanization_item_3_title()}
						icon={<BrainCircuitIcon />}
					>
						{parseBold(m.humanization_item_3_description())}.
					</BasicItemBox>
				</BasicItemList>
			</div>
		</section>
	);
};

export default SectionHumanization;
