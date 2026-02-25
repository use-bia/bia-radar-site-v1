import type * as React from "react";
import { type FunctionComponent, useId, useState } from "react";

// 1. Import the utility function from the base library
import { type Country, isValidPhoneNumber } from "react-phone-number-input";
import enLabels from "react-phone-number-input/locale/en.json";
import ptLabels from "react-phone-number-input/locale/pt.json";
import { toast } from "sonner";
import { parseFormattedText } from "@/-helper-tsx";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
// Add FieldError to the imports here!
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
// 2. Import your brand new custom Shadcn PhoneInput component
import { PhoneInput } from "@/components/ui/phone-input";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

function guessCountryFromBrowser(): Country | undefined {
	try {
		// e.g., returns "en-US", "pt-BR", "es-MX", or just "en"
		const userLocale = navigator.language || (navigator as any).userLanguage;

		if (userLocale && userLocale.includes("-")) {
			// Split "pt-BR" into ["pt", "BR"] and grab the "BR"
			const region = userLocale.split("-")[1].toUpperCase();

			// Ensure it looks like a valid 2-letter ISO code
			if (region.length === 2) {
				return region as Country;
			}
		}
		return undefined; // If we can't guess, return undefined so the fallback takes over
	} catch {
		return undefined;
	}
}

type SectionWaitingListProps = Record<string, never>;

const SectionWaitingList: FunctionComponent<SectionWaitingListProps> = () => {
	const headingId = useId();
	const inputNameId = useId();
	const inputEmailId = useId();
	const inputPhoneId = useId();
	const inputDistributorId = useId();
	const honeypotId = useId();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<
		"idle" | "success" | "error"
	>("idle");

	const [phone, setPhone] = useState<string | undefined>();
	const [phoneError, setPhoneError] = useState(false);
	const [defaultCountry, _] = useState<Country>(
		guessCountryFromBrowser() ?? "US",
	);

	const currentLocale = getLocale() ?? "pt-br";
	const isPt = currentLocale.startsWith("pt");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (phone && !isValidPhoneNumber(phone)) {
			setPhoneError(true);
			// We still keep this! Moving focus to the error is the gold standard.
			document.getElementById(inputPhoneId)?.focus();
			return;
		}

		setPhoneError(false);
		setIsSubmitting(true);

		// We can remove setSubmitStatus entirely from your state!

		try {
			const form = event.currentTarget;
			const formData = new URLSearchParams();

			// ... (keep your existing formData mapping here) ...

			const urlEncodedData = formData.toString();

			const response = await fetch(__CONTACT_API_URL__, {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Accept: "text/plain, */*",
				},
				body: urlEncodedData,
			});

			if (!response.ok) throw new Error("Network response was not ok");

			const data = await response.text();

			if (data === "Success") {
				form.reset();
				setPhone(undefined);

				// 1. Fire the accessible toast
				toast.success(m.waiting_list_success_message());

				// 2. Move focus back to the heading so the screen reader user
				// isn't lost at the bottom of an empty form.
				const headingEl = document.getElementById(headingId);
				if (headingEl) {
					headingEl.tabIndex = -1; // Makes non-focusable elements focusable via JS
					headingEl.focus();
				}
			} else {
				toast.error(m.waiting_list_error_message());
			}
		} catch (error) {
			console.error("Submission error:", error);
			toast.error(m.waiting_list_error_message());
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section
			id={m.waiting_list_id()}
			aria-labelledby={headingId}
			className="w-full flex py-12 justify-center bg-secondary"
		>
			<div className="container mx-auto px-4 lg:px-8 flex flex-col gap-8">
				<h2 id={headingId} className="flex flex-col text-center">
					<span className="uppercase text-muted-foreground text-base font-normal">
						{m.waiting_list()}
						<span className="sr-only">:</span>
					</span>
					<span className="text-3xl md:text-4xl xl:text-5xl font-bold">
						{m.waiting_list_title()}!
					</span>
				</h2>

				<p className="text-center max-w-2xl mx-auto">
					{parseFormattedText(m.waiting_list_description())}.
				</p>

				<div className="w-full max-w-xl mx-auto">
					<form onSubmit={handleSubmit}>
						<FieldGroup>
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

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<Field aria-required>
									<FieldLabel htmlFor={inputNameId}>
										{m.waiting_list_input_fullname()}{" "}
										<span className="text-destructive">*</span>
									</FieldLabel>
									<Input
										id={inputNameId}
										name="name"
										autoComplete="off"
										required
										placeholder={m.waiting_list_input_fullname_placeholder()}
										className="bg-background! py-6 px-4 text-base!"
									/>
								</Field>
								<Field>
									<FieldLabel htmlFor={inputPhoneId}>
										{m.waiting_list_input_phone()}
									</FieldLabel>

									<PhoneInput
										id={inputPhoneId}
										defaultCountry={defaultCountry}
										value={phone}
										onChange={setPhone}
										// Added aria attributes for invalid state and description
										aria-invalid={phoneError ? "true" : "false"}
										aria-describedby={
											phoneError ? `${inputPhoneId}-error` : undefined
										}
										className={cn(
											"bg-background",
											phoneError
												? "ring-destructive/20 border-destructive ring-[3px]"
												: "",
										)}
										labels={isPt ? ptLabels : enLabels}
										searchPlaceholder={
											isPt ? "Buscar país..." : "Search country..."
										}
										emptyMessage={
											isPt ? "Nenhum país encontrado." : "No country found."
										}
									/>

									{/* Swapped standard <p> for your highly accessible FieldError */}
									{phoneError && (
										<FieldError id={`${inputPhoneId}-error`}>
											Please enter a valid phone number.
										</FieldError>
									)}
								</Field>
							</div>

							<Field aria-required className="mt-2">
								<FieldLabel htmlFor={inputEmailId}>
									{m.waiting_list_input_email()}{" "}
									<span className="text-destructive">*</span>
								</FieldLabel>
								<Input
									id={inputEmailId}
									name="email"
									type="email"
									autoComplete="on"
									required
									placeholder={m.waiting_list_input_email_placeholder()}
									className="bg-background! py-6 px-4 text-base!"
								/>
							</Field>

							<Field orientation="horizontal" className="mt-2">
								<Checkbox id={inputDistributorId} name="supplier" />
								<FieldLabel htmlFor={inputDistributorId}>
									{m.waiting_list_i_have_interest_in_being_a_distributor()}
								</FieldLabel>
							</Field>

							<Field orientation="horizontal" className="flex-col items-center">
								<Button
									type="submit"
									disabled={isSubmitting}
									className="mt-4 w-full font-bold uppercase py-6"
								>
									{isSubmitting ? (
										<>
											<Spinner aria-hidden="true" />
											{m.waiting_list_sending_message()}
										</>
									) : (
										m.waiting_list_submit_button()
									)}
								</Button>

								{/* Added aria-live region to ensure screen readers announce the result */}
								<div
									aria-live="polite"
									aria-atomic="true"
									className="mt-2 text-center w-full min-h-6"
								>
									{submitStatus === "success" && (
										<p className="text-green-600 font-medium">
											{m.waiting_list_success_message()}
										</p>
									)}
									{submitStatus === "error" && (
										<p className="text-destructive font-medium">
											{m.waiting_list_error_message()}
										</p>
									)}
								</div>
							</Field>
						</FieldGroup>
					</form>
				</div>
			</div>
		</section>
	);
};

export default SectionWaitingList;
