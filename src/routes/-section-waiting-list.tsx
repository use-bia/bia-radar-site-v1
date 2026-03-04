import type * as React from "react";
import { type FunctionComponent, useId, useState } from "react";
import { type Country, isValidPhoneNumber } from "react-phone-number-input";
import PhoneInput from "react-phone-number-input/input";
import { toast } from "sonner";

import { parseFormattedText } from "@/-helper-tsx";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
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

const SectionWaitingList: FunctionComponent = () => {
	const headingId = useId();
	const inputNameId = useId();
	const inputEmailId = useId();
	const inputPhoneId = useId();
	const inputDistributorId = useId();
	const honeypotId = useId();

	// 1. Lazy initialize defaultCountry so it only computes ONCE on mount
	const [defaultCountry] = useState<Country>(
		() => guessCountryFromBrowser() ?? "US",
	);
	const [phone, setPhone] = useState<string | undefined>();
	const [phoneError, setPhoneError] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const isPt = (getLocale() ?? "pt-br").startsWith("pt");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// 1. Only validate if the user actually typed something
		if (phone && !isValidPhoneNumber(phone)) {
			setPhoneError(true);
			document.getElementById(inputPhoneId)?.focus();
			return;
		}

		setPhoneError(false);
		setIsSubmitting(true);

		try {
			const form = event.currentTarget;
			const rawFormData = new FormData(form);
			const searchParams = new URLSearchParams();

			rawFormData.forEach((value, key) => {
				searchParams.append(key, value.toString());
			});

			// 2. Only append the phone variable if it exists
			if (phone) {
				searchParams.set("phone", phone);
			} else {
				// Send a fallback string so your Google Sheet doesn't shift columns
				searchParams.set("phone", "Not provided");
			}

			searchParams.set("type", "Waiting List");
			searchParams.set("userAgent", navigator.userAgent);
			searchParams.set("message", "User requested to join the waiting list.");

			if (searchParams.get("supplier") === "on") {
				searchParams.set("supplier", "Yes");
			}

			const urlEncodedData = searchParams.toString();

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

				// 3. Reset to undefined instead of a partial country code!
				// This ensures the input goes completely blank and shows the placeholder again.
				setPhone(undefined);

				toast.success(m.waiting_list_success_message());

				const headingEl = document.getElementById(headingId);
				if (headingEl) {
					headingEl.tabIndex = -1;
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
										// 2. Wrap onChange safely to prevent synthetic event loops
										onChange={(val) => setPhone(val)}
										inputComponent={Input}
										placeholder={isPt ? "11 99999-9999" : "+1 (555) 000-0000"}
										aria-invalid={phoneError ? "true" : "false"}
										aria-describedby={
											phoneError ? `${inputPhoneId}-error` : undefined
										}
										className={cn(
											"bg-background! py-6 px-4 text-base!",
											phoneError &&
												"ring-destructive/20 border-destructive ring-[3px]",
										)}
									/>

									{phoneError && (
										<FieldError id={`${inputPhoneId}-error`}>
											{m.phone_please_enter_a_valid_phone_number()}
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
							</Field>
						</FieldGroup>
					</form>
				</div>
			</div>
		</section>
	);
};

export default SectionWaitingList;
