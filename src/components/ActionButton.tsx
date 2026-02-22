import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export interface ActionButtonProps extends React.ComponentProps<typeof Button> {
	icon?: React.ReactNode;
	isIconAtStart?: boolean;
}

const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
	(
		{
			icon,
			isIconAtStart = false,
			children,
			className,
			asChild = false,
			...props
		},
		ref,
	) => {
		// 1. Tell TypeScript that if this is an element, its props might contain children
		const childElement = children as React.ReactElement<{
			children?: React.ReactNode;
		}>;
		const childContent =
			asChild && React.isValidElement(childElement)
				? childElement.props.children
				: children;

		// 2. Simplified animation logic: flow right only
		const IconBlock = (
			<div className="flex shrink-0 bg-primary text-primary-foreground transition-colors duration-300 h-full items-center justify-center w-10 group-hover:bg-primary/90">
				<div className="transition-all duration-300 group-hover:scale-110 group-hover:translate-x-1 [&_svg:not([class*='size-'])]:size-6">
					{icon}
				</div>
			</div>
		);

		const innerContent = (
			<>
				{isIconAtStart && icon && IconBlock}
				<div className="w-full flex px-5 items-center justify-center gap-2 font-bold">
					{childContent}
				</div>
				{!isIconAtStart && icon && IconBlock}
			</>
		);

		return (
			<Button
				variant="secondary"
				size="none"
				ref={ref}
				asChild={asChild}
				className={cn("group h-15 p-0 flex w-fit overflow-clip", className)}
				{...props}
			>
				{asChild && React.isValidElement(childElement)
					? React.cloneElement(childElement, {}, innerContent)
					: innerContent}
			</Button>
		);
	},
);

ActionButton.displayName = "ActionButton";

export default ActionButton;
