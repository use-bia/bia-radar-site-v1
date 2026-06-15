import { useRouterState } from "@tanstack/react-router";
import type { FunctionComponent } from "react";
import { scrollToAndFocus } from "@/-helper";
import { m } from "@/paraglide/messages";

/**
 * "Skip links" — visually hidden links that become visible when focused with
 * the keyboard. They let screen-reader and keyboard users jump straight to the
 * main content, the sign-up section, or the accessibility options instead of
 * tabbing through the whole header every time.
 *
 * They are the first focusable elements on the page, which is the WCAG-expected
 * placement (Bypass Blocks, 2.4.1).
 */
const linkClass =
	"sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] " +
	"focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground " +
	"focus:font-bold focus:uppercase focus:shadow-lg focus:ring-2 " +
	"focus:ring-ring focus:outline-none";

const SkipLinks: FunctionComponent = () => {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const isHome = pathname === "/";

	return (
		<nav aria-label={m.skip_links_label()}>
			<button
				type="button"
				className={linkClass}
				onClick={() => scrollToAndFocus("main-content")}
			>
				{m.skip_to_main_content()}
			</button>

			{isHome && (
				<button
					type="button"
					className={linkClass}
					onClick={() => scrollToAndFocus(m.waiting_list_id())}
				>
					{m.skip_to_sign_up()}
				</button>
			)}

			<button
				type="button"
				className={linkClass}
				onClick={() => scrollToAndFocus("accessibility-options")}
			>
				{m.skip_to_accessibility()}
			</button>
		</nav>
	);
};

export default SkipLinks;
