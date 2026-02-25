import {
	type FormEvent,
	type FunctionComponent,
	useEffect,
	useId,
	useState,
} from "react";
// 1. Import the utility function from the base library
import { type Country, isValidPhoneNumber } from "react-phone-number-input";
import enLabels from "react-phone-number-input/locale/en.json";
import ptLabels from "react-phone-number-input/locale/pt.json";
import { parseFormattedText } from "@/-helper-tsx";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
// 2. Import your brand new custom Shadcn PhoneInput component
import { PhoneInput } from "@/components/ui/phone-input";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

async function getCountryFromIP(): Promise<string | null> {
	try {
		const res = await fetch("https://ipapi.co/json/");
		const data = await res.json();

		return data.country_code; // "BR"
	} catch {
		return null;
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
	const [defaultCountry, setDefaultCountry] = useState<Country>("US");

	const currentLocale = getLocale() ?? "pt-br";
	const isPt = currentLocale.startsWith("pt");

	useEffect(() => {
		getCountryFromIP().then((countryCode) => {
			if (countryCode) {
				setDefaultCountry(countryCode as Country);
			}
		});
	}, []);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (phone && !isValidPhoneNumber(phone)) {
			setPhoneError(true);
			return;
		}

		setPhoneError(false);
		setIsSubmitting(true);
		setSubmitStatus("idle");

		try {
			const form = event.currentTarget;
			const formData = new URLSearchParams();

			const name =
				(document.getElementById(inputNameId) as HTMLInputElement)?.value || "";
			const email =
				(document.getElementById(inputEmailId) as HTMLInputElement)?.value ||
				"";

			const checkboxEl = document.getElementById(inputDistributorId);
			const isDistributor =
				(checkboxEl instanceof HTMLInputElement && checkboxEl.checked) ||
				checkboxEl?.getAttribute("aria-checked") === "true";

			const username =
				(document.getElementById(honeypotId) as HTMLInputElement)?.value || "";

			formData.append("type", "WAITING_LIST");
			formData.append("name", name);
			formData.append("email", email);
			formData.append("phone", phone || "");
			formData.append("supplier", isDistributor ? "Yes" : "No");
			formData.append("username", username);
			formData.append("userAgent", navigator.userAgent);

			const response = await fetch(__CONTACT_API_URL__, {
				method: "POST",
				body: formData,
			});

			const data = await response.text();

			if (data === "Success") {
				setSubmitStatus("success");
				form.reset();
				setPhone(undefined);
			} else {
				setSubmitStatus("error");
			}
		} catch (error) {
			console.error("Submission error:", error);
			setSubmitStatus("error");
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
										className={cn(
											"bg-background",
											phoneError
												? "ring-destructive/20 border-destructive ring-[3px]"
												: "",
										)}
										// Pass the imported translation file directly
										labels={isPt ? ptLabels : enLabels}
										// Pass custom strings for the dropdown internals
										searchPlaceholder={
											isPt ? "Buscar país..." : "Search country..."
										}
										emptyMessage={
											isPt ? "Nenhum país encontrado." : "No country found."
										}
									/>

									{phoneError && (
										<p className="text-destructive text-sm mt-1">
											Please enter a valid phone number.
										</p>
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
									{isSubmitting
										? m.waiting_list_sending_message()
										: m.waiting_list_submit_button()}
								</Button>

								{submitStatus === "success" && (
									<p className="text-green-600 mt-2 font-medium">
										{m.waiting_list_success_message()}
									</p>
								)}
								{submitStatus === "error" && (
									<p className="text-destructive mt-2 font-medium">
										{m.waiting_list_error_message()}
									</p>
								)}
							</Field>
						</FieldGroup>
					</form>
				</div>
			</div>
		</section>
	);
};

export default SectionWaitingList;
