import { Link, linkOptions } from "@tanstack/react-router";
import { AccessibilityIcon, LockIcon } from "lucide-react"; // Added LockIcon
import type { FunctionComponent } from "react";
import BiaLogo from "@/assets/bia-radar-logo.svg?react";
import ByNeosenti from "@/assets/by-neosenti.svg?react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/contexts/ThemeContext";
import { m } from "@/paraglide/messages";
import { setLocale } from "@/paraglide/runtime";
import { Button } from "./ui/button";

const options = linkOptions([
	{ to: "/", label: m.home() },
	{ to: "/technology", label: m.technology() },
	{ to: "/guides", label: m.guides() },
	{ to: "/contact", label: m.contact() },
	{ to: "/store", label: m.store() },
]);

type FooterProps = Record<string, never>;

const Footer: FunctionComponent<FooterProps> = () => {
	const { setTheme } = useTheme();

	// 1. Add the clear function
	const handleLockSite = () => {
		localStorage.removeItem("preview_auth_token");
		window.location.reload(); // Refresh to trigger the gate immediately
	};

	return (
		<footer className="w-full border-t">
			<div className="container mx-auto px-4 lg:px-8 pt-12 pb-6">
				{/* Top Layout */}
				<div className="flex flex-col sm:flex-row justify-between gap-10 sm:gap-4">
					<div className="flex flex-col items-center sm:items-start text-center sm:text-left">
						<Link
							to="/"
							activeOptions={{ exact: true }}
							aria-label={m.bia_radar_logo_alt()}
							className="space-y-2 flex flex-col items-center sm:items-start"
						>
							<BiaLogo
								aria-hidden="true"
								className="h-[0.8em] w-auto text-foreground"
							/>
							<ByNeosenti
								aria-hidden="true"
								className="h-[0.6em] w-auto text-muted-foreground"
							/>
						</Link>
						<p className="text-muted-foreground mt-4">
							{m.revolutionizing_mobility_with_new_senses()}.
							<br />
							{m.developed_proudly_in()} <strong>{m.brazil()}!</strong>
						</p>
					</div>

					<div className="flex flex-col gap-1 items-center sm:items-end">
						<a
							href="mailto:contato@neosenti.com"
							className="text-foreground underline mb-2"
						>
							contato@neosenti.com
						</a>
						{options.map(({ to, label }) => (
							<Link
								key={`footer-link-${label}`}
								to={to}
								preload="intent"
								activeOptions={{ exact: to === "/" }}
								className="uppercase text-muted-foreground hover:underline hover:text-foreground"
							>
								{label}
							</Link>
						))}
					</div>
				</div>

				{/* Bottom Layout: 1 col on xs, 2 cols on sm, 3 cols on md */}
				<div className="border-t-muted border-t grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-4 py-6 md:items-center mt-10 text-center sm:text-left">
					{/* Copyright (Column 1 on all sizes > xs) */}
					<div className="text-muted-foreground">
						&copy; {new Date().getFullYear()} Neosenti.{" "}
						{m.designed_for_dignity()}.
						<br />
						<span className="text-sm">{m.WCAG_2_1_level_AAA_compliant()}</span>
					</div>

					{/* Wrapper: Stacked on xs/sm, vanishes into grid on md */}
					<div className="flex flex-col items-center sm:items-end gap-4 md:contents">
						{/* Language Selector (Column 2 on md) */}
						<div className="w-full max-w-50 md:max-w-48 md:justify-self-center">
							<Select
								onValueChange={(value) => {
									const mappedValue = value === "en" ? "en" : "pt-br";
									setLocale(mappedValue);
								}}
							>
								<SelectTrigger
									className="w-full"
									aria-label={m.language_selector()}
								>
									<SelectValue placeholder="Língua/Language" />
								</SelectTrigger>
								<SelectContent align="center">
									<SelectGroup>
										<SelectItem value="pt-br">Português (Brasil)</SelectItem>
										<SelectItem value="en">English</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>

						{/* 2. Grouped the new Lock Site button with the Accessibility Button (Column 3 on md) */}
						<div className="flex flex-wrap items-center justify-center gap-2 md:justify-self-end">
							<Button
								variant="ghost"
								onClick={handleLockSite}
								className="text-muted-foreground underline whitespace-nowrap px-4"
								aria-label="Lock Site Preview"
							>
								<LockIcon aria-hidden="true" className="mr-2 h-4 w-4" />
								{m.lock_site()}
							</Button>

							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										className="text-muted-foreground underline whitespace-nowrap px-4"
									>
										<AccessibilityIcon
											aria-hidden="true"
											className="mr-2 h-4 w-4"
										/>
										{m.accessibility_options()}
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuGroup>
										<DropdownMenuItem onClick={() => setTheme("dark")}>
											{m.dark_theme()}
										</DropdownMenuItem>
										<DropdownMenuItem onClick={() => setTheme("light")}>
											{m.light_theme()}
										</DropdownMenuItem>
									</DropdownMenuGroup>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
