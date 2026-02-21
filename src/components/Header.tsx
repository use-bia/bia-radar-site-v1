import { Link, linkOptions } from "@tanstack/react-router";
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
			<Link to="/" activeOptions={{ exact: true }}>
				<div>BIA RADAR</div>
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
