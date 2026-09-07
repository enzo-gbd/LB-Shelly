import Image from "next/image";

import { CloudDecoration } from "@/components/decorations/cloud-decoration";
import { ToyShape } from "@/components/decorations/toy-shape";
import { Container } from "@/components/ui/container";
import { Cta } from "@/components/ui/cta";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const previewPages = [
  { src: "/assets/preview-page-22.webp", alt: "Page 22 du livre blanc, conclusion" },
  { src: "/assets/preview-page-05.webp", alt: "Page 5 du livre blanc, chiffres clés" },
  { src: "/assets/preview-page-03.webp", alt: "Page 3 du livre blanc, sommaire" },
] as const;

export function DocumentPreview() {
  return (
    <Section
      id="apercu"
      aria-labelledby="preview-title"
      className="overflow-hidden bg-sky-soft"
    >
      <CloudDecoration className="absolute top-12 -right-12 hidden w-80 text-off-white md:block" />
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12">
          <Reveal>
            <SectionHeading
              id="preview-title"
              eyebrow="Aperçu du livre blanc"
              title="Une étude à ouvrir, pas à survoler"
              description="Une réflexion éditoriale sur la nostalgie des parents, les nouvelles générations et l’évolution des marques jeunesse."
            />
            <Cta href="#download" className="mt-9">
              Recevoir le livre blanc
            </Cta>
          </Reveal>

          <Reveal
            delay={0.12}
            className="relative min-h-[560px] sm:min-h-[700px] lg:min-h-[760px]"
          >
            <div className="absolute inset-x-0 top-1/2 mx-auto aspect-[595.5/842.25] w-[56%] max-w-[390px] -translate-y-1/2">
              {previewPages.map((page, index) => (
                <div
                  key={page.src}
                  className={`preview-sheet absolute inset-0 overflow-hidden rounded-sm bg-off-white ${
                    index === 0
                      ? "-translate-x-[25%] -rotate-[11deg]"
                      : index === 1
                        ? "translate-x-[22%] rotate-[10deg]"
                        : "-translate-x-[8%] -rotate-[4deg]"
                  }`}
                  style={{ zIndex: index + 1 }}
                >
                  <Image
                    src={page.src}
                    alt={page.alt}
                    fill
                    sizes="(max-width: 768px) 40vw, 320px"
                    className="object-cover"
                  />
                </div>
              ))}

              <div className="book-cover floating-gentle-slow absolute inset-0 z-10 translate-x-[8%] rotate-[3deg] overflow-hidden rounded-sm bg-navy">
                <span aria-hidden="true" className="book-spine" />
                <Image
                  src="/assets/livre-blanc-cover.webp"
                  alt="Couverture du livre blanc S’adapter ou devenir invisible ?"
                  fill
                  loading="eager"
                  sizes="(max-width: 768px) 56vw, 390px"
                  className="object-cover"
                />
              </div>
            </div>

            <span
              aria-hidden="true"
              className="absolute top-[8%] left-[8%] -rotate-6 rounded-full border-2 border-navy bg-yellow-toy px-4 py-2 text-[0.65rem] font-black tracking-[0.14em] uppercase sm:left-[14%]"
            >
              26 pages
            </span>
            <ToyShape
              kind="arch"
              className="absolute right-[3%] bottom-[5%] w-20 rotate-6 text-pink-toy sm:right-[10%] sm:w-28"
            />
            <ToyShape
              kind="block"
              className="absolute bottom-[8%] left-[2%] w-16 -rotate-12 text-green-toy sm:left-[8%] sm:w-24"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
