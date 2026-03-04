import { Link } from "@tanstack/react-router";
import type { FunctionComponent } from "react";
import { createSlug, type SectionType } from "./-guides-types";

interface GuidesNavigationProps {
	sections: SectionType[];
}

const GuidesNavigation: FunctionComponent<GuidesNavigationProps> = ({
	sections,
}) => {
	return (
		<aside className="w-full lg:w-1/4 lg:sticky lg:top-24 z-30 bg-background lg:bg-transparent">
			<nav
				aria-label="Navegação rápida dos guias"
				className="border border-border/50 p-6 bg-background/50 backdrop-blur-sm"
			>
				<h2 className="text-lg font-bold uppercase tracking-widest mb-6 border-b border-border/50 pb-4">
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
									className="block font-bold text-foreground hover:text-primary transition-colors mb-3"
								>
									{section.title}
								</Link>

								<ul className="flex flex-col gap-3 pl-4 border-l-2 border-border/50">
									{section.videos.map((video) => (
										<li key={`nav-video-${video.id}`}>
											<Link
												to="/guides"
												hash={video.id}
												preload="intent"
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
