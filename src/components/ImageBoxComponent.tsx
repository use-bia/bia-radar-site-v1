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
	// Short visual description (e.g., "Close-up of the Bia Radar sensor")
	imageAlt: string;
	// The deep, long-form description goes here
	imageDetails?: ImageBoxImageDetails;
}

const ImageBoxComponent: FunctionComponent<ImageBoxComponentProps> = ({
	details = [],
	imageSrc,
	imageAlt,
	imageDetails,
}) => {
	return (
		<div className="relative w-200 aspect-square backdrop-blur-xs bg-background/60 border overflow-hidden">
			{/* The Long Description Dialog Button */}
			{imageDetails && (
				<div className="absolute right-0 top-0 z-10">
					<Dialog>
						<Tooltip>
							<TooltipTrigger asChild>
								<DialogTrigger asChild>
									<Button
										variant="outline"
										className="rounded-full m-2 bg-background/80 hover:bg-background"
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

			{/* The Image */}
			<img
				src={imageSrc}
				alt={imageAlt}
				className="w-full h-full object-cover"
			/>

			{/* Product Specifications formatted as a Definition List */}
			{details.length > 0 && (
				<div className="absolute bottom-0 z-10 w-full p-4">
					{/* <dl> defines the description list */}
					<dl className="flex justify-between gap-4 m-0 w-full">
						{details.map((detail) => (
							<div
								key={`image-detail-${detail.title}`}
								className="flex-1 border bg-background/80 backdrop-blur-md rounded-md overflow-hidden shadow-sm flex flex-col"
							>
								{/* <dt> is the term being defined (e.g., "Precision") */}
								<dt className="flex items-center gap-2 p-2 bg-muted/50 border-b font-medium text-sm">
									{detail.icon}
									{detail.title}
								</dt>
								{/* <dd> is the actual value/definition (e.g., "25mm") */}
								<dd className="p-2 font-bold text-base m-0">{detail.value}</dd>
							</div>
						))}
					</dl>
				</div>
			)}
		</div>
	);
};

export default ImageBoxComponent;
