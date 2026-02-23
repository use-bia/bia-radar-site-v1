import { SOUND_MAP, type SoundName } from "./soundMap";

class AudioEngine {
	private sounds = new Map<SoundName, HTMLAudioElement>();
	private enabled = true;
	private volume = 0.4;
	private initialized = false;

	// --- NEW: Web Audio API Fields ---
	public analyser?: AnalyserNode;
	private audioCtx?: AudioContext;
	private sourceNodes = new Map<SoundName, MediaElementAudioSourceNode>();

	init() {
		if (this.initialized) return;

		(Object.keys(SOUND_MAP) as SoundName[]).forEach((name) => {
			const rawPath = SOUND_MAP[name];
			const relativePath = rawPath.startsWith("/") ? rawPath.slice(1) : rawPath;
			const fullPath = `${import.meta.env.BASE_URL}${relativePath}`;

			const audio = new Audio(fullPath);
			audio.preload = "auto";
			audio.volume = this.volume;
			this.sounds.set(name, audio);
		});

		this.initialized = true;
	}

	getAudio(name: SoundName): HTMLAudioElement | undefined {
		return this.sounds.get(name);
	}

	play(name: SoundName) {
		if (!this.enabled) return;
		const audio = this.sounds.get(name);
		if (!audio) return;

		// --- NEW: Initialize Web Audio safely on first user interaction ---
		if (!this.audioCtx) {
			this.audioCtx = new AudioContext();
			this.analyser = this.audioCtx.createAnalyser();
			this.analyser.fftSize = 32; // Creates 16 frequency bins (perfect for 5 visual bars)
			this.analyser.connect(this.audioCtx.destination);
		}

		// Route this specific audio track into the analyzer (only needs to be done once per track)
		if (!this.sourceNodes.has(name) && this.audioCtx && this.analyser) {
			const source = this.audioCtx.createMediaElementSource(audio);
			source.connect(this.analyser);
			this.sourceNodes.set(name, source);
		}

		// Browsers pause contexts when idle; wake it up!
		if (this.audioCtx.state === "suspended") {
			this.audioCtx.resume();
		}
		// ----------------------------------------------------------------

		audio.currentTime = 0;
		audio.play().catch(() => {});
	}

	setEnabled(value: boolean) {
		this.enabled = value;
	}

	setVolume(value: number) {
		this.volume = value;
		this.sounds.forEach((a) => {
			a.volume = value;
		});
	}
}

export const audioEngine = new AudioEngine();
