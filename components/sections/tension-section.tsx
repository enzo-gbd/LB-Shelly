import { ToyShape } from "@/components/decorations/toy-shape";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

const parentDrivers = ["Nostalgie", "Transmission", "Sécurité", "Durabilité"];
const childDrivers = ["Immédiateté", "Gaming", "Streaming", "Pop culture"];

export function TensionSection() {
  return (
    <Section
      id="tension"
      aria-labelledby="tension-title"
      className="overflow-hidden bg-off-white"
    >
      <Container>
        <Reveal>
          <p className="mb-6 text-xs font-extrabold tracking-[0.22em] uppercase sm:text-sm">
            La tension
          </p>
          <h2
            id="tension-title"
            className="text-balance max-w-6xl text-[clamp(2.65rem,6.3vw,6.8rem)] leading-[0.92] font-black tracking-[-0.06em] uppercase"
          >
            Les marques de notre enfance peuvent-elles encore séduire les enfants
            d’aujourd’hui&nbsp;?
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-14 border-y-2 border-navy py-8 sm:mt-20 sm:py-10 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-12">
            <p className="text-balance text-2xl leading-tight font-black tracking-[-0.04em] sm:text-4xl lg:text-right">
              Le parent choisit avec ses souvenirs.
            </p>
            <div
              aria-hidden="true"
              className="my-5 flex items-center justify-center gap-2 lg:my-0 lg:flex-col"
            >
              <span className="h-px w-12 bg-navy lg:h-12 lg:w-px" />
              <span className="grid size-9 place-items-center rounded-full border-2 border-navy bg-yellow-toy text-sm font-black">
                ×
              </span>
              <span className="h-px w-12 bg-navy lg:h-12 lg:w-px" />
            </div>
            <p className="text-balance text-2xl leading-tight font-black tracking-[-0.04em] sm:text-4xl">
              L’enfant consomme avec les références de son époque.
            </p>
          </div>
        </Reveal>

        <div className="relative mt-12 min-h-[630px] sm:mt-16 lg:min-h-[500px]">
          <div className="absolute top-0 left-0 h-[54%] w-[94%] rounded-[3rem_6rem_4rem_2rem] border-2 border-navy bg-pink-toy sm:w-[72%] lg:h-full lg:w-[54%] lg:rounded-[5rem_10rem_7rem_4rem]" />
          <div className="absolute right-0 bottom-0 h-[54%] w-[94%] rounded-[5rem_2rem_3rem_6rem] border-2 border-navy bg-sky-brand sm:w-[72%] lg:h-full lg:w-[54%] lg:rounded-[10rem_4rem_5rem_7rem]" />

          <Reveal className="absolute top-0 left-0 z-10 flex h-[54%] w-[94%] flex-col justify-center px-7 py-10 sm:w-[72%] sm:px-12 lg:h-full lg:w-[48%] lg:px-16">
            <p className="text-xs font-black tracking-[0.2em] uppercase">Parent</p>
            <div className="mt-7 flex max-w-md flex-wrap gap-3">
              {parentDrivers.map((driver, index) => (
                <span
                  key={driver}
                  className={`rounded-full border-2 border-navy bg-off-white px-4 py-2.5 text-sm font-extrabold sm:px-6 sm:text-base ${
                    index % 2 === 0 ? "-rotate-2" : "rotate-2"
                  }`}
                >
                  {driver}
                </span>
              ))}
            </div>
            <ToyShape
              kind="flower"
              className="floating-gentle absolute top-8 right-6 w-16 text-red-toy sm:w-20"
            />
          </Reveal>

          <Reveal
            delay={0.12}
            className="absolute right-0 bottom-0 z-20 flex h-[54%] w-[94%] flex-col justify-center px-7 py-10 text-right sm:w-[72%] sm:px-12 lg:h-full lg:w-[48%] lg:px-16"
          >
            <p className="text-xs font-black tracking-[0.2em] uppercase">Enfant</p>
            <div className="mt-7 ml-auto flex max-w-md flex-wrap justify-end gap-3">
              {childDrivers.map((driver, index) => (
                <span
                  key={driver}
                  className={`rounded-full border-2 border-navy bg-off-white px-4 py-2.5 text-sm font-extrabold sm:px-6 sm:text-base ${
                    index % 2 === 0 ? "rotate-2" : "-rotate-2"
                  }`}
                >
                  {driver}
                </span>
              ))}
            </div>
            <ToyShape
              kind="block"
              className="floating-gentle-slow absolute bottom-7 left-6 w-16 text-yellow-toy sm:w-20"
            />
          </Reveal>

          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 z-30 grid size-20 -translate-x-1/2 -translate-y-1/2 rotate-6 place-items-center rounded-[1.8rem] border-2 border-navy bg-off-white text-2xl font-black shadow-[5px_5px_0_var(--navy)] sm:size-24 lg:size-28"
          >
            OU
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 ml-auto max-w-3xl border-l-2 border-navy pl-6 sm:mt-20 sm:pl-10">
            <p className="text-balance text-xl leading-8 font-bold tracking-[-0.025em] sm:text-2xl sm:leading-9">
              Cette double attente oblige les marques jeunesse à repenser leurs produits,
              leurs récits et leurs expériences.
            </p>
            <p className="mt-5 text-base leading-7 font-medium text-navy-soft sm:text-lg sm:leading-8">
              Elles doivent évoluer suffisamment pour rester pertinentes, sans abandonner
              l’identité qui les rend reconnaissables.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
