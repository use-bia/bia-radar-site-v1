import type * as React from "react";
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
			// pt-1 keeps the ball aligned with the first line of text
			className={cn("flex flex-col items-center justify-start pt-1", className)}
			aria-hidden="true"
			{...props}
		>
			{/* The Dot with Static Glow */}
			<div
				className={cn(
					"bg-background relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-all",
					"group-data-[active=true]:bg-primary group-data-[active=true]:border-primary",
					"group-data-[active=true]:shadow-[0_0_3px_rgba(var(--primary),0.1)]", // Light mode: tighter, fainter
					"dark:group-data-[active=true]:shadow-[0_0_10px_rgba(var(--primary),0.4)]", // Dark mode: larger, stronger
					"group-data-[active=true]:shadow-primary",
				)}
			/>

			{/* The Fading Line */}
			<div
				className={cn(
					"w-0.5 grow group-last:hidden",
					// -mt-1 tucks the line behind the ball so they seamlessly touch
					"-mt-1",
					// mb-6 ensures the line stops fading out before hitting the next item's ball
					"mb-6",
					// Gradient fades from border to transparent
					"bg-linear-to-b from-border to-transparent",
				)}
			/>
		</div>
	);
}

function RoadmapContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="roadmap-content"
			// Increased to pb-14 to force the line to stretch longer past the text
			className={cn("flex flex-col pb-14 pt-2", className)}
			{...props}
		/>
	);
}

function RoadmapTitle({ className, ...props }: React.ComponentProps<"h3">) {
	return (
		<h3
			data-slot="roadmap-title"
			className={cn(
				"text-muted-foreground group-data-[active=true]:text-foreground text-lg font-bold leading-none",
				className,
			)}
			{...props}
		/>
	);
}

function RoadmapDescription({
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p
			data-slot="roadmap-description"
			className={cn(
				"text-muted-foreground group-data-[active=true]:text-foreground mt-2 font-medium",
				className,
			)}
			{...props}
		/>
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
