import * as React from "react";
import { cn } from "@/lib/utils";

// 1. Private Context (Not exported!)
// This ensures developers can't mess with it, it's strictly for internal wiring.
const BasicItemListContext = React.createContext<boolean>(false);

// 2. The Parent List (<dl>)
// Inherits all standard HTML properties of a <dl> tag.
function BasicItemList({ className, ...props }: React.ComponentProps<"dl">) {
	return (
		<BasicItemListContext.Provider value={true}>
			<dl
				data-slot="basic-item-list"
				className={cn("w-full", className)}
				{...props}
			/>
		</BasicItemListContext.Provider>
	);
}

interface BasicItemBoxProps extends Omit<React.ComponentProps<"div">, "title"> {
	icon?: React.ReactNode;
	centerTitle?: boolean;
	title: React.ReactNode;
}

function BasicItemBox({
	className,
	icon,
	centerTitle = false,
	title,
	children,
	...props
}: BasicItemBoxProps) {
	const isInsideList = React.useContext(BasicItemListContext);
	if (!isInsideList) {
		throw new Error(
			"BasicItemBox must be used inside a <BasicItemList> component.",
		);
	}

	return (
		<div
			data-slot="basic-item-box"
			className={cn("border bg-card text-card-foreground", className)}
			{...props}
		>
			<dt
				className={cn(
					"flex items-stretch h-fit border-b bg-background-secondary",
					centerTitle ? "justify-center" : "justify-start",
				)}
			>
				{icon && (
					<div
						aria-hidden="true"
						className="flex w-12 shrink-0 items-center justify-center text-muted-foreground border-r"
					>
						{icon}
					</div>
				)}

				{/* 4. Ensure the text padding roughly matches the icon width for a balanced look */}
				<span className="flex items-center text-lg font-bold py-2 px-3">
					{title}
				</span>
			</dt>

			<dd className="p-4 ml-0 text-muted-foreground">{children}</dd>
		</div>
	);
}

export { BasicItemList, BasicItemBox };
