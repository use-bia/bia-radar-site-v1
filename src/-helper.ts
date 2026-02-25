export function detectInitialLocale() {
	// 1. You could check localStorage here if you let users save a preference
	// const saved = localStorage.getItem("app-locale");
	// if (saved) return saved;

	// 2. Check the browser's language (e.g., "pt-BR", "en-US")
	const browserLang = navigator.language.toLowerCase();

	// 3. If the browser is any form of Portuguese, use pt-br
	if (browserLang.startsWith("pt")) {
		return "pt-br";
	}

	// 4. Fallback for everyone else
	return "en";
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
	return joined.charAt(0).toUpperCase() + joined.slice(1) + ".";
};
