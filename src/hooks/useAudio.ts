import { useCallback, useEffect, useState } from "react";
import { audioEngine } from "@/audio/audioEngine";
import type { SoundName } from "@/audio/soundMap";

export function useAudio(name: SoundName) {
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		const audio = audioEngine.getAudio(name);
		if (!audio) return;

		const handlePlay = () => setIsPlaying(true);
		const handleEnd = () => setIsPlaying(false);

		audio.addEventListener("play", handlePlay);
		audio.addEventListener("pause", handleEnd);
		audio.addEventListener("ended", handleEnd);

		return () => {
			audio.removeEventListener("play", handlePlay);
			audio.removeEventListener("pause", handleEnd);
			audio.removeEventListener("ended", handleEnd);
		};
	}, [name]);

	const play = useCallback(() => {
		audioEngine.play(name);
	}, [name]);

	// NEW: Stop method to pause and reset the audio
	const stop = useCallback(() => {
		const audio = audioEngine.getAudio(name);
		if (audio) {
			audio.pause();
			audio.currentTime = 0;
		}
	}, [name]);

	return { play, stop, isPlaying };
}
