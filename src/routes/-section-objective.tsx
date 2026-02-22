import { TargetIcon } from "lucide-react";
import { type FunctionComponent, useId } from "react";
import BiaOnCane from "@/assets/bia-on-cane.webp";
import { BasicItemBox, BasicItemList } from "@/components/BasicItemBox";
import ImageBoxComponent from "@/components/ImageBoxComponent";
import { m } from "@/paraglide/messages";

type SectionObjectiveProps = {};

const SectionObjective: FunctionComponent<SectionObjectiveProps> = () => {
	const headingId = useId();

	return (
		<section
			id={m.objective_section_id()}
			aria-labelledby={headingId} // Good practice: labels the region
			className="w-full flex py-4 justify-center bg-background"
		>
			<div className="container mx-auto px-4 lg:px-8 flex flex-col gap-8">
				{/* Unified Heading */}
				<h2 id={headingId} className="flex flex-col text-center">
					<span className="uppercase text-muted-foreground text-base font-normal">
						{m.objective()}
					</span>
					<span className="text-3xl md:text-4xl xl:text-5xl font-bold">
						{m.objective_title()}
					</span>
				</h2>

				<p className="text-center max-w-3xl mx-auto">
					{m.objective_description()}
				</p>
				<div className="relative px-4 lg:px-8 container grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-8 lg:gap-8">
					<div className="lg:row-span-2 flex justify-center md:items-start lg:items-center w-full">
						<ImageBoxComponent
							imageSrc={BiaOnCane}
							imageAlt="Still frame of a person wearing the Bia Radar..."
							className="w-full h-auto aspect-square md:aspect-6/7 xl:aspect-square lg:w-auto lg:h-128 xl:h-xl 2xl:h-xl mx-auto lg:mx-0 shrink-0"
							imageDetails={{
								title: m.description_of_the_bia_radar_device(),
								// Falar do tamanho de um cartão de crédito
								content: <p>bla bla bla bla </p>,
							}}
						/>
					</div>
					<div>
						<BasicItemList>
							<BasicItemBox title="Proteção onde o tato não chega" centerTitle>
								Enquanto você mapeia o chão, a BIA cuida do que está no alto,
								onde 40% dos usuários de bengala sofrem colisões todos os meses.
								Com a BIA, o usuário tem a liberdade de explorar o ambiente sem
								medo de se chocar contra obstáculos acima da cintura, como
								galhos baixos, beirais, mesas e outros objetos que a bengala
								tradicional não detecta.
							</BasicItemBox>
							<BasicItemBox
								title="Proteção onde o tato não chega"
								icon={<TargetIcon />}
							>
								Enquanto você mapeia o chão, a BIA cuida do que está no alto,
								onde 40% dos usuários de bengala sofrem colisões todos os meses.
								Com a BIA, o usuário tem a liberdade de explorar o ambiente sem
								medo de se chocar contra obstáculos acima da cintura, como
								galhos baixos, beirais, mesas e outros objetos que a bengala
								tradicional não detecta.
							</BasicItemBox>
							<BasicItemBox title="Proteção onde o tato não chega" centerTitle>
								Enquanto você mapeia o chão, a BIA cuida do que está no alto,
								onde 40% dos usuários de bengala sofrem colisões todos os meses.
								Com a BIA, o usuário tem a liberdade de explorar o ambiente sem
								medo de se chocar contra obstáculos acima da cintura, como
								galhos baixos, beirais, mesas e outros objetos que a bengala
								tradicional não detecta.
							</BasicItemBox>
						</BasicItemList>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SectionObjective;
