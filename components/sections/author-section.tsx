import { CloudDecoration } from "@/components/decorations/cloud-decoration";
import { ToyShape } from "@/components/decorations/toy-shape";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

export function AuthorSection() {
  return (
    <Section
      id="autrice"
      aria-labelledby="author-title"
      className="overflow-hidden bg-navy text-off-white"
    >
      <div
        aria-hidden="true"
        className="absolute top-1/2 -right-[0.08em] -translate-y-1/2 text-[clamp(18rem,44vw,44rem)] leading-none font-black tracking-[-0.12em] text-transparent opacity-20 [-webkit-text-stroke:2px_var(--sky)]"
      >
        SS
      </div>
      <CloudDecoration className="drift-x-slow absolute -top-8 -left-10 hidden w-72 text-sky-brand/20 sm:block" />
      <Container className="relative z-10">
        <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <Reveal>
            <p className="text-xs font-extrabold tracking-[0.22em] text-sky-light uppercase sm:text-sm">
              À propos de l’autrice
            </p>
            <h2
              id="author-title"
              className="mt-6 text-[clamp(4rem,9vw,8rem)] leading-[0.8] font-black tracking-[-0.075em] uppercase"
            >
              Shelly
              <br />
              <span className="text-sky-brand">Sarkar</span>
            </h2>
            <p className="mt-8 inline-flex rounded-full border border-sky-light/45 px-4 py-2 text-[0.66rem] font-extrabold tracking-[0.13em] text-sky-light uppercase sm:text-xs">
              M2 Brand B · École Supérieure de Publicité
            </p>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col justify-end lg:pt-28">
            <div className="max-w-3xl border-t border-sky-light/40 pt-8 sm:pt-10">
              <p className="text-balance text-xl leading-8 font-semibold tracking-[-0.025em] sm:text-3xl sm:leading-[1.35]">
                Étudiante en M2 Brand B à l’École Supérieure de Publicité, je m’intéresse
                depuis toujours à la publicité, aux marques jeunesse et à l’univers des
                jouets.
              </p>
              <p className="mt-7 text-base leading-8 text-sky-light sm:text-lg sm:leading-9">
                À travers ce livre blanc, j’ai souhaité comprendre comment les marques
                iconiques de l’enfance peuvent traverser les générations tout en restant
                fidèles à ce qui fait leur singularité.
              </p>
            </div>
          </Reveal>
        </div>

        <div aria-hidden="true" className="relative mt-16 h-20 sm:h-28">
          <svg viewBox="0 0 900 120" className="absolute inset-0 h-full w-full" fill="none">
            <path
              d="M8 78c98-92 139 56 236-4 80-50 111-54 188 4 73 56 142 15 200-18 80-45 154 4 260 2"
              stroke="#8eddf3"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="7 12"
            />
          </svg>
          <ToyShape
            kind="star"
            className="absolute top-0 right-[12%] w-14 text-yellow-toy"
          />
        </div>
      </Container>
    </Section>
  );
}
