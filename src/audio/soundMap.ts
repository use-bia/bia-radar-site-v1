export const SOUND_MAP = {
	toggle_theme: "/sounds/switch26.m4a",
	toggle_sound: "/sounds/switch26.m4a",
	switch_tabs: "/sounds/drop_003.m4a",
	download_app: "/sounds/confirmation_002.m4a",
	device_connected: "/sounds/confirmation_002.m4a",
	open_dialog: "/sounds/maximize_008.m4a",
	close_dialog: "/sounds/minimize_008.m4a",
} as const;

export type SoundName = keyof typeof SOUND_MAP;
