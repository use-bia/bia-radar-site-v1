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
