import { PlayIcon } from "lucide-react";
import { type FunctionComponent, useEffect, useId, useState } from "react";
import { parseBold } from "@/-helper-tsx";
import ActionButton from "@/components/ActionButton";
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
	const playIntroductionPortuguese = useAudio("bia_introduction_portuguese");
	const playIntroductionEnglish = useAudio("bia_introduction_english");

	return (
		<section
			id={m.audio_engine_id()}
			aria-labelledby={headingId}
			className="relative w-full py-12 flex justify-center bg-background-secondary"
		>
			<div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-12">
				<div className="flex flex-col">
					<h2 id={headingId} className="flex flex-col text-center md:text-left">
						<span className="uppercase text-muted-foreground text-base font-normal">
							{m.audio_engine()}
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
									onClick={() => {
										setSelectedAudioLanguage("pt-br");
									}}
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
									onClick={() => {
										setSelectedAudioLanguage("en");
									}}
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
									if (selectedAudioLanguage === "pt-br")
										playIntroductionPortuguese();
									else if (selectedAudioLanguage === "en")
										playIntroductionEnglish();
								}}
							>
								{m.audio_engine_listen()}
							</ActionButton>
						</div>
					</section>
				</div>
				<div>
					<Button
						variant="outline"
						onClick={() => {
							if (selectedAudioLanguage === "pt-br")
								playIntroductionPortuguese();
							else if (selectedAudioLanguage === "en")
								playIntroductionEnglish();
						}}
					>
						{m.audio_engine_listen()}
					</Button>
				</div>
			</div>
		</section>
	);
};

export default SectionAudioEngine;
