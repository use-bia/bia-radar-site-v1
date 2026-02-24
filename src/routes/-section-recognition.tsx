import { type FunctionComponent, useId } from "react";
import { parseBold } from "@/-helper-tsx";
import { m } from "@/paraglide/messages";

const supporters = [
	{
		name: "ABDI",
		type: "support",
		logo_light_mode: "/assets/supporters/abdi-light.png",
		logo_dark_mode: "/assets/supporters/abdi-dark.png",
		url: "https://abdi.com.br/",
		alt: "Logo da ABDI",
	},
	{
		name: "HubTec",
		type: "support",
		logo_light_mode: "/assets/supporters/hubtec-light.png",
		logo_dark_mode: "/assets/supporters/hubtec-dark.png",
		url: "https://hubtec.com.br/",
		alt: "Logo da HubTec",
	},
	{
		name: "neosenti",
		type: "creator",
		logo_light_mode: "/assets/creators/neosenti-light.png",
		logo_dark_mode: "/assets/creators/neosenti-dark.png",
		url: "https://neosenti.com/",
		alt: "Logo da Neosenti",
	},
];
type SectionRecognitionProps = Record<string, never>;

const SectionRecognition: FunctionComponent<SectionRecognitionProps> = () => {
	const headingId = useId();

	return (
		<section
			id={m.recognition_id()}
			aria-labelledby={headingId}
			className="relative w-full py-12 flex flex-col justify-center bg-background overflow-hidden"
		>
			<h2 id={headingId} className="flex flex-col text-center">
				<span className="uppercase text-muted-foreground text-base font-normal">
					{m.expertize_and_recognition()}
					<span className="sr-only">:</span>
				</span>
				<span className="text-3xl sm:text-4xl xl:text-5xl font-bold">
					{m.recognition_title()}
				</span>
			</h2>
			<div className="container mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center gap-4 lg:gap-8 xl:gap-12 w-full">
				{/* 2. Left Column */}
				<div className="flex flex-col items-center sm:items-start text-center sm:text-left w-full sm:max-w-xl lg:max-w-3xl shrink">
					<p className="my-6">{parseBold(m.recognition_description())}.</p>

					<blockquote className="border-l-2 border-primary p-2 pl-6">
						<p className="text-xl font-bold">“{m.recognition_quote()}.”</p>
						<footer className="mt-4">
							<span className="text-muted-foreground">
								- {m.recognition_quote_sub()}.
							</span>
						</footer>
					</blockquote>
				</div>

				{/* 3. Right Column */}
				<div className="flex flex-1 items-center justify-center p-4 w-full min-w-62.5 mt-8 sm:mt-0"></div>
			</div>
		</section>
	);
};

export default SectionRecognition;
