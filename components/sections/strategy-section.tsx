import { ToyShape } from "@/components/decorations/toy-shape";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export function StrategySection() {
  return (
    <Section
      id="equilibre"
      aria-labelledby="strategy-title"
      className="overflow-hidden bg-off-white"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="strategy-title"
            eyebrow="Le problème stratégique"
            title="Évoluer sans se perdre"
            description="La valeur d’une marque ne repose plus uniquement sur son histoire, mais aussi sur sa capacité à rester pertinente dans les usages actuels des enfants."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-16 min-h-[520px] overflow-hidden rounded-[2.5rem] border-2 border-navy bg-sky-soft px-6 py-12 sm:px-10 md:mt-24 md:min-h-[430px] md:rounded-[4rem] md:px-14 lg:px-20">
            <div aria-hidden="true" className="hero-grid absolute inset-0 opacity-35" />
            <p className="relative mx-auto max-w-3xl text-center text-balance text-2xl leading-tight font-extrabold tracking-[-0.035em] sm:text-4xl">
              Trouver le bon équilibre entre héritage, innovation et nouvelles attentes
              culturelles.
            </p>

            <div className="relative mt-16 grid gap-8 md:mt-20 md:grid-cols-[1fr_7rem_1fr] md:items-end md:gap-2">
              <div className="relative z-10 flex min-h-32 items-center justify-center rounded-[2.4rem] border-2 border-navy bg-pink-toy px-6 text-center text-xl font-black tracking-[-0.03em] uppercase shadow-[5px_5px_0_var(--navy)] sm:text-2xl md:-rotate-2">
                Héritage
                <ToyShape
                  kind="flower"
                  className="absolute -top-8 -left-5 w-16 text-yellow-toy sm:w-20"
                />
              </div>

              <div aria-hidden="true" className="relative mx-auto grid place-items-center">
                <span className="absolute h-48 w-0.5 bg-navy md:h-0.5 md:w-[60vw] md:max-w-[760px] md:-rotate-2" />
                <span className="relative z-10 grid size-16 rotate-6 place-items-center rounded-2xl border-2 border-navy bg-yellow-toy shadow-[4px_4px_0_var(--navy)]">
                  <svg viewBox="0 0 24 24" className="size-7" fill="none">
                    <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="2.4" />
                  </svg>
                </span>
              </div>

              <div className="relative z-10 flex min-h-32 items-center justify-center rounded-[2.4rem] border-2 border-navy bg-sky-brand px-6 text-center text-xl font-black tracking-[-0.03em] uppercase shadow-[5px_5px_0_var(--navy)] sm:text-2xl md:rotate-2">
                Évolution
                <ToyShape
                  kind="star"
                  className="absolute -right-4 -bottom-7 w-16 text-green-toy sm:w-20"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
