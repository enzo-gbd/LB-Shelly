import { CloudDecoration } from "@/components/decorations/cloud-decoration";
import { ToyShape } from "@/components/decorations/toy-shape";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const chapters = [
  {
    number: "01",
    title: "Comprendre les générations",
    description:
      "Observer l’évolution des usages, des références culturelles et des attentes.",
    accent: "bg-off-white",
    shape: "text-yellow-toy",
  },
  {
    number: "02",
    title: "Faire évoluer une marque",
    description:
      "Comprendre jusqu’où une marque peut renouveler son expression sans perdre son identité.",
    accent: "bg-sky-light",
    shape: "text-pink-toy",
  },
  {
    number: "03",
    title: "Méthodologie stratégique",
    description:
      "Construire une démarche capable de guider l’évolution d’une marque dans le temps.",
    accent: "bg-off-white",
    shape: "text-green-toy",
  },
] as const;

export function StudyPreview() {
  return (
    <Section
      id="explore"
      aria-labelledby="explore-title"
      className="overflow-hidden bg-sky-brand"
    >
      <div aria-hidden="true" className="hero-grid absolute inset-0 opacity-60" />
      <CloudDecoration className="drift-x absolute top-20 -left-12 hidden w-64 text-off-white/75 md:block" />
      <CloudDecoration
        className="drift-x-slow absolute top-[36%] -right-16 hidden w-72 text-off-white/50 lg:block"
        outlined
      />
      <Container className="relative z-10">
        <Reveal>
          <SectionHeading
            id="explore-title"
            eyebrow="Ce que le livre blanc explore"
            title={
              <>
                26 pages pour <span className="outline-word">comprendre</span>
              </>
            }
            description="Comment une marque peut-elle traverser les générations sans devenir méconnaissable ? L’étude progresse en trois mouvements complémentaires."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:mt-20 md:gap-6">
          {chapters.map((chapter, index) => (
            <Reveal key={chapter.number} delay={index * 0.08}>
              <article
                className={`${chapter.accent} relative overflow-hidden rounded-[2rem] border-2 border-navy px-6 py-8 shadow-[7px_7px_0_var(--navy)] sm:px-9 md:grid md:grid-cols-[7rem_minmax(0,1fr)] md:items-center md:gap-x-8 md:gap-y-3 md:rounded-[3rem] md:px-12 md:py-10 lg:grid-cols-[9rem_minmax(0,1fr)_minmax(240px,0.8fr)] lg:gap-8 ${
                  index === 1 ? "md:ml-12 lg:ml-24" : index === 2 ? "md:mr-12 lg:mr-24" : ""
                }`}
              >
                <span
                  aria-hidden="true"
                  className="text-[5rem] leading-none font-black tracking-[-0.08em] text-navy/15 md:text-[7.5rem]"
                >
                  {chapter.number}
                </span>
                <h3 className="mt-2 text-balance text-2xl leading-[0.95] font-black tracking-[-0.045em] uppercase sm:text-3xl md:mt-0 lg:text-4xl">
                  {chapter.title}
                </h3>
                <p className="mt-5 text-sm leading-6 font-medium text-navy-soft md:col-start-2 md:mt-0 md:text-base md:leading-7 lg:col-start-auto">
                  {chapter.description}
                </p>
                <ToyShape
                  kind={index === 0 ? "block" : index === 1 ? "arch" : "star"}
                  className={`absolute -right-4 -bottom-5 w-20 rotate-12 opacity-80 md:hidden ${chapter.shape}`}
                />
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
