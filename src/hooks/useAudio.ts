import { useCallback } from "react";
import { audioEngine } from "@/audio/audioEngine";
import type { SoundName } from "@/audio/soundMap";

export function useAudio(name: SoundName) {
  return useCallback(() => {
    audioEngine.play(name);
  }, [name]);
}
