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

	// Using our updated hook to grab the play function AND the isPlaying state
	const { play: playPt, isPlaying: isPlayingPt } = useAudio(
		"bia_introduction_portuguese",
	);
	const { play: playEn, isPlaying: isPlayingEn } = useAudio(
		"bia_introduction_english",
	);

	// If either language is currently playing, trigger the visualizer
	const isAnyPlaying = isPlayingPt || isPlayingEn;

	return (
		<section
			id={m.audio_engine_id()}
			aria-labelledby={headingId}
			className="relative w-full py-12 flex justify-center bg-background-secondary"
		>
			<div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-12">
				{/* LEFT COLUMN: Controls */}
				<div className="flex flex-col">
					<h2 id={headingId} className="flex flex-col text-center md:text-left">
						<span className="uppercase text-muted-foreground text-base font-normal">
							{m.audio_engine()}
							<span className="sr-only">:</span>
						</span>
						<span className="text-3xl md:text-4xl xl:text-5xl font-bold">
							{m.audio_engine_title()}
						</span>
					</h2>

					<p className="mt-6">{parseBold(m.audio_engine_description())}.</p>
					<Separator className="mt-6 mb-4" />

					<section aria-labelledby={subHeadingId} className="space-y-4">
						<h3 id={subHeadingId} className="uppercase text-muted-foreground">
							{m.try_now()}
						</h3>
						<div className="space-y-4">
							<div className="flex gap-4">
								<Button
									variant="ghost"
									onClick={() => setSelectedAudioLanguage("pt-br")}
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
									onClick={() => setSelectedAudioLanguage("en")}
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
									if (selectedAudioLanguage === "pt-br") playPt();
									else if (selectedAudioLanguage === "en") playEn();
								}}
							>
								{m.audio_engine_listen()}
							</ActionButton>
						</div>
					</section>
				</div>

				{/* RIGHT COLUMN: Visualizer (Strictly visual, no interactions) */}
				<div className="p-8 flex items-center justify-center">
					<AudioVisualizer isPlaying={isAnyPlaying} />
				</div>
			</div>

			{/* Inline keyframes specifically for the sound wave bounce */}
			<style>{`
                @keyframes soundWave {
                    0%, 100% { transform: scaleY(0.3); }
                    50% { transform: scaleY(1); }
                }
                .animate-sound-wave {
                    animation: soundWave ease-in-out infinite;
                }
            `}</style>
		</section>
	);
};

export default SectionAudioEngine;
