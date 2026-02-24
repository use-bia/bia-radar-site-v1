import { type FunctionComponent, useId } from "react";
import { Input } from "@/components/ui/input";
import { m } from "@/paraglide/messages";

type SectionWaitingListProps = Record<string, never>;

const SectionWaitingList: FunctionComponent<SectionWaitingListProps> = () => {
	const headingId = useId();

	return (
		<section
			id={m.waiting_list_id()}
			aria-labelledby={headingId}
			className="w-full flex py-12 justify-center bg-secondary"
		>
			<div className="container mx-auto px-4 lg:px-8 flex flex-col gap-8">
				<h2 id={headingId} className="flex flex-col text-center">
					<span className="uppercase text-muted-foreground text-base font-normal">
						{m.objective()}
						<span className="sr-only">:</span>
					</span>
					<span className="text-3xl md:text-4xl xl:text-5xl font-bold">
						{m.objective_title()}
					</span>
				</h2>

				<p className="text-center max-w-3xl mx-auto">
					{m.objective_description()}.
				</p>

				<div className="">
					<Input />
				</div>
			</div>
		</section>
	);
};

export default SectionWaitingList;
