import { InfoIcon } from "lucide-react";
import type { FunctionComponent } from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages";
import { Button } from "./ui/button";

export type ImageBoxDetails = {
	title: string;
	value: string;
	icon: React.ReactNode;
};

export type ImageBoxImageDetails = {
	title: string;
	content: React.ReactNode;
};

interface ImageBoxComponentProps {
	details?: ImageBoxDetails[];
	imageSrc: string;
	imageAlt: string;
	imageDetails?: ImageBoxImageDetails;
	className?: string;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	imageClassName?: string;
}

const ImageBoxComponent: FunctionComponent<ImageBoxComponentProps> = ({
	details = [],
	imageSrc,
	imageAlt,
	imageDetails,
	className,
	open,
	onOpenChange,
	imageClassName = "object-cover",
}) => {
	return (
		<div
			className={cn(
				"relative backdrop-blur-xs bg-background/60 border overflow-hidden",
				className,
			)}
		>
			{/* 1. IMAGE FIRST: Read first by screen readers, but bypassed by the Tab key */}
			<img
				src={imageSrc}
				alt={imageAlt}
				className={cn("absolute inset-0 w-full h-full z-0", imageClassName)}
			/>

			{/* 2. BUTTON SECOND: Receives the first actual keyboard focus */}
			{imageDetails && (
				<div className="absolute right-0 top-0 z-10">
					<Dialog open={open} onOpenChange={onOpenChange}>
						<Tooltip>
							<TooltipTrigger asChild>
								<DialogTrigger asChild>
									<Button
										variant="outline"
										className="rounded-full m-4 bg-background/80 hover:bg-background"
										size="icon"
										aria-label={m.full_description()}
									>
										<InfoIcon className="h-4 w-4" aria-hidden="true" />
									</Button>
								</DialogTrigger>
							</TooltipTrigger>
							<TooltipContent side="left">
								<p>{m.open_full_description_of_the_image()}</p>
							</TooltipContent>
						</Tooltip>
						<DialogContent className="sm:max-w-md">
							<DialogHeader>
								<DialogTitle>{imageDetails.title}</DialogTitle>
							</DialogHeader>
							<div className="text-sm text-muted-foreground">
								{imageDetails.content}
							</div>
							<DialogFooter>
								<DialogClose asChild>
									<Button variant="default" className="uppercase font-bold">
										{m.close()}
									</Button>
								</DialogClose>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			)}

			{/* 3. DETAILS LIST LAST */}
			{details.length > 0 && (
				<div className="absolute bottom-0 z-10 w-full p-2 sm:p-4 xl:p-6">
					<dl className="flex justify-between gap-4 xl:gap-8 m-0 w-full">
						{details.map((detail) => (
							<div
								key={`image-detail-${detail.title}`}
								// 1. Changed to CSS Grid to control layout without extra <div> wrappers
								className="flex-1 border grid grid-cols-[auto_1fr] gap-x-3 p-3 xl:p-4 bg-secondary"
							>
								{/* 2. The icon becomes a decorative <dt> spanning both rows */}
								<dt
									className="col-start-1 row-span-2 flex items-center justify-center"
									aria-hidden="true"
								>
									{detail.icon}
								</dt>

								{/* 3. The Title is the actual readable <dt> */}
								<dt className="col-start-2 row-start-1 text-xs font-bold text-muted-foreground uppercase leading-none self-end pb-0.5">
									{detail.title}
								</dt>

								{/* 4. The Value is the <dd> */}
								<dd className="col-start-2 row-start-2 font-bold leading-tight self-start pt-0.5">
									{detail.value}
								</dd>
							</div>
						))}
					</dl>
				</div>
			)}
		</div>
	);
};

export default ImageBoxComponent;
