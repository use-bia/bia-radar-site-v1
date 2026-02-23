import { Volume2Icon } from "lucide-react";
import { type FunctionComponent, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AudioVisualizerProps {
	isPlaying: boolean;
}

const WAVE_BARS = [
	{ id: "wave-bar-1", delay: "0s", duration: "0.8s" },
	{ id: "wave-bar-2", delay: "-0.15s", duration: "1.0s" },
	{ id: "wave-bar-3", delay: "-0.3s", duration: "1.2s" },
	{ id: "wave-bar-4", delay: "-0.45s", duration: "0.8s" },
	{ id: "wave-bar-5", delay: "-0.6s", duration: "1.0s" },
];

const AudioVisualizer: FunctionComponent<AudioVisualizerProps> = ({
	isPlaying,
}) => {
	const [showRipple, setShowRipple] = useState(false);

	useEffect(() => {
		if (isPlaying) {
			setShowRipple(true);
			const timeout = setTimeout(() => setShowRipple(false), 1000);
			return () => clearTimeout(timeout);
		}
	}, [isPlaying]);

	return (
		<div
			className="relative flex items-center justify-center w-full max-w-60 aspect-square mx-auto pointer-events-none select-none"
			aria-hidden="true"
		>
			{/* The Ripple / Drop Effect */}
			{showRipple && (
				<div className="absolute inset-0 rounded-full border border-primary animate-ripple" />
			)}

			{/* The Main Circular Container */}
			<div className="relative flex items-center justify-center w-full h-full rounded-full border-4 border-border bg-background overflow-hidden">
				{/* 1. The Speaker Icon */}
				<div
					className={cn(
						"absolute transition-all duration-500 ease-in-out",
						isPlaying ? "opacity-0 scale-50" : "opacity-100 scale-100",
					)}
				>
					<Volume2Icon className="w-20 h-20 text-border" />
				</div>

				{/* 2. The Sound Waves */}
				<div
					className={cn(
						"absolute flex items-center justify-center gap-1.5 w-full h-1/3 transition-all duration-500 ease-in-out",
						isPlaying ? "opacity-100 scale-100" : "opacity-0 scale-150",
					)}
				>
					{/* 2. Map over the static array, using the explicit ID as the key */}
					{WAVE_BARS.map((bar) => (
						<div
							key={bar.id}
							className={cn(
								// 3. Changed bg-primary to bg-border
								"w-3 rounded-full bg-border transition-all duration-300",
								isPlaying ? "h-full animate-sound-wave" : "h-2",
							)}
							style={{
								animationDelay: bar.delay,
								animationDuration: bar.duration,
							}}
						/>
					))}
				</div>
			</div>

			{/* Local Keyframes for Waves and Ripple */}
			<style>{`
                @keyframes soundWave {
                    0%, 100% { transform: scaleY(0.3); }
                    50% { transform: scaleY(1); }
                }
                .animate-sound-wave {
                    animation: soundWave ease-in-out infinite;
                }
                
                @keyframes rippleEffect {
                    0% { transform: scale(1); opacity: 0.8; }
                    100% { transform: scale(1.5); opacity: 0; }
                }
                .animate-ripple {
                    animation: rippleEffect 1s cubic-bezier(0, 0, 0.2, 1) forwards;
                }
            `}</style>
		</div>
	);
};

export default AudioVisualizer;
