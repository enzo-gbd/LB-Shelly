import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Cta } from "@/components/ui/cta";
import { SectionHeading } from "@/components/ui/section-heading";

describe("design system primitives", () => {
  it("renders a primary CTA as an accessible link", () => {
    render(<Cta href="#download">Télécharger</Cta>);

    const link = screen.getByRole("link", { name: /télécharger/i });
    expect(link).toHaveAttribute("href", "#download");
    expect(link).toHaveClass("bg-navy");
  });

  it("renders the light CTA variant", () => {
    render(
      <Cta href="/document.pdf" variant="light" download>
        Lire le PDF
      </Cta>,
    );

    expect(screen.getByRole("link", { name: /lire le pdf/i })).toHaveClass("bg-off-white");
  });

  it("builds a labelled section heading with optional copy", () => {
    render(
      <SectionHeading
        id="chapters"
        eyebrow="Sommaire"
        title="Trois chapitres"
        description="Une lecture éditoriale."
      />,
    );

    expect(screen.getByRole("heading", { name: "Trois chapitres" })).toHaveAttribute(
      "id",
      "chapters",
    );
    expect(screen.getByText("Sommaire")).toBeVisible();
    expect(screen.getByText("Une lecture éditoriale.")).toBeVisible();
  });

  it("centers the heading when requested and omits absent copy", () => {
    const { container } = render(
      <SectionHeading align="center" eyebrow="Repère" title="Un titre" />,
    );

    expect(container.firstChild).toHaveClass("text-center");
    expect(container.querySelectorAll("p")).toHaveLength(1);
  });

  it("uses a high-contrast description on dark sections", () => {
    render(
      <SectionHeading
        tone="light"
        eyebrow="Lecture"
        title="Poursuivre"
        description="Un texte clair."
      />,
    );

    expect(screen.getByText("Un texte clair.")).toHaveClass("text-sky-light");
  });
});
