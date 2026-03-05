import { Link } from "@tanstack/react-router";
import { ArrowRightIcon, LockIcon, PlayCircle } from "lucide-react";
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

/** * Upgraded to accept a title for a more personalized touch,
 * and styled with the premium brutalist/editorial aesthetic.
 */
const WaitingListNudge: FunctionComponent<{ videoTitle?: string }> = ({
	videoTitle,
}) => (
	<DialogContent className="sm:max-w-md rounded-none border-border/40 bg-background/95 backdrop-blur-xl p-0 overflow-hidden">
		{/* Subtle top cinematic light beam */}
		<div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-70" />

		{/* Noise texture overlay */}
		<div
			className="absolute inset-0 dark:opacity-[0.04] opacity-[0.06] pointer-events-none mix-blend-overlay"
			style={{
				backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
				backgroundSize: "128px 128px",
			}}
			aria-hidden="true"
		/>

		{/* FIX: Removed z-10 here so the default shadcn close button is clickable */}
		<div className="relative flex flex-col p-8 gap-6">
			<div className="flex flex-col gap-3">
				{/* Sleek Eyebrow */}
				<div className="flex items-center gap-3 mx-auto">
					<div
						className="h-px w-6 bg-linear-to-r from-transparent to-border/80"
						aria-hidden="true"
					/>
					<span className="uppercase text-sm font-semibold tracking-[0.3em] text-muted-foreground">
						{m.status_coming_soon()}
					</span>
					<div
						className="h-px w-6 bg-linear-to-l from-transparent to-border/80"
						aria-hidden="true"
					/>
				</div>

				<DialogTitle className="text-2xl font-black tracking-tight leading-snug">
					{videoTitle
						? `"${videoTitle}" em breve`
						: "Este guia ainda não está disponível"}
				</DialogTitle>
			</div>

			<p className="text-muted-foreground text-base leading-relaxed">
				{m.join_the_waiting_list_and_get_a_10_percent_discount_on_your_purchase()}
			</p>

			<div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
				<Button
					type="button"
					variant="default"
					className="w-full sm:w-auto gap-2 rounded-none group"
					asChild
				>
					<Link
						to="/"
						hash={m.waiting_list_id()}
						aria-label={m.join_the_waiting_list()}
					>
						{m.join_the_waiting_list()}
						<ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
					</Link>
				</Button>

				<DialogClose asChild>
					<Button
						type="button"
						variant="ghost"
						className="w-full sm:w-auto rounded-none text-muted-foreground hover:text-foreground uppercase tracking-widest text-xs font-semibold"
					>
						{m?.close ? m.close() : "Voltar"}
					</Button>
				</DialogClose>
			</div>
		</div>
	</DialogContent>
);

const VideoGuideItem: FunctionComponent<VideoGuideItemProps> = ({ video }) => {
	const titleId = useId();

	return (
		<article
			id={video.id}
			tabIndex={-1}
			aria-labelledby={titleId}
			className="flex flex-col lg:flex-row gap-6 lg:gap-8 group/card scroll-mt-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-8 transition-shadow"
		>
			{/* Thumbnail — triggers waiting list nudge on click */}
			<Dialog>
				<DialogTrigger asChild>
					<button
						type="button"
						className="group relative w-full lg:w-5/12 aspect-video overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-muted/10 border border-border/20"
						aria-label={`Assistir ao vídeo: ${video.title}`}
					>
						<img
							className="h-full w-full object-cover transition-all duration-700 brightness-[0.65] group-hover:brightness-[0.85] group-hover:scale-105 group-focus:brightness-[0.85] group-focus:scale-105 grayscale-30"
							src={video.thumb}
							alt=""
						/>

						{/* Em Breve Status Badge Overlay */}
						<div className=" items-center absolute top-3 left-3 bg-background/90 backdrop-blur-md py-1 px-3 text-sm uppercase tracking-[0.2em] font-bold text-muted-foreground border border-border/50 shadow-sm z-10 flex items-center gap-1.5">
							<LockIcon className="w-3 h-3" />
							{m.coming_soon()}
						</div>

						<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
							<PlayCircle className="w-16 h-16 text-white/60 transition-all duration-500 group-hover:text-white group-hover:scale-110 group-focus:text-white group-focus:scale-110 drop-shadow-lg" />
						</div>

						<div className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-md py-1 px-2 text-xs font-medium shadow-sm z-10">
							{video.duration}
						</div>
					</button>
				</DialogTrigger>

				<WaitingListNudge videoTitle={video.title} />
			</Dialog>

			{/* Info & actions */}
			<div className="flex flex-col justify-start space-y-3 w-full lg:w-7/12 py-2">
				<h3
					id={titleId}
					className="font-bold text-2xl lg:text-3xl transition-colors group-hover/card:text-primary"
				>
					{video.title}
				</h3>

				<p className="text-muted-foreground text-base lg:text-lg max-w-xl leading-relaxed">
					{video.description}
				</p>

				<div className="flex flex-wrap justify-between lg:justify-start gap-4 mt-4 pt-2">
					{/* Watch button — same nudge */}
					<Dialog>
						<DialogTrigger asChild>
							<Button
								type="button"
								variant="default"
								className="gap-2 rounded-none"
							>
								<PlayCircle className="w-4 h-4" />
								{m.watch_guide()}
							</Button>
						</DialogTrigger>

						<WaitingListNudge videoTitle={video.title} />
					</Dialog>

					{/* Transcription — keeps original behavior */}
					<Dialog>
						<DialogTrigger asChild>
							<Button
								type="button"
								variant="secondary"
								className="rounded-none"
								aria-label={`Ler transcrição de ${video.title}`}
							>
								{m.read_transcript()}
							</Button>
						</DialogTrigger>

						<DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto rounded-none border-border/50 bg-background/95 backdrop-blur-xl">
							<DialogHeader>
								<DialogTitle className="text-xl font-bold tracking-tight">
									{video.title}{" "}
									<span className="text-muted-foreground font-normal">
										— {m.transcript()}
									</span>
								</DialogTitle>
							</DialogHeader>

							<div className="text-base text-muted-foreground leading-relaxed py-4 whitespace-pre-wrap">
								{video.transcription}
							</div>

							<DialogFooter>
								<DialogClose asChild>
									<Button
										type="button"
										variant="default"
										className="uppercase tracking-widest text-xs font-bold rounded-none"
									>
										{m.close()}
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
