import { createFileRoute } from "@tanstack/react-router";
import ComingSoon from "@/components/ComingSoon";

export const Route = createFileRoute("/store/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <ComingSoon />;
}
