// Define the type for reuse
export type Theme = "dark" | "light" | "high-contrast";

export const getSystemTheme = (): Theme => {
	if (window.matchMedia("(prefers-contrast: more)").matches) {
		return "high-contrast";
	}

	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
};

export const applyTheme = (theme: Theme) => {
	// We only apply the 'dark' class for the specific 'dark' theme
	// to prevent CSS variable conflicts with the high-contrast block.
	document.documentElement.classList.toggle("dark", theme === "dark");

	// The data attribute drives the variables for all 3 modes
	document.documentElement.setAttribute("data-theme", theme);
};
