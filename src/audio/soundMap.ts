export const SOUND_MAP = {
	bia_introduction_portuguese: "/sounds/confirmation_002.m4a",
	bia_introduction_english: "/sounds/drop_003.m4a",
} as const;

export type SoundName = keyof typeof SOUND_MAP;
