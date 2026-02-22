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
}

const ImageBoxComponent: FunctionComponent<ImageBoxComponentProps> = ({
	details = [],
	imageSrc,
	imageAlt,
	imageDetails,
	className,
	open,
	onOpenChange,
}) => {
	return (
		<div
			className={cn(
				"relative backdrop-blur-xs bg-background/60 border overflow-hidden",
				className,
			)}
		>
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
							{/* The deep description content rendered safely inside the dialog */}
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

			<img
				src={imageSrc}
				alt={imageAlt}
				className="w-full h-full object-cover"
			/>

			{details.length > 0 && (
				<div className="absolute bottom-0 w-full p-2 sm:p-4 xl:p-6">
					{/* <dl> defines the description list */}
					<dl className="flex justify-between gap-4 xl:gap-8 m-0 w-full">
						{details.map((detail) => (
							<div
								key={`image-detail-${detail.title}`}
								className="flex-1 border flex items-center gap-3 p-3 xl:p-4 bg-secondary"
							>
								<div aria-hidden="true">{detail.icon}</div>
								<div>
									<dt className="text-xs font-bold text-muted-foreground uppercase leading-none">
										{detail.title}
									</dt>
									<dd className="font-bold leading-tight">{detail.value}</dd>
								</div>
							</div>
						))}
					</dl>
				</div>
			)}
		</div>
	);
};

export default ImageBoxComponent;
