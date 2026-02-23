import type { ReactNode } from "react";

export const parseBold = (text: string): ReactNode => {
	// 1. Strip the <b> tags to create one continuous string for screen readers
	const pureText = text.replace(/<b>(.*?)<\/b>/g, "$1");

	// 2. Parse the visual content as you normally would
	const parts = text.split(/(<b>.*?<\/b>)/g);
	const visualContent = parts.map((part, index) => {
		if (part.startsWith("<b>") && part.endsWith("</b>")) {
			const content = part.slice(3, -4);
			return (
				// biome-ignore lint: The content is static and won't change, so using it in the key is safe.
				<strong key={`bold-${content}-${index}`} className="font-bold">
					{content}
				</strong>
			);
		}

		return part;
	});

	// 3. Serve the visual content to sighted users, and the pure text to screen readers
	return (
		<span>
			<span aria-hidden="true">{visualContent}</span>
			<span className="sr-only">{pureText}</span>
		</span>
	);
};
