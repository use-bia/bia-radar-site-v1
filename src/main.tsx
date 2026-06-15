import {
	createHashHistory,
	createRouter,
	RouterProvider,
} from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { Toaster } from "@/components/ui/sonner";
import { setLocale } from "@/paraglide/runtime.js";
import {
	type AppLocale,
	detectPreferredLocale,
	getExplicitLocale,
} from "./-helper";
import { applyTheme } from "./-theme";
import { audioEngine } from "./audio/audioEngine";
import LanguageGate from "./components/LanguageGate";
import { ThemeProvider } from "./contexts/ThemeContext";
import { routeTree } from "./routeTree.gen";

import "@fontsource/anonymous-pro";
import { TooltipProvider } from "./components/ui/tooltip";

const storedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
const theme = storedTheme ?? "dark";
applyTheme(theme);
audioEngine.init();

const hashHistory = createHashHistory();

const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	scrollRestoration: true,
	history: hashHistory,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("app");

if (!rootElement) {
	throw new Error("Failed to find the root element with id 'app'");
}

if (!rootElement.innerHTML) {
	// Honor an explicit choice the user made before; otherwise detect from the
	// browser on every visit (so we never get stuck on a stale auto value).
	const explicitLocale = getExplicitLocale();

	let initialLocale: AppLocale;
	let showLanguagePicker = false;

	if (explicitLocale) {
		initialLocale = explicitLocale;
	} else {
		// Detect from the browser instead of forcing Brazil.
		const detected = detectPreferredLocale();
		initialLocale = detected.locale;
		// If we couldn't confidently match their language, ask them to pick.
		showLanguagePicker = !detected.confident;
	}

	// Apply + persist (cookie) without reloading — nothing is rendered yet.
	setLocale(initialLocale, { reload: false });
	// Use proper BCP-47 region tags; English content is Canadian English.
	document.documentElement.lang = initialLocale === "en" ? "en-CA" : "pt-BR";

	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<ThemeProvider>
			<TooltipProvider>
				<RouterProvider router={router} />
				<LanguageGate initialOpen={showLanguagePicker} />
				<Toaster />
			</TooltipProvider>
		</ThemeProvider>,
	);
}
