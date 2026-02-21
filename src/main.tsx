import {
	createHashHistory,
	createRouter,
	RouterProvider,
} from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { setLocale } from "@/paraglide/runtime.js";
import { detectInitialLocale } from "./-helper";
import { routeTree } from "./routeTree.gen";

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
	const currentLocale = detectInitialLocale();
	setLocale(currentLocale);
	document.documentElement.lang = currentLocale;

	const root = ReactDOM.createRoot(rootElement);
	root.render(<RouterProvider router={router} />);
}
