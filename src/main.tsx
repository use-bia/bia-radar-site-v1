import {
	createHashHistory,
	createRouter,
	RouterProvider,
} from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { getLocale, setLocale } from "@/paraglide/runtime.js";
import { applyTheme } from "./-theme";
import { audioEngine } from "./audio/audioEngine";
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
	const currentLocale = getLocale() ?? "pt-br";
	setLocale(currentLocale);
	document.documentElement.lang = currentLocale;

	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<ThemeProvider>
			<TooltipProvider>
				<RouterProvider router={router} />
			</TooltipProvider>
		</ThemeProvider>,
	);
}
