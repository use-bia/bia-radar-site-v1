import { PlayIcon } from "lucide-react";
import { type FunctionComponent, useEffect, useId, useState } from "react";
import { parseFormattedText } from "@/-helper-tsx";
import ActionButton from "@/components/ActionButton";
import AudioVisualizer from "@/components/AudioVisualizer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAudio } from "@/hooks/useAudio";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages";
import { getLocale, type Locale } from "@/paraglide/runtime";

type SectionAudioEngineProps = Record<string, never>;

const SectionAudioEngine: FunctionComponent<SectionAudioEngineProps> = () => {
	const [selectedAudioLanguage, setSelectedAudioLanguage] =
		useState<Locale>("pt-br");
	const [playTrigger, setPlayTrigger] = useState(0);
	const locale = getLocale();

	useEffect(() => {
		if (locale === "en") {
			setSelectedAudioLanguage("en");
		} else {
			setSelectedAudioLanguage("pt-br");
		}
	}, [locale]);

	const headingId = useId();
	const subHeadingId = useId();

	const {
		play: playPt,
		stop: stopPt,
		isPlaying: isPlayingPt,
	} = useAudio("bia_introduction_portuguese");
	const {
		play: playEn,
		stop: stopEn,
		isPlaying: isPlayingEn,
	} = useAudio("bia_introduction_english");

	const isAnyPlaying = isPlayingPt || isPlayingEn;

	const handleLanguageChange = (newLanguage: Locale) => {
		stopPt();
		stopEn();
		setSelectedAudioLanguage(newLanguage);
	};

	return (
		<section
			id={m.audio_engine_id()}
			aria-labelledby={headingId}
			// SOFTENED BACKGROUND AND INCREASED PADDING HERE
			className="relative w-full py-16 md:py-24 xl:py-32 flex justify-center bg-background-secondary overflow-hidden"
		>
			{/* INCREASED GAPS AND CHANGED BREAKPOINT TO MD FOR BETTER SPACING */}
			<div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center gap-12 lg:gap-20 w-full">
				<div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:max-w-xl lg:max-w-2xl shrink">
					<h2 id={headingId} className="flex flex-col mb-4">
						<span className="uppercase text-muted-foreground text-base font-normal mb-2">
							{m.audio_engine()}
							<span className="sr-only">:</span>
						</span>
						<span className="text-3xl sm:text-4xl xl:text-5xl font-bold">
							{m.audio_engine_title()}
						</span>
					</h2>

					{/* ADDED LINE HEIGHT AND MUTED TEXT */}
					<p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl">
						{parseFormattedText(m.audio_engine_description())}.
					</p>

					<Separator className="mt-12 mb-6 w-full" />

					<section
						aria-labelledby={subHeadingId}
						className="flex flex-col items-center md:items-start space-y-6 w-full"
					>
						<h3
							id={subHeadingId}
							className="uppercase text-muted-foreground font-semibold tracking-wider text-sm"
						>
							{m.try_now()}
						</h3>

						<div className="flex flex-col w-full items-center md:items-start space-y-6">
							<div className="flex flex-wrap justify-center md:justify-start gap-4">
								<Button
									variant="ghost"
									onClick={() => handleLanguageChange("pt-br")}
									size="lg"
									aria-label={m.change_reproduction_language_to({
										language: m.portuguese(),
									})}
									className={cn(
										"border",
										selectedAudioLanguage === "pt-br"
											? "border-primary bg-primary/5"
											: "border-transparent text-muted-foreground hover:bg-muted/50",
									)}
								>
									{m.portuguese()}
								</Button>
								<Button
									variant="ghost"
									onClick={() => handleLanguageChange("en")}
									size="lg"
									aria-label={m.change_reproduction_language_to({
										language: m.english(),
									})}
									className={cn(
										"border",
										selectedAudioLanguage === "en"
											? "border-primary bg-primary/5"
											: "border-transparent text-muted-foreground hover:bg-muted/50",
									)}
								>
									{m.english()}
								</Button>
							</div>

							<ActionButton
								icon={<PlayIcon />}
								isIconAtStart
								className="w-full max-w-md"
								onClick={() => {
									setPlayTrigger((prev) => prev + 1);
									if (selectedAudioLanguage === "pt-br") playPt();
									else if (selectedAudioLanguage === "en") playEn();
								}}
							>
								{m.audio_engine_listen()}
							</ActionButton>
						</div>
					</section>
				</div>

				<div className="flex flex-1 items-center justify-center p-4 w-full min-w-[250px] mt-8 md:mt-0">
					<AudioVisualizer isPlaying={isAnyPlaying} playTrigger={playTrigger} />
				</div>
			</div>
		</section>
	);
};

export default SectionAudioEngine;
