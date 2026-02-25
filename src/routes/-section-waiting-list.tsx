import { type FormEvent, type FunctionComponent, useId, useState } from "react";
import { parseFormattedText } from "@/-helper-tsx";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { m } from "@/paraglide/messages";

type SectionWaitingListProps = Record<string, never>;

const SectionWaitingList: FunctionComponent<SectionWaitingListProps> = () => {
	// Generate unique IDs for all fields to satisfy the linter
	const headingId = useId();
	const inputNameId = useId();
	const inputEmailId = useId();
	const inputDistributorId = useId();
	const honeypotId = useId();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<
		"idle" | "success" | "error"
	>("idle");

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
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

			// TypeScript Fix: Check the instance type safely
			const checkboxEl = document.getElementById(inputDistributorId);
			const isDistributor =
				(checkboxEl instanceof HTMLInputElement && checkboxEl.checked) ||
				checkboxEl?.getAttribute("aria-checked") === "true";

			// Use the newly generated honeypot ID
			const username =
				(document.getElementById(honeypotId) as HTMLInputElement)?.value || "";

			formData.append("type", "WAITING_LIST");
			formData.append("name", name);
			formData.append("email", email);
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
							{/* THE HONEYPOT: Using useId() for the ID */}
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

							<div className="grid grid-cols-2 gap-4">
								<Field aria-required>
									<FieldLabel htmlFor={inputNameId}>
										{m.waiting_list_input_fullname()}
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
									<FieldLabel htmlFor={inputEmailId}>
										{m.waiting_list_input_email()}
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
							</div>
							<Field orientation="horizontal">
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
									{isSubmitting ? "Sending..." : m.waiting_list_submit_button()}
								</Button>

								{submitStatus === "success" && (
									<p className="text-green-600 mt-2 font-medium">
										Success! You are on the list.
									</p>
								)}
								{submitStatus === "error" && (
									<p className="text-destructive mt-2 font-medium">
										Something went wrong. Please try again.
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
