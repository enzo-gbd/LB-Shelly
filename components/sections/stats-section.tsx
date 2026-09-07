import { ToyShape } from "@/components/decorations/toy-shape";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export function StatsSection() {
  return (
    <Section
      id="chiffres"
      aria-labelledby="stats-title"
      className="overflow-hidden bg-navy text-off-white"
    >
      <div aria-hidden="true" className="grain opacity-10" />
      <ToyShape
        kind="star"
        className="floating-gentle absolute top-16 right-[8%] hidden w-20 rotate-12 text-green-toy md:block"
      />
      <Container className="relative z-10">
        <Reveal>
          <SectionHeading
            id="stats-title"
            eyebrow="Constats · Insights"
            tone="light"
            title="Trois chiffres qui changent la donne"
            description="Les usages évoluent tôt, vite et sur plusieurs écrans. Trois repères issus du livre blanc donnent la mesure du décalage générationnel."
          />
        </Reveal>

        <dl className="mt-16 grid border-t border-off-white/35 md:mt-24 md:grid-cols-12">
          <Reveal className="border-b border-off-white/35 py-12 md:col-span-7 md:border-r md:px-8 md:py-16 lg:px-12">
            <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-end">
              <dt className="text-[clamp(6.5rem,15vw,12.5rem)] leading-[0.7] font-black tracking-[-0.09em] text-sky-brand">
                72<span className="text-[0.44em]">%</span>
              </dt>
              <dd className="max-w-sm pb-2">
                <p className="text-lg leading-7 font-bold sm:text-2xl sm:leading-8">
                  des enfants de 3 à 5 ans dépassent 1 heure d’écran par jour.
                </p>
                <p className="mt-5 text-[0.68rem] font-extrabold tracking-[0.16em] text-sky-light uppercase">
                  Source · Santé publique France
                </p>
              </dd>
            </div>
          </Reveal>

          <Reveal
            delay={0.08}
            className="relative overflow-hidden border-b border-off-white/35 py-12 md:col-span-5 md:px-8 md:py-16 lg:px-12"
          >
            <span
              aria-hidden="true"
              className="absolute top-8 right-4 size-44 rounded-full bg-pink-toy/90 sm:size-52 md:-right-10 lg:right-3"
            />
            <dt className="relative text-[clamp(6rem,12vw,10rem)] leading-[0.75] font-black tracking-[-0.09em]">
              73<span className="text-[0.44em]">%</span>
            </dt>
            <dd className="relative mt-9 max-w-md">
              <p className="text-lg leading-7 font-bold sm:text-2xl sm:leading-8">
                des enfants de 9 à 11 ans dépassent 2 heures d’écran par jour.
              </p>
              <p className="mt-5 text-[0.68rem] font-extrabold tracking-[0.16em] text-sky-light uppercase">
                Source · Santé publique France
              </p>
            </dd>
          </Reveal>

          <Reveal
            delay={0.14}
            className="relative border-b border-off-white/35 py-12 md:col-span-12 md:px-8 md:py-16 lg:px-12"
          >
            <div className="grid items-center gap-8 lg:grid-cols-[auto_1fr_auto] lg:gap-16">
              <dt className="text-[clamp(6.5rem,15vw,12.5rem)] leading-[0.7] font-black tracking-[-0.09em] text-yellow-toy">
                22<span className="text-[0.44em]">%</span>
              </dt>
              <dd className="max-w-xl">
                <p className="text-xl leading-8 font-bold sm:text-3xl sm:leading-10">
                  du temps hebdomadaire de la génération Alpha est consacré aux jeux vidéo.
                </p>
                <p className="mt-5 text-[0.68rem] font-extrabold tracking-[0.16em] text-sky-light uppercase">
                  Source · La Dépêche
                </p>
              </dd>
              <ToyShape
                kind="arch"
                className="floating-gentle-slow absolute right-4 bottom-3 w-20 text-red-toy sm:w-28 lg:static lg:w-36"
              />
            </div>
          </Reveal>
        </dl>
      </Container>
    </Section>
  );
}
