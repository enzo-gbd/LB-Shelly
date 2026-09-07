import type { ComponentPropsWithoutRef } from "react";

type SectionProps = ComponentPropsWithoutRef<"section">;

export function Section({ className = "", ...props }: SectionProps) {
  return <section className={`relative py-20 md:py-28 lg:py-36 ${className}`} {...props} />;
}
