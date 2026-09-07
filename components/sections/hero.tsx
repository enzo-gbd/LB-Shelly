"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { CloudDecoration } from "@/components/decorations/cloud-decoration";
import { ToyShape } from "@/components/decorations/toy-shape";
import { Container } from "@/components/ui/container";
import { Cta } from "@/components/ui/cta";
import { trackClientEvent } from "@/lib/client-analytics";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const coverY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 74]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 28]);

  return (
    <section
      ref={heroRef}
      aria-labelledby="hero-title"
      className="relative isolate min-h-[100svh] overflow-hidden bg-sky-brand"
    >
      <div aria-hidden="true" className="hero-grid absolute inset-0" />
      <div aria-hidden="true" className="grain" />

      <motion.div
        aria-hidden="true"
        className="absolute top-[12%] -left-14 hidden w-64 text-off-white/90 sm:block lg:w-80"
        animate={reduceMotion ? undefined : { x: [0, 18, 0], y: [0, -5, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      >
        <CloudDecoration className="w-full" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="absolute top-[28%] -right-12 hidden w-48 text-off-white/65 md:block lg:w-64"
        animate={reduceMotion ? undefined : { x: [0, -14, 0], y: [0, 8, 0] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
      >
        <CloudDecoration className="w-full" outlined />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="absolute bottom-[4%] left-[38%] hidden w-36 text-off-white/55 lg:block"
        animate={reduceMotion ? undefined : { x: [0, 10, 0] }}
        transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}
      >
        <CloudDecoration className="w-full" />
      </motion.div>

      <Container className="relative z-10 flex min-h-[100svh] flex-col">
        <header className="flex items-center justify-between border-b border-navy/20 py-5 sm:py-6">
          <a
            href="#hero-title"
            className="inline-flex items-center gap-3 text-xs font-black tracking-[0.14em] uppercase sm:text-sm"
            aria-label="Shelly Sarkar, revenir au début"
          >
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-full border-2 border-navy bg-off-white"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none">
                <path
                  d="m12 3 2.1 6.1L20 12l-5.9 2.9L12 21l-2.1-6.1L4 12l5.9-2.9L12 3Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            Shelly Sarkar
          </a>
          <a
            href="#tension"
            className="rounded-full border border-navy/30 px-4 py-2 text-[0.65rem] font-extrabold tracking-[0.14em] uppercase transition-colors hover:border-navy hover:bg-off-white sm:text-xs"
          >
            Découvrir l’étude
          </a>
        </header>

        <div className="grid flex-1 items-center gap-12 py-14 md:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.75fr)] lg:gap-8 lg:py-12 xl:grid-cols-[minmax(0,1fr)_minmax(430px,0.72fr)]">
          <motion.div style={{ y: copyY }} className="relative z-10 max-w-[790px] lg:pb-10">
            <motion.p
              className="hero-enter mb-6 flex items-center gap-3 text-[0.7rem] font-extrabold tracking-[0.19em] uppercase sm:text-xs"
              style={{ animationDelay: "80ms" }}
            >
              <span aria-hidden="true" className="h-px w-8 bg-navy" />
              Livre blanc · Shelly Sarkar
            </motion.p>

            <h1
              id="hero-title"
              className="text-balance text-[clamp(3.55rem,8.1vw,8.8rem)] leading-[0.79] font-black tracking-[-0.075em] uppercase"
            >
              <motion.span className="hero-enter block" style={{ animationDelay: "160ms" }}>
                S’adapter
              </motion.span>
              <motion.span
                className="hero-enter mt-3 block text-[0.56em] leading-[0.92] tracking-[-0.055em] sm:mt-5"
                style={{ animationDelay: "240ms" }}
              >
                ou devenir invisible&nbsp;?
              </motion.span>
            </h1>

            <motion.div
              className="hero-enter mt-9 grid gap-7 border-t border-navy/25 pt-7 sm:mt-11 sm:grid-cols-[minmax(0,0.84fr)_minmax(250px,1fr)] sm:gap-9"
              style={{ animationDelay: "340ms" }}
            >
              <p className="text-balance text-xl leading-7 font-extrabold tracking-[-0.035em] sm:text-2xl sm:leading-8">
                Comment faire évoluer une marque pour enfants sans perdre son ADN&nbsp;?
              </p>
              <p className="text-sm leading-6 font-medium text-navy-soft sm:text-[0.97rem] sm:leading-7">
                Les marques iconiques de l’enfance font face à un défi inédit&nbsp;: séduire
                des parents attachés à leurs souvenirs tout en restant pertinentes pour une
                nouvelle génération élevée entre jeux vidéo, streaming et réseaux sociaux.
              </p>
            </motion.div>

            <motion.div
              className="hero-enter mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6"
              style={{ animationDelay: "440ms" }}
            >
              <Cta
                href="#download"
                onClick={() => trackClientEvent("Hero CTA clicked", { location: "hero" })}
              >
                Télécharger le livre blanc
              </Cta>
              <p className="text-xs font-bold tracking-[0.02em] text-navy-soft">
                26 pages <span aria-hidden="true">·</span> Gratuit{" "}
                <span aria-hidden="true">·</span> Téléchargement immédiat
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: coverY }}
            className="relative mx-auto w-full max-w-[410px] pb-12 sm:max-w-[470px] lg:mr-0 lg:max-w-[490px] lg:pb-0"
          >
            <motion.div
              initial={false}
              animate={
                reduceMotion ? undefined : { y: [0, -7, 0], rotate: [-2.2, -1.2, -2.2] }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 6.5,
                      delay: 0.9,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
              className="book-cover relative z-10 mx-auto aspect-[595.5/842.25] w-[78%] overflow-visible rounded-[3px] bg-navy sm:w-[76%] lg:w-[78%]"
            >
              <span aria-hidden="true" className="book-spine" />
              <Image
                src="/assets/livre-blanc-cover.webp"
                alt="Couverture du livre blanc S’adapter ou devenir invisible ? de Shelly Sarkar"
                fill
                loading="eager"
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 360px, 390px"
                className="rounded-[3px] object-cover"
              />
            </motion.div>

            <div
              aria-hidden="true"
              className="absolute right-[2%] -bottom-1 h-1/2 w-[62%] rounded-[48%] bg-navy/12 blur-2xl"
            />
            <ToyShape
              kind="arch"
              className="absolute -right-2 bottom-[5%] z-20 w-[21%] rotate-[7deg] text-pink-toy sm:right-1"
            />
            <ToyShape
              kind="block"
              className="absolute -left-1 bottom-[1%] z-20 w-[18%] -rotate-12 text-yellow-toy sm:left-3"
            />
            <ToyShape
              kind="star"
              className="absolute top-[4%] -right-[2%] z-20 hidden w-[14%] rotate-12 text-green-toy sm:block"
            />
            <div
              aria-hidden="true"
              className="absolute top-[24%] right-[1%] size-8 rounded-full border-2 border-navy bg-red-toy sm:size-10"
            />
            <span
              aria-hidden="true"
              className="absolute top-[8%] left-[2%] hidden -rotate-12 rounded-full border-2 border-navy bg-off-white px-4 py-2 text-[0.63rem] font-black tracking-[0.16em] uppercase sm:block"
            >
              Étude de marque
            </span>
          </motion.div>
        </div>

        <div className="relative z-10 hidden items-center justify-between border-t border-navy/20 py-5 text-[0.68rem] font-extrabold tracking-[0.14em] uppercase lg:flex">
          <span>Héritage</span>
          <span aria-hidden="true" className="size-1.5 rounded-full bg-navy" />
          <span>Nouvelles générations</span>
          <span aria-hidden="true" className="size-1.5 rounded-full bg-navy" />
          <span>Évolution des marques</span>
          <span className="inline-flex items-center gap-2">
            Faire défiler
            <span aria-hidden="true">↓</span>
          </span>
        </div>
      </Container>
    </section>
  );
}
