import { Link } from "@tanstack/react-router";
import type { FunctionComponent } from "react";
import { createSlug, type SectionType } from "./-guides-types";

interface GuidesNavigationProps {
	sections: SectionType[];
}

const GuidesNavigation: FunctionComponent<GuidesNavigationProps> = ({
	sections,
}) => {
	const handleFocus = (id: string) => {
		setTimeout(() => {
			const element = document.getElementById(id);
			if (element) {
				element.focus({ preventScroll: true });
			}
		}, 50);
	};

	return (
		<aside className="w-full md:w-1/3 lg:w-1/4 md:sticky md:top-24 z-30 bg-background md:bg-transparent">
			<nav
				aria-label="Navegação rápida dos guias"
				className="p-6 bg-background/50 backdrop-blur-sm md:text-right"
			>
				<h2 className="text-lg text-muted-foreground uppercase tracking-widest pb-4">
					Índice
				</h2>

				<ul className="flex flex-col gap-6">
					{sections.map((section) => {
						const sectionSlug = createSlug(section.title);
						return (
							<li key={`nav-section-${sectionSlug}`}>
								<Link
									to="/guides"
									hash={sectionSlug}
									preload="intent"
									onClick={() => handleFocus(sectionSlug)}
									className="block font-bold text-foreground hover:text-primary transition-colors mb-3"
								>
									{section.title}
								</Link>

								<ul className="flex flex-col gap-3 pl-4 border-l-2 md:pl-0 md:border-l-0 md:pr-4 md:border-r-2 border-border/50">
									{section.videos.map((video) => (
										<li key={`nav-video-${video.id}`}>
											<Link
												to="/guides"
												hash={video.id}
												preload="intent"
												onClick={() => handleFocus(video.id)}
												className="block text-sm text-muted-foreground hover:text-foreground hover:underline transition-all"
											>
												{video.title}
											</Link>
										</li>
									))}
								</ul>
							</li>
						);
					})}
				</ul>
			</nav>
		</aside>
	);
};

export default GuidesNavigation;
