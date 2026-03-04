import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import { type FunctionComponent, useId } from "react";
import ActionButton from "@/components/ActionButton";
import { m } from "@/paraglide/messages";

const ComingSoon: FunctionComponent = () => {
	const headingId = useId();

	return (
		<main
			className="relative w-full min-h-[70vh] flex flex-col items-center justify-center py-16 px-4 md:py-24 bg-background overflow-hidden"
			aria-labelledby={headingId}
		>
			{/* Atmospheric radial glow */}
			<div
				className="absolute inset-0 pointer-events-none dark:opacity-[0.08] opacity-[0.05]"
				style={{
					background:
						"radial-gradient(ellipse 70% 55% at 50% 55%, var(--color-foreground), transparent 70%)",
				}}
				aria-hidden="true"
			/>

			{/* Noise texture overlay */}
			<div
				className="absolute inset-0 dark:opacity-[0.03] opacity-[0.05] pointer-events-none mix-blend-overlay"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
					backgroundSize: "128px 128px",
				}}
				aria-hidden="true"
			/>

			{/* Decorative horizontal rules - Top */}
			<div
				className="absolute top-0 left-0 right-0 h-px pointer-events-none opacity-50"
				style={{
					background:
						"linear-gradient(to right, transparent, var(--color-border), transparent)",
				}}
				aria-hidden="true"
			/>
			{/* Decorative horizontal rules - Bottom */}
			<div
				className="absolute bottom-0 left-0 right-0 h-px pointer-events-none opacity-50"
				style={{
					background:
						"linear-gradient(to right, transparent, var(--color-border), transparent)",
				}}
				aria-hidden="true"
			/>

			<div className="container relative z-10 flex flex-col items-center text-center max-w-4xl gap-0">
				{/* Eyebrow label with fading lines */}
				<div className="flex items-center gap-4 mb-10">
					<div
						className="h-px w-12 bg-linear-to-r from-transparent to-border/80"
						aria-hidden="true"
					/>
					<span
						className="uppercase text-xs font-semibold tracking-[0.35em] text-muted-foreground"
						style={{ fontVariantNumeric: "tabular-nums" }}
					>
						{m.status_in_development()}
					</span>
					<div
						className="h-px w-12 bg-linear-to-l from-transparent to-border/80"
						aria-hidden="true"
					/>
				</div>

				{/* Main headline with subtle vertical gradient sheen */}
				<h1
					id={headingId}
					className="text-[clamp(4rem,14vw,9rem)] font-black tracking-[-0.04em] uppercase leading-none mb-6 select-none bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/50"
					style={{
						fontStretch: "condensed",
					}}
				>
					{m.coming_soon()}
				</h1>

				{/* Center-weighted gradient divider */}
				<div
					className="w-24 h-0.5 mb-8 rounded-full"
					style={{
						background:
							"linear-gradient(90deg, transparent, var(--color-primary), transparent)",
					}}
					aria-hidden="true"
				/>

				{/* Subtitle */}
				<p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed mb-12">
					{m.join_the_waiting_list_and_get_a_10_percent_discount_on_your_purchase()}
				</p>

				{/* CTA */}
				<ActionButton
					icon={<ArrowRightIcon />}
					asChild
					className="group w-full sm:w-auto"
				>
					<Link
						to="/"
						hash={m.waiting_list_id()}
						aria-label={m.join_the_waiting_list()}
					>
						{m.join_the_waiting_list()}
					</Link>
				</ActionButton>

				{/* Bottom decorative counter/label */}
				<p
					className="mt-16 text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium"
					aria-hidden="true"
				>
					&mdash; {m.recognition_quote_sub()}
				</p>
			</div>
		</main>
	);
};

export default ComingSoon;
