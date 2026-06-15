import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SkipLinks from "@/components/SkipLinks";

import "../styles.css";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<div className="min-h-screen relative">
			<SkipLinks />
			<Header />
			{/* <PreviewGate> */}
			<div id="main-content" tabIndex={-1} className="outline-none">
				<Outlet />
			</div>
			{/* </PreviewGate> */}
			<Footer />
			<TanStackDevtools
				config={{
					position: "bottom-right",
				}}
				plugins={[
					{
						name: "TanStack Router",
						render: <TanStackRouterDevtoolsPanel />,
					},
				]}
			/>
		</div>
	);
}
