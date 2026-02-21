import { Link, linkOptions } from "@tanstack/react-router";
import { ShoppingCartIcon } from "lucide-react";
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
]);

export default function Header() {
	return (
		<header className="p-3 border-b bg-background">
			<div className="container mx-auto flex w-full justify-between items-center">
				<Link
					to="/"
					activeOptions={{ exact: true }}
					aria-label={m.bia_radar_logo_alt()}
					className="space-y-2"
				>
					<BiaLogo aria-hidden="true" className="h-[0.7em] w-auto" />
					<ByNeosenti aria-hidden="true" className="h-[0.5em] w-auto" />
				</Link>

				<div className="flex gap-12 items-center">
					{options.map(({ to, label }) => (
						<Link
							key={`header-link-${label}`}
							to={to}
							preload="intent"
							activeOptions={{ exact: to === "/" }}
							className="uppercase font-bold"
							activeProps={{
								className: "text-foreground",
								"aria-current": "page",
							}}
							inactiveProps={{
								className: "text-muted",
							}}
						>
							{label}
						</Link>
					))}
					<Link
						to="/store"
						className="bg-primary text-primary-foreground px-5 py-2 uppercase font-bold"
						activeProps={{
							"aria-current": "page",
						}}
					>
						<span>
							<ShoppingCartIcon
								className="inline-block h-4 w-4 mr-2 align-text-top"
								aria-hidden="true"
							/>
							{m.store()}
						</span>
					</Link>
				</div>
			</div>
		</header>
	);
}
