import { type FunctionComponent, useState } from "react";
import { type AppLocale, persistLocaleChoice } from "@/-helper";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { getLocale, setLocale } from "@/paraglide/runtime";
import { Button } from "./ui/button";

interface LanguageGateProps {
	/** Whether to open the picker on mount (we're unsure of the user's language). */
	initialOpen?: boolean;
}

const choices: Array<{ locale: AppLocale; flag: string; label: string }> = [
	{ locale: "pt-br", flag: "🇧🇷", label: "Português (Brasil)" },
	{ locale: "en", flag: "🇨🇦", label: "English (Canada)" },
];

/**
 * Shown only when we cannot confidently detect the visitor's language.
 * Presents a flag-based picker. Choosing persists the locale (paraglide writes
 * the cookie) and reloads so the whole page renders in the chosen language.
 */
const LanguageGate: FunctionComponent<LanguageGateProps> = ({
	initialOpen = false,
}) => {
	const [open, setOpen] = useState(initialOpen);

	const choose = (locale: AppLocale) => {
		// Remember this as an explicit choice so we never ask again.
		persistLocaleChoice(locale);
		// Already on this locale → nothing to reload, just dismiss.
		if (getLocale() === locale) {
			setOpen(false);
			return;
		}
		// setLocale applies the locale and reloads the page.
		setLocale(locale);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Choose your language · Escolha seu idioma</DialogTitle>
					<DialogDescription>
						Pick the language you'd like to browse in. · Selecione o idioma que
						deseja usar.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-3 pt-2">
					{choices.map(({ locale, flag, label }) => (
						<Button
							key={locale}
							variant="outline"
							className="justify-start gap-3 py-6 text-base"
							onClick={() => choose(locale)}
						>
							<span aria-hidden="true" className="text-2xl leading-none">
								{flag}
							</span>
							{label}
						</Button>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default LanguageGate;
