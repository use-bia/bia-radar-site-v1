import { generateLoremIpsum } from "@/-helper";

export type VideoType = {
	id: string;
	title: string;
	description: string;
	duration: string;
	thumb: string;
	transcription: string;
};

export type SectionType = {
	title: string;
	videos: VideoType[];
};

export const VIDEOS: SectionType[] = [
	{
		title: "Configurações Iniciais",
		videos: [
			{
				id: "b1",
				title: "Unboxing & Montagem",
				description: "O que vem na caixa e como preparar seu dispositivo.",
				duration: "1:20",
				thumb:
					"https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=60",
				transcription: generateLoremIpsum(100),
			},
			{
				id: "b2",
				title: "Primeira Carga",
				description: "Cuidados essenciais com a bateria.",
				duration: "0:45",
				thumb:
					"https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=60",
				transcription: generateLoremIpsum(100),
			},
			{
				id: "b3",
				title: "Configuração Inicial",
				description: "Conectando ao app e primeiros passos.",
				duration: "2:10",
				thumb:
					"https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=800&q=60",
				transcription: generateLoremIpsum(100),
			},
		],
	},
	{
		title: "Funcionalidades Avançadas",
		videos: [
			{
				id: "a1",
				title: "Instalação da Luz",
				description: "Como acoplar o módulo de luz noturna.",
				duration: "1:45",
				thumb:
					"https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=60",
				transcription: generateLoremIpsum(100),
			},
			{
				id: "a2",
				title: "Feedback Tátil",
				description: "Entendendo os padrões de vibração.",
				duration: "2:30",
				thumb:
					"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=60",
				transcription: generateLoremIpsum(100),
			},
		],
	},
];

// Helper to create URL-safe IDs
export const createSlug = (text: string) =>
	text
		.toLowerCase()
		.replace(/[\s_]+/g, "-")
		.replace(/[^\w-]+/g, "");
