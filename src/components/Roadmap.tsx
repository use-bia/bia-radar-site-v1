import { ChevronDown } from "lucide-react";
import type * as React from "react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

function Roadmap({ className, ...props }: React.ComponentProps<"ol">) {
	return (
		<ol
			data-slot="roadmap"
			className={cn("flex flex-col", className)}
			{...props}
		/>
	);
}

function RoadmapItem({
	className,
	isActive,
	...props
}: React.ComponentProps<"li"> & { isActive?: boolean }) {
	return (
		<li
			data-slot="roadmap-item"
			data-active={isActive ? "true" : undefined}
			className={cn("group relative flex gap-4", className)}
			{...props}
		/>
	);
}

function RoadmapIndicator({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="roadmap-indicator"
			className={cn("flex flex-col items-center justify-start pt-1", className)}
			aria-hidden="true"
			{...props}
		>
			<div
				className={cn(
					"bg-background relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-all",
					"group-data-[active=true]:bg-primary group-data-[active=true]:border-primary",
					"group-data-[active=true]:shadow-[0_0_3px_rgba(var(--primary),0.1)]",
					"dark:group-data-[active=true]:shadow-[0_0_10px_rgba(var(--primary),0.4)]",
					"group-data-[active=true]:shadow-primary",
				)}
			/>
			<div
				className={cn(
					"w-0.5 grow group-last:hidden",
					"-mt-1",
					"mb-6",
					"bg-linear-to-b from-border to-transparent",
				)}
			/>
		</div>
	);
}

interface RoadmapContentProps extends React.ComponentProps<typeof Collapsible> {
	expandedDefault?: boolean;
}

function RoadmapContent({
	className,
	expandedDefault,
	...props
}: RoadmapContentProps) {
	return (
		<Collapsible
			data-slot="roadmap-content"
			defaultOpen={expandedDefault}
			className={cn("flex flex-col pb-14 pt-2", className)}
			{...props}
		/>
	);
}

function RoadmapTitle({
	className,
	children,
	...props
}: React.ComponentProps<"button">) {
	return (
		<h3 className="m-0 text-lg font-bold leading-tight">
			<CollapsibleTrigger asChild>
				<button
					data-slot="roadmap-title"
					className={cn(
						// Changed to justify-start and gap-2 so the chevron hugs the text
						"group/trigger flex w-full items-start justify-start gap-2 text-left text-muted-foreground transition-all cursor-pointer",
						"hover:text-foreground",
						"group-data-[active=true]:text-foreground group-data-[active=true]:hover:opacity-70",
						"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
						className,
					)}
					{...props}
				>
					{/* Removed flex-1 here so the text only takes the space it needs */}
					<span>{children}</span>
					{/* Increased duration to 300ms */}
					<ChevronDown className="mt-0.5 h-5 w-5 shrink-0 transition-transform duration-300 group-data-[state=open]/trigger:rotate-180" />
				</button>
			</CollapsibleTrigger>
		</h3>
	);
}

function RoadmapDescription({
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		// Added the animation classes and overflow-hidden to the content wrapper
		<CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
			<p
				data-slot="roadmap-description"
				className={cn(
					"text-muted-foreground group-data-[active=true]:text-foreground mt-2 font-medium",
					className,
				)}
				{...props}
			/>
		</CollapsibleContent>
	);
}

export {
	Roadmap,
	RoadmapItem,
	RoadmapIndicator,
	RoadmapContent,
	RoadmapTitle,
	RoadmapDescription,
};
