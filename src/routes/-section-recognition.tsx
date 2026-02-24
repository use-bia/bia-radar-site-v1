import { type FunctionComponent, useId } from "react";
import { parseFormattedText } from "@/-helper-tsx";
import LogoAbdi from "@/assets/logo-abdi.svg?react";
import LogoHubtec from "@/assets/logo-hubtec.svg?react";
import LogoNeosenti from "@/assets/logo-neosenti.svg?react";
import { m } from "@/paraglide/messages";

const supporters = [
	{
		type: m.support(),
		logo: (
			<LogoAbdi
				aria-hidden="true"
				className="h-[6em] sm:h-[5em] lg:h-[5em] xl:h-[6em] w-auto text-foreground"
			/>
		),
		url: "https://abdi.com.br/",
		alt: "ABDI",
	},
	{
		type: m.support(),
		logo: (
			<LogoHubtec
				aria-hidden="true"
				className="h-[4em] sm:h-[3.5em] lg:h-[4em] xl:h-[4em] w-auto text-foreground"
			/>
		),
		url: "https://www.abdi.com.br/hubtec/",
		alt: "HubTec",
	},
	{
		name: "neosenti",
		type: m.created_by(),
		logo: (
			<LogoNeosenti
				aria-hidden="true"
				className="h-[4em] sm:h-[3em] md:h-[4em] lg:h-[4em] xl:h-[3em] w-auto text-foreground"
			/>
		),
		url: "https://neosenti.com/",
		alt: "Neosenti",
	},
];

type SectionRecognitionProps = Record<string, never>;

const SectionRecognition: FunctionComponent<SectionRecognitionProps> = () => {
	const headingId = useId();

	return (
		<section
			id={m.recognition_id()}
			aria-labelledby={headingId}
			className="relative w-full py-12 flex flex-col justify-center bg-background"
		>
			<h2 id={headingId} className="flex flex-col text-center mb-8">
				<span className="uppercase text-muted-foreground text-base font-normal">
					{m.expertize_and_recognition()}
					<span className="sr-only">:</span>
				</span>
				<span className="text-3xl sm:text-4xl xl:text-5xl font-bold">
					{m.recognition_title()}
				</span>
			</h2>

			<div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-2 xl:gap-12 w-full">
				{/* 1. Left Column */}
				<div className="flex flex-col items-center md:items-start md:text-left w-full">
					<p className="my-6 text-center md:text-left">
						{parseFormattedText(m.recognition_description())}.
					</p>

					<blockquote className="border-l-2 border-primary p-2 pl-6">
						<p className="text-xl font-bold">“{m.recognition_quote()}.”</p>
						<footer className="mt-4">
							<span className="text-muted-foreground">
								- {m.recognition_quote_sub()}.
							</span>
						</footer>
					</blockquote>
				</div>

				{/* 2. Right Column (Logos) */}
				<div className="flex flex-1 items-center justify-center p-4 w-full mt-8 md:mt-0">
					{/* The Grid: 2 cols (xs) -> 3 cols (sm) -> 2 cols (md) -> 3 cols (lg+) */}
					<ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-14 w-full">
						{supporters.map(({ type, logo, url, alt }) => (
							<li
								key={`supporter-${alt}`}
								// The magic happens here with `last:col-span-*`
								className="flex flex-col items-center col-span-1 last:col-span-2 sm:last:col-span-1 md:last:col-span-2 xl:last:col-span-1"
							>
								<span className="text-muted-foreground uppercase font-bold mb-2 text-sm text-center">
									{type}
								</span>
								<a
									href={url}
									target="_blank"
									rel="noopener noreferrer"
									className="h-full items-center flex transition-opacity hover:opacity-80"
									aria-label={m.visit_xxx_opens_in_new_tab({ name: alt })}
								>
									{logo}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default SectionRecognition;
