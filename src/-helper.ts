export type AppLocale = "pt-br" | "en";

/** localStorage key holding a language the user *explicitly* chose. */
const LOCALE_STORAGE_KEY = "bia-locale";

/**
 * Returns the locale the user explicitly picked before (via the language
 * selector or the first-visit popup), or `null` if they never chose one.
 *
 * This is deliberately separate from any auto-detected value: an explicit
 * choice is always honored, but auto-detection re-runs on every visit until
 * the user makes a choice.
 */
export function getExplicitLocale(): AppLocale | null {
	try {
		const v = localStorage.getItem(LOCALE_STORAGE_KEY);
		return v === "en" || v === "pt-br" ? v : null;
	} catch {
		return null;
	}
}

/** Persists the user's explicit language choice. */
export function persistLocaleChoice(locale: AppLocale): void {
	try {
		localStorage.setItem(LOCALE_STORAGE_KEY, locale);
	} catch {
		// localStorage unavailable (private mode, etc.) — non-fatal.
	}
}

/**
 * Detects the visitor's preferred locale from the browser instead of always
 * defaulting to Brazil.
 *
 * It walks the full `navigator.languages` list (most-preferred first) and maps
 * any Portuguese variant to `pt-br` and any English variant to `en`.
 *
 * `confident` is `true` when one of the user's languages clearly matches one of
 * our supported locales. When none of them do (e.g. a Spanish or French
 * speaker), it returns `confident: false` so the UI can ask the user to pick.
 */
export function detectPreferredLocale(): {
	locale: AppLocale;
	confident: boolean;
} {
	try {
		const candidates =
			navigator.languages && navigator.languages.length > 0
				? navigator.languages
				: [navigator.language];

		for (const raw of candidates) {
			const lang = (raw || "").toLowerCase();
			if (lang.startsWith("pt")) return { locale: "pt-br", confident: true };
			if (lang.startsWith("en")) return { locale: "en", confident: true };
		}
	} catch {
		// navigator unavailable — fall through to the uncertain default
	}

	// We couldn't confidently match a supported language. Default to English
	// (the most broadly understood option) but flag that we should ask.
	return { locale: "en", confident: false };
}

/**
 * Scrolls to a section by id AND moves keyboard/screen-reader focus to it, so
 * "go to" links actually land users (and assistive tech) on the section rather
 * than only scrolling the viewport.
 */
export function scrollToAndFocus(id: string): void {
	if (typeof document === "undefined") return;

	const el = document.getElementById(id);
	if (!el) return;

	el.scrollIntoView({ behavior: "smooth", block: "start" });

	// Make the section programmatically focusable without adding it to the tab
	// order, and avoid the focus call jumping past the smooth scroll.
	if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
	el.style.outline = "none";
	el.focus({ preventScroll: true });
}

/**
 * Generates a string of Lorem Ipsum words.
 * @param count - Number of words to generate.
 */
export const generateLoremIpsum = (count = 5): string => {
	const dictionary = [
		"lorem",
		"ipsum",
		"dolor",
		"sit",
		"amet",
		"consectetur",
		"adipiscing",
		"elit",
		"sed",
		"do",
		"eiusmod",
		"tempor",
		"incididunt",
		"ut",
		"labore",
		"et",
		"dolore",
		"magna",
		"aliqua",
		"ut",
		"enim",
		"ad",
		"minim",
		"veniam",
		"quis",
		"nostrud",
		"exercitation",
		"ullamco",
		"laboris",
		"nisi",
		"ut",
		"aliquip",
		"ex",
		"ea",
		"commodo",
		"consequat",
		"duis",
		"aute",
		"irure",
		"dolor",
		"in",
		"reprehenderit",
		"in",
		"voluptate",
		"velit",
		"esse",
		"cillum",
		"dolore",
		"eu",
		"fugiat",
		"nulla",
		"pariatur",
	];

	const result = Array.from({ length: count }, () => {
		return dictionary[Math.floor(Math.random() * dictionary.length)];
	});

	const joined = result.join(" ");

	// Capitalize the first letter and add a period for a "finished" look
	return `${joined.charAt(0).toUpperCase() + joined.slice(1)}.`;
};
