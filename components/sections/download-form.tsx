"use client";

import type { FormEvent } from "react";
import { useState } from "react";

import { CloudDecoration } from "@/components/decorations/cloud-decoration";
import { ToyShape } from "@/components/decorations/toy-shape";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { trackClientEvent } from "@/lib/client-analytics";
import {
  downloadFormSchema,
  getDownloadFormErrors,
  type DownloadFieldName,
} from "@/lib/download-form-schema";

const fields = [
  { name: "firstName", label: "Prénom", autoComplete: "given-name", type: "text" },
  { name: "lastName", label: "Nom", autoComplete: "family-name", type: "text" },
  {
    name: "profession",
    label: "Profession",
    autoComplete: "organization-title",
    type: "text",
  },
  {
    name: "email",
    label: "Adresse e-mail professionnelle",
    autoComplete: "email",
    type: "email",
  },
] as const satisfies ReadonlyArray<{
  name: DownloadFieldName;
  label: string;
  autoComplete: string;
  type: "text" | "email";
}>;

type FormErrors = Partial<Record<DownloadFieldName, string | undefined>>;
type SubmissionStatus = "idle" | "loading" | "success" | "error";

function triggerDownload() {
  const link = document.createElement("a");
  link.href = "/livre-blanc-shelly-sarkar.pdf";
  link.download = "livre-blanc-shelly-sarkar.pdf";
  document.body.append(link);
  link.click();
  link.remove();
}

type DownloadFormProps = {
  formId: string;
};

export function DownloadForm({ formId }: DownloadFormProps) {
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "loading") {
      return;
    }

    setStatus("idle");
    setStatusMessage("");

    const formData = new FormData(event.currentTarget);
    const result = downloadFormSchema.safeParse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      profession: formData.get("profession"),
      email: formData.get("email"),
      marketingConsent: formData.get("marketingConsent") === "on",
      _gotcha: formData.get("_gotcha"),
    });

    if (!result.success) {
      const nextErrors = getDownloadFormErrors(result.error);
      setErrors(nextErrors);
      const firstInvalidField = fields.find((field) => nextErrors[field.name]);
      if (firstInvalidField) {
        document.getElementById(firstInvalidField.name)?.focus();
      }
      return;
    }

    setErrors({});
    setStatus("loading");
    setStatusMessage("Envoi sécurisé en cours…");

    try {
      const normalizedFormId = formId.trim();

      if (!normalizedFormId) {
        throw new Error("Missing Formspree form ID.");
      }

      const response = await fetch(
        `https://formspree.io/f/${encodeURIComponent(normalizedFormId)}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: result.data.firstName,
            lastName: result.data.lastName,
            profession: result.data.profession,
            email: result.data.email,
            marketingConsent: result.data.marketingConsent ? "Oui" : "Non",
            _gotcha: result.data._gotcha,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Formspree request failed.");
      }

      setStatus("success");
      setStatusMessage("Bonne lecture ! Votre livre blanc est en cours de téléchargement.");
      trackClientEvent("White paper downloaded", { source: "form" });
      triggerDownload();
    } catch {
      setStatus("error");
      setStatusMessage(
        "Une erreur est survenue lors de l’envoi. Vérifiez votre connexion et réessayez.",
      );
    }
  }

  return (
    <Section
      id="download"
      aria-labelledby="download-title"
      className="overflow-hidden bg-sky-brand"
    >
      <div aria-hidden="true" className="hero-grid absolute inset-0 opacity-60" />
      <CloudDecoration className="drift-x absolute top-10 -right-16 hidden w-80 text-off-white/75 md:block" />
      <ToyShape
        kind="flower"
        className="floating-gentle absolute -bottom-8 -left-8 w-36 -rotate-12 text-pink-toy sm:w-48"
      />
      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-16">
          <Reveal>
            <p className="text-xs font-extrabold tracking-[0.22em] uppercase sm:text-sm">
              Télécharger l’étude
            </p>
            <h2
              id="download-title"
              className="mt-6 text-balance text-[clamp(3.5rem,7.5vw,7rem)] leading-[0.84] font-black tracking-[-0.065em] uppercase"
            >
              Recevez le livre blanc
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-8 font-semibold text-navy-soft sm:text-xl">
              Remplissez ce formulaire pour accéder gratuitement au document.
            </p>
            <div className="mt-10 hidden items-center gap-4 text-xs font-black tracking-[0.14em] uppercase lg:flex">
              <span className="grid size-11 place-items-center rounded-full border-2 border-navy bg-off-white">
                26
              </span>
              Pages · Téléchargement immédiat
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              noValidate
              onSubmit={handleSubmit}
              aria-busy={status === "loading"}
              className="rounded-[2.2rem] border-2 border-navy bg-off-white p-6 shadow-[8px_8px_0_var(--navy)] sm:rounded-[3rem] sm:p-10 lg:p-12"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden opacity-0"
              >
                <label htmlFor="_gotcha">Site internet</label>
                <input
                  id="_gotcha"
                  name="_gotcha"
                  type="text"
                  autoComplete="off"
                  tabIndex={-1}
                />
              </div>

              <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
                {fields.map((field) => {
                  const error = errors[field.name];
                  const errorId = `${field.name}-error`;

                  return (
                    <div
                      key={field.name}
                      className={field.name === "email" ? "sm:col-span-2" : ""}
                    >
                      <label
                        htmlFor={field.name}
                        className="mb-2.5 block text-xs font-extrabold tracking-[0.08em] uppercase"
                      >
                        {field.label}
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        autoComplete={field.autoComplete}
                        required
                        maxLength={
                          field.name === "profession"
                            ? 160
                            : field.name === "email"
                              ? 320
                              : 100
                        }
                        aria-invalid={Boolean(error)}
                        aria-describedby={error ? errorId : undefined}
                        className="min-h-14 w-full rounded-2xl border-2 border-navy/35 bg-white px-4 text-base font-semibold text-navy outline-none placeholder:text-navy/35 hover:border-navy/65 focus:border-navy focus:shadow-[0_0_0_4px_var(--sky-light)] aria-[invalid=true]:border-red-toy"
                      />
                      <p
                        id={errorId}
                        role={error ? "alert" : undefined}
                        className="mt-2 min-h-5 text-xs font-bold text-red-toy"
                      >
                        {error}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 flex items-start gap-3 border-t border-navy/20 pt-6">
                <input
                  id="marketingConsent"
                  name="marketingConsent"
                  type="checkbox"
                  className="mt-1 size-5 shrink-0 cursor-pointer accent-navy"
                />
                <label
                  htmlFor="marketingConsent"
                  className="text-xs leading-5 font-medium text-navy-soft"
                >
                  J’accepte de recevoir occasionnellement des communications liées à ce
                  livre blanc et aux travaux de Shelly Sarkar. Je pourrai retirer mon
                  consentement à tout moment.{" "}
                  <strong className="font-extrabold text-navy">Facultatif.</strong>
                </label>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="group mt-8 inline-flex min-h-16 w-full cursor-pointer items-center justify-center gap-4 rounded-full border-2 border-navy bg-navy px-6 py-4 text-sm font-extrabold text-off-white transition-colors hover:bg-sky-brand hover:text-navy disabled:cursor-wait disabled:opacity-65 sm:text-base"
              >
                {status === "loading" ? "Envoi en cours…" : "Télécharger le livre blanc"}
                <span
                  aria-hidden="true"
                  className="grid size-8 place-items-center rounded-full bg-current/10 transition-transform group-hover:translate-y-0.5 group-disabled:translate-y-0"
                >
                  {status === "loading" ? "…" : "↓"}
                </span>
              </button>

              <p className="mt-5 text-center text-xs leading-5 font-medium text-navy-soft">
                Vos informations resteront confidentielles et ne seront pas transmises à des
                tiers.
              </p>
              <div className="mt-3 min-h-10 text-center text-xs leading-5 font-extrabold">
                {statusMessage ? (
                  <p
                    role={status === "error" ? "alert" : "status"}
                    aria-live={status === "error" ? "assertive" : "polite"}
                    className={status === "error" ? "text-red-toy" : "text-green-toy"}
                  >
                    {statusMessage}
                    {status === "success" ? (
                      <span className="mt-2 block text-navy-soft">
                        Le téléchargement ne démarre pas&nbsp;?{" "}
                        <a
                          href="/livre-blanc-shelly-sarkar.pdf"
                          download
                          className="underline decoration-2 underline-offset-2 hover:no-underline"
                        >
                          Télécharger le PDF
                        </a>
                      </span>
                    ) : null}
                  </p>
                ) : null}
              </div>
            </form>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
