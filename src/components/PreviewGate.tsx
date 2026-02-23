import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input"; // shadcn input
import { m } from "@/paraglide/messages";

interface PreviewGateProps {
	children: React.ReactNode;
}

const PASSWORD = "12345";
const EXPIRATION_TIME_MS = 30 * 60 * 1000;
const STORAGE_KEY = "preview_auth_token";

export default function PreviewGate({ children }: PreviewGateProps) {
	const [isUnlocked, setIsUnlocked] = useState(false);
	const [password, setPassword] = useState("");
	const [isChecking, setIsChecking] = useState(true);

	useEffect(() => {
		const checkAuth = () => {
			const storedData = localStorage.getItem(STORAGE_KEY);
			if (storedData) {
				try {
					const { expiresAt } = JSON.parse(storedData);
					if (Date.now() < expiresAt) {
						setIsUnlocked(true);
					} else {
						// Token expired
						localStorage.removeItem(STORAGE_KEY);
					}
				} catch (_) {
					localStorage.removeItem(STORAGE_KEY);
				}
			}
			setIsChecking(false);
		};

		checkAuth();
	}, []);

	const handleCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setPassword(val);

		if (val === PASSWORD) {
			setIsUnlocked(true);
			// Save current time + 30 minutes to local storage
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({ expiresAt: Date.now() + EXPIRATION_TIME_MS }),
			);
		}
	};

	// Don't render anything while checking local storage to prevent UI flashing
	if (isChecking) {
		return null;
	}

	// If unlocked, render the actual website
	if (isUnlocked) {
		return <>{children}</>;
	}

	// If locked, render ONLY the password screen. The rest of the app is omitted from the DOM.
	return (
		<div className="min-h-screen bg-background flex items-center justify-center p-4">
			<div className="w-full max-w-sm p-10 border bg-card text-card-foreground shadow-2xl rounded-3xl text-center">
				<div className="mb-6 space-y-2">
					<h2 className="text-3xl font-bold tracking-tight">
						{m.preview_title()}
					</h2>
					<p className="text-sm text-muted-foreground">
						{m.preview_description()}.
					</p>
				</div>

				<Input
					type="password"
					placeholder={m.preview_input_placeholder()}
					value={password}
					onChange={handleCheckPassword}
					autoFocus
					className="text-center text-xl h-14 bg-background border-2 focus-visible:ring-primary"
				/>

				<p className="mt-8 text-xs uppercase tracking-widest text-muted-foreground font-medium">
					{m.authorized_personnel_only()}
				</p>
			</div>
		</div>
	);
}
