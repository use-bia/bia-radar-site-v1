import { DiameterIcon } from "lucide-react";
import { type FunctionComponent, useId } from "react";
import BiaOnCane from "@/assets/bia-on-cane.webp";
import { BasicItemBox, BasicItemList } from "@/components/BasicItemBox";
import ImageBoxComponent from "@/components/ImageBoxComponent";
import { m } from "@/paraglide/messages";

type SectionObjectiveProps = {};

const SectionObjective: FunctionComponent<SectionObjectiveProps> = () => {
	const headingId = useId();

	return (
		<section
			id={m.objective_section_id()}
			aria-labelledby={headingId}
			className="w-full flex py-12 justify-center bg-background"
		>
			<div className="container mx-auto px-4 lg:px-8 flex flex-col gap-8">
				{/* Unified Heading */}
				<h2 id={headingId} className="flex flex-col text-center">
					<span className="uppercase text-muted-foreground text-base font-normal">
						{m.objective()}
					</span>
					<span className="text-3xl md:text-4xl xl:text-5xl font-bold">
						{m.objective_title()}
					</span>
				</h2>

				<p className="text-center max-w-3xl mx-auto">
					{m.objective_description()}.
				</p>

				<div className="relative container grid grid-cols-1 lg:grid-cols-5 items-stretch xl:gap-4 2xl:gap-16 gap-y-8">
					<div className="lg:col-span-2 w-full flex min-h-100 sm:min-h-130 lg:min-h-0 lg:h-full">
						<ImageBoxComponent
							imageSrc={BiaOnCane}
							imageAlt="Still frame of a person wearing the Bia Radar..."
							className="w-full h-full shrink-0 lg:min-h-0"
							imageDetails={{
								title: m.description_of_the_bia_radar_device(),
								content: <p>bla bla bla bla</p>,
							}}
							imageClassName="object-contain lg:object-cover xl:object-contain"
							details={[
								{
									title: m.objective_universal_fitting(),
									value: "5-22mm",
									icon: <DiameterIcon />,
								},
							]}
						/>
					</div>

					<div className="lg:col-span-3 w-full h-full">
						<div className="flex flex-col w-full h-full justify-center">
							<BasicItemList>
								<BasicItemBox title={m.objective_item_1_title()} centerTitle>
									{m.objective_item_1_description()}.
								</BasicItemBox>

								<BasicItemBox title={m.objective_item_2_title()} centerTitle>
									{m.objective_item_2_description()}.
								</BasicItemBox>

								<BasicItemBox title={m.objective_item_3_title()} centerTitle>
									{m.objective_item_3_description()}.
								</BasicItemBox>

								<BasicItemBox title={m.objective_item_4_title()} centerTitle>
									{m.objective_item_4_description()}.
								</BasicItemBox>
							</BasicItemList>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SectionObjective;
