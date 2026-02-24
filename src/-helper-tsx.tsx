import type { ReactNode } from "react";

export const parseFormattedText = (text: string): ReactNode => {
	// 1. Strip the <b> and <u> tags to create one continuous string for screen readers
	// Using a simpler regex that just strips opening/closing b and u tags
	const pureText = text.replace(/<\/?(?:b|u)>/g, "");

	// 2. Parse the visual content as you normally would
	// Split by either <b>...</b> OR <u>...</u>
	const parts = text.split(/(<b>.*?<\/b>|<u>.*?<\/u>)/g);

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

		if (part.startsWith("<u>") && part.endsWith("</u>")) {
			const content = part.slice(3, -4);
			return (
				// biome-ignore lint: The content is static and won't change, so using it in the key is safe.
				<u key={`underline-${content}-${index}`} className="underline">
					{content}
				</u>
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
