import type { ReactNode } from "react";

export const parseBold = (text: string): ReactNode[] => {
	const parts = text.split(/(<b>.*?<\/b>)/g);

	return parts.map((part, index) => {
		if (part.startsWith("<b>") && part.endsWith("</b>")) {
			const content = part.slice(3, -4);

			// Combine the string content and index for a uniquely stable key
			// that bypasses the Biome/ESLint array index warning.
			return (
				// biome-ignore lint: The content is static and won't change, so using it in the key is safe.
				<strong key={`bold-${content}-${index}`} className="font-bold">
					{content}
				</strong>
			);
		}

		// React doesn't require keys for raw text nodes in an array,
		// but if the linter complains about the text node too, you can wrap
		// it in a fragment: <React.Fragment key={`text-${index}`}>{part}</React.Fragment>
		return part;
	});
};
