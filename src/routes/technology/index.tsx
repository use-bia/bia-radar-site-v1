import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/technology/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/technology/"!</div>;
}
