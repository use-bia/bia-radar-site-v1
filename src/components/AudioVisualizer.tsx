import { Volume2Icon } from "lucide-react";
import { type FunctionComponent, useEffect, useRef } from "react";
import { audioEngine } from "@/audio/audioEngine";
import { cn } from "@/lib/utils";

interface AudioVisualizerProps {
	isPlaying: boolean;
	playTrigger: number;
}

// We select 5 specific frequency bins out of the 16 available (from low pitch to high pitch)
const BINS = [0, 2, 4, 6, 10];

const AudioVisualizer: FunctionComponent<AudioVisualizerProps> = ({
	isPlaying,
	playTrigger,
}) => {
	const barRefs = useRef<(HTMLDivElement | null)[]>([]);

	// Notice: The messy ripple useEffect is completely gone!

	useEffect(() => {
		if (!isPlaying) {
			barRefs.current.forEach((bar) => {
				if (bar) bar.style.transform = "scaleY(0.2)";
			});
			return;
		}

		let animationFrameId: number;

		const updateVisualizer = () => {
			if (audioEngine.analyser) {
				const dataArray = new Uint8Array(
					audioEngine.analyser.frequencyBinCount,
				);
				audioEngine.analyser.getByteFrequencyData(dataArray);

				BINS.forEach((binIndex, i) => {
					const value = dataArray[binIndex] || 0;
					const scale = Math.max(0.2, value / 255);

					if (barRefs.current[i]) {
						barRefs.current[i].style.transform = `scaleY(${scale})`;
					}
				});
			}
			animationFrameId = requestAnimationFrame(updateVisualizer);
		};

		updateVisualizer();

		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	}, [isPlaying]);

	return (
		<div
			className="relative flex items-center justify-center w-full max-w-60 aspect-square mx-auto pointer-events-none select-none"
			aria-hidden="true"
		>
			{/* 2. The Ripple: Uses the playTrigger as a unique key to force a restart */}
			{isPlaying && playTrigger > 0 && (
				<div
					key={`ripple-${playTrigger}`}
					className="absolute inset-0 rounded-full border border-primary animate-ripple"
				/>
			)}

			{/* The Main Circular Container */}
			<div className="relative flex items-center justify-center w-full h-full rounded-full border-4 border-border bg-background overflow-hidden">
				<div
					className={cn(
						"absolute transition-all duration-500 ease-in-out",
						isPlaying ? "opacity-0 scale-50" : "opacity-100 scale-100",
					)}
				>
					<Volume2Icon className="w-20 h-20 text-border" />
				</div>

				<div
					className={cn(
						"absolute flex items-center justify-center gap-1.5 w-full h-1/3 transition-all duration-500 ease-in-out",
						isPlaying ? "opacity-100 scale-100" : "opacity-0 scale-150",
					)}
				>
					{BINS.map((binIndex, i) => (
						<div
							key={`wave-bar-${binIndex}`}
							ref={(el) => {
								barRefs.current[i] = el;
							}}
							className="w-3 rounded-full bg-border h-full"
							style={{
								transform: "scaleY(0.2)",
								transition: "transform 50ms ease-out",
							}}
						/>
					))}
				</div>
			</div>

			<style>{`
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
