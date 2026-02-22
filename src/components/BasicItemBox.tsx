import * as React from "react";
import { cn } from "@/lib/utils";

const BasicItemListContext = React.createContext<boolean>(false);

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
			className={cn("border bg-background text-card-foreground", className)}
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

				<span className="flex items-center text-lg font-bold py-2 px-3">
					{title}
				</span>
			</dt>

			<dd className="p-4 ml-0">{children}</dd>
		</div>
	);
}

export { BasicItemList, BasicItemBox };
