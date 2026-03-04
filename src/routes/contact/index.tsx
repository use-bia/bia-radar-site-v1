import { createFileRoute } from "@tanstack/react-router";
import { MailIcon, MessageSquareIcon, SendIcon } from "lucide-react";
import type * as React from "react";
import { useId, useRef, useState } from "react";
import { type Country, isValidPhoneNumber } from "react-phone-number-input";
import PhoneInput from "react-phone-number-input/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

function guessCountryFromBrowser(): Country | undefined {
	try {
		// @ts-expect-error
		const userLocale = navigator.language || navigator.userLanguage;
		if (userLocale?.includes("-")) {
			const region = userLocale.split("-")[1].toUpperCase();
			if (region.length === 2) return region as Country;
		}
		return undefined;
	} catch {
		return undefined;
	}
}

function getReliableDefaultCountry(locale: string): Country {
	const lowerLocale = locale.toLowerCase();
	if (lowerLocale.includes("pt-br") || lowerLocale === "pt") return "BR";
	if (lowerLocale.includes("pt-pt")) return "PT";
	return guessCountryFromBrowser() ?? "US";
}

// Screen-reader live region for status announcements
function LiveRegion({ message }: { message: string }) {
	return (
		<output aria-live="polite" aria-atomic="true" className="sr-only">
			{message}
		</output>
	);
}

export const Route = createFileRoute("/contact/")({
	component: ContactPage,
});

function ContactPage() {
	const formRef = useRef<HTMLFormElement>(null);

	const headingId = useId();
	const formHeadingId = useId();
	const formId = useId();
	const inputNameId = useId();
	const inputEmailId = useId();
	const inputPhoneId = useId();
	const inputMsgId = useId();
	const honeypotId = useId();

	const currentLocale = getLocale() ?? "pt-br";
	const isPt = currentLocale.startsWith("pt");

	const [defaultCountry] = useState<Country>(() =>
		getReliableDefaultCountry(currentLocale),
	);

	const [phone, setPhone] = useState<string | undefined>();
	const [phoneError, setPhoneError] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [statusMessage, setStatusMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (phone && !isValidPhoneNumber(phone)) {
			setPhoneError(true);
			setStatusMessage(m.phone_please_enter_a_valid_phone_number());
			document.getElementById(inputPhoneId)?.focus();
			return;
		}

		setPhoneError(false);
		setIsSubmitting(true);
		setStatusMessage(m.contact_sending_message());

		try {
			const form = e.currentTarget;
			const rawFormData = new FormData(form);
			const searchParams = new URLSearchParams();

			// Fixed: Added block braces so the callback returns void
			rawFormData.forEach((value, key) => {
				searchParams.append(key, value.toString());
			});

			searchParams.set("phone", phone || "Not provided");
			searchParams.set("type", "General Contact");
			searchParams.set("userAgent", navigator.userAgent);

			const response = await fetch(__CONTACT_API_URL__, {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Accept: "text/plain, */*",
				},
				body: searchParams.toString(),
			});

			if (!response.ok) throw new Error("Network response was not ok");
			const data = await response.text();

			if (data === "Success") {
				form.reset();
				setPhone(undefined);
				const msg = m.contact_success_message();
				setStatusMessage(msg);
				toast.success(msg);
			} else {
				const msg = m.contact_error_message();
				setStatusMessage(msg);
				toast.error(msg);
			}
		} catch (err) {
			console.error("Submission error:", err);
			const msg = m.contact_error_message();
			setStatusMessage(msg);
			toast.error(msg);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<a
				href={`#${formId}`}
				className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:font-semibold focus:shadow-lg"
			>
				{m.skip_to_contact_form()}
			</a>

			<LiveRegion message={statusMessage} />

			<main
				className="relative w-full py-12 md:py-24 xl:py-32 flex justify-center bg-background overflow-hidden"
				aria-labelledby={headingId}
			>
				<div
					className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
					style={{
						backgroundImage: `linear-gradient(to right, var(--color-foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--color-foreground) 1px, transparent 1px)`,
						backgroundSize: "32px 32px",
					}}
				/>

				{/* Reduced mobile gap to gap-8 */}
				<div className="container relative mx-auto px-4 lg:px-8 flex flex-col gap-8 md:gap-12 w-full">
					{/* Adjusted mobile padding for the header to align nicely */}
					<header className="flex flex-col items-start border-l-4 border-primary pl-4 md:pl-8">
						<h1 id={headingId} className="flex flex-col">
							<span className="uppercase tracking-[0.2em] mb-2 text-sm md:text-base">
								{m.contact_subtitle()}
							</span>
							<span className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase">
								{m.contact_title()}
							</span>
						</h1>
					</header>

					<div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-y-2 sm:border-2 border-foreground/10 shadow-xl bg-card -mx-4 sm:mx-0">
						<section
							aria-labelledby={formHeadingId}
							// Reduced padding: p-5 on mobile, scales up to p-12 on desktop
							className="lg:col-span-8 p-5 sm:p-8 md:p-12 border-b-2 lg:border-b-0 lg:border-r-2 border-foreground/10"
						>
							<h2 id={formHeadingId} className="sr-only">
								{m.contact_title()}
							</h2>

							<form id={formId} ref={formRef} onSubmit={handleSubmit}>
								<div
									style={{ position: "absolute", left: "-9999px" }}
									aria-hidden="true"
								>
									<input
										type="text"
										id={honeypotId}
										name="username"
										tabIndex={-1}
										autoComplete="off"
									/>
								</div>

								{/* Reduced gap between fields on mobile: gap-5 -> gap-8 */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
									<Field>
										<FieldLabel
											htmlFor={inputNameId}
											className="uppercase font-bold mb-2 md:mb-3"
										>
											{m.contact_input_fullname()}{" "}
											<span className="text-destructive">*</span>
										</FieldLabel>
										<Input
											id={inputNameId}
											name="name"
											required
											className="rounded-none border-2 border-muted-foreground/20 bg-muted! h-12 px-3 md:px-4 focus-visible:ring-0 focus-visible:border-primary transition-colors"
											placeholder={m.contact_input_fullname_placeholder()}
										/>
									</Field>

									<Field>
										<FieldLabel
											htmlFor={inputPhoneId}
											className="uppercase font-bold mb-2 md:mb-3"
										>
											{m.contact_input_phone()}
										</FieldLabel>
										<PhoneInput
											id={inputPhoneId}
											defaultCountry={defaultCountry}
											value={phone}
											onChange={(val) => setPhone(val)}
											inputComponent={Input}
											placeholder={
												isPt ? "+55 11 99999-9999" : "+1 (555) 000-0000"
											}
											aria-invalid={phoneError ? "true" : "false"}
											aria-describedby={
												phoneError ? `${inputPhoneId}-error` : undefined
											}
											className={cn(
												"rounded-none border-2 border-muted-foreground/20 bg-muted! h-12 px-3 md:px-4 focus-visible:ring-0 focus-visible:border-primary transition-colors",
												phoneError &&
													"border-destructive ring-destructive ring-[3px]",
											)}
										/>

										{phoneError && (
											<FieldError id={`${inputPhoneId}-error`}>
												{m.phone_please_enter_a_valid_phone_number()}
											</FieldError>
										)}
									</Field>

									<Field className="md:col-span-2">
										<FieldLabel
											htmlFor={inputEmailId}
											className="uppercase font-bold mb-2 md:mb-3"
										>
											{m.contact_input_email()}{" "}
											<span className="text-destructive">*</span>
										</FieldLabel>
										<Input
											id={inputEmailId}
											name="email"
											type="email"
											required
											className="rounded-none border-2 border-muted-foreground/20 bg-muted! h-12 px-3 md:px-4 focus-visible:ring-0 focus-visible:border-primary transition-colors"
											placeholder="email@email.com"
										/>
									</Field>

									<Field className="md:col-span-2">
										<FieldLabel
											htmlFor={inputMsgId}
											className="uppercase font-bold mb-2 md:mb-3"
										>
											{m.contact_input_message()}{" "}
											<span className="text-destructive">*</span>
										</FieldLabel>
										<Textarea
											id={inputMsgId}
											name="message"
											required
											rows={5}
											className="rounded-none border-2 border-muted-foreground/20 bg-muted! p-3 md:p-4 focus-visible:ring-0 focus-visible:border-primary resize-none transition-colors"
											placeholder={m.contact_input_message_placeholder()}
										/>
									</Field>

									<div className="md:col-span-2 pt-2">
										<Button
											type="submit"
											disabled={isSubmitting}
											className="w-full md:w-max h-14 px-8 md:px-12 rounded-none bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-bold uppercase tracking-widest transition-all active:scale-[0.98]"
										>
											{isSubmitting ? (
												<Spinner />
											) : (
												<div className="flex items-center justify-center gap-3">
													<span>{m.contact_submit_button()}</span>
													<SendIcon className="h-4 w-4" />
												</div>
											)}
										</Button>
									</div>
								</div>
							</form>
						</section>

						<aside className="lg:col-span-4 flex flex-col divide-y-2 divide-foreground/10 bg-background-secondary">
							{/* Adjusted aside padding for mobile */}
							<div className="p-6 md:p-10 space-y-3 md:space-y-4">
								<h3 className="uppercase font-bold flex items-center gap-2">
									<MessageSquareIcon className="h-4 w-4 text-primary" />
									{m.contact_quick_reply()}
								</h3>
								<p className="text-muted-foreground text-sm md:text-base leading-relaxed">
									{m.contact_quick_reply_desc()}
								</p>
							</div>

							<div className="p-6 md:p-10 space-y-3 md:space-y-4 grow">
								<h3 className="uppercase font-bold flex items-center gap-2">
									<MailIcon className="h-4 w-4 text-primary" />
									{m.contact_direct_email()}
								</h3>
								<p className="text-muted-foreground text-sm md:text-base leading-relaxed">
									{m.contact_direct_email_desc()}
								</p>
								<a
									href="mailto:contato@neosenti.com"
									className="block font-bold text-base md:text-lg hover:text-primary transition-colors underline underline-offset-4 break-all"
								>
									contato@neosenti.com
								</a>
							</div>

							<div className="p-6 md:p-8 bg-primary/5">
								<p className="text-xs md:text-sm font-black tracking-[0.3em] uppercase text-muted-foreground">
									Bia Radar
								</p>
								<p className="text-xs md:text-sm mt-1 uppercase font-medium text-muted-foreground">
									{">"} {m.recognition_quote_sub()}
								</p>
							</div>
						</aside>
					</div>
				</div>
			</main>
		</>
	);
}
