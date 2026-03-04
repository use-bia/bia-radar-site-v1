import * as React from "react";
import { cn } from "@/lib/utils";

const BasicItemListContext = React.createContext<boolean>(false);

// 1. Changed to a standard Unordered List (ul)
function BasicItemList({ className, ...props }: React.ComponentProps<"ul">) {
	return (
		<BasicItemListContext.Provider value={true}>
			<ul
				data-slot="basic-item-list"
				className={cn("w-full list-none p-0 m-0", className)}
				{...props}
			/>
		</BasicItemListContext.Provider>
	);
}

// 2. The Box is now a List Item (li)
interface BasicItemBoxProps extends Omit<React.ComponentProps<"li">, "title"> {
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
		// 3. The card wrapper is natively the <li>
		<li
			data-slot="basic-item-box"
			className={cn("border bg-background text-card-foreground", className)}
			{...props}
		>
			{/* 4. Changed <dt> to a standard styling <div> */}
			<div
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

				<span className="flex items-center text-lg font-bold py-2 px-3">
					{title}
				</span>
			</div>

			{/* 5. Changed <dd> to a standard styling <div> */}
			<div className="p-4">{children}</div>
		</li>
	);
}

export { BasicItemList, BasicItemBox };
