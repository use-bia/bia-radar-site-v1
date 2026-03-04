import { PlayCircle } from "lucide-react";
import { type FunctionComponent, useId } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { m } from "@/paraglide/messages";
import type { VideoType } from "./-guides-types";

interface VideoGuideItemProps {
	video: VideoType;
}

const VideoGuideItem: FunctionComponent<VideoGuideItemProps> = ({ video }) => {
	const titleId = useId();

	return (
		<article
			id={video.id}
			tabIndex={-1}
			aria-labelledby={titleId}
			className="flex flex-col md:flex-row gap-6 md:gap-8 group/card scroll-mt-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-8 transition-shadow"
		>
			<button
				type="button"
				className="group relative w-full md:w-1/2 lg:w-5/12 aspect-video overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
				aria-label={`Assistir ao vídeo: ${video.title}`}
			>
				<img
					className="h-full w-full object-cover transition-all duration-500 brightness-75 group-hover:brightness-100 group-hover:scale-105 group-focus:brightness-100 group-focus:scale-105"
					src={video.thumb}
					alt=""
				/>

				<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
					<PlayCircle className="w-16 h-16 text-white/80 transition-all duration-300 group-hover:text-white group-hover:scale-110 group-focus:text-white group-focus:scale-110 drop-shadow-lg" />
				</div>

				<div className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-md py-1 px-2 text-xs font-medium shadow-sm z-10">
					{video.duration}
				</div>
			</button>

			<div className="flex flex-col justify-start space-y-3 md:w-1/2 lg:w-7/12 py-2">
				<h3
					id={titleId}
					className="font-bold text-2xl lg:text-3xl transition-colors group-hover/card:text-primary"
				>
					{video.title}
				</h3>
				<p className="text-muted-foreground text-base lg:text-lg max-w-xl">
					{video.description}
				</p>

				<div className="flex flex-wrap gap-4 mt-4 pt-2">
					<Button
						type="button"
						variant="default"
						className="gap-2 rounded-none"
					>
						<PlayCircle className="w-4 h-4" />
						Assistir Guia
					</Button>

					<Dialog>
						<DialogTrigger asChild>
							<Button
								type="button"
								variant="secondary"
								className="rounded-none"
								aria-label={`Ler transcrição de ${video.title}`}
							>
								Ler Transcrição
							</Button>
						</DialogTrigger>

						<DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto rounded-none">
							<DialogHeader>
								<DialogTitle>{video.title} - Transcrição</DialogTitle>
							</DialogHeader>
							<div className="text-sm text-muted-foreground leading-relaxed py-4">
								{video.transcription}
							</div>
							<DialogFooter>
								<DialogClose asChild>
									<Button
										type="button"
										variant="default"
										className="uppercase font-bold rounded-none"
									>
										{m?.close ? m.close() : "Fechar"}
									</Button>
								</DialogClose>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</div>
		</article>
	);
};

export default VideoGuideItem;
