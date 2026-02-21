import { createContext, useContext, useEffect, useState } from "react";
import { audioEngine } from "@/audio/audioEngine";

type AudioSettings = {
  enabled: boolean;
  toggle: () => void;
};

const AudioSettingsContext = createContext<AudioSettings | null>(null);
const STORAGE_KEY = "audio-enabled";

export function AudioSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [enabled, setEnabled] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored !== "false";
  });

  useEffect(() => {
    audioEngine.setEnabled(enabled);
    localStorage.setItem(STORAGE_KEY, String(enabled));
  }, [enabled]);

  const toggle = () => {
    setEnabled((prev) => {
      const next = !prev;

      // 🔊 play ONLY when enabling
      if (next === true) {
        // enable engine FIRST, then play
        audioEngine.setEnabled(true);
        audioEngine.play("toggle_sound");
      }

      return next;
    });
  };

  return (
    <AudioSettingsContext.Provider value={{ enabled, toggle }}>
      {children}
    </AudioSettingsContext.Provider>
  );
}

export function useAudioSettings() {
  const ctx = useContext(AudioSettingsContext);
  if (!ctx) {
    throw new Error(
      "useAudioSettings must be used within AudioSettingsProvider",
    );
  }
  return ctx;
}
