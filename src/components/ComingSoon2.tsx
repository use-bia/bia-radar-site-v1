import { Link } from "@tanstack/react-router";
import { ArrowRightIcon, HammerIcon } from "lucide-react";
import { type FunctionComponent, useId } from "react";
import ActionButton from "@/components/ActionButton";
import { m } from "@/paraglide/messages";

const ComingSoon2: FunctionComponent = () => {
	const headingId = useId();

	return (
		<main
			className="relative w-full min-h-[70vh] flex flex-col items-center justify-center py-16 px-4 md:py-24 bg-background overflow-hidden"
			aria-labelledby={headingId}
		>
			{/* Ambient Background Glow (Optional, adds a subtle highlight behind the content) */}
			<div
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"
				aria-hidden="true"
			/>

			{/* Subtle Grid Background Pattern with Radial Fade */}
			<div
				className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] pointer-events-none"
				style={{
					backgroundImage: `linear-gradient(to right, var(--color-foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--color-foreground) 1px, transparent 1px)`,
					backgroundSize: "32px 32px",
					maskImage:
						"radial-gradient(ellipse at center, black 40%, transparent 80%)",
					WebkitMaskImage:
						"radial-gradient(ellipse at center, black 40%, transparent 80%)",
				}}
				aria-hidden="true"
			/>

			<div className="container relative z-10 flex flex-col items-center text-center max-w-2xl gap-8">
				{/* Icon Container - Softer, rounded look with subtle border */}
				<div className="relative flex items-center justify-center w-20 h-20 bg-muted/30 backdrop-blur-sm border border-border/60 rounded-2xl shadow-sm">
					<HammerIcon
						className="w-8 h-8 text-foreground/80"
						aria-hidden="true"
					/>
					{/* Optional: Add a subtle ping animation to draw the eye */}
					<div className="absolute inset-0 rounded-2xl ring-1 ring-primary/20 animate-pulse" />
				</div>

				<h1 id={headingId} className="flex flex-col items-center gap-4">
					{/* Badge style for the top text */}
					<span className="inline-flex items-center px-3 py-1 rounded-full bg-muted/50 border border-border/50 text-muted-foreground text-xs md:text-sm font-semibold tracking-widest uppercase">
						{m.coming_soon()}
					</span>

					{/* Gradient applied to the main heading */}
					<span className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight uppercase bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
						Em Breve
					</span>
				</h1>

				<p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
					{m.join_the_waiting_list_and_get_a_10_percent_discount_on_your_purchase()}
				</p>

				<div className="mt-4 flex justify-center w-full">
					<ActionButton
						icon={
							<ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
						}
						asChild
						className="group w-full sm:w-auto shadow-md hover:shadow-lg transition-all"
					>
						<Link
							to="/"
							hash={m.waiting_list_id()}
							aria-label={m.join_the_waiting_list()}
						>
							{m.join_the_waiting_list()}
						</Link>
					</ActionButton>
				</div>
			</div>
		</main>
	);
};

export default ComingSoon2;
