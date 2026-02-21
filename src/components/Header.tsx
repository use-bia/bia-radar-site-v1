import { Link, linkOptions } from "@tanstack/react-router";
import BiaLogo from "@/assets/bia-radar-logo.svg?react";
import ByNeosenti from "@/assets/by-neosenti.svg?react";
import { m } from "@/paraglide/messages";

const options = linkOptions([
	{
		to: "/",
		label: m.home(),
	},
	{
		to: "/technology",
		label: m.technology(),
	},
	{
		to: "/guides",
		label: m.guides(),
	},
	{
		to: "/contact",
		label: m.contact(),
	},
	{
		to: "/store",
		label: m.store(),
	},
]);

export default function Header() {
	return (
		<header className="flex w-full justify-between items-center">
			<Link
				to="/"
				activeOptions={{ exact: true }}
				aria-label="BIA Radar Home"
				className="space-y-2"
			>
				<BiaLogo aria-hidden="true" className="h-4 w-auto" />
				<ByNeosenti aria-hidden="true" className="h-3 w-auto" />
			</Link>

			<div>
				{options.map(({ to, label }) => (
					<Link
						key={`header-link-${label}`}
						to={to}
						preload="intent"
						activeOptions={{ exact: to === "/" }}
						activeProps={{
							className: "text-red-500",
							"aria-current": "page",
						}}
						inactiveProps={{
							className: "text-foreground",
						}}
					>
						{label}
					</Link>
				))}
			</div>
		</header>
	);
}
