import { Link, linkOptions } from "@tanstack/react-router";
import { Menu, ShoppingCartIcon } from "lucide-react";
import BiaLogo from "@/assets/bia-radar-logo.svg?react";
import ByNeosenti from "@/assets/by-neosenti.svg?react";
// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "@/components/ui/sheet";
import { m } from "@/paraglide/messages";

const options = linkOptions([
	{ to: "/", label: m.home() },
	{ to: "/technology", label: m.technology() },
	{ to: "/guides", label: m.guides() },
	{ to: "/contact", label: m.contact() },
]);

export default function Header() {
	return (
		<header className="border-b border-border bg-background">
			{/* Standardized padding to match the footer */}
			<div className="container mx-auto px-4 py-3 flex w-full justify-between items-center">
				{/* Logo Section */}
				<Link
					to="/"
					activeOptions={{ exact: true }}
					aria-label={m.bia_radar_logo_alt()}
					className="space-y-2 flex flex-col items-start"
				>
					<BiaLogo
						aria-hidden="true"
						className="h-[0.7em] w-auto text-foreground"
					/>
					<ByNeosenti
						aria-hidden="true"
						className="h-[0.5em] w-auto text-muted-foreground"
					/>
				</Link>

				{/* ========================================= */}
				{/* DESKTOP NAVIGATION (Hidden on sm and xs)  */}
				{/* ========================================= */}
				<div className="hidden md:flex gap-6 lg:gap-12 items-center">
					{options.map(({ to, label }) => (
						<Link
							key={`desktop-header-link-${label}`}
							to={to}
							preload="intent"
							activeOptions={{ exact: to === "/" }}
							className="uppercase font-bold"
							activeProps={{
								className: "text-foreground",
								"aria-current": "page",
							}}
							inactiveProps={{
								className:
									"text-muted-foreground hover:text-foreground transition-colors",
							}}
						>
							{label}
						</Link>
					))}
					<Link
						to="/store"
						className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-5 py-2 uppercase font-bold"
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

				{/* ========================================= */}
				{/* MOBILE NAVIGATION (Hidden on md and lg)   */}
				{/* ========================================= */}
				<div className="flex md:hidden">
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" aria-label={m.open_menu()}>
								<Menu className="h-6 w-6" aria-hidden="true" />
							</Button>
						</SheetTrigger>

						{/* Added 'flex flex-col' to the SheetContent to allow internal vertical distribution */}
						<SheetContent side="right" className="flex flex-col">
							{/* Wrapper that takes up the full height */}
							<div className="flex flex-col flex-1 mt-12">
								{/* Semantic <nav> wrapper with improved touch targets */}
								<nav className="flex flex-col gap-2">
									{options.map(({ to, label }) => (
										<SheetClose asChild key={`mobile-header-link-${label}`}>
											<Link
												to={to}
												preload="intent"
												activeOptions={{ exact: to === "/" }}
												className="px-4 py-3 uppercase font-bold text-sm tracking-wider transition-colors flex items-center"
												activeProps={{
													// Active state gets a subtle background highlight
													className: "bg-primary/10 text-primary",
													"aria-current": "page",
												}}
												inactiveProps={{
													// Inactive state gets a standard hover effect
													className:
														"text-muted-foreground hover:bg-muted hover:text-foreground",
												}}
											>
												{label}
											</Link>
										</SheetClose>
									))}

									{/* mt-auto pushes this entire block to the bottom of the mobile drawer */}
									<div className="py-4">
										<div className="border-t border-border" />
										<div className="p-4">
											<SheetClose asChild>
												<Link
													to="/store"
													className="flex items-center justify-center w-full bg-primary text-primary-foreground px-5 py-4 uppercase font-bold text-sm tracking-wider shadow-sm transition-opacity hover:opacity-90"
													activeProps={{
														"aria-current": "page",
													}}
												>
													<ShoppingCartIcon
														className="h-5 w-5 mr-2"
														aria-hidden="true"
													/>
													{m.store()}
												</Link>
											</SheetClose>
										</div>
									</div>
								</nav>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
