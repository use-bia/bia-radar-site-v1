import { PlayIcon } from "lucide-react";
import { type FunctionComponent, useEffect, useId, useState } from "react";
import { parseBold } from "@/-helper-tsx";
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
			className="relative w-full py-12 flex justify-center bg-background-secondary overflow-hidden"
		>
			{/* 1. Main Container: Removed justify-center so items align left by default */}
			<div className="container mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center gap-4 lg:gap-8 xl:gap-12 w-full">
				{/* 2. Left Column: Removed flex-1. It now takes up a maximum width but won't grow infinitely */}
				<div className="flex flex-col items-center sm:items-start text-center sm:text-left w-full sm:max-w-xl lg:max-w-3xl shrink">
					<h2 id={headingId} className="flex flex-col">
						<span className="uppercase text-muted-foreground text-base font-normal">
							{m.audio_engine()}
							<span className="sr-only">:</span>
						</span>
						<span className="text-3xl sm:text-4xl xl:text-5xl font-bold">
							{m.audio_engine_title()}
						</span>
					</h2>

					<p className="mt-6">{parseBold(m.audio_engine_description())}.</p>

					<Separator className="mt-6 mb-4 w-full" />

					<section
						aria-labelledby={subHeadingId}
						className="flex flex-col items-center sm:items-start space-y-4 w-full"
					>
						<h3 id={subHeadingId} className="uppercase text-muted-foreground">
							{m.try_now()}
						</h3>

						<div className="flex flex-col items-center sm:items-start space-y-4">
							<div className="flex flex-wrap justify-center sm:justify-start gap-4">
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
											? "border-primary"
											: "border-transparent text-muted-foreground",
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
											? "border-primary"
											: "border-transparent text-muted-foreground",
									)}
								>
									{m.english()}
								</Button>
							</div>

							<ActionButton
								icon={<PlayIcon />}
								isIconAtStart
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

				{/* 3. Right Column: Added flex-1 to fill remaining space, and justify-center to center the visualizer inside it */}
				<div className="flex flex-1 items-center justify-center p-4 w-full min-w-62.5 mt-8 sm:mt-0">
					<AudioVisualizer isPlaying={isAnyPlaying} playTrigger={playTrigger} />
				</div>
			</div>
		</section>
	);
};

export default SectionAudioEngine;
