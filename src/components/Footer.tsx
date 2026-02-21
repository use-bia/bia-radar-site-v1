import { AccessibilityIcon } from "lucide-react";
import type { FunctionComponent } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
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

type FooterProps = {};

const Footer: FunctionComponent<FooterProps> = () => {
	const { setTheme } = useTheme();

	return (
		<footer className="w-full border-t">
			<div className="container mx-auto">
				<div>BIA RADAR</div>
				<div className="border-t-border/50 border-t grid grid-cols-3 py-4 items-center">
					<div className="text-muted-foreground">
						&copy; {new Date().getFullYear()} Neosenti.{" "}
						{m.designed_for_dignity()}.
						<br />
						<span>{m.WCAG_2_1_level_AAA_compliant()}</span>
					</div>
					<div className="justify-self-center">
						<Select
							onValueChange={(value) => {
								const mappedValue = value === "en" ? "en" : "pt-br";
								setLocale(mappedValue);
							}}
						>
							<SelectTrigger
								className="w-full max-w-48"
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
					<div className="justify-self-end">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="text-muted-foreground underline"
									size="lg"
								>
									<AccessibilityIcon aria-hidden="true" />
									{m.accessibility_options()}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuGroup>
									<DropdownMenuLabel>My Account</DropdownMenuLabel>
									<DropdownMenuItem onClick={() => setTheme("dark")}>
										{m.dark_theme()}
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => setTheme("light")}>
										{m.light_theme()}
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuGroup>
									<DropdownMenuSeparator />
									<DropdownMenuItem>Team</DropdownMenuItem>
									<DropdownMenuItem>Subscription</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
