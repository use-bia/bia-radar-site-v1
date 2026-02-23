export const SOUND_MAP = {
	bia_introduction_portuguese: "/sounds/dublagem_oi_bia.mp3",
	bia_introduction_english: "/sounds/drop_003.m4a",
	toggle_sound: "/sounds/drop_003.m4a",
} as const;

export type SoundName = keyof typeof SOUND_MAP;
