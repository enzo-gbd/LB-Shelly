import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "navy" | "light";
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "navy",
  id,
}: SectionHeadingProps) {
  const centered = align === "center";
  const descriptionColor = tone === "light" ? "text-sky-light" : "text-navy-soft";

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="mb-5 text-xs font-extrabold tracking-[0.22em] uppercase sm:text-sm">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="text-balance text-[clamp(2.25rem,5.4vw,5.6rem)] leading-[0.94] font-black tracking-[-0.055em] uppercase"
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-7 max-w-2xl text-base leading-7 font-medium sm:text-lg sm:leading-8 ${descriptionColor}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
